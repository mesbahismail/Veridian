import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '@/lib/utils';

/** Lets parents (e.g. Button) set the class of nested <Text> — same API as react-native-reusables. */
export const TextClassContext = React.createContext<string | undefined>(undefined);

export type TextProps = React.ComponentProps<typeof RNText> & { className?: string };

export function Text({ className, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  return <RNText className={cn('font-dm text-base text-foreground', textClass, className)} {...props} />;
}
