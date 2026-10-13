import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotes } from '../contexts/NotesContext';
import { useResponsive } from '../hooks/useResponsive';
import { radius, glassWeb, hoverTransition, neonGlow } from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import NotesScreen from '../screens/NotesScreen';
import ApiListingScreen from '../screens/ApiListingScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', label: 'Home', icon: '⌂' },
  { name: 'Notes', label: 'Notes', icon: '✎' },
  { name: 'Api', label: 'Explore', icon: '◎' },
  { name: 'Favorites', label: 'Saved', icon: '♡' },
];

function TabItem({ tab, focused, onPress, count, colors, isDesktop }) {
  const [hovered, setHovered] = useState(false);

  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  const iconColor = focused ? colors.primary : hovered ? colors.text : colors.textDim;

  return (
    <Pressable
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.item,
        isDesktop && styles.itemDesktop,
        focused && { backgroundColor: colors.primarySoft },
        hovered && !focused && Platform.OS === 'web' && { backgroundColor: colors.bgHover },
        hoverTransition,
      ]}
    >
      {focused && (
        <View style={[styles.activeBar, {
          backgroundColor: colors.primary,
          ...(Platform.OS === 'web' ? neonGlow(colors.primaryGlow, 8, 0.8) : {}),
        }]} />
      )}
      <View style={styles.iconWrap}>
        <Text style={[styles.icon, { color: iconColor, fontWeight: focused ? '800' : '500' }]}>
          {tab.icon}
        </Text>
        {count > 0 && (
          <View style={[styles.countBadge, { backgroundColor: colors.primary, borderColor: colors.bgCard }]}>
            <Text style={styles.countText}>{count > 9 ? '9+' : count}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.label, { color: iconColor, fontWeight: focused ? '800' : '600' }]}>
        {tab.label}
      </Text>
    </Pressable>
  );
}

function CustomTabBar({ state, navigation }) {
  const { colors, isDark } = useTheme();
  const { ids } = useFavorites();
  const { notes } = useNotes();
  const { isDesktop, isTablet } = useResponsive();

  const counts = { Favorites: ids.length, Notes: notes.length };
  const useInline = isDesktop || isTablet;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.safe,
        {
          backgroundColor: isDark ? 'rgba(5, 6, 10, 0.9)' : 'rgba(241, 245, 249, 0.9)',
          borderTopColor: colors.border,
        },
        Platform.OS === 'web' && glassWeb,
      ]}
    >
      <View style={[styles.bar, useInline && styles.barInline]}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          const tab = TABS.find(t => t.name === route.name);
          return (
            <TabItem
              key={route.key}
              tab={tab}
              focused={focused}
              count={counts[tab.name] || 0}
              colors={colors}
              isDesktop={useInline}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default function BottomTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Api" component={ApiListingScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  safe: { borderTopWidth: 0.5 },
  bar: { flexDirection: 'row', paddingHorizontal: 6, paddingTop: 6, gap: 4 },
  barInline: { maxWidth: 720, alignSelf: 'center', width: '100%', paddingHorizontal: 12 },
  item: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: radius.md,
    gap: 3, minHeight: 52, minWidth: 64, position: 'relative', overflow: 'hidden',
  },
  itemDesktop: { paddingVertical: 10, maxWidth: 140 },
  activeBar: {
    position: 'absolute', top: 0,
    height: 2, width: '60%',
    borderBottomLeftRadius: 2, borderBottomRightRadius: 2,
  },
  iconWrap: { position: 'relative' },
  icon: { fontSize: 22 },
  countBadge: {
    position: 'absolute', top: -4, right: -10,
    minWidth: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4, borderWidth: 1.5,
  },
  countText: { fontSize: 9, color: '#05060A', fontWeight: '800' },
  label: { fontSize: 11, letterSpacing: -0.1 },
});