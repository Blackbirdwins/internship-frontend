import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { radius, glassWeb, hoverTransition } from '../utils/theme';

export default function Header({ title, subtitle, onBack, rightAction, showMenu, showFavs }) {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { ids } = useFavorites();

  const IconBtn = ({ iconName, onPress, badge }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <Pressable
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={[
          styles.iconBtn,
          {
            backgroundColor: hovered ? colors.primarySoft : colors.bgElevated,
            borderColor: hovered ? colors.primary : colors.border,
          },
          hoverTransition,
        ]}
      >
        <Ionicons
          name={iconName}
          size={20}
          color={hovered ? colors.primary : colors.text}
        />
        {badge > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary, borderColor: colors.bgCard }]}>
            <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safe,
        {
          backgroundColor: isDark ? 'rgba(10, 10, 15, 0.78)' : 'rgba(248, 250, 252, 0.78)',
          borderBottomColor: colors.border,
        },
        Platform.OS === 'web' && glassWeb,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          {onBack ? (
            <IconBtn iconName="arrow-back" onPress={onBack} />
          ) : showMenu ? (
            <IconBtn
              iconName="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ) : (
            <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
              <Ionicons name="flash" size={20} color="#05060A" />
            </View>
          )}
          <View style={styles.titleBlock}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {rightAction ? (
          <View>{rightAction}</View>
        ) : showFavs ? (
          <IconBtn
            iconName="heart-outline"
            badge={ids.length}
            onPress={() => navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Favorites' } })}
          />
        ) : null}
      </View>
      <View style={[styles.neonLine, { backgroundColor: colors.primary }]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { borderBottomWidth: 0.5, position: 'relative' },
  container: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  logoBox: {
    width: 40, height: 40, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, position: 'relative',
  },
  badge: {
    position: 'absolute', top: -4, right: -4,
    minWidth: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 5, borderWidth: 2,
  },
  badgeText: { fontSize: 10, color: '#05060A', fontWeight: '800' },
  titleBlock: { flex: 1, minWidth: 0 },
  title: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  subtitle: { fontSize: 12, fontWeight: '500', marginTop: 1, letterSpacing: 0.2 },
  neonLine: {
    height: 2,
    width: 80,
    marginLeft: 16,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});