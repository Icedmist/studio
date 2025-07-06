import type { CourseCategory } from "./types";

export const COURSE_CATEGORIES = [
  'Futures Trading',
  'Web3',
  'Crypto',
  'Tech Skills',
  'AI & Machine Learning',
] as const;

export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const COURSE_CATEGORY_COLORS: Record<CourseCategory, string> = {
  'Futures Trading': 'hsl(var(--purple))',
  'Web3': 'hsl(var(--chart-1))',
  'Crypto': 'hsl(var(--chart-3))',
  'Tech Skills': 'hsl(var(--secondary))',
  'AI & Machine Learning': 'hsl(var(--success))',
};
