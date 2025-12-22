
'use client';

import { useState, useMemo } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Castle,
  Heart,
  Landmark,
  Mic,
  Mountain,
  Navigation,
  Search,
  Wind,
  X,
  Map,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const MapView = dynamic(() => import('@/app/map'), {
  ssr: false,
});

const filterButtons = [
  { label: 'All', category: 'All', icon: Navigation },
  { label: 'Culture', category: 'Culture', icon: Castle },
  { label: 'Nature', category: 'Nature', icon: Landmark },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
];

const allPopularRoutes = [
  {
    title: 'Grand Ksar Circuit',
    duration: '3h 20m',
    distance: '12km',
    category: 'Cultural',
    image: PlaceHolderImages.find((img) => img.id === 'ksar-ruins'),
    icon: Heart,
    iconColor: 'text-white',
    iconBg: 'bg-black/30',
  },
  {
    title: 'Sunset Oasis Trail',
    duration: '2h 00m',
    distance: '5km',
    category: 'Nature',
    image: PlaceHolderImages.find((img) => img.id === 'oasis-palm-grove'),
    icon: Navigation,
    iconColor: 'text-black',
    iconBg: 'bg-primary',
  },
  {
    title: 'Dune Adventure',
    duration: '4h 00m',
    distance: '20km',
    category: 'Adventure',
    image: PlaceHolderImages.find((img) => img.id === 'desert-landscape'),
    icon: Mountain,
    iconColor: 'text-white',
    iconBg: 'bg-black/30',
  },
  {
    title: 'Sebkha Salt Flats',
    duration: '5h 00m',
    distance: '30km',
    category: 'Nature',
    image: PlaceHolderImages.find((img) => img.id === 'stargazing-desert'), // Using a placeholder, should be a salt flat image
    icon: Mountain,
    iconColor: 'text-white',
    iconBg: 'bg-black/30',
  },
];

type Place = {
  id: string;
  title: string;
  info: string;
  category: string;
  images: ImagePlaceholder[];
};

const topPlaces: Place[] = [
  {
    id: 'ksar-timimoun',
    title: 'Ksar of Timimoun',
    info: 'The ancient fortified village, or ksar, is the historical heart of Timimoun. Built from red mud-brick, its labyrinthine alleys, covered passages, and beautiful architecture offer a stunning example of traditional Saharan urban planning. It provides a glimpse into the region\'s history as a stop on trans-Saharan trade routes.',
    category: 'Culture',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-2')!,
    ],
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
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const avatarImage = PlaceHolderImages.find(
    (img) => img.id === 'tour-guide-avatar'
  );
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') {
      return topPlaces;
    }
    return topPlaces.filter(place => place.category === activeFilter);
  }, [activeFilter]);


  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Map Section */}
      <div className="relative h-96">
        <MapView />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
        <div className="absolute top-8 left-4 right-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search routes, ksars, or oases..."
              className="w-full rounded-full bg-card/90 py-6 pl-10 pr-24 shadow-lg backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary/20 text-primary hover:bg-primary/30 h-9 w-9"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Avatar className="h-9 w-9 border-2 border-primary/50">
                {avatarImage && (
                  <AvatarImage
                    src={avatarImage.imageUrl}
                    alt="User Avatar"
                  />
                )}
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-background p-3 rounded-full shadow-lg">
            <div className="bg-black text-primary rounded-full p-3">
              <Landmark className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-2 bg-card text-card-foreground rounded-full px-3 py-1 text-sm font-medium shadow">
            Red Oasis
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-24 rounded-t-3xl bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-16 h-1.5 bg-border rounded-full mb-4" />

        <div className="mb-6">
          <p className="text-muted-foreground">Salam 👋</p>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Discover the Red Oasis
          </h1>
        </div>
        
        {/* Popular Routes */}
        <div className="mb-8">
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {allPopularRoutes.map((route, index) => (
              <div
                key={index}
                className="w-64 flex-shrink-0 snap-start"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg relative aspect-[3/4] group">
                  {route.image && (
                    <Image
                      src={route.image.imageUrl}
                      alt={route.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={route.image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      className={`rounded-full h-10 w-10 ${route.iconBg}`}
                    >
                      <route.icon className={`h-5 w-5 ${route.iconColor}`} />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm mb-2">
                      &#128337; {route.duration}
                    </div>
                    <h3 className="text-lg font-bold">{route.title}</h3>
                    <div className="text-xs flex items-center gap-2 opacity-80">
                      <span>{route.distance}</span>
                      <span>&bull;</span>
                      <span>{route.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Places Section */}
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-headline">Top Places</h2>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                See All
                </Link>
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
                    objectFit="cover"
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
                            objectFit="cover"
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

    