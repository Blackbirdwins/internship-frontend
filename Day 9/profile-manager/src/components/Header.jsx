import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';

export default function Header({ title, subtitle, onBack, rightAction }) {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.left}>
          {onBack ? (
            <Pressable onPress={onBack} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
              <Text style={styles.btnIcon}>←</Text>
            </Pressable>
          ) : (
            <View style={styles.logoBox}><Text style={styles.logoIcon}>👤</Text></View>
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
  logoBox: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  logoIcon: { fontSize: 20 },
  btn: { width: 42, height: 42, borderRadius: radius.md, backgroundColor: colors.bgElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.7 },
  btnIcon: { fontSize: 17, color: colors.text },
  titleBlock: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
});