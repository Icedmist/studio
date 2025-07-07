'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getStudentProgress,
  type StudentProgress,
} from '@/services/student-data';
import { getRecommendations } from '@/app/actions/recommend';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Trophy, BookOpen, LineChart, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { COURSE_CATEGORY_COLORS } from '@/lib/constants';
import type { CourseCategory, Course } from '@/lib/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const DashboardSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-10 w-1/3 mb-4" />
    <Skeleton className="h-6 w-1/2 mb-10" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className='bg-card/60 backdrop-blur-sm border-border/50'>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-72" />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-sm border-border/50">
             <CardHeader>
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>
             <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                   <Skeleton key={i} className="w-full h-16" />
                ))}
            </CardContent>
        </Card>
    </div>
  </div>
);

const SecurityRulesError = ({ projectId }: { projectId: string | undefined }) => (
  <div className="container mx-auto p-4 sm:p-8">
    <Card className="bg-destructive/10 border-destructive/50 text-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8" />
          Action Required: Update Firestore Security Rules
        </CardTitle>
        <CardDescription className="text-destructive/80">
          Your database is currently blocking the app from accessing data. To fix this, you must update your Firestore security rules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold mb-2">Please follow these steps exactly:</p>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>
            <a 
              href={`https://console.firebase.google.com/project/${projectId}/firestore/rules`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold underline hover:text-destructive-foreground"
            >
              Click here to open your Firestore Rules editor
            </a> 
            (opens in a new tab).
          </li>
          <li>Select the correct Firebase project if prompted: <strong>{projectId || 'tech-trade-hub-academy'}</strong>.</li>
          <li>Delete all the text currently in the rules editor.</li>
          <li>Copy the entire block of code below and paste it into the editor.</li>
        </ol>
        <pre className="mt-4 text-left bg-destructive/20 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
          {`rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Default-deny all access
    match /{document=**} {
      allow read, write: if false;
    }

    // Allow logged-in users to read their own student progress
    match /studentProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow any logged-in user to read course and instructor data
    match /courses/{courseId} {
      allow read: if request.auth != null;
    }
    match /instructors/{instructorId} {
      allow read: if request.auth != null;
    }
    
    // Allow admins to do anything.
    // See the note below on how to set up the admins document.
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/metadata/admins).data.uids;
    }
  }
}`}
        </pre>
        <p className="mt-4">
          After pasting the code, click the <strong>Publish</strong> button at the top of the Firebase console, then refresh this page.
        </p>
         <p className="mt-4 text-xs">
          <strong>Note for Admin Access:</strong> For the admin dashboard to work, you must also create a document in Firestore. Go to the Firestore Data tab, create a collection named \`metadata\`, add a document with the ID \`admins\`, and add a field named \`uids\` of type \`array\` containing your Firebase UID as a string.
        </p>
      </CardContent>
    </Card>
  </div>
);


export default function DashboardPage() {
  const [data, setData] = useState<StudentProgress | null>(null);
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRecsLoading, setIsRecsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      // This is handled by AuthProvider's redirect, but as a fallback.
      return;
    }

    async function fetchData() {
      try {
        setIsDataLoading(true);
        setError(null);
        const progressData = await getStudentProgress(user.uid, user.displayName || user.email!);
        setData(progressData);
      } catch (error: any) {
        console.error('Failed to fetch student progress:', error);
        if (error.message && (error.message.toLowerCase().includes('permission-denied') || error.message.toLowerCase().includes('insufficient permissions'))) {
            setError('permission-denied');
        } else {
            setError('An unknown error occurred while fetching your data.');
        }
      } finally {
        setIsDataLoading(false);
      }
    }
    async function fetchRecommendations() {
        if (!user) return;
        try {
            setIsRecsLoading(true);
            const recs = await getRecommendations(user.uid);
            setRecommendations(recs);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            // Don't set a blocking error for recommendations
        } finally {
            setIsRecsLoading(false);
        }
    }
    fetchData();
    fetchRecommendations();
  }, [user]);
  
  if (!user) {
    // AuthProvider will redirect, so we can just show a loader.
    return <DashboardSkeleton />;
  }

  if (isDataLoading) {
    return <DashboardSkeleton />;
  }

  if (error === 'permission-denied') {
    return <SecurityRulesError projectId={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID} />;
  }

  if (error) {
     return (
      <div className="container mx-auto p-4 sm:p-8">
        <Card className="bg-destructive/10 border-destructive/50 text-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle />
              An Error Occurred
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>There was a problem loading your dashboard.</p>
            <pre className="mt-4 text-left bg-destructive/20 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
              {error}
            </pre>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        Could not load student data. Please try again later.
      </div>
    );
  }

  const inProgressCourses = data.enrolledCourses.filter(
    (c) => c.progress < 100
  );
  const completedCourses = data.enrolledCourses.filter(
    (c) => c.progress === 100
  );

  const categoryCounts = data.enrolledCourses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<CourseCategory, number>);

  const chartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
    fill: COURSE_CATEGORY_COLORS[name as CourseCategory],
  }));

  const stats = [
    { title: 'Overall Progress', value: `${data.overallProgress}%`, icon: <LineChart className="h-6 w-6 text-primary" />, description: 'Across all courses' },
    { title: 'In Progress', value: data.coursesInProgress, icon: <BookOpen className="h-6 w-6 text-secondary" />, description: 'Courses started' },
    { title: 'Completed', value: data.completedCourses, icon: <Trophy className="h-6 w-6 text-success" />, description: 'Courses finished' },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        variants={cardVariants}
        custom={0}
        className="text-3xl md:text-4xl font-headline font-bold mb-2"
      >
        Welcome back, {user?.displayName || data.name}!
      </motion.h1>
      <motion.p
        variants={cardVariants}
        custom={1}
        className="text-muted-foreground mb-10"
      >
        Let's continue your journey to mastering the future.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} variants={cardVariants} custom={i + 2}>
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div variants={cardVariants} custom={5} className="lg:col-span-3">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
            <CardHeader>
                <CardTitle>Course Enrollment by Category</CardTitle>
                <CardDescription>
                Your learning focus at a glance.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)"
                        }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={cardVariants} custom={6} className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
                <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {inProgressCourses.length > 0 ? inProgressCourses.slice(0,3).map(course => (
                        <div key={course.id} className="bg-card/80 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-sm truncate pr-4">{course.title}</h4>
                                <Link href={`/courses/${course.id}`}>
                                    <Button size="sm" className="text-xs shrink-0">Continue</Button>
                                </Link>
                            </div>
                             <Progress value={course.progress} className="h-2"/>
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-sm">No courses in progress. Time to enroll!</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </div>

       <motion.div variants={cardVariants} custom={7} className="mt-8">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-purple-400" />
                        Recommended For You
                    </CardTitle>
                    <CardDescription>Based on your progress, here are some courses you might like.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isRecsLoading ? (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_,i) => <Skeleton key={i} className="h-64" />)}
                        </div>
                    ) : recommendations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {recommendations.slice(0, 4).map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                       <p className="text-muted-foreground text-sm">No recommendations available right now. Explore our course library to find something new!</p>
                    )}
                </CardContent>
            </Card>
       </motion.div>

       <motion.div variants={cardVariants} custom={8} className="mt-8">
         <Card className="bg-card/60 backdrop-blur-sm border-border/50">
           <CardHeader>
             <CardTitle>Completed Courses</CardTitle>
             <CardDescription>Congratulations on your achievements!</CardDescription>
           </CardHeader>
           <CardContent>
             {completedCourses.length > 0 ? (
               <ul className="space-y-3">
                 {completedCourses.map((course) => (
                   <li key={course.id} className="flex items-center justify-between bg-card/80 p-3 rounded-lg">
                     <div className="flex items-center gap-3">
                       <CheckCircle className="h-5 w-5 text-success" />
                       <span className="font-medium">{course.title}</span>
                     </div>
                     <Link href={`/certificate/${course.id}`}>
                       <Button variant="outline" size="sm">View Certificate</Button>
                     </Link>
                   </li>
                 ))}
               </ul>
             ) : (
               <p className="text-muted-foreground text-sm">No completed courses yet. Keep going!</p>
             )}
           </CardContent>
         </Card>
       </motion.div>
    </motion.div>
  );
}
