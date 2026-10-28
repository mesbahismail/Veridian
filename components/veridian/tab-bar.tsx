import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { CircleUserRound, Compass, Search } from 'lucide-react-native';
import { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients } from '@/lib/theme';

/** Colour of the bar behind the icons; the filled icons use it for their cut-outs. */
const BAR = '#2A2E2F';
/** Opaque so the stroke and fill of the filled icons don't stack into a lighter ring. */
const INACTIVE = '#76777A';
// Inner shapes of Lucide's Compass / CircleUserRound, redrawn on top of the filled disc.
const NEEDLE = 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z';
const SHOULDERS = 'M17.925 20.056a6 6 0 0 0-11.851.001';

/** The design draws Browse and Profile as solid discs with dark cut-outs, and Search as a bold outline. */
function TabIcon({ name, tone, children }: { name: string; tone: string; children?: React.ReactNode }) {
  const common = { size: 34, strokeWidth: 1.9, color: tone };
  if (name === 'search')
    return (
      <Search {...common} strokeWidth={2.4}>
        {children}
      </Search>
    );
  if (name === 'profile')
    return (
      <CircleUserRound {...common} fill={tone}>
        {children}
        <Path d={SHOULDERS} fill={tone} stroke={BAR} strokeWidth={1.6} />
        <Circle cx={12} cy={11} r={4} fill={tone} stroke={BAR} strokeWidth={1.6} />
      </CircleUserRound>
    );
  return (
    <Compass {...common} fill={tone}>
      {children}
      <Path d={NEEDLE} fill={BAR} stroke={BAR} strokeWidth={1} />
      <Circle cx={12} cy={12} r={1.1} fill={tone} stroke="none" />
    </Compass>
  );
}

/** Frosted bottom bar; the active tab gets a teal indicator and a brand-gradient icon. */
export function VeridianTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'rgba(255,255,255,0.1)',
      }}>
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(52,54,57,0.82)' }]} />
      <View style={{ flexDirection: 'row', paddingHorizontal: 25, height: 74 + insets.bottom, paddingBottom: insets.bottom }}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return (
            <Pressable key={route.key} onPress={onPress} style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: 60,
                  height: 3,
                  backgroundColor: focused ? colors.tealDeal : 'transparent',
                }}
              />
              <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 3 }}>
                <TabIcon name={route.name} tone={focused ? `url(#tab-active-${route.name})` : INACTIVE}>
                  {focused ? (
                    <Defs>
                      <LinearGradient
                        id={`tab-active-${route.name}`}
                        gradientUnits="userSpaceOnUse"
                        x1="6"
                        y1="2"
                        x2="18"
                        y2="22">
                        {gradients.logo.map((c, i) => (
                          <Stop key={c + i} offset={gradients.logoStops[i]} stopColor={c} />
                        ))}
                      </LinearGradient>
                    </Defs>
                  ) : null}
                </TabIcon>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
