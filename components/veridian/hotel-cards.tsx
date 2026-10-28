import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Images, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Rating } from '@/components/veridian/rating';
import { HeartButton } from '@/components/veridian/heart-button';
import { formatMoney, type Hotel } from '@/data/hotels';
import { images } from '@/lib/images';

const cardBorder = { borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' };
const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.35,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
};
const openHotel = (id: string) => router.push({ pathname: '/hotel/[id]', params: { id } });

/* ───────────────────────── Browse: featured carousel card ───────────────────────── */
export function FeaturedHotelCard({ hotel, width }: { hotel: Hotel; width: number }) {
  return (
    <Pressable
      onPress={() => openHotel(hotel.id)}
      style={[{ width, borderRadius: 20, overflow: 'hidden', backgroundColor: '#2A2C2F' }, cardBorder]}>
      <View style={{ height: 169 }}>
        <Image source={{ uri: hotel.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
        <View
          style={{
            position: 'absolute',
            right: 11,
            bottom: 11,
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.65)',
          }}>
          <BlurView
            intensity={30}
            tint="dark"
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 7, paddingRight: 9, height: 25 }}>
            <Images size={14} strokeWidth={2} color="#fff" />
            <Text className="text-[13px]">{hotel.photos} Photos</Text>
          </BlurView>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingTop: 13, paddingBottom: 15 }}>
        <Text className="font-dm-medium text-[22px] leading-[28px]">{hotel.name}</Text>
        <View className="mt-[3px] flex-row items-center justify-between">
          <Text className="font-dm-bold text-[16px] leading-[22px]">
            {formatMoney(hotel.price)}
            <Text className="font-dm text-[16px] text-white/50"> /Night</Text>
          </Text>
          {hotel.bestDeal ? <Badge variant="deal" label="Best deal!" /> : null}
        </View>
        <Progress value={(hotel.rating / 5) * 100 + 0.5} height={5} className="mt-[19px]" />
        <View className="mt-[12px] flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Avatar uri={images.avatars.maya} size={26} />
            {/* stacked rings behind the avatar, as in the design */}
            <View style={{ width: 4, height: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderWidth: 1.5, borderLeftWidth: 0, borderColor: 'rgba(255,255,255,0.5)', marginLeft: -1 }} />
            <View style={{ width: 4, height: 15, borderTopRightRadius: 8, borderBottomRightRadius: 8, borderWidth: 1.5, borderLeftWidth: 0, borderColor: 'rgba(255,255,255,0.28)' }} />
            <Rating value={hotel.rating} reviews={hotel.reviews} size="lg" className="ml-[3px]" />
          </View>
          <Pressable
            hitSlop={6}
            style={{ width: 32, height: 32, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.28)', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={17} strokeWidth={1.6} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

/* ───────────────────────── Browse: small "what's near" card ───────────────────────── */
export function NearbyCard({
  item,
}: {
  item: { id: string; name: string; image: string; price: number; rating: number; reviews: number };
}) {
  return (
    <Pressable
      onPress={() => openHotel(item.id)}
      style={[{ width: 164, height: 228, borderRadius: 16, overflow: 'hidden', backgroundColor: '#2A2C2F' }, cardBorder]}>
      <View style={{ height: 115 }}>
        <Image source={{ uri: item.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
        <HeartButton size={24} style={{ position: 'absolute', top: 9, right: 9 }} />
      </View>
      <View style={{ paddingHorizontal: 12, paddingTop: 10 }}>
        <Text className="font-dm-medium text-[15px] leading-[20px]">{item.name}</Text>
        <Text className="font-dm-medium text-[13px] leading-[18px] text-white/90">{formatMoney(item.price)}/Night</Text>
        <Progress value={86} height={4} className="mt-[22px]" />
        <Rating value={item.rating} reviews={item.reviews} size="sm" className="mt-[5px]" />
      </View>
    </Pressable>
  );
}

/* ───────────────────────── Browse: destination tile ───────────────────────── */
export function DestinationCard({
  item,
}: {
  item: { name: string; image: string; rating: number; reviews: number };
}) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/search-results', params: { q: item.name } })}
      style={[{ width: 164, height: 219, borderRadius: 16, overflow: 'hidden', backgroundColor: '#2A2C2F' }, cardBorder]}>
      <Image source={{ uri: item.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} />
      <View style={{ position: 'absolute', left: 16, bottom: 14 }}>
        <Text className="font-dm-medium text-[22px] leading-[28px]">{item.name}</Text>
        <Rating value={item.rating} reviews={item.reviews} size="sm" />
      </View>
    </Pressable>
  );
}

/* ───────────────────────── Search: grid card ───────────────────────── */
export function GridHotelCard({ hotel, width }: { hotel: Hotel; width: number }) {
  return (
    <Pressable
      onPress={() => openHotel(hotel.id)}
      style={[{ width, borderRadius: 16, overflow: 'hidden', backgroundColor: '#2A2C2F' }, cardBorder, cardShadow]}>
      <View style={{ height: 116 }}>
        <Image source={{ uri: hotel.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
        <HeartButton size={24} style={{ position: 'absolute', top: 11, right: 10 }} />
        {hotel.bestDeal ? (
          <View style={{ position: 'absolute', right: 10, bottom: 9, borderRadius: 6, overflow: 'hidden' }}>
            <BlurView intensity={30} tint="dark">
              <Badge variant="deal" label="Best deal!" className="bg-black/20" textClassName="text-[11px]" />
            </BlurView>
          </View>
        ) : null}
      </View>
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 10 }}>
        <Text className="font-dm-medium text-[14px] leading-[21px]" numberOfLines={1}>
          {hotel.name}
        </Text>
        <View className="flex-row items-center" style={{ gap: 5, height: 19 }}>
          <Text className="font-dm-medium text-[12.5px] text-white/90">{formatMoney(hotel.price)}/Night</Text>
          {hotel.discount ? <Badge variant="discount" label={`${hotel.discount}% OFF`} /> : null}
        </View>
        {hotel.oldPrice && hotel.discount ? (
          <Text className="text-[11.5px] leading-[14px] text-white/40 line-through">{formatMoney(hotel.oldPrice)}</Text>
        ) : (
          <View style={{ height: 14 }} />
        )}
        <Progress value={(hotel.rating / 5) * 100 - 4} height={4} className="mt-[7px]" />
        <Rating value={hotel.rating} reviews={hotel.reviews} size="sm" className="mt-[3px]" />
      </View>
    </Pressable>
  );
}

/* ───────────────────────── Search: list (large) card ───────────────────────── */
export function ListHotelCard({
  hotel,
  price,
  oldPrice,
  discount,
  rating,
}: {
  hotel: Hotel;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
}) {
  return (
    <Pressable
      onPress={() => openHotel(hotel.id)}
      style={[{ height: 219, borderRadius: 18, overflow: 'hidden', backgroundColor: '#2A2C2F' }, cardBorder]}>
      <Image source={{ uri: hotel.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      <LinearGradient
        colors={['transparent', 'rgba(20,22,24,0.3)', 'rgba(20,22,24,0.75)']}
        locations={[0.3, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />
      <HeartButton size={24} style={{ position: 'absolute', top: 11, right: 10 }} />
      <View style={{ position: 'absolute', left: 16, right: 16, bottom: 19 }}>
        <Text className="font-dm-medium text-[18px] leading-[24px]">{hotel.name}</Text>
        <Progress value={(rating / 5) * 100 - 0.5} height={5} className="mt-[6px]" />
        <View className="mt-[7px] flex-row items-center justify-between">
          <Rating value={rating} reviews={hotel.reviews} size="md" />
          <View className="items-end">
            <Text className="font-dm-medium text-[17px] leading-[22px]">{formatMoney(price)}/Night</Text>
            {oldPrice ? (
              <View className="flex-row items-center" style={{ gap: 6 }}>
                <Text className="text-[13px] text-white/40 line-through">{formatMoney(oldPrice)}</Text>
                {discount ? <Badge variant="discount" label={`${discount}% OFF`} /> : null}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
