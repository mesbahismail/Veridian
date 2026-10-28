import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { CalendarCheck, ChevronRight, Heart, MapPin, Pencil, Power, Star, type LucideIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScreenHeader, GearButton, BellButton } from '@/components/veridian/screen-header';
import { images } from '@/lib/images';

type Item = { icon: LucideIcon; filled?: boolean; label: string; onPress?: () => void };

/** 17 — My profile */
export default function ProfileScreen() {
  const items: Item[] = [
    { icon: Heart, label: 'My favorites', onPress: () => router.push({ pathname: '/search-results', params: { q: 'Favorites' } }) },
    { icon: CalendarCheck, label: 'My bookings', onPress: () => router.push('/settings') },
    { icon: Star, filled: true, label: 'My reviews', onPress: () => router.push({ pathname: '/hotel/[id]', params: { id: 'celadon', reviews: '1' } }) },
    { icon: Power, label: 'Logout', onPress: () => router.replace('/') },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="My profile" left={<GearButton />} right={<BellButton />} />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View className="items-center pt-7">
          <View className="rounded-full border-[3px] border-white/30 p-[3px]">
            <Avatar uri={images.avatars.profile} size={127} />
          </View>
          <Text className="mt-[14px] font-dm-medium text-[26px] leading-[30px]">Veridian Walters</Text>
          <View className="mt-[10px] h-[29px] flex-row items-center rounded-[8px] border border-white/25 bg-white/10 px-2" style={{ gap: 6 }}>
            <MapPin size={13} strokeWidth={2.2} color="rgba(255,255,255,0.8)" />
            <Text className="text-[13px] text-white/90" style={{ letterSpacing: 0.35 }}>
              Stockholm, Sweden
            </Text>
          </View>
          <Button size="sm" className="mt-[22px] h-[39px] rounded-[10px] px-[14px]">
            <Pencil size={15} strokeWidth={2.2} color="#fff" />
            <Text className="text-[15px]">Edit</Text>
          </Button>
        </View>

        <View className="mx-4 mt-[45px] overflow-hidden rounded-[18px] border border-white/25 bg-card py-[6px]">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Pressable key={item.label} onPress={item.onPress} className="flex-row items-center pl-5 active:bg-white/5">
                <Icon
                  size={20}
                  strokeWidth={1.9}
                  color="rgba(255,255,255,0.75)"
                  fill={item.filled ? 'rgba(255,255,255,0.75)' : 'none'}
                />
                <View
                  className="ml-[15px] mr-5 flex-1 flex-row items-center justify-between"
                  style={{
                    height: 56,
                    borderBottomWidth: i < items.length - 1 ? 1 : 0,
                    borderColor: 'rgba(255,255,255,0.18)',
                  }}>
                  <Text className="text-[16px]">{item.label}</Text>
                  <ChevronRight size={18} strokeWidth={2} color="rgba(255,255,255,0.6)" style={{ marginRight: 2 }} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
