import * as React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/** Uppercase, letter-spaced label with leading icon — "FIND A DATE", "ABOUT"… Text starts at x=44. */
export function SectionLabel({
  icon: Icon,
  label,
  filled = false,
  className,
}: {
  icon: LucideIcon;
  label: string;
  /** Solid glyph (star, pin) instead of an outline */
  filled?: boolean;
  className?: string;
}) {
  return (
    <View className={cn('flex-row items-center', className)}>
      <View style={{ width: 28 }}>
        <Icon
          size={18}
          strokeWidth={1.8}
          color="rgba(255,255,255,0.6)"
          fill={filled ? 'rgba(255,255,255,0.6)' : 'none'}
        />
      </View>
      <Text className="font-dm-medium text-[12px] text-white/85" style={{ letterSpacing: 2.6 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

/** Small spaced caption — "1.2K NEW SPOTS", "USD" */
export function Caption({ children, className }: { children: string; className?: string }) {
  return (
    <Text className={cn('font-dm-medium text-[11px] text-white/45', className)} style={{ letterSpacing: 2.2 }}>
      {children.toUpperCase()}
    </Text>
  );
}

/** "What's near / 1.2K NEW SPOTS  [More >]" */
export function SectionHeader({
  title,
  subtitle,
  onMore,
}: {
  title: string;
  subtitle: string;
  onMore?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between px-4">
      <View style={{ gap: 5 }}>
        <Text className="text-[24px] leading-[30px]">{title}</Text>
        <Caption>{subtitle}</Caption>
      </View>
      <Pressable
        onPress={onMore}
        hitSlop={6}
        className="h-[31px] w-[79px] flex-row items-center justify-center rounded-[10px] border border-white/25 active:bg-white/5"
        style={{ gap: 9, paddingLeft: 4 }}>
        <Text className="text-[15px] text-white/90">More</Text>
        <ChevronRight size={14} strokeWidth={1.8} color="rgba(255,255,255,0.6)" />
      </Pressable>
    </View>
  );
}

/** Full-bleed divider used between screen sections */
export function Hairline({ className }: { className?: string }) {
  return <View className={cn('h-px bg-white/[0.18]', className)} />;
}
