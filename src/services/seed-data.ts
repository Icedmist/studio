
'use server';

import { db } from '@/lib/firebase';
import { collection, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { courses as coursesToSeedStatic } from '@/lib/courses';

export async function seedInitialCourses(): Promise<number> {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }
    const coursesCollection = collection(db, 'courses');
    console.log(`Attempting to seed ${coursesToSeedStatic.length} initial courses...`);

    const chunkSize = 400; // Firestore batch limit is 500 operations
    let seededCount = 0;

    for (let i = 0; i < coursesToSeedStatic.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = coursesToSeedStatic.slice(i, i + chunkSize);
        
        chunk.forEach((course) => {
            // Remove 'id' and 'progress' from the static course object before validation
            // because they are not part of the NewCourseSchema
            const { id, ...courseData } = course;

            const validationResult = NewCourseSchema.safeParse(courseData);
            
            if (validationResult.success) {
                // Use the original static course id for the document ID
                const newCourseDoc = doc(coursesCollection, id);
                batch.set(newCourseDoc, validationResult.data);
                seededCount++;
            } else {
                console.warn(`Course validation failed for: ${course.title}`, validationResult.error.flatten());
            }
        });

        console.log(`Committing a chunk of ${chunk.length} courses...`);
        try {
            await batch.commit();
        } catch (serverError: any) {
             if (serverError.code === 'permission-denied') {
                 // No need to emit here, the UI will show the descriptive error toast
                 throw new Error("Permission Denied. Please ensure your Firebase UID is correctly added to the admin list in both /src/lib/admin.ts and firestore.rules.");
             }
             console.error("Error during batch commit for seeding courses:", serverError);
             throw new Error(`Failed to commit seed data to Firestore. Check console for details. Error: ${serverError.code || serverError.message}`);
        }
    }

    console.log(`Successfully seeded ${seededCount} courses.`);
    return seededCount;
}

    