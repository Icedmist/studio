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
import { getCourses } from '@/services/course-data';
import { getInstructors } from '@/services/instructor-data';
import { getPosts } from '@/services/blog-data';
import { getEvents } from '@/services/event-data';
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
    return getStudentProgress(studentId);
  }
);

// Tool to search courses
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
    const courses = getCourses();
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

// Tool to get instructors
const getInstructorsTool = ai.defineTool(
  {
    name: 'getInstructors',
    description: 'Get information about the instructors, team, or co-founders of TechTradeHub Academy.',
    outputSchema: z.array(z.object({
        name: z.string(),
        bio: z.string(),
    })),
  },
  async () => {
    const instructors = await getInstructors();
    return instructors.map(({ name, bio }) => ({ name, bio }));
  }
);

// Tool to get blog posts
const getBlogPostsTool = ai.defineTool(
  {
    name: 'getBlogPosts',
    description: 'Get a list of the most recent published blog posts to answer questions about news, articles, or updates.',
    outputSchema: z.array(z.object({
        title: z.string(),
        slug: z.string(),
    })),
  },
  async () => {
    const posts = await getPosts('published');
    return posts.slice(0, 5).map(post => ({ title: post.title, slug: post.slug }));
  }
);

// Tool to get events
const getEventsTool = ai.defineTool(
  {
    name: 'getEvents',
    description: 'Get a list of upcoming events, webinars, or workshops.',
    outputSchema: z.array(z.object({
        title: z.string(),
        location: z.string(),
    })),
  },
  async () => {
    const events = await getEvents('upcoming');
    return events.slice(0, 5).map(event => ({ title: event.title, location: event.location }));
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
  tools: [getStudentProgressTool, searchCoursesTool, getInstructorsTool, getBlogPostsTool, getEventsTool],
  prompt: `You are Tech Gee, the AI assistant for TechTradeHub Academy. Your purpose is to help students with their learning journey.

  **Your Core Directives:**
  1.  **Stay On Topic:** You are an expert on the content within TechTradeHub Academy ONLY. This includes all courses, student progress, the team, events, blog posts, and official policies.
  2.  **Use Your Tools:** You MUST use the provided tools to answer relevant questions about student progress, courses, instructors, events, and the blog.
  3.  **Use Your Knowledge:** You have been provided with the academy's Privacy Policy and Terms of Use. Use this information to answer questions about rules, data usage, or legal terms.
  4.  **Decline Off-Topic Questions:** If a question is not about the academy, its courses, or the student's progress, you MUST politely decline. For example, if asked about the weather or general knowledge, respond with something like: "I can only help with questions about TechTradeHub Academy and its courses. How can I assist you with your learning journey?"
  5.  **Be Personable:** Your personality is cool, helpful, and encouraging, like a friendly senior student or TA. Keep your answers concise and use emojis where appropriate.

  **Tool Usage Guide:**
  - **getStudentProgress**: Use this tool if a student asks about their performance, course status, or what to study next. Address the student by their name.
  - **searchCourses**: Use this to find and recommend courses from the catalog.
  - **getInstructors**: Use this to answer questions about the team, instructors, or founders.
  - **getBlogPosts**: Use this to find recent news or articles from the blog.
  - **getEvents**: Use this to answer questions about upcoming events or workshops.

  **Academy Policies:**
  - **Privacy Policy:** We collect personal information (name, email, progress) to provide and improve our services, in compliance with Nigerian Data Protection Regulation (NDPR). We use Firebase for secure authentication and data storage. We do not sell user data. For full details, users can visit the privacy page.
  - **Terms of Use:** Our service is for personal, educational use. Users must be at least 13. Course fees are non-refundable. Certificates are issued upon completion but may not be altered. Misuse of the platform can lead to account termination. For full details, users can visit the terms page.

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
