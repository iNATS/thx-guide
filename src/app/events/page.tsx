
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Clock, Heart, Landmark, MapPin, Music, Search, Utensils } from 'lucide-react';
import Link from 'next/link';

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
    },
    {
        title: 'Dune Adventure',
        subtitle: 'An exhilarating 4x4 desert safari',
        badge: 'FEATURED',
        image: PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4'),
    }
]

const thisWeekEvents = [
    {
        title: 'Sunset Camel Trek & Tea',
        time: 'Today, 17:00',
        location: 'Dunes of Timimoun',
        image: PlaceHolderImages.find((img) => img.id === 'camel-trek-sunset'),
        action: 'Book Spot',
        actionVariant: 'default' as const,
    },
    {
        title: 'Local Pottery Workshop',
        time: 'Sat, 10:00',
        location: 'Old Ksar District',
        image: PlaceHolderImages.find((img) => img.id === 'pottery-making-hands'),
        action: 'Reserve • $15',
        actionVariant: 'default' as const,
    },
    {
        title: 'Weekly Souk Tour',
        time: 'Tue, 08:00',
        location: 'Timimoun Center',
        image: PlaceHolderImages.find((img) => img.id === 'souk-spices-market'),
        action: 'Join Waiting List',
        actionVariant: 'secondary' as const,
    }
]


export default function EventsPage() {

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 sticky top-0 bg-background/80 backdrop-blur-sm z-40 border-b">
        <h1 className="text-2xl font-bold font-headline">Upcoming Events</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
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
            {featuredEvents.map((event, index) => (
              <div key={index} className="w-[85%] sm:w-80 flex-shrink-0 snap-start">
                <div className="rounded-2xl overflow-hidden shadow-lg relative aspect-video group">
                  {event.image && (
                    <Image
                      src={event.image.imageUrl}
                      alt={event.title}
                      layout="fill"
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

          <div className="space-y-4">
            {thisWeekEvents.map((event, index) => (
                <div key={index} className="bg-card p-3 rounded-2xl shadow-sm flex items-center gap-4">
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
                        <Button variant={event.actionVariant} size="sm" className="mt-3 w-full sm:w-auto rounded-lg">
                           {event.action}
                        </Button>
                   </div>
                </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}
