import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { TextClassContext } from '@/components/ui/text';
import { gradients } from '@/lib/theme';

const buttonVariants = cva('flex-row items-center justify-center gap-2 overflow-hidden', {
  variants: {
    variant: {
      /** Teal glossy CTA — "Book a room", "Continue", "Save filters" */
      default: 'border-2 border-[#8DE0D0] bg-[#08BA96]',
      /** White glossy — "Create new account", "Login" */
      secondary: 'border border-white/90',
      /** Transparent with soft white stroke — onboarding "Login" */
      outline: 'border-[1.5px] border-white/45 bg-transparent',
      /** Dark glass pill — "More >", social buttons */
      glass: 'border border-white/30 bg-white/5',
      ghost: 'bg-transparent',
    },
    size: {
      default: 'h-[50px] rounded-[14px] px-5',
      lg: 'h-[52px] rounded-[14px] px-6',
      sm: 'h-9 rounded-[10px] px-3.5',
      pill: 'h-9 rounded-full px-4',
      icon: 'h-8 w-8 rounded-[10px]',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

const buttonTextVariants = cva('font-dm-medium', {
  variants: {
    variant: {
      default: 'text-white text-[16px]',
      secondary: 'text-[#1B1C1E] text-[16px]',
      outline: 'text-white text-[16px]',
      glass: 'text-white text-[14px]',
      ghost: 'text-white text-[15px]',
    },
    size: { default: '', lg: '', sm: 'text-[14px]', pill: 'text-[14px]', icon: '' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & { className?: string; children?: React.ReactNode };

function Button({ className, variant, size, children, disabled, ...props }: ButtonProps) {
  const v = variant ?? 'default';
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        role="button"
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), 'active:opacity-80', disabled && 'opacity-50', className)}
        {...props}>
        {v === 'secondary' ? (
          <LinearGradient colors={gradients.whiteButton} style={StyleSheet.absoluteFill} />
        ) : null}
        <View className="flex-row items-center justify-center gap-2">{children as React.ReactNode}</View>
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
