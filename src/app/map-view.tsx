
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Landmark, Navigation, Castle, Wind, MapPin, User, List, Heart, Clock } from 'lucide-react';
import { Place } from './page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const timimounPosition: [number, number] = [29.25, 0.25];

const filterButtons = [
  { label: 'All', category: 'All', icon: Navigation },
  { label: 'Culture', category: 'Culture', icon: Castle },
  { label: 'Nature', category: 'Nature', icon: Landmark },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
];

const createCustomIcon = (L: any, color: string = 'hsl(var(--primary))', isSelected: boolean = false) => {
    const iconMarkup = renderToStaticMarkup(
        <div className="flex flex-col items-center transition-transform duration-300" style={{ transform: isSelected ? 'scale(1.2)' : 'scale(1)' }}>
           <div style={{ backgroundColor: 'white', padding: '8px', borderRadius: '9999px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: `2px solid ${color}` }}>
               <MapPin style={{ color }} size={20} />
           </div>
           <div style={{ width: '8px', height: '8px', backgroundColor: color, borderRadius: '9999px', marginTop: '-4px', boxShadow: '0 2px 3px rgba(0,0,0,0.2)' }}></div>
        </div>
    );
    return L.divIcon({
        html: iconMarkup,
        className: 'bg-transparent border-none',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
    });
};

const createUserIcon = (L: any) => {
    const iconMarkup = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            <div className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
        </div>
    );
     return L.divIcon({
        html: iconMarkup,
        className: 'bg-transparent border-none',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
}

type MapViewProps = {
    places: Place[];
    onToggleView: () => void;
    initialFilter: string;
    onFilterChange: (category: string) => void;
};

export default function MapView({ places, onToggleView, initialFilter, onFilterChange }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any>({});
  const userMarkerRef = useRef<any>(null);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [favoritedPlaces, setFavoritedPlaces] = useState<Set<string>>(new Set());

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') return places;
    return places.filter(place => place.category === activeFilter);
  }, [activeFilter, places]);
  
  const toggleFavorite = (placeId: string) => {
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

  useEffect(() => {
    onFilterChange(activeFilter);
  }, [activeFilter, onFilterChange]);


  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstance.current) {
      const L = (window as any).L;
      if (!L) return;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, { attributionControl: false, zoomControl: false }).setView(timimounPosition, 12);
      mapInstance.current = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
      
      // Get user location
      map.locate({setView: true, maxZoom: 13, watch: true});

      map.on('locationfound', function(e: any) {
        if (!userMarkerRef.current) {
            userMarkerRef.current = L.marker(e.latlng, { icon: createUserIcon(L) }).addTo(map)
                .bindPopup("You are here");
        } else {
            userMarkerRef.current.setLatLng(e.latlng);
        }
      });

      map.on('click', () => {
        setSelectedPlaceId(null);
      })
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off();
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const L = (window as any).L;

    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    filteredPlaces.forEach(place => {
      const isSelected = place.id === selectedPlaceId;
      const color = isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))';
      const icon = createCustomIcon(L, color, isSelected);

      const marker = L.marker(place.coords, { icon })
        .addTo(mapInstance.current)
        .on('click', (e: any) => {
            L.DomEvent.stopPropagation(e);
            setSelectedPlaceId(place.id);
            mapInstance.current.setView(place.coords, 14);
        });
        
      markersRef.current[place.id] = marker;
    });

  }, [filteredPlaces, selectedPlaceId]);


  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
        <div ref={mapRef} className="absolute inset-0 z-0" />

        <div className="absolute bottom-4 left-0 right-0 z-10 w-full">
            <div className="w-full px-4 mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                    {filterButtons.map((filter) => {
                        const isActive = activeFilter === filter.category;
                        return (
                            <Button
                            key={filter.label}
                            variant={isActive ? 'default' : 'secondary'}
                            size="sm"
                            onClick={() => setActiveFilter(filter.category)}
                            className={cn('rounded-full flex-shrink-0 bg-background/80 shadow-lg backdrop-blur-sm', isActive && 'bg-primary text-primary-foreground')}
                            >
                            <filter.icon className="mr-2 h-4 w-4" />
                            {filter.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
            
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4">
                    {filteredPlaces.map((place, index) => (
                         <CarouselItem key={place.id} className="basis-[70%] sm:basis-1/3 md:basis-1/5 pl-4">
                            <Card 
                                className={cn(
                                    "w-full cursor-pointer transition-all duration-300 shadow-md bg-card/90 backdrop-blur-sm", 
                                    selectedPlaceId === place.id ? "border-primary/80 border-2" : "border-transparent"
                                )}
                                onClick={() => {
                                    setSelectedPlaceId(place.id)
                                    mapInstance.current.setView(place.coords, 14);
                                }}
                            >
                                <CardContent className="p-0">
                                    <div className="relative rounded-t-lg overflow-hidden aspect-[4/3] group">
                                        <Image
                                            src={place.images[0].imageUrl}
                                            alt={place.title}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            className="group-hover:scale-105 transition-transform duration-300"
                                            data-ai-hint={place.images[0].imageHint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-2 right-2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white h-8 w-8"
                                            onClick={(e) => { e.stopPropagation(); toggleFavorite(place.id); }}
                                        >
                                            <Heart className={cn("w-4 h-4", favoritedPlaces.has(place.id) && "fill-white")} />
                                        </Button>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-md truncate">{place.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                            {(() => {
                                                const CategoryIcon = filterButtons.find(f => f.category === place.category)?.icon || Landmark;
                                                return <CategoryIcon className="w-3 h-3" />
                                            })()}
                                            <span>{place.category}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        <Button variant="outline" onClick={onToggleView} className="absolute top-4 right-4 bg-background/80 shadow-lg z-10">
            <List className="mr-2 h-4 w-4" />
            List View
        </Button>
    </div>
  );
}

    
