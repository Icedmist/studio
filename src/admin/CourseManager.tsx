
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Course } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Library, RefreshCw, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from '@/components/admin/CourseForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewCourseSchema } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { seedInitialCourses } from '@/services/seed-data';
import { getCourses } from '@/services/course-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type CourseFormData = z.infer<typeof NewCourseSchema>;

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const courseData = await getCourses();
      setCourses(courseData);
    } catch (error) {
        console.error("Error fetching courses: ", error);
        toast({
            title: "Error",
            description: `Could not fetch courses: ${(error as Error).message}. This is likely a Firestore security rule issue.`,
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSeedCourses = async () => {
    setIsSeeding(true);
    toast({
        title: "Seeding in Progress",
        description: "Populating the database with initial courses...",
    });
    try {
        const seededCount = await seedInitialCourses();
        toast({
            title: "Success!",
            description: `${seededCount} courses have been added to the database.`,
            variant: "success",
        });
        await fetchCourses(); // Refresh the list
    } catch (error) {
        console.error("Error seeding courses: ", error);
        toast({
            title: "Seeding Failed",
            description: `Could not seed courses: ${(error as Error).message}. Check the server logs for more details.`,
            variant: "destructive",
        });
    } finally {
        setIsSeeding(false);
    }
  }

  const handleFormSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      const validatedData = NewCourseSchema.parse(data);
      if (editingCourse) {
        const courseDoc = doc(db, 'courses', editingCourse.id);
        await updateDoc(courseDoc, validatedData);
      } else {
        await addDoc(collection(db, 'courses'), validatedData);
      }

      toast({
        title: `Course ${editingCourse ? 'updated' : 'added'}`,
        description: `The course details have been saved successfully.`,
        variant: "success",
      });
      setDialogOpen(false);
      setEditingCourse(null);
      await fetchCourses(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
      setDialogOpen(false);
      setEditingCourse(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
      toast({
        title: "Course Deleted",
        description: "The course has been removed successfully.",
        variant: "success",
      });
      await fetchCourses(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex justify-end mb-4 gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
        </div>
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
        <Card className="text-center bg-card/60">
            <CardHeader>
                <div className="mx-auto bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full w-fit">
                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                </div>
                <CardTitle>No Courses Found</CardTitle>
                <CardDescription>
                    Your `courses` collection in Firestore is empty. You need to seed the initial course data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSeedCourses} disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isSeeding ? 'Seeding...' : 'Seed Initial Courses'}
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" onClick={fetchCourses} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={openAddDialog}>
          <Library className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
             <DialogDescription>
                Fill in the details for the course. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <CourseForm 
            onSubmit={handleFormSubmit} 
            initialData={editingCourse}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
          />
        </DialogContent>
      </Dialog>

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
          {courses.map((course) => (
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
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(course)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Edit course</p></TooltipContent>
                </Tooltip>
                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent><p>Delete course</p></TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the course and all its data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => confirmDelete(course.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
