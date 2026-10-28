import * as React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { SafeAreaFrameContext, SafeAreaInsetsContext } from 'react-native-safe-area-context';

/** iPhone 15 / 16 Pro — the size the Veridian design is drawn at. */
const DEVICE = { width: 393, height: 852 };
const DEVICE_INSETS = { top: 59, bottom: 34, left: 0, right: 0 };
const DEVICE_RECT = { x: 0, y: 0, ...DEVICE };

const ScreenSizeContext = React.createContext<{ width: number; height: number } | null>(null);

/** Size the app is laid out at: the phone frame on desktop web, the window everywhere else. */
export function useScreenSize() {
  const window = useWindowDimensions();
  return React.useContext(ScreenSizeContext) ?? window;
}

/**
 * On a desktop browser, previews the app inside a 393×852 phone frame with iPhone safe-area insets,
 * so it lays out exactly like the design. Native builds and phone-sized browsers render untouched.
 */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  const window = useWindowDimensions();
  if (Platform.OS !== 'web' || window.width < 500) return <>{children}</>;

  const scale = Math.min(1, (window.height - 32) / DEVICE.height);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D0E0F' }}>
      <View
        style={{
          ...DEVICE,
          borderRadius: 52,
          overflow: 'hidden',
          transform: [{ scale }],
          boxShadow: '0 0 0 10px #050505, 0 0 0 11px #2C2E31, 0 30px 80px rgba(0,0,0,0.6)',
        }}>
        <SafeAreaInsetsContext.Provider value={DEVICE_INSETS}>
          <SafeAreaFrameContext.Provider value={DEVICE_RECT}>
            <ScreenSizeContext.Provider value={DEVICE}>{children}</ScreenSizeContext.Provider>
          </SafeAreaFrameContext.Provider>
        </SafeAreaInsetsContext.Provider>
      </View>
    </View>
  );
}
