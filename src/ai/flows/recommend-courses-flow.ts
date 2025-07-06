'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending courses to students.
 * It uses a student's progress and the full course catalog to provide personalized recommendations.
 *
 * - recommendCourses - A function that suggests the next best courses for a student.
 * - RecommendCoursesInput - The input type for the recommendCourses function.
 * - RecommendCoursesOutput - The return type for the recommendCourses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { StudentProgressSchema, CourseSchema } from '@/lib/types';
import type { Course, StudentProgress } from '@/lib/types';
import { courses } from '@/lib/courses';

const RecommendCoursesInputSchema = z.object({
  studentProgress: StudentProgressSchema.describe("The student's current progress, including enrolled courses."),
  allCourses: z.array(CourseSchema).describe('The full catalog of all available courses.'),
});
export type RecommendCoursesInput = z.infer<typeof RecommendCoursesInputSchema>;

const RecommendCoursesOutputSchema = z.object({
  recommendations: z.array(CourseSchema).describe('An array of up to 4 recommended courses for the student.'),
});
export type RecommendCoursesOutput = z.infer<typeof RecommendCoursesOutputSchema>;

export async function recommendCourses(studentProgress: StudentProgress): Promise<Course[]> {
   const input = { studentProgress, allCourses: courses };
   const result = await recommendCoursesFlow(input);
   // The AI might recommend a course the user is already enrolled in, so we filter those out.
   const enrolledIds = new Set(studentProgress.enrolledCourses.map(c => c.id));
   return result.recommendations.filter(rec => !enrolledIds.has(rec.id));
}

const prompt = ai.definePrompt({
  name: 'recommendCoursesPrompt',
  input: { schema: RecommendCoursesInputSchema },
  output: { schema: RecommendCoursesOutputSchema },
  prompt: `You are an expert academic advisor for the TechTradeHub Academy.
  Your goal is to help students find the next course on their learning journey.

  You will be given the student's current progress, which includes all the courses they are currently enrolled in or have completed.
  You will also be given the full catalog of all available courses.

  Based on this information, you must recommend up to FOUR courses that would be a good next step for the student.

  Your recommendation logic should be as follows:
  1.  **Direct Progression**: If the student has completed a 'Beginner' course, prioritize recommending the 'Intermediate' course in the same category. Similarly, recommend 'Advanced' courses after 'Intermediate' ones.
  2.  **Broaden Horizons**: If the student has completed several courses in one category (e.g., 'Futures Trading'), suggest a relevant 'Beginner' course from a related category (e.g., 'AI & Machine Learning' or 'Crypto').
  3.  **Do Not Recommend Enrolled Courses**: Your final list of recommendations MUST NOT include any courses that the student is already enrolled in.
  4.  **Fill the Gap**: If you can't find enough recommendations through the logic above, suggest popular 'Beginner' courses in categories the student hasn't touched yet.

  Return a list of up to four recommended courses.`,
});

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: RecommendCoursesInputSchema,
    outputSchema: RecommendCoursesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
