'use client';

import { useState, useEffect } from 'react';
import type { Course } from '@/lib/types';
import { getCourses, addCourse, updateCourse, deleteCourse } from '@/services/course-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Library } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from './CourseForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewCourseSchema } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

type CourseFormData = z.infer<typeof NewCourseSchema>;

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch courses.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFormSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
        if (editingCourse) {
            await updateCourse(editingCourse.id, data);
        } else {
            await addCourse(data);
        }

        toast({
            title: `Course ${editingCourse ? 'updated' : 'added'}`,
            description: `The course details have been saved successfully.`,
            variant: "success",
        });
        setDialogOpen(false);
        setEditingCourse(null);
        router.refresh();
        await fetchCourses();
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
        await deleteCourse(id);
        toast({
            title: "Course Deleted",
            description: "The course has been removed successfully.",
            variant: "success",
        });
        router.refresh();
        await fetchCourses();
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
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4">
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
