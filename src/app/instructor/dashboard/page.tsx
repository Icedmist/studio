
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { getCourses } from '@/services/course-data';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Course, StudentProgress } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { BookCopy, Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InstructorCourse extends Course {
    studentCount: number;
}

const DashboardSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-1/4" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    </div>
);


export default function InstructorDashboardPage() {
    const { user, profile, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<InstructorCourse[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (isAuthLoading) return;
        if (!user || profile?.role !== 'instructor') {
            router.push('/login');
            return;
        }

        async function loadData() {
            setIsLoadingData(true);
            try {
                const allCourses = await getCourses();
                const instructorCourses = allCourses.filter(c => c.instructor === user.displayName);

                const studentProgressCol = collection(db, 'studentProgress');
                const studentProgressSnapshot = await getDocs(query(studentProgressCol));
                const allStudentProgress = studentProgressSnapshot.docs.map(d => d.data() as StudentProgress);

                const coursesWithStudentCount = instructorCourses.map(course => {
                    const studentCount = allStudentProgress.filter(sp => sp.enrolledCourses.some(ec => ec.id === course.id)).length;
                    return { ...course, studentCount };
                });
                
                setCourses(coursesWithStudentCount);

            } catch (error) {
                console.error("Failed to load instructor dashboard data:", error);
            } finally {
                setIsLoadingData(false);
            }
        }

        loadData();
    }, [user, profile, isAuthLoading, router]);

    if (isAuthLoading || isLoadingData) {
        return <DashboardSkeleton />;
    }

    const totalStudents = courses.reduce((sum, course) => sum + course.studentCount, 0);
    const totalCourses = courses.length;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Instructor Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user?.displayName}!</p>
                </div>
                <Link href="/instructor/profile">
                    <Button variant="outline">Edit Profile</Button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                        <BookCopy className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalCourses}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalStudents}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                        <BarChart2 className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">N/A</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>An overview of the courses you are instructing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-right">Enrolled Students</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.length > 0 ? courses.map(course => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>{course.level}</TableCell>
                                    <TableCell className="text-right font-semibold">{course.studentCount}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No courses are currently assigned to you.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
