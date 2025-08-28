
import { Suspense } from 'react';
import { Library, AlertTriangle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { getCourses } from '@/services/course-data';
import { CourseFilterGrid } from '@/components/courses/CourseFilterGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CoursesPageSkeleton() {
    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Course Library
                </h1>
            </div>
            <p className="text-muted-foreground mb-12">
                Loading our extensive catalog of courses... please wait.
            </p>
            <h2 className="text-2xl font-headline font-bold text-center mb-2">
                <Skeleton className="h-8 w-1/3 mx-auto" />
            </h2>
            <p className="text-muted-foreground text-center mb-8">
                 <Skeleton className="h-6 w-1/2 mx-auto" />
            </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full rounded-lg border bg-card p-6 space-y-4">
                        <Skeleton className="h-8 w-full mx-auto" />
                    </div>
                ))}
            </div>
        </>
    )
}

async function CoursesPageContent() {
    const courses = await getCourses();

    if (!courses || courses.length === 0) {
        return (
            <Card className="text-center bg-card/60 max-w-lg mx-auto">
                <CardHeader>
                    <div className="mx-auto bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full w-fit">
                        <AlertTriangle className="h-8 w-8 text-amber-500" />
                    </div>
                    <CardTitle>No Courses Available</CardTitle>
                    <CardDescription>
                        It seems there are no courses in the database right now. If you are an administrator, please go to the admin panel to seed or create courses.
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
         <>
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
        </>
    )
}

export default async function CoursesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<CoursesPageSkeleton />}>
                <CoursesPageContent />
            </Suspense>
        </div>
    )
}
