
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
import { Input } from '@/components/ui/input';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Castle,
  Landmark,
  Mic,
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
import { Card } from '@/components/ui/card';

const MapView = dynamic(() => import('@/app/map'), {
  ssr: false,
});

const filterButtons = [
  { label: 'All', category: 'All', icon: Navigation },
  { label: 'Culture', category: 'Culture', icon: Castle },
  { label: 'Nature', category: 'Nature', icon: Landmark },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
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

const popularRoutes = [
    {
      id: 'route-1',
      title: '4x4 Desert Adventure',
      duration: 'Full Day',
      category: 'Adventure',
      image: PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4')!,
    },
    {
      id: 'route-2',
      title: 'Old Ksar Heritage Walk',
      duration: '2-3 Hours',
      category: 'Culture',
      image: PlaceHolderImages.find((img) => img.id === 'ksar-guided-tour')!,
    },
    {
      id: 'route-3',
      title: 'Oasis & Foggara Tour',
      duration: 'Half Day',
      category: 'Nature',
      image: PlaceHolderImages.find((img) => img.id === 'foggara-tour')!,
    },
    {
      id: 'route-4',
      title: 'Sunset Camel Trek',
      duration: '2 Hours',
      category: 'Adventure',
      image: PlaceHolderImages.find((img) => img.id === 'camel-trek-sunset')!,
    },
  ];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<Place[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') {
      return topPlaces;
    }
    return topPlaces.filter(place => place.category === activeFilter);
  }, [activeFilter]);
  
  useEffect(() => {
    if (isMapFullscreen && searchQuery.length > 1) {
      const suggestions = topPlaces.filter(place =>
        place.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAutocompleteSuggestions(suggestions);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [searchQuery, isMapFullscreen]);

  const handleSearchFocus = () => {
    setIsMapFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsMapFullscreen(false);
    setSearchQuery('');
    setAutocompleteSuggestions([]);
    // Blur the input
    const input = document.getElementById('map-search-input');
    if (input) {
      input.blur();
    }
  };

  const handleSuggestionClick = (place: Place) => {
    setSearchQuery(place.title);
    setAutocompleteSuggestions([]);
  };


  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Map Section */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 h-96 transition-transform duration-500 ease-in-out',
          isMapFullscreen ? 'z-50 scale-100' : 'scale-75 -translate-y-1/4'
        )}
      >
        <div className="absolute inset-0">
          <MapView />
        </div>
        {!isMapFullscreen && (
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
        )}
        <div className={cn('absolute top-8 left-4 right-4 z-10 transition-all duration-300', isMapFullscreen && 'pt-4 bg-transparent z-[60]')}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="map-search-input"
              placeholder="Search routes, ksars, or oases..."
              className={cn(
                'w-full rounded-full bg-card/90 py-6 pl-10 pr-14 shadow-lg backdrop-blur-sm',
                isMapFullscreen && 'bg-card'
              )}
              onFocus={handleSearchFocus}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {isMapFullscreen ? (
                 <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-primary/20 text-primary hover:bg-primary/30 h-9 w-9"
                  onClick={handleCloseFullscreen}
                >
                  <X className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-primary/20 text-primary hover:bg-primary/30 h-9 w-9"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </div>
             {autocompleteSuggestions.length > 0 && (
              <Card className="absolute top-full mt-2 w-full shadow-lg rounded-xl">
                <ul>
                  {autocompleteSuggestions.map((place) => (
                    <li key={place.id}>
                      <button
                        onClick={() => handleSuggestionClick(place)}
                        className="w-full text-left px-4 py-3 hover:bg-muted first:rounded-t-xl last:rounded-b-xl"
                      >
                        {place.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={cn("relative z-10 pt-72 transition-opacity duration-500", isMapFullscreen && 'opacity-0 pointer-events-none')}>
        
        <div className="bg-background rounded-t-3xl">
          <header className={cn("sticky top-0 z-20 transition-all duration-300", isScrolled && "bg-background/80 backdrop-blur-sm shadow-sm rounded-t-3xl")}>
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-muted-foreground">Salam 👋</p>
              <h1 className="text-3xl font-bold font-headline text-foreground">
                Discover the Red Oasis
              </h1>
            </div>
          </header>

          {/* Popular Routes Section */}
          <div className="mb-8">
              <div className="flex justify-between items-center mb-4 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-xl font-bold font-headline">Popular Routes</h2>
              </div>
              <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-4 pl-4 sm:pl-6 lg:pl-8">
                      {popularRoutes.map((route) => (
                      <CarouselItem key={route.id} className="basis-2/3 sm:basis-1/2 md:basis-1/3">
                          <div className="relative rounded-2xl overflow-hidden aspect-[4/6] group cursor-pointer shadow-lg">
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
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                  <h3 className="text-lg font-bold">{route.title}</h3>
                                  <p className="text-sm opacity-90">{route.duration}</p>
                              </div>
                          </div>
                      </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </div>
          
          {/* Top Places Section */}
          <div className="mb-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold font-headline">Top Places</h2>
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

    