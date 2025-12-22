
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, type DocumentData, where } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';

// Helper to convert Firestore doc to Course type
const toCourse = (doc: DocumentData): Course => {
    const data = doc.data();
    // Merge static data with progress data to form a complete Course object
    const courseWithProgress = {
        ...data,
        id: doc.id,
        progress: data.progress || 0, // Default progress to 0 if not set
    };
    return CourseSchema.parse(courseWithProgress);
};

export async function getCourses(): Promise<Course[]> {
    if (!db) {
        throw new Error("Firestore not initialized. Check your Firebase configuration.");
    }
    
    const coursesCollection = collection(db, 'courses');
    const q = query(coursesCollection);
    
    try {
        const coursesSnapshot = await getDocs(q);
        const courseList = coursesSnapshot.docs.map(doc => toCourse(doc));
        return courseList;
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            const permissionError = {
                path: coursesCollection.path,
                operation: 'list' as const
            };
            errorEmitter.emit('permission-error', permissionError);
            // Return an empty array or re-throw a more specific error
            // For now, we will let the listener handle the user-facing error.
            return [];
        }
        console.error("Firestore error fetching courses:", error);
        throw new Error(`Failed to fetch courses: ${error.message}`);
    }
}

export async function getCourse(id: string): Promise<Course | null> {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }
    const courseDocRef = doc(db, 'courses', id);

    try {
        const courseSnapshot = await getDoc(courseDocRef);
        if (courseSnapshot.exists()) {
            return toCourse(courseSnapshot);
        }
        return null;
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            const permissionError = {
                path: courseDocRef.path,
                operation: 'get' as const
            };
            errorEmitter.emit('permission-error', permissionError);
            return null;
        }
        console.error(`Firestore error fetching course ${id}:`, error);
        throw new Error(`Failed to fetch course: ${error.message}`);
    }
}
