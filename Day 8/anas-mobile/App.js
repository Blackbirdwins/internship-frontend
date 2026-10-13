import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/utils/theme';
import { log } from './src/utils/logger';
import ErrorBoundary from './src/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';
import { linking } from './src/navigation/linking';
import { ToastProvider } from './src/contexts/ToastContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { OnboardingProvider } from './src/contexts/OnboardingContext';

log('App started — Day 8');

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.bg} />
      <ErrorBoundary>
        <ThemeProvider>
          <FavoritesProvider>
            <OnboardingProvider>
              <ToastProvider>
                <NavigationContainer
                  linking={linking}
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
            </OnboardingProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}