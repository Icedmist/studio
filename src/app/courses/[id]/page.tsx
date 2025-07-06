import { courses } from '@/lib/courses';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-card/60 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-6">{course.longDescription}</p>
              <Button size="lg">Enroll Now</Button>
            </div>
            <div>
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                className="rounded-lg w-full object-cover"
                data-ai-hint={`${course.category} abstract`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-bold mb-4">Course Curriculum</h2>
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-headline text-lg">{module.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex justify-between items-center p-2 rounded-md hover:bg-card/80">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {lesson.title}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-headline">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Completed</span>
                    <span className="text-sm font-bold text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
                <p className="text-xs text-muted-foreground mt-2">Complete the course to earn your certificate.</p>
              </CardContent>
              <CardFooter>
                  <Link href={`/certificate/${course.id}`} className="w-full">
                     <Button className="w-full" variant="success" disabled={course.progress < 100}>
                        Get Certificate
                     </Button>
                  </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
