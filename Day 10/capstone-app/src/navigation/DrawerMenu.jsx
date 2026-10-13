import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotes } from '../contexts/NotesContext';
import { useToast } from '../contexts/ToastContext';
import Avatar from '../components/Avatar';
import { radius, hoverTransition } from '../utils/theme';

const ITEMS = [
  { icon: 'home-outline', label: 'Home', route: 'Tabs', screen: 'Home' },
  { icon: 'document-text-outline', label: 'Notes', route: 'Tabs', screen: 'Notes' },
  { icon: 'compass-outline', label: 'Explore API', route: 'Tabs', screen: 'Api' },
  { icon: 'heart-outline', label: 'Favorites', route: 'Tabs', screen: 'Favorites' },
];

const SETTINGS = [
  { icon: 'settings-outline', label: 'Settings', route: 'Settings' },
  { icon: 'person-outline', label: 'Profile', route: 'Profile' },
];

function NavItem({ item, onPress, colors }) {
  const [hovered, setHovered] = useState(false);

  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  return (
    <Pressable
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.item,
        hovered && Platform.OS === 'web' && {
          backgroundColor: colors.bgHover,
          transform: [{ translateX: 4 }],
        },
        hoverTransition,
      ]}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={hovered ? colors.primary : colors.textMuted}
      />
      <Text style={[styles.itemLabel, { color: hovered ? colors.primary : colors.text }]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

export default function DrawerMenu({ navigation }) {
  const { colors, mode, toggle } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const { ids } = useFavorites();
  const { notes } = useNotes();
  const { showToast } = useToast();
  const [themeHovered, setThemeHovered] = useState(false);

  const handleLogout = async () => {
    await logout();
    showToast('Logged out', 'info');
  };

  const handleNav = (item) => {
    if (item.route === 'Tabs') {
      navigation.navigate('Tabs', { screen: item.screen });
    } else {
      navigation.navigate(item.route);
    }
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safe, { backgroundColor: colors.bgCard }]}>
      <View style={[styles.userCard, { borderBottomColor: colors.border }]}>
        <Avatar name={user?.name || 'User'} size={56} />
        <View style={{ flex: 1, marginLeft: 12, minWidth: 0 }}>
          <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
            {user?.name || 'User'}
          </Text>
          <Text style={[styles.userRole, { color: colors.textMuted }]}>
            {isAdmin ? 'Administrator' : 'Member'}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{notes.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>NOTES</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{ids.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>SAVED</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textDim }]}>NAVIGATE</Text>
          {ITEMS.map(item => (
            <NavItem key={item.label} item={item} colors={colors} onPress={() => handleNav(item)} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textDim }]}>ACCOUNT</Text>
          {SETTINGS.map(item => (
            <NavItem key={item.label} item={item} colors={colors} onPress={() => handleNav(item)} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textDim }]}>PREFERENCES</Text>
          <Pressable
            onPress={toggle}
            onHoverIn={() => setThemeHovered(true)}
            onHoverOut={() => setThemeHovered(false)}
            style={[
              styles.item,
              themeHovered && Platform.OS === 'web' && { backgroundColor: colors.bgHover },
              hoverTransition,
            ]}
          >
            <Ionicons
              name={mode === 'dark' ? 'moon-outline' : 'sunny-outline'}
              size={20}
              color={colors.textMuted}
            />
            <Text style={[styles.itemLabel, { color: colors.text }]}>
              {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Text style={[styles.itemValue, { color: colors.textDim }]}>
              {mode === 'dark' ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed, hovered }) => [
            styles.logoutBtn,
            { backgroundColor: colors.dangerSoft },
            hovered && Platform.OS === 'web' && { opacity: 0.85 },
            pressed && { opacity: 0.7 },
            hoverTransition,
          ]}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, borderBottomWidth: 0.5,
  },
  userName: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 },
  userRole: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 10 },
  statBox: {
    flex: 1, padding: 12, borderRadius: radius.md, borderWidth: 0.5, alignItems: 'center',
  },
  statValue: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, marginTop: 2 },
  section: { paddingHorizontal: 12, paddingVertical: 8 },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 0.8,
    paddingHorizontal: 8, paddingVertical: 8,
  },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 12, paddingVertical: 12,
    borderRadius: radius.sm, minHeight: 46,
  },
  itemLabel: { flex: 1, fontSize: 14, fontWeight: '600', letterSpacing: -0.1 },
  itemValue: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  footer: { padding: 16, borderTopWidth: 0.5 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, borderRadius: radius.md,
  },
  logoutText: { fontSize: 13.5, fontWeight: '700' },
});