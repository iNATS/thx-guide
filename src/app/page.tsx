'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Castle,
  Landmark,
  Navigation,
  Wind,
  X,
  MapIcon,
  List,
  Heart,
  Clock,
  Star,
  MessageSquare,
  Footprints,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
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
  shortInfo: string;
  category: string;
  images: ImagePlaceholder[];
  coords: [number, number];
  rating: number;
};

export const topPlaces: Place[] = [
  {
    id: 'ksar-timimoun',
    title: 'Ksar of Timimoun',
    info: 'The ancient fortified village, or ksar, is the historical heart of Timimoun. Built from red mud-brick, its labyrinthine alleys, covered passages, and beautiful architecture offer a stunning example of traditional Saharan urban planning. It provides a glimpse into the region\'s history as a stop on trans-Saharan trade routes.',
    shortInfo: 'Ancient fortified village in the heart of Timimoun.',
    category: 'Culture',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-ksar-2')!,
      PlaceHolderImages.find((img) => img.id === 'ksar-ruins')!,
      PlaceHolderImages.find((img) => img.id === 'ksar-guided-tour')!,
    ],
    coords: [29.261, 0.232],
    rating: 4.9,
  },
  {
    id: 'grand-erg',
    title: 'Grand Erg Occidental',
    info: 'The "Great Western Sand Sea" is a vast expanse of sand dunes stretching for hundreds of kilometers. The dunes near Timimoun are famous for their vibrant ochre color, which gives the oasis its nickname. A 4x4 or camel excursion into the erg is an unforgettable experience, especially at sunrise or sunset.',
    shortInfo: 'Vast expanse of iconic ochre-colored sand dunes.',
    category: 'Nature',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-2')!,
      PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4')!,
      PlaceHolderImages.find((img) => img.id === 'sandboarding-dunes')!,
    ],
    coords: [29.18, 0.3],
    rating: 4.8,
  },
  {
    id: 'sebka',
    title: 'The Sebkha',
    info: 'This vast, dry salt lake creates a surreal, lunar-like landscape. The shimmering crust of salt and minerals extends to the horizon, creating mirages under the desert sun. It\'s a place of stark beauty and geological wonder, offering unique photographic opportunities.',
    shortInfo: 'A surreal, vast, dry salt lake with unique views.',
    category: 'Nature',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-sebka-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-sebka-2')!,
      PlaceHolderImages.find((img) => img.id === 'stargazing-desert')!,
    ],
    coords: [29.28, 0.18],
    rating: 4.7,
  },
  {
    id: 'palm-grove',
    title: 'The Palm Grove (Palmerai)',
    info: 'The lush palm grove is the lifeblood of the oasis, an intricate network of gardens and date palms sustained by the ancient foggara irrigation system. A walk or bike ride through its shady paths is a peaceful escape from the desert heat and a look into the agricultural soul of the community.',
    shortInfo: 'The lush, life-sustaining palm grove of the oasis.',
    category: 'Culture',
    images: [
      PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-1')!,
      PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-2')!,
      PlaceHolderImages.find((img) => img.id === 'oasis-palm-grove')!,
      PlaceHolderImages.find((img) => img.id === 'foggara-tour')!,
    ],
    coords: [29.27, 0.24],
    rating: 4.8,
  },
];

type PopularRoute = {
  id: string;
  title: string;
  duration: string;
  category: string;
  categoryIcon: React.ElementType;
  images: ImagePlaceholder[];
  favorited: boolean;
  description: string;
  rating: number;
};


