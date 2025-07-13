import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, Linkedin, Twitter, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getInstructors } from '@/services/instructor-data';

export default async function AboutUsPage() {
  const instructors = await getInstructors();

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline font-bold">About TechTradeHub Academy</CardTitle>
          <CardDescription className="max-w-2xl mx-auto">
            Our mission is to empower the next generation of innovators, traders, and technologists with accessible, high-quality education.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-16 mt-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Our Story</h2>
                <p className="text-muted-foreground">
                    Founded with a vision to democratize elite tech and financial education, TechTradeHub Academy was born from a desire to bridge the skills gap in a rapidly evolving digital world. We believe that knowledge in cutting-edge fields like AI, Web3, and advanced trading should be accessible to everyone, everywhere. Our journey is one of passion for technology and a commitment to empowering individuals to master their future.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                        To provide practical, affordable, and high-quality education in high-demand technology and finance sectors, enabling our students to achieve their career goals and drive innovation.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Lightbulb className="w-12 h-12 text-success mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                        To be the leading global platform for practical, cutting-edge skills, creating a community of lifelong learners who are prepared to shape the future of technology and finance.
                    </p>
                </div>
            </div>

             <div className="text-center max-w-5xl mx-auto">
                <h2 className="text-2xl font-headline font-semibold mb-8 text-primary">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {instructors.map((instructor) => (
                        <Card key={instructor.id} className="bg-card/80 p-6">
                            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-headline font-bold">{instructor.name}</h3>
                            <p className="text-muted-foreground mt-2 text-sm">{instructor.bio}</p>
                            <div className="flex justify-center gap-4 mt-4">
                               {instructor.socials.twitter && (
                                 <Link href={instructor.socials.twitter} target="_blank" aria-label={`${instructor.name}'s Twitter`}>
                                     <Button variant="ghost" size="icon"><Twitter className="h-5 w-5"/></Button>
                                 </Link>
                               )}
                               {instructor.socials.linkedin && (
                                   <Link href={instructor.socials.linkedin} target="_blank" aria-label={`${instructor.name}'s LinkedIn`}>
                                     <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5"/></Button>
                                   </Link>
                               )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
