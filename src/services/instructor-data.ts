
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import type { Instructor } from '@/lib/types';
import { InstructorSchema } from '@/lib/types';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

// Helper to convert Firestore doc to Instructor type
const toInstructor = (doc: DocumentData): Instructor => {
    const data = doc.data();
    return InstructorSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getInstructors(): Promise<Instructor[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const instructorsCol = collection(db, 'instructors');
    
    try {
        const instructorSnapshot = await getDocs(instructorsCol);
        const instructorList = instructorSnapshot.docs.map(doc => toInstructor(doc));
        return instructorList;
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: 'instructors',
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
        }
        // Re-throw the original error to be caught by the calling component
        throw error;
    }
}
