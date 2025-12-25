
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Landmark, Navigation, Castle, Wind, MapPin, User, List } from 'lucide-react';
import { Place } from './page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const timimounPosition: [number, number] = [29.25, 0.25];

const filterButtons = [
  { label: 'All', category: 'All', icon: Navigation },
  { label: 'Culture', category: 'Culture', icon: Castle },
  { label: 'Nature', category: 'Nature', icon: Landmark },
  { label: 'Adventure', category: 'Adventure', icon: Wind },
];

const createCustomIcon = (L: any, color: string = 'hsl(var(--primary))') => {
    const iconMarkup = renderToStaticMarkup(
        <div className="flex flex-col items-center">
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

  const filteredPlaces = useMemo(() => {
    if (activeFilter === 'All') return places;
    return places.filter(place => place.category === activeFilter);
  }, [activeFilter, places]);

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
                .bindPopup("You are here").openPopup();
        } else {
            userMarkerRef.current.setLatLng(e.latlng);
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const L = (window as any).L;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    // Add new markers
    filteredPlaces.forEach(place => {
      const isSelected = place.id === selectedPlaceId;
      const color = isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))';
      const icon = createCustomIcon(L, color);
      const marker = L.marker(place.coords, { icon })
        .addTo(mapInstance.current)
        .on('click', () => {
            setSelectedPlaceId(place.id);
            mapInstance.current.setView(place.coords, 14);
        });
        
      markersRef.current[place.id] = marker;
    });

  }, [filteredPlaces, selectedPlaceId]);


  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

        <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:w-96 max-h-[45vh] flex flex-col shadow-2xl animate-fade-in-up">
            <CardContent className="p-3 flex flex-col flex-grow">
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filterButtons.map((filter) => {
                        const isActive = activeFilter === filter.category;
                        return (
                            <Button
                            key={filter.label}
                            variant={isActive ? 'default' : 'secondary'}
                            size="sm"
                            onClick={() => setActiveFilter(filter.category)}
                            className={cn('rounded-full flex-shrink-0', isActive && 'bg-primary')}
                            >
                            <filter.icon className="mr-2 h-4 w-4" />
                            {filter.label}
                            </Button>
                        );
                    })}
                </div>
                <ScrollArea className="flex-grow">
                  <div className="space-y-3 pr-3">
                    {filteredPlaces.map(place => (
                         <div
                            key={place.id}
                            className={cn(
                                "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                                selectedPlaceId === place.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                            )}
                            onClick={() => {
                                setSelectedPlaceId(place.id)
                                mapInstance.current.setView(place.coords, 14);
                            }}
                            >
                            <Image 
                                src={place.images[0].imageUrl} 
                                alt={place.title}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-md object-cover"
                                data-ai-hint={place.images[0].imageHint}
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm">{place.title}</h3>
                                <p className="text-xs text-muted-foreground">{place.category}</p>
                            </div>
                        </div>
                    ))}
                  </div>
                </ScrollArea>
            </CardContent>
        </Card>

        <Button variant="outline" onClick={onToggleView} className="absolute top-4 right-4 bg-background/80 shadow-lg">
            <List className="mr-2 h-4 w-4" />
            List View
        </Button>
    </div>
  );
}

    