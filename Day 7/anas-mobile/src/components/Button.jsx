import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, radius } from '../utils/theme';

export default function Button({ children, onPress, variant = 'primary', size = 'md', disabled, loading }) {
  const bg = { primary: colors.primary, success: colors.success, danger: colors.danger, ghost: 'transparent', outline: 'transparent' }[variant];
  const borderColor = variant === 'outline' ? colors.primary : variant === 'ghost' ? colors.border : 'transparent';
  const textColor = variant === 'outline' ? colors.primary : variant === 'ghost' ? colors.textMuted : '#fff';
  const padding = { sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md }, md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg }, lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl } }[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.btn, { backgroundColor: bg, borderColor }, padding, pressed && styles.pressed, (disabled || loading) && styles.disabled]}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{children}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: radius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  text: { ...typography.body, fontWeight: '700' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
});