"use server";

import {
  techGeeChatbot,
  type TechGeeChatbotInput,
} from "@/ai/flows/tech-gee-chatbot";

export async function askTechGee(
  {question}: {question: string}
): Promise<string> {
  try {
    // In a real app, studentId would come from the user's session.
    const studentId = 'user_alex_johnson'; 
    const result = await techGeeChatbot({ question, studentId });
    return result.answer;
  } catch (error) {
    console.error("Error calling Tech Gee chatbot flow:", error);
    return "I'm sorry, I encountered an error and can't respond right now. Please try again later.";
  }
}
