
'use server';

import { db } from '@/lib/firebase';
import { collection, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { courses as coursesToSeedStatic } from '@/lib/courses';

// This maps the static course data into a format that can be seeded.
const coursesToSeed: NewCourse[] = coursesToSeedStatic.map(({id, progress, ...course}) => (
    NewCourseSchema.parse(course)
));

// We need the original IDs for creating the documents
const courseIds = coursesToSeedStatic.map(c => c.id);


export async function seedInitialCourses(): Promise<number> {
    const coursesCollection = collection(db, 'courses');
    
    console.log(`Attempting to seed ${coursesToSeed.length} initial courses...`);
    
    const chunkSize = 400; // Firestore batch limit is 500 operations
    let seededCount = 0;

    for (let i = 0; i < coursesToSeed.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = coursesToSeed.slice(i, i + chunkSize);
        const idChunk = courseIds.slice(i, i + chunkSize);
        
        chunk.forEach((courseData, index) => {
            const courseId = idChunk[index];
            const validationResult = NewCourseSchema.safeParse(courseData);
            
            if (validationResult.success) {
                const newCourseDoc = doc(coursesCollection, courseId);
                batch.set(newCourseDoc, validationResult.data);
                seededCount++;
            } else {
                console.warn("Course validation failed for:", courseData.title, validationResult.error.flatten());
            }
        });

        console.log(`Committing a chunk of ${chunk.length} courses...`);
        try {
            await batch.commit();
        } catch (serverError: any) {
             console.error("Error during batch commit for seeding courses:", serverError);
             throw new Error(`Failed to commit seed data to Firestore: ${serverError.message}`);
        }
    }

    console.log(`Successfully seeded ${seededCount} courses.`);
    return seededCount;
}
