'use client';

import { courses } from '@/lib/courses';
import { notFound, useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";


export default function CertificatePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  const { user } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState('');

  useEffect(() => {
    // This runs only on the client, after the component mounts
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  const studentName = user?.displayName || user?.email || "Student";
  const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const finalScore = 98; // Placeholder

  if (!course) {
    notFound();
  }

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

      <div className="w-full max-w-4xl bg-card/80 backdrop-blur-lg border-4 border-primary/80 p-8 aspect-[1.414/1] flex flex-col text-center shadow-2xl rounded-2xl">
        <div className="flex justify-between items-start mb-4">
            <Logo />
            <div className="text-right">
                <p className="font-semibold">TechTradeHub Academy</p>
                <p className="text-xs text-muted-foreground">An Accredited Institution</p>
            </div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center">
          <p className="font-serif text-3xl md:text-5xl font-bold text-primary mb-2">Certificate of Completion</p>
          <p className="text-muted-foreground mb-6">This certifies that</p>
          <p className="font-serif text-4xl md:text-6xl font-bold mb-6">{studentName}</p>
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
                  <div className="w-[88px] h-[88px] bg-muted rounded-md animate-pulse" />
                )}
                <div className="text-left">
                    <p className="text-xs text-muted-foreground">Course ID: TTH-{course.id.padStart(4, '0')}</p>
                    <p className="text-xs text-muted-foreground">Final Score: {finalScore}%</p>
                    <p className="text-xs text-muted-foreground truncate">Verify at: {url}</p>
                </div>
            </div>

            <div className="text-left">
                <p className="font-serif text-lg font-bold border-b border-foreground pb-1">Jane Doe</p>
                <p className="text-xs text-muted-foreground mt-1">Head Instructor</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
