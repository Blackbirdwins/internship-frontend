import { Text, Pressable, StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { radius, shadows, hoverTransition } from '../utils/theme';

export default function Button({
  children, onPress, variant = 'primary', size = 'md',
  disabled, loading, icon, style, fullWidth,
}) {
  const { colors, isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const config = {
    primary: { bg: colors.primary, border: colors.primary, text: '#FFFFFF', glow: colors.primaryGlow },
    secondary: { bg: colors.accent, border: colors.accent, text: '#FFFFFF', glow: colors.accentGlow },
    danger: { bg: colors.dangerSoft, border: 'transparent', text: colors.danger, glow: 'transparent' },
    ghost: { bg: 'transparent', border: 'transparent', text: colors.textMuted, glow: 'transparent' },
    outline: { bg: colors.bgCard, border: colors.border2, text: colors.text, glow: 'transparent' },
    soft: { bg: colors.primarySoft, border: 'transparent', text: colors.primary, glow: 'transparent' },
  }[variant] || { bg: colors.primary, border: colors.primary, text: '#FFFFFF', glow: colors.primaryGlow };

  const pad = {
    sm: { paddingVertical: 9, paddingHorizontal: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 20 },
    lg: { paddingVertical: 15, paddingHorizontal: 24 },
  }[size];

  const fontSize = { sm: 13, md: 14, lg: 15 }[size];

  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  // Hover glow (web only)
  const hoverGlow = hovered && Platform.OS === 'web' && !disabled && variant !== 'ghost' && variant !== 'outline'
    ? { boxShadow: `0 0 0 4px ${config.glow}, ${shadows.md.boxShadow || ''}` }
    : {};

  return (
    <Pressable
      {...hoverProps}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled || loading}
      style={[
        styles.btn,
        { backgroundColor: config.bg, borderColor: config.border },
        pad,
        fullWidth && { width: '100%' },
        hovered && Platform.OS === 'web' && !disabled && { transform: [{ translateY: -2 }] },
        hoverGlow,
        pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
        (disabled || loading) && { opacity: 0.4 },
        hoverTransition,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={config.text} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <Text style={{ fontSize: fontSize + 2, marginRight: 6 }}>{icon}</Text>}
          <Text style={{ fontSize, fontWeight: '600', color: config.text, letterSpacing: -0.1 }}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...Platform.select({
      web: { cursor: 'pointer' },
      default: {},
    }),
  },
  content: { flexDirection: 'row', alignItems: 'center' },
});