// Service to manage student data in Firestore.
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
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

// In a real app, you would have functions to update progress, enroll in courses, etc.
// For example:
/*
export async function enrollInCourse(userId: string, courseId: string) {
    if (!db) throw new Error("Firestore not initialized.");

    const courseToEnroll = courses.find(c => c.id === courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentProgressSnap = await getDoc(studentProgressRef);

    if (studentProgressSnap.exists()) {
        const studentData = studentProgressSnap.data() as StudentProgress;
        
        // Check if already enrolled
        if (studentData.enrolledCourses.some(c => c.id === courseId)) {
            console.log("User already enrolled in this course.");
            return;
        }

        const updatedCourses = [...studentData.enrolledCourses, {...courseToEnroll, progress: 0}];
        
        // Here you would recalculate progress metrics
        const coursesInProgress = updatedCourses.filter(c => c.progress < 100).length;
        const completedCourses = updatedCourses.filter(c => c.progress === 100).length;
        const totalProgress = updatedCourses.reduce((sum, course) => sum + course.progress, 0);
        const overallProgress = updatedCourses.length > 0 ? Math.round(totalProgress / updatedCourses.length) : 0;


        await updateDoc(studentProgressRef, {
            enrolledCourses: updatedCourses,
            coursesInProgress,
            completedCourses,
            overallProgress
        });
    }
}
*/
