import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline text-primary', className)}>
    <Triangle className="h-7 w-7 text-primary" fill="currentColor" />
    <span className="text-foreground">TechTradeHub</span>
  </div>
);
