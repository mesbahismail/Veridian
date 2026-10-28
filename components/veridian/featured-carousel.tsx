import * as React from 'react';
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { FeaturedHotelCard } from '@/components/veridian/hotel-cards';
import type { Hotel } from '@/data/hotels';
import { useScreenSize } from '@/lib/device-frame';
import { colors } from '@/lib/theme';

const CARD_W = 279;
const GAP = 6;
const SNAP = CARD_W + GAP;
/** The list is rendered three times so there is always a card peeking on both sides. */
const COPIES = 3;

/** Looping snap carousel; neighbouring cards shrink and tilt away in 3D like the design. */
export function FeaturedCarousel({ data }: { data: Hotel[] }) {
  const { width } = useScreenSize();
  const side = (width - CARD_W) / 2;
  const n = data.length;
  const start = n * SNAP; // first card of the middle copy
  const scrollX = React.useRef(new Animated.Value(start)).current;
  const ref = React.useRef<ScrollView>(null);
  const settle = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = React.useState(0);

  const items = React.useMemo(() => Array.from({ length: COPIES }, () => data).flat(), [data]);

  // Jump back into the middle copy once scrolling settles in an outer copy — the copies are identical, so it's invisible.
  const recentre = (x: number) => {
    const i = Math.round(x / SNAP);
    if (i < n || i >= 2 * n) ref.current?.scrollTo({ x: (((i % n) + n) % n + n) * SNAP, animated: false });
  };

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: true,
    listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const i = (((Math.round(x / SNAP) % n) + n) % n);
      setActive((prev) => (prev === i ? prev : i));
      if (settle.current) clearTimeout(settle.current);
      settle.current = setTimeout(() => recentre(x), 160);
    },
  });

  React.useEffect(() => () => {
    if (settle.current) clearTimeout(settle.current);
  }, []);

  return (
    <View>
      <Animated.ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        contentOffset={{ x: start, y: 0 }}
        onLayout={() => ref.current?.scrollTo({ x: start, animated: false })}
        contentContainerStyle={{ paddingHorizontal: side - GAP / 2, paddingVertical: 4 }}
        scrollEventThrottle={16}
        onScroll={onScroll}>
        {items.map((hotel, i) => {
          const inputRange = [(i - 1) * SNAP, i * SNAP, (i + 1) * SNAP];
          const rotateY = scrollX.interpolate({ inputRange, outputRange: ['-22deg', '0deg', '22deg'], extrapolate: 'clamp' });
          const scale = scrollX.interpolate({ inputRange, outputRange: [0.985, 1, 0.985], extrapolate: 'clamp' });
          const translateX = scrollX.interpolate({ inputRange, outputRange: [-16, 0, 16], extrapolate: 'clamp' });
          return (
            <Animated.View
              key={`${hotel.id}-${i}`}
              style={{
                marginHorizontal: GAP / 2,
                transform: [{ perspective: 800 }, { translateX }, { rotateY }, { scale }],
                shadowColor: '#000',
                shadowOpacity: 0.45,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 10 },
              }}>
              <FeaturedHotelCard hotel={hotel} width={CARD_W} />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      <View className="mt-[33px] flex-row justify-center" style={{ gap: 6 }}>
        {data.map((h, i) => (
          <View
            key={h.id}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              borderWidth: 1.5,
              borderColor: i === active ? colors.tealDeal : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </View>
    </View>
  );
}
