import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  size?: number;
};

function Checkbox({ checked, onCheckedChange, label, className, labelClassName, disabled, size = 18 }: CheckboxProps) {
  return (
    <Pressable
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      hitSlop={6}
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-2.5', className)}>
      <View
        className={cn(
          'items-center justify-center rounded-[4px] border-[1.5px]',
          checked ? 'border-teal bg-teal' : 'border-white/70 bg-transparent'
        )}
        style={{ width: size, height: size }}>
        {checked ? <Check size={size - 5} strokeWidth={2.6} color="#fff" /> : null}
      </View>
      {label ? <Text className={cn('text-[14px] text-white/90', labelClassName)}>{label}</Text> : null}
    </Pressable>
  );
}

export { Checkbox };
