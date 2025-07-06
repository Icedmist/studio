'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseFilter } from "@/components/courses/CourseFilter";
import { courses } from "@/lib/courses";
import { Library } from "lucide-react";
import type { Course } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function CoursesDisplay() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const level = searchParams.get('level');
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  const filteredCourses = courses.filter((course: Course) => {
    const categoryMatch = !category || category === 'all' || course.category === category;
    const levelMatch = !level || level === 'all' || course.level === level;
    const searchMatch = !searchTerm || course.title.toLowerCase().includes(searchTerm) || course.description.toLowerCase().includes(searchTerm);
    return categoryMatch && levelMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4">
        <Library className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Course Library
        </h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Browse our extensive catalog of courses to find the perfect one for you.
      </p>

      <CourseFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground mt-8">No courses found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

function CoursesPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                Course Library
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Browse our extensive catalog of courses to find the perfect one for you.
            </p>

            <div className="p-4 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50 flex flex-col md:flex-row gap-4 items-center">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full md:w-[200px]" />
                <Skeleton className="h-10 w-full md:w-[180px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full rounded-lg border bg-card">
                        <Skeleton className="h-48 w-full" />
                        <div className="p-6 space-y-4">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                        <div className="p-6 pt-0">
                           <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<CoursesPageSkeleton />}>
            <CoursesDisplay />
        </Suspense>
    )
}
