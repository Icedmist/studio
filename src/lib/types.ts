import { COURSE_CATEGORIES, COURSE_LEVELS } from './constants';

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  imageUrl: string;
  progress: number; // 0 to 100
  modules: {
    title: string;
    lessons: {
      title: string;
      duration: string;
    }[];
  }[];
  price: number;
  duration: string;
  instructor: string;
};
