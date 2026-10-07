import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';

export default function Header({ title, subtitle, onBack, rightAction }) {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.left}>
          {onBack ? (
            <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.logoBox}>
              <Text style={styles.logoIcon}>⚡</Text>
            </View>
          )}
          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          </View>
        </View>
        {rightAction && <View>{rightAction}</View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  logoBox: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  logoIcon: { fontSize: 20 },
  backBtn: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.bgElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  backIcon: { fontSize: 20, color: colors.text, fontWeight: '600' },
  titleBlock: { flex: 1 },
  title: { ...typography.h3, color: colors.text },
  subtitle: { ...typography.small, color: colors.textMuted, marginTop: 2 },
});