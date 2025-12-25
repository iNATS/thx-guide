
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type DiscoverItem = {
    id: string;
    title: string;
    description: string;
    category: 'Hotels' | 'Restaurants' | 'Rentals' | 'Shopping' | 'Camps';
    image: ImagePlaceholder;
    coords: [number, number];
};

export const discoverData: DiscoverItem[] = [
    {
        id: 'hotel-gourara',
        title: 'Hôtel Gourara',
        description: 'A classic hotel offering stunning views over the palmeraie and the sebkha.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel')!,
        coords: [29.255, 0.235]
    },
    {
        id: 'restaurant-oasis-rouge',
        title: 'Le Restaurant de l\'Oasis Rouge',
        description: 'Savor traditional Timimoun cuisine in a beautiful setting.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant')!,
        coords: [29.258, 0.23]
    },
    {
        id: 'rental-sahara-expeditions',
        title: 'Sahara Expeditions 4x4',
        description: 'Rent a reliable 4x4 to conquer the dunes of the Grand Erg Occidental.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
        coords: [29.25, 0.233]
    },
    {
        id: 'shopping-ksar-artisans',
        title: 'Ksar Artisans Cooperative',
        description: 'Find authentic local crafts, from leatherwork to pottery and carpets.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-souk')!,
        coords: [29.26, 0.231]
    },
    {
        id: 'camp-nuit-etoilee',
        title: 'Camp Nuit Étoilée',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        coords: [29.18, 0.30]
    },
    {
        id: 'riad-dar-ahmed',
        title: 'Riad Dar Ahmed',
        description: 'A charming and authentic guesthouse in the heart of the old town.',
        category: 'Hotels',
        image: {
            "id": "discover-hotel",
            "description": "A beautiful hotel with a pool in a desert setting.",
            "imageUrl": "https://picsum.photos/seed/hotel2/600/400",
            "imageHint": "hotel interior"
        },
        coords: [29.261, 0.232]
    },
    {
        id: 'restaurant-taghit',
        title: 'Restaurant Taghit',
        description: 'Enjoy delicious grilled meats and local specialties near the market.',
        category: 'Restaurants',
        image": {
            "id": "discover-restaurant-2",
            "description": "A traditional Moroccan restaurant interior.",
            "imageUrl": "https://picsum.photos/seed/resto2/600/400",
            "imageHint": "restaurant grill"
        },
        coords: [29.259, 0.234]
    }
];
