'use client';

import type { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { COURSE_CATEGORY_COLORS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Clock, DollarSign, User } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const categoryColor = COURSE_CATEGORY_COLORS[course.category];
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
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
                className="w-full h-32 object-cover"
                data-ai-hint={`${course.category} ${course.level}`}
                />
                <div className="p-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <Badge variant="secondary" style={{ backgroundColor: categoryColor, color: 'hsl(var(--primary-foreground))' }}>{course.category}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-base font-headline leading-tight h-10">{course.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-3 pt-0">
                 <div className="text-xs text-muted-foreground space-y-1.5 mb-3">
                    <div className="flex items-center gap-2">
                        <User className="w-3 h-3 shrink-0"/>
                        <span className="truncate">with {course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 shrink-0"/>
                        <span>{course.duration}</span>
                    </div>
                </div>
                <p className="text-muted-foreground text-xs mb-3">{course.description}</p>
                {course.progress > 0 && (
                <div className="mt-auto pt-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Progress</span>
                        <span className="text-xs font-bold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                </div>
                )}
            </CardContent>
            <CardFooter className="p-3 pt-0 mt-auto">
                 <div className="flex justify-between items-center w-full">
                    <p className="text-lg font-bold text-primary">${course.price}</p>
                    <Link href={`/courses/${course.id}`}>
                        <Button size="sm">{course.progress > 0 ? 'Continue' : 'Details'}</Button>
                    </Link>
                </div>
            </CardFooter>
            </Card>
        </motion.div>
    );
}
