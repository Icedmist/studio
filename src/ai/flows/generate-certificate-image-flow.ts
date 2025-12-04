
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


const GenerateCertificateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a Base64 encoded data URI.'),
});
export type GenerateCertificateImageOutput = z.infer<typeof GenerateCertificateImageOutputSchema>;

export async function generateCertificateImage(input: GenerateCertificateImageInput): Promise<GenerateCertificateImageOutput> {
  return generateCertificateImageFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateCertificateImagePrompt',
    input: { schema: GenerateCertificateImageInputSchema },
    prompt: `Generate a high-resolution, abstract, sophisticated, and professional piece of digital art representing the concept of '{{courseTitle}}'.
The style should be modern, clean, and suitable for a tech academy certificate.
The art should be visually interesting but not distracting, with a professional and inspiring color palette that evokes a sense of accomplishment and technological advancement.
Avoid using any text, letters, or recognizable figures. Focus on abstract shapes, lines, and gradients.`,
});


const generateCertificateImageFlow = ai.defineFlow(
  {
    name: 'generateCertificateImageFlow',
    inputSchema: GenerateCertificateImageInputSchema,
    outputSchema: GenerateCertificateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: await prompt(input),
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return { imageDataUri: media.url };
  }
);
