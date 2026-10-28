import * as React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { ScreenHeader, GearButton, BellButton } from '@/components/veridian/screen-header';
import { GradientIconTile } from '@/components/veridian/diamond-logo';
import { useScreenSize } from '@/lib/device-frame';
import { images } from '@/lib/images';

/** The design crops the background photo a little tighter, anchored to the top. */
const PHOTO_ZOOM = 1.06;

const SUGGESTIONS = ['Sea view hotel', 'Mountains Inn', 'House by the sea', 'City lofts'];

/** 05 — Search (tab landing) */
export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useScreenSize();
  const [query, setQuery] = React.useState('');

  const go = (q: string) => router.push({ pathname: '/search-results', params: { q: q || 'Ocean' } });

  return (
    <View className="flex-1 overflow-hidden bg-background">
      <Image
        source={{ uri: images.searchBg }}
        style={{ position: 'absolute', top: 0, left: (width * (1 - PHOTO_ZOOM)) / 2, width: width * PHOTO_ZOOM, height: height * PHOTO_ZOOM }}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['rgba(27,28,30,0.45)', 'rgba(27,28,30,0.12)', 'rgba(27,28,30,0.7)', 'rgba(27,28,30,0.9)']}
        locations={[0, 0.35, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />
      <BlurView intensity={25} tint="dark" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top + 64 }} />
      <ScreenHeader title="Search" left={<GearButton />} right={<BellButton />} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="px-4 pt-[33px]">
          <GradientIconTile size={57} />
          <Text className="mt-[26px] text-[16px] leading-[22px] text-white/85">What are you looking for?</Text>
          <Text className="mt-[10px] text-[24px] leading-[32px]">
            {'Find the perfect hotel for\nan unforgettable weekend\ngetaway.'}
          </Text>
        </View>

        <View className="flex-1" />

        <View style={{ paddingBottom: insets.bottom + 107 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 11 }}>
            {SUGGESTIONS.map((s) => (
              <Pressable key={s} onPress={() => go(s)} className="overflow-hidden rounded-[9px] border border-white/35">
                <BlurView
                  intensity={20}
                  tint="dark"
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingLeft: 9, paddingRight: 10, height: 30, backgroundColor: 'rgba(20,22,23,0.25)' }}>
                  <Plus size={14} strokeWidth={2} color="#fff" />
                  <Text className="text-[14px]">{s}</Text>
                </BlurView>
              </Pressable>
            ))}
          </ScrollView>

          <View className="mt-[25px] px-4">
            <Input
              value={query}
              onChangeText={setQuery}
              placeholder="Type something..."
              placeholderTextColor="rgba(255,255,255,0.55)"
              returnKeyType="search"
              onSubmitEditing={() => go(query)}
              className="text-[16px]"
              containerClassName="h-[52px] rounded-[14px] border-white/35 bg-black/20 pl-4 pr-2"
              trailing={
                <Pressable
                  onPress={() => go(query)}
                  className="h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-white/40 bg-white/10">
                  <Mic size={16} strokeWidth={2} color="#fff" />
                </Pressable>
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
