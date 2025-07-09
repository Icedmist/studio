'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, where, orderBy, type DocumentData } from "firebase/firestore";
import type { Event } from '@/lib/types';
import { EventSchema } from '@/lib/types';

// Helper to convert Firestore doc to Event type
const toEvent = (doc: DocumentData): Event => {
    const data = doc.data();
    return EventSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getEvents(status?: 'upcoming' | 'past' | 'cancelled'): Promise<Event[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const eventsCollection = collection(db, 'events');
    let q;

    if (status) {
        q = query(eventsCollection, where('status', '==', status), orderBy('date', 'desc'));
    } else {
        q = query(eventsCollection, orderBy('date', 'desc'));
    }

    const eventsSnapshot = await getDocs(q);
    const eventList = eventsSnapshot.docs.map(doc => toEvent(doc));
    
    return eventList;
}

export async function getEvent(id: string): Promise<Event | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const eventDoc = doc(db, 'events', id);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
        return toEvent(eventSnapshot);
    }
    return null;
}
