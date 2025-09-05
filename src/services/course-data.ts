
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/types';

export function getCourses(): Course[] {
    // Since courses are now static, just return them with a default progress value.
    return courses.map(course => ({ ...course, progress: 0 }));
}

export function getCourse(id: string): Course | null {
    const course = courses.find(c => c.id === id);
    if (course) {
        return { ...course, progress: 0 };
    }
    return null;
}
