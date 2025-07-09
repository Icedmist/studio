
'use server';
/**
 * @fileOverview A Genkit flow to generate and send a confirmation email for event registration.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';

const SendEventConfirmationEmailInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event as an ISO string.'),
  eventLocation: z.string().describe('The location of the event (e.g., Online, Venue name).'),
  userName: z.string().describe("The name of the user who registered."),
  userEmail: z.string().email().describe("The email address of the user."),
});
export type SendEventConfirmationEmailInput = z.infer<typeof SendEventConfirmationEmailInputSchema>;

const EmailContentSchema = z.object({
    subject: z.string(),
    body: z.string().describe('The full HTML content of the email.'),
});

// This is a placeholder tool. In a real application, this would integrate
// with a real email service provider like SendGrid, Resend, or Nodemailer.
const sendEmailTool = ai.defineTool(
    {
        name: 'sendEmail',
        description: 'Sends an email to a user.',
        inputSchema: z.object({
            to: z.string().email(),
            subject: z.string(),
            body: z.string(),
        }),
        outputSchema: z.object({ success: z.boolean() }),
    },
    async (input) => {
        console.log('////////////////// SIMULATING EMAIL //////////////////');
        console.log(`TO: ${input.to}`);
        console.log(`SUBJECT: ${input.subject}`);
        console.log(`BODY: \n${input.body}`);
        console.log('////////////////////////////////////////////////////');
        // In a real app, you would have your email sending logic here.
        // For now, we'll just pretend it always works.
        return { success: true };
    }
);

export async function sendEventConfirmationEmail(input: SendEventConfirmationEmailInput): Promise<void> {
  await sendEventConfirmationEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventEmailPrompt',
  input: { schema: SendEventConfirmationEmailInputSchema },
  output: { schema: EmailContentSchema },
  prompt: `You are an event coordinator for TechTradeHub Academy.
  Your task is to generate a warm and informative confirmation email for a user who just registered for an event.

  **Event Details:**
  - Event Name: {{{eventName}}}
  - Date: {{{eventDate}}}
  - Location: {{{eventLocation}}}

  **User Details:**
  - Name: {{{userName}}}

  **Instructions:**
  1.  Create a friendly and engaging subject line, like "You're In! Confirmation for {{{eventName}}}".
  2.  Write the email body. It should be HTML formatted for a professional look.
  3.  Address the user by their name (e.g., "Hi {{{userName}}},").
  4.  Confirm their registration for the event and mention the name, date, and location.
  5.  Provide some "perspectives" or what to expect: mention learning from experts, networking with peers, and gaining valuable insights.
  6.  Include a call to action, like adding the event to their calendar (you don't need to generate a real calendar link).
  7.  End with a friendly closing from "The TechTradeHub Academy Team".
  8.  Do not include an unsubscribe link.
  `,
});

const sendEventConfirmationEmailFlow = ai.defineFlow(
  {
    name: 'sendEventConfirmationEmailFlow',
    inputSchema: SendEventConfirmationEmailInputSchema,
    tools: [sendEmailTool],
  },
  async (input) => {
     // Format the date for better readability in the prompt
    const formattedDate = format(new Date(input.eventDate), "eeee, MMMM d, yyyy 'at' h:mm a");
    
    const { output } = await prompt({ ...input, eventDate: formattedDate });

    if (!output) {
      throw new Error('Failed to generate email content.');
    }
    
    await sendEmailTool({
      to: input.userEmail,
      subject: output.subject,
      body: output.body,
    });
  }
);
