
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import type { StudentProgress, Course as CourseType } from '@/lib/types';
import { getCourse, getCourses } from './course-data';

// This is the shape of the data stored in the 'enrolledCourses' array in Firestore.
// It's a lightweight reference to the full course object.
type EnrolledCourseRef = {
    id: string;
    progress: number;
    completedLessons: {
        [moduleIndex: number]: {
             [lessonIndex: number]: boolean
        }
    }
}

/**
 * Fetches a student's progress from Firestore.
 * If the student doesn't have a profile yet, it creates one.
 * The full course data is merged from the `courses` collection.
 * @param userId The UID of the authenticated user.
 * @param name The display name of the user, used for creating a new profile.
 * @param referralCode The UID of the user who referred this student.
 * @returns The student's progress data, with full course objects merged in.
 */
export async function getStudentProgress(userId: string, name?: string, referralCode?: string): Promise<StudentProgress> {
    if (!db) {
        throw new Error("Firestore is not initialized. Check your Firebase configuration.");
    }

    const docRef = doc(db, "studentProgress", userId);
    const docSnap = await getDoc(docRef);
    const allCourses = await getCourses(); // Fetch all course data once

    if (docSnap.exists()) {
        const studentData = docSnap.data();
        const enrolledCourseRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

        // Merge static course data with student's progress
        const enrolledCourses: CourseType[] = enrolledCourseRefs.map(ref => {
            const fullCourseData = allCourses.find(c => c.id === ref.id);
            if (!fullCourseData) return null; // Course might have been deleted

            // Create a deep copy to avoid modifying the original data
            const courseWithProgress = JSON.parse(JSON.stringify(fullCourseData));

            courseWithProgress.progress = ref.progress;
            
            // Mark lessons as completed based on the reference
            courseWithProgress.modules.forEach((module: any, mIdx: number) => {
                module.lessons.forEach((lesson: any, lIdx: number) => {
                    lesson.completed = !!ref.completedLessons?.[mIdx]?.[lIdx];
                });
            });

            return courseWithProgress;
        }).filter(c => c !== null) as CourseType[];
        
        const metrics = calculateProgressMetrics(enrolledCourses);

        return {
            studentId: userId,
            name: studentData.name,
            enrolledCourses,
            referredBy: studentData.referredBy,
            ...metrics
        };

    } else {
        console.log(`No progress document for user ${userId}. Creating new profile.`);
        const newStudentData = {
            studentId: userId,
            name: name || "New Student",
            enrolledCourses: [], // This will be the lightweight reference array
            referredBy: referralCode || undefined,
        };

        await setDoc(docRef, newStudentData);
        
        // Return the full StudentProgress structure
        return {
             ...newStudentData,
             enrolledCourses: [], // This is the full CourseType array, which is empty initially
             overallProgress: 0,
             completedCourses: 0,
             coursesInProgress: 0,
        };
    }
}

/**
 * Recalculates progress metrics based on the current list of enrolled courses.
 * @param enrolledCourses Array of full CourseType objects with progress.
 * @returns An object with calculated progress metrics.
 */
function calculateProgressMetrics(enrolledCourses: CourseType[]) {
    if (!enrolledCourses || enrolledCourses.length === 0) {
        return { coursesInProgress: 0, completedCourses: 0, overallProgress: 0 };
    }
    const coursesInProgress = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length;
    const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    const overallProgress = Math.round(totalProgress / enrolledCourses.length);

    return { coursesInProgress, completedCourses, overallProgress };
}


/**
 * Enrolls a student in a specific course by adding a lightweight reference.
 * @param userId The UID of the authenticated user.
 * @param courseId The ID of the course to enroll in.
 */
export async function enrollInCourse(userId: string, courseId: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");

    const courseToEnroll = await getCourse(courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    
    // Ensure the student document exists before trying to update it.
    const studentDoc = await getDoc(studentProgressRef);
    if (!studentDoc.exists()) {
        await getStudentProgress(userId, "New Student");
    }

    const studentData = (await getDoc(studentProgressRef)).data()!;
    const currentEnrolledRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

    if (currentEnrolledRefs.some(c => c.id === courseId)) {
        console.log(`User ${userId} is already enrolled in course ${courseId}.`);
        return;
    }

    const newCourseRef: EnrolledCourseRef = {
        id: courseId,
        progress: 0,
        completedLessons: {}
    };

    const updatedCourseRefs = [...currentEnrolledRefs, newCourseRef];

    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
    });
}

/**
 * Updates a lesson's completion status and recalculates progress for a course.
 * @param userId The user's ID.
 * @param courseId The course's ID.
 * @param moduleIndex The index of the module.
 * @param lessonIndex The index of the lesson within the module.
 * @param completed The new completion status.
 */
export async function updateLessonStatus(userId: string, courseId: string, moduleIndex: number, lessonIndex: number, completed: boolean): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentDoc = await getDoc(studentProgressRef);
    if (!studentDoc.exists()) {
        throw new Error("Student progress document not found.");
    }

    const studentData = studentDoc.data()!;
    const currentEnrolledRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

    const courseRefIndex = currentEnrolledRefs.findIndex(c => c.id === courseId);
    if (courseRefIndex === -1) throw new Error("Course not found in student's enrolled list.");

    const courseRef = currentEnrolledRefs[courseRefIndex];

    // Update completed lessons map
    if (completed) {
        if (!courseRef.completedLessons[moduleIndex]) {
            courseRef.completedLessons[moduleIndex] = {};
        }
        courseRef.completedLessons[moduleIndex][lessonIndex] = true;
    } else {
        if (courseRef.completedLessons?.[moduleIndex]?.[lessonIndex]) {
            delete courseRef.completedLessons[moduleIndex][lessonIndex];
            if (Object.keys(courseRef.completedLessons[moduleIndex]).length === 0) {
                delete courseRef.completedLessons[moduleIndex];
            }
        }
    }
    
    // Recalculate progress
    const staticCourse = await getCourse(courseId);
    if (!staticCourse) throw new Error("Static course data not found for progress calculation.");
    
    const totalLessons = staticCourse.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessonsCount = Object.values(courseRef.completedLessons).reduce((sum, module) => sum + Object.keys(module).length, 0);
    courseRef.progress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
    
    const updatedCourseRefs = [...currentEnrolledRefs];
    updatedCourseRefs[courseRefIndex] = courseRef;
    
    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
    });
}

    