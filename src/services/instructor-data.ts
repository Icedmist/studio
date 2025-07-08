'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, type DocumentData, doc } from "firebase/firestore";
import type { Instructor } from '@/lib/types';

// Helper to convert Firestore doc to Instructor type
const toInstructor = (doc: DocumentData): Instructor => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
        socials: data.socials,
    };
};

export async function getInstructors(): Promise<Instructor[]> {
    if (!db) throw new Error("Firestore not initialized.");
    const instructorsCol = collection(db, 'instructors');
    const instructorSnapshot = await getDocs(instructorsCol);
    const instructorList = instructorSnapshot.docs.map(doc => toInstructor(doc));
    return instructorList;
}
