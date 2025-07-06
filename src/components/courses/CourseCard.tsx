import type { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader className="p-0">
        <Image
          src={course.imageUrl}
          alt={course.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={`${course.category} ${course.level}`}
        />
        <div className="p-6">
            <div className="flex justify-between items-start gap-2 mb-2">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
            </div>
            <CardTitle className="text-xl font-headline leading-tight">{course.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{course.description}</p>
        {course.progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-muted-foreground">Progress</span>
                <span className="text-sm font-bold text-primary">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`} className="w-full">
            <Button className="w-full">{course.progress > 0 ? 'Continue Learning' : 'Start Course'}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
