import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Clock, IdCard, Mail, Newspaper, User, Users, BookUser, type LucideIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { SectionLabel } from '@/components/veridian/section';
import { Select } from '@/components/veridian/select';
import { BookingShell, Block } from '@/components/veridian/booking-shell';
import { cn } from '@/lib/utils';

const HOURS = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

const fieldIcon = (Icon: LucideIcon) => <Icon size={15} strokeWidth={2.2} color="rgba(255,255,255,0.85)" />;

/** 15 — Booking step 2: Personal details */
export default function DetailsStep() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cin, setCin] = React.useState('');
  const [doc, setDoc] = React.useState<'id' | 'passport' | null>(null);
  const [hour, setHour] = React.useState('9:00');
  const [ampm, setAmpm] = React.useState('AM');

  return (
    <BookingShell title="Personal details" step={1} cta="Continue" onCta={() => router.push('/booking/payment')}>
      <Block className="pb-[23px]">
        <SectionLabel icon={Users} label="Personal details" />
        <View className="mt-[17px] pl-7" style={{ gap: 17 }}>
          <Input placeholder="Full name" value={name} onChangeText={setName} icon={fieldIcon(User)} />
          <Input placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" icon={fieldIcon(Mail)} />
          <Input placeholder="CIN number" value={cin} onChangeText={setCin} icon={fieldIcon(IdCard)} />
        </View>
      </Block>

      <Block>
        <SectionLabel icon={Newspaper} label="Documents" />
        <View className="mt-[17px] flex-row pl-7" style={{ gap: 17 }}>
          <DocTile label="ID Card" icon={IdCard} active={doc === 'id'} onPress={() => setDoc('id')} />
          <DocTile label="Passport" icon={BookUser} active={doc === 'passport'} onPress={() => setDoc('passport')} />
        </View>
      </Block>

      <Block last className="pt-[20px]">
        <SectionLabel icon={Clock} label="Arrival time" />
        <View className="mt-[17px] flex-row pl-7" style={{ gap: 17 }}>
          <Select value={hour} options={HOURS} onChange={setHour} className="flex-[163] basis-0" />
          <Select value={ampm} options={['AM', 'PM']} onChange={setAmpm} className="flex-[81] basis-0" />
        </View>
      </Block>
    </BookingShell>
  );
}

function DocTile({
  label,
  icon: Icon,
  active,
  onPress,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'h-[97px] flex-1 items-center justify-center rounded-[14px] border',
        active ? 'border-teal-light bg-teal/25' : 'border-white/25 bg-white/[0.08]'
      )}
      style={{ gap: 10 }}>
      <Icon size={17} strokeWidth={2} color="rgba(255,255,255,0.85)" />
      <Text className="text-[15px] text-white/80">{label}</Text>
    </Pressable>
  );
}
