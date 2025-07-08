'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { ADMIN_UIDS } from '@/lib/admin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // This effect will run once after the initial render and whenever dependencies change.
  // It handles the redirection logic cleanly.
  useEffect(() => {
    // If auth state is resolved and there is no user, redirect to login.
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  // While authentication is in progress, show a loading spinner.
  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }

  // If auth is resolved, but there is no user, we are in the process of redirecting.
  // Show a loader to prevent a flash of content or an empty screen.
  if (!user) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }
  
  // If the user is logged in, check if they are an authorized admin.
  const isAuthorized = ADMIN_UIDS.includes(user.uid);

  if (!isAuthorized) {
    return (
        <div className="container mx-auto py-12 flex items-center justify-center">
            <Card className="max-w-md w-full bg-destructive/10 border-destructive text-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldAlert />
                        Access Denied
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page. This area is for administrators only.</p>
                    <p className='mt-4'>If you believe this is an error, please contact support.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  // If all checks pass, render the admin dashboard.
  return <>{children}</>;
}
