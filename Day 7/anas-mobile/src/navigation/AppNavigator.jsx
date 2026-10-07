import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import ListingScreen from '../screens/ListingScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', label: 'Home', icon: '🏠' },
  { name: 'Listing', label: 'Products', icon: '📦' },
  { name: 'Profile', label: 'Profile', icon: '👤' },
];

function TabBar({ state, navigation }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeTab}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tab = TABS.find((t) => t.name === route.name);
          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneContainerStyle: { backgroundColor: colors.bg } }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Listing" component={ListingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg }, animation: 'slide_from_right' }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  safeTab: { backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border },
  tabBar: { flexDirection: 'row', padding: spacing.sm, gap: spacing.sm },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.sm, borderRadius: radius.md, gap: 2 },
  tabItemActive: { backgroundColor: 'rgba(167, 139, 250, 0.12)' },
  tabIcon: { fontSize: 20 },
  tabLabel: { ...typography.tiny, color: colors.textMuted },
  tabLabelActive: { color: colors.primary, fontWeight: '800' },
});