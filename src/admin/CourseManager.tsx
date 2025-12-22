
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Course, CourseCategory, CourseLevel } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { courses as staticCourses } from '@/lib/courses';
import { ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants';

type GroupedCourses = {
  [category in CourseCategory]?: {
    [level in CourseLevel]?: Omit<Course, 'progress'>[];
  };
};

export function CourseManager() {
  const [groupedCourses, setGroupedCourses] = useState<GroupedCourses>({});
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);

  useEffect(() => {
    const grouped = staticCourses.reduce((acc, course) => {
      const category = course.category as CourseCategory;
      const level = course.level as CourseLevel;
      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category]![level]) {
        acc[category]![level] = [];
      }
      acc[category]![level]!.push(course);
      return acc;
    }, {} as GroupedCourses);
    setGroupedCourses(grouped);
  }, []);

  const categorySummary = useMemo(() => {
    return COURSE_CATEGORIES.map(category => ({
      name: category,
      count: staticCourses.filter(c => c.category === category).length
    })).filter(c => c.count > 0);
  }, []);

  const levelSummary = useMemo(() => {
    if (!selectedCategory) return [];
    const categoryCourses = staticCourses.filter(c => c.category === selectedCategory);
    return COURSE_LEVELS.map(level => ({
      name: level,
      count: categoryCourses.filter(c => c.level === level).length
    })).filter(l => l.count > 0);
  }, [selectedCategory]);
  
  const coursesToShow = useMemo(() => {
    if (!selectedCategory || !selectedLevel) return [];
    return staticCourses.filter(c => c.category === selectedCategory && c.level === selectedLevel);
  }, [selectedCategory, selectedLevel]);

  const handleCategorySelect = (category: CourseCategory) => {
    setSelectedCategory(category);
    setSelectedLevel(null);
  };

  const handleLevelSelect = (level: CourseLevel) => {
    setSelectedLevel(level);
  };

  const resetSelection = (level: 'category' | null = null) => {
    if (!level) {
        setSelectedCategory(null);
    }
    setSelectedLevel(null);
  }

  const getPriceDisplay = (course: Omit<Course, 'progress'>) => {
    if (course.price === 0) return 'Free';
    return `₦${course.price.toLocaleString()}`;
  }

  const renderBreadcrumbs = () => (
    <div className="flex items-center text-sm text-muted-foreground mb-4">
      <button onClick={() => resetSelection()} className="hover:text-primary">Categories</button>
      {selectedCategory && (
        <>
          <ChevronRight className="h-4 w-4 mx-1" />
          <button onClick={() => resetSelection('category')} className="hover:text-primary">{selectedCategory}</button>
        </>
      )}
      {selectedLevel && (
        <>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-semibold text-foreground">{selectedLevel}</span>
        </>
      )}
    </div>
  );

  return (
    <div>
      <Card className="mb-6 bg-blue-500/10 border-blue-500/30">
        <CardHeader>
            <CardTitle className="text-blue-400">Course Data Source</CardTitle>
          <CardDescription className="text-blue-400/80">
            Course data is managed directly from the file at `/src/lib/courses.ts`. This admin page is for read-only viewing to confirm the data structure and counts.
          </CardDescription>
        </CardHeader>
      </Card>
      
      {selectedCategory && renderBreadcrumbs()}
      
      {/* Step 1: Show Categories */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySummary.map(cat => (
                 <Card key={cat.name} className="hover:border-primary transition-colors cursor-pointer" onClick={() => handleCategorySelect(cat.name)}>
                    <CardHeader>
                        <CardTitle>{cat.name}</CardTitle>
                        <CardDescription>{cat.count} {cat.count === 1 ? 'Course' : 'Courses'}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
      )}

      {/* Step 2: Show Levels */}
      {selectedCategory && !selectedLevel && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levelSummary.map(lvl => (
                 <Card key={lvl.name} className="hover:border-primary transition-colors cursor-pointer" onClick={() => handleLevelSelect(lvl.name)}>
                    <CardHeader>
                        <CardTitle>{lvl.name}</CardTitle>
                        <CardDescription>{lvl.count} {lvl.count === 1 ? 'Course' : 'Courses'}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
      )}

      {/* Step 3: Show Courses */}
      {selectedCategory && selectedLevel && (
        <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Instructor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {coursesToShow.map((course) => (
                        <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>
                            {getPriceDisplay(course)}
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
    
