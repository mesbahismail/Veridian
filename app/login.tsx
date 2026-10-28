import * as React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Lock, User, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DiamondMark } from '@/components/veridian/diamond-logo';
import { images } from '@/lib/images';

/** 02 — Login */
export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [save, setSave] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => router.replace('/(tabs)');

  return (
    <View className="flex-1 bg-background">
      <Image source={{ uri: images.loginBg }} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={40} />
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(40,44,44,0.2)' }]} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 16, paddingBottom: insets.bottom + 37 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="h-[31px] flex-row items-center justify-between px-4">
            <DiamondMark size={37} color="#fff" />
            <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
              <X size={30} strokeWidth={1.8} color="#fff" />
            </Pressable>
          </View>

          <View className="mt-[31px] px-4">
            <Text className="font-dm-medium text-[20px] leading-[26px]" style={{ letterSpacing: 3.6 }}>
              LOGIN
            </Text>
            <Text className="mt-[10px] font-dm-bold text-[24px] leading-[31px]">
              {'Find the best hotel to\nspend your upcoming\nweekend.'}
            </Text>
          </View>

          <View className="flex-1" style={{ minHeight: 150 }} />

          <View className="px-4">
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              containerClassName={FIELD}
              placeholderTextColor={PLACEHOLDER}
              icon={<User size={16} strokeWidth={2.2} color="#fff" />}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerClassName={`${FIELD} mt-[21px]`}
              placeholderTextColor={PLACEHOLDER}
              icon={<Lock size={16} strokeWidth={2.2} color="#fff" />}
            />
            <Checkbox checked={save} onCheckedChange={setSave} label="Save login details" size={16} className="ml-2 mt-7" />
            <Button variant="secondary" onPress={login} className="mt-[31px] h-[51px]">
              <Text>Login</Text>
            </Button>

            <View className="mt-7 flex-row items-center px-4" style={{ gap: 22 }}>
              <View className="h-px flex-1 bg-white/45" />
              <Text className="text-[12px] text-white/75" style={{ letterSpacing: 0.5 }}>
                OR
              </Text>
              <View className="h-px flex-1 bg-white/45" />
            </View>

            <View className="mt-[30px] flex-row" style={{ gap: 17 }}>
              <SocialButton onPress={login}>
                <FontAwesome name="apple" size={20} color="#fff" />
              </SocialButton>
              <SocialButton onPress={login}>
                <FontAwesome name="google" size={19} color="#fff" />
              </SocialButton>
              <SocialButton onPress={login}>
                <FontAwesome6 name="x-twitter" brand size={18} color="#fff" />
              </SocialButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/** Frosted light field used only on the login screen */
const FIELD = 'h-[43px] rounded-[10px] border-white/40 bg-white/20 px-4';
const PLACEHOLDER = 'rgba(255,255,255,0.92)';

/** Lucide ships no brand marks, so the Apple / Google / X logos stay on Font Awesome. */
function SocialButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[38px] flex-1 items-center justify-center rounded-[14px] border-[1.5px] border-white/40 active:bg-white/10">
      {children}
    </Pressable>
  );
}
