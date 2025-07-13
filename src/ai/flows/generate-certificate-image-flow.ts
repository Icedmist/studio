
'use server';
/**
 * @fileOverview A Genkit flow to generate a unique, abstract image for a course certificate.
 *
 * - generateCertificateImage - A function that creates an image based on course and student details.
 * - GenerateCertificateImageInput - The input type for the generateCertificateImage function.
 * - GenerateCertificateImageOutput - The return type for the generateCertificateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCertificateImageInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  studentName: z.string().describe('The name of the student who completed the course.'),
});
export type GenerateCertificateImageInput = z.infer<typeof GenerateCertificateImageInputSchema>;

// This flow is now effectively disabled by returning a static value,
// as image generation is not available.
const GenerateCertificateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a Base64 encoded data URI.'),
});
export type GenerateCertificateImageOutput = z.infer<typeof GenerateCertificateImageOutputSchema>;

export async function generateCertificateImage(input: GenerateCertificateImageInput): Promise<GenerateCertificateImageOutput> {
  // Bypassing the actual flow call to prevent errors with image generation.
  return Promise.resolve({ imageDataUri: 'none' });
}

// The following flow is kept for reference but is not currently used by the exported function.

const prompt = ai.definePrompt({
    name: 'generateCertificateImagePrompt',
    input: { schema: GenerateCertificateImageInputSchema },
    prompt: `Generate an abstract, sophisticated, and professional piece of digital art representing the concept of '{{courseTitle}}'.
The style should be modern, clean, and suitable for a tech academy certificate.
It should be visually interesting but not distracting. Avoid using any text or letters.
Use a cool and inspiring color palette that evokes a sense of accomplishment and technological advancement.
The art is for a certificate awarded to {{studentName}}.`,
});


const generateCertificateImageFlow = ai.defineFlow(
  {
    name: 'generateCertificateImageFlow',
    inputSchema: GenerateCertificateImageInputSchema,
    outputSchema: GenerateCertificateImageOutputSchema,
  },
  async (input) => {
    // This part of the code is currently unreachable due to the bypass above.
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: await prompt(input),
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return { imageDataUri: media.url };
  }
);
