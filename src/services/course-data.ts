'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, type DocumentData } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema, NewCourseSchema } from '@/lib/types';

type NewCourse = Omit<Course, 'id' | 'progress'>;

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
    if (!db) throw new Error("Firestore not initialized.");
    const coursesCol = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCol);
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

export async function addCourse(courseData: NewCourse): Promise<string> {
    if (!db) throw new Error("Firestore not initialized.");
    
    // Validate data before adding
    const validatedData = NewCourseSchema.parse(courseData);

    const coursesCol = collection(db, 'courses');
    const docRef = await addDoc(coursesCol, validatedData);
    return docRef.id;
}

export async function updateCourse(id: string, courseData: Partial<NewCourse>): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    const courseDoc = doc(db, 'courses', id);
    await updateDoc(courseDoc, courseData);
}

export async function deleteCourse(id: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    await deleteDoc(doc(db, 'courses', id));
}
