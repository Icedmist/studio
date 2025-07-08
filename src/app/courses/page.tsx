import { Suspense } from 'react';
import { Library } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { getCourses } from '@/services/course-data';
import { CourseFilterGrid } from '@/components/courses/CourseFilterGrid';

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
                Loading our extensive catalog of courses...
            </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full rounded-lg border bg-card p-6 space-y-4">
                        <Skeleton className="h-6 w-2/3 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default async function CoursesPage() {
    const courses = await getCourses();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                Course Library
                </h1>
            </div>
            <p className="text-muted-foreground mb-12">
                Browse our catalog or filter by category and level to find the perfect course for you.
            </p>
            <Suspense fallback={<CoursesPageSkeleton />}>
                <CourseFilterGrid courses={courses} />
            </Suspense>
        </div>
    )
}
