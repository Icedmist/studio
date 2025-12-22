
'use server';

import { courses as staticCourses } from '@/lib/courses';
import type { Course } from '@/lib/types';

/**
 * Fetches all courses from the local static file.
 * @returns A promise that resolves to an array of Course objects.
 */
export async function getCourses(): Promise<Course[]> {
  // Map the static data to the Course type, adding a default progress of 0
  const allCourses: Course[] = staticCourses.map(course => ({
    ...course,
    progress: 0, // Default progress for a course not yet enrolled by a user
  }));
  return allCourses;
}

/**
 * Fetches a single course by its ID from the local static file.
 * @param id The ID of the course to fetch.
 * @returns A promise that resolves to the Course object or null if not found.
 */
export async function getCourse(id: string): Promise<Course | null> {
  const courseData = staticCourses.find(c => c.id === id);
  if (courseData) {
    return {
      ...courseData,
      progress: 0, // Default progress
    };
  }
  return null;
}
