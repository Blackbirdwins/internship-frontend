import { ScrollView, View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import { getPlatformName } from '../utils/permissions';

export default function ToastScreen({ navigation }) {
  const { showToast } = useToast();

  const showNativeAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Toast / Alert" subtitle={`Task 8 — ${getPlatformName()}`} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>🔔 Toast / Alert Feedback</Text>
          <Text style={styles.heroDesc}>4 types ka toast + native alerts</Text>
        </View>

        {/* Toast types */}
        <Text style={styles.section}>TOAST — 4 TYPES</Text>

        <View style={styles.card}>
          <View style={styles.toastDemo}>
            <View style={[styles.toastDot, { backgroundColor: colors.accent }]} />
            <Text style={styles.toastLabel}>SUCCESS</Text>
            <Text style={styles.toastHint}>Operation complete</Text>
          </View>
          <Button variant="secondary" onPress={() => showToast('Operation successful!', 'success')}>
            ✓ Show Success Toast
          </Button>
        </View>

        <View style={styles.card}>
          <View style={styles.toastDemo}>
            <View style={[styles.toastDot, { backgroundColor: colors.danger }]} />
            <Text style={styles.toastLabel}>ERROR</Text>
            <Text style={styles.toastHint}>Something failed</Text>
          </View>
          <Button variant="danger" onPress={() => showToast('Operation failed!', 'error')}>
            ✕ Show Error Toast
          </Button>
        </View>

        <View style={styles.card}>
          <View style={styles.toastDemo}>
            <View style={[styles.toastDot, { backgroundColor: colors.warning }]} />
            <Text style={styles.toastLabel}>WARNING</Text>
            <Text style={styles.toastHint}>Attention needed</Text>
          </View>
          <Button variant="outline" onPress={() => showToast('Please check your input', 'warning')}>
            ⚠ Show Warning Toast
          </Button>
        </View>

        <View style={styles.card}>
          <View style={styles.toastDemo}>
            <View style={[styles.toastDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.toastLabel}>INFO</Text>
            <Text style={styles.toastHint}>Just informational</Text>
          </View>
          <Button variant="outline" onPress={() => showToast('Data loaded', 'info')}>
            ℹ Show Info Toast
          </Button>
        </View>

        {/* Native Alerts */}
        <Text style={styles.section}>NATIVE ALERTS</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Simple Alert</Text>
          <Button variant="outline" onPress={() => showNativeAlert('Hello', 'Yeh simple alert hai')}>
            📢 Simple Alert
          </Button>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Confirm Dialog</Text>
          <Button
            variant="outline"
            onPress={() => {
              if (Platform.OS === 'web') {
                if (window.confirm('Delete item?')) showToast('Deleted!', 'success');
              } else {
                Alert.alert('Delete Item', 'Kya aap delete karna chahte ho?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => showToast('Deleted!', 'success') },
                ]);
              }
            }}
          >
            🗑️ Confirm Delete
          </Button>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Multi-choice</Text>
          <Button
            variant="outline"
            onPress={() => {
              if (Platform.OS === 'web') {
                window.alert('Save / Discard / Cancel');
              } else {
                Alert.alert('Save changes?', 'Kya aap save karna chahte ho?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Discard', style: 'destructive' },
                  { text: 'Save', style: 'default', onPress: () => showToast('Saved!', 'success') },
                ]);
              }
            }}
          >
            💾 Multi-choice Alert
          </Button>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Task 8 Features</Text>
          <Text style={styles.infoText}>
            • 4 toast types: success/error/warning/info{'\n'}
            • Auto-dismiss after 2.6 sec{'\n'}
            • Colored left border + icon{'\n'}
            • Stacked toasts support{'\n'}
            • Native Alert.alert (Android/iOS){'\n'}
            • Web pe window.alert/confirm{'\n'}
            • Cross-platform conditional logic
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
  heroCard: { backgroundColor: 'rgba(251,191,36,0.08)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)', borderRadius: radius.md, padding: 14, marginBottom: 20 },
  heroTitle: { fontSize: 15, fontWeight: '700', color: colors.warning, marginBottom: 4 },
  heroDesc: { fontSize: 12.5, color: colors.textMuted, lineHeight: 18 },
  section: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 10, marginTop: 8 },
  card: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 10 },
  toastDemo: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  toastDot: { width: 10, height: 10, borderRadius: 5 },
  toastLabel: { fontSize: 11, fontWeight: '700', color: colors.text, letterSpacing: 0.6, flex: 1 },
  toastHint: { fontSize: 10, color: colors.textDim },
  infoCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginTop: 16 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },
});     