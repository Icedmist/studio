
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CourseCard } from "@/components/courses/CourseCard";
import { ArrowLeft, Filter } from "lucide-react";
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants';

interface CourseFilterGridProps {
    courses: Course[];
}

export function CourseFilterGrid({ courses }: CourseFilterGridProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeLevel, setActiveLevel] = useState<string>('All');
    
    useEffect(() => {
        setActiveCategory(searchParams.get('category'));
        setActiveLevel(searchParams.get('level') || 'All');
    }, [searchParams]);

    const filteredCourses = useMemo(() => {
        if (!activeCategory) return [];
        
        return courses.filter(course => {
            const categoryMatch = course.category === activeCategory;
            const levelMatch = activeLevel === 'All' || course.level === activeLevel;
            return categoryMatch && levelMatch;
        });
    }, [courses, activeCategory, activeLevel]);

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams();
        params.set('category', category);
        router.push(`${pathname}?${params.toString()}`);
    };
    
    const handleLevelClick = (level: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (level === 'All') {
            params.delete('level');
        } else {
            params.set('level', level);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClearCategory = () => {
        router.push(pathname);
    };

    if (activeCategory) {
        return (
            <div>
                <Button variant="ghost" onClick={handleClearCategory} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                </Button>
                
                <Card className="p-4 mb-8 bg-card/60 backdrop-blur-sm border-border/50">
                    <div className="flex flex-wrap items-center gap-4">
                        <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                            <Filter className="w-5 h-5"/>
                            Filter by Level
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['All', ...COURSE_LEVELS].map((level) => (
                                <Button
                                    key={level}
                                    variant={activeLevel === level ? 'default' : 'outline'}
                                    onClick={() => handleLevelClick(level)}
                                >
                                    {level}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground mt-8">No courses found for this filter combination.</p>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-headline font-bold text-center mb-2">Select a Category</h2>
            <p className="text-muted-foreground text-center mb-8">What would you like to master today?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSE_CATEGORIES.map((cat, index) => (
                    <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card 
                            className="p-6 text-center bg-card/60 backdrop-blur-sm border-b-4 border-transparent hover:shadow-lg transition-all cursor-pointer"
                            style={{ borderColor: `var(--category-color-${cat.replace(/\s+/g, '-').toLowerCase()})` }}
                            onClick={() => handleCategoryClick(cat)}
                        >
                             <style jsx global>{`
                                :root {
                                    --category-color-futures-trading: hsl(var(--chart-2));
                                    --category-color-web3: hsl(var(--primary));
                                    --category-color-crypto: hsl(var(--chart-4));
                                    --category-color-tech-skills: hsl(var(--secondary));
                                    --category-color-ai-&-machine-learning: hsl(var(--destructive));
                                }
                            `}</style>
                            <CardHeader className="p-0">
                                <h3 className="text-xl font-headline font-semibold">{cat}</h3>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
