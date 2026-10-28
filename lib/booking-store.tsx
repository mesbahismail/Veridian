import * as React from 'react';

export type Filters = {
  from: Date;
  to: Date;
  type: 'Hotel' | 'Resort' | 'Guesthouse';
  distance: number;
  price: [number, number];
  amenities: string[];
  stars: number[];
};

export const defaultFilters: Filters = {
  from: new Date(2022, 9, 14),
  to: new Date(2022, 9, 22),
  type: 'Resort',
  distance: 5.2,
  price: [500, 1500],
  amenities: ['Pool', 'Gym'],
  stars: [3, 4],
};

type BookingState = {
  hotelId: string;
  adults: number;
  kids: number;
  room: string;
  preferences: string[];
  setHotelId: (id: string) => void;
  setAdults: (n: number) => void;
  setKids: (n: number) => void;
  setRoom: (r: string) => void;
  togglePreference: (p: string) => void;
  filters: Filters | null;
  setFilters: (f: Filters | null) => void;
};

const BookingContext = React.createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [hotelId, setHotelId] = React.useState('ocean-breeze');
  const [adults, setAdults] = React.useState(1);
  const [kids, setKids] = React.useState(1);
  const [room, setRoom] = React.useState('');
  const [preferences, setPreferences] = React.useState<string[]>([
    'Balcony / Terrace',
    'Work desk',
    'Coffee/Tea maker',
    'Pet-friendly',
  ]);
  const [filters, setFilters] = React.useState<Filters | null>(null);

  const togglePreference = React.useCallback(
    (p: string) => setPreferences((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])),
    []
  );

  const value = React.useMemo(
    () => ({
      hotelId,
      adults,
      kids,
      room,
      preferences,
      setHotelId,
      setAdults,
      setKids,
      setRoom,
      togglePreference,
      filters,
      setFilters,
    }),
    [hotelId, adults, kids, room, preferences, togglePreference, filters]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
