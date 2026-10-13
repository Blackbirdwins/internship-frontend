import { Platform } from 'react-native';

/* ============== NEON ACCENTS ============== */
export const accents = {
  cyber:   { name: 'Cyber',   primary: '#00B8D4', glow: 'rgba(0,184,212,0.4)',  soft: 'rgba(0,184,212,0.12)' },
  plasma:  { name: 'Plasma',  primary: '#7C3AED', glow: 'rgba(124,58,237,0.4)', soft: 'rgba(124,58,237,0.12)' },
  magma:   { name: 'Magma',   primary: '#E11D48', glow: 'rgba(225,29,72,0.4)',  soft: 'rgba(225,29,72,0.12)' },
  toxic:   { name: 'Toxic',   primary: '#16A34A', glow: 'rgba(22,163,74,0.4)',  soft: 'rgba(22,163,74,0.12)' },
  gold:    { name: 'Gold',    primary: '#D97706', glow: 'rgba(217,119,6,0.4)',  soft: 'rgba(217,119,6,0.12)' },
};

/* ============== DARK ============== */
export const darkColors = {
  bg: '#0A0A0F',
  bgCard: '#111118',
  bgCard2: '#16161F',
  bgElevated: '#1C1C26',
  bgGlass: 'rgba(17, 17, 24, 0.75)',
  bgHover: 'rgba(255, 255, 255, 0.04)',

  border: 'rgba(255, 255, 255, 0.06)',
  border2: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',

  primary: '#00B8D4',
  primaryDark: '#0891B2',
  primarySoft: 'rgba(0,184,212,0.12)',
  primaryGlow: 'rgba(0,184,212,0.35)',

  accent: '#22C55E',
  accentSoft: 'rgba(34,197,94,0.12)',
  accentGlow: 'rgba(34,197,94,0.35)',

  warning: '#F59E0B',
  warningSoft: 'rgba(245,158,11,0.12)',
  danger: '#EF4444',
  dangerSoft: 'rgba(239,68,68,0.12)',
  dangerGlow: 'rgba(239,68,68,0.35)',

  purple: '#7C3AED',
  purpleSoft: 'rgba(124,58,237,0.12)',

  text: '#F1F5F9',
  textMuted: '#94A3B8',
  textDim: '#475569',

  overlay: 'rgba(0,0,0,0.7)',
  skeleton: '#16161F',
  skeletonShine: '#1F1F2A',
  success: '#22C55E',
};

/* ============== LIGHT ============== */
export const lightColors = {
  bg: '#F8FAFC',
  bgCard: '#FFFFFF',
  bgCard2: '#F8FAFC',
  bgElevated: '#F1F5F9',
  bgGlass: 'rgba(255, 255, 255, 0.8)',
  bgHover: 'rgba(0, 0, 0, 0.04)',

  border: 'rgba(0, 0, 0, 0.08)',
  border2: 'rgba(0, 0, 0, 0.12)',
  borderStrong: 'rgba(0, 0, 0, 0.18)',

  primary: '#0891B2',
  primaryDark: '#0E7490',
  primarySoft: 'rgba(8,145,178,0.1)',
  primaryGlow: 'rgba(8,145,178,0.25)',

  accent: '#16A34A',
  accentSoft: 'rgba(22,163,74,0.1)',
  accentGlow: 'rgba(22,163,74,0.25)',

  warning: '#D97706',
  warningSoft: 'rgba(217,119,6,0.1)',
  danger: '#DC2626',
  dangerSoft: 'rgba(220,38,38,0.1)',
  dangerGlow: 'rgba(220,38,38,0.25)',

  purple: '#7C3AED',
  purpleSoft: 'rgba(124,58,237,0.1)',

  text: '#0F172A',
  textMuted: '#475569',
  textDim: '#94A3B8',

  overlay: 'rgba(0,0,0,0.5)',
  skeleton: '#E2E8F0',
  skeletonShine: '#CBD5E1',
  success: '#16A34A',
};

/* ============== SPACING / RADIUS / TYPO ============== */
export const spacing = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };
export const radius = { xs: 6, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, full: 999 };

export const typography = {
  display: { fontSize: 32, fontWeight: '800', letterSpacing: -1 },
  h1: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  h2: { fontSize: 20, fontWeight: '700', letterSpacing: -0.4 },
  h3: { fontSize: 16, fontWeight: '600', letterSpacing: -0.2 },
  body: { fontSize: 14, fontWeight: '500' },
  small: { fontSize: 13, fontWeight: '500' },
  caption: { fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
};

/* ============== SHADOWS ============== */
export const shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
    android: { elevation: 2 },
    web: { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
    default: {},
  }),
  md: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
    android: { elevation: 4 },
    web: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
    default: {},
  }),
  lg: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 20 },
    android: { elevation: 8 },
    web: { boxShadow: '0 8px 20px rgba(0,0,0,0.2)' },
    default: {},
  }),
};

/* ============== NEON GLOW (subtle) ============== */
export const neonGlow = (color, size = 12, intensity = 0.5) => Platform.OS === 'web' ? ({
  boxShadow: `0 0 ${size}px ${color}`,
}) : {};

/* ============== BREAKPOINTS / LAYOUT ============== */
export const breakpoints = { mobile: 0, tablet: 768, desktop: 1100, wide: 1440 };
export const layout = {
  maxContentWidth: 1000,   // reduced
  drawerWidth: 280,
  tabBarHeight: 64,
  headerHeight: 64,
};

export const springs = {
  gentle: { damping: 20, stiffness: 200, mass: 0.8 },
  bouncy: { damping: 12, stiffness: 250, mass: 0.9 },
  snappy: { damping: 24, stiffness: 300, mass: 0.6 },
};

/* ============== GLASS ============== */
export const glassWeb = Platform.OS === 'web' ? {
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
} : {};

export const hoverTransition = Platform.OS === 'web' ? {
  transition: 'all 0.2s ease',
  cursor: 'pointer',
} : {};