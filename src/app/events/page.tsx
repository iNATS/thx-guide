
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Clock, Heart, Landmark, MapPin, Music, Search, Utensils, X } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';


const filterButtons = [
  { label: 'All', active: true },
  { label: 'Music', icon: Music, active: false },
  { label: 'Heritage', icon: Landmark, active: false },
  { label: 'Food', icon: Utensils, active: false },
];

const featuredEvents = [
    {
        title: 'Sboue Festival',
        subtitle: 'The Soul of the Oasis • Gourara Region',
        badge: 'HAPPENING NOW',
        image: PlaceHolderImages.find((img) => img.id === 'sboue-festival-vibrant'),
        time: 'All Week',
        location: 'Gourara Region',
        description: 'Experience the vibrant Sboue festival, a week-long celebration of culture, music, and tradition that represents the soul of the oasis.'
    },
    {
        title: 'Dune Adventure',
        subtitle: 'An exhilarating 4x4 desert safari',
        badge: 'FEATURED',
        image: PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4'),
        time: 'Daily Departures',
        location: 'Erg Chech Dunes',
        description: 'Embark on an exhilarating 4x4 desert safari across the stunning Erg Chech dunes. A must-do for thrill-seekers!'
    }
]

const thisWeekEvents = [
    {
        title: 'Sunset Camel Trek & Tea',
        time: 'Today, 17:00',
        location: 'Dunes of Timimoun',
        image: PlaceHolderImages.find((img) => img.id === 'camel-trek-sunset'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Enjoy a peaceful camel trek through the iconic red dunes of Timimoun, culminating in a traditional tea ceremony as the sun sets over the Sahara.'
    },
    {
        title: 'Local Pottery Workshop',
        time: 'Sat, 10:00',
        location: 'Old Ksar District',
        image: PlaceHolderImages.find((img) => img.id === 'pottery-making-hands'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Learn the ancient art of pottery from a local artisan in the historic Old Ksar district. Create your own unique souvenir to take home.'
    },
    {
        title: 'Weekly Souk Tour',
        time: 'Tue, 08:00',
        location: 'Timimoun Center',
        image: PlaceHolderImages.find((img) => img.id === 'souk-spices-market'),
        action: 'Know more',
        actionVariant: 'secondary' as const,
        description: 'Discover the sights, sounds, and smells of the weekly market. A guided tour to help you find the best local products and crafts.'
    }
]

type Event = typeof thisWeekEvents[0];


export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsSheetOpen(true);
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className={cn("sticky top-0 bg-background/80 backdrop-blur-sm z-40 transition-all duration-300", isScrolled ? 'border-b shadow-sm' : 'border-b-transparent')}>
        <div className="flex items-center justify-between p-4 sm:p-6">
            <h1 className={cn("font-bold font-headline transition-all duration-300", isScrolled ? 'text-xl' : 'text-2xl')}>Upcoming Events</h1>
            <div className="flex items-center gap-2">
            <div className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                </Button>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </div>
            </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {/* Featured Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-headline">Featured</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {featuredEvents.map((event) => (
              <div key={event.title} className="w-[85%] sm:w-80 flex-shrink-0 snap-start">
                <div className="rounded-2xl overflow-hidden shadow-lg relative aspect-video group" onClick={() => handleEventClick(event as Event)}>
                  {event.image && (
                    <Image
                      src={event.image.imageUrl}
                      alt={event.title}
                      fill
                      objectFit="cover"
                      data-ai-hint={event.image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                     <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {event.badge}
                     </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm opacity-90">{event.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
          {filterButtons.map((filter) => (
            <Button
              key={filter.label}
              variant={filter.active ? 'default' : 'secondary'}
              className={`rounded-full flex-shrink-0 ${
                filter.active ? 'bg-primary' : 'bg-card text-card-foreground shadow-sm'
              }`}
            >
              {filter.icon && <filter.icon className="mr-2 h-4 w-4" />}
              {filter.label}
            </Button>
          ))}
        </div>

        {/* This Week Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
             <h2 className="text-xl font-bold font-headline">This Week</h2>
             <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-md font-medium">{thisWeekEvents.length} Events</span>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="space-y-4">
                {thisWeekEvents.map((event) => (
                    <div key={event.title} className="bg-card p-3 rounded-2xl shadow-sm flex items-center gap-4">
                    {event.image && (
                        <Image
                            src={event.image.imageUrl}
                            alt={event.title}
                            width={100}
                            height={100}
                            className="rounded-xl aspect-square object-cover"
                            data-ai-hint={event.image.imageHint}
                        />
                    )}
                    <div className="flex-grow">
                            <div className="flex justify-between items-start">
                            <h3 className="font-bold text-base mb-2">{event.title}</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1">
                                    <Heart className="w-4 h-4 text-muted-foreground"/>
                            </Button>
                            </div>
                            
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary/80"/>
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary/80"/>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                             <SheetTrigger asChild>
                                <Button variant={event.actionVariant} size="sm" className="mt-3 w-full sm:w-auto rounded-lg" onClick={() => handleEventClick(event)}>
                                {event.action}
                                </Button>
                            </SheetTrigger>
                    </div>
                    </div>
                ))}
            </div>
             {selectedEvent && (
                <SheetContent side={isMobile ? 'bottom' : 'right'} className={cn("p-0 rounded-t-2xl sm:max-w-lg", isMobile ? 'h-[90vh]' : '')}>
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle className="font-headline sr-only">{selectedEvent.title}</SheetTitle>
                        <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8 rounded-full" onClick={() => setIsSheetOpen(false)}>
                            <X className="h-4 w-4"/>
                            <span className="sr-only">Close</span>
                        </Button>
                    </SheetHeader>
                    <div className="h-full overflow-y-auto pb-24">
                        {selectedEvent.image && (
                            <div className="relative h-64 w-full">
                                <Image
                                    src={selectedEvent.image.imageUrl}
                                    alt={selectedEvent.title}
                                    fill
                                    objectFit="cover"
                                    data-ai-hint={selectedEvent.image.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold font-headline mb-2">{selectedEvent.title}</h2>
                            <div className="space-y-2 text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary"/>
                                    <span>{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary"/>
                                    <span>{selectedEvent.location}</span>
                                </div>
                            </div>
                            <p className="text-foreground/90 mb-6">{selectedEvent.description}</p>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button size="lg" className="w-full">
                                    {selectedEvent.actionVariant === 'secondary' ? 'Join Waiting List' : 'Book Now'}
                                </Button>
                                <Button size="lg" variant="outline" className="w-full">
                                    <Heart className="mr-2 h-4 w-4"/>
                                    Add to Favorites
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            )}
          </Sheet>
        </section>
      </main>
    </div>
  );
}
