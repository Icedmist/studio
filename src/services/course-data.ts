
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, type DocumentData, where } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';

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
    
    const coursesSnapshot = await getDocs(q);
    const courseList = coursesSnapshot.docs.map(doc => toCourse(doc));
    return courseList;
}

export async function getCourse(id: string): Promise<Course | null> {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }
    const courseDocRef = doc(db, 'courses', id);

    const courseSnapshot = await getDoc(courseDocRef);
    if (courseSnapshot.exists()) {
        return toCourse(courseSnapshot);
    }
    return null;
}
