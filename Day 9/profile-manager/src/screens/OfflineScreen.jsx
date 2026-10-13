import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import useNetworkStatus from '../hooks/useNetworkStatus';
import { getPlatformName } from '../utils/permissions';

export default function OfflineScreen({ navigation }) {
  const { showToast } = useToast();
  const online = useNetworkStatus();

  const [state, setState] = useState('idle'); // idle | loading | success | error | offline
  const [data, setData] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async (simulateFail = false) => {
    setState('loading');
    setRetryCount(0);

    await new Promise(r => setTimeout(r, 1200));

    if (!online) {
      setState('offline');
      return;
    }
    if (simulateFail) {
      setState('error');
      return;
    }

    setData({ title: 'Data loaded', items: 42, time: new Date().toLocaleTimeString() });
    setState('success');
    showToast('Data fetched ✓', 'success');
  };

  const handleRetry = () => {
    setRetryCount(c => c + 1);
    fetchData(false);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Offline & Error" subtitle={`Task 11 — ${getPlatformName()}`} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Network status banner */}
        <View style={[styles.networkBanner, { backgroundColor: online ? colors.accent + '22' : colors.danger + '22', borderColor: online ? colors.accent : colors.danger }]}>
          <View style={[styles.dot, { backgroundColor: online ? colors.accent : colors.danger }]} />
          <Text style={[styles.networkText, { color: online ? colors.accent : colors.danger }]}>
            {online ? '✓ ONLINE — Connected' : '✕ OFFLINE — No network'}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Button variant="primary" onPress={() => fetchData(false)} style={{ marginBottom: 10 }}>
            🔄 Fetch Data (Success)
          </Button>
          <Button variant="danger" onPress={() => fetchData(true)}>
            ⚠ Fetch Data (Force Error)
          </Button>
        </View>

        {/* State display */}
        <Text style={styles.section}>CURRENT STATE: {state.toUpperCase()}</Text>

        {/* LOADING */}
        {state === 'loading' && (
          <View style={styles.card}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching data...</Text>
          </View>
        )}

        {/* SUCCESS */}
        {state === 'success' && data && (
          <View style={[styles.card, styles.successCard]}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>{data.title}</Text>
            <Text style={styles.successMeta}>{data.items} items • {data.time}</Text>
          </View>
        )}

        {/* ERROR */}
        {state === 'error' && (
          <View style={[styles.card, styles.errorCard]}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Failed to load</Text>
            <Text style={styles.errorDesc}>Server se data nahi aaya</Text>
            {retryCount > 0 && <Text style={styles.retryCount}>Retries: {retryCount}</Text>}
            <Button variant="outline" size="sm" onPress={handleRetry} style={{ marginTop: 12 }}>
              🔄 Retry ({retryCount})
            </Button>
          </View>
        )}

        {/* OFFLINE */}
        {state === 'offline' && (
          <View style={[styles.card, styles.offlineCard]}>
            <Text style={styles.offlineIcon}>📡</Text>
            <Text style={styles.offlineTitle}>You are offline</Text>
            <Text style={styles.offlineDesc}>Internet connection check karo</Text>
          </View>
        )}

        {/* IDLE */}
        {state === 'idle' && (
          <View style={styles.card}>
            <Text style={styles.idleText}>👆 Koi button click karo</Text>
          </View>
        )}

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Task 11 Features</Text>
          <Text style={styles.infoText}>
            • Live network status (online/offline){'\n'}
            • 4 states: idle/loading/success/error{'\n'}
            • Retry button with counter{'\n'}
            • Offline banner (auto-detect){'\n'}
            • Error UI with clear message{'\n'}
            • Success confirmation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
  networkBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.md, borderWidth: 1, marginBottom: 16 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  networkText: { fontSize: 13, fontWeight: '700', flex: 1 },
  controls: { marginBottom: 20 },
  section: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 10 },
  card: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 24, alignItems: 'center', gap: 8, marginBottom: 12 },
  loadingText: { color: colors.textMuted, fontSize: 13, marginTop: 8 },
  successCard: { backgroundColor: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)' },
  successIcon: { fontSize: 44, color: colors.accent, fontWeight: '700' },
  successTitle: { fontSize: 16, fontWeight: '700', color: colors.accent },
  successMeta: { fontSize: 12, color: colors.textMuted },
  errorCard: { backgroundColor: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.3)' },
  errorIcon: { fontSize: 44 },
  errorTitle: { fontSize: 16, fontWeight: '700', color: colors.danger },
  errorDesc: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  retryCount: { fontSize: 11, color: colors.textDim, marginTop: 4 },
  offlineCard: { backgroundColor: 'rgba(251,191,36,0.08)', borderColor: 'rgba(251,191,36,0.3)' },
  offlineIcon: { fontSize: 44 },
  offlineTitle: { fontSize: 16, fontWeight: '700', color: colors.warning },
  offlineDesc: { fontSize: 12, color: colors.textMuted },
  idleText: { color: colors.textMuted, fontSize: 14 },
  infoCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginTop: 8 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },
});