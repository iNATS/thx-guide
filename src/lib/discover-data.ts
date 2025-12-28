
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Room = {
    name: string;
    availability: number;
    price: number;
    images: ImagePlaceholder[];
};

export type MenuOption = {
    size: 'Small' | 'Medium' | 'Large' | 'Standard';
    price: number;
}

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    options: MenuOption[];
    image: ImagePlaceholder;
    deliveryTime: number; // in minutes
}

export type Car = {
    id: string;
    name: string;
    pricePerDay: number;
    passengers: number;
    images: ImagePlaceholder[];
}

export type HotelFeature = {
    name: string;
    icon: string; // lucide-react icon name
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
    cars?: Car[];
    phone?: string;
    features?: HotelFeature[];
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
            { name: 'Standard Double Room', availability: 3, price: 12000, images: [PlaceHolderImages.find(img => img.id === 'hotel-room-standard')!, PlaceHolderImages.find(img => img.id === 'hotel-room-standard-2')!] },
            { name: 'Suite with Oasis View', availability: 1, price: 25000, images: [PlaceHolderImages.find(img => img.id === 'hotel-room-suite')!, PlaceHolderImages.find(img => img.id === 'hotel-room-suite-2')!] },
            { name: 'Family Room', availability: 0, price: 18000, images: [PlaceHolderImages.find(img => img.id === 'hotel-room-family')!] },
        ],
        phone: '+213660218221',
        features: [
            { name: 'Free Wi-Fi', icon: 'Wifi' },
            { name: 'Parking', icon: 'ParkingSquare' },
            { name: 'Pool', icon: 'Waves' },
            { name: 'Restaurant', icon: 'Utensils' },
            { name: 'Air Conditioning', icon: 'AirVent' },
            { name: 'No-Smoking', icon: 'CigaretteOff' },
        ]
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
        featured: true,
        rating: 4.9,
        location: 'Dunes Edge • 15km away',
        phone: '+213660218221'
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
            { name: 'Standard Room', availability: 2, price: 9000, images: [PlaceHolderImages.find(img => img.id === 'hotel-room-standard')!] },
            { name: 'Terrace Room', availability: 0, price: 13000, images: [PlaceHolderImages.find(img => img.id === 'hotel-room-terrace')!] },
        ],
        phone: '+213660218221',
        features: [
            { name: 'Free Wi-Fi', icon: 'Wifi' },
            { name: 'Parking', icon: 'ParkingSquare' },
            { name: 'Breakfast', icon: 'Coffee' },
            { name: 'Air Conditioning', icon: 'AirVent' },
        ]
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
            { id: 'tagine', name: 'Lamb Tagine', description: 'Slow-cooked lamb with prunes and almonds.', options: [{ size: 'Standard', price: 1800 }], image: PlaceHolderImages.find((img) => img.id === 'menu-tagine')!, deliveryTime: 45 },
            { id: 'couscous', name: 'Royal Couscous', description: 'A feast of couscous with seven vegetables, chicken, lamb, and merguez.', options: [{ size: 'Standard', price: 2200 }], image: PlaceHolderImages.find((img) => img.id === 'menu-couscous')!, deliveryTime: 50 },
            { id: 'grill', name: 'Mixed Grill', description: 'Assortment of grilled meats with Saharan spices.', options: [{ size: 'Standard', price: 2000 }], image: PlaceHolderImages.find((img) => img.id === 'menu-grill')!, deliveryTime: 30 },
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
             { id: 'grill', name: 'Mixed Grill', description: 'Assortment of grilled meats with Saharan spices.', options: [{ size: 'Standard', price: 1900 }], image: PlaceHolderImages.find((img) => img.id === 'menu-grill')!, deliveryTime: 25 },
             { id: 'tagine', name: 'Chicken Tagine', description: 'Slow-cooked chicken with olives and preserved lemons.', options: [{ size: 'Standard', price: 1600 }], image: PlaceHolderImages.find((img) => img.id === 'menu-tagine')!, deliveryTime: 40 },
        ]
    },
    {
        id: 'pizzeria-napoli',
        title: 'Pizzeria Napoli',
        description: 'A taste of Italy in the heart of the Sahara. Serving authentic wood-fired pizzas with a variety of toppings. A great option for a casual dinner.',
        shortDescription: 'A taste of Italy in the heart of the Sahara.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'menu-pizza-margherita')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'menu-pizza-margherita')!,
            PlaceHolderImages.find((img) => img.id === 'menu-pizza-pepperoni')!,
        ],
        coords: [29.257, 0.236],
        rating: 4.5,
        location: 'Main Square',
        phone: '+213660218221',
        menu: [
            { id: 'pizza-margherita', name: 'Pizza Margherita', description: 'Classic pizza with tomato, mozzarella, and basil.', options: [{ size: 'Medium', price: 800 }, { size: 'Large', price: 1200 }], image: PlaceHolderImages.find((img) => img.id === 'menu-pizza-margherita')!, deliveryTime: 25 },
            { id: 'pizza-pepperoni', name: 'Pizza Pepperoni', description: 'A favorite with spicy pepperoni and cheese.', options: [{ size: 'Medium', price: 900 }, { size: 'Large', price: 1300 }], image: PlaceHolderImages.find((img) => img.id === 'menu-pizza-pepperoni')!, deliveryTime: 30 },
        ]
    },
    {
        id: 'cafe-central',
        title: 'Café Central',
        description: 'The main meeting point in Timimoun for a coffee, tea, or a light snack. Perfect for people-watching and soaking up the local atmosphere.',
        shortDescription: 'The main meeting point for coffee and snacks.',
        category: 'Restaurants',
        image: PlaceHolderImages.find((img) => img.id === 'menu-coffee')!,
        images: [
            PlaceHolderImages.find((img) => img.id === 'menu-coffee')!,
            PlaceHolderImages.find((img) => img.id === 'menu-tea')!,
        ],
        coords: [29.258, 0.233],
        rating: 4.3,
        location: 'Main Square',
        phone: '+213660218221',
        menu: [
            { id: 'coffee', name: 'Espresso', description: 'Rich and aromatic.', options: [{ size: 'Standard', price: 100 }], image: PlaceHolderImages.find((img) => img.id === 'menu-coffee')!, deliveryTime: 5 },
            { id: 'tea', name: 'Mint Tea', description: 'Traditional Saharan mint tea.', options: [{ size: 'Standard', price: 80 }], image: PlaceHolderImages.find((img) => img.id === 'menu-tea')!, deliveryTime: 10 },
        ]
    },
    {
        id: 'rental-sahara-expeditions',
        title: 'Sahara Expeditions 4x4',
        description: 'Rent a reliable 4x4 to conquer the dunes of the Grand Erg Occidental. We offer guided tours or simple rentals for experienced drivers. All vehicles are equipped for desert travel.',
        shortDescription: 'Rent a reliable 4x4 to conquer the dunes.',
        category: 'Rentals',
        image: PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
        images: [
             PlaceHolderImages.find((img) => img.id === 'discover-rental')!,
             PlaceHolderImages.find((img) => img.id === 'car-rental-2')!,
             PlaceHolderImages.find((img) => img.id === 'car-rental-3')!,
        ],
        coords: [29.25, 0.233],
        featured: true,
        rating: 4.9,
        location: 'Agency Office',
        phone: '+213660218221',
        cars: [
            { id: 'toyota-land-cruiser', name: 'Toyota Land Cruiser', pricePerDay: 25000, passengers: 7, images: [PlaceHolderImages.find(img => img.id === 'discover-rental')!, PlaceHolderImages.find(img => img.id === 'car-rental-2')!] },
            { id: 'mitsubishi-pajero', name: 'Mitsubishi Pajero', pricePerDay: 22000, passengers: 5, images: [PlaceHolderImages.find(img => img.id === 'car-rental-3')!] },
        ]
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
        location: 'Near Palmeraie',
        phone: '+213660218221',
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
        location: 'Old Ksar District',
        phone: '+213660218221',
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
        location: 'Central Market',
        phone: '+213660218221',
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
        location: 'Deep Desert',
        phone: '+213660218221',
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
        location: 'Palmeraie Outskirts',
        phone: '+213660218221',
    },
    {
        id: 'selkh-ibrahim-rest-stop',
        title: 'Selkh Ibrahim Rest Stop',
        description: 'A convenient and welcoming rest stop for travelers. Offers simple, clean rooms and basic amenities, perfect for a short stay or a break from a long journey.',
        shortDescription: 'A convenient and welcoming rest stop for travelers.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.24, 0.22],
        rating: 4.1,
        location: 'Highway N6',
    },
    {
        id: 'jnan-malek-rest-stop',
        title: 'Jnan Malek Rest Stop',
        description: 'A charming stop with a garden, offering a peaceful environment. Provides comfortable lodging and a restaurant with local dishes.',
        shortDescription: 'A charming stop with a garden and restaurant.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.23, 0.21],
        rating: 4.3,
        location: 'Near Timimoun',
    },
    {
        id: 'red-oasis-camp',
        title: 'Red Oasis Camp',
        description: 'Experience the magic of the desert in this well-equipped camp. Offers traditional tent accommodations and organizes excursions into the dunes.',
        shortDescription: 'Well-equipped camp for desert excursions.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        coords: [29.19, 0.31],
        rating: 4.6,
        location: 'Erg Chech Dunes',
    },
    {
        id: 'lamrah-rest-stop',
        title: 'Lamrah Rest Stop',
        description: 'A simple and functional rest stop for travelers needing a place to rest and refuel. Offers basic rooms and a small cafe.',
        shortDescription: 'A simple and functional rest stop.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.22, 0.20],
        rating: 4.0,
        location: 'Route de Adrar',
    },
    {
        id: 'wardet-errimal-rest-stop',
        title: 'Wardet Errimal Rest Stop',
        description: '"Rose of the Sands" offers a comfortable stay with a touch of local hospitality. Known for its clean rooms and friendly staff.',
        shortDescription: 'Comfortable stay with local hospitality.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.21, 0.19],
        rating: 4.4,
        location: 'Outside Timimoun',
    },
    {
        id: 'marmoura-rest-stop',
        title: 'Marmoura Rest Stop',
        description: 'A modern and clean option for travelers, providing well-maintained rooms and a restaurant serving a variety of dishes.',
        shortDescription: 'Modern and clean with a good restaurant.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.20, 0.18],
        rating: 4.5,
        location: 'Route N51',
    },
    {
        id:'amguid-rest-stop',
        title: 'Amguid Rest Stop',
        description: 'A basic but reliable lodging option for travelers passing through the region. Offers essential services for an overnight stay.',
        shortDescription: 'Basic and reliable lodging for travelers.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.19, 0.17],
        rating: 4.1,
        location: 'Near Amguid',
    },
    {
        id: 'tin-habib-rest-stop',
        title: 'Tin Habib Rest Stop',
        description: 'A small, family-run stop offering a personal touch. Simple accommodations with home-cooked meals available.',
        shortDescription: 'A small, family-run stop with home-cooked meals.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.18, 0.16],
        rating: 4.2,
        location: 'Tin Habib Area',
    },
    {
        id: 'titawin-camp',
        title: 'Titawin Camp',
        description: 'A desert camp that focuses on cultural immersion, offering stays with local families and participation in daily life.',
        shortDescription: 'A desert camp focused on cultural immersion.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp-eco')!,
        coords: [29.17, 0.32],
        rating: 4.7,
        location: 'Near Titawin',
    },
    {
        id: 'dar-el-kaf-rest-stop',
        title: 'Dar El Kaf Rest Stop',
        description: 'A traditional-style guesthouse offering a comfortable and authentic Saharan experience. Features a courtyard and rooftop terrace.',
        shortDescription: 'Traditional guesthouse with a rooftop terrace.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'discover-hotel-riad')!,
        coords: [29.26, 0.25],
        rating: 4.6,
        location: 'Old Town',
    },
    {
        id: 'akham-timimoun-rest-stop',
        title: 'Akham Timimoun Rest Stop',
        description: 'A large guesthouse offering a range of room types to suit different travelers. Features a restaurant and easy access to the town center.',
        shortDescription: 'Large guesthouse with a restaurant near the center.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
        coords: [29.255, 0.24],
        rating: 4.4,
        location: 'Timimoun Center',
    },
    {
        id: 'amazaten-hotel',
        title: 'Amazaten Hotel',
        description: 'A modern hotel with comfortable amenities, including a swimming pool and conference facilities. Caters to both tourists and business travelers.',
        shortDescription: 'Modern hotel with a pool and conference facilities.',
        category: 'Hotels',
        image: PlaceHolderImages.find((img) => img.id === 'hotel-gourara-pool')!,
        coords: [29.25, 0.26],
        rating: 4.5,
        location: 'New Town',
    },
    {
        id: 'tidah-tenznatet-camp',
        title: 'Tidah Tenznatet Camp',
        description: 'A secluded desert camp perfect for those looking for peace and tranquility. Offers stunning views and a chance to experience the solitude of the Sahara.',
        shortDescription: 'A secluded desert camp for peace and tranquility.',
        category: 'Camps',
        image: PlaceHolderImages.find((img) => img.id === 'discover-camp')!,
        coords: [29.16, 0.33],
        rating: 4.8,
        location: 'Deep Desert',
    }
];
