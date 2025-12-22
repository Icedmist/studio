
'use client';

import { useState, useMemo } from 'react';
import type { Course, CourseCategory, CourseLevel } from '@/lib/types';
import { courses as staticCourses } from '@/lib/courses';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Library, ChevronsRight, Home } from 'lucide-react';

type ViewState = 'categories' | 'levels' | 'courses';

export function CourseManager() {
  const [view, setView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);

  const coursesByCategory = useMemo(() => {
    return staticCourses.reduce((acc, course) => {
      const category = course.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {} as Record<CourseCategory, typeof staticCourses>);
  }, []);

  const levelsForCategory = useMemo(() => {
    if (!selectedCategory) return {};
    return (coursesByCategory[selectedCategory] || []).reduce((acc, course) => {
      const level = course.level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(course);
      return acc;
    }, {} as Record<CourseLevel, typeof staticCourses>);
  }, [selectedCategory, coursesByCategory]);

  const coursesForLevel = useMemo(() => {
    if (!selectedCategory || !selectedLevel) return [];
    return levelsForCategory[selectedLevel] || [];
  }, [selectedCategory, selectedLevel, levelsForCategory]);
  
  const getPriceDisplay = (course: Omit<Course, 'progress'>) => {
    if (course.price === 0) return 'Free';
    return `₦${course.price.toLocaleString()}`;
  }


  const handleCategorySelect = (category: CourseCategory) => {
    setSelectedCategory(category);
    setView('levels');
  };

  const handleLevelSelect = (level: CourseLevel) => {
    setSelectedLevel(level);
    setView('courses');
  };

  const handleBack = () => {
    if (view === 'courses') {
      setView('levels');
      setSelectedLevel(null);
    } else if (view === 'levels') {
      setView('categories');
      setSelectedCategory(null);
    }
  };

  const Breadcrumbs = () => (
    <div className="flex items-center text-sm text-muted-foreground mb-4 gap-2">
      <button onClick={() => setView('categories')} className="hover:text-primary">
        <Home className="h-4 w-4" />
      </button>
      {selectedCategory && (
        <>
          <ChevronsRight className="h-4 w-4" />
          <button onClick={() => { setView('levels'); setSelectedLevel(null); }} className="hover:text-primary disabled:cursor-not-allowed" disabled={view === 'levels'}>
            {selectedCategory}
          </button>
        </>
      )}
       {selectedLevel && (
        <>
          <ChevronsRight className="h-4 w-4" />
          <span className="font-semibold text-foreground">{selectedLevel}</span>
        </>
      )}
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
        {view !== 'categories' && (
             <Button variant="outline" onClick={handleBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
        )}
      
      {view !== 'categories' && <Breadcrumbs />}

      {view === 'categories' && (
         <Card>
            <CardHeader>
                <CardTitle>Course Categories</CardTitle>
                <CardDescription>Select a category to view its levels.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {COURSE_CATEGORIES.map(category => (
                        <button key={category} onClick={() => handleCategorySelect(category)} className="text-left">
                            <Card className="hover:border-primary hover:shadow-lg transition-all">
                                <CardHeader>
                                    <CardTitle>{category}</CardTitle>
                                    <CardDescription>{coursesByCategory[category]?.length || 0} Courses</CardDescription>
                                </CardHeader>
                            </Card>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
      )}
      
      {view === 'levels' && selectedCategory && (
         <Card>
            <CardHeader>
                <CardTitle>Levels for {selectedCategory}</CardTitle>
                <CardDescription>Select a level to view its courses.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {COURSE_LEVELS.map(level => (
                    <button key={level} onClick={() => handleLevelSelect(level)} className="text-left" disabled={!levelsForCategory[level]}>
                         <Card className="hover:border-primary hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                             <CardHeader>
                                <CardTitle>{level}</CardTitle>
                                <CardDescription>{levelsForCategory[level]?.length || 0} Courses</CardDescription>
                            </CardHeader>
                        </Card>
                    </button>
                ))}
                </div>
            </CardContent>
        </Card>
      )}
      
      {view === 'courses' && selectedLevel && (
        <Card>
            <CardHeader>
                <CardTitle>Courses</CardTitle>
                <CardDescription>Courses in {selectedCategory} / {selectedLevel}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Price (₦)</TableHead>
                        <TableHead>Duration</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {coursesForLevel.map((course) => (
                        <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{getPriceDisplay(course)}</Badge>
                        </TableCell>
                        <TableCell>{course.duration}</TableCell>
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

