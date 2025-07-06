"use server";

import { recommendCourses } from "@/ai/flows/recommend-courses-flow";
import { getStudentProgress } from "@/services/student-data";
import type { Course } from "@/lib/types";

export async function getRecommendations(): Promise<Course[]> {
  try {
    // In a real app, studentId would come from the user's session.
    const studentId = 'user_alex_johnson'; 
    const studentProgress = await getStudentProgress(studentId);
    const recommendations = await recommendCourses(studentProgress);
    return recommendations;
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    // Return an empty array on error so the UI doesn't break.
    return [];
  }
}
