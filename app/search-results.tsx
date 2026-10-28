import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronDown, ChevronUp, CircleX, LayoutDashboard, Search, StretchHorizontal, X } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { GridHotelCard, ListHotelCard } from '@/components/veridian/hotel-cards';
import { FilterPanel, fmtDay } from '@/components/veridian/filter-panel';
import { hotels, listPricing, formatMoney } from '@/data/hotels';
import { defaultFilters, useBooking, type Filters } from '@/lib/booking-store';
import { useScreenSize } from '@/lib/device-frame';
import { colors } from '@/lib/theme';
import { cn } from '@/lib/utils';

/** Search field (39) + "Filter by" row (22 + 30 + 15) below the top inset */
const TOOLBAR_H = 5 + 39 + 22 + 30 + 15;

/** 06–10 — Search results (grid / list), filter sheet and applied chips */
export default function SearchResultsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useScreenSize();
  const params = useLocalSearchParams<{ q?: string }>();
  const { filters, setFilters } = useBooking();

  const [query, setQuery] = React.useState(params.q ?? 'Ocean');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<Filters>(filters ?? defaultFilters);

  const gridW = (width - 16 * 2 - 14) / 2;

  const chips = filters
    ? [
        { key: 'date', label: `${fmtDay(filters.from)} - ${fmtDay(filters.to)}` },
        { key: 'distance', label: `Distance ${Math.round(filters.distance)} km` },
        { key: 'price', label: `${formatMoney(filters.price[0], 0)}-${formatMoney(filters.price[1], 0)}` },
        { key: 'amenities', label: `${filters.amenities.length + 1} Highlights` },
        { key: 'stars', label: `${filters.stars.join(',')} Stars` },
        { key: 'type', label: `${filters.type}s` },
      ]
    : [];

  const [removed, setRemoved] = React.useState<string[]>([]);
  const visibleChips = chips.filter((c) => !removed.includes(c.key));
  const removeChip = (key: string) => {
    const next = [...removed, key];
    if (next.length >= chips.length) {
      setFilters(null);
      setRemoved([]);
    } else setRemoved(next);
  };

  const toggleOpen = () => {
    if (!open) setDraft(filters ?? defaultFilters);
    setOpen((v) => !v);
  };

  const save = () => {
    setFilters(draft);
    setRemoved([]);
    setOpen(false);
    setView('list');
  };

  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <View className="flex-1 bg-background">
      {/* Header: search field */}
      <View style={{ paddingTop: insets.top + 5 }} className="px-4">
        <View className="h-[39px] flex-row items-center rounded-[10px] border border-white/30 bg-white/[0.04] pl-[14px] pr-3" style={{ gap: 9 }}>
          <Search size={14} strokeWidth={2.6} color="#fff" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="flex-1 font-dm text-[15px] text-white"
            selectionColor={colors.teal}
          />
          <Pressable hitSlop={10} onPress={() => (router.canGoBack() ? router.back() : setQuery(''))}>
            <X size={22} strokeWidth={1.6} color="rgba(255,255,255,0.55)" />
          </Pressable>
        </View>
      </View>

      {/* Filter by row */}
      <View className={cn('px-5 pb-[15px] pt-[22px]', !open && 'border-b border-white/[0.18]', !open && visibleChips.length && 'pb-[17px]')}>
        <View className="h-[30px] flex-row items-center justify-between">
          <Pressable onPress={toggleOpen} className="flex-row items-center" style={{ gap: 9 }} hitSlop={8}>
            <Text className="text-[24px] leading-[30px]">Filter by</Text>
            <Chevron size={20} strokeWidth={1.8} color="rgba(255,255,255,0.6)" />
          </Pressable>
          <View className="flex-row items-center" style={{ gap: 10, marginRight: -2 }}>
            <Pressable hitSlop={8} onPress={() => setView('list')}>
              <StretchHorizontal size={25} strokeWidth={1.7} color={view === 'list' ? colors.cyan : 'rgba(255,255,255,0.45)'} />
            </Pressable>
            <Pressable hitSlop={8} onPress={() => setView('grid')}>
              <LayoutDashboard size={25} strokeWidth={1.7} color={view === 'grid' ? colors.cyan : 'rgba(255,255,255,0.45)'} />
            </Pressable>
          </View>
        </View>

        {!open && visibleChips.length ? (
          <View className="mt-[13px] flex-row flex-wrap" style={{ columnGap: 9, rowGap: 10 }}>
            {visibleChips.map((c) => (
              <Pressable
                key={c.key}
                onPress={() => removeChip(c.key)}
                className="h-[26px] flex-row items-center rounded-full border border-white/20 bg-white/[0.08] pl-[7px] pr-[10px]"
                style={{ gap: 5 }}>
                <CircleX size={15} strokeWidth={2.4} color="#2A2C2F" fill="rgba(255,255,255,0.6)" />
                <Text className="text-[14px] text-white/80" style={{ letterSpacing: 0.3 }}>
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingTop: 21, paddingBottom: insets.bottom + 30, gap: view === 'grid' ? 14 : 17 }}>
        {view === 'grid' ? (
          <View className="flex-row flex-wrap" style={{ gap: 14 }}>
            {hotels.slice(1).map((h) => (
              <GridHotelCard key={h.id} hotel={h} width={gridW} />
            ))}
          </View>
        ) : (
          hotels.slice(1).map((h) => {
            const p = listPricing[h.id] ?? { price: h.price, rating: h.rating };
            return <ListHotelCard key={h.id} hotel={h} {...p} />;
          })
        )}
      </ScrollView>

      {/* Filter sheet — frosts the results it slides over */}
      {open ? (
        <View style={[StyleSheet.absoluteFill, { top: insets.top + TOOLBAR_H }]}>
          <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(27,28,30,0.6)' }]} />
          <FilterPanel value={draft} onChange={setDraft} bottomPadding={insets.bottom + 100} />
          <View
            className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-t-[28px] border border-b-0 border-white/10 px-4 pt-[18px]"
            style={{ paddingBottom: Math.max(insets.bottom - 3, 16) }}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(40,42,45,0.55)' }]} />
            <Button onPress={save} className="h-[51px] border-[#5AD2B9]">
              <Text>Save filters</Text>
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
}
