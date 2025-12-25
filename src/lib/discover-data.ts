
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type DiscoverItem = {
    id: string;
    title: string;
    description: string;
    category: 'Hotels' | 'Restaurants' | 'Rentals' | 'Shopping' | 'Camps';
    image: ImagePlaceholder;
    coords: [number, number];
    featured?: boolean;
    rating?: number;
    location?: string;
};

export const discoverData: DiscoverItem[] = [
    {
        id: 'hotel-gourara',
        title: 'Hotel Gourara',
        description: 'A classic hotel offering stunning views over the palmeraie and the sebkha.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
        coords: [29.255, 0.235],
        featured: true,
        rating: 4.8,
        location: 'Historic Center • 0.5km away'
    },
    {
        id: 'desert-rose-camp',
        title: 'Desert Rose Camp',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'desert-rose-camp-night')!,
        coords: [29.18, 0.30],
        featured: false,
        rating: 4.9,
        location: 'Dunes Edge • 15km away'
    },
    {
        id: 'riad-dar-ahmed',
        title: 'Riad Dar Ahmed',
        description: 'A charming and authentic guesthouse in the heart of the old town.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.261, 0.232],
        rating: 4.7,
        location: 'Old Ksar • 0.1km away'
    },
    {
        id: 'restaurant-oasis-rouge',
        title: 'Le Restaurant de l\'Oasis Rouge',
        description: 'Savor traditional Timimoun cuisine in a beautiful setting.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant')!,
        coords: [29.258, 0.23],
        featured: true,
        rating: 4.6,
        location: 'City Center'
    },
     {
        id: 'restaurant-taghit',
        title: 'Restaurant Taghit',
        description: 'Enjoy delicious grilled meats and local specialties near the market.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant-2')!,
        coords: [29.259, 0.234],
        rating: 4.4,
        location: 'Near Market'
    },
    {
        id: 'rental-sahara-expeditions',
        title: 'Sahara Expeditions 4x4',
        description: 'Rent a reliable 4x4 to conquer the dunes of the Grand Erg Occidental.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
        coords: [29.25, 0.233],
        featured: true,
        rating: 4.9,
        location: 'Agency Office'
    },
    {
        id: 'rental-timimoun-bikes',
        title: 'Timimoun Bike Rentals',
        description: 'Explore the oasis at your own pace by renting a bicycle.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental-bike')!,
        coords: [29.252, 0.234],
        rating: 4.5,
        location: 'Near Palmeraie'
    },
    {
        id: 'shopping-ksar-artisans',
        title: 'Ksar Artisans Cooperative',
        description: 'Find authentic local crafts, from leatherwork to pottery and carpets.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-souk')!,
        coords: [29.26, 0.231],
        featured: true,
        rating: 4.7,
        location: 'Old Ksar District'
    },
    {
        id: 'shopping-date-market',
        title: 'Date & Spice Market',
        description: 'Purchase the famous dates of Timimoun and a variety of Saharan spices.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-shopping-dates')!,
        coords: [29.259, 0.235],
        rating: 4.6,
        location: 'Central Market'
    },
    {
        id: 'camp-nuit-etoilee',
        title: 'Camp Nuit Étoilée',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        coords: [29.18, 0.30],
        featured: true,
        rating: 4.9,
        location: 'Deep Desert'
    },
    {
        id: 'camp-oasis-retreat',
        title: 'Oasis Eco-Retreat',
        description: 'A sustainable and peaceful camp located within a secluded part of the palm grove.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp-eco')!,
        coords: [29.28, 0.20],
        rating: 4.8,
        location: 'Palmeraie Outskirts'
    },
];

    
