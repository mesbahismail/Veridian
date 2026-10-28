import * as React from 'react';
import { Animated, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScreenHeader, BackButton } from '@/components/veridian/screen-header';
import { BookingSteps } from '@/components/veridian/booking-steps';

const CHECK = '#38C9AC';

/** 17 — Booking confirmed */
export default function ConfirmedScreen() {
  const insets = useSafeAreaInsets();
  const scale = React.useRef(new Animated.Value(0.6)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  const done = () => {
    router.dismissTo('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Personal details" left={<BackButton onPress={done} inset={-1} />} divider={false} />
      <BookingSteps current={3} />
      <View className="flex-1 items-center justify-center px-6" style={{ paddingBottom: 32 }}>
        <Animated.View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 1.5,
            borderColor: CHECK,
            backgroundColor: '#1D312F',
            alignItems: 'center',
            justifyContent: 'center',
            opacity,
            transform: [{ scale }],
          }}>
          <Check size={36} strokeWidth={2.2} color={CHECK} />
        </Animated.View>
        <Text className="mt-6 text-center text-[25px] leading-[30px]">Your booking is confirmed!</Text>
        <Text className="mt-[9px] text-center text-[14px] leading-[21px] text-white/55">
          We’ve secured your stay — check your confirmation details anytime in the app.
        </Text>
        <Button size="sm" onPress={done} className="mt-[23px] h-[38px] rounded-[10px] px-[14px]">
          <Check size={17} strokeWidth={2.4} color="#fff" />
          <Text className="text-[14px]">Got it</Text>
        </Button>
      </View>
      {/* empty CTA bar: the design keeps its top hairline just above the home indicator */}
      <View className="border-t border-white/[0.18]" style={{ height: Math.max(insets.bottom - 11, 12) }} />
    </View>
  );
}
