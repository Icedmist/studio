"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show a simple loading state while auth status is being determined.
  // This prevents a flash of unauthenticated content.
  if (isLoading) {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className='space-y-4'>
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-48" />
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
