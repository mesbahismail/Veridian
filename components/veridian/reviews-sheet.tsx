import * as React from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { reviews } from '@/data/hotels';
import { useScreenSize } from '@/lib/device-frame';

/** 13 — Reviews bottom sheet. Rendered in-screen (not a Modal) so it stays inside the web device frame. */
export function ReviewsSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { height } = useScreenSize();
  const progress = React.useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [mounted, setMounted] = React.useState(visible);

  React.useEffect(() => {
    if (visible) setMounted(true);
    Animated.timing(progress, { toValue: visible ? 1 : 0, duration: 260, useNativeDriver: true }).start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
  }, [visible, progress]);

  if (!mounted) return null;

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] });

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: insets.top + 74,
          left: 0,
          right: 0,
          bottom: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: 'rgba(255,255,255,0.14)',
          backgroundColor: 'rgba(44,46,49,0.96)',
          overflow: 'hidden',
          transform: [{ translateY }],
        }}>
        <Pressable onPress={onClose} className="items-center pb-[13px] pt-[10px]" hitSlop={10}>
          <View className="h-[5px] w-[40px] rounded-full bg-white/35" />
        </Pressable>
        <Text className="px-5 pb-[22px] pt-[8px] text-[24px] leading-[30px]">
          Reviews <Text className="text-[24px] text-white/50">13</Text>
        </Text>
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40, gap: 16 }} showsVerticalScrollIndicator={false}>
          {[...reviews, ...reviews.slice(0, 2)].map((r, i) => (
            <View key={`${r.id}-${i}`} className="flex-row items-start" style={{ paddingRight: 20 }}>
              {/* the avatar column runs off the left edge, as in the design */}
              <View style={{ width: 62, paddingTop: 9 }}>
                <Avatar uri={r.avatar} size={52} ring className="-ml-[4px]" />
              </View>
              <View className="flex-1 rounded-[16px] border border-white/20 bg-white/[0.04] pb-[18px] pl-[19px] pr-5 pt-[18px]">
                <View className="flex-row items-start justify-between">
                  <View>
                    <Text className="font-dm-medium text-[15px] leading-[20px]">{r.name}</Text>
                    <Text className="mt-[3px] font-dm-medium text-[10.5px] text-white/50" style={{ letterSpacing: 0.25 }}>
                      {r.date}
                    </Text>
                  </View>
                  <View className="items-end pt-[3px]" style={{ width: 87 }}>
                    <Text className="font-dm-medium text-[21px] leading-[26px]">
                      {r.rating.toFixed(1)}
                      <Text className="font-dm text-[21px] text-white/45"> /5</Text>
                    </Text>
                    <Progress value={(r.rating / 5) * 100 - 6} className="mt-[3px]" />
                  </View>
                </View>
                <Text className="-mr-[6px] mt-[16px] text-[12.5px] leading-[16.5px] text-white/90" style={{ letterSpacing: 0.3 }}>
                  {r.text}
                </Text>
                {r.photos.length ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-[2px] mt-[14px]" contentContainerStyle={{ gap: 12 }}>
                    {r.photos.map((p) => (
                      <Image
                        key={p}
                        source={{ uri: p }}
                        style={{ width: 100, height: 100, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}
                        contentFit="cover"
                      />
                    ))}
                  </ScrollView>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}
