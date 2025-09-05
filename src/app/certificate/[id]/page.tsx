
'use client';

import { courses } from '@/lib/courses';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";

export default function CertificatePage() {
  const params = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === params.id);
  const { user } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const studentName = user?.displayName || user?.email || "Student";
  const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!course) {
    notFound();
  }

  const finalScore = 98; // Placeholder

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background py-12 px-4 flex flex-col items-center"
    >
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-4">
        <h1 className="text-2xl font-headline font-bold">Your Certificate</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="w-full max-w-4xl bg-card border-4 border-primary/80 aspect-[1.414/1] flex flex-col text-center shadow-2xl rounded-2xl overflow-hidden relative">
        {/* Techy background */}
        <div className="absolute inset-0 w-full h-full bg-grid-slate-900/[0.04] bg-[bottom_1px_left_1px] dark:bg-grid-slate-400/[0.05] dark:bg-bottom-slate-400/10" />

        <div className="relative z-10 flex flex-col h-full p-8 text-foreground">
            <div className="flex justify-between items-start mb-4">
                <div className="text-foreground">
                    <Logo />
                </div>
                <div className="text-right text-foreground">
                    <p className="font-semibold">TechTradeHub Academy</p>
                    <p className="text-xs text-muted-foreground">Master the Future</p>
                </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center">
              <p className="font-headline text-3xl md:text-5xl font-bold text-primary mb-2">Certificate of Completion</p>
              <p className="text-muted-foreground mb-6">This certifies that</p>
              <p className="font-headline text-4xl md:text-6xl font-bold mb-6">{studentName}</p>
              <p className="text-muted-foreground mb-4">has successfully completed the course</p>
              <p className="font-headline text-2xl md:text-3xl font-bold mb-8">{course.title}</p>
            </div>

            <div className="flex justify-between items-end">
                <div className="text-left">
                    <p className="font-bold border-b border-foreground pb-1">{completionDate}</p>
                    <p className="text-xs text-muted-foreground mt-1">Date</p>
                </div>

                <div className="flex items-end gap-4">
                    {url ? (
                      <div className="bg-white p-1 rounded-md">
                        <QRCode value={url} size={80} level="L" />
                      </div>
                    ) : (
                      <div className="w-[88px] h-[88px] bg-muted/20 rounded-md animate-pulse" />
                    )}
                    <div className="text-left text-xs text-muted-foreground">
                        <p>Course ID: TTH-{course.id.padStart(4, '0')}</p>
                        <p>Final Score: {finalScore}%</p>
                        <p className="truncate max-w-[150px]">Verify at: {url}</p>
                    </div>
                </div>

                <div className="text-left">
                    <p className="font-headline text-lg font-bold border-b border-foreground pb-1">Jane Doe</p>
                    <p className="text-xs text-muted-foreground mt-1">Head Instructor</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

