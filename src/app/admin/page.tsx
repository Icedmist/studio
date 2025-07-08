
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, Library, Pencil, Trash2, Newspaper, MessageSquare, ShieldAlert } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InstructorManager } from '@/components/admin/InstructorManager';
import { useEffect, useState } from 'react';
import type { StudentProgress } from '@/lib/types';
import { getAllStudentProgresses } from '@/services/student-data';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { CourseManager } from '@/components/admin/CourseManager';
import { ADMIN_UIDS } from '@/lib/admin';
import { BlogManager } from './BlogManager';
import { FeedbackManager } from './FeedbackManager';
import { useAuth } from '@/hooks/use-auth';

const ProgressBadge = ({ progress }: { progress: number }) => {
    let variant: "success" | "warning" | "destructive" | "secondary" = "secondary";
    if (progress === 100) {
        variant = "success";
    } else if (progress > 0) {
        variant = "warning";
    } else {
        variant = "destructive";
    }
    return <Badge variant={variant}>{progress}%</Badge>
}

const FirestoreRulesError = () => (
    <Card className="bg-destructive/10 border-destructive/50 text-destructive my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert />
          Action Required: Update Firestore Rules
        </CardTitle>
        <CardDescription className="text-destructive/90">
          Your admin dashboard failed to load because your Firestore security rules are blocking access. This is the final step to get your admin panel working.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-bold">Please follow these steps exactly:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2 text-sm">
            <li><a href="https://console.firebase.google.com/project/tech-trade-hub-academy/firestore/rules" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Click here to open your Firestore Rules editor.</a></li>
            <li>Delete all the text currently in the editor.</li>
            <li>Copy the entire code block below and paste it into the empty editor.</li>
            <li>Click the "Publish" button at the top of the screen.</li>
          </ol>
        </div>
        <div>
          <h4 className="font-bold mb-2">Correct Security Rules:</h4>
          <pre className="p-4 rounded-md bg-background/80 text-xs font-mono whitespace-pre-wrap text-foreground">
            {`rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.uid in [
        'dqrHnJtM27bMpNudHxO5hL3wsNE3'
      ];
    }

    match /studentProgress/{userId} {
      // Admins can list all users. Students can only get/write their own.
      allow list: if isAdmin();
      allow get, write: if request.auth != null && (request.auth.uid == userId || isAdmin());
    }

    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }

    match /instructors/{instructorId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }

    match /blogPosts/{postId} {
      allow read: if (request.auth != null && resource.data.status == 'published') || isAdmin();
      allow write: if isAdmin();
    }

    match /feedback/{feedbackId} {
      allow create: if request.auth != null;
      allow read, update, delete: if isAdmin();
    }
  }
}`}
          </pre>
        </div>
      </CardContent>
    </Card>
);

export default function AdminPage() {
  const [users, setUsers] = useState<StudentProgress[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      if (!user) return; // Wait for user to be authenticated

      try {
        setIsLoadingUsers(true);
        setPermissionError(false);
        const userProgresses = await getAllStudentProgresses();
        setUsers(userProgresses);
      } catch (error: any) {
         if (error.code === 'permission-denied' || error.message.includes('permission-denied') || error.message.includes('insufficient permissions')) {
            setPermissionError(true);
        } else {
            toast({
              title: "Error Fetching Users",
              description: `Could not load student list. (${error.message})`,
              variant: "destructive",
            })
        }
      } finally {
        setIsLoadingUsers(false);
      }
    }
    fetchUsers();
  }, [toast, user]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Admin Dashboard
        </h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Manage courses, users, and site content from this secure dashboard.
      </p>
      
      {permissionError && <FirestoreRulesError />}

      <TooltipProvider>
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="courses">
              <Library className="mr-2 h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="instructors">
              <Users className="mr-2 h-4 w-4" /> Instructors
            </TabsTrigger>
            <TabsTrigger value="blog">
                <Newspaper className="mr-2 h-4 w-4" /> Blog
            </TabsTrigger>
             <TabsTrigger value="feedback">
                <MessageSquare className="mr-2 h-4 w-4" /> Feedback
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users with profiles in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Courses Enrolled</TableHead>
                      <TableHead>Overall Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingUsers ? (
                      [...Array(3)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-8 w-full" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : users.length > 0 ? (
                      users.map((user) => (
                      <TableRow key={user.studentId}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                            {ADMIN_UIDS.includes(user.studentId) ? (
                                <Badge variant="default">Admin</Badge>
                            ) : (
                                <Badge variant="outline">Student</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                          {user.enrolledCourses.length}
                        </TableCell>
                         <TableCell>
                            <ProgressBadge progress={user.overallProgress} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" disabled>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Edit user (Not implemented)</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Delete user (Not implemented)</p></TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          {permissionError ? 'Update your security rules to see user data.' : 'No users have created a profile yet.'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="courses">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>
                  Add, edit, and delete courses in the catalog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="instructors">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Instructor Management</CardTitle>
                <CardDescription>
                  Add, view, and manage instructors, co-founders, and team members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InstructorManager />
              </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="blog">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>
                  Create, edit, and manage blog posts for your audience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogManager />
              </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="feedback">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>
                  View and manage feedback submitted by your users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </div>
  );
}
