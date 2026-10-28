import * as React from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { BedDouble, Heart, Info, List, MapPin } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { BackButton, IconButton } from '@/components/veridian/screen-header';
import { SectionLabel } from '@/components/veridian/section';
import { Counter } from '@/components/veridian/counter';
import { AmenityToggle, AMENITIES } from '@/components/veridian/amenity';
import { MapPreview } from '@/components/veridian/map-preview';
import { RoomChips } from '@/components/veridian/room-chips';
import { ReviewsSheet } from '@/components/veridian/reviews-sheet';
import { detailPricing, getHotel } from '@/data/hotels';
import { useBooking } from '@/lib/booking-store';
import { useScreenSize } from '@/lib/device-frame';
import { images } from '@/lib/images';
import { colors } from '@/lib/theme';

const HERO = 322;
const HEADER = 65;
/** Sticky CTA bar above the home indicator: 21 top padding + 50 button + 10 bottom padding */
const CTA_H = 81;

/** 11–13 — Hotel detail */
export default function HotelDetailScreen() {
  const { id, reviews: openReviews } = useLocalSearchParams<{ id: string; reviews?: string }>();
  const hotel = getHotel(id);
  const insets = useSafeAreaInsets();
  const { width } = useScreenSize();
  const booking = useBooking();

  const [page, setPage] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [sheet, setSheet] = React.useState(openReviews === '1');
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [titleH, setTitleH] = React.useState(124);
  const [headerHidden, setHeaderHidden] = React.useState(false);
  React.useEffect(() => {
    const sub = scrollY.addListener(({ value }) => setHeaderHidden(value > 110));
    return () => scrollY.removeListener(sub);
  }, [scrollY]);

  const top = insets.top + HEADER;
  const headerOpacity = scrollY.interpolate({ inputRange: [0, 140], outputRange: [1, 0], extrapolate: 'clamp' });
  const blurOpacity = scrollY.interpolate({ inputRange: [0, HERO * 0.8], outputRange: [0, 1], extrapolate: 'clamp' });
  const heroTranslate = scrollY.interpolate({ inputRange: [-200, 0, HERO], outputRange: [60, 0, -HERO * 0.35], extrapolate: 'clamp' });
  // Scroll knob: the line runs up from the circle at rest and down from it once the page is scrolled.
  const lineUp = scrollY.interpolate({ inputRange: [0, 160], outputRange: [1, 0], extrapolate: 'clamp' });
  const lineDown = scrollY.interpolate({ inputRange: [0, 160], outputRange: [0, 1], extrapolate: 'clamp' });
  // The title block rests under the hero and pins just below the status bar. Its layer reaches
  // `titlePin` higher than the block itself so, once pinned, the blur also covers the status bar.
  const titleRest = top + HERO;
  const titlePin = insets.top + 4;
  const titleY = scrollY.interpolate({
    inputRange: [-200, 0, titleRest - titlePin],
    outputRange: [titleRest - titlePin + 200, titleRest - titlePin, 0],
    extrapolate: 'clamp',
  });

  const book = () => {
    booking.setHotelId(hotel.id);
    router.push('/booking/room');
  };

  const price = detailPricing;

  return (
    <View className="flex-1 bg-background">
      {/* Hero (fixed background) */}
      <Animated.View style={{ position: 'absolute', top, left: 0, right: 0, height: HERO, transform: [{ translateY: heroTranslate }] }}>
        <Image source={{ uri: hotel.gallery[page] }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      </Animated.View>
      {/* Blurred version that fades in while scrolling (screen 12) */}
      <Animated.View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: top + HERO, opacity: blurOpacity }}>
        <BlurredHero uri={hotel.gallery[page]} />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        contentContainerStyle={{ paddingTop: top, paddingBottom: insets.bottom + CTA_H }}>
        {/* Gallery swipe area */}
        <View style={{ height: HERO }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}>
            {hotel.gallery.map((g) => (
              <View key={g} style={{ width, height: HERO }} />
            ))}
          </ScrollView>
          <View className="absolute bottom-[6px] self-center overflow-hidden rounded-full">
            <BlurView intensity={30} tint="dark" style={{ flexDirection: 'row', gap: 7, paddingHorizontal: 9, paddingVertical: 7.5 }}>
              {hotel.gallery.map((g, i) => (
                <Pressable
                  key={g}
                  onPress={() => setPage(i)}
                  hitSlop={4}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 4.5,
                    borderWidth: 1.2,
                    borderColor: '#fff',
                    backgroundColor: i === page ? 'rgba(255,255,255,0.35)' : 'transparent',
                  }}
                />
              ))}
            </BlurView>
          </View>
        </View>

        {/* Room for the title block, which is drawn pinned on top (see below) */}
        <View style={{ height: titleH }} />

        {/* Transparent, so the blurred hero shows behind these rows once they scroll up */}
        <View>
          {/* Rating + reviews */}
          <View className="h-[79px] flex-row border-y border-white/[0.18]">
            <View className="justify-center pl-4" style={{ width: 196 }}>
              <Text className="font-dm-medium text-[26px] leading-[30px]">
                {price.rating.toFixed(1)}
                <Text className="font-dm text-[26px] text-white/40"> /5</Text>
              </Text>
              <Progress value={(price.rating / 5) * 100 - 3} height={5} className="mt-[7px] w-[160px]" />
            </View>
            <View className="w-px bg-white/[0.18]" />
            <Pressable onPress={() => setSheet(true)} className="flex-1 flex-row items-center justify-between pl-5 pr-4">
              <View>
                <Text className="font-dm-medium text-[26px] leading-[30px]">+1k</Text>
                <Text className="text-[13px] text-white/55 underline">Reviews</Text>
              </View>
              <View className="flex-row">
                <Avatar uri={images.avatars.zoe} size={34} ring />
                <Avatar uri={images.avatars.maya} size={34} ring className="-ml-[11px]" />
                <Avatar uri={images.avatars.lila} size={34} ring className="-ml-[11px]" />
              </View>
            </Pressable>
          </View>

          {/* Guests */}
          <View className="flex-row justify-around px-2 pb-6 pt-5">
            <Counter label="Adults" value={booking.adults} onChange={booking.setAdults} min={1} />
            <Counter label="Kids" value={booking.kids} onChange={booking.setKids} />
          </View>

          <View className="border-t border-white/[0.18] px-4 pb-[18px] pt-[21px]">
            <SectionLabel icon={Info} label="About" />
            <Text className="mt-[14px] pl-7 text-[15px] leading-[20px] text-white/90">{hotel.about}</Text>
          </View>

          <View className="border-t border-white/[0.18] px-4 pb-[21px] pt-[21px]">
            <SectionLabel icon={List} label="Accommodations" />
            <View className="mt-[17px] flex-row pl-7">
              {AMENITIES.map((a) => (
                <AmenityToggle key={a.key} amenity={a} />
              ))}
            </View>
          </View>

          {/* Map sits behind its label */}
          <View className="border-t border-white/[0.18]">
            <MapPreview />
            <SectionLabel icon={MapPin} label="Find us" className="absolute left-4 top-[20px]" />
          </View>

          <View className="border-t border-white/[0.18] pb-[17px] pt-[22px]">
            <SectionLabel icon={BedDouble} label="Rooms available" className="px-4" />
            <View className="mt-[18px]">
              <RoomChips />
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Title block: scrolls with the page, then stays pinned under the status bar over the blurred hero (screen 12) */}
      <Animated.View
        pointerEvents="none"
        onLayout={(e) => setTitleH(e.nativeEvent.layout.height - titlePin)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: titlePin, overflow: 'hidden', transform: [{ translateY: titleY }] }}>
        <Animated.View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: top + HERO, opacity: blurOpacity, transform: [{ translateY: Animated.multiply(titleY, -1) }] }}>
          <BlurredHero uri={hotel.gallery[page]} />
        </Animated.View>
        <View className="px-4 pb-[18px] pt-[18px]">
          <Text className="font-dm-medium text-[26px] leading-[32px]" style={{ maxWidth: 300 }}>
            {hotel.title}
          </Text>
          <View className="mt-[9px] flex-row items-center" style={{ gap: 10 }}>
            <Text className="font-dm-bold text-[19px] leading-[24px]">
              ${price.price}
              <Text className="font-dm text-[19px] text-white/50"> /Night</Text>
            </Text>
            <Badge
              variant="discount"
              label={`${price.discount}% OFF`}
              className="rounded-[5px] px-[6px] py-[3px]"
              textClassName="font-dm-medium text-[11px] leading-[13px]"
            />
          </View>
          <Text className="mt-[2px] font-dm-bold text-[15px] leading-[20px] text-white/35 line-through">${price.oldPrice}/Night</Text>

          {/* scroll knob */}
          <View pointerEvents="none" style={{ position: 'absolute', right: 18, top: 4, width: 37, height: 116, alignItems: 'center' }}>
            <Animated.View style={{ position: 'absolute', top: 0, width: 1.5, height: 56, backgroundColor: 'rgba(255,255,255,0.5)', opacity: lineUp }} />
            <Animated.View style={{ position: 'absolute', top: 56, width: 1.5, height: 60, backgroundColor: 'rgba(255,255,255,0.5)', opacity: lineDown }} />
            <View
              style={{
                position: 'absolute',
                top: 38,
                width: 37,
                height: 37,
                borderRadius: 18.5,
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.65)',
                backgroundColor: 'rgba(27,28,30,0.35)',
              }}
            />
          </View>
        </View>
      </Animated.View>

      {/* Header — solid at rest, fades away while scrolling */}
      <Animated.View
        pointerEvents={headerHidden ? 'none' : 'auto'}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: top, paddingTop: insets.top, backgroundColor: colors.background, opacity: headerOpacity }}>
        <View className="h-[56px] flex-row items-center justify-between px-4">
          <BackButton />
          <Text className="font-dm-medium text-[17px] text-white/90">{hotel.name}</Text>
          <IconButton
            icon={Heart}
            size={24}
            strokeWidth={1.8}
            color={liked ? colors.tealDeal : 'rgba(255,255,255,0.75)'}
            fill={liked ? colors.tealDeal : 'none'}
            onPress={() => setLiked((v) => !v)}
          />
        </View>
      </Animated.View>

      {/* Sticky CTA */}
      <View
        className="absolute bottom-0 left-0 right-0 border-t border-white/[0.12] px-4"
        style={{ height: insets.bottom + CTA_H, paddingBottom: insets.bottom + 10, paddingTop: 21, backgroundColor: colors.background }}>
        <Button onPress={book} className="border-[#5AD2B9]">
          <Text>Book a room</Text>
        </Button>
      </View>

      <ReviewsSheet visible={sheet} onClose={() => setSheet(false)} />
    </View>
  );
}

/** The hero photo, blurred and darkened toward the page background. */
function BlurredHero({ uri }: { uri: string }) {
  return (
    <>
      <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={30} />
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(27,28,30,0.35)', 'rgba(27,28,30,0.6)', colors.background]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
    </>
  );
}
