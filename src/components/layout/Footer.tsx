import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { XIcon } from '@/components/icons/XIcon';
import { FacebookIcon } from '../icons/FacebookIcon';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
             Your trusted platform for mastering the skills of tomorrow in technology and finance.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Feedback</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
               <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Course Library</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Progress Tracking</Link></li>
              <li><Link href="/#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">AI Assistance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Google">
                <GoogleIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
               <Link href="#" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="X/Twitter">
                <XIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TechTradeHub Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
