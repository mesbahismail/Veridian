import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AppIconTile } from '@/components/veridian/diamond-logo';
import { useScreenSize } from '@/lib/device-frame';
import { images } from '@/lib/images';

/** The design crops the photo 1.2× larger, anchored to the top and a little left of centre. */
const PHOTO_ZOOM = 1.2;

/** 01 — Welcome / onboarding */
export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useScreenSize();
  return (
    <View className="flex-1 overflow-hidden bg-background">
      <Image
        source={{ uri: images.welcome }}
        style={{ position: 'absolute', top: 0, left: width * (1 - PHOTO_ZOOM) * 0.375, width: width * PHOTO_ZOOM, height: height * PHOTO_ZOOM }}
        contentFit="cover"
        transition={300}
      />
      {/* the design dims the whole photo so type and buttons read */}
      <LinearGradient
        colors={['rgba(16,17,18,0.4)', 'rgba(16,17,18,0.5)', 'rgba(16,17,18,0.5)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={{ paddingTop: insets.top + 49 }} className="px-4">
        <AppIconTile size={84} />
        <Text className="mt-8 font-dm-medium text-[20px] leading-[26px]" style={{ letterSpacing: 3.6 }}>
          VERIDIAN
        </Text>
        <Text className="mt-2 text-[30px] leading-[40px]">{'Home is not a place,\nIt’s a feeling.'}</Text>
      </View>

      <View className="flex-1" />

      <View className="gap-[26px] px-4" style={{ paddingBottom: insets.bottom + 37 }}>
        <Button variant="secondary" onPress={() => router.push('/login')}>
          <Text>Create new account</Text>
        </Button>
        <Button variant="outline" onPress={() => router.push('/login')}>
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
}
