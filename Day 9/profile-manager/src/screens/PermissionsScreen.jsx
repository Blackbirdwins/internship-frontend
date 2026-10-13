import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import {
  PERMISSIONS,
  checkPermission,
  requestPermission,
  openSettings,
  getPlatformName,
  isWeb,
} from '../utils/permissions';

const PERMISSION_LIST = [
  {
    id: 'camera',
    type: PERMISSIONS.camera,
    icon: '📸',
    title: 'Camera',
    desc: 'Photos lene ke liye',
    perm: 'camera',
  },
  {
    id: 'photos',
    type: PERMISSIONS.photos,
    icon: '🖼️',
    title: 'Photo Library',
    desc: 'Gallery se photos choose karne ke liye',
    perm: 'photos',
  },
  {
    id: 'location',
    type: PERMISSIONS.location,
    icon: '📍',
    title: 'Location',
    desc: 'GPS coordinates access ke liye',
    perm: 'location',
  },
];

function StatusBadge({ status }) {
  const map = {
    granted: { color: colors.accent, text: '✓ Granted', bg: 'rgba(52,211,153,0.15)' },
    denied: { color: colors.danger, text: '✕ Denied', bg: 'rgba(248,113,113,0.15)' },
    undetermined: { color: colors.warning, text: '? Not asked', bg: 'rgba(251,191,36,0.15)' },
    unknown: { color: colors.textDim, text: '— Unknown', bg: 'rgba(100,116,139,0.15)' },
    web: { color: colors.primary, text: 'Web', bg: 'rgba(129,140,248,0.15)' },
  };
  const c = map[status] || map.unknown;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.color }]}>{c.text}</Text>
    </View>
  );
}

export default function PermissionsScreen({ navigation }) {
  const { showToast } = useToast();
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState({});

  const refreshAll = async () => {
    const next = {};
    for (const p of PERMISSION_LIST) {
      next[p.id] = await checkPermission(p.type);
    }
    setStatuses(next);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleRequest = async (item) => {
    setLoading(prev => ({ ...prev, [item.id]: true }));
    const result = await requestPermission(item.type);
    setLoading(prev => ({ ...prev, [item.id]: false }));

    if (result.granted) {
      showToast(`${item.title} permission granted`, 'success');
    } else if (result.status === 'denied') {
      showToast(`${item.title} denied — Settings mein enable karo`, 'error');
    } else {
      showToast(`${item.title} — status: ${result.status}`, 'warning');
    }
    await refreshAll();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Permissions"
        subtitle={`Task 1 — ${getPlatformName()}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Platform info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📱</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Running on {getPlatformName()}</Text>
            <Text style={styles.infoDesc}>
              {isWeb
                ? 'Web pe permissions browser handle karta hai'
                : 'Android/iOS pe runtime permission request hoti hai'}
            </Text>
          </View>
        </View>

        {/* Permissions list */}
        <Text style={styles.sectionLabel}>PERMISSIONS</Text>

        {PERMISSION_LIST.map(item => (
          <View key={item.id} style={styles.permCard}>
            <View style={styles.permHeader}>
              <View style={styles.permIconBox}>
                <Text style={styles.permIcon}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.permTitle}>{item.title}</Text>
                <Text style={styles.permDesc}>{item.desc}</Text>
              </View>
              <StatusBadge status={statuses[item.id]} />
            </View>

            <Button
              variant="outline"
              size="sm"
              loading={loading[item.id]}
              onPress={() => handleRequest(item)}
              style={{ marginTop: spacing.md }}
            >
              Request {item.title}
            </Button>
          </View>
        ))}

        {/* Action buttons */}
        <Text style={styles.sectionLabel}>ACTIONS</Text>

        <Button
          variant="primary"
          onPress={refreshAll}
          style={{ marginBottom: 10 }}
        >
          🔄 Refresh All Statuses
        </Button>

        {!isWeb && (
          <Button
            variant="ghost"
            onPress={openSettings}
          >
            ⚙️ Open App Settings
          </Button>
        )}

        {/* Info card */}
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>💡 Kya Seekha</Text>
          <Text style={styles.noteText}>
            • Android pe runtime permission request{'\n'}
            • iOS pe native alert{'\n'}
            • Web pe browser handle{'\n'}
            • Denied → Settings se enable{'\n'}
            • Status: granted / denied / undetermined
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(129,140,248,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.3)',
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 20,
  },
  infoIcon: { fontSize: 24 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  infoDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 18 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 4,
  },

  permCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    ...shadows.sm,
  },
  permHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  permIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permIcon: { fontSize: 22 },
  permTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  permDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },

  noteCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginTop: 20,
  },
  noteTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  noteText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },
});