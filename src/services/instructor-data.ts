
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, type DocumentData, query, orderBy } from "firebase/firestore";
import type { Instructor } from '@/lib/types';
import { InstructorSchema } from '@/lib/types';

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
    const q = query(instructorsCol, orderBy('name', 'asc'));
    
    try {
        const instructorSnapshot = await getDocs(q);
        const instructorList = instructorSnapshot.docs.map(doc => toInstructor(doc));
        return instructorList;
    } catch (error: any) {
        // Log the error for server-side debugging and re-throw it.
        // The page calling this function should handle the error gracefully.
        console.error("Firestore error fetching instructors:", error);
        throw new Error(`Failed to fetch instructors: ${error.message}`);
    }
}
