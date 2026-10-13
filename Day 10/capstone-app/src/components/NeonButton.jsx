import { Text, Pressable, StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { radius, shadows, hoverTransition, neonGlow } from '../utils/theme';

export default function NeonButton({
  children, onPress, variant = 'primary', size = 'md',
  disabled, loading, icon, style, fullWidth,
}) {
  const { colors, isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const variants = {
    primary: {
      bg: colors.primary,
      border: colors.primary,
      text: isDark ? '#05060A' : '#FFFFFF',
      glow: colors.primaryGlow,
    },
    secondary: {
      bg: 'transparent',
      border: colors.primary,
      text: colors.primary,
      glow: colors.primaryGlow,
    },
    ghost: {
      bg: 'transparent',
      border: colors.border,
      text: colors.textMuted,
      glow: 'transparent',
    },
    danger: {
      bg: 'transparent',
      border: colors.danger,
      text: colors.danger,
      glow: colors.dangerGlow,
    },
    purple: {
      bg: colors.purple,
      border: colors.purple,
      text: '#FFFFFF',
      glow: 'rgba(168,85,247,0.5)',
    },
  };

  const config = variants[variant] || variants.primary;

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

  const glowStyle = hovered && Platform.OS === 'web' && !disabled && variant !== 'ghost'
    ? neonGlow(config.glow, 20, 0.7)
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
        glowStyle,
        pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
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
          <Text style={{
            fontSize, fontWeight: '700', color: config.text,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...Platform.select({ web: { cursor: 'pointer' }, default: {} }),
  },
  content: { flexDirection: 'row', alignItems: 'center' },
});