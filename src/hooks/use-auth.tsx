"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Firebase is configured. If not, we don't need to do anything else.
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    // `auth` is guaranteed to be non-null here because of the isFirebaseConfigured check.
    const unsubscribe = onAuthStateChanged(auth!, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseConfigured]);

  if (isLoading) {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className='space-y-4 text-center'>
                <Skeleton className="h-10 w-64 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
                <p className="text-sm text-muted-foreground pt-4">Initializing Authentication...</p>
            </div>
        </div>
    )
  }
  
  if (!isFirebaseConfigured) {
      return (
          <div className="w-full min-h-screen flex items-center justify-center p-4 bg-background">
              <div className="text-center max-w-lg bg-card/80 p-8 rounded-xl shadow-2xl border-2 border-destructive/50">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 mb-4">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <h1 className="text-2xl font-headline font-bold text-destructive mb-2">Firebase Not Configured</h1>
                  <p className="text-muted-foreground">
                      The application cannot connect to Firebase.
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground/80">
                      Please add your Firebase project keys to the <code className="bg-muted text-foreground px-1 py-0.5 rounded-sm font-mono text-xs">.env</code> file at the root of your project and restart the server.
                  </p>
              </div>
          </div>
      )
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
