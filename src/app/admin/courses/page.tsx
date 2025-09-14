'use client';

import { CourseManager } from '../CourseManager';
import { Card, CardContent } from '@/components/ui/card';
import { Library } from 'lucide-react';

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
                Add, edit, and manage the course catalog for your academy.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <CourseManager />
                </CardContent>
            </Card>
        </div>
    );
}
