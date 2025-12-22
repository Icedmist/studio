
'use client';

import { Suspense, useEffect, useState } from 'react';
import { Library, AlertTriangle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { CourseFilterGrid } from '@/components/courses/CourseFilterGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCourses } from '@/services/course-data';
import type { Course } from '@/lib/types';


function CoursesPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Course Library
                </h1>
            </div>
            <div className="mb-12">
                 <Skeleton className="h-6 w-1/2" />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full rounded-lg border bg-card p-6 space-y-4">
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}

function CoursesPageContent() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                setIsLoading(true);
                setError(null);
                const courseData = await getCourses();
                setCourses(courseData);
            } catch (err: any) {
                console.error("Failed to fetch courses:", err);
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (isLoading) {
        return <CoursesPageSkeleton />;
    }

    if (error) {
        return (
             <Card className="text-center bg-card/60 max-w-lg mx-auto">
                <CardHeader>
                    <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle>Failed to Load Courses</CardTitle>
                    <CardDescription>
                        There was an error loading the course catalog.
                        <pre className="mt-2 text-xs bg-muted p-2 rounded whitespace-pre-wrap">{error}</pre>
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    if (!courses || courses.length === 0) {
        return (
            <Card className="text-center bg-card/60 max-w-lg mx-auto">
                <CardHeader>
                    <div className="mx-auto bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full w-fit">
                        <AlertTriangle className="h-8 w-8 text-amber-500" />
                    </div>
                    <CardTitle>No Courses Available</CardTitle>
                    <CardDescription>
                        It seems there are no courses in the database right now. Please check back later, or seed them from the Admin panel.
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                   <Link href="/admin/courses">
                        <Button>Go to Admin Panel</Button>
                   </Link>
                </CardContent>
            </Card>
        )
    }

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
            <CourseFilterGrid courses={courses} />
        </div>
    )
}

export default function CoursesPage() {
    // Wrap the content in a Suspense boundary for better loading UX,
    // though the hook inside handles its own loading state.
    return (
        <Suspense fallback={<CoursesPageSkeleton />}>
            <CoursesPageContent />
        </Suspense>
    )
}
