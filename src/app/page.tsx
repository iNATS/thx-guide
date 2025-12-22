
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Castle,
  Heart,
  Landmark,
  Mic,
  Mountain,
  Navigation,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const filterButtons = [
  { label: 'Routes', icon: Navigation, active: true },
  { label: 'History', icon: Castle, active: false },
  { label: 'Palm Grove', icon: Landmark, active: false },
];

const popularRoutes = [
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
];

export default function Home() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'timimoun-map');
  const avatarImage = PlaceHolderImages.find(
    (img) => img.id === 'tour-guide-avatar'
  );

  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Map Section */}
      <div className="relative h-96">
        {mapImage && (
          <Image
            src={mapImage.imageUrl}
            alt="Map of Timimoun"
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
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
          <p className="text-muted-foreground">Salam, Amine</p>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Discover the Red Oasis
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
          {filterButtons.map((filter) => (
            <Button
              key={filter.label}
              variant={filter.active ? 'default' : 'secondary'}
              className={`rounded-full flex-shrink-0 ${
                filter.active ? 'bg-primary' : 'bg-card'
              }`}
            >
              <filter.icon className="mr-2 h-4 w-4" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Popular Routes */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-headline">
              Popular Routes
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {popularRoutes.map((route, index) => (
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
      </div>
    </div>
  );
}
