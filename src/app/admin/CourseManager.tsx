
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
import { Pencil, Trash2, Library, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from '@/components/admin/CourseForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewCourseSchema } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { seedInitialCourses } from '@/services/seed-data';
import { getCourses } from '@/services/course-data';

type CourseFormData = z.infer<typeof NewCourseSchema>;

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      let courseData = await getCourses();
      if (courseData.length === 0) {
        setIsSeeding(true);
        toast({
            title: "No courses found",
            description: "Seeding initial courses into the database. This may take a moment...",
            variant: "default"
        });
        await seedInitialCourses();
        courseData = await getCourses(); // Re-fetch after seeding
        setIsSeeding(false);
      }
      setCourses(courseData);
    } catch (error) {
        console.error("Error fetching courses: ", error);
        toast({
            title: "Error",
            description: `Could not fetch courses: ${(error as Error).message}`,
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        {isSeeding && (
            <div className='flex items-center justify-center gap-2 text-muted-foreground p-4'>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Seeding initial course data...</span>
            </div>
        )}
      </div>
    );
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
          {courses.length > 0 ? courses.map((course) => (
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
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No courses found. Click "Add Course" to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
