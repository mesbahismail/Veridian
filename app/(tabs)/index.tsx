import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenHeader, GearButton, BellButton } from '@/components/veridian/screen-header';
import { SectionHeader, Hairline } from '@/components/veridian/section';
import { FeaturedCarousel } from '@/components/veridian/featured-carousel';
import { NearbyCard, DestinationCard } from '@/components/veridian/hotel-cards';
import { hotels, nearby, destinations } from '@/data/hotels';

/** 03 — Browse (home tab) */
export default function BrowseScreen() {
  const featured = [hotels[0], hotels[2], hotels[3], hotels[4]];
  const more = () => router.push({ pathname: '/search-results', params: { q: 'Ocean' } });

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Browse" left={<GearButton />} right={<BellButton />} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <View className="pt-[21px]">
          <SectionHeader title="What’s near" subtitle="1.2K new spots" onMore={more} />
          <View className="mt-7">
            <FeaturedCarousel data={featured} />
          </View>
        </View>

        <Hairline className="mt-8" />

        <View className="pt-[25px]">
          <SectionHeader title="What’s near" subtitle="1.2K new spots" onMore={more} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingTop: 20 }}>
            {nearby.map((item, i) => (
              <NearbyCard key={i} item={item} />
            ))}
          </ScrollView>
        </View>

        <Hairline className="mt-[25px]" />

        <View className="pt-6">
          <SectionHeader title="Top destinations" subtitle="1.2K new spots" onMore={more} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingTop: 17 }}>
            {destinations.map((d) => (
              <DestinationCard key={d.id} item={d} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
