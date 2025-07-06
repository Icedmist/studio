import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { XIcon } from '@/components/icons/XIcon';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering the next generation of tech and finance professionals.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-2">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Courses</Link></li>
              <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="/signup" className="text-muted-foreground hover:text-primary">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-2">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Google">
                <GoogleIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
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