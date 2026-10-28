import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <View
      className={cn('shrink-0 bg-white/[0.12]', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
    />
  );
}

export { Separator };
