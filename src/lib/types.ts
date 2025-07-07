import { z } from 'zod';
import { COURSE_CATEGORIES, COURSE_LEVELS } from './constants';
import { serverTimestamp } from 'firebase/firestore';

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];

// Zod schema for a Lesson
const LessonSchema = z.object({
  title: z.string().min(1, 'Lesson title cannot be empty'),
  duration: z.string().min(1, 'Lesson duration cannot be empty'),
});

// Zod schema for a Module
const ModuleSchema = z.object({
  title: z.string().min(1, 'Module title cannot be empty'),
  lessons: z.array(LessonSchema).min(1, 'A module must have at least one lesson'),
});

// Zod schema for a Course
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Short description is required'),
  longDescription: z.string().min(1, 'Long description is required'),
  category: z.enum(COURSE_CATEGORIES),
  level: z.enum(COURSE_LEVELS),
  imageUrl: z.string().url('Must be a valid URL'),
  progress: z.number().min(0).max(100),
  modules: z.array(ModuleSchema).min(1, 'A course must have at least one module'),
  price: z.number().min(0, 'Price cannot be negative'),
  duration: z.string().min(1, 'Duration is required'),
  instructor: z.string().min(1, 'Instructor name is required'),
});
export type Course = z.infer<typeof CourseSchema>;

export const NewCourseSchema = CourseSchema.omit({ id: true, progress: true });
export type NewCourse = z.infer<typeof NewCourseSchema>;


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
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL'),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
});
export type Instructor = z.infer<typeof InstructorSchema>;

// Zod schema for feedback
export const FeedbackSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Feedback must be at least 10 characters long." }),
  userId: z.string().optional(),
  createdAt: z.custom<ReturnType<typeof serverTimestamp>>(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

// Zod schema for a Blog Post
export const BlogSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('A valid image URL is required'),
  authorName: z.string().min(1, 'Author name is required'),
  authorId: z.string().optional(),
  status: z.enum(['draft', 'published']),
  createdAt: z.any(), // Firestore Timestamp
  publishedAt: z.any().optional(), // Firestore Timestamp
});
export type Blog = z.infer<typeof BlogSchema>;

export const NewBlogSchema = BlogSchema.omit({ id: true, slug: true, authorId: true, createdAt: true, publishedAt: true });
