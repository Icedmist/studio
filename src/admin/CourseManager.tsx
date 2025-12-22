
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Course } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { courses as staticCourses } from '@/lib/courses';
import { AlertCircle } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CourseManager() {
  const [courses, setCourses] = useState<Omit<Course, 'progress'>[]>([]);

  useEffect(() => {
    // Data is now loaded directly from the static file
    setCourses(staticCourses);
  }, []);
  
  const getPriceDisplay = (course: Omit<Course, 'progress'>) => {
    if (course.price === 0) return 'Free';
    return course.price.toLocaleString();
  }

  return (
    <TooltipProvider>
       <Card className="mb-6 bg-blue-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
             <AlertCircle className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-blue-400">Course Data Source Changed</CardTitle>
          </div>
          <CardDescription className="text-blue-400/80">
            Course data is now being managed directly from the file at `/src/lib/courses.ts`. Any changes to courses should be made in that file. This admin page is now for read-only purposes.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>
                <Badge variant="outline">{course.level}</Badge>
              </TableCell>
              <TableCell>
                {getPriceDisplay(course)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
