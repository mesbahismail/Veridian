import * as React from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/theme';
import { cn } from '@/lib/utils';

const STEPS = ['My room', 'My details', 'Payment'];

/** 3-step progress: done = teal check, current = filled grey, upcoming = outline. `current` = 0..3 (3 = all done) */
export function BookingSteps({ current }: { current: number }) {
  return (
    <View className="border-b border-white/[0.18] px-11 pb-[14px] pt-1">
      <View className="flex-row items-center">
        {STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <React.Fragment key={s}>
              {i > 0 ? (
                <View style={{ flex: 1, height: 2, backgroundColor: i <= current ? colors.teal : 'rgba(255,255,255,0.3)' }} />
              ) : null}
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: active ? 0 : 1.5,
                  borderColor: done ? colors.teal : 'rgba(255,255,255,0.45)',
                  backgroundColor: done ? colors.teal : active ? '#57595D' : 'transparent',
                }}>
                {done ? <Check size={14} strokeWidth={2.6} color="#fff" /> : null}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <View className="mt-2 flex-row justify-between" style={{ marginHorizontal: -38 }}>
        {STEPS.map((s, i) => (
          <Text
            key={s}
            className={cn(
              'w-[100px] text-center text-[13px] leading-[18px]',
              i < current ? 'font-dm-medium text-teal-deal' : i === current ? 'font-dm-medium text-white' : 'text-white/45'
            )}>
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
}
