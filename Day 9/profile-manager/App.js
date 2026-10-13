import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/utils/theme';
import { ToastProvider } from './src/contexts/ToastContext';
import { ProfileProvider } from './src/contexts/ProfileContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.bgCard} />
      <ProfileProvider>
        <ToastProvider>
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                primary: colors.primary,
                background: colors.bg,
                card: colors.bgCard,
                text: colors.text,
                border: colors.border,
                notification: colors.accent,
              },
            }}
          >
            <AppNavigator />
          </NavigationContainer>
        </ToastProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}