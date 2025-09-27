
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { courses as coursesToSeedStatic } from '@/lib/courses';

const coursesToSeed: NewCourse[] = coursesToSeedStatic.map(({id, progress, ...course}) => ({
    ...course,
    // Ensure the ID is part of the data being seeded so we can reference it.
    // This is a temporary measure for seeding. The final document ID will be the one used.
    id: id, 
}));

export async function seedInitialCourses(): Promise<number> {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);

    if (!snapshot.empty) {
        console.log('Courses collection is not empty. Skipping seed.');
        return 0;
    }

    console.log(`Courses collection is empty. Seeding ${coursesToSeed.length} initial courses...`);
    try {
        const chunkSize = 400; // Firestore batch limit is 500 operations
        let seededCount = 0;

        for (let i = 0; i < coursesToSeed.length; i += chunkSize) {
            const batch = writeBatch(db);
            const chunk = coursesToSeed.slice(i, i + chunkSize);
            
            chunk.forEach(courseData => {
                const courseId = (courseData as any).id;
                // Omit the temporary 'id' field from the data written to Firestore
                const { id, ...dataToSave } = courseData; 

                const validationResult = NewCourseSchema.safeParse(dataToSave);
                
                if (validationResult.success) {
                    const newCourseDoc = doc(coursesCollection, courseId);
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
