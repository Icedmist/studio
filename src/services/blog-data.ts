'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, serverTimestamp, type DocumentData, orderBy } from "firebase/firestore";
import type { Blog } from '@/lib/types';
import { BlogSchema } from '@/lib/types';

type NewBlog = Omit<Blog, 'id' | 'createdAt' | 'publishedAt'>;

// Helper to convert Firestore doc to Blog type
const toBlog = (doc: DocumentData): Blog => {
    const data = doc.data();
    return BlogSchema.parse({
        id: doc.id,
        ...data,
    });
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function getPosts(status?: 'published' | 'draft'): Promise<Blog[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    let q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    
    if (status) {
        q = query(q, where('status', '==', status));
    }

    const postsSnapshot = await getDocs(q);
    let postList = postsSnapshot.docs.map(doc => toBlog(doc));

    // If there are no posts at all, create a welcome post.
    if (postList.length === 0 && !status) {
        console.log('No blog posts found. Seeding a welcome post.');
        const welcomePostContent = `Welcome to the official blog of TechTradeHub Academy! We are thrilled to have you here as part of our growing community of learners, innovators, and future leaders in the tech and finance industries.

### Our Vision
At TechTradeHub, our mission is simple: to democratize education in cutting-edge fields. We believe that everyone, regardless of their background, deserves access to high-quality, practical knowledge in areas like Futures Trading, Web3, Cryptocurrency, AI & Machine Learning, and other essential Tech Skills. The digital landscape is evolving at a breakneck pace, and we're here to ensure you have the tools and expertise to not just keep up, but to get ahead.

### What to Expect from This Blog
This blog will be your go-to resource for a variety of topics, including:
- **In-depth Tutorials:** Step-by-step guides on complex topics from our courses.
- **Industry Insights:** Analysis of market trends, new technologies, and what they mean for you.
- **Student Success Stories:** Get inspired by the journeys of fellow learners from our community.
- **Academy News & Updates:** Be the first to know about new courses, features, and events.
- **Career Advice:** Tips and tricks to help you land your dream job in tech or finance.

### Your Journey Starts Now
Whether you're a complete beginner looking to take your first step into a new field, or a seasoned professional aiming to sharpen your skills, you've come to the right place. Our courses are designed by industry experts to be practical, engaging, and immediately applicable.

We invite you to explore our [course library](/courses), engage with our content, and join the conversation. Your journey to mastering the future starts today.

Let's build the future, together.

Warmly,
The TechTradeHub Academy Team`;
        
        const welcomePost = {
            title: 'Welcome to TechTradeHub Academy: Your Journey to Mastery Begins!',
            slug: 'welcome-to-techtradehub-academy',
            content: welcomePostContent,
            imageUrl: 'https://placehold.co/800x400.png',
            authorName: 'The TechTradeHub Team',
            authorId: 'system',
            status: 'published' as const,
        };
        
        await addDoc(collection(db, 'blogPosts'), {
            ...welcomePost,
            createdAt: serverTimestamp(),
            publishedAt: serverTimestamp(),
        });

        // Re-fetch to include the newly created post
        const newSnapshot = await getDocs(q);
        postList = newSnapshot.docs.map(doc => toBlog(doc));
    }

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
