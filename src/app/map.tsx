
'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker } from 'react-map-gl/maplibre';
import { Landmark } from 'lucide-react';

const timimounPosition = {
    longitude: 0.25,
    latitude: 29.25
};

export default function MapView() {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  return (
    <Map
        initialViewState={{
            ...timimounPosition,
            zoom: 12
        }}
        style={{width: '100%', height: '100%'}}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
    >
        <Marker longitude={timimounPosition.longitude} latitude={timimounPosition.latitude} anchor="bottom" >
           <div className="flex flex-col items-center">
              <div className="bg-background p-2 rounded-full shadow-lg border border-primary/50">
                  <Landmark className="text-primary" size={24} />
              </div>
              <div className="w-2 h-2 bg-primary rounded-full -mt-1 shadow-md"></div>
           </div>
        </Marker>
    </Map>
  );
}
