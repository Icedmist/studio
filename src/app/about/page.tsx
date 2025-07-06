import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline font-bold">About TechTradeHub Academy</CardTitle>
          <CardDescription className="max-w-2xl mx-auto">
            Our mission is to empower the next generation of innovators, traders, and technologists with accessible, high-quality education.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-12 mt-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Our Story</h2>
                <p className="text-muted-foreground">
                    This is a placeholder for your story. You can tell me about the founding of TechTradeHub and the vision behind creating the academy. What was the problem you wanted to solve? What is the journey that led you here? I am ready to update this section with your content.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                        A placeholder for your mission statement. What is the core purpose of your academy? (e.g., "To democratize access to elite tech and financial education...")
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Lightbulb className="w-12 h-12 text-success mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                        A placeholder for your vision statement. Where do you see the academy in the future? (e.g., "To be the leading global platform for practical, cutting-edge skills...")
                    </p>
                </div>
                 <div className="flex flex-col items-center">
                    <Users className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Team</h3>
                    <p className="text-muted-foreground">
                        A placeholder for information about your team. You can introduce key instructors or founders to build trust and add a personal touch.
                    </p>
                </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
