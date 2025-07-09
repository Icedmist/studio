'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import type { StudentProgress } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_UIDS } from '@/lib/admin';
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<StudentProgress[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [referrers, setReferrers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      if (!user) return; 

      try {
        setIsLoadingUsers(true);
        if (!db) {
            throw new Error("Firestore is not initialized.");
        }
        const progressCol = collection(db, 'studentProgress');
        const progressSnapshot = await getDocs(progressCol);
        const userProgresses = progressSnapshot.docs.map(doc => doc.data() as StudentProgress);
        setUsers(userProgresses);

        const referrerIds = new Set(userProgresses.map(u => u.referredBy).filter(Boolean) as string[]);
        const referrerData: Record<string, string> = {};
        for (const uid of referrerIds) {
            const userDoc = await getDocs(collection(db, 'studentProgress'));
            const docSnap = userDoc.docs.find(d => d.id === uid);
            if (docSnap && docSnap.exists()) {
                referrerData[uid] = docSnap.data().name;
            }
        }
        setReferrers(referrerData);

      } catch (error: any) {
        console.error("Error fetching user list:", error);
        toast({
            title: "Error Fetching Users",
            description: `Could not load student list. This might be a permissions issue. Error: ${error.message}`,
            variant: "destructive",
        })
      } finally {
        setIsLoadingUsers(false);
      }
    }
    fetchUsers();
  }, [toast, user]);

  return (
    <TooltipProvider>
       <div className="flex items-center gap-2 mb-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          User Management
        </h1>
      </div>
      <p className="text-muted-foreground mb-8">
        View and manage all registered users with profiles in the system.
      </p>

      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className='pt-6'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Referred By</TableHead>
                <TableHead>Courses Enrolled</TableHead>
                <TableHead>Overall Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
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
                      {user.referredBy ? referrers[user.referredBy] || user.referredBy.substring(0,6) : 'N/A'}
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
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users have created a profile yet, or your security rules are preventing access.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
