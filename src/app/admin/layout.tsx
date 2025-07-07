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
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // AuthProvider shows a global loader, so we just need a spinner for the redirect.
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }
  
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

  return <>{children}</>;
}
