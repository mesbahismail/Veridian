import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Bell, ChevronLeft, Settings, type LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/theme';

export function IconButton({
  icon: Icon,
  onPress,
  size = 24,
  color = colors.icon,
  strokeWidth = 2,
  fill,
}: {
  icon: LucideIcon;
  onPress?: () => void;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={12} className="items-center justify-center">
      <Icon size={size} color={color} strokeWidth={strokeWidth} fill={fill ?? 'none'} />
    </Pressable>
  );
}

/** Bell with the teal "unread" dot that sits just above the header hairline. */
export function BellButton() {
  return (
    <Pressable hitSlop={12} style={{ width: 22, height: 22 }}>
      <Bell size={22} color={colors.icon} strokeWidth={2} />
      <View
        style={{
          position: 'absolute',
          top: 33,
          left: 8.5,
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: colors.tealDeal,
        }}
      />
    </Pressable>
  );
}

export function GearButton({ onPress }: { onPress?: () => void }) {
  return <IconButton icon={Settings} onPress={onPress ?? (() => router.push('/settings'))} />;
}

/** `inset` is the chevron's left margin; the booking steps sit it a few points further in. */
export function BackButton({ onPress, inset = -5 }: { onPress?: () => void; inset?: number }) {
  return (
    <View style={{ marginLeft: inset }}>
      <IconButton
        icon={ChevronLeft}
        size={34}
        strokeWidth={1.6}
        color="rgba(255,255,255,0.75)"
        onPress={onPress ?? (() => router.back())}
      />
    </View>
  );
}

/** Centered-title header (56pt row + 8pt breathing room) with a hairline, safe-area aware. */
export function ScreenHeader({
  title,
  left,
  right,
  divider = true,
  className,
}: {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  divider?: boolean;
  className?: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: 8 }}
      className={cn(divider && 'border-b border-white/[0.18]', className)}>
      <View className="h-[56px] flex-row items-center justify-between px-4">
        <View className="w-14 items-start">{left}</View>
        <Text className="font-dm-medium text-[17px] text-white/90" numberOfLines={1}>
          {title}
        </Text>
        <View className="w-14 items-end">{right}</View>
      </View>
    </View>
  );
}
