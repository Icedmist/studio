'use server';

/**
 * @fileOverview This file defines the Tech Gee chatbot flow, which allows students to ask questions about course content and receive helpful answers.
 *
 * - techGeeChatbot - A function that handles the chatbot interaction.
 * - TechGeeChatbotInput - The input type for the techGeeChatbot function.
 * - TechGeeChatbotOutput - The return type for the techGeeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TechGeeChatbotInputSchema = z.object({
  question: z.string().describe('The question asked by the student.'),
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
  prompt: `You are Tech Gee, an AI chatbot assistant for the TechTradeHub Academy.

  You are an expert in futures trading, web3, crypto, tech skills, AI & Machine Learning.
  Your job is to provide helpful and informative answers to student questions about course content.
  Be concise and to the point, unless the question calls for a more detailed answer.

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
