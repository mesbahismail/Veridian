import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/theme';

type InputProps = React.ComponentProps<typeof TextInput> & {
  className?: string;
  containerClassName?: string;
  /** Leading icon (rendered before the field) */
  icon?: React.ReactNode;
  /** Trailing slot (clear button, mic…) */
  trailing?: React.ReactNode;
};

function Input({ className, containerClassName, icon, trailing, ...props }: InputProps) {
  return (
    <View
      className={cn(
        'h-[43px] flex-row items-center gap-2.5 rounded-[10px] border border-white/25 bg-white/[0.08] px-[15px]',
        containerClassName
      )}>
      {/* keep the icon at full size in narrow fields (web text inputs have an intrinsic min width) */}
      {icon ? <View className="shrink-0">{icon}</View> : null}
      <TextInput
        className={cn('min-w-0 flex-1 font-dm text-[15px] text-white', className)}
        placeholderTextColor="rgba(255,255,255,0.7)"
        selectionColor={colors.teal}
        {...props}
      />
      {trailing}
    </View>
  );
}

export { Input };
export type { InputProps };
