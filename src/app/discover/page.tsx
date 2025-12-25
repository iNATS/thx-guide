
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Utensils, Car, ShoppingBag, Tent, Search, Map, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { discoverData, type DiscoverItem } from '@/lib/discover-data';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/app/map'), { ssr: false });

const categoryIcons = {
    'Hotels': Bed,
    'Restaurants': Utensils,
    'Rentals': Car,
    'Shopping': ShoppingBag,
    'Camps': Tent,
};

const filterButtons = [
    { label: 'All', category: 'All' },
    { label: 'Hotels', category: 'Hotels', icon: Bed },
    { label: 'Restaurants', category: 'Restaurants', icon: Utensils },
    { label: 'Rentals', category: 'Rentals', icon: Car },
    { label: 'Shopping', category: 'Shopping', icon: ShoppingBag },
    { label: 'Camps', category: 'Camps', icon: Tent },
];

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [view, setView] = useState('list');

    const filteredData = useMemo(() => {
        return discoverData.filter(item => {
            const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [searchQuery, activeFilter]);

    return (
        <div className="bg-background min-h-screen pb-24">
             <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-40 border-b">
                <div className="p-4 sm:p-6 space-y-4">
                    <h1 className="text-2xl font-bold font-headline">Discover Timimoun</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search for hotels, restaurants, etc."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>
            
            <main>
                 <Tabs value={view} onValueChange={setView} className="w-full">
                    <div className="sticky top-[137px] bg-background/80 backdrop-blur-sm z-30 px-4 sm:px-6 pb-2 pt-4 border-b">
                        <div className="flex justify-between items-center">
                            <TabsList className="grid w-full max-w-xs grid-cols-2">
                                <TabsTrigger value="list" className="flex items-center gap-2"><List /> List</TabsTrigger>
                                <TabsTrigger value="map" className="flex items-center gap-2"><Map /> Map</TabsTrigger>
                            </TabsList>
                        </div>

                        {view === 'list' && (
                           <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
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
                        )}
                    </div>

                    <TabsContent value="list" className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 gap-6">
                            {filteredData.length > 0 ? filteredData.map((item) => {
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
                                                objectFit="cover"
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
                            }) : (
                                <div className="text-center py-16 text-muted-foreground">
                                    <Search className="mx-auto h-12 w-12" />
                                    <h3 className="mt-4 text-lg font-semibold">No Results Found</h3>
                                    <p className="mt-2 text-sm">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="map">
                         <div className="relative aspect-video w-full h-[calc(100vh-250px)]">
                            <MapView />
                         </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
