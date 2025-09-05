

import { getCourses } from '@/services/course-data';
import { getPosts } from '@/services/blog-data';
import { getEvents } from '@/services/event-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import HomePageClient from './home-page-client';
import type { Course, CourseCategory, PlainBlog, PlainEvent } from '@/lib/types';

function HomePageSkeleton() {
    return (
        <div className="space-y-12">
            <div className="container mx-auto text-center py-32">
                <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
                <Skeleton className="h-12 w-48 mx-auto" />
            </div>
            <div className="container mx-auto">
                <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80" />)}
                </div>
            </div>
        </div>
    )
}

// Function to select one featured course from each category
async function getFeaturedCourses(allCourses: Course[]): Promise<Course[]> {
    const featured: Course[] = [];
    const categories = new Set<CourseCategory>();
    const categoryOrder: CourseCategory[] = ['Futures Trading', 'Web3', 'AI & Machine Learning', 'Tech Skills', 'Crypto'];

    for (const category of categoryOrder) {
        if (categories.has(category)) continue;
        const courseInCategory = allCourses.find(c => c.category === category);
        if (courseInCategory) {
            featured.push(courseInCategory);
            categories.add(category);
        }
    }
    
    // Fill up to 5 courses if some categories were empty
    let i = 0;
    while(featured.length < 5 && i < allCourses.length) {
        if (!featured.some(c => c.id === allCourses[i].id)) {
            featured.push(allCourses[i]);
        }
        i++;
    }

    return featured.slice(0, 5);
}

// Wrapper component to use suspense and fetch all data for the homepage
async function PageContent() {
    const [courses, posts, events] = await Promise.all([
        getCourses(),
        getPosts('published'),
        getEvents('upcoming'),
    ]);
    
    const featuredCourses = await getFeaturedCourses(courses);
    const latestPosts: PlainBlog[] = posts.slice(0, 3).map(post => ({
        ...post,
        createdAt: post.createdAt.toDate().toISOString(),
        publishedAt: post.publishedAt?.toDate().toISOString(),
    }));

    const upcomingEvents: PlainEvent[] = events.slice(0, 3).map(event => ({
        ...event,
        date: event.date.toDate().toISOString(),
    }));

    return <HomePageClient 
        courses={featuredCourses} 
        posts={latestPosts} 
        events={upcomingEvents}
    />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}
