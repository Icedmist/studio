import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline', className)}>
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-grad-blue" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4338CA"/>
                <stop offset="1" stopColor="#6366F1"/>
            </linearGradient>
            <linearGradient id="logo-grad-green" x1="100" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#047857"/>
                <stop offset="1" stopColor="#10B981"/>
            </linearGradient>
        </defs>
        {/* Left blue part */}
        <path d="M50 0 L0 100 L50 75 Z" fill="url(#logo-grad-blue)"/>
        {/* Right green part */}
        <path d="M50 0 L100 100 L50 75 Z" fill="url(#logo-grad-green)"/>
        {/* Dark base */}
        <path d="M50 75 L0 100 L100 100 L50 75 Z" fill="#1E293B"/>
    </svg>
    <span className="text-foreground">TechTradeHub</span>
  </div>
);
