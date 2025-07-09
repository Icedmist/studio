import { getEvents } from '@/services/event-data';
import { EventCard } from '@/components/events/EventCard';
import { CalendarDays } from 'lucide-react';
import type { Event, PlainEvent } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

async function EventsList({ status }: { status: 'upcoming' | 'past' }) {
    const events: Event[] = await getEvents(status);
    
    // Convert Firestore Timestamp objects to plain strings for the client component
    const plainEvents: PlainEvent[] = events.map(event => ({
        ...event,
        date: event.date.toDate().toISOString(),
    }));

    if (plainEvents.length === 0) {
        return (
             <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2">No {status} events</h2>
                <p className="text-muted-foreground">
                    Please check back later for new events!
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plainEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    )
}

export default async function EventsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Events & Webinars
        </h1>
      </div>
      <p className="text-muted-foreground mb-12">
        Join our live events to learn from experts and connect with the community.
      </p>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            <EventsList status="upcoming" />
        </TabsContent>
        <TabsContent value="past">
            <EventsList status="past" />
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
