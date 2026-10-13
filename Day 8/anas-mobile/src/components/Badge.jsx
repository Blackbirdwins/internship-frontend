import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../utils/theme';

export default function Badge({ children, variant = 'default', dot }) {
  const bg = { default: 'rgba(148, 163, 184, 0.15)', primary: 'rgba(167, 139, 250, 0.15)', success: 'rgba(52, 211, 153, 0.15)', warning: 'rgba(251, 191, 36, 0.15)', danger: 'rgba(248, 113, 113, 0.15)' }[variant];
  const fg = { default: colors.textMuted, primary: colors.primary, success: colors.success, warning: colors.warning, danger: colors.danger }[variant];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {dot && <View style={[styles.dot, { backgroundColor: fg }]} />}
      <Text style={[styles.text, { color: fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.full, alignSelf: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { ...typography.tiny, fontWeight: '700' },
});