const initialPopularRoutes: PopularRoute[] = [
  {
    id: 'route-1',
    title: '4x4 Desert Adventure',
    duration: 'Full Day',
    category: 'Adventure',
    categoryIcon: Wind,
    images: [
        PlaceHolderImages.find((img) => img.id === 'dune-adventure-4x4')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-1')!,
        PlaceHolderImages.find((img) => img.id === 'sandboarding-dunes')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-grand-erg-2')!,
    ],
    favorited: false,
    description: 'Embark on a thrilling full-day journey into the heart of the Grand Erg Occidental. Our expert drivers will navigate the stunning ochre dunes in a modern 4x4 vehicle, taking you to breathtaking viewpoints, hidden oases, and ancient rock formations. The trip includes a traditional lunch cooked over an open fire and concludes with a magical sunset over the endless sea of sand. This is the ultimate Saharan experience for adventure seekers.',
    rating: 4.9,
  },
  {
    id: 'route-2',
    title: 'Old Ksar Heritage Walk',
    duration: '2-3 Hours',
    category: 'Culture',
    categoryIcon: Castle,
    images: [
        PlaceHolderImages.find((img) => img.id === 'ksar-guided-tour')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-ksar-1')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-ksar-2')!,
        PlaceHolderImages.find((img) => img.id === 'ksar-ruins')!,
    ],
    favorited: true,
    description: 'Step back in time with a guided walking tour through the ancient Ksar of Timimoun. Explore the labyrinthine alleys of this red mud-brick citadel, learn about its history as a crucial stop on trans-Saharan trade routes, and discover the unique architecture designed to withstand the desert climate. Our knowledgeable local guide will share stories and secrets of this historic heart of the oasis.',
    rating: 4.8,
  },
  {
    id: 'route-3',
    title: 'Oasis & Foggara Tour',
    duration: 'Half Day',
    category: 'Nature',
    categoryIcon: Landmark,
    images: [
        PlaceHolderImages.find((img) => img.id === 'foggara-tour')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-1')!,
        PlaceHolderImages.find((img) => img.id === 'top-place-palm-grove-2')!,
        PlaceHolderImages.find((img) => img.id === 'oasis-palm-grove')!,
    ],
    favorited: false,
    description: "Discover the genius of ancient engineering on this half-day tour of Timimoun's lifeblood: the palm grove and its foggara irrigation system. Walk through the cool, shady paths of the palmeraie, see how local farmers cultivate their gardens, and venture into a part of the centuries-old underground water channels that have sustained the oasis for generations. It's a fascinating look at the harmony between humans and nature in the Sahara.",
    rating: 4.7,
  },
  {
    id: 'route-4',
    title: 'Sunset Camel Trek',
    duration: '2 Hours',
    category: 'Adventure',
    categoryIcon: Wind,
    images: [
        PlaceHolderImages.find((img) => img.id === 'camel-trek-sunset')!,
        PlaceHolderImages.find((img) => img.id === 'saharan-storytelling')!,
        PlaceHolderImages.find((img) => img.id === 'stargazing-desert')!,
        PlaceHolderImages.find((img) => img.id === 'sunset-safari-adventure')!,
    ],
    favorited: true,
    description: 'Experience the timeless magic of the desert with a peaceful camel trek. As the afternoon sun begins to soften, you will ride into the dunes surrounding Timimoun, led by an experienced guide. The trek culminates at a scenic spot where you can watch the sun dip below the horizon, painting the sand in hues of red and gold. A traditional mint tea ceremony completes this iconic Saharan adventure.',
    rating: 4.8,
  },
];


export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState<PopularRoute | null>(null);
  const [popularRoutes, setPopularRoutes] = useState(initialPopularRoutes);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [favoritedPlaces, setFavoritedPlaces] = useState<Set<string>>(new Set());
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return

    setCurrentSlide(carouselApi.selectedScrollSnap())
    
    const onSelect = (api: CarouselApi) => {
        setCurrentSlide(api.selectedScrollSnap())
    }
    
    carouselApi.on('select', onSelect)

    return () => {
        carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

  const nextImage = useCallback(() => {
    if (selectedPlace) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % selectedPlace.images.length);
    }
  }, [selectedPlace]);

  const prevImage = useCallback(() => {
    if (selectedPlace) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + selectedPlace.images.length) % selectedPlace.images.length);
    }
  }, [selectedPlace]);
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };


  const toggleFavoriteRoute = (routeId: string) => {
    setPopularRoutes(
      popularRoutes.map(route =>
        route.id === routeId ? { ...route, favorited: !route.favorited } : route
      )
    );
  };
  
  const toggleFavoritePlace = (placeId: string) => {
    setFavoritedPlaces(prev => {
        const newFavs = new Set(prev);
        if (newFavs.has(placeId)) {
            newFavs.delete(placeId);
        } else {
            newFavs.add(placeId);
        }
        return newFavs;
    })
  }

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') {
      return topPlaces;
    }
    return topPlaces.filter(place => place.category === activeFilter);
  }, [activeFilter]);
  
  const handleSelectPlace = (place: Place | null) => {
    setSelectedPlace(place);
    if (place) {
      setSelectedImageIndex(0);
    }
  };

  const handleShare = async (route: PopularRoute) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: route.title,
          text: route.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      alert('Sharing is not supported on this browser.');
    }
  };


  return (
    <div className={cn(
        "flex flex-col min-h-screen bg-background",
        view === 'map' && 'overflow-hidden h-screen'
      )}>
       <div className={cn(view === 'list' ? 'pb-24' : 'h-full overflow-hidden')}>
        {view === 'list' && (
          <header className="p-4 sm:p-6 lg:px-8">
            <div>
              <p className="text-muted-foreground">Salam 👋</p>
              <h1 className="text-3xl font-bold font-headline text-foreground">
                Welcome to the <span className="text-primary">Red Oasis</span>
              </h1>
            </div>
          </header>
        )}

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
                              <Card className="group cursor-pointer overflow-hidden rounded-3xl shadow-sm border bg-card" onClick={() => setSelectedRoute(route)}>
                                <CardContent className="p-0">
                                  <div className="relative rounded-t-3xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg">
                                      {route.images[0] && (
                                          <Image
                                              src={route.images[0].imageUrl}
                                              alt={route.title}
                                              fill
                                              style={{objectFit: 'cover'}}
                                              className="group-hover:scale-105 transition-transform duration-300"
                                              data-ai-hint={route.images[0].imageHint}
                                          />
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                      
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-4 right-4 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavoriteRoute(route.id);
                                        }}
                                      >
                                        <Heart className={cn("w-5 h-5", route.favorited && "fill-primary text-primary")}/>
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
                                </CardContent>
                              </Card>
                          </CarouselItem>
                          ))}
                      </CarouselContent>
                  </Carousel>
              </div>
              
              {/* Explore Section */}
              <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold font-headline">Explore</h2>
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
                                  isActive ? 'bg-primary' : 'bg-card text-card-foreground'
                              }`}
                              >
                              <filter.icon className="mr-2 h-4 w-4" />
                              {filter.label}
                              </Button>
                          );
                      })}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                      {filteredPlaces.map(place => {
                         const CategoryIcon = filterButtons.find(f => f.category === place.category)?.icon || Landmark;
                         return (
                           <Card key={place.id} className="group cursor-pointer overflow-hidden rounded-3xl shadow-sm border bg-card" onClick={() => handleSelectPlace(place)}>
                             <CardContent className="p-0">
                              <div className="relative aspect-[4/3]">
                                  <Image
                                      src={place.images[0].imageUrl}
                                      alt={place.title}
                                      fill
                                      style={{objectFit: 'cover'}}
                                      className="group-hover:scale-105 transition-transform duration-300"
                                      data-ai-hint={place.images[0].imageHint}
                                  />
                                  <Button
                                      size="icon"
                                      variant="ghost"
                                      className="absolute top-3 right-3 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white h-9 w-9"
                                      onClick={(e) => { e.stopPropagation(); toggleFavoritePlace(place.id); }}
                                  >
                                      <Heart className={cn("w-5 h-5", favoritedPlaces.has(place.id) && "fill-primary text-primary")} />
                                  </Button>
                              </div>
                              <div className="p-4">
                                  <div className="flex justify-between items-start">
                                      <h3 className="font-bold text-lg">{place.title}</h3>
                                      <div className="flex items-center gap-1.5 text-sm shrink-0 pl-2">
                                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                          <span className="font-bold">{place.rating}</span>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <CategoryIcon className="w-4 h-4" />
                                    <span>{place.shortInfo}</span>
                                  </div>
                              </div>
                              </CardContent>
                          </Card>
                      )})}
                  </div>
              </div>
            </div>
          ) : (
             <MapView 
                places={topPlaces} 
                onToggleView={() => setView('list')} 
                initialFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onPlaceSelect={(place) => handleSelectPlace(place)}
            />
          )}

      </div>

      <Dialog open={!!selectedPlace} onOpenChange={(isOpen) => !isOpen && handleSelectPlace(null)}>
        <DialogContent className="p-0 border-0 max-w-lg bg-transparent shadow-none text-foreground flex flex-col w-full h-full sm:h-auto sm:max-h-[90vh]">
            {selectedPlace && (
                <>
                <div className="flex-shrink-0 group relative"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="relative w-full aspect-[4/3] overflow-hidden sm:rounded-t-lg">
                      {selectedPlace.images.map((image, index) => (
                          <Image
                          key={image.id}
                          src={image.imageUrl}
                          alt={`${selectedPlace.title} - image ${index + 1}`}
                          fill
                          className={cn(
                            "object-cover transition-opacity duration-300",
                            index === selectedImageIndex ? "opacity-100" : "opacity-0"
                          )}
                          data-ai-hint={image.imageHint}
                          />
                      ))}
                      
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white h-8 w-8 transition-opacity hover:bg-black/60"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white h-8 w-8 transition-opacity hover:bg-black/60"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>

                         <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsZoomModalOpen(true)}
                          className="absolute bottom-2 right-2 rounded-full bg-black/40 text-white h-8 w-8 transition-opacity hover:bg-black/60"
                        >
                          <ZoomIn className="w-5 h-5" />
                        </Button>

                        <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors">
                          <X className="w-5 h-5" />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                    </div>
                </div>
                
                <div className="p-6 pt-4 bg-background rounded-b-lg flex-grow overflow-y-auto">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-3xl font-bold font-headline">{selectedPlace.title}</h2>
                       <div className="flex items-center gap-1.5 text-lg shrink-0 pl-2">
                           <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                           <span className="font-bold">{selectedPlace.rating}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 text-base text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                            {(() => {
                            const CategoryIcon = filterButtons.find(f => f.category === selectedPlace.category)?.icon || Landmark;
                            return <CategoryIcon className="w-5 h-5 text-primary" />
                            })()}
                            <span>{selectedPlace.category}</span>
                        </div>
                    </div>

                    <p className="text-muted-foreground prose prose-lg">{selectedPlace.info}</p>
                </div>
                 <div className="p-6 pt-0 mt-auto bg-background rounded-b-lg">
                    <Button asChild className="w-full">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.coords[0]},${selectedPlace.coords[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Navigation className="mr-2 h-5 w-5" />
                        Get Directions
                        </a>
                    </Button>
                </div>
                </>
            )}
        </DialogContent>
      </Dialog>

      {selectedPlace && (
        <Dialog open={isZoomModalOpen} onOpenChange={setIsZoomModalOpen}>
            <DialogContent className="p-0 border-0 max-w-full w-full h-full bg-black/80 backdrop-blur-lg flex items-center justify-center">
                <div className="relative w-full h-full" onClick={() => setIsImageZoomed(!isImageZoomed)}>
                    <Image
                        src={selectedPlace.images[selectedImageIndex].imageUrl}
                        alt={`${selectedPlace.title} - image ${selectedImageIndex + 1}`}
                        fill
                        className={cn("object-contain transition-transform duration-300", isImageZoomed && "scale-150 cursor-zoom-out", !isImageZoomed && "cursor-zoom-in")}
                        data-ai-hint={selectedPlace.images[selectedImageIndex].imageHint}
                    />
                </div>
                <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
      )}
      
      <Dialog open={!!selectedRoute} onOpenChange={(isOpen) => !isOpen && setSelectedRoute(null)}>
        <DialogContent className="p-0 border-0 w-full max-w-md h-full sm:h-auto sm:max-h-[90vh] bg-background text-foreground flex flex-col sm:rounded-2xl overflow-hidden">
            {selectedRoute && (
                <>
                <div className="relative px-4 sm:px-0">
                  <DialogClose className="absolute top-2 right-6 sm:right-2 z-20 rounded-full bg-background/50 text-foreground p-1 hover:bg-background/80 transition-colors">
                      <X className="w-4 h-4" />
                      <span className="sr-only">Close</span>
                  </DialogClose>
                  <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="w-full">
                      <CarouselContent className="-ml-4">
                          {selectedRoute.images.map((image, index) => (
                              <CarouselItem key={index} className="pl-4">
                                  <Card className="overflow-hidden rounded-2xl shadow-none border-0">
                                    <CardContent className="p-0">
                                        <div className="relative w-full aspect-[4/3] sm:aspect-video">
                                            <Image
                                                src={image.imageUrl}
                                                alt={`${selectedRoute.title} image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                    </CardContent>
                                  </Card>
                              </CarouselItem>
                          ))}
                      </CarouselContent>
                  </Carousel>
                  <div className="flex justify-center gap-2 mt-4">
                    {selectedRoute.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => carouselApi?.scrollTo(index)}
                            className={cn(
                                "h-2 rounded-full transition-all",
                                currentSlide === index ? "w-6 bg-primary" : "w-2 bg-muted"
                            )}
                        />
                    ))}
                  </div>
                </div>
                
                <div className="p-6 pt-4 flex-grow overflow-y-auto">
                    <div className='flex justify-between items-start mb-2'>
                        <h2 className="text-2xl font-bold font-headline">{selectedRoute.title}</h2>
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                            <span className="font-bold text-foreground">{selectedRoute.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                          <selectedRoute.categoryIcon className="w-4 h-4 text-primary"/>
                          <span>{selectedRoute.category}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary"/>
                          <span>{selectedRoute.duration}</span>
                      </div>
                    </div>

                    <p className="text-foreground/80 leading-relaxed">{selectedRoute.description}</p>
                </div>

                 <div className="p-4 bg-background mt-auto grid grid-cols-3 gap-2">
                     <Button variant="outline" size="lg" onClick={() => handleShare(selectedRoute)} className="col-span-1">
                         <Share2 className="mr-2 h-4 w-4"/>
                         Share
                     </Button>
                     <Button asChild size="lg" className="col-span-2">
                       <a href={`https://wa.me/213555123456?text=I'm%20interested%20in%20booking%20the%20'${encodeURIComponent(selectedRoute.title)}'%20route.`} target="_blank" rel="noopener noreferrer">
                         <MessageSquare className="mr-2 h-4 w-4"/>
                         Book Now
                        </a>
                     </Button>
                 </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
