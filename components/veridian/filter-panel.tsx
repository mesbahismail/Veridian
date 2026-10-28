import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  ArrowRight,
  BedDouble,
  Calendar,
  CircleDollarSign,
  House,
  List,
  MapPin,
  Star,
  Umbrella,
  type LucideIcon,
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Slider } from '@/components/ui/slider';
import { SectionLabel } from '@/components/veridian/section';
import { AmenityToggle, AMENITIES } from '@/components/veridian/amenity';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/data/hotels';
import type { Filters } from '@/lib/booking-store';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const fmtDay = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;

const TYPES: { key: Filters['type']; icon: LucideIcon }[] = [
  { key: 'Hotel', icon: BedDouble },
  { key: 'Resort', icon: Umbrella },
  { key: 'Guesthouse', icon: House },
];

function Block({ children, last, className }: { children: React.ReactNode; last?: boolean; className?: string }) {
  return <View className={cn('px-4 pb-6 pt-[22px]', !last && 'border-b border-white/[0.18]', className)}>{children}</View>;
}

/** Indents content to line up with the SectionLabel text (x = 44). */
function Indent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={cn('pl-7', className)}>{children}</View>;
}

export function FilterPanel({
  value,
  onChange,
  bottomPadding = 120,
}: {
  value: Filters;
  onChange: (f: Filters) => void;
  bottomPadding?: number;
}) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...value, [k]: v });
  const shiftDate = (key: 'from' | 'to', days: number) => {
    const d = new Date(value[key]);
    d.setDate(d.getDate() + days);
    set(key, d);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Block className="pb-[19px]">
        <SectionLabel icon={Calendar} label="Find a date" />
        <Indent className="mt-[22px] flex-row">
          <Pressable onPress={() => shiftDate('from', 1)} onLongPress={() => shiftDate('from', -1)} style={{ width: 145 }}>
            <Text className="font-dm-medium text-[24px] leading-[30px]">{fmtDay(value.from)}</Text>
            <Text className="mt-[3px] text-[14px] text-white/50">{DAYS[value.from.getDay()]}</Text>
          </Pressable>
          <View style={{ height: 30, justifyContent: 'center' }}>
            <ArrowRight size={18} strokeWidth={1.8} color="rgba(255,255,255,0.55)" />
          </View>
          <Pressable onPress={() => shiftDate('to', 1)} onLongPress={() => shiftDate('to', -1)} style={{ marginLeft: 26 }}>
            <Text className="font-dm-medium text-[24px] leading-[30px]">{fmtDay(value.to)}</Text>
            <Text className="mt-[3px] text-[14px] text-white/50">{DAYS[value.to.getDay()]}</Text>
          </Pressable>
        </Indent>
      </Block>

      <Block>
        <SectionLabel icon={Star} filled label="Type" />
        <Indent className="mt-[20px]">
          <View className="h-[57px] flex-row overflow-hidden rounded-[12px] border border-white/25">
            {TYPES.map((t, i) => {
              const active = value.type === t.key;
              const Icon = t.icon;
              return (
                <Pressable
                  key={t.key}
                  onPress={() => set('type', t.key)}
                  className={cn(
                    'flex-1 items-center justify-center',
                    i > 0 && 'border-l border-white/25',
                    active && 'border border-teal-light bg-teal'
                  )}
                  style={{ gap: 3 }}>
                  <Icon size={16} strokeWidth={2} color={active ? '#fff' : 'rgba(255,255,255,0.7)'} />
                  <Text className={cn('text-[13px]', active ? 'text-white' : 'text-white/65')}>{t.key}</Text>
                </Pressable>
              );
            })}
          </View>
        </Indent>
      </Block>

      <Block className="pb-[15px]">
        <SectionLabel icon={MapPin} label="Distance" />
        <Indent className="mt-[15px]">
          <Slider
            min={0}
            max={7}
            step={0.1}
            value={value.distance}
            onValueChange={(v) => set('distance', v as number)}
            formatLabel={(v) => `${v.toFixed(1)} KM`}
          />
        </Indent>
      </Block>

      <Block className="pb-[15px]">
        <SectionLabel icon={CircleDollarSign} label="Price range" />
        <Indent className="mt-[15px]">
          <Slider
            min={0}
            max={2000}
            step={50}
            value={value.price}
            onValueChange={(v) => set('price', v as [number, number])}
            formatLabel={(v) => formatMoney(v, 0)}
          />
        </Indent>
      </Block>

      <Block>
        <SectionLabel icon={List} label="Accommodations" />
        <Indent className="mt-[21px] flex-row">
          {AMENITIES.map((a) => (
            <AmenityToggle
              key={a.key}
              amenity={a}
              active={value.amenities.includes(a.key)}
              onPress={() =>
                set(
                  'amenities',
                  value.amenities.includes(a.key)
                    ? value.amenities.filter((x) => x !== a.key)
                    : [...value.amenities, a.key]
                )
              }
            />
          ))}
        </Indent>
      </Block>

      <Block last>
        <SectionLabel icon={Star} filled label="Reviews" />
        <Indent className="mt-[21px]">
          <View className="h-[46px] flex-row overflow-hidden rounded-[12px] border border-white/25">
            {[1, 2, 3, 4, 5].map((n, i) => {
              const active = value.stars.includes(n);
              return (
                <Pressable
                  key={n}
                  onPress={() =>
                    set('stars', active ? value.stars.filter((x) => x !== n) : [...value.stars, n].sort())
                  }
                  className={cn(
                    'flex-1 flex-row items-center justify-center',
                    i > 0 && 'border-l border-white/25',
                    active && 'border border-teal-light bg-teal'
                  )}
                  style={{ gap: 6 }}>
                  <Star
                    size={14}
                    strokeWidth={2}
                    color={active ? '#fff' : 'rgba(255,255,255,0.6)'}
                    fill={active ? '#fff' : 'rgba(255,255,255,0.6)'}
                  />
                  <Text className={cn('text-[17px]', active ? 'text-white' : 'text-white/65')}>{n}</Text>
                </Pressable>
              );
            })}
          </View>
        </Indent>
      </Block>
    </ScrollView>
  );
}
