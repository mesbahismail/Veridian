import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/** "4.6/5  24 Reviews" */
export function Rating({
  value,
  reviews,
  size = 'md',
  onPressReviews,
  className,
}: {
  value: number;
  reviews?: number | string;
  size?: 'sm' | 'md' | 'lg';
  onPressReviews?: () => void;
  className?: string;
}) {
  const big = size === 'lg' ? 'text-[26px]' : size === 'md' ? 'text-[22px]' : 'text-[19px]';
  const small = size === 'lg' ? 'text-[10px]' : 'text-[9px]';
  return (
    <View className={cn('flex-row items-baseline', className)}>
      <Text className={cn('font-dm-medium', big)}>{value.toFixed(1)}</Text>
      <Text className={cn('text-white/40', big)}>/5</Text>
      {reviews !== undefined ? (
        <Pressable onPress={onPressReviews} disabled={!onPressReviews} hitSlop={8}>
          <Text className={cn('ml-2 text-white/55 underline', small)}>
            {typeof reviews === 'number' ? `${reviews} Reviews` : reviews}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
