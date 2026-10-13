import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';
import { spacing, radius } from '../utils/theme';

export default function EmptyState({ icon = '📭', title, message, actionLabel, onAction }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {message && <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>}
      {actionLabel && onAction && (
        <Button variant="soft" size="sm" onPress={onAction} style={{ marginTop: spacing.md }}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 12,
  },
  iconBox: {
    width: 80, height: 80, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, marginBottom: 4,
  },
  icon: { fontSize: 36 },
  title: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3, textAlign: 'center' },
  message: { fontSize: 13.5, fontWeight: '500', textAlign: 'center', lineHeight: 20, maxWidth: 280 },
});