
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { EventsView } from './events-view';
import { CalendarDays } from 'lucide-react';

export default function EventsPage() {
  const headerImage = PlaceHolderImages.find((img) => img.id === 'desert-landscape');

  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Header Image Section */}
      <div className="relative h-72">
        {headerImage && (
          <Image
            src={headerImage.imageUrl}
            alt={headerImage.description}
            layout="fill"
            objectFit="cover"
            className="opacity-80"
            data-ai-hint={headerImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-white drop-shadow-lg flex items-center gap-3">
                <CalendarDays className="w-8 h-8"/>
                Upcoming Events
            </h1>
            <p className="text-white/90 drop-shadow-md mt-1">
                Discover what's happening in the Red Oasis.
            </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-8 rounded-t-3xl bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-16 h-1.5 bg-border rounded-full mb-6" />
        <EventsView />
      </div>
    </div>
  );
}
