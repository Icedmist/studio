'use client';

import { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CourseCard } from "@/components/courses/CourseCard";
import { ArrowLeft, Filter } from "lucide-react";
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { COURSE_CATEGORIES, COURSE_LEVELS, COURSE_CATEGORY_COLORS } from '@/lib/constants';

interface CourseFilterGridProps {
    courses: Course[];
}

export function CourseFilterGrid({ courses }: CourseFilterGridProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const category = searchParams.get('category') as Course['category'] | null;
    const level = searchParams.get('level') as Course['level'] | 'All' | null;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === 'All') {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const clearCategoryFilter = useCallback(() => {
        router.push(pathname);
    }, [router, pathname]);


    const filteredCourses = category ? courses.filter((course) => {
        const categoryMatch = course.category === category;
        const levelMatch = !level || level === 'All' || course.level === level;
        return categoryMatch && levelMatch;
    }) : [];

    if (category) {
        return (
            <div>
                <Button variant="ghost" onClick={clearCategoryFilter} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                </Button>

                <Card className="p-4 mb-8 bg-card/60 backdrop-blur-sm border-border/50">
                    <div className="flex flex-wrap items-center gap-4">
                        <h3 className="text-lg font-headline font-semibold flex items-center gap-2">
                            <Filter className="w-5 h-5"/>
                            Filter by Level
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['All', ...COURSE_LEVELS].map((lvl) => (
                                <Button
                                    key={lvl}
                                    variant={(!level && lvl === 'All') || level === lvl ? 'default' : 'outline'}
                                    onClick={() => router.push(`${pathname}?${createQueryString('level', lvl)}`)}
                                >
                                    {lvl}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground mt-8">No courses found for this filter.</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-headline font-bold text-center mb-2">Select a Category</h2>
            <p className="text-muted-foreground text-center mb-8">What would you like to master today?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSE_CATEGORIES.map((cat, index) => (
                    <Link key={cat} href={`${pathname}?${createQueryString('category', cat)}`} passHref>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                className="p-6 text-center bg-card/60 backdrop-blur-sm border-transparent border-b-4 hover:shadow-lg transition-all cursor-pointer"
                                style={{'--category-color': COURSE_CATEGORY_COLORS[cat], borderColor: 'var(--category-color)'}}
                            >
                                <h3 className="text-xl font-headline font-semibold">{cat}</h3>
                            </Card>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
