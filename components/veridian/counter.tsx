import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

/** "[−] 1 [+]" stepper used for Adults / Kids. */
export function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <View className="items-center" style={{ gap: 9 }}>
      <Text className="text-[15px] leading-[20px]">{label}</Text>
      <View className="h-[34px] w-[105px] flex-row items-center justify-between rounded-[10px] border border-white/30 px-[4px]">
        <Btn icon={Minus} disabled={value <= min} onPress={() => onChange(Math.max(min, value - 1))} />
        <Text className="text-[16px]">{value}</Text>
        <Btn icon={Plus} disabled={value >= max} onPress={() => onChange(Math.min(max, value + 1))} />
      </View>
    </View>
  );
}

function Btn({ icon: Icon, onPress, disabled }: { icon: typeof Plus; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      className="h-[26px] w-[26px] items-center justify-center rounded-[7px] border border-white/40 bg-white/60">
      <Icon size={16} strokeWidth={2.2} color="#1B1C1E" />
    </Pressable>
  );
}
