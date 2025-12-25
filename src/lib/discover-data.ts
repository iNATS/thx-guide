
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type DiscoverItem = {
    id: string;
    title: string;
    description: string;
    category: 'Hotels' | 'Restaurants' | 'Rentals' | 'Shopping' | 'Camps';
    image: ImagePlaceholder;
    coords: [number, number];
    featured?: boolean;
};

export const discoverData: DiscoverItem[] = [
    {
        id: 'hotel-gourara',
        title: 'Hôtel Gourara',
        description: 'A classic hotel offering stunning views over the palmeraie and the sebkha.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel')!,
        coords: [29.255, 0.235],
        featured: true,
    },
    {
        id: 'riad-dar-ahmed',
        title: 'Riad Dar Ahmed',
        description: 'A charming and authentic guesthouse in the heart of the old town.',
        category: 'Hotels',
        image: {
            "id": "discover-hotel-riad",
            "description": "A beautiful riad hotel interior.",
            "imageUrl": "https://picsum.photos/seed/hotelriad/600/400",
            "imageHint": "riad hotel"
        },
        coords: [29.261, 0.232]
    },
    {
        id: 'restaurant-oasis-rouge',
        title: 'Le Restaurant de l\'Oasis Rouge',
        description: 'Savor traditional Timimoun cuisine in a beautiful setting.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant')!,
        coords: [29.258, 0.23],
        featured: true,
    },
     {
        id: 'restaurant-taghit',
        title: 'Restaurant Taghit',
        description: 'Enjoy delicious grilled meats and local specialties near the market.',
        category: 'Restaurants',
        image: {
            "id": "discover-restaurant-2",
            "description": "A traditional Moroccan restaurant interior.",
            "imageUrl": "https://picsum.photos/seed/resto2/600/400",
            "imageHint": "restaurant grill"
        },
        coords: [29.259, 0.234]
    },
    {
        id: 'rental-sahara-expeditions',
        title: 'Sahara Expeditions 4x4',
        description: 'Rent a reliable 4x4 to conquer the dunes of the Grand Erg Occidental.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
        coords: [29.25, 0.233],
        featured: true,
    },
    {
        id: 'rental-timimoun-bikes',
        title: 'Timimoun Bike Rentals',
        description: 'Explore the oasis at your own pace by renting a bicycle.',
        category: 'Rentals',
        image: {
            id: 'discover-rental-bike',
            description: 'Bicycles lined up for rent in a sunny location.',
            imageUrl: 'https://picsum.photos/seed/bikerent/600/400',
            imageHint: 'bicycle rental'
        },
        coords: [29.252, 0.234]
    },
    {
        id: 'shopping-ksar-artisans',
        title: 'Ksar Artisans Cooperative',
        description: 'Find authentic local crafts, from leatherwork to pottery and carpets.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-souk')!,
        coords: [29.26, 0.231],
        featured: true,
    },
    {
        id: 'shopping-date-market',
        title: 'Date & Spice Market',
        description: 'Purchase the famous dates of Timimoun and a variety of Saharan spices.',
        category: 'Shopping',
        image: {
            id: 'discover-shopping-dates',
            description: 'A market stall selling fresh dates and spices.',
            imageUrl: 'https://picsum.photos/seed/datespice/600/400',
            imageHint: 'date market'
        },
        coords: [29.259, 0.235]
    },
    {
        id: 'camp-nuit-etoilee',
        title: 'Camp Nuit Étoilée',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        coords: [29.18, 0.30],
        featured: true,
    },
    {
        id: 'camp-oasis-retreat',
        title: 'Oasis Eco-Retreat',
        description: 'A sustainable and peaceful camp located within a secluded part of the palm grove.',
        category: 'Camps',
        image: {
            id: 'discover-camp-eco',
            description: 'An eco-friendly desert camp with tents.',
            imageUrl: 'https://picsum.photos/seed/ecocamp/600/400',
            imageHint: 'eco camp'
        },
        coords: [29.28, 0.20]
    },
];
