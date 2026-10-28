import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScreenHeader, BackButton } from '@/components/veridian/screen-header';
import { BookingSteps } from '@/components/veridian/booking-steps';
import { cn } from '@/lib/utils';

/** Shared frame for the 3 booking steps: header, stepper, scroll body and sticky CTA. */
export function BookingShell({
  title,
  step,
  cta,
  onCta,
  children,
}: {
  title: string;
  step: number;
  cta: string;
  onCta: () => void;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={title} left={<BackButton inset={-1} />} divider={false} />
      <BookingSteps current={step} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
        <View className="border-t border-white/[0.18] px-4 pt-[21px]" style={{ paddingBottom: insets.bottom + 10 }}>
          <Button onPress={onCta}>
            <Text>{cta}</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/** A divided form section; content below the label is indented to the label text (x = 44). */
export function Block({ children, last, className }: { children: React.ReactNode; last?: boolean; className?: string }) {
  return (
    <View className={cn('px-4 pb-6 pt-[22px]', !last && 'border-b border-white/[0.18]', className)}>{children}</View>
  );
}
