
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Castle,
  Landmark,
  Navigation,
  Wind,
  X,
  Map,
  Heart,
  Clock,
  MapIcon,
  List,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';

const MapView = dynamic(() => import('@/app/map-view'), { ssr: false });


const filterButtons = [
  { label: 'All', category: 'All', icon: Navigation },
  { label: 'Culture', category: 'Culture', icon: Castle },
  { label: 'Nature', category: 'Nature', icon: Landmark },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
];

export type Place = {
  id: string;
  title: string;
  info: string;
  category: string;
  images: ImagePlaceholder[];
  coords: [number, number];
};

export const topPlaces: Place[] = [
  {
    id: 'ksar-timimoun',
    title: 'Ksar of Timimoun',
    info: 'The ancient fortified village, or ksar, is the historical heart of Timimoun. Built from red mud-brick, its labyrinthine alleys, covered passages, and beautiful architecture offer a stunning example of traditional Saharan urban planning. It provides a glimpse into the region\'s history as a stop on trans-Saharan trade routes.',
    category: 'Culture',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-2')!,
    ],
    coords: [29.261, 0.232]
  },
  {
    id: 'grand-erg',
    title: 'Grand Erg Occidental',
    info: 'The "Great Western Sand Sea" is a vast expanse of sand dunes stretching for hundreds of kilometers. The dunes near Timimoun are famous for their vibrant ochre color, which gives the oasis its nickname. A 4x4 or camel excursion into the erg is an unforgettable experience, especially at sunrise or sunset.',
    category: 'Nature',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-2')!,
    ],
    coords: [29.18, 0.30]
  },
  {
    id: 'sebka',
    title: 'The Sebkha',
    info: 'This vast, dry salt lake creates a surreal, lunar-like landscape. The shimmering crust of salt and minerals extends to the horizon, creating mirages under the desert sun. It\'s a place of stark beauty and geological wonder, offering unique photographic opportunities.',
    category: 'Nature',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-sebka-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-sebka-2')!,
    ],
    coords: [29.28, 0.18]
  },
  {
    id: 'palm-grove',
    title: 'The Palm Grove (Palmerai)',
    info: 'The lush palm grove is the lifeblood of the oasis, an intricate network of gardens and date palms sustained by the ancient foggara irrigation system. A walk or bike ride through its shady paths is a peaceful escape from the desert heat and a look into the agricultural soul of the community.',
    category: 'Culture',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-2')!,
    ],
    coords: [29.27, 0.24]
  },
];

