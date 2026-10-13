import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../utils/theme';
import BottomTabs from './BottomTabs';
import DrawerMenu from './DrawerMenu';
import DetailsScreen from '../screens/DetailsScreen';
import AuthScreen from '../screens/AuthScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import ApiDemoScreen from '../screens/ApiDemoScreen';
import ApiListingScreen from '../screens/ApiListingScreen';
import ApiDetailsScreen from '../screens/ApiDetailsScreen';
import HooksDemoScreen from '../screens/HooksDemoScreen';
import TasksScreen from '../screens/TasksScreen';
import { useToast } from '../contexts/ToastContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  const { showToast } = useToast();
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerMenu {...props} onLogout={() => showToast('Logged out', 'warning')} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: colors.bgCard, width: 280 },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.6)',
      }}
    >
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Main" component={MainDrawer} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="ApiDemo" component={ApiDemoScreen} />
      <Stack.Screen name="ApiListing" component={ApiListingScreen} />
      <Stack.Screen name="ApiDetails" component={ApiDetailsScreen} />
      <Stack.Screen name="HooksDemo" component={HooksDemoScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}