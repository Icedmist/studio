'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Bot, BarChart, Library, Search, MessageSquare, Star, Newspaper } from 'lucide-react';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { AnimatedHeroText } from './page-client';
import { motion } from 'framer-motion';

const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Futures Trader',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man trader',
      comment: 'The futures trading course was a game-changer for my career. The insights were practical and immediately applicable.',
    },
    {
      name: 'Samantha Lee',
      role: 'Web3 Developer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman developer',
      comment: 'I went from knowing nothing about Web3 to building my own dApps. Highly recommended for aspiring developers!',
    },
     {
      name: 'Michael Chen',
      role: 'AI Enthusiast',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man ai',
      comment: 'TechTradeHub\'s AI & Machine Learning path is comprehensive and up-to-date with the latest industry trends.',
    },
    {
      name: 'David Rodriguez',
      role: 'Cybersecurity Analyst',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man cybersecurity',
      comment: 'The tech skills courses gave me the confidence to pivot into a new and exciting career in cybersecurity.',
    },
    {
      name: 'Emily White',
      role: 'Crypto Investor',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman crypto',
      comment: 'The crypto trading course demystified the market for me. The community is also incredibly supportive.',
    },
    {
      name: 'James Brown',
      role: 'Aspiring Developer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'student developer',
      comment: 'As a beginner, I found the courses easy to follow. The progress tracking keeps me motivated to learn every day!',
    },
];

const features = [
    {
      icon: <Library className="w-6 h-6 text-primary" />,
      title: 'Extensive Course Library',
      description: 'Explore a vast range of courses across the most in-demand tech fields.',
    },
    {
      icon: <BarChart className="w-6 h-6 text-success" />,
      title: 'Track Your Progress',
      description: 'Stay motivated with real-time tracking of your achievements.',
    },
    {
      icon: <Award className="w-6 h-6 text-secondary" />,
      title: 'Earn Certificates',
      description: 'Showcase your expertise with industry-recognized certificates.',
    },
    {
      icon: <Bot className="w-6 h-6 text-success" />,
      title: 'AI-Powered Assistance',
      description: 'Get instant help from our AI assistant, Tech Gee.',
    },
    {
        icon: <Search className="w-6 h-6 text-purple-400" />,
        title: 'Smart Search',
        description: 'Easily find the courses and content you need to succeed.',
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-primary" />,
        title: 'Community Access',
        description: 'Connect with peers and instructors for support and collaboration.',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function HomePageClient({ courses }: { courses: Course[] }) {
    return (
        <div className="flex flex-col items-center text-foreground">
        {/* Hero Section */}
        <section className="w-full text-center py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-headline font-bold mb-4"
            >
              Master the Future –{' '}
              <AnimatedHeroText />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              Unlock your potential with expert-led courses in the most in-demand fields of technology and finance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/courses">
                <Button size="lg" variant="default">Explore Courses</Button>
              </Link>
            </motion.div>
          </div>
        </section>
  
        {/* Featured Courses Section */}
        <section id="featured-courses" className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">
              Explore Our Top Courses
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Hand-picked courses to help you get started on your learning journey, no matter your skill level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {courses.slice(0, 4).map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              Everything You Need to Succeed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                   <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary transition-all cursor-pointer h-full p-4 flex flex-col items-center justify-center">
                      <div className="p-3 rounded-full mb-4 bg-background">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                   </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 h-full">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Blog CTA Section */}
        <section className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Newspaper className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-headline font-bold mb-4">
              From Our Blog
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get the latest insights, tips, and academy news from our team of experts.
            </p>
            <Link href="/blog">
              <Button size="lg">Read The Blog</Button>
            </Link>
          </div>
        </section>
  
        {/* Final CTA Section */}
        <section className="w-full text-center py-20 md:py-32 bg-card/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-headline font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of students and professionals who are leveling up their skills with TechTradeHub Academy.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
            </div>
        </section>
      </div>
    );
}
