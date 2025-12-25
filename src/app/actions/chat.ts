
"use server";

import {
  techGeeChatbot,
  type TechGeeChatbotInput,
} from "@/ai/flows/tech-gee-chatbot";

export async function askTechGee(
  {question, studentId}: {question: string, studentId: string | null}
): Promise<string> {
  try {
    const input: TechGeeChatbotInput = { question };
    if (studentId) {
      input.studentId = studentId;
    }
    const result = await techGeeChatbot(input);
    return result.answer;
  } catch (error) {
    console.error("Error calling Tech Gee chatbot flow:", error);
    return "I'm sorry, I encountered an error and can't respond right now. Please try again later.";
  }
}
