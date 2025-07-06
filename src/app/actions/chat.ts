"use server";

import {
  techGeeChatbot,
  type TechGeeChatbotInput,
} from "@/ai/flows/tech-gee-chatbot";

export async function askTechGee(
  input: TechGeeChatbotInput
): Promise<string> {
  try {
    const result = await techGeeChatbot(input);
    return result.answer;
  } catch (error) {
    console.error("Error calling Tech Gee chatbot flow:", error);
    return "I'm sorry, I encountered an error and can't respond right now. Please try again later.";
  }
}
