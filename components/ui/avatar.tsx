import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { cn } from '@/lib/utils';

function Avatar({
  uri,
  size = 40,
  className,
  ring = false,
}: {
  uri: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <View
      className={cn('overflow-hidden rounded-full bg-muted', ring && 'border-2 border-white/40', className)}
      style={{ width: size, height: size }}>
      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
    </View>
  );
}

export { Avatar };
