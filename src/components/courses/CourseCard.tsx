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
import { Clock, User } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const categoryColor = COURSE_CATEGORY_COLORS[course.category];
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const getLink = () => {
        if (course.progress > 0 && course.progress < 100) {
            // Find first incomplete lesson to continue
            for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
                for (let lIdx = 0; lIdx < course.modules[mIdx].lessons.length; lIdx++) {
                    if (!(course.modules[mIdx].lessons[lIdx] as any).completed) {
                        return `/learn/${course.id}?module=${mIdx}&lesson=${lIdx}`;
                    }
                }
            }
        }
        // Default to the main course page
        return `/courses/${course.id}`;
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
            <Card 
                className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/20 bg-card/60 backdrop-blur-sm border-border/50"
                style={{ '--category-color': categoryColor, borderBottom: `3px solid var(--category-color)` }}
            >
            <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="secondary" style={{ backgroundColor: categoryColor, color: 'hsl(var(--primary-foreground))' }} className="text-xs py-1 px-2">{course.category}</Badge>
                    <Badge variant="outline" className="text-xs py-1 px-2">{course.level}</Badge>
                </div>
                <CardTitle className="text-md font-headline leading-tight h-12">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
                 <div className="text-xs text-muted-foreground space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 shrink-0"/>
                        <span className="truncate">with {course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0"/>
                        <span>{course.duration}</span>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{course.description}</p>
                {course.progress > 0 && (
                <div className="mt-auto pt-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Progress</span>
                        <span className="text-sm font-bold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                 <div className="flex justify-between items-center w-full">
                    <div>
                        {course.price > 0 ? (
                            <p className="text-lg font-bold text-primary">₦{course.price.toLocaleString()}</p>
                        ) : (
                            <p className="text-lg font-bold text-success">Free</p>
                        )}
                        <p className="text-[10px] text-muted-foreground/80">Course ID: {course.id.slice(0, 6)}</p>
                    </div>
                    <Link href={getLink()}>
                        <Button size="sm">
                            {course.progress > 0 && course.progress < 100 ? 'Continue' : 'View Details'}
                        </Button>
                    </Link>
                </div>
            </CardFooter>
            </Card>
        </motion.div>
    );
}
