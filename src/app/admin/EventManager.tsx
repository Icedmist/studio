'use client';

import { useState, useEffect } from 'react';
import type { Event } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventForm } from './EventForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewEventSchema } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getEvents } from '@/services/event-data';

type EventFormData = z.infer<typeof NewEventSchema>;

export function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
        const data = await getEvents();
        setEvents(data);
    } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch events.",
          variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
        const validatedData = NewEventSchema.parse(data);
        if (editingEvent) {
            const eventDocRef = doc(db, 'events', editingEvent.id);
            await updateDoc(eventDocRef, validatedData);
        } else {
            await addDoc(collection(db, 'events'), validatedData);
        }

        toast({
            title: `Event ${editingEvent ? 'updated' : 'created'}`,
            description: `The event has been saved successfully.`,
            variant: "success",
        });

        setDialogOpen(false);
        setEditingEvent(null);
        await fetchEvents();
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

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
      setDialogOpen(false);
      setEditingEvent(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'events', id));
        setEvents(events.filter(e => e.id !== id));
        toast({
            title: "Event Deleted",
            description: "The event has been removed successfully.",
            variant: "success",
        });
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "An unknown error occurred.",
            variant: "destructive",
        });
    }
  };

  const getStatusVariant = (status: Event['status']) => {
    switch (status) {
        case 'upcoming': return 'success';
        case 'past': return 'secondary';
        case 'cancelled': return 'destructive';
        default: return 'secondary';
    }
  }

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
          <CalendarDays className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            <DialogDescription>
                Fill in the details for the event.
            </DialogDescription>
          </DialogHeader>
          <EventForm 
            onSubmit={handleFormSubmit} 
            initialData={editingEvent}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
          />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                {event.date?.toDate ? format(event.date.toDate(), 'PPP') : 'N/A'}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Edit event</p></TooltipContent>
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
                    <TooltipContent><p>Delete event</p></TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the event. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => confirmDelete(event.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No events found. Click "Create Event" to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
