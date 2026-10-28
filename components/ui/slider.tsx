import * as React from 'react';
import { LayoutChangeEvent, PanResponder, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/theme';

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  /** A number for a single thumb, a tuple for a range slider. */
  value: number | [number, number];
  onValueChange: (value: number | [number, number]) => void;
  formatLabel?: (v: number) => string;
};

const THUMB = 22;
/** Thumb top: the value bubble sits above (33pt tall) and the track runs through the thumb centre. */
const TRACK_TOP = 40;

/** Teal slider with value bubbles above each thumb (Distance / Price range). */
export function Slider({ min, max, step = 1, value, onValueChange, formatLabel = String }: SliderProps) {
  const [width, setWidth] = React.useState(0);
  const isRange = Array.isArray(value);
  const values: number[] = isRange ? (value as [number, number]) : [value as number];

  // Refs so responders always see fresh values.
  const stateRef = React.useRef({ width, values, isRange, min, max, step, onValueChange });
  stateRef.current = { width, values, isRange, min, max, step, onValueChange };
  const startPx = React.useRef(0);

  const toPx = (v: number) => (width === 0 ? 0 : ((v - min) / (max - min)) * width);

  const makeResponder = (index: number) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        const s = stateRef.current;
        startPx.current = ((s.values[index] - s.min) / (s.max - s.min)) * s.width;
      },
      onPanResponderMove: (_, g) => {
        const s = stateRef.current;
        if (!s.width) return;
        const px = Math.max(0, Math.min(s.width, startPx.current + g.dx));
        let v = s.min + (px / s.width) * (s.max - s.min);
        v = Math.round(v / s.step) * s.step;
        v = Math.max(s.min, Math.min(s.max, Number(v.toFixed(4))));
        if (s.isRange) {
          const next: [number, number] = [s.values[0], s.values[1]];
          if (index === 0) next[0] = Math.min(v, next[1] - s.step);
          else next[1] = Math.max(v, next[0] + s.step);
          s.onValueChange(next);
        } else {
          s.onValueChange(v);
        }
      },
    });

  const responders = React.useMemo(() => [makeResponder(0), makeResponder(1)], []); // eslint-disable-line react-hooks/exhaustive-deps

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width - THUMB);

  const fillStart = isRange ? toPx(values[0]) : 0;
  const fillEnd = isRange ? toPx(values[1]) : toPx(values[0]);

  return (
    <View onLayout={onLayout} style={{ height: TRACK_TOP + THUMB }}>
      {/* track */}
      <View
        style={{
          position: 'absolute',
          top: TRACK_TOP + THUMB / 2 - 3,
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.25)',
        }}
      />
      {/* fill */}
      <View
        style={{
          position: 'absolute',
          top: TRACK_TOP + THUMB / 2 - 3,
          left: isRange ? THUMB / 2 + fillStart : 0,
          width: Math.max(0, isRange ? fillEnd - fillStart : fillEnd + THUMB / 2),
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.teal,
        }}
      />
      {values.map((v, i) => {
        const x = toPx(v);
        return (
          <React.Fragment key={i}>
            {/* bubble */}
            <View
              pointerEvents="none"
              style={{ position: 'absolute', top: -3, left: x + THUMB / 2 - 50, width: 100, alignItems: 'center' }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  height: 33,
                  justifyContent: 'center',
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(30,31,33,0.55)',
                }}>
                <Text className="font-dm-medium text-[15px] text-white">{formatLabel(v)}</Text>
              </View>
            </View>
            {/* thumb */}
            <View
              {...responders[i].panHandlers}
              hitSlop={14}
              style={{
                position: 'absolute',
                top: TRACK_TOP,
                left: x,
                width: THUMB,
                height: THUMB,
                borderRadius: THUMB / 2,
                backgroundColor: '#5FD3BA',
                borderWidth: 1,
                borderColor: 'rgba(160,255,230,0.5)',
                shadowColor: '#000',
                shadowOpacity: 0.35,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
              }}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
}
