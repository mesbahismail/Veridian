import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Heart } from 'lucide-react-native';
import { colors } from '@/lib/theme';

/** Frosted circular favourite toggle that sits on photos. */
export function HeartButton({ size = 24, style }: { size?: number; style?: object }) {
  const [liked, setLiked] = React.useState(false);
  return (
    <Pressable
      onPress={() => setLiked((v) => !v)}
      hitSlop={8}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.4)',
        },
        style,
      ]}>
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      {/* wrapped so it stacks above the absolutely positioned blur on web */}
      <View style={{ marginTop: 1 }}>
        <Heart
          size={size * 0.56}
          strokeWidth={2}
          color={liked ? colors.tealDeal : '#fff'}
          fill={liked ? colors.tealDeal : 'none'}
        />
      </View>
    </Pressable>
  );
}
