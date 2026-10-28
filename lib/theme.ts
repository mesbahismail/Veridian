/** Raw color values for places className can't reach (gradients, icons, svg). */
export const colors = {
  background: '#1B1C1E',
  card: '#2A2C2F',
  cardElevated: '#303235',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textSoft: 'rgba(255,255,255,0.86)',
  muted: '#9A9DA3',
  mutedDim: '#6E7177',
  /** Header gear / bell, inactive tab icons */
  icon: 'rgba(255,255,255,0.5)',
  iconSoft: 'rgba(255,255,255,0.75)',
  hairline: 'rgba(255,255,255,0.12)',
  stroke: 'rgba(255,255,255,0.18)',
  strokeStrong: 'rgba(255,255,255,0.32)',
  fieldBg: 'rgba(255,255,255,0.07)',
  teal: '#12B88E',
  tealLight: '#5FD8BB',
  tealGlow: '#7CF0D2',
  tealDeal: '#1ED3A4',
  tealDark: '#1E3B36',
  cyan: '#20C7DB',
  red: '#E5484D',
  track: 'rgba(255,255,255,0.22)',
};

/** Cyan → teal used on rating bars, active tab, logo. */
export const gradients = {
  bar: ['#1FD2DB', '#1FB4EC'] as const,
  /** Brand gradient from Veridian.svg */
  logo: ['#0ECEA6', '#00DDD0', '#08D0E5', '#08D0E6', '#28A6FF'] as const,
  logoStops: [0, 0.175, 0.515, 0.805, 1] as const,
  tile: ['#1BD3EC', '#0FCB9E'] as const,
  whiteButton: ['#DADBDE', '#FFFFFF'] as const,
};

export const SCREEN_PADDING = 16;
