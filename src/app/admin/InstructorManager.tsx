'use client';

import { useState, useEffect } from 'react';
import type { Instructor } from '@/lib/types';
import { getInstructors, addInstructor, updateInstructor, deleteInstructor } from '@/services/instructor-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, UserPlus, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InstructorForm } from './InstructorForm';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { z } from 'zod';
import { InstructorSchema } from '@/lib/types';
import { useRouter } from 'next/navigation';

const InstructorFormSchema = InstructorSchema.omit({ id: true });
type InstructorFormData = z.infer<typeof InstructorFormSchema>;


export function InstructorManager() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchInstructors = async () => {
    setIsLoading(true);
    try {
      const data = await getInstructors();
      setInstructors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch instructors.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleFormSubmit = async (data: InstructorFormData) => {
    setIsSubmitting(true);
    try {
        if (editingInstructor) {
            await updateInstructor(editingInstructor.id, data);
        } else {
            await addInstructor(data);
        }

        toast({
            title: `Instructor ${editingInstructor ? 'updated' : 'added'}`,
            description: `The instructor details have been saved successfully.`,
            variant: "success",
        });
        setDialogOpen(false);
        setEditingInstructor(null);
        router.refresh();
        await fetchInstructors(); // Refresh data
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

  const openEditDialog = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingInstructor(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
        setDialogOpen(false);
        setEditingInstructor(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
        await deleteInstructor(id);
        toast({
            title: "Instructor Deleted",
            description: "The instructor has been removed successfully.",
            variant: "success",
        });
        router.refresh();
        await fetchInstructors(); // Refresh data
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
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4">
        <Button onClick={openAddDialog}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Instructor
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}</DialogTitle>
          </DialogHeader>
          <InstructorForm 
            onSubmit={handleFormSubmit} 
            initialData={editingInstructor}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
            />
        </DialogContent>
      </Dialog>
      
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Socials</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {instructors.length > 0 ? instructors.map((instructor) => (
            <TableRow key={instructor.id}>
                <TableCell className="font-medium">{instructor.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-sm">{instructor.bio}</TableCell>
                <TableCell>
                <div className='flex gap-2'>
                    {instructor.socials?.twitter && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={instructor.socials.twitter} target="_blank">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                            <Twitter className="h-4 w-4" />
                            </Button>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent><p>View Twitter Profile</p></TooltipContent>
                    </Tooltip>
                    )}
                    {instructor.socials?.linkedin && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={instructor.socials.linkedin} target="_blank">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                            <Linkedin className="h-4 w-4" />
                            </Button>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent><p>View LinkedIn Profile</p></TooltipContent>
                    </Tooltip>
                    )}
                </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(instructor)}>
                              <Pencil className="h-4 w-4" />
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Edit instructor</p></TooltipContent>
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
                        <TooltipContent><p>Delete instructor</p></TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the instructor and remove their data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmDelete(instructor.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
            </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No instructors found. Click "Add Instructor" to get started.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
