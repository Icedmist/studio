'use server';

import { revalidatePath } from 'next/cache';
import { addCourse, updateCourse, deleteCourse } from '@/services/course-data';
import type { Course } from '@/lib/types';

type NewCourse = Omit<Course, 'id' | 'progress'>;

export async function handleAddCourse(courseData: NewCourse) {
    try {
        await addCourse(courseData);
        revalidatePath('/admin');
        revalidatePath('/courses');
        return { success: true };
    } catch (error) {
        console.error("Failed to add course:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleUpdateCourse(id: string, courseData: Partial<NewCourse>) {
    try {
        await updateCourse(id, courseData);
        revalidatePath('/admin');
        revalidatePath('/courses');
        revalidatePath(`/courses/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update course:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleDeleteCourse(id: string) {
    try {
        await deleteCourse(id);
        revalidatePath('/admin');
        revalidatePath('/courses');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete course:", error);
        return { success: false, error: (error as Error).message };
    }
}
