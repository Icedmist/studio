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

// Tool to get student progress
const getStudentProgressTool = ai.defineTool(
  {
    name: 'getStudentProgress',
    description: 'Get the current academic progress for a student. Use this to answer questions about their performance, what to study next, or their overall status.',
    inputSchema: z.object({ studentId: z.string().describe("The student's unique ID.") }),
    outputSchema: z.any(), // Using z.any() because StudentProgress type is complex for a direct schema. The description will guide the model.
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
  prompt: `You are Tech Gee, an AI chatbot assistant for the TechTradeHub Academy.

  You are an expert in futures trading, web3, crypto, tech skills, AI & Machine Learning. 
  Your personality is cool, helpful, and encouraging, like a friendly senior student or TA. Keep your answers concise and use emojis where appropriate.

  You have access to two tools:
  1. 'getStudentProgress': Use this tool to check the student's progress if they ask about how they're doing, what they should study next, or anything related to their performance. This tool requires a 'studentId'. If you don't have a studentId, you cannot use this tool.
  2. 'searchCourses': Use this to search the course catalog. If a user asks about available courses, what they can learn, or for recommendations, use this tool to find relevant courses.

  When a user asks about courses, provide a helpful summary. If you find multiple courses, list them clearly. Include the course title and a brief description.

  {{#if studentId}}
  The current student's ID is {{{studentId}}}.
  {{else}}
  The user is not logged in. Do not try to access their progress. You can still answer general questions and search for courses.
  {{/if}}

  Use the following course content to answer the question if provided:
  {{#if courseContent}}
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
