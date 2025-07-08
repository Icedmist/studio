'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, where, type DocumentData, orderBy } from "firebase/firestore";
import type { Blog } from '@/lib/types';
import { BlogSchema } from '@/lib/types';

// Helper to convert Firestore doc to Blog type
const toBlog = (doc: DocumentData): Blog => {
    const data = doc.data();
    return BlogSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getPosts(status?: 'published' | 'draft'): Promise<Blog[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    let q;
    const blogPostsCollection = collection(db, 'blogPosts');
    
    if (status) {
        q = query(blogPostsCollection, where('status', '==', status), orderBy('createdAt', 'desc'));
    } else {
        q = query(blogPostsCollection, orderBy('createdAt', 'desc'));
    }

    const postsSnapshot = await getDocs(q);
    const postList = postsSnapshot.docs.map(doc => toBlog(doc));
    
    return postList;
}

export async function getPost(id: string): Promise<Blog | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const postDoc = doc(db, 'blogPosts', id);
    const postSnapshot = await getDoc(postDoc);
    if (postSnapshot.exists()) {
        return toBlog(postSnapshot);
    }
    return null;
}

export async function getPostBySlug(slug: string): Promise<Blog | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug), where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    return toBlog(snapshot.docs[0]);
}
