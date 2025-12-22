
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MapPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'timimoun-map');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Timimoun Road Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            An overview of Timimoun and its surrounding points of interest.
          </p>
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
