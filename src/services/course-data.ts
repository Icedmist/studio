
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, type DocumentData } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { seedInitialCourses } from './seed-data';

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
    
    let courseSnapshot = await getDocs(coursesCol);

    // If the database is empty, seed it and re-fetch.
    if (courseSnapshot.empty) {
        console.log("Course collection is empty. Attempting to seed...");
        try {
            await seedInitialCourses();
            console.log("Seeding complete. Re-fetching courses.");
            courseSnapshot = await getDocs(coursesCol);
        } catch (error) {
            console.error("Failed to seed courses:", error);
            // Return empty array or throw error if seeding fails
            return [];
        }
    }

    const courseList = courseSnapshot.docs.map(doc => toCourse(doc));
    return courseList;
}

export async function getCourse(id: string): Promise<Course | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const courseDoc = doc(db, 'courses', id);
    const courseSnapshot = await getDoc(courseDoc);
    if (courseSnapshot.exists()) {
        return toCourse(courseSnapshot);
    }
    return null;
}
