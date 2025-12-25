
'use client';

import { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Landmark, MapPin } from 'lucide-react';

const timimounPosition: [number, number] = [29.25, 0.25];

const createCustomIcon = (L: any) => {
    const iconMarkup = renderToStaticMarkup(
        <div className="flex flex-col items-center">
           <div className="bg-background p-2 rounded-full shadow-lg border border-primary/50">
               <Landmark className="text-primary" size={24} />
           </div>
           <div className="w-2 h-2 bg-primary rounded-full -mt-1 shadow-md"></div>
        </div>
    );
    return L.divIcon({
        html: iconMarkup,
        className: 'bg-transparent border-none',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    })
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstance.current) {
      const L = (window as any).L;

      if (!L) {
          console.error("Leaflet is not loaded");
          return;
      }

      // Fix for default marker icon issue with webpack
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, { attributionControl: false }).setView(timimounPosition, 12);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

      const customIcon = createCustomIcon(L);

      L.marker(timimounPosition, { icon: customIcon })
        .addTo(map)
        .bindPopup('Timimoun, the Red Oasis.');
    }
     // Cleanup function to remove the map instance on component unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}

    