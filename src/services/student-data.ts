// Mock service to simulate fetching student data.
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/types';

// In a real app, you'd fetch this from a database based on an authenticated user.
const MOCK_STUDENT_ID = 'user_alex_johnson'; 

export interface StudentProgress {
    studentId: string;
    name: string;
    enrolledCourses: Course[];
    overallProgress: number;
    completedCourses: number;
    coursesInProgress: number;
}

export async function getStudentProgress(studentId: string = MOCK_STUDENT_ID): Promise<StudentProgress> {
    // This is mock data. A real implementation would query a database.
    const studentName = "Alex Johnson";
    const enrolledCourses = courses.filter(c => c.progress > 0);
    const completedCourses = enrolledCourses.filter(c => c.progress === 100);
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    const overallProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

    return {
        studentId,
        name: studentName,
        enrolledCourses,
        overallProgress,
        completedCourses: completedCourses.length,
        coursesInProgress: enrolledCourses.length - completedCourses.length,
    };
}
