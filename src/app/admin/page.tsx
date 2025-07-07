
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
import { Shield, Users, Library, Pencil, Trash2 } from 'lucide-react';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InstructorManager } from '@/components/admin/InstructorManager';

// Mock data for users - in a real app, this would come from an API
const mockUsers = [
    { id: 'user_alex_johnson', name: 'Alex Johnson', email: 'alex@example.com', role: 'Student' },
    { id: 'user_maria_garcia', name: 'Maria Garcia', email: 'maria@example.com', role: 'Student' },
    { id: 'user_chen_wang', name: 'Chen Wang', email: 'chen@example.com', role: 'Student' },
    { id: 'user_admin_main', name: 'Admin User', email: 'admin@techtradehub.com', role: 'Admin' },
];


export default function AdminPage() {
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

      <TooltipProvider>
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="courses">
              <Library className="mr-2 h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="instructors">
              <Users className="mr-2 h-4 w-4" /> Instructors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>
                            {user.role}
                          </Badge>
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
                    ))}
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
                  View and manage all courses in the catalog. Functionality to edit modules and syllabus coming soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Price (₦)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course: Course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.level}</Badge>
                        </TableCell>
                        <TableCell>
                          {course.price > 0 ? course.price.toLocaleString() : 'Free'}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                           <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" disabled>
                                  <Pencil className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Edit course (Not implemented)</p></TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Delete course (Not implemented)</p></TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
        </Tabs>
      </TooltipProvider>
    </div>
  );
}
