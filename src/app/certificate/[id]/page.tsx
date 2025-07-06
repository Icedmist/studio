'use client';

import { courses } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const QrCodePlaceholder = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H40V40H0V0ZM10 10V30H30V10H10Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M60 0H100V40H60V0ZM70 10V30H90V10H70Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 60H40V100H0V60ZM10 70V90H30V70H10Z" fill="currentColor"/>
    <path d="M60 60H70V70H60V60Z" fill="currentColor"/><path d="M80 60H90V70H80V60Z" fill="currentColor"/><path d="M60 80H70V90H60V80Z" fill="currentColor"/><path d="M80 80H90V90H80V80Z" fill="currentColor"/><path d="M90 70H100V80H90V70Z" fill="currentColor"/><path d="M70 70H80V80H70V70Z" fill="currentColor"/><path d="M70 90H80V100H70V90Z" fill="currentColor"/><path d="M90 90H100V100H90V90Z" fill="currentColor"/><path d="M90 50H100V60H90V50Z" fill="currentColor"/><path d="M50 90H60V100H50V90Z" fill="currentColor"/><path d="M50 50H60V60H50V50Z" fill="currentColor"/><path d="M40 50H50V60H40V50Z" fill="currentColor"/><path d="M50 40H60V50H50V40Z" fill="currentColor"/>
  </svg>
);


export default function CertificatePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  const studentName = "Alex Johnson"; // Placeholder
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
                <QrCodePlaceholder />
                <div className="text-left">
                    <p className="text-xs text-muted-foreground">Course ID: TTH-{course.id.padStart(4, '0')}</p>
                    <p className="text-xs text-muted-foreground">Final Score: {finalScore}%</p>
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