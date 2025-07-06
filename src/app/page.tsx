import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Bot, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: <BarChart className="w-10 h-10 text-primary" />,
      title: 'Track Your Progress',
      description: 'Stay motivated with real-time tracking of your course completion and achievements.',
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: 'Earn Verifiable Certificates',
      description: 'Showcase your expertise with industry-recognized certificates upon course completion.',
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: 'AI-Powered Assistance',
      description: 'Get instant help and answers to your questions from our AI assistant, Tech Gee.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Futures Trader',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'professional portrait',
      comment: 'The futures trading course was a game-changer for my career. The insights were practical and immediately applicable.',
    },
    {
      name: 'Samantha Lee',
      role: 'Web3 Developer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman smiling',
      comment: 'I went from knowing nothing about Web3 to building my own dApps. Highly recommended for aspiring developers!',
    },
     {
      name: 'Michael Chen',
      role: 'AI Enthusiast',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man developer',
      comment: 'TechTradeHub\'s AI & Machine Learning path is comprehensive and up-to-date with the latest industry trends.',
    },
  ];

  return (
    <div className="flex flex-col items-center text-foreground">
      {/* Hero Section */}
      <section className="w-full text-center py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
            Unlock Your Future in Tech & Trading
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master in-demand skills in Futures Trading, Web3, AI, and more with expert-led courses at TechTradeHub Academy.
          </p>
          <Link href="/courses">
            <Button size="lg">Explore Courses</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Why Choose TechTradeHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-4 bg-background rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Course Categories Teaser */}
      <section className="w-full py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Find Your Path
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Futures Trading', 'Web3', 'Crypto', 'Tech Skills', 'AI & ML'].map(category => (
               <Link href="/courses" key={category}>
                  <Card className="bg-card hover:border-primary transition-all cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                       <p className="font-semibold font-headline">{category}</p>
                    </CardContent>
                  </Card>
               </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-border">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full text-center py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students and professionals who are leveling up their skills with TechTradeHub Academy.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
