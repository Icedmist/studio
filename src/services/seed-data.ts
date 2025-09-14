
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { courses as coursesToSeedStatic } from '@/lib/courses';

const coursesToSeed: NewCourse[] = coursesToSeedStatic.map(({id, progress, ...course}) => course);


export async function seedInitialCourses(): Promise<number> {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);

    if (!snapshot.empty) {
        console.log('Courses collection is not empty. Skipping seed.');
        return 0;
    }

    console.log(`Courses collection is empty. Seeding ${coursesToSeed.length} initial courses...`);
    try {
        // Chunk the writes to avoid exceeding Firestore's batch limit of 500 operations.
        const chunkSize = 10;
        const chunks = [];
        for (let i = 0; i < coursesToSeed.length; i += chunkSize) {
            chunks.push(coursesToSeed.slice(i, i + chunkSize));
        }

        let seededCount = 0;
        for (const chunk of chunks) {
            const batch = writeBatch(db);
            chunk.forEach(courseData => {
                // Use the static ID from the courses.ts file
                const newCourseDoc = doc(coursesCollection, (courseData as any).id);
                const validationResult = NewCourseSchema.safeParse(courseData);
                if (validationResult.success) {
                    batch.set(newCourseDoc, validationResult.data);
                    seededCount++;
                } else {
                    console.warn("Course validation failed for:", courseData.title, validationResult.error.flatten());
                }
            });
            console.log(`Committing a chunk of ${chunk.length} courses...`);
            await batch.commit();
        }

        console.log(`Successfully seeded ${seededCount} courses.`);
        return seededCount;
    } catch (error) {
        console.error("Error during batch commit for seeding courses:", error);
        throw new Error(`Failed to commit seed data to Firestore: ${(error as Error).message}`);
    }
}
