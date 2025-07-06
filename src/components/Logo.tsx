import { BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline text-primary', className)}>
    <BookOpenCheck className="w-6 h-6" />
    <span>TechTradeHub</span>
  </div>
);
