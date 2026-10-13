import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';

const MENU = [
  { icon: '⚙️', label: 'Settings', screen: 'Settings' },
  { icon: '❓', label: 'Help & Support', screen: 'Help' },
  { icon: '📄', label: 'About', screen: 'About' },
];

export default function DrawerMenu({ navigation, onLogout }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.name}>Anas Khan</Text>
        <Text style={styles.email}>anas@example.pk</Text>
      </View>

      <View style={styles.menu}>
        {MENU.map((item, i) => (
          <Pressable
            key={item.label}
            onPress={() => {
              navigation.navigate(item.screen);
              navigation.closeDrawer();
            }}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => {
            navigation.closeDrawer();
            onLogout?.();
          }}
          style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgCard },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  name: { ...typography.h3, color: colors.text },
  email: { ...typography.small, color: colors.textMuted },
  menu: { flex: 1, padding: spacing.md },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  pressed: { backgroundColor: colors.bgElevated },
  itemIcon: { fontSize: 22 },
  itemLabel: { flex: 1, ...typography.body, color: colors.text, fontWeight: '600' },
  chevron: { fontSize: 22, color: colors.textDim },
  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
  },
  logoutIcon: { fontSize: 20 },
  logoutText: { ...typography.body, color: colors.danger, fontWeight: '700' },
});