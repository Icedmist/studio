'use server';

/**
 * @fileOverview This file defines the Tech Gee chatbot flow, which allows students to ask questions about course content and receive helpful answers.
 * It can also access student progress data and search the course catalog to provide personalized responses.
 *
 * - techGeeChatbot - A function that handles the chatbot interaction.
 * - TechGeeChatbotInput - The input type for the techGeeChatbot function.
 * - TechGeeChatbotOutput - The return type for the techGeeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getStudentProgress } from '@/services/student-data';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/types';
import { StudentProgressSchema } from '@/lib/types';

// Tool to get student progress
const getStudentProgressTool = ai.defineTool(
  {
    name: 'getStudentProgress',
    description: 'Get the current academic progress for a student. Use this to answer questions about their performance, what to study next, or their overall status.',
    inputSchema: z.object({ studentId: z.string().describe("The student's unique ID.") }),
    outputSchema: StudentProgressSchema,
  },
  async ({ studentId }) => {
    // In a real app, you might want to handle errors here
    return getStudentProgress(studentId);
  }
);

// New Tool to search courses
const searchCoursesTool = ai.defineTool(
  {
    name: 'searchCourses',
    description: 'Search the course catalog to find courses that match a user\'s query. Use this to answer questions about what courses are available, what a student can learn, or to find specific courses.',
    inputSchema: z.object({ query: z.string().describe('The user\'s search query for courses. Can be a topic, category, or course title.') }),
    outputSchema: z.array(z.object({ // A simplified course schema for the tool
        id: z.string(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
        level: z.string(),
        price: z.number(),
    })),
  },
  async ({ query }) => {
    const lowerCaseQuery = query.toLowerCase();
    const matchingCourses = courses.filter(course => 
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.description.toLowerCase().includes(lowerCaseQuery) ||
        course.category.toLowerCase().includes(lowerCaseQuery) ||
        course.level.toLowerCase().includes(lowerCaseQuery)
    ).map(course => ({ // return simplified version
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level,
        price: course.price,
    }));
    return matchingCourses.slice(0, 5); // Return a max of 5 courses to keep response concise
  }
);


const TechGeeChatbotInputSchema = z.object({
  question: z.string().describe('The question asked by the student.'),
  studentId: z.string().optional().describe("The student's unique ID. Only available if the user is logged in."),
  courseContent: z.string().optional().describe('Relevant course content to help answer the question.'),
});
export type TechGeeChatbotInput = z.infer<typeof TechGeeChatbotInputSchema>;

const TechGeeChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer provided by Tech Gee, the AI chatbot.'),
});
export type TechGeeChatbotOutput = z.infer<typeof TechGeeChatbotOutputSchema>;

export async function techGeeChatbot(input: TechGeeChatbotInput): Promise<TechGeeChatbotOutput> {
  return techGeeChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'techGeeChatbotPrompt',
  input: {schema: TechGeeChatbotInputSchema},
  output: {schema: TechGeeChatbotOutputSchema},
  tools: [getStudentProgressTool, searchCoursesTool],
  prompt: `You are Tech Gee, the AI assistant for TechTradeHub Academy. Your purpose is to help students with their learning journey.

  **Your Core Directives:**
  1.  **Stay On Topic:** You are an expert on the content within TechTradeHub Academy ONLY. This includes all courses, student progress, and general academy information.
  2.  **Use Your Tools:** You MUST use the provided tools ('getStudentProgress' and 'searchCourses') to answer relevant questions.
  3.  **Decline Off-Topic Questions:** If a question is not about the academy, its courses, or the student's progress, you MUST politely decline. For example, if asked about the weather or general knowledge, respond with something like: "I can only help with questions about TechTradeHub Academy and its courses. How can I assist you with your learning journey?"
  4.  **Be Personable:** Your personality is cool, helpful, and encouraging, like a friendly senior student or TA. Keep your answers concise and use emojis where appropriate.

  **Tool Usage Guide:**
  - **getStudentProgress**: Use this tool if a student asks about their performance, course status, or what to study next. When you get the results, address the student by their name (e.g., "Hi, Alex! Here's how you're doing..."). The tool returns a full progress object, including the student's name.
  - **searchCourses**: Use this tool to find and recommend courses from the catalog. Provide a helpful summary, including the course title and description.

  **Contextual Information:**
  {{#if studentId}}
  The current student's ID is {{{studentId}}}. You can use this ID with the 'getStudentProgress' tool.
  {{else}}
  The user is not logged in. You cannot access their progress, but you can still answer general questions and search for courses.
  {{/if}}

  {{#if courseContent}}
  Use the following course content to answer the question if provided:
  Course Content: {{{courseContent}}}
  {{/if}}

  Question: {{{question}}}
  `, 
});

const techGeeChatbotFlow = ai.defineFlow(
  {
    name: 'techGeeChatbotFlow',
    inputSchema: TechGeeChatbotInputSchema,
    outputSchema: TechGeeChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
