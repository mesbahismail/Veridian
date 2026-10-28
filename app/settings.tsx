import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { ScreenHeader, GearButton, BellButton } from '@/components/veridian/screen-header';
import { Caption } from '@/components/veridian/section';
import { colors } from '@/lib/theme';

const TABS = ['General', 'Account', 'Bookings', 'Legal', 'Documents'] as const;
type Tab = (typeof TABS)[number];

type Row = { title: string; caption?: string; toggle?: 'discovery' | 'dark' | 'push' | 'email' };

const ROWS: Record<Tab, Row[]> = {
  General: [
    { title: 'Currency', caption: 'USD' },
    { title: 'Language', caption: 'English (US)' },
    { title: 'Notifications', caption: 'Push' },
    { title: 'Home discovery', caption: 'USD', toggle: 'discovery' },
    { title: 'Dark mode', caption: 'Enabled', toggle: 'dark' },
    { title: 'Bookings & History' },
    { title: 'Help & Support' },
    { title: 'Legal' },
  ],
  Account: [
    { title: 'Personal information', caption: 'Veridian Walters' },
    { title: 'Email', caption: 'veridian@mail.com' },
    { title: 'Password', caption: 'Updated 3 months ago' },
    { title: 'Push notifications', caption: 'On', toggle: 'push' },
    { title: 'Email offers', caption: 'Weekly', toggle: 'email' },
    { title: 'Delete account' },
  ],
  Bookings: [
    { title: 'Upcoming', caption: '1 booking' },
    { title: 'Past stays', caption: '12 stays' },
    { title: 'Cancelled', caption: 'None' },
    { title: 'Payment methods', caption: 'Visa •••• 4242' },
  ],
  Legal: [{ title: 'Terms of service' }, { title: 'Privacy policy' }, { title: 'Cookie policy' }, { title: 'Licenses' }],
  Documents: [
    { title: 'ID Card', caption: 'Verified' },
    { title: 'Passport', caption: 'Not uploaded' },
    { title: 'Invoices', caption: '3 files' },
  ],
};

/** 18 — Settings */
export default function SettingsScreen() {
  const [tab, setTab] = React.useState<Tab>('General');
  const [toggles, setToggles] = React.useState({ discovery: true, dark: true, push: true, email: false });

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Settings"
        divider={false}
        left={<GearButton onPress={() => router.back()} />}
        right={<BellButton />}
      />

      {/* tabs */}
      <View className="border-b border-white/[0.18]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, gap: 4 }}>
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <Pressable key={t} onPress={() => setTab(t)} className="px-3 pt-[7px]">
                <Text className={active ? 'text-[17px] leading-[20px] text-white' : 'text-[17px] leading-[20px] text-white/50'}>{t}</Text>
                <View
                  style={{ height: 3, marginTop: 10, marginHorizontal: -12, backgroundColor: active ? colors.cyan : 'transparent' }}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 12, paddingBottom: 60 }}>
        {ROWS[tab].map((row) => (
          <Pressable
            key={row.title}
            onPress={row.toggle ? () => setToggles((s) => ({ ...s, [row.toggle!]: !s[row.toggle!] })) : undefined}
            className="h-[66px] flex-row items-center justify-between px-4 active:bg-white/5">
            <View style={{ gap: 6 }}>
              <Text className="font-dm-medium text-[19.5px] leading-[23px]">{row.title}</Text>
              {row.caption ? <Caption className="text-[9.5px] leading-[12px] text-white/55">{row.caption}</Caption> : null}
            </View>
            {row.toggle ? (
              <Switch
                checked={toggles[row.toggle]}
                onCheckedChange={(v) => setToggles((s) => ({ ...s, [row.toggle!]: v }))}
              />
            ) : (
              <ChevronRight size={22} strokeWidth={2} color="rgba(255,255,255,0.7)" style={{ marginRight: 1 }} />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
