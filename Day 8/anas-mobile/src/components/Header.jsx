import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors, spacing, radius } from '../utils/theme';
import { useFavorites } from '../contexts/FavoritesContext';

export default function Header({ title, subtitle, onBack, rightAction, showMenu }) {
  const navigation = useNavigation();
  const { ids } = useFavorites();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.left}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            >
              <Text style={styles.btnIcon}>←</Text>
            </Pressable>
          ) : showMenu ? (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            >
              <Text style={styles.btnIcon}>☰</Text>
            </Pressable>
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

        {rightAction ? (
          <View>{rightAction}</View>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('Favorites')}
            style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
          >
            <Text style={styles.btnIcon}>🛒</Text>
            {ids.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{ids.length}</Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 20 },
  btn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    ...Platform.select({ web: { cursor: 'pointer' }, default: {} }),
  },
  pressed: { opacity: 0.7 },
  btnIcon: { fontSize: 17, color: colors.text },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.bgCard,
  },
  badgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },
  titleBlock: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
});