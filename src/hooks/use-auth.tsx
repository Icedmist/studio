"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

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

  // Show a global loader before any part of the app can render.
  // This prevents race conditions where data is fetched before auth state is resolved.
  if (isLoading) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
            <div className='space-y-4 text-center'>
                <div className="flex justify-center items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-muted-foreground text-lg">Authenticating...</p>
                </div>
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