'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, serverTimestamp, type DocumentData, orderBy } from "firebase/firestore";
import type { Blog } from '@/lib/types';
import { BlogSchema, NewBlogSchema } from '@/lib/types';

type NewBlog = Omit<Blog, 'id' | 'createdAt' | 'publishedAt'>;

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
    
    let q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    
    if (status) {
        q = query(q, where('status', '==', status));
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

export async function addPost(postData: Omit<NewBlog, 'id'>): Promise<string> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const dataWithTimestamp = {
        ...postData,
        createdAt: serverTimestamp(),
        publishedAt: postData.status === 'published' ? serverTimestamp() : null,
    };

    const docRef = await addDoc(collection(db, 'blogPosts'), dataWithTimestamp);
    return docRef.id;
}

export async function updatePost(id: string, postData: Partial<NewBlog>): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    const postDoc = doc(db, 'blogPosts', id);

    const dataToUpdate: any = { ...postData };
    
    const currentDoc = await getDoc(postDoc);
    const currentStatus = currentDoc.data()?.status;

    if (postData.status === 'published' && currentStatus !== 'published') {
        dataToUpdate.publishedAt = serverTimestamp();
    }
    
    await updateDoc(postDoc, dataToUpdate);
}

export async function deletePost(id: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    await deleteDoc(doc(db, 'blogPosts', id));
}
