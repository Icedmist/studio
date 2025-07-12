
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, type DocumentData } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';

// Helper to convert Firestore doc to Course type
const toCourse = (doc: DocumentData): Course => {
    const data = doc.data();
    return CourseSchema.parse({
        ...data,
        id: doc.id,
        progress: 0, // Default progress for a course not in student context
    });
};

export async function getCourses(): Promise<Course[]> {
    console.log("Fetching courses from Firestore...");
    if (!db) throw new Error("Firestore not initialized.");
    const coursesCol = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCol);
    const courseList = courseSnapshot.docs.map(doc => toCourse(doc));
    console.log(`Found ${courseList.length} courses.`);
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
