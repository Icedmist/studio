
'use server';

// Service to manage student data in Firestore.
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore"; 
import type { StudentProgress, Course as CourseType } from '@/lib/types';
import { getCourse as getStaticCourse } from './course-data';

/**
 * Fetches a student's progress from Firestore.
 * If the student doesn't have a profile yet, it creates one.
 * @param userId The UID of the authenticated user.
 * @param name The display name of the user, used for creating a new profile.
 * @param referralCode The UID of the user who referred this student.
 * @returns The student's progress data.
 */
export async function getStudentProgress(userId: string, name?: string, referralCode?: string): Promise<StudentProgress> {
    if (!db) {
        throw new Error("Firestore is not initialized. Check your Firebase configuration.");
    }

    const docRef = doc(db, "studentProgress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as StudentProgress;
    } else {
        console.log(`No progress document for user ${userId}. Creating new profile.`);
        const newStudentData: StudentProgress = {
            studentId: userId,
            name: name || "New Student", // Use provided name or a default
            enrolledCourses: [],
            overallProgress: 0,
            completedCourses: 0,
            coursesInProgress: 0,
            referredBy: referralCode || undefined,
        };

        await setDoc(docRef, newStudentData);
        return newStudentData;
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
    return progressSnapshot.docs.map(doc => doc.data() as StudentProgress);
}


/**
 * Recalculates progress metrics based on the current list of enrolled courses.
 * @param enrolledCourses Array of courses the student is enrolled in.
 * @returns An object with calculated progress metrics.
 */
function calculateProgressMetrics(enrolledCourses: CourseType[]) {
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
 * Enrolls a student in a specific course.
 * @param userId The UID of the authenticated user.
 * @param courseId The ID of the course to enroll in.
 */
export async function enrollInCourse(userId: string, courseId: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");

    const courseToEnroll = getStaticCourse(courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentData = await getStudentProgress(userId);
    
    // Ensure enrolledCourses is an array
    const currentEnrolledCourses = studentData.enrolledCourses || [];

    if (currentEnrolledCourses.some(c => c.id === courseId)) {
        console.log(`User ${userId} is already enrolled in course ${courseId}.`);
        return;
    }

    // Create a fresh course object for the student with progress reset
    const courseToEnrollWithProgress: CourseType = {
        ...courseToEnroll,
        progress: 0,
        modules: courseToEnroll.modules.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson => ({ ...lesson, completed: false }))
        }))
    };

    const updatedCourses = [...currentEnrolledCourses, courseToEnrollWithProgress];
    
    const metrics = calculateProgressMetrics(updatedCourses);

    const plainCourses = JSON.parse(JSON.stringify(updatedCourses));

    await updateDoc(studentProgressRef, {
        enrolledCourses: plainCourses,
        ...metrics
    });
}

/**
 * Updates a lesson's completion status and recalculates progress.
 * @param userId The user's ID.
 * @param courseId The course's ID.
 * @param moduleIndex The index of the module.
 * @param lessonIndex The index of the lesson within the module.
 * @param completed The new completion status.
 * @returns The updated student progress object.
 */
export async function updateLessonStatus(userId: string, courseId: string, moduleIndex: number, lessonIndex: number, completed: boolean): Promise<StudentProgress> {
    if (!db) throw new Error("Firestore not initialized.");
    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentData = await getStudentProgress(userId);

    const courseIndex = studentData.enrolledCourses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) throw new Error("Course not found in student's enrolled list.");

    const updatedCourses = [...studentData.enrolledCourses];
    const course = updatedCourses[courseIndex];

    if (course.modules[moduleIndex] && course.modules[moduleIndex].lessons[lessonIndex]) {
        course.modules[moduleIndex].lessons[lessonIndex].completed = completed;
    } else {
        throw new Error("Lesson not found at specified index.");
    }

    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = course.modules.reduce((sum, module) => sum + module.lessons.filter(l => l.completed).length, 0);
    course.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const metrics = calculateProgressMetrics(updatedCourses);
    
    const updatedStudentData: StudentProgress = {
        ...studentData,
        enrolledCourses: updatedCourses,
        ...metrics
    };
    
    // Firestore cannot handle undefined fields well inside arrays, so convert to plain object
    const plainData = JSON.parse(JSON.stringify(updatedStudentData));
    await setDoc(studentProgressRef, plainData);
    return updatedStudentData;
}
