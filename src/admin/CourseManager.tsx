
'use client';

import { useState, useEffect } from 'react';
import type { Course } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { courses as staticCourses } from '@/lib/courses';
import { AlertCircle } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { CourseCategory } from '@/lib/types';
import { COURSE_CATEGORIES } from '@/lib/constants';

type GroupedCourses = Record<CourseCategory, Omit<Course, 'progress'>[]>;

export function CourseManager() {
  const [groupedCourses, setGroupedCourses] = useState<GroupedCourses | null>(null);

  useEffect(() => {
    // Group courses by category from the static file
    const grouped = staticCourses.reduce((acc, course) => {
      const category = course.category as CourseCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {} as GroupedCourses);
    
    // Sort courses within each category by level
    for (const category in grouped) {
        grouped[category as CourseCategory].sort((a, b) => {
            const levels = ['Beginner', 'Intermediate', 'Advanced'];
            return levels.indexOf(a.level) - levels.indexOf(b.level);
        });
    }

    setGroupedCourses(grouped);
  }, []);
  
  const getPriceDisplay = (course: Omit<Course, 'progress'>) => {
    if (course.price === 0) return 'Free';
    return course.price.toLocaleString();
  }

  return (
    <div>
       <Card className="mb-6 bg-blue-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
             <AlertCircle className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-blue-400">Course Data Source</CardTitle>
          </div>
          <CardDescription className="text-blue-400/80">
            Course data is managed directly from the file at `/src/lib/courses.ts`. This admin page is for read-only viewing to confirm the data structure.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Accordion type="multiple" defaultValue={COURSE_CATEGORIES} className="w-full">
        {groupedCourses && COURSE_CATEGORIES.map(category => (
             groupedCourses[category] && (
                <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-lg font-headline font-semibold">
                        {category} ({groupedCourses[category].length} Courses)
                    </AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Instructor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {groupedCourses[category].map((course) => (
                                <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{course.level}</Badge>
                                </TableCell>
                                <TableCell>
                                    {getPriceDisplay(course)}
                                </TableCell>
                                <TableCell>{course.instructor}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            )
        ))}
      </Accordion>
    </div>
  );
}
