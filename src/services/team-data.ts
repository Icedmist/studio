
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, type DocumentData } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';
import { TeamMemberSchema } from '@/lib/types';
import { cache } from 'react';

// Helper to convert Firestore doc to TeamMember type
const toTeamMember = (doc: DocumentData): TeamMember => {
  const data = doc.data();
  return TeamMemberSchema.parse({
    id: doc.id,
    ...data,
  });
};

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  if (!db) {
    throw new Error('Firestore not initialized.');
  }

  const teamCollection = collection(db, 'team');
  const q = query(teamCollection, orderBy('name', 'asc'));

  try {
    const teamSnapshot = await getDocs(q);
    const teamList = teamSnapshot.docs.map(doc => toTeamMember(doc));
    return teamList;
  } catch (error: any) {
    console.error('Firestore error fetching team members:', error);
    throw new Error(`Failed to fetch team members: ${error.message}`);
  }
});
