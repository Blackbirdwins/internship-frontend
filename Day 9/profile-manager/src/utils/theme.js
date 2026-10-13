import { Platform } from 'react-native';

export const colors = {
  bg: '#0a0f1a',
  bgCard: '#141b2d',
  bgElevated: '#1c2438',
  border: '#232c44',
  border2: '#2d3852',
  primary: '#818cf8',
  primaryDark: '#6366f1',
  accent: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

export const typography = {
  h1: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  h2: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  h3: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '500' },
  small: { fontSize: 12, fontWeight: '500' },
  tiny: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
};

export const shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
    android: { elevation: 3 },
    web: { boxShadow: '0 2px 4px rgba(0,0,0,0.3)' },
    default: {},
  }),
  md: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16 },
    android: { elevation: 6 },
    web: { boxShadow: '0 8px 24px rgba(0,0,0,0.35)' },
    default: {},
  }),
};