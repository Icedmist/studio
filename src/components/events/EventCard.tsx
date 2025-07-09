'use client';

import type { PlainEvent } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from 'lucide-react';
import { format } from "date-fns";
import { Badge } from "../ui/badge";

interface EventCardProps {
  event: PlainEvent;
}

export function EventCard({ event }: EventCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const eventDate = format(new Date(event.date), 'PPP');
    
    const getStatusVariant = (status: PlainEvent['status']) => {
        switch (status) {
            case 'upcoming': return 'success';
            case 'past': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'secondary';
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0 relative">
                    <div className="relative w-full h-48">
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            data-ai-hint="event announcement"
                        />
                    </div>
                    <Badge variant={getStatusVariant(event.status)} className="absolute top-2 right-2 capitalize">{event.status}</Badge>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <CardTitle className="text-xl font-headline leading-tight mb-2 h-14">
                        {event.title}
                    </CardTitle>
                     <div className="text-sm text-muted-foreground space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 shrink-0 text-primary"/>
                            <span>{eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0 text-primary"/>
                            <span>{event.location}</span>
                        </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                        {event.description.substring(0, 120)}...
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Link href={event.link} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full" disabled={event.status !== 'upcoming'}>
                            {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
