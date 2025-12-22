
'use server';

// Service to manage student data in Firestore.
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore"; 
import type { StudentProgress, Course as CourseType } from '@/lib/types';
import { getCourse as getStaticCourse, getCourses as getAllStaticCourses } from './course-data';

// This is the shape of the data stored in the 'enrolledCourses' array in Firestore.
// It's a lightweight reference to the full course object.
type EnrolledCourseRef = {
    id: string;
    progress: number;
    completedLessons: {
        [moduleId: number]: {
             [lessonId: number]: boolean
        }
    }
}


/**
 * Fetches a student's progress from Firestore.
 * If the student doesn't have a profile yet, it creates one.
 * The full course data is merged from the static course files.
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

    const allStaticCourses = await getAllStaticCourses();

    if (docSnap.exists()) {
        const studentData = docSnap.data();
        const enrolledCourseRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

        // Merge static course data with student's progress
        const enrolledCourses: CourseType[] = enrolledCourseRefs.map(ref => {
            const staticCourse = allStaticCourses.find(c => c.id === ref.id);
            if (!staticCourse) return null; // Course might have been deleted

            // Create a deep copy to avoid modifying the original static data
            const courseWithProgress = JSON.parse(JSON.stringify(staticCourse));

            courseWithProgress.progress = ref.progress;
            
            // Mark lessons as completed based on the reference
            courseWithProgress.modules.forEach((module: any, mIdx: number) => {
                module.lessons.forEach((lesson: any, lIdx: number) => {
                    lesson.completed = !!ref.completedLessons?.[mIdx]?.[lIdx];
                });
            });

            return courseWithProgress;
        }).filter(c => c !== null) as CourseType[];

        return {
            ...studentData,
            enrolledCourses,
        } as StudentProgress;
    } else {
        console.log(`No progress document for user ${userId}. Creating new profile.`);
        const newStudentData = {
            studentId: userId,
            name: name || "New Student", // Use provided name or a default
            enrolledCourses: [], // This will be the lightweight reference array
            overallProgress: 0,
            completedCourses: 0,
            coursesInProgress: 0,
            referredBy: referralCode || undefined,
        };

        await setDoc(docRef, newStudentData);

        // Return the full StudentProgress structure
        return {
             ...newStudentData,
             enrolledCourses: [], // This is the full CourseType array, which is empty initially
        };
    }
}

/**
 * Fetches all student progress documents.
 * @returns An array of all student progress data.
 */
export async function getAllStudentProgresses(): Promise<StudentProgress[]> {
     if (!db) throw new Error("Firestore not initialized.");
    const progressCol = collection(db, 'studentProgress');
    const progressSnapshot = await getDocs(progressCol);
    
    // Note: This returns the raw data from Firestore. For a full admin view,
    // you might need to process this further to merge in full course details
    // similar to getStudentProgress if needed on the admin side.
    return progressSnapshot.docs.map(doc => doc.data() as StudentProgress);
}


/**
 * Recalculates progress metrics based on the current list of enrolled courses.
 * @param enrolledCourses Array of lightweight course references.
 * @returns An object with calculated progress metrics.
 */
function calculateProgressMetrics(enrolledCourses: EnrolledCourseRef[]) {
    if (!enrolledCourses || enrolledCourses.length === 0) {
        return { coursesInProgress: 0, completedCourses: 0, overallProgress: 0 };
    }
    const coursesInProgress = enrolledCourses.filter(c => c.progress < 100 && c.progress > 0).length;
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

    const courseToEnroll = await getStaticCourse(courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentDoc = await getDoc(studentProgressRef);

    if (!studentDoc.exists()) {
        await getStudentProgress(userId, "New Student"); // Create profile if it doesn't exist
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
    const metrics = calculateProgressMetrics(updatedCourseRefs);

    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
        ...metrics
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
    const studentData = (await getDoc(studentProgressRef)).data()!;
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
        if (courseRef.completedLessons[moduleIndex]) {
            delete courseRef.completedLessons[moduleIndex][lessonIndex];
            if (Object.keys(courseRef.completedLessons[moduleIndex]).length === 0) {
                delete courseRef.completedLessons[moduleIndex];
            }
        }
    }
    
    // Recalculate progress
    const staticCourse = await getStaticCourse(courseId);
    if (!staticCourse) throw new Error("Static course data not found for progress calculation.");
    
    const totalLessons = staticCourse.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = Object.values(courseRef.completedLessons).reduce((sum, module) => sum + Object.keys(module).length, 0);
    courseRef.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    const updatedCourseRefs = [...currentEnrolledRefs];
    updatedCourseRefs[courseRefIndex] = courseRef;
    
    const metrics = calculateProgressMetrics(updatedCourseRefs);

    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
        ...metrics
    });
}
