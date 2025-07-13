
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, type DocumentData } from "firebase/firestore";
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
    console.log("Fetching instructors from Firestore...");
    if (!db) throw new Error("Firestore not initialized.");
    const instructorsCol = collection(db, 'instructors');
    const instructorSnapshot = await getDocs(instructorsCol);
    const instructorList = instructorSnapshot.docs.map(doc => toInstructor(doc));
    console.log(`Found ${instructorList.length} instructors.`);
    return instructorList;
}
