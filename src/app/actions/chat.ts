"use server";

import {
  techGeeChatbot,
  type TechGeeChatbotInput,
} from "@/ai/flows/tech-gee-chatbot";

export async function askTechGee(
  {question, studentId}: {question: string, studentId: string | null}
): Promise<string> {
  try {
    // studentId can be null if user is not logged in. The flow is designed to handle this.
    const result = await techGeeChatbot({ question, studentId: studentId ?? undefined });
    return result.answer;
  } catch (error) {
    console.error("Error calling Tech Gee chatbot flow:", error);
    return "I'm sorry, I encountered an error and can't respond right now. Please try again later.";
  }
}
