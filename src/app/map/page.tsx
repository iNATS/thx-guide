
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/map'), { ssr: false });

export default function MapPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Interactive Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Explore Timimoun and its surrounding points of interest. You can pan and zoom on the map.
          </p>
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border">
            <Map />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
