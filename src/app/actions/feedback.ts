'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FeedbackSchema, type Feedback } from '@/lib/types';
import { z } from 'zod';

const FormFeedbackSchema = FeedbackSchema.omit({ userId: true, createdAt: true });

export async function submitFeedback(data: z.infer<typeof FormFeedbackSchema>, userId: string | null) {
    try {
        const feedbackData = {
            ...data,
            userId: userId ?? undefined,
            createdAt: serverTimestamp()
        };

        const validatedData = FeedbackSchema.omit({createdAt: true}).partial({userId: true}).parse(feedbackData);
        
        await addDoc(collection(db, 'feedback'), {
            ...validatedData,
            createdAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to submit feedback:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: errorMessage };
    }
}
