import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline text-primary', className)}>
    <Image src="/logo.svg" alt="TechTradeHub Logo" width={28} height={28} className="text-primary" />
    <span className="text-foreground">TechTradeHub</span>
  </div>
);
