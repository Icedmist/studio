

import { getCourses } from '@/services/course-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import HomePageClient from './home-page-client';
import type { Course, CourseCategory } from '@/lib/types';

function HomePageSkeleton() {
    return (
        <div className="space-y-12">
            <div className="container mx-auto text-center py-32">
                <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
                <Skeleton className="h-12 w-48 mx-auto" />
            </div>
            <div className="container mx-auto">
                <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80" />)}
                </div>
            </div>
        </div>
    )
}

async function getFeaturedCourses(allCourses: Course[]): Promise<Course[]> {
    const featured: Course[] = [];
    const categories = new Set<CourseCategory>();

    for (const course of allCourses) {
        if (!categories.has(course.category)) {
            featured.push(course);
            categories.add(course.category);
        }
        if (featured.length >= 5) break; // Display up to 5 featured courses
    }

    return featured;
}

// Wrapper component to use suspense
async function PageContent() {
    const courses = await getCourses();
    const featuredCourses = await getFeaturedCourses(courses);
    return <HomePageClient courses={featuredCourses} />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}
