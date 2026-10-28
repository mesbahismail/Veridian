import * as React from 'react';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Text, TextClassContext } from '@/components/ui/text';

const badgeVariants = cva('items-center justify-center self-start', {
  variants: {
    variant: {
      /** "Best deal!" — teal outline */
      deal: 'rounded-[6px] border border-teal-deal/60 bg-teal/10 px-[6px] py-[1px]',
      /** "15% OFF" — solid red */
      discount: 'rounded-[3px] bg-destructive px-[4px] py-[1.5px]',
      outline: 'rounded-full border border-white/30 px-2 py-0.5',
    },
  },
  defaultVariants: { variant: 'deal' },
});

const badgeTextVariants = cva('font-dm-medium', {
  variants: {
    variant: {
      deal: 'text-[13px] text-teal-deal',
      discount: 'font-dm-bold text-[8.5px] leading-[10px] text-white',
      outline: 'text-[12px] text-white',
    },
  },
  defaultVariants: { variant: 'deal' },
});

type BadgeProps = VariantProps<typeof badgeVariants> & { className?: string; label: string; textClassName?: string };

function Badge({ variant, className, label, textClassName }: BadgeProps) {
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <View className={cn(badgeVariants({ variant }), className)}>
        <Text className={textClassName}>{label}</Text>
      </View>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeVariants };
