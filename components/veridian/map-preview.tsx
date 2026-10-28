import * as React from 'react';
import { View } from 'react-native';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';
import { MapPin } from 'lucide-react-native';
import { colors } from '@/lib/theme';

/** Stylised dark street map (pure SVG — swap for react-native-maps if you need a live map). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const W = 400;
const H = 159;

/**
 * Two jittered street grids at different angles (old town / new town) meeting along a main road,
 * which reads like the dense city map in the design.
 */
function streetGrid(seed: number, angle: number, spacing: number) {
  const r = seeded(seed);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const n = Math.ceil(Math.hypot(W, H) / spacing) + 2;
  const pts: [number, number][][] = [];
  for (let i = -n; i <= n; i++) {
    const row: [number, number][] = [];
    for (let j = -n; j <= n; j++) {
      const u = i * spacing + (r() - 0.5) * spacing * 0.45;
      const v = j * spacing * 0.8 + (r() - 0.5) * spacing * 0.45;
      row.push([W / 2 + u * cos - v * sin, H / 2 + u * sin + v * cos]);
    }
    pts.push(row);
  }
  const inView = ([x, y]: [number, number]) => x > -40 && x < W + 40 && y > -40 && y < H + 40;
  const seg = (a: [number, number], b: [number, number]) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  let d = '';
  for (let i = 0; i < pts.length; i++) {
    for (let j = 0; j < pts[i].length; j++) {
      const p = pts[i][j];
      if (!inView(p)) continue;
      if (i + 1 < pts.length && r() < 0.88) d += seg(p, pts[i + 1][j]);
      if (j + 1 < pts[i].length && r() < 0.8) d += seg(p, pts[i][j + 1]);
      if (i + 1 < pts.length && j + 1 < pts[i].length && r() < 0.08) d += seg(p, pts[i + 1][j + 1]);
    }
  }
  return d;
}

const OLD_TOWN = streetGrid(7, -0.38, 21);
const NEW_TOWN = streetGrid(11, 0.22, 25);
/** The main road the two districts meet along; the pin sits on it. */
const DIVIDE = 'M0 120 C70 112 120 92 200 86 S320 70 400 40';

const MAJOR = [
  DIVIDE,
  'M0 70 C50 76 110 66 160 52 S260 20 300 0',
  'M150 0 C160 50 150 110 128 159',
  'M235 159 C250 120 262 80 300 60 S360 40 400 52',
  'M60 159 C70 130 64 100 40 80 S10 40 0 30',
];

export function MapPreview({ height = 159 }: { height?: number }) {
  return (
    <View style={{ height, overflow: 'hidden', backgroundColor: '#1F2022' }}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <Defs>
          <ClipPath id="map-old-town">
            <Path d={`${DIVIDE} L400 0 L0 0 Z`} />
          </ClipPath>
          <ClipPath id="map-new-town">
            <Path d={`${DIVIDE} L400 ${H} L0 ${H} Z`} />
          </ClipPath>
        </Defs>
        <Rect x="0" y="0" width={W} height={H} fill="#1F2022" />
        <Path d={OLD_TOWN} clipPath="url(#map-old-town)" stroke="#55585C" strokeWidth={1.1} fill="none" />
        <Path d={NEW_TOWN} clipPath="url(#map-new-town)" stroke="#55585C" strokeWidth={1.1} fill="none" />
        {MAJOR.map((d, i) => (
          <Path key={i} d={d} stroke="#7C7F84" strokeWidth={3.2} fill="none" strokeLinecap="round" />
        ))}
      </Svg>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.teal,
          borderWidth: 1,
          borderColor: colors.tealLight,
        }}>
        <MapPin size={18} strokeWidth={2.4} color="#fff" />
      </View>
    </View>
  );
}
