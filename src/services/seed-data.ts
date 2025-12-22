
'use server';

import { db } from '@/lib/firebase';
import { collection, writeBatch, doc } from "firebase/firestore";
import type { NewCourse } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { courses as coursesToSeedStatic } from '@/lib/courses';
import { errorEmitter } from '@/firebase/error-emitter';

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
            const courseToValidate: Omit<NewCourse, 'id'> = {
                title: course.title,
                description: course.description,
                longDescription: course.longDescription,
                category: course.category,
                level: course.level,
                imageUrl: course.imageUrl,
                modules: course.modules.map(module => ({
                    ...module,
                    lessons: module.lessons.map(lesson => ({
                        ...lesson,
                        completed: lesson.completed || false
                    })),
                    quiz: module.quiz || [],
                })),
                finalAssessment: course.finalAssessment || [],
                price: course.price,
                duration: course.duration,
                instructor: course.instructor,
            };
            
            const validationResult = NewCourseSchema.safeParse(courseToValidate);
            
            if (validationResult.success) {
                const newCourseDoc = doc(coursesCollection, course.id);
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
                errorEmitter.emit('permission-error', {
                    path: `collection '${coursesCollection.path}' (batched write)`,
                    operation: 'create'
                });
                return 0;
             }
             console.error("Error during batch commit for seeding courses:", serverError);
             throw new Error(`Failed to commit seed data to Firestore. Check console for details. Error: ${serverError.code || serverError.message}`);
        }
    }

    console.log(`Successfully seeded ${seededCount} courses.`);
    return seededCount;
}
