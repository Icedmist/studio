'use server';

/**
 * @fileOverview This file defines the Tech Gee chatbot flow, which allows students to ask questions about course content and receive helpful answers.
 * It can also access student progress data to provide personalized responses.
 *
 * - techGeeChatbot - A function that handles the chatbot interaction.
 * - TechGeeChatbotInput - The input type for the techGeeChatbot function.
 * - TechGeeChatbotOutput - The return type for the techGeeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getStudentProgress } from '@/services/student-data';

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


const TechGeeChatbotInputSchema = z.object({
  question: z.string().describe('The question asked by the student.'),
  studentId: z.string().describe("The student's unique ID."),
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
  tools: [getStudentProgressTool],
  prompt: `You are Tech Gee, an AI chatbot assistant for the TechTradeHub Academy.

  You are an expert in futures trading, web3, crypto, tech skills, AI & Machine Learning. 
  Your personality is cool, helpful, and encouraging, like a friendly senior student or TA. Keep your answers concise and use emojis where appropriate.

  You have access to a tool to check the student's progress. If they ask about how they're doing, what they should study next, or anything related to their performance, use the 'getStudentProgress' tool to get their data and provide a personalized, helpful response.

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
