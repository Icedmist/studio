'use client';

import { courses } from '@/lib/courses';
import { notFound, useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { generateCertificateImage } from '@/ai/flows/generate-certificate-image-flow';
import { Skeleton } from '@/components/ui/skeleton';


export default function CertificatePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  const { user } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

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

  useEffect(() => {
    if (course && studentName !== "Student") {
        setIsImageLoading(true);
        generateCertificateImage({ courseTitle: course.title, studentName })
            .then(result => {
                setImageUrl(result.imageDataUri);
            })
            .catch(err => {
                console.error("Failed to generate certificate image:", err);
                // Fallback to a gradient or simple background
                setImageUrl('none'); 
            })
            .finally(() => {
                setIsImageLoading(false);
            });
    }
  }, [course, studentName]);

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

      <div className="w-full max-w-4xl bg-card/80 backdrop-blur-lg border-4 border-primary/80 aspect-[1.414/1] flex flex-col text-center shadow-2xl rounded-2xl overflow-hidden relative">
        {isImageLoading && (
            <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        {imageUrl && imageUrl !== 'none' && (
             <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${imageUrl})`, opacity: isImageLoading ? 0 : 1 }}
             />
        )}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/50 via-black/20 to-black/50" />

        <div className="relative z-10 flex flex-col h-full p-8 text-white">
            <div className="flex justify-between items-start mb-4">
                <div className="text-white">
                    <Logo />
                </div>
                <div className="text-right text-white">
                    <p className="font-semibold">TechTradeHub Academy</p>
                    <p className="text-xs text-white/80">An Accredited Institution</p>
                </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center">
              <p className="font-serif text-3xl md:text-5xl font-bold text-primary mb-2">Certificate of Completion</p>
              <p className="text-white/80 mb-6">This certifies that</p>
              <p className="font-serif text-4xl md:text-6xl font-bold mb-6">{studentName}</p>
              <p className="text-white/80 mb-4">has successfully completed the course</p>
              <p className="font-headline text-2xl md:text-3xl font-bold mb-8">{course.title}</p>
            </div>

            <div className="flex justify-between items-end">
                <div className="text-left">
                    <p className="font-bold border-b border-white pb-1">{completionDate}</p>
                    <p className="text-xs text-white/80 mt-1">Date</p>
                </div>

                <div className="flex items-end gap-4">
                    {url ? (
                      <div className="bg-white p-1 rounded-md">
                        <QRCode value={url} size={80} level="L" />
                      </div>
                    ) : (
                      <div className="w-[88px] h-[88px] bg-muted/20 rounded-md animate-pulse" />
                    )}
                    <div className="text-left text-xs text-white/80">
                        <p>Course ID: TTH-{course.id.padStart(4, '0')}</p>
                        <p>Final Score: {finalScore}%</p>
                        <p className="truncate max-w-[150px]">Verify at: {url}</p>
                    </div>
                </div>

                <div className="text-left">
                    <p className="font-serif text-lg font-bold border-b border-white pb-1">Jane Doe</p>
                    <p className="text-xs text-white/80 mt-1">Head Instructor</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
