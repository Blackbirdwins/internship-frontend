import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LocationScreen from '../screens/LocationScreen';
import KeyboardScreen from '../screens/KeyboardScreen';
import FormScreen from '../screens/FormScreen';
import ExtrasScreen from '../screens/ExtrasScreen';
import ValidationScreen from '../screens/ValidationScreen';
import ToastScreen from '../screens/ToastScreen';
import OfflineScreen from '../screens/OfflineScreen';
import ListPerfScreen from '../screens/ListPerfScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Keyboard" component={KeyboardScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="Extras" component={ExtrasScreen} />
      <Stack.Screen name="Validation" component={ValidationScreen} />
      <Stack.Screen name="Toast" component={ToastScreen} />
      <Stack.Screen name="Offline" component={OfflineScreen} />
      <Stack.Screen name="ListPerf" component={ListPerfScreen} />
    </Stack.Navigator>
  );
}