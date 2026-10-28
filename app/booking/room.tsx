import * as React from 'react';
import { View } from 'react-native';
import { BedDouble, Star, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import { Checkbox } from '@/components/ui/checkbox';
import { SectionLabel } from '@/components/veridian/section';
import { Counter } from '@/components/veridian/counter';
import { RoomChips } from '@/components/veridian/room-chips';
import { BookingShell, Block } from '@/components/veridian/booking-shell';
import { useBooking } from '@/lib/booking-store';

const PREFERENCES = [
  'Seaside / Ocean view',
  'Balcony / Terrace',
  'Work desk',
  'Coffee/Tea maker',
  'Wheelchair accessible',
  'Pet-friendly',
];

/** 14 — Booking step 1: Room details */
export default function RoomStep() {
  const b = useBooking();
  return (
    <BookingShell title="Room details" step={0} cta="Continue" onCta={() => router.push('/booking/details')}>
      <Block>
        <SectionLabel icon={Users} label="Guests" />
        <View className="mt-4 flex-row justify-around px-2" style={{ marginHorizontal: -16 }}>
          <Counter label="Adults" value={b.adults} onChange={b.setAdults} min={1} />
          <Counter label="Kids" value={b.kids} onChange={b.setKids} />
        </View>
      </Block>
      <Block className="px-0 pb-[22px]">
        <SectionLabel icon={BedDouble} label="Select a room" className="px-4" />
        <View className="mt-[16px]">
          <RoomChips value={b.room} onChange={b.setRoom} />
        </View>
      </Block>
      <Block last>
        <SectionLabel icon={Star} filled label="Preferences" />
        <View className="mt-[18px] pl-7" style={{ gap: 19 }}>
          {PREFERENCES.map((p) => (
            <Checkbox
              key={p}
              label={p}
              checked={b.preferences.includes(p)}
              onCheckedChange={() => b.togglePreference(p)}
              labelClassName="text-[14.5px] leading-[18px] text-white/85"
            />
          ))}
        </View>
      </Block>
    </BookingShell>
  );
}
