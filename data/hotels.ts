import { images } from '@/lib/images';

export type Hotel = {
  id: string;
  name: string;
  title: string; // name shown on the detail screen
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  bestDeal?: boolean;
  rating: number;
  reviews: number;
  photos: number;
  type: 'Hotel' | 'Resort' | 'Guesthouse';
  about: string;
};

const about =
  'Fusce pulvinar posuere nisl, non porttitor urna facilisis eu. Maecenas ut neque et nisl maximus molestie. Praesent sem lectus.';

export const hotels: Hotel[] = [
  {
    id: 'celadon',
    name: 'Hotel Celadon',
    title: 'Hotel Celadon',
    image: images.celadon,
    gallery: [images.celadon, images.coralReef, images.greensPool, images.roomBed],
    price: 279,
    oldPrice: 329,
    bestDeal: true,
    rating: 4.6,
    reviews: 24,
    photos: 6,
    type: 'Resort',
    about,
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze Inn',
    title: 'Hotel Ocean Breeze Inn',
    image: images.oceanBreeze,
    gallery: [images.oceanBreeze, images.seaside, images.roomBed, images.roomView],
    price: 150,
    rating: 4.6,
    reviews: 24,
    photos: 8,
    type: 'Hotel',
    about,
  },
  {
    id: 'seaside-escape',
    name: 'Seaside Escape',
    title: 'Seaside Escape',
    image: images.seaside,
    gallery: [images.seaside, images.greensPool, images.roomView, images.roomBed],
    price: 250,
    oldPrice: 559,
    discount: 15,
    bestDeal: true,
    rating: 4.4,
    reviews: 24,
    photos: 5,
    type: 'Resort',
    about,
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef Retreat',
    title: 'Coral Reef Retreat',
    image: images.coralReef,
    gallery: [images.coralReef, images.greensPool, images.roomBed, images.roomView],
    price: 220,
    oldPrice: 459,
    discount: 15,
    rating: 4.3,
    reviews: 24,
    photos: 7,
    type: 'Resort',
    about,
  },
  {
    id: 'sandy-shores',
    name: 'Sandy Shores Resort',
    title: 'Sandy Shores Resort',
    image: images.sandyShores,
    gallery: [images.sandyShores, images.seaside, images.roomView, images.roomBed],
    price: 190,
    oldPrice: 229,
    discount: 15,
    rating: 4.6,
    reviews: 24,
    photos: 6,
    type: 'Resort',
    about,
  },
  {
    id: 'palm-paradise',
    name: 'Palm Paradise Hotel',
    title: 'Palm Paradise Hotel',
    image: images.palmParadise,
    gallery: [images.palmParadise, images.celadon, images.roomBed, images.roomView],
    price: 175,
    rating: 4.5,
    reviews: 24,
    photos: 4,
    type: 'Hotel',
    about,
  },
  {
    id: 'tropical-wave',
    name: 'Tropical Wave Hotel',
    title: 'Tropical Wave Hotel',
    image: images.tropicalWave,
    gallery: [images.tropicalWave, images.coralReef, images.roomBed, images.roomView],
    price: 200,
    rating: 4.4,
    reviews: 24,
    photos: 9,
    type: 'Hotel',
    about,
  },
];

/** "What's near" small cards (second carousel). */
export const nearby = [
  { id: 'seaside-escape', name: 'Greens Hotel', image: images.greensPool, price: 1259, rating: 4.6, reviews: 24 },
  { id: 'celadon', name: 'Greens Hotel', image: images.greensLobby, price: 1259, rating: 4.6, reviews: 24 },
  { id: 'coral-reef', name: 'Greens Hotel', image: images.boutique, price: 1259, rating: 4.6, reviews: 24 },
];

export const destinations = [
  { id: 'iceland', name: 'Iceland', image: images.iceland, rating: 4.6, reviews: 24 },
  { id: 'spain', name: 'Spain', image: images.spain, rating: 4.6, reviews: 24 },
  { id: 'greece', name: 'Greece', image: images.greece, rating: 4.6, reviews: 24 },
];

/** Large list view uses the same hotels but premium pricing (as in the design). */
export const listPricing: Record<string, { price: number; oldPrice?: number; discount?: number; rating: number }> = {
  'ocean-breeze': { price: 1259, oldPrice: 1559, discount: 15, rating: 4.4 },
  'seaside-escape': { price: 1259, rating: 4.4 },
  'coral-reef': { price: 1259, oldPrice: 1559, discount: 15, rating: 4.4 },
  'sandy-shores': { price: 1259, rating: 4.6 },
  'palm-paradise': { price: 1259, rating: 4.5 },
  'tropical-wave': { price: 1259, rating: 4.4 },
};

export const detailPricing = { price: 184, oldPrice: 274, discount: 15, rating: 4.2 };

export const reviews = [
  {
    id: 'r1',
    name: 'Maya Johnson',
    avatar: images.avatars.maya,
    date: '12 Mar, 2025',
    rating: 4.8,
    text: 'Enjoyed my time at Hotel Celadon. Great location and excellent amenities!',
    photos: [] as string[],
  },
  {
    id: 'r2',
    name: 'Giorgio Walter',
    avatar: images.avatars.giorgio,
    date: '12 Mar, 2025',
    rating: 4.6,
    text: 'A cozy retreat with modern decor and friendly staff. Perfect for a weekend getaway!',
    photos: [images.roomPool, images.roomBed, images.roomView],
  },
  {
    id: 'r3',
    name: 'Zoe Carter',
    avatar: images.avatars.zoe,
    date: '12 Mar, 2025',
    rating: 4.5,
    text: 'Hotel Celadon is a true find! Outstanding service and a delightful breakfast selection.',
    photos: [] as string[],
  },
  {
    id: 'r4',
    name: 'Lila Thompson',
    avatar: images.avatars.lila,
    date: '12 Mar, 2025',
    rating: 4.5,
    text: 'Had a fantastic stay at Hotel Celadon! The relaxing atmosphere and attentive staff made it unforgettable.',
    photos: [] as string[],
  },
];

export const getHotel = (id?: string) => hotels.find((h) => h.id === id) ?? hotels[1];

export const formatMoney = (n: number, decimals = 2) => {
  const [int, dec] = n.toFixed(decimals).split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${withCommas}${dec ? `.${dec}` : ''}`;
};
