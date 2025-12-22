
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, type DocumentData } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Helper to convert Firestore doc to Course type
const toCourse = (doc: DocumentData): Course => {
    const data = doc.data();
    return CourseSchema.parse({
        id: doc.id,
        ...data,
        progress: 0, // Default progress for a raw course
    });
};

export async function getCourses(): Promise<Course[]> {
    if (!db) throw new Error("Firestore not initialized.");
    const coursesCol = collection(db, 'courses');
    
    try {
        const courseSnapshot = await getDocs(coursesCol);
        const courseList = courseSnapshot.docs.map(doc => toCourse(doc));
        return courseList;
    } catch (serverError: any) {
        if (serverError.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: coursesCol.path,
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
            // Return an empty array or re-throw a more specific error for the UI to handle gracefully
            throw new Error(`Permission denied while fetching courses. Your security rules may be misconfigured.`);
        }
        throw serverError; // Re-throw other errors
    }
}

export async function getCourse(id: string): Promise<Course | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const courseDocRef = doc(db, 'courses', id);
    
    try {
        const courseSnapshot = await getDoc(courseDocRef);
        if (courseSnapshot.exists()) {
            return toCourse(courseSnapshot);
        }
        return null;
    } catch (serverError: any) {
        if (serverError.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: courseDocRef.path,
                operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
            throw new Error(`Permission denied while fetching course ${id}. Your security rules may be misconfigured.`);
        }
        throw serverError;
    }
}
