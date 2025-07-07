'use server';

import { revalidatePath } from 'next/cache';
import { addInstructor, updateInstructor, deleteInstructor } from '@/services/instructor-data';
import type { Instructor } from '@/lib/types';

type NewInstructor = Omit<Instructor, 'id'>;

export async function handleAddInstructor(instructorData: NewInstructor) {
    try {
        await addInstructor(instructorData);
        revalidatePath('/admin');
        revalidatePath('/about');
        return { success: true };
    } catch (error) {
        console.error("Failed to add instructor:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleUpdateInstructor(id: string, instructorData: Partial<NewInstructor>) {
    try {
        await updateInstructor(id, instructorData);
        revalidatePath('/admin');
        revalidatePath('/about');
        return { success: true };
    } catch (error) {
        console.error("Failed to update instructor:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleDeleteInstructor(id: string) {
    try {
        await deleteInstructor(id);
        revalidatePath('/admin');
        revalidatePath('/about');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete instructor:", error);
        return { success: false, error: (error as Error).message };
    }
}
