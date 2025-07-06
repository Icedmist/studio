// Service to manage student data in Firestore.
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import type { StudentProgress } from '@/lib/types';
import { courses } from '@/lib/courses';

/**
 * Fetches a student's progress from Firestore.
 * If the student doesn't have a profile yet, it creates one.
 * @param userId The UID of the authenticated user.
 * @param name The display name of the user, used for creating a new profile.
 * @returns The student's progress data.
 */
export async function getStudentProgress(userId: string, name?: string): Promise<StudentProgress> {
    if (!db) {
        throw new Error("Firestore is not initialized. Check your Firebase configuration.");
    }

    const docRef = doc(db, "studentProgress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // Document found, return its data
        return docSnap.data() as StudentProgress;
    } else {
        // Document doesn't exist, create a new one for the new user
        console.log(`No such document for user ${userId}. Creating new profile.`);
        const newStudentData: StudentProgress = {
            studentId: userId,
            name: name || "New Student", // Use provided name or a default
            enrolledCourses: [],
            overallProgress: 0,
            completedCourses: 0,
            coursesInProgress: 0,
        };

        // Set the new document in Firestore
        await setDoc(docRef, newStudentData);

        return newStudentData;
    }
}

/**
 * Recalculates progress metrics based on the current list of enrolled courses.
 * @param enrolledCourses Array of courses the student is enrolled in.
 * @returns An object with calculated progress metrics.
 */
function calculateProgressMetrics(enrolledCourses: StudentProgress['enrolledCourses']) {
    const coursesInProgress = enrolledCourses.filter(c => c.progress < 100).length;
    const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    const overallProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

    return { coursesInProgress, completedCourses, overallProgress };
}


/**
 * Enrolls a student in a specific course.
 * @param userId The UID of the authenticated user.
 * @param courseId The ID of the course to enroll in.
 */
export async function enrollInCourse(userId: string, courseId: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");

    const courseToEnroll = courses.find(c => c.id === courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentData = await getStudentProgress(userId);

    // Check if already enrolled
    if (studentData.enrolledCourses.some(c => c.id === courseId)) {
        console.log("User already enrolled in this course.");
        // We can just return successfully as the state is already what we want.
        return;
    }

    // Add the course with 0 progress
    const updatedCourses = [...studentData.enrolledCourses, {...courseToEnroll, progress: 0}];
    
    // Recalculate progress metrics
    const { coursesInProgress, completedCourses, overallProgress } = calculateProgressMetrics(updatedCourses);

    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourses.map(c => ({...c})), // Convert to plain objects for Firestore
        coursesInProgress,
        completedCourses,
        overallProgress
    });

    console.log(`User ${userId} enrolled in course ${courseId}.`);
}
