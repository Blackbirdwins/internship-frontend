import { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import useAppState from '../hooks/useAppState';
import { getPlatformName } from '../utils/permissions';

export default function ExtrasScreen({ navigation }) {
  const { showToast } = useToast();

  const handleAppState = useCallback((next, prev) => {
    if (Platform.OS !== 'web') {
      showToast(`App: ${prev} → ${next}`, 'info');
    }
  }, [showToast]);

  const { state: appState, backgroundedFor } = useAppState(handleAppState);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="App Lifecycle"
        subtitle={`Task 10 — ${getPlatformName()}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>📱 Task 10 — App Lifecycle</Text>
          <Text style={styles.heroDesc}>
            AppState tracking — background/foreground transitions
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Current State</Text>
            <View style={[styles.stateBadge, {
              backgroundColor: appState === 'active' ? colors.accent + '22' : colors.warning + '22',
              borderColor: appState === 'active' ? colors.accent : colors.warning,
            }]}>
              <Text style={[styles.stateText, {
                color: appState === 'active' ? colors.accent : colors.warning,
              }]}>
                {appState.toUpperCase()}
              </Text>
            </View>
          </View>

          {backgroundedFor > 0 && (
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Backgrounded For</Text>
              <Text style={styles.statValue}>{(backgroundedFor / 1000).toFixed(1)} sec</Text>
            </View>
          )}

          <Text style={styles.hint}>
            {Platform.OS === 'web'
              ? 'Web pe browser tab change karke dekho — state update hoga'
              : 'Phone pe app background karke wapas aao — transitions log honge'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Task 10 Features</Text>
          <Text style={styles.infoText}>
            • `useAppState` custom hook{'\n'}
            • AppState.addEventListener{'\n'}
            • States: active, background, inactive{'\n'}
            • Background duration tracking{'\n'}
            • Cross-platform (web + native){'\n'}
            • Auto-cleanup on unmount
          </Text>
        </View>

        <View style={styles.stateExamples}>
          <Text style={styles.stateExTitle}>App States Explained</Text>
          <View style={styles.stateRow}>
            <View style={[styles.dot, { backgroundColor: colors.accent }]} />
            <Text style={styles.stateName}>active</Text>
            <Text style={styles.stateDesc}>App foreground mein hai</Text>
          </View>
          <View style={styles.stateRow}>
            <View style={[styles.dot, { backgroundColor: colors.warning }]} />
            <Text style={styles.stateName}>background</Text>
            <Text style={styles.stateDesc}>User ne home button dabaya</Text>
          </View>
          <View style={styles.stateRow}>
            <View style={[styles.dot, { backgroundColor: colors.textDim }]} />
            <Text style={styles.stateName}>inactive</Text>
            <Text style={styles.stateDesc}>Transition state (iOS only)</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  heroCard: {
    backgroundColor: 'rgba(129,140,248,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.3)',
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 20,
  },
  heroTitle: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  heroDesc: { fontSize: 12.5, color: colors.textMuted, lineHeight: 18 },

  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    ...shadows.sm,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statLabel: { fontSize: 12, color: colors.textMuted },
  statValue: { fontSize: 13, color: colors.text, fontWeight: '700' },
  stateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  stateText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  hint: {
    fontSize: 11,
    color: colors.textDim,
    marginTop: 12,
    fontStyle: 'italic',
    lineHeight: 16,
  },

  infoCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },

  stateExamples: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
  },
  stateExTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 12 },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  stateName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    width: 90,
    fontFamily: 'monospace',
  },
  stateDesc: { fontSize: 11.5, color: colors.textMuted, flex: 1 },
});