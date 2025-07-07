import { z } from 'zod';
import { COURSE_CATEGORIES, COURSE_LEVELS } from './constants';

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];

// Zod schema for a Lesson
const LessonSchema = z.object({
  title: z.string(),
  duration: z.string(),
});

// Zod schema for a Module
const ModuleSchema = z.object({
  title: z.string(),
  lessons: z.array(LessonSchema),
});

// Zod schema for a Course
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string(),
  category: z.enum(COURSE_CATEGORIES),
  level: z.enum(COURSE_LEVELS),
  imageUrl: z.string(),
  progress: z.number().min(0).max(100),
  modules: z.array(ModuleSchema),
  price: z.number(),
  duration: z.string(),
  instructor: z.string(),
});
export type Course = z.infer<typeof CourseSchema>;


// Zod schema for StudentProgress
export const StudentProgressSchema = z.object({
    studentId: z.string(),
    name: z.string(),
    enrolledCourses: z.array(CourseSchema),
    overallProgress: z.number(),
    completedCourses: z.number(),
    coursesInProgress: z.number(),
});
export type StudentProgress = z.infer<typeof StudentProgressSchema>;

// Zod schema for an Instructor
export const InstructorSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
  socials: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});
export type Instructor = z.infer<typeof InstructorSchema>;
