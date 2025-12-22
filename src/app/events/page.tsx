
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Clock, Heart, Landmark, MapPin, Music, Search, Utensils, X, Star, Wind, Tractor, BookOpen, Sprout, ShoppingBag, Drama, CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';


const filterButtonsConfig = [
  { label: 'All', category: 'All' },
  { label: 'Music', category: 'Music', icon: Music },
  { label: 'Heritage', category: 'Heritage', icon: Landmark },
  { label: 'Food', category: 'Food', icon: Utensils },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
];

const featuredEvents = [
    {
        title: 'Sboue Festival',
        subtitle: 'The Soul of the Oasis • Gourara Region',
        badge: 'HAPPENING NOW',
        image: PlaceHolderImages.find((img) => img.id === 'sboue-festival-vibrant'),
        time: 'All Week',
        location: 'Gourara Region',
        description: 'Experience the vibrant Sboue festival, a week-long celebration of culture, music, and tradition that represents the soul of the oasis.',
        category: 'Music'
    },
    {
        title: 'Dune Adventure',
        subtitle: 'An exhilarating 4x4 desert safari',
        badge: 'FEATURED',
        image: PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4'),
        time: 'Daily Departures',
        location: 'Erg Chech Dunes',
        description: 'Embark on an exhilarating 4x4 desert safari across the stunning Erg Chech dunes. A must-do for thrill-seekers!',
        category: 'Adventure'
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
        description: 'Enjoy a peaceful camel trek through the iconic red dunes of Timimoun, culminating in a traditional tea ceremony as the sun sets over the Sahara.',
        category: 'Adventure'
    },
    {
        title: 'Local Pottery Workshop',
        time: 'Sat, 10:00',
        location: 'Old Ksar District',
        image: PlaceHolderImages.find((img) => img.id === 'pottery-making-hands'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Learn the ancient art of pottery from a local artisan in the historic Old Ksar district. Create your own unique souvenir to take home.',
        category: 'Heritage'
    },
    {
        title: 'Weekly Souk Tour',
        time: 'Tue, 08:00',
        location: 'Timimoun Center',
        image: PlaceHolderImages.find((img) => img.id === 'souk-spices-market'),
        action: 'Know more',
        actionVariant: 'secondary' as const,
        description: 'Discover the sights, sounds, and smells of the weekly market. A guided tour to help you find the best local products and crafts.',
        category: 'Heritage'
    },
    {
        title: 'Traditional Music Night',
        time: 'Fri, 20:00',
        location: 'Dar Gnaoua',
        image: PlaceHolderImages.find((img) => img.id === 'traditional-music-night'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Immerse yourself in the enchanting sounds of Gnawa music in a traditional house. A mystical and unforgettable experience.',
        category: 'Music'
    },
    {
        title: 'Guided Tour of the Old Ksar',
        time: 'Daily, 09:00',
        location: 'Historic Center',
        image: PlaceHolderImages.find((img) => img.id === 'ksar-guided-tour'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Explore the ancient history of Timimoun with a guided walk through its labyrinthine alleys and red-mud buildings.',
        category: 'Heritage'
    },
    {
        title: 'Saharan Cooking Class',
        time: 'Wed, 11:00',
        location: 'Local Family Home',
        image: PlaceHolderImages.find((img) => img.id === 'saharan-cooking-class'),
        action: 'Know more',
        actionVariant: 'secondary' as const,
        description: 'Learn the secrets of Saharan cuisine, including how to prepare a perfect tagine and bake bread in the sand.',
        category: 'Food'
    },
    {
        title: 'Stargazing in the Desert',
        time: 'Mon & Thu, 21:00',
        location: 'Outside the Oasis',
        image: PlaceHolderImages.find((img) => img.id === 'stargazing-desert'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Witness the breathtaking beauty of the Milky Way in one of the darkest skies on Earth. A guided astronomical tour.',
        category: 'Adventure'
    },
    {
        title: 'Sandboarding on the Dunes',
        time: 'Daily, 16:00',
        location: 'Erg Mehedjibat',
        image: PlaceHolderImages.find((img) => img.id === 'sandboarding-dunes'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Surf the golden waves of the Sahara. A fun and thrilling activity for all ages on the majestic dunes near Timimoun.',
        category: 'Adventure'
    },
    {
        title: 'Date Harvest Festival',
        time: 'Sun, all day',
        location: 'Palm Grove',
        image: PlaceHolderImages.find((img) => img.id === 'date-harvest-festival'),
        action: 'Know more',
        actionVariant: 'secondary' as const,
        description: 'Join the locals in celebrating the annual date harvest with music, food, and festivities in the heart of the oasis.',
        category: 'Food'
    },
    {
        title: 'Picnic in the Oasis',
        time: 'Sat, 13:00',
        location: 'Secret Garden Oasis',
        image: PlaceHolderImages.find((img) => img.id === 'oasis-picnic'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Enjoy a delicious, traditional lunch in a secluded and lush part of the Timimoun palm grove. A moment of pure tranquility.',
        category: 'Food'
    },
    {
        title: 'Leather Artisan Visit',
        time: 'Daily, by appointment',
        location: 'Artisans Quarter',
        image: PlaceHolderImages.find((img) => img.id === 'leather-workshop'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Watch a master artisan at work, crafting traditional leather goods like sandals and bags. An intimate cultural exchange.',
        category: 'Heritage'
    },
    {
        title: 'Tuareg Tea Ceremony',
        time: 'Daily, 18:00',
        location: 'Café des Sables',
        image: PlaceHolderImages.find((img) => img.id === 'tuareg-tea-ceremony'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Participate in the ancient and symbolic Tuareg tea ceremony, a ritual of hospitality and friendship.',
        category: 'Heritage'
    },
    {
        title: 'Foggara Irrigation Tour',
        time: 'Wed, 09:00',
        location: 'Ancient Irrigation Channels',
        image: PlaceHolderImages.find((img) => img.id === 'foggara-tour'),
        action: 'Know more',
        actionVariant: 'secondary' as const,
        description: 'Discover the ingenious ancient underground irrigation system that has sustained life in the oasis for centuries.',
        category: 'Heritage'
    },
    {
        title: 'Annual Camel Race',
        time: 'Next Sat, 14:00',
        location: 'Desert Race Track',
        image: PlaceHolderImages.find((img) => img.id === 'camel-race'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Experience the thunder of hooves at the annual Timimoun camel race, a major cultural and sporting event.',
        category: 'Adventure'
    },
    {
        title: 'Fireside Storytelling',
        time: 'Tue, 20:30',
        location: 'Desert Camp',
        image: PlaceHolderImages.find((img) => img.id === 'saharan-storytelling'),
        action: 'Know more',
        actionVariant: 'default' as const,
        description: 'Listen to ancient Saharan tales and legends told by a local storyteller around a crackling bonfire under the stars.',
        category: 'Heritage'
    }
]

type Event = typeof thisWeekEvents[0];


export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [favoritedEvents, setFavoritedEvents] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('timimoun-guide-favorites');
    if (storedFavorites) {
      setFavoritedEvents(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

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

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') {
      return thisWeekEvents;
    }
    return thisWeekEvents.filter(event => event.category === activeFilter);
  }, [activeFilter]);
  
  const toggleFavorite = (eventTitle: string) => {
    const newFavs = new Set(favoritedEvents);
    if (newFavs.has(eventTitle)) {
      newFavs.delete(eventTitle);
    } else {
      newFavs.add(eventTitle);
    }
    setFavoritedEvents(newFavs);
    localStorage.setItem('timimoun-guide-favorites', JSON.stringify(Array.from(newFavs)));
  };

  const handleAddToCalendar = (event: Event) => {
    const formatIcsDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }
    
    // Note: This is a simplified date parsing. For a real app, use a robust library.
    const now = new Date();
    // A simple mock for event start time. In a real app this would come from the event data.
    const startTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); 
    const endTime = new Date(startTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour duration

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `UID:${event.title.replace(/\s/g, '')}-${Date.now()}@timimoun-guide.app`,
        `DTSTAMP:${formatIcsDate(now)}`,
        `DTSTART:${formatIcsDate(startTime)}`,
        `DTEND:${formatIcsDate(endTime)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


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
          {filterButtonsConfig.map((filter) => {
            const isActive = activeFilter === filter.category;
            return (
                <Button
                key={filter.label}
                variant={isActive ? 'default' : 'secondary'}
                onClick={() => setActiveFilter(filter.category)}
                className={`rounded-full flex-shrink-0 ${
                    isActive ? 'bg-primary' : 'bg-card text-card-foreground shadow-sm'
                }`}
                >
                {filter.icon && <filter.icon className="mr-2 h-4 w-4" />}
                {filter.label}
                </Button>
            );
            })}
        </div>

        {/* This Week Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
             <h2 className="text-xl font-bold font-headline">This Week</h2>
             <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-md font-medium">{filteredEvents.length} Events</span>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="space-y-4">
                {filteredEvents.map((event) => (
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
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1" onClick={() => toggleFavorite(event.title)}>
                                    <Heart className={cn("w-4 h-4 text-muted-foreground", favoritedEvents.has(event.title) && "fill-primary text-primary")}/>
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
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold font-headline ">{selectedEvent.title}</h2>
                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedEvent.title)}>
                                    <Heart className={cn("w-6 h-6 text-muted-foreground", favoritedEvents.has(selectedEvent.title) && "fill-primary text-primary")}/>
                                </Button>
                            </div>
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
                                <Button size="lg" className="w-full" onClick={() => handleAddToCalendar(selectedEvent)}>
                                    <CalendarPlus className="mr-2 h-4 w-4" />
                                    Add to Calendar
                                </Button>

                                <Button size="lg" variant="outline" className="w-full">
                                    {selectedEvent.actionVariant === 'secondary' ? 'Join Waiting List' : 'Book Now'}
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
