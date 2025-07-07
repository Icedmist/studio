'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getStudentProgress } from '@/services/student-data';
import type { StudentProgress, Course, Module, Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Home, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { handleUpdateLessonStatus } from '@/app/actions/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

function LearningInterface() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams<{ courseId: string }>();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [progress, setProgress] = useState<StudentProgress | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const moduleIndex = parseInt(searchParams.get('module') || '0', 10);
    const lessonIndex = parseInt(searchParams.get('lesson') || '0', 10);

    const enrolledCourse = useMemo(() => progress?.enrolledCourses.find(c => c.id === params.courseId), [progress, params.courseId]);
    const currentModule = useMemo(() => enrolledCourse?.modules[moduleIndex], [enrolledCourse, moduleIndex]);
    const currentLesson = useMemo(() => currentModule?.lessons[lessonIndex], [currentModule, lessonIndex]);

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            getStudentProgress(user.uid)
                .then(data => {
                    setProgress(data);
                    const isEnrolled = data.enrolledCourses.some(c => c.id === params.courseId);
                    if (!isEnrolled) {
                        router.replace(`/courses/${params.courseId}`);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch student progress", err);
                    router.replace('/dashboard');
                })
                .finally(() => setIsLoading(false));
        } else {
            router.replace(`/login?redirect=/courses/${params.courseId}`);
        }
    }, [user, params.courseId, router]);

    const { prevLesson, nextLesson } = useMemo(() => {
        if (!enrolledCourse) return { prevLesson: null, nextLesson: null };

        let lessonsFlat: { moduleIndex: number; lessonIndex: number }[] = [];
        enrolledCourse.modules.forEach((mod, mIdx) => {
            mod.lessons.forEach((_, lIdx) => {
                lessonsFlat.push({ moduleIndex: mIdx, lessonIndex: lIdx });
            });
        });

        const currentFlatIndex = lessonsFlat.findIndex(l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex);

        const prev = currentFlatIndex > 0 ? lessonsFlat[currentFlatIndex - 1] : null;
        const next = currentFlatIndex < lessonsFlat.length - 1 ? lessonsFlat[currentFlatIndex + 1] : null;

        return {
            prevLesson: prev ? `/learn/${params.courseId}?module=${prev.moduleIndex}&lesson=${prev.lessonIndex}` : null,
            nextLesson: next ? `/learn/${params.courseId}?module=${next.moduleIndex}&lesson=${next.lessonIndex}` : null,
        };
    }, [enrolledCourse, moduleIndex, lessonIndex, params.courseId]);

    const toggleLessonCompletion = async () => {
        if (!user || !currentLesson) return;
        setIsSubmitting(true);
        const newStatus = !currentLesson.completed;
        const result = await handleUpdateLessonStatus(user.uid, params.courseId, moduleIndex, lessonIndex, newStatus);
        
        if (result.success) {
            toast({
                title: `Lesson ${newStatus ? 'Completed' : 'Unmarked'}!`,
                variant: 'success',
            });
            // Refetch progress to update UI
            const data = await getStudentProgress(user.uid);
            setProgress(data);
             if (newStatus && nextLesson) {
                router.push(nextLesson);
            }
        } else {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    if (isLoading || !enrolledCourse) {
        return <LearningSkeleton />;
    }

    if (!currentLesson || !currentModule) {
        return (
            <div className="flex h-screen items-center justify-center text-center">
                 <Card className="max-w-md w-full bg-destructive/10 border-destructive text-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle />
                            Lesson Not Found
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>The lesson you are looking for does not exist.</p>
                        <Link href="/dashboard"><Button variant="outline" className="mt-4">Back to Dashboard</Button></Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const totalLessons = enrolledCourse.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedLessons = enrolledCourse.modules.reduce((sum, mod) => sum + mod.lessons.filter(l => l.completed).length, 0);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-80 border-r bg-card/50 hidden md:flex flex-col">
                 <div className="p-4 border-b">
                    <Link href={`/courses/${enrolledCourse.id}`} className='hover:underline'>
                        <h2 className="text-lg font-headline font-bold truncate">{enrolledCourse.title}</h2>
                    </Link>
                    <div className="text-xs text-muted-foreground mt-2">
                        <Progress value={enrolledCourse.progress} className="h-2 mb-1" />
                        {completedLessons} of {totalLessons} lessons completed
                    </div>
                 </div>
                 <div className="flex-grow overflow-y-auto">
                    <Accordion type="multiple" defaultValue={[`module-${moduleIndex}`]} className="w-full">
                        {enrolledCourse.modules.map((mod, mIdx) => (
                            <AccordionItem key={mIdx} value={`module-${mIdx}`}>
                                <AccordionTrigger className="px-4 text-base font-semibold">{mod.title}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-1">
                                        {mod.lessons.map((lesson, lIdx) => (
                                            <li key={lIdx}>
                                                <Link href={`/learn/${params.courseId}?module=${mIdx}&lesson=${lIdx}`}>
                                                    <div className={cn(
                                                        "flex items-center gap-3 p-3 mx-2 rounded-md text-sm transition-colors",
                                                        moduleIndex === mIdx && lessonIndex === lIdx ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                                    )}>
                                                        {lesson.completed ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
                                                        <span className='truncate'>{lesson.title}</span>
                                                        <span className="ml-auto text-xs opacity-70 shrink-0">{lesson.duration}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                 </div>
                 <div className="p-4 border-t">
                    <Link href="/dashboard">
                        <Button variant="outline" className='w-full'><Home className="mr-2" /> Back to Dashboard</Button>
                    </Link>
                 </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl md:text-2xl font-headline font-bold truncate">{currentLesson.title}</h1>
                    <div className="hidden md:flex">
                        <Button variant="ghost" disabled={!prevLesson} onClick={() => prevLesson && router.push(prevLesson)}>
                            <ArrowLeft className="mr-2"/> Previous
                        </Button>
                        <Button variant="ghost" disabled={!nextLesson} onClick={() => nextLesson && router.push(nextLesson)}>
                            Next <ArrowRight className="ml-2"/>
                        </Button>
                    </div>
                </header>
                <div className="flex-grow p-4 md:p-8">
                    {/* Placeholder for lesson content */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
                        <p className="text-muted-foreground">Lesson video placeholder</p>
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className='font-headline'>About This Lesson</h2>
                        <p>This is placeholder content for the lesson "{currentLesson.title}". In a real application, this area would contain detailed text, code snippets, images, and other educational materials related to the video content.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                    </div>
                </div>
                <footer className="p-4 border-t bg-card/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Button
                        size="lg"
                        variant={currentLesson.completed ? 'outline' : 'success'}
                        onClick={toggleLessonCompletion}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 animate-spin"/> : <CheckCircle className="mr-2"/>}
                        {currentLesson.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </Button>

                     <div className="flex md:hidden w-full">
                        <Button className="w-1/2" variant="ghost" disabled={!prevLesson} onClick={() => prevLesson && router.push(prevLesson)}>
                            <ArrowLeft className="mr-2"/> Previous
                        </Button>
                        <Button className="w-1/2" variant="ghost" disabled={!nextLesson} onClick={() => nextLesson && router.push(nextLesson)}>
                            Next <ArrowRight className="ml-2"/>
                        </Button>
                    </div>
                </footer>
            </main>
        </div>
    );
}


function LearningSkeleton() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-80 border-r bg-card/50 hidden md:flex flex-col">
                <div className="p-4 border-b space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex-grow p-4 space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="p-4 border-t">
                    <Skeleton className="h-10 w-full" />
                </div>
            </aside>
            <main className="flex-1 flex flex-col">
                <header className="p-4 border-b flex justify-between items-center">
                    <Skeleton className="h-8 w-1/2" />
                    <div className='flex gap-2'>
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </header>
                <div className="flex-grow p-4 md:p-8">
                    <Skeleton className="aspect-video w-full mb-8" />
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                 <footer className="p-4 border-t bg-card/50 flex items-center justify-center">
                    <Skeleton className="h-12 w-48" />
                 </footer>
            </main>
        </div>
    );
}

export default function LearnPage() {
    return (
        <Suspense fallback={<LearningSkeleton />}>
            <LearningInterface />
        </Suspense>
    )
}
