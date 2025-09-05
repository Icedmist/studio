
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Bot, BarChart, Library, Search, MessageSquare, Newspaper, User, CalendarDays, ArrowRight, ShieldCheck, Zap, Users, Target } from 'lucide-react';
import Link from 'next/link';
import type { Course, PlainBlog, PlainEvent, Instructor } from '@/lib/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { PostCard } from '@/components/blog/PostCard';
import { EventCard } from '@/components/events/EventCard';
import { AnimatedHeroText } from './page-client';
import { motion } from 'framer-motion';

const features = [
    {
      icon: <Library className="w-6 h-6 text-primary" />,
      title: 'Expert-Led Courses',
      description: 'Explore a vast range of courses across the most in-demand tech fields.',
    },
    {
      icon: <BarChart className="w-6 h-6 text-success" />,
      title: 'Track Your Progress',
      description: 'Stay motivated with real-time tracking of your achievements and milestones.',
    },
    {
      icon: <Award className="w-6 h-6 text-secondary" />,
      title: 'Earn Certificates',
      description: 'Showcase your expertise with verifiable, industry-recognized certificates.',
    },
    {
      icon: <Bot className="w-6 h-6 text-success" />,
      title: 'AI-Powered Assistance',
      description: 'Get instant help and guidance from our AI assistant, Tech Gee.',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function HomePageClient({ courses, posts, events, instructors }: { courses: Course[], posts: PlainBlog[], events: PlainEvent[], instructors: Instructor[] }) {
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
              Unlock your potential with expert-led courses in the most in-demand fields of technology and finance. All courses are now free.
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
        
        {/* About Us Section */}
        <section id="about-us" className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                         <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                            <Target className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                            About TechTradeHub Academy
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Founded with a vision to democratize elite tech and financial education, TechTradeHub Academy was born from a desire to bridge the skills gap in a rapidly evolving digital world. We believe that knowledge in cutting-edge fields like AI, Web3, and advanced trading should be accessible to everyone, everywhere.
                        </p>
                        <p className="text-muted-foreground mb-8">
                            Our mission is to provide practical, affordable, and high-quality education in high-demand technology and finance sectors, enabling our students to achieve their career goals and drive innovation.
                        </p>
                        <Link href="/about">
                            <Button variant="outline">
                                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
                        <Library className="w-24 h-24 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Courses Section */}
        <section id="featured-courses" className="w-full py-20 md:py-24 bg-background">
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
  
        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              Why Choose TechTradeHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1 }}>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader className="items-center">
                      <div className="p-3 rounded-full bg-primary/10 w-fit">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle>Expert-Led Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Learn from industry professionals with real-world experience in trading, development, and AI.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2 }}>
                   <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader className="items-center">
                      <div className="p-3 rounded-full bg-success/10 w-fit">
                        <Zap className="w-8 h-8 text-success" />
                      </div>
                      <CardTitle>Practical, Hands-On Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Our curriculum is project-based, ensuring you gain practical skills you can apply immediately.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                 <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3 }}>
                   <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader className="items-center">
                      <div className="p-3 rounded-full bg-secondary/10 w-fit">
                        <Users className="w-8 h-8 text-secondary" />
                      </div>
                      <CardTitle>Vibrant Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Connect with fellow learners, share ideas, and grow together in our active community channels.</p>
                    </CardContent>
                  </Card>
                 </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <section className="w-full py-20 md:py-24 bg-background">
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

        {/* Meet the Team Section */}
        <section id="team" className="w-full py-20 md:py-24 bg-card/50 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              Meet the Instructors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 h-full text-center">
                    <CardHeader className="items-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                          <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{instructor.name}</CardTitle>
                        <p className="text-sm text-primary">{instructor.bio.split('.')[0]}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link href="/about">
                    <Button variant="outline">
                        Learn More About Our Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </div>
        </section>
  
        {/* Final CTA Section */}
        <section className="w-full text-center py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of students and professionals who are leveling up their skills with TechTradeHub Academy.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now for Free
                </Button>
              </Link>
            </div>
        </section>
      </div>
    );
}
