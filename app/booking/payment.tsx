import * as React from 'react';
import { View } from 'react-native';
import { Calendar, CreditCard, Lock, ReceiptText, User, type LucideIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/veridian/section';
import { BookingShell, Block } from '@/components/veridian/booking-shell';
import { formatMoney } from '@/data/hotels';

const LINES = [
  { label: 'Hotel Fee', value: 760 },
  { label: 'Taxes', value: 76 },
  { label: 'Service Fee', value: 22 },
];

/** Formats "4242424242424242" → "4242 4242 4242 4242" */
const fmtCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const fmtExp = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const fieldIcon = (Icon: LucideIcon) => <Icon size={15} strokeWidth={2.2} color="rgba(255,255,255,0.85)" />;

/** 16 — Booking step 3: Payment */
export default function PaymentStep() {
  const [name, setName] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [card, setCard] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [terms, setTerms] = React.useState(false);

  const total = LINES.reduce((s, l) => s + l.value, 0);

  return (
    <BookingShell title="Personal details" step={2} cta="Complete order" onCta={() => router.replace('/booking/confirmed')}>
      <Block className="pb-[27px]">
        <SectionLabel icon={CreditCard} label="Card details" />
        <View className="mt-[17px] pl-7" style={{ gap: 17 }}>
          <Input placeholder="Name on card" value={name} onChangeText={setName} icon={fieldIcon(User)} />
          <View className="flex-row" style={{ gap: 17 }}>
            <Input
              placeholder="Expiration date"
              value={exp}
              onChangeText={(v) => setExp(fmtExp(v))}
              keyboardType="number-pad"
              icon={fieldIcon(Calendar)}
              containerClassName="flex-[184] basis-0"
            />
            <Input
              placeholder="CVC"
              value={cvc}
              onChangeText={(v) => setCvc(v.replace(/\D/g, '').slice(0, 4))}
              keyboardType="number-pad"
              secureTextEntry
              icon={fieldIcon(Lock)}
              containerClassName="flex-[68] basis-0"
            />
          </View>
          <Input
            placeholder="Card number"
            value={card}
            onChangeText={(v) => setCard(fmtCard(v))}
            keyboardType="number-pad"
            icon={fieldIcon(CreditCard)}
          />
          <Checkbox
            checked={remember}
            onCheckedChange={setRemember}
            label="Remember this card for future payments"
            labelClassName="text-[14px] tracking-[0.3px] text-white/90"
            className="ml-[2px] mt-[3px]"
          />
        </View>
      </Block>

      <Block last className="pb-[26px]">
        <SectionLabel icon={ReceiptText} label="Total" />
        <View className="mt-[17px] pl-[30px] pr-[2px]" style={{ gap: 8 }}>
          {LINES.map((l) => (
            <View key={l.label} className="flex-row justify-between">
              <Text className="text-[14px] leading-[18px] tracking-[0.3px] text-white/65">{l.label}</Text>
              <Text className="text-[14px] leading-[18px] text-white/65">{formatMoney(l.value)}</Text>
            </View>
          ))}
        </View>
        <View className="pl-7">
          <Separator className="mb-[18px] mt-[17px] bg-white/20" />
          <View className="flex-row items-center justify-between pl-[2px]">
            <Text className="font-dm-medium text-[24px] leading-[30px]">Total</Text>
            <Text className="font-dm-medium text-[24px] leading-[30px]">{formatMoney(total)}</Text>
          </View>
          <Checkbox
            checked={terms}
            onCheckedChange={setTerms}
            label="I accept all terms and conditions"
            labelClassName="text-[14px] tracking-[0.3px] text-white/90"
            className="ml-[2px] mt-[20px]"
          />
        </View>
      </Block>
    </BookingShell>
  );
}
