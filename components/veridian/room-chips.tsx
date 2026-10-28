import * as React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { BedDouble } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export const ROOMS = ['Single', 'Twin bed', 'King bed', 'Suite', 'Family'];

export function RoomChips({ value, onChange }: { value?: string; onChange?: (r: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 44 }}>
      {ROOMS.map((r) => {
        const active = onChange && value === r;
        return (
          <Pressable
            key={r}
            onPress={() => onChange?.(r)}
            className={cn(
              'h-[36px] flex-row items-center rounded-[14px] border pl-[13px] pr-[11px]',
              active ? 'border-teal-light bg-teal' : 'border-white/25 bg-white/10'
            )}
            style={{ gap: 7 }}>
            <BedDouble size={15} strokeWidth={2} color={active ? '#fff' : 'rgba(255,255,255,0.8)'} />
            <Text className={cn('text-[13.5px]', active ? 'text-white' : 'text-white/75')}>{r}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
