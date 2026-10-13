import { Text, Pressable, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { colors } from '../utils/theme';

export default function Button({ children, onPress, variant = 'primary', size = 'md', disabled, loading, style }) {
  const config = {
    primary: { bg: colors.primaryDark, border: colors.primaryDark, text: '#fff' },
    secondary: { bg: colors.accent, border: colors.accent, text: '#0a0f1a' },
    danger: { bg: 'transparent', border: 'rgba(248,113,113,0.4)', text: colors.danger },
    ghost: { bg: 'transparent', border: colors.border, text: colors.textMuted },
    outline: { bg: 'transparent', border: colors.border2, text: colors.text },
  }[variant] || { bg: colors.primaryDark, border: colors.primaryDark, text: '#fff' };

  const pad = { sm: { paddingVertical: 8, paddingHorizontal: 12 }, md: { paddingVertical: 12, paddingHorizontal: 16 }, lg: { paddingVertical: 14, paddingHorizontal: 22 } }[size];
  const fontSize = { sm: 12, md: 13.5, lg: 15 }[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: config.bg, borderColor: config.border },
        pad,
        pressed && styles.pressed,
        (disabled || loading) && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={config.text} size="small" />
      ) : (
        <Text style={{ fontSize, fontWeight: '600', color: config.text, letterSpacing: 0.3 }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 11, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', minHeight: 48,
    ...Platform.select({ web: { cursor: 'pointer', transition: 'all 0.2s ease' }, default: {} }),
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});