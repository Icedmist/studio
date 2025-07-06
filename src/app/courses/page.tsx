'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/lib/courses";
import { Library, ArrowLeft } from "lucide-react";
import type { Course } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { COURSE_CATEGORIES, COURSE_LEVELS, COURSE_CATEGORY_COLORS } from '@/lib/constants';

function CoursesDisplay() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as Course['category'] | null;
  const level = searchParams.get('level') as Course['level'] | null;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const clearLevelFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('level');
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  const filteredCourses = courses.filter((course: Course) => {
    const categoryMatch = !category || course.category === category;
    const levelMatch = !level || course.level === level;
    return categoryMatch && levelMatch;
  });

  const renderContent = () => {
    if (category && level) {
      // View 3: Show courses
      return (
        <div>
          <Button variant="ghost" onClick={clearLevelFilter} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Levels
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground mt-8">No courses found for this level.</p>
            )}
          </div>
        </div>
      );
    }

    if (category) {
      // View 2: Show levels
      return (
        <div>
          <Button variant="ghost" onClick={clearFilters} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
          </Button>
          <h2 className="text-2xl font-headline font-bold text-center mb-2">Select a Level</h2>
          <p className="text-muted-foreground text-center mb-8">You've chosen <span className="font-semibold text-primary">{category}</span>. Now, pick your proficiency level.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {COURSE_LEVELS.map((lvl) => (
              <Link key={lvl} href={`${pathname}?${createQueryString('level', lvl)}`} passHref>
                <Card className="p-8 text-center bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
                  <h3 className="text-xl font-headline font-semibold">{lvl}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    // View 1: Show categories
    return (
      <div>
        <h2 className="text-2xl font-headline font-bold text-center mb-2">Select a Category</h2>
        <p className="text-muted-foreground text-center mb-8">What would you like to master today?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_CATEGORIES.map((cat) => (
            <Link key={cat} href={`${pathname}?${createQueryString('category', cat)}`} passHref>
                <Card 
                  className="p-6 text-center bg-card/60 backdrop-blur-sm border-transparent border-b-4 hover:shadow-lg transition-all cursor-pointer"
                  style={{'--category-color': COURSE_CATEGORY_COLORS[cat], borderColor: 'var(--category-color)'}}
                >
                    <h3 className="text-xl font-headline font-semibold">{cat}</h3>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4">
        <Library className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Course Library
        </h1>
      </div>
      <p className="text-muted-foreground mb-12">
        Follow the steps to find the perfect course for you.
      </p>

      {renderContent()}
    </div>
  );
}


function CoursesPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
                <Library className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                Course Library
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Browse our extensive catalog of courses to find the perfect one for you.
            </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col h-full rounded-lg border bg-card p-6 space-y-4">
                        <Skeleton className="h-6 w-2/3 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<CoursesPageSkeleton />}>
            <CoursesDisplay />
        </Suspense>
    )
}