const initialPopularRoutes = [
  {
    id: 'route-1',
    title: '4x4 Desert Adventure',
    duration: 'Full Day',
    category: 'Adventure',
    categoryIcon: Wind,
    image: PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4')!,
    favorited: false,
  },
  {
    id: 'route-2',
    title: 'Old Ksar Heritage Walk',
    duration: '2-3 Hours',
    category: 'Culture',
    categoryIcon: Castle,
    image: PlaceHolderImages.find((img) => img.id === 'ksar-guided-tour')!,
    favorited: true,
  },
  {
    id: 'route-3',
    title: 'Oasis & Foggara Tour',
    duration: 'Half Day',
    category: 'Nature',
    categoryIcon: Landmark,
    image: PlaceHolderImages.find((img) => img.id === 'foggara-tour')!,
    favorited: false,
  },
  {
    id: 'route-4',
    title: 'Sunset Camel Trek',
    duration: '2 Hours',
    category: 'Adventure',
    categoryIcon: Wind,
    image: PlaceHolderImages.find((img) => img.id === 'camel-trek-sunset')!,
    favorited: true,
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [popularRoutes, setPopularRoutes] = useState(initialPopularRoutes);
  const [view, setView] = useState<'list' | 'map'>('list');

  const toggleFavorite = (routeId: string) => {
    setPopularRoutes(
      popularRoutes.map(route =>
        route.id === routeId ? { ...route, favorited: !route.favorited } : route
      )
    );
  };

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') {
      return topPlaces;
    }
    return topPlaces.filter(place => place.category === activeFilter);
  }, [activeFilter]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <main className="flex-grow">
          <header className="p-4 sm:p-6 lg:px-8">
            <p className="text-muted-foreground">Salam 👋</p>
            <h1 className="text-3xl font-bold font-headline text-foreground">
              Welcome to the <span className="text-primary">Red Oasis</span>
            </h1>
          </header>

          {view === 'list' ? (
             <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* Popular Routes Section */}
              <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold font-headline">Popular Routes</h2>
                  </div>
                  <Carousel opts={{ align: "start" }} className="w-full">
                      <CarouselContent className="-ml-4">
                          {popularRoutes.map((route) => (
                          <CarouselItem key={route.id} className="basis-4/5 sm:basis-1/2 md:basis-1/3 pl-4">
                              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg">
                                  {route.image && (
                                      <Image
                                          src={route.image.imageUrl}
                                          alt={route.title}
                                          fill
                                          style={{objectFit: 'cover'}}
                                          className="group-hover:scale-105 transition-transform duration-300"
                                          data-ai-hint={route.image.imageHint}
                                      />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                  
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-4 right-4 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(route.id);
                                    }}
                                  >
                                    <Heart className={cn("w-5 h-5", route.favorited && "fill-white")}/>
                                  </Button>
                                  
                                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full mb-3">
                                        <Clock className="w-4 h-4"/>
                                        <span className="text-xs font-semibold">{route.duration}</span>
                                      </div>
                                      <h3 className="text-2xl font-bold font-headline">{route.title}</h3>
                                      <div className="flex items-center gap-4 text-sm mt-2 opacity-90">
                                        
                                        <div className="flex items-center gap-1.5">
                                          <route.categoryIcon className="w-4 h-4"/>
                                          <span>{route.category}</span>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                          </CarouselItem>
                          ))}
                      </CarouselContent>
                  </Carousel>
              </div>
              
              {/* Top Places Section */}
              <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold font-headline">Top Places</h2>
                      <Button variant="outline" onClick={() => setView('map')}>
                          <MapIcon className="mr-2 h-4 w-4" />
                          Map View
                      </Button>
                  </div>
                  {/* Filter Buttons */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                      {filterButtons.map((filter) => {
                          const isActive = activeFilter === filter.category;
                          return (
                              <Button
                              key={filter.label}
                              variant={isActive ? 'default' : 'secondary'}
                              onClick={() => setActiveFilter(filter.category)}
                              className={`rounded-full flex-shrink-0 ${
                                  isActive ? 'bg-primary' : 'bg-card'
                              }`}
                              >
                              <filter.icon className="mr-2 h-4 w-4" />
                              {filter.label}
                              </Button>
                          );
                      })}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredPlaces.map(place => (
                      <div
                          key={place.id}
                          className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer shadow-lg"
                          onClick={() => setSelectedPlace(place)}
                      >
                          <Image
                          src={place.images[0].imageUrl}
                          alt={place.title}
                          fill
                          style={{objectFit: 'cover'}}
                          className="group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={place.images[0].imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-bold">{place.title}</h3>
                          <p className="text-sm opacity-90">{place.category}</p>
                          </div>
                      </div>
                      ))}
                  </div>
              </div>
            </div>
          ) : (
             <MapView 
                places={topPlaces} 
                onToggleView={() => setView('list')} 
                initialFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
          )}

      </main>

       <Dialog open={!!selectedPlace} onOpenChange={(isOpen) => !isOpen && setSelectedPlace(null)}>
        <DialogContent className="p-0 border-0 max-w-full w-full h-full max-h-full sm:max-h-full sm:w-full bg-background text-foreground flex flex-col">
            {selectedPlace && (
                <>
                <Carousel className="relative w-full h-1/2 sm:h-3/5" opts={{ loop: true }}>
                    <CarouselContent>
                    {selectedPlace.images.map((image, index) => (
                        <CarouselItem key={index}>
                        <div className="relative w-full h-full">
                            <Image
                            src={image.imageUrl}
                            alt={`${selectedPlace.title} - image ${index + 1}`}
                            fill
                            style={{objectFit: 'cover'}}
                            data-ai-hint={image.imageHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white" />
                </Carousel>
                
                <div className="p-6 flex-grow overflow-y-auto">
                    <h2 className="text-3xl font-bold font-headline mb-2">{selectedPlace.title}</h2>
                    <p className="text-muted-foreground prose prose-lg">{selectedPlace.info}</p>
                </div>
                 <Button asChild className="m-6 sm:m-8">
                   <Link href="/map">
                     <Map className="mr-2 h-5 w-5" />
                     View on Map
                    </Link>
                 </Button>

                <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

    