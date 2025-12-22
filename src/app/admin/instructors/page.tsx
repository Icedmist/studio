
'use client';

import { InstructorManager } from '@/admin/InstructorManager';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function AdminInstructorsPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <UserPlus className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Team Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Add, view, and manage instructors, co-founders, and other team members.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <InstructorManager />
                </CardContent>
            </Card>
        </div>
    );
}
