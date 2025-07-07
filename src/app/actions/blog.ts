'use server';

import { revalidatePath } from 'next/cache';
import { addPost, updatePost, deletePost } from '@/services/blog-data';
import type { Blog } from '@/lib/types';
import { auth } from '@/lib/firebase';
import { getStudentProgress } from '@/services/student-data';
import { NewBlogSchema } from '@/lib/types';
import { z } from 'zod';

type NewPostData = z.infer<typeof NewBlogSchema>;

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}


export async function handleAddPost(postData: NewPostData) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("You must be logged in to create a post.");

        const studentProfile = await getStudentProgress(user.uid);
        
        const slug = slugify(postData.title);

        const dataToSave = {
            ...postData,
            slug,
            authorId: user.uid,
            authorName: studentProfile.name,
        }
        
        await addPost(dataToSave);

        revalidatePath('/admin');
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error("Failed to add blog post:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleUpdatePost(id: string, postData: Partial<NewPostData>) {
    try {
        const dataToUpdate = postData.title ? { ...postData, slug: slugify(postData.title) } : postData;
        
        await updatePost(id, dataToUpdate);

        revalidatePath('/admin');
        revalidatePath('/blog');
        if (dataToUpdate.slug) {
            revalidatePath(`/blog/${dataToUpdate.slug}`);
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to update blog post:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleDeletePost(id: string) {
    try {
        await deletePost(id);
        revalidatePath('/admin');
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete blog post:", error);
        return { success: false, error: (error as Error).message };
    }
}
