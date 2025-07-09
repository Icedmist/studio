import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline', className)}>
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="url(#logo-grad)" fillOpacity="0.1" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2.5" fill="url(#logo-grad)" />
        <path d="M12 14.5V22" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 2V9.5" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 7L12 12L22 7" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
    <span className="text-foreground">TechTradeHub</span>
  </div>
);
