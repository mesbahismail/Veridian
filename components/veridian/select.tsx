import * as React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Check, ChevronDown } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/theme';

/** Field-styled select that opens a frosted option list. */
export function Select({
  value,
  options,
  onChange,
  className,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={cn('h-[43px] flex-row items-center justify-between rounded-[10px] border border-white/25 bg-white/[0.08] pl-4 pr-[18px]', className)}>
        <Text className="text-[15px] text-white/75">{value}</Text>
        <ChevronDown size={16} strokeWidth={2} color="rgba(255,255,255,0.75)" />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        </Pressable>
        <View className="flex-1 justify-center px-10" pointerEvents="box-none">
          <View className="max-h-[360px] overflow-hidden rounded-[18px] border border-white/20 bg-card">
            <ScrollView>
              {options.map((o) => (
                <Pressable
                  key={o}
                  onPress={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className="h-[48px] flex-row items-center justify-between border-b border-white/[0.08] px-5 active:bg-white/5">
                  <Text className="text-[16px]">{o}</Text>
                  {o === value ? <Check size={18} strokeWidth={2.4} color={colors.tealDeal} /> : null}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
