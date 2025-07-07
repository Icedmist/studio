'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, type DocumentData } from "firebase/firestore";
import type { Instructor } from '@/lib/types';
import { InstructorSchema } from '@/lib/types';

const NewInstructorSchema = InstructorSchema.omit({ id: true });
type NewInstructor = Omit<Instructor, 'id'>;


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

export async function addInstructor(instructorData: NewInstructor): Promise<string> {
    if (!db) throw new Error("Firestore not initialized.");
    
    // Validate data before adding
    const validatedData = NewInstructorSchema.parse(instructorData);

    const instructorsCol = collection(db, 'instructors');
    const docRef = await addDoc(instructorsCol, validatedData);
    return docRef.id;
}

export async function updateInstructor(id: string, instructorData: Partial<NewInstructor>): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    const instructorDoc = doc(db, 'instructors', id);
    // Here we don't need full validation, as it's a partial update
    await updateDoc(instructorDoc, instructorData);
}

export async function deleteInstructor(id: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    await deleteDoc(doc(db, 'instructors', id));
}
