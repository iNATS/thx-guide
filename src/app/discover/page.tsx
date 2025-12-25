
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bed, Utensils, Car, ShoppingBag, Tent } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const discoverCategories = [
    {
        title: 'Hotels & Riads',
        description: 'Find the perfect place to stay, from luxury hotels to traditional riads.',
        icon: Bed,
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel'),
        href: '#'
    },
    {
        title: 'Restaurants & Cafes',
        description: 'Explore local cuisine and enjoy a cup of mint tea.',
        icon: Utensils,
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant'),
        href: '#'
    },
    {
        title: 'Car & 4x4 Rentals',
        description: 'Rent a vehicle to explore the desert and surrounding areas.',
        icon: Car,
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental'),
        href: '#'
    },
    {
        title: 'Shopping & Souvenirs',
        description: 'Discover local crafts, carpets, and unique souvenirs.',
        icon: ShoppingBag,
        image: PlaceHolderImages.find((img) => img.id === 'discover-souk'),
        href: '#'
    },
    {
        title: 'Desert Camps',
        description: 'Experience a night under the stars in a traditional desert camp.',
        icon: Tent,
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp'),
        href: '#'
    }
]


export default function DiscoverPage() {
    return (
        <div className="bg-background min-h-screen pb-24">
             <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-40 border-b">
                <div className="flex items-center justify-between p-4 sm:p-6">
                    <h1 className="text-2xl font-bold font-headline">Discover Timimoun</h1>
                </div>
            </header>
            <main className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                    {discoverCategories.map((category) => (
                         <Link href={category.href} key={category.title} className="group">
                            <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30">
                                <div className="relative h-40 w-full">
                                    {category.image && (
                                    <Image
                                        src={category.image.imageUrl}
                                        alt={category.title}
                                        fill
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={category.image.imageHint}
                                    />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-4">
                                         <h2 className="text-xl font-bold text-white font-headline">{category.title}</h2>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
                                        <category.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <p className="text-muted-foreground">{category.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
