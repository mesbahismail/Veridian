import * as React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cn } from '@/lib/utils';
import { gradients } from '@/lib/theme';

/** Rating bar: grey track with a cyan→teal gradient fill. */
function Progress({ value, className, height = 4 }: { value: number; className?: string; height?: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={cn('w-full overflow-hidden rounded-full bg-white/25', className)} style={{ height }}>
      <LinearGradient
        colors={gradients.bar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: `${pct}%`, height: '100%', borderRadius: height }}
      />
    </View>
  );
}

export { Progress };
