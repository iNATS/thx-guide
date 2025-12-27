
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Room = {
    name: string;
    availability: number;
};

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: ImagePlaceholder;
    deliveryTime: number; // in minutes
}

export type DiscoverItem = {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    category: 'Hotels' | 'Restaurants' | 'Rentals' | 'Shopping' | 'Camps';
    image: ImagePlaceholder;
    images?: ImagePlaceholder[];
    coords: [number, number];
    featured?: boolean;
    rating?: number;
    location?: string;
    rooms?: Room[];
    menu?: MenuItem[];
    phone?: string;
};

export const discoverData: DiscoverItem[] = [
    {
        id: 'hotel-gourara',
        title: 'Hotel Gourara',
        description: 'A classic hotel offering stunning views over the palmeraie and the sebkha. Known for its exceptional service and historic charm, Hotel Gourara provides a tranquil retreat with modern amenities. The architecture reflects traditional Saharan design, offering an authentic Timimoun experience.',
        shortDescription: 'Classic hotel with stunning oasis views and historic charm.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
            PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        ],
        coords: [29.255, 0.235],
        featured: true,
        rating: 4.8,
        location: 'Historic Center • 0.5km away',
        rooms: [
            { name: 'Standard Double Room', availability: 3 },
            { name: 'Suite with Oasis View', availability: 1 },
            { name: 'Family Room', availability: 0 },
        ],
        phone: '+213660218221'
    },
    {
        id: 'desert-rose-camp',
        title: 'Desert Rose Camp',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac. Experience true desert hospitality with comfortable tents, delicious local food cooked over a campfire, and traditional music. A magical escape from the everyday.',
        shortDescription: 'An unforgettable night under the Saharan stars.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'desert-rose-camp-night')!,
        images: [PlaceHolderImages.find((img) => img.id === 'desert-rose-camp-night')!],
        coords: [29.18, 0.30],
        featured: false,
        rating: 4.9,
        location: 'Dunes Edge • 15km away'
    },
    {
        id: 'riad-dar-ahmed',
        title: 'Riad Dar Ahmed',
        description: 'A charming and authentic guesthouse in the heart of the old town. This beautifully restored riad offers an intimate and peaceful atmosphere, with a central courtyard and traditionally decorated rooms. Perfect for those seeking a cultural immersion.',
        shortDescription: 'Charming guesthouse in the heart of the old town.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
            PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
        ],
        coords: [29.261, 0.232],
        rating: 4.7,
        location: 'Old Ksar • 0.1km away',
        rooms: [
            { name: 'Standard Room', availability: 2 },
            { name: 'Terrace Room', availability: 0 },
        ],
        phone: '+213660218221'
    },
    {
        id: 'restaurant-oasis-rouge',
        title: 'Le Restaurant de l\'Oasis Rouge',
        description: 'Savor traditional Timimoun cuisine in a beautiful setting. The menu features local specialties prepared with fresh ingredients from the oasis. Enjoy your meal in a romantic courtyard under the stars.',
        shortDescription: 'Savor traditional Timimoun cuisine in a beautiful setting.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'discover-restaurant')!,
            PlaceHolderImages.find((img) => img.id === 'discover-restaurant-2')!,
            PlaceHolderImages.find((img) => img.id === 'menu-tagine')!,
        ],
        coords: [29.258, 0.23],
        featured: true,
        rating: 4.6,
        location: 'City Center',
        phone: '+213660218221',
        menu: [
            { id: 'tagine', name: 'Lamb Tagine', description: 'Slow-cooked lamb with prunes and almonds.', price: 1800, image: PlaceHolderImages.find((img) => img.id === 'menu-tagine')!, deliveryTime: 45 },
            { id: 'couscous', name: 'Royal Couscous', description: 'A feast of couscous with seven vegetables, chicken, lamb, and merguez.', price: 2200, image: PlaceHolderImages.find((img) => img.id === 'menu-couscous')!, deliveryTime: 50 },
            { id: 'grill', name: 'Mixed Grill', description: 'Assortment of grilled meats with Saharan spices.', price: 2000, image: PlaceHolderImages.find((img) => img.id === 'menu-grill')!, deliveryTime: 30 },
        ]
    },
     {
        id: 'restaurant-taghit',
        title: 'Restaurant Taghit',
        description: 'Enjoy delicious grilled meats and local specialties near the market. A popular spot for a quick and satisfying lunch. Known for its friendly service and bustling atmosphere.',
        shortDescription: 'Delicious grilled meats and local specialties near the market.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'discover-restaurant-2')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'discover-restaurant-2')!,
            PlaceHolderImages.find((img) => img.id === 'menu-grill')!,
        ],
        coords: [29.259, 0.234],
        rating: 4.4,
        location: 'Near Market',
        phone: '+213660218221',
        menu: [
             { id: 'grill', name: 'Mixed Grill', description: 'Assortment of grilled meats with Saharan spices.', price: 1900, image: PlaceHolderImages.find((img) => img.id === 'menu-grill')!, deliveryTime: 25 },
             { id: 'tagine', name: 'Chicken Tagine', description: 'Slow-cooked chicken with olives and preserved lemons.', price: 1600, image: PlaceHolderImages.find((img) => img.id === 'menu-tagine')!, deliveryTime: 40 },
        ]
    },
    {
        id: 'rental-sahara-expeditions',
        title: 'Sahara Expeditions 4x4',
        description: 'Rent a reliable 4x4 to conquer the dunes of the Grand Erg Occidental. We offer guided tours or simple rentals for experienced drivers. All vehicles are equipped for desert travel.',
        shortDescription: 'Rent a reliable 4x4 to conquer the dunes.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-rental')!],
        coords: [29.25, 0.233],
        featured: true,
        rating: 4.9,
        location: 'Agency Office'
    },
    {
        id: 'rental-timimoun-bikes',
        title: 'Timimoun Bike Rentals',
        description: 'Explore the oasis at your own pace by renting a bicycle. A perfect way to discover the shady lanes of the palmeraie and the narrow streets of the ksar.',
        shortDescription: 'Explore the oasis at your own pace on a bicycle.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental-bike')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-rental-bike')!],
        coords: [29.252, 0.234],
        rating: 4.5,
        location: 'Near Palmeraie'
    },
    {
        id: 'shopping-ksar-artisans',
        title: 'Ksar Artisans Cooperative',
        description: 'Find authentic local crafts, from leatherwork to pottery and carpets. A great place to buy unique souvenirs and support local artisans. You can often see the craftspeople at work.',
        shortDescription: 'Find authentic local crafts and unique souvenirs.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-souk')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-souk')!],
        coords: [29.26, 0.231],
        featured: true,
        rating: 4.7,
        location: 'Old Ksar District'
    },
    {
        id: 'shopping-date-market',
        title: 'Date & Spice Market',
        description: 'Purchase the famous dates of Timimoun and a variety of Saharan spices. The market is a vibrant hub of activity, especially in the morning. A feast for the senses.',
        shortDescription: 'Purchase famous dates and a variety of Saharan spices.',
        category: 'Shopping',
        image: PlaceHolderImages.find((img) => img.id === 'discover-shopping-dates')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-shopping-dates')!],
        coords: [29.259, 0.235],
        rating: 4.6,
        location: 'Central Market'
    },
    {
        id: 'camp-nuit-etoilee',
        title: 'Camp Nuit Étoilée',
        description: 'An unforgettable night under the Saharan stars in a traditional bivouac. This luxury camp offers private tents with comfortable bedding, gourmet meals, and guided stargazing sessions.',
        shortDescription: 'Luxury desert camp for a night under the stars.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-camp')!],
        coords: [29.18, 0.30],
        featured: true,
        rating: 4.9,
        location: 'Deep Desert'
    },
    {
        id: 'camp-oasis-retreat',
        title: 'Oasis Eco-Retreat',
        description: 'A sustainable and peaceful camp located within a secluded part of the palm grove. Perfect for those looking to disconnect and enjoy nature. The retreat focuses on wellness and tranquility.',
        shortDescription: 'Sustainable and peaceful camp in a secluded oasis.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp-eco')!,
        images: [PlaceHolderImages.find((img) => img.id === 'discover-camp-eco')!],
        coords: [29.28, 0.20],
        rating: 4.8,
        location: 'Palmeraie Outskirts'
    },
];
