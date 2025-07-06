import type { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { COURSE_CATEGORY_COLORS } from "@/lib/constants";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const categoryColor = COURSE_CATEGORY_COLORS[course.category];

    return (
        <Card 
            className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50"
            style={{ '--category-color': categoryColor, borderBottom: `4px solid var(--category-color)` }}
        >
        <CardHeader className="p-0">
            <Image
            src={course.imageUrl}
            alt={course.title}
            width={400}
            height={225}
            className="w-full h-40 object-cover"
            data-ai-hint={`${course.category} ${course.level}`}
            />
            <div className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="secondary" style={{ backgroundColor: categoryColor, color: 'hsl(var(--primary-foreground))' }}>{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-lg font-headline leading-tight">{course.title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0">
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
        <CardFooter className="p-4 pt-0">
            <Link href={`/courses/${course.id}`} className="w-full">
                <Button className="w-full">{course.progress > 0 ? 'Continue Learning' : 'Start Course'}</Button>
            </Link>
        </CardFooter>
        </Card>
    );
}
