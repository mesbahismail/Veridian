import * as React from 'react';
import { Pressable, View } from 'react-native';
import { BriefcaseBusiness, Car, Dumbbell, WavesLadder, Wifi, type LucideIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export const AMENITIES: { key: string; label: string; icon: LucideIcon }[] = [
  { key: 'WIFI', label: 'WIFI', icon: Wifi },
  { key: 'Pool', label: 'Pool', icon: WavesLadder },
  { key: 'Desk', label: 'Desk', icon: BriefcaseBusiness },
  { key: 'Gym', label: 'Gym', icon: Dumbbell },
  { key: 'Parking', label: 'Parking', icon: Car },
];

/** Round icon + label. `active` fills it teal (filters); static on the detail screen. */
export function AmenityToggle({
  amenity,
  active = false,
  onPress,
}: {
  amenity: (typeof AMENITIES)[number];
  active?: boolean;
  onPress?: () => void;
}) {
  const Icon = amenity.icon;
  return (
    <Pressable onPress={onPress} disabled={!onPress} className="flex-1 items-center" style={{ gap: 7 }}>
      <View
        className={cn(
          'h-[44px] w-[44px] items-center justify-center rounded-full border',
          active ? 'border-teal-light bg-teal' : 'border-white/25 bg-white/[0.06]'
        )}>
        <Icon
          size={19}
          strokeWidth={2}
          color={active ? '#fff' : 'rgba(255,255,255,0.8)'}
          style={amenity.key === 'Gym' ? { transform: [{ rotate: '90deg' }] } : undefined}
        />
      </View>
      <Text className={cn('text-[14px]', active ? 'font-dm-medium text-white' : 'text-white/60')}>{amenity.label}</Text>
    </Pressable>
  );
}
