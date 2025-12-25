
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Utensils, Car, ShoppingBag, Tent, Search, Star, User, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { discoverData, type DiscoverItem } from '@/lib/discover-data';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const filterButtons = [
    { label: 'Hotels', category: 'Hotels', icon: Bed },
    { label: 'Camps', category: 'Camps', icon: Tent },
    { label: 'Restaurants', category: 'Restaurants', icon: Utensils },
    { label: 'Safari', category: 'Rentals', icon: Car },
    { label: 'Shopping', category: 'Shopping', icon: ShoppingBag },
];

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Hotels');

    const filteredItems = useMemo(() => {
        return discoverData.filter(item => 
            item.category === activeFilter &&
            (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, activeFilter]);

    const experiencesOfTheWeek = useMemo(() => {
        return filteredItems.filter(item => item.featured);
    }, [filteredItems]);

    const popularStays = useMemo(() => {
        return filteredItems.filter(item => !item.featured);
    }, [filteredItems]);
    
    return (
        <div className="bg-background min-h-screen pb-24">
            <header className="p-4 sm:p-6 lg:px-8">
                <div className="flex justify-between items-center">
                   <h1 className="text-3xl font-bold font-headline text-foreground">
                        Discover the <span className="text-primary">Red Oasis</span>
                    </h1>
                </div>
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Find hotels, tours, food..."
                        className="pl-10 h-12 text-base rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <div className="flex gap-2 overflow-x-auto py-4 px-4 scrollbar-hide">
                {filterButtons.map((filter) => {
                    const isActive = activeFilter === filter.category;
                    const Icon = filter.icon;
                    return (
                        <Button
                            key={filter.label}
                            variant={isActive ? 'default' : 'secondary'}
                            onClick={() => setActiveFilter(filter.category)}
                            className={cn('rounded-full flex-shrink-0 text-base px-5 py-2 h-auto', isActive ? 'bg-primary' : 'bg-card text-card-foreground shadow-sm')}
                        >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {filter.label}
                        </Button>
                    );
                })}
            </div>

            <main className="p-4 sm:p-6 lg:px-8">
                 <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-headline">Experience of the Week</h2>
                    </div>
                     {experiencesOfTheWeek.length > 0 ? (
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent className="-ml-4">
                                {experiencesOfTheWeek.map((experience) => (
                                <CarouselItem key={experience.id} className="basis-4/5 sm:basis-1/2 md:basis-2/3 pl-4">
                                    <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group cursor-pointer shadow-lg">
                                        {experience.image && (
                                            <Image
                                                src={experience.image.imageUrl}
                                                alt={experience.title}
                                                fill
                                                style={{objectFit: 'cover'}}
                                                className="group-hover:scale-105 transition-transform duration-300"
                                                data-ai-hint={experience.image.imageHint}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        
                                        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                                            <Star className="w-4 h-4 fill-white"/>
                                            <span>{experience.rating}</span>
                                        </div>
                                        
                                        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-md text-xs font-bold uppercase">
                                            TOP PICK
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex justify-between items-end">
                                            <div>
                                                <h3 className="text-2xl font-bold font-headline">{experience.title}</h3>
                                                <p className="text-sm max-w-xs mt-1 opacity-90">{experience.description}</p>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 right-6 flex items-center gap-4">
                                             <div className="text-white text-right">
                                                <p className="text-2xl font-bold">${experience.price}</p>
                                                <p className="text-sm opacity-90">/ person</p>
                                            </div>
                                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl h-12 px-6 font-bold text-base">Book Now</Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                     ) : (
                        <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                            <p>No featured items for this category.</p>
                        </div>
                     )}
                </section>
               
                <section>
                   <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-headline">Popular Stays</h2>
                    </div>
                     {popularStays.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {popularStays.map((item) => (
                                 <div key={item.id} className="group cursor-pointer">
                                    <div className="relative rounded-3xl overflow-hidden aspect-video">
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
                                        <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-3 right-3 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white h-9 w-9"
                                        >
                                        <Heart className="w-5 h-5"/>
                                        </Button>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                                                <span className="font-bold">{item.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{item.location}</p>
                                        <p className="font-semibold mt-1.5"><span className="text-lg">${item.price}</span> / night</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                     ) : (
                         <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                            <p>No popular items to show for this category.</p>
                        </div>
                     )}
                </section>
            </main>
        </div>
    );
}
