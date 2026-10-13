import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import KeyboardForm from '../components/KeyboardForm';
import useKeyboard from '../hooks/useKeyboard';
import { getPlatformName } from '../utils/permissions';

export default function KeyboardScreen({ navigation }) {
  const { shown, height } = useKeyboard();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Keyboard Handling"
        subtitle={`Task 5 — ${getPlatformName()}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.statusBar}>
        <View style={[styles.dot, { backgroundColor: shown ? colors.accent : colors.textDim }]} />
        <Text style={styles.statusText}>
          Keyboard: <Text style={{ color: shown ? colors.accent : colors.textMuted, fontWeight: '700' }}>
            {shown ? `OPEN (${Math.round(height)}px)` : 'CLOSED'}
          </Text>
        </Text>
      </View>

      <KeyboardForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
});