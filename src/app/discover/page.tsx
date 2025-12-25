
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Utensils, Car, ShoppingBag, Tent, Search, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { discoverData, type DiscoverItem } from '@/lib/discover-data';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const categoryIcons = {
    'Hotels': Bed,
    'Restaurants': Utensils,
    'Rentals': Car,
    'Shopping': ShoppingBag,
    'Camps': Tent,
};

const filterButtons = [
    { label: 'Hotels', category: 'Hotels', icon: Bed },
    { label: 'Restaurants', category: 'Restaurants', icon: Utensils },
    { label: 'Rentals', category: 'Rentals', icon: Car },
    { label: 'Shopping', category: 'Shopping', icon: ShoppingBag },
    { label: 'Camps', category: 'Camps', icon: Tent },
];

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Hotels');

    const featuredItems = useMemo(() => {
        return discoverData.filter(item => {
            const matchesFilter = item.category === activeFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return item.featured && matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter]);

    const regularItems = useMemo(() => {
        return discoverData.filter(item => {
            const matchesFilter = item.category === activeFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return !item.featured && matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter]);

    const hasContent = featuredItems.length > 0 || regularItems.length > 0;

    return (
        <div className="bg-background min-h-screen pb-24">
             <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-40 border-b pt-4">
                <div className="px-4 sm:px-6">
                    <h1 className="text-2xl font-bold font-headline">Discover Timimoun</h1>
                </div>
                 <div className="flex gap-2 overflow-x-auto pt-4 pb-4 px-4 scrollbar-hide">
                    {filterButtons.map((filter) => {
                        const isActive = activeFilter === filter.category;
                        return (
                            <Button
                                key={filter.label}
                                variant={isActive ? 'default' : 'secondary'}
                                onClick={() => setActiveFilter(filter.category)}
                                className={cn('rounded-full flex-shrink-0', isActive ? 'bg-primary' : 'bg-card text-card-foreground shadow-sm')}
                            >
                            {filter.icon && <filter.icon className="mr-2 h-4 w-4" />}
                            {filter.label}
                            </Button>
                        );
                    })}
                </div>
            </header>
            
            <div className="sticky top-[125px] z-30 px-4 sm:px-6 pb-4 -mt-3">
                <div className="relative shadow-lg rounded-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for hotels, restaurants, etc."
                        className="pl-12 rounded-full h-12 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <main className="p-4 sm:p-6">
                {!hasContent ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Search className="mx-auto h-12 w-12" />
                        <h3 className="mt-4 text-lg font-semibold">No Results Found</h3>
                        <p className="mt-2 text-sm">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <>
                        {featuredItems.length > 0 && (
                             <section className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                                        <Star className="text-primary w-5 h-5"/>
                                        Featured
                                    </h2>
                                </div>
                                <Carousel opts={{ align: "start" }} className="w-full">
                                    <CarouselContent className="-ml-4">
                                        {featuredItems.map((item) => (
                                            <CarouselItem key={item.id} className="basis-4/5 sm:basis-1/2 md:basis-2/3 pl-4">
                                                <Link href="#" className="group">
                                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer shadow-lg">
                                                        {item.image && (
                                                            <Image
                                                                src={item.image.imageUrl}
                                                                alt={item.title}
                                                                fill
                                                                style={{objectFit: 'cover'}}
                                                                className="group-hover:scale-105 transition-transform duration-300"
                                                                data-ai-hint={item.image.imageHint}
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                            <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </section>
                        )}
                       
                        {regularItems.length > 0 && (
                             <section>
                                <div className="grid grid-cols-1 gap-6">
                                    {regularItems.map((item) => {
                                        const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons];
                                        return (
                                            <Link href="#" key={item.id} className="group">
                                            <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30">
                                                <div className="relative h-40 w-full">
                                                    {item.image && (
                                                    <Image
                                                        src={item.image.imageUrl}
                                                        alt={item.title}
                                                        fill
                                                        style={{objectFit: 'cover'}}
                                                        className="group-hover:scale-105 transition-transform duration-300"
                                                        data-ai-hint={item.image.imageHint}
                                                    />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 p-4">
                                                            <h2 className="text-xl font-bold text-white font-headline">{item.title}</h2>
                                                    </div>
                                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
                                                        {CategoryIcon && <CategoryIcon className="w-6 h-6 text-primary" />}
                                                    </div>
                                                </div>
                                                <CardContent className="p-4">
                                                    <p className="text-muted-foreground">{item.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        )
                                    })}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
