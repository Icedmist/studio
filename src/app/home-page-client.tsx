
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Bot, BarChart, Library, Search, MessageSquare, Newspaper, User, CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Course, PlainBlog, PlainEvent } from '@/lib/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { PostCard } from '@/components/blog/PostCard';
import { EventCard } from '@/components/events/EventCard';
import { AnimatedHeroText } from './page-client';
import { motion } from 'framer-motion';

const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Futures Trader',
      comment: 'The futures trading course was a game-changer for my career. The insights were practical and immediately applicable.',
    },
    {
      name: 'Samantha Lee',
      role: 'Web3 Developer',
      comment: 'I went from knowing nothing about Web3 to building my own dApps. Highly recommended for aspiring developers!',
    },
     {
      name: 'Michael Chen',
      role: 'AI Enthusiast',
      comment: 'TechTradeHub\'s AI & Machine Learning path is comprehensive and up-to-date with the latest industry trends.',
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
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function HomePageClient({ courses, posts, events }: { courses: Course[], posts: PlainBlog[], events: PlainEvent[] }) {
    return (
        <div className="flex flex-col items-center text-foreground">
        {/* Hero Section */}
        <section className="w-full text-center py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4"
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
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
              Explore Our Top Courses
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Hand-picked courses to help you get started on your learning journey, no matter your skill level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
             <div className="text-center mt-12">
                <Link href="/courses">
                    <Button variant="outline">
                        View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              Everything You Need to Succeed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                   <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary transition-all cursor-pointer h-full p-6 flex flex-col items-center justify-start">
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
        
        {/* Dynamic Content Section */}
        <section className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                 <div className="grid lg:grid-cols-2 gap-12">
                    {/* Upcoming Events */}
                    <div>
                        <h2 className="text-3xl font-headline font-bold mb-2 flex items-center gap-2"><CalendarDays className="w-8 h-8 text-primary" /> Upcoming Events</h2>
                        <p className="text-muted-foreground mb-8">Join our live events to learn from experts and connect with the community.</p>
                        <div className="space-y-4">
                            {events.length > 0 ? (
                                events.map(event => <EventCard key={event.id} event={event} />)
                            ) : (
                                <p className="text-muted-foreground">No upcoming events scheduled. Please check back soon!</p>
                            )}
                        </div>
                        <div className="text-left mt-8">
                            <Link href="/events">
                                <Button variant="outline">
                                    View All Events <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Latest Blog Posts */}
                     <div>
                        <h2 className="text-3xl font-headline font-bold mb-2 flex items-center gap-2"><Newspaper className="w-8 h-8 text-primary" /> From The Blog</h2>
                        <p className="text-muted-foreground mb-8">Get the latest insights, tips, and academy news from our team.</p>
                        <div className="space-y-4">
                             {posts.length > 0 ? (
                                posts.map(post => <PostCard key={post.id} post={post} />)
                            ) : (
                                <p className="text-muted-foreground">No blog posts available yet.</p>
                            )}
                        </div>
                         <div className="text-left mt-8">
                            <Link href="/blog">
                                <Button variant="outline">
                                    Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
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
                          <AvatarFallback><User /></AvatarFallback>
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
  
        {/* Final CTA Section */}
        <section className="w-full text-center py-20 md:py-32 bg-card/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ready to Start Learning?</h2>
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
