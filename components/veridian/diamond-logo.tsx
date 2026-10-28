import * as React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';
import { gradients } from '@/lib/theme';

/** Veridian brand mark — same path as assets/veridian-logo.svg, with the viewBox cropped to the glyph. */
const LOGO_PATH =
  'M81.9668 33L0 109.722L88.208 47.2744L125.901 53.3281L81.9668 109.722L142.951 58.5742H174.426L236.065 115.623H100.328L232.131 126.771L174.426 227.099L248.524 126.771L293.114 120.213L158.688 259.229L24.2617 143.164L158.688 286.771L320 115.623L232.131 33H81.9668ZM292.131 108.225L250.491 114.312L190.164 56.6064L224.918 47.4258L292.131 108.225Z';
const VIEW_W = 320;
const VIEW_H = 253.771;

/** Faceted diamond mark. `gradient` paints it with the brand gradient, otherwise it is filled with `color`. */
export function DiamondMark({
  size = 40,
  color = '#fff',
  gradient = false,
}: {
  size?: number;
  color?: string;
  gradient?: boolean;
}) {
  return (
    <Svg width={size} height={(size * VIEW_H) / VIEW_W} viewBox={`0 33 ${VIEW_W} ${VIEW_H}`}>
      {gradient ? (
        <Defs>
          <SvgGradient id="veridian-logo" x1="160" y1="33" x2="51.1776" y2="225.135" gradientUnits="userSpaceOnUse">
            {gradients.logo.map((c, i) => (
              <Stop key={c + i} offset={gradients.logoStops[i]} stopColor={c} />
            ))}
          </SvgGradient>
        </Defs>
      ) : null}
      <Path d={LOGO_PATH} fill={gradient ? 'url(#veridian-logo)' : color} />
    </Svg>
  );
}

/** White rounded app-icon tile with the gradient diamond (Welcome screen). */
export function AppIconTile({ size = 84 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <DiamondMark size={size * 0.64} gradient />
    </View>
  );
}

/** Gradient tile with a white diamond (Search screen). */
export function GradientIconTile({ size = 56 }: { size?: number }) {
  return (
    <LinearGradient
      colors={gradients.tile}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
      }}>
      <DiamondMark size={size * 0.64} color="#fff" />
    </LinearGradient>
  );
}
