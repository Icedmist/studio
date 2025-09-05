
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminCoursesPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Course Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Course data is now managed directly in the code.
            </p>
            <Card className="bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800">
                <CardHeader className='flex flex-row items-center gap-4'>
                     <AlertTriangle className="h-8 w-8 text-amber-500" />
                     <div>
                        <CardTitle className='text-amber-900 dark:text-amber-200'>Static Course Data</CardTitle>
                        <CardDescription className='text-amber-800 dark:text-amber-400'>
                            To add, edit, or delete courses, please modify the `courses` array in the file `/src/lib/courses.ts`.
                        </CardDescription>
                     </div>
                </CardHeader>
                <CardContent>
                    <p className='text-sm text-muted-foreground'>
                        This change was made to improve reliability and simplify the data management process, removing the need for database seeding for course content. All other content like users, blog posts, and events are still managed via this admin panel.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
