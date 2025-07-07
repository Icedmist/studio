'use client';

import { useState, useEffect } from 'react';
import type { Feedback } from '@/lib/types';
import { getFeedback } from '@/services/feedback-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

export function FeedbackManager() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchFeedback() {
      setIsLoading(true);
      try {
        const data = await getFeedback();
        setFeedback(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch feedback submissions.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeedback();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Submitted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedback.length > 0 ? feedback.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
                <div className="font-medium">{item.name}</div>
                <div className="text-muted-foreground text-xs">{item.email}</div>
            </TableCell>
            <TableCell className="max-w-md">{item.message}</TableCell>
            <TableCell className="text-muted-foreground">
                {item.createdAt?.toDate ? formatDistanceToNow(item.createdAt.toDate(), { addSuffix: true }) : 'N/A'}
            </TableCell>
          </TableRow>
        )) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No feedback submissions yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
