
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CourseCard } from "@/components/courses/CourseCard";
import type { Course, CourseCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants';

interface CourseFilterGridProps {
    courses: Course[];
}

export function CourseFilterGrid({ courses }: CourseFilterGridProps) {
    const [activeCategory, setActiveCategory] = useState<CourseCategory | 'All'>('All');
    const [activeLevel, setActiveLevel] = useState<string>('All');
    
    const coursesByCategory = useMemo(() => {
        const grouped: Record<string, Course[]> = {};
        courses.forEach(course => {
            if (!grouped[course.category]) {
                grouped[course.category] = [];
            }
            grouped[course.category].push(course);
        });
        return grouped;
    }, [courses]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const categoryMatch = activeCategory === 'All' || course.category === activeCategory;
            const levelMatch = activeLevel === 'All' || course.level === activeLevel;
            return categoryMatch && levelMatch;
        });
    }, [courses, activeCategory, activeLevel]);

    const handleCategoryClick = (category: CourseCategory | 'All') => {
        setActiveCategory(category);
    };
    
    const handleLevelClick = (level: string) => {
        setActiveLevel(level);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-lg bg-card/60 backdrop-blur-sm border-border/50">
                <div className="flex flex-wrap gap-2 items-center">
                    <h3 className="text-sm font-semibold shrink-0 pr-2">Category:</h3>
                     {['All', ...COURSE_CATEGORIES].map((category) => (
                        <Button
                            key={category}
                            size="sm"
                            variant={activeCategory === category ? 'default' : 'outline'}
                            onClick={() => handleCategoryClick(category as CourseCategory | 'All')}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                 <div className="flex flex-wrap gap-2 items-center border-t sm:border-t-0 sm:border-l border-border/50 pt-4 sm:pt-0 sm:pl-4">
                    <h3 className="text-sm font-semibold shrink-0 pr-2">Level:</h3>
                     {['All', ...COURSE_LEVELS].map((level) => (
                        <Button
                            key={level}
                            size="sm"
                            variant={activeLevel === level ? 'default' : 'outline'}
                            onClick={() => handleLevelClick(level)}
                        >
                            {level}
                        </Button>
                    ))}
                </div>
            </div>

            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-muted-foreground mt-8">No courses found for the selected filters.</p>
                )}
            </motion.div>
        </div>
    );
}
