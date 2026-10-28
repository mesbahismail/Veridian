import * as React from 'react';
import { Animated, Pressable, View } from 'react-native';
import { colors } from '@/lib/theme';

type SwitchProps = { checked: boolean; onCheckedChange: (v: boolean) => void; disabled?: boolean };

/** Veridian switch: a slim track with a round knob (teal track when on). */
function Switch({ checked, onCheckedChange, disabled }: SwitchProps) {
  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.timing(anim, { toValue: checked ? 1 : 0, duration: 180, useNativeDriver: false }).start();
  }, [checked, anim]);

  const left = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 22] });
  const trackColor = anim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0.25)', colors.cyan] });

  return (
    <Pressable
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      hitSlop={10}
      onPress={() => onCheckedChange(!checked)}
      style={{ width: 46, height: 26, justifyContent: 'center' }}>
      <Animated.View style={{ height: 3, borderRadius: 2, marginHorizontal: 2, backgroundColor: trackColor }} />
      <Animated.View
        style={{
          position: 'absolute',
          left,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#55585D',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.35)',
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      />
      <View pointerEvents="none" />
    </Pressable>
  );
}

export { Switch };
