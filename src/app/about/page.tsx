
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, User, Linkedin, Twitter } from 'lucide-react';
import { getTeamMembers } from '@/services/team-data';
import type { TeamMember } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AboutUsPage() {
  const team: TeamMember[] = await getTeamMembers();

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

             <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-headline font-semibold mb-8 text-center text-primary">Meet the Team</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {team.map((member) => (
                        <Card key={member.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card/80">
                            <Avatar className="w-24 h-24 border-4 border-primary">
                                <AvatarImage src={member.avatarUrl} alt={member.name} />
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                            <div className="text-center md:text-left">
                                <h4 className="text-lg font-bold">{member.name}</h4>
                                <p className="text-sm text-primary font-medium">{member.role}</p>
                                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                                <div className='flex gap-2 justify-center md:justify-start mt-4'>
                                    {member.socials?.twitter && (
                                        <Link href={member.socials.twitter} target="_blank">
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <Twitter className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )}
                                    {member.socials?.linkedin && (
                                        <Link href={member.socials.linkedin} target="_blank">
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <Linkedin className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
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
