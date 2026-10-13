import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import { useProfile } from '../contexts/ProfileContext';
import {
  getCurrentPosition,
  reverseGeocode,
  getPermissionStatus,
  formatCoords,
  isLocationEnabled,
} from '../utils/location';
import { isWeb, getPlatformName, openSettings } from '../utils/permissions';

export default function LocationScreen({ navigation }) {
  const { showToast } = useToast();
  const { profile, updateProfile } = useProfile();

  const [permission, setPermission] = useState('unknown');
  const [servicesOn, setServicesOn] = useState(true);
  const [location, setLocation] = useState(profile.location || null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getPermissionStatus();
      setPermission(p);
      const enabled = await isLocationEnabled();
      setServicesOn(enabled);
    })();
  }, []);

  const handleGetLocation = async () => {
    setLoading(true);
    setAddress(null);

    const result = await getCurrentPosition();
    if (!result.success) {
      setLoading(false);
      if (result.code === 'PERMISSION_DENIED') {
        showToast('Permission denied — Settings se enable karo', 'error');
        setPermission('denied');
      } else if (result.code === 'SERVICES_OFF') {
        showToast('Location services off hain', 'warning');
        setServicesOn(false);
      } else if (result.code === 'TIMEOUT') {
        showToast('Location fetch timeout', 'warning');
      } else {
        showToast('Error: ' + result.error, 'error');
      }
      return;
    }

    setLocation(result.coords);
    setPermission('granted');

    // Reverse geocode
    const geo = await reverseGeocode(result.coords.latitude, result.coords.longitude);
    if (geo.success) {
      setAddress(geo.address);
    }

    // Save to profile
    await updateProfile({
      location: {
        ...result.coords,
        address: geo.success ? geo.address.full : null,
        timestamp: result.timestamp,
      },
    });

    setLoading(false);
    showToast('Location fetched ✓', 'success');
  };

  const handleClear = async () => {
    setLocation(null);
    setAddress(null);
    await updateProfile({ location: null });
    showToast('Location cleared', 'warning');
  };

  const permColor = {
    granted: colors.accent,
    denied: colors.danger,
    undetermined: colors.warning,
    unknown: colors.textDim,
  }[permission] || colors.textDim;

  const savedLoc = profile.location;

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Location"
        subtitle={`Task 4 — ${getPlatformName()}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Platform + Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Platform</Text>
            <Text style={styles.statusValue}>{getPlatformName()}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Permission</Text>
            <View style={[styles.badge, { backgroundColor: permColor + '22' }]}>
              <Text style={[styles.badgeText, { color: permColor }]}>
                {permission.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Services</Text>
            <Text style={[styles.statusValue, { color: servicesOn ? colors.accent : colors.danger }]}>
              {servicesOn ? '✓ Enabled' : '✕ Disabled'}
            </Text>
          </View>
        </View>

        {/* Get Location Button */}
        <Button
          variant="primary"
          onPress={handleGetLocation}
          loading={loading}
          disabled={loading}
          style={{ marginBottom: 12 }}
        >
          {loading ? 'Fetching...' : '📍 Get My Location'}
        </Button>

        {permission === 'denied' && !isWeb && (
          <Button
            variant="outline"
            onPress={openSettings}
            style={{ marginBottom: 12 }}
          >
            ⚙️ Open Settings
          </Button>
        )}

        {/* Live loading */}
        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {/* Current Location */}
        {location && !loading && (
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationTitle}>Current Location</Text>
            </View>

            <View style={styles.coordRow}>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>LATITUDE</Text>
                <Text style={styles.coordValue}>{location.latitude.toFixed(6)}</Text>
              </View>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>LONGITUDE</Text>
                <Text style={styles.coordValue}>{location.longitude.toFixed(6)}</Text>
              </View>
            </View>

            {location.accuracy && (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Accuracy</Text>
                <Text style={styles.metaValue}>± {location.accuracy.toFixed(0)} m</Text>
              </View>
            )}

            {address && (
              <View style={styles.addressBox}>
                <Text style={styles.addressLabel}>ADDRESS</Text>
                <Text style={styles.addressText}>{address.full || '—'}</Text>
                {address.street && <Text style={styles.addressSub}>{address.street}</Text>}
                {address.postalCode && <Text style={styles.addressSub}>Postal: {address.postalCode}</Text>}
              </View>
            )}

            <Button
              variant="ghost"
              size="sm"
              onPress={handleClear}
              style={{ marginTop: 12 }}
            >
              🗑️ Clear Location
            </Button>
          </View>
        )}

        {/* Saved Location (from profile) */}
        {savedLoc && !location && (
          <View style={styles.savedCard}>
            <Text style={styles.savedTitle}>💾 Saved Location</Text>
            <Text style={styles.savedCoords}>
              {formatCoords(savedLoc.latitude, savedLoc.longitude)}
            </Text>
            {savedLoc.address && (
              <Text style={styles.savedAddress}>{savedLoc.address}</Text>
            )}
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Kya Seekha</Text>
          <Text style={styles.infoText}>
            • `expo-location` — GPS access{'\n'}
            • Permission request → granted/denied{'\n'}
            • `getCurrentPositionAsync()` — coords fetch{'\n'}
            • `Location.Accuracy.High` — precise GPS{'\n'}
            • **Reverse geocoding** — coords → address{'\n'}
            • Timeout handling (15 sec){'\n'}
            • Services off detection{'\n'}
            • Save to profile (AsyncStorage)
          </Text>
        </View>

        {/* Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>ℹ️ Optional Task</Text>
          <Text style={styles.noteText}>
            Location permission optional hai. Web pe browser location API
            use hota hai (HTTPS required). Android/iOS pe native GPS.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  statusCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    ...shadows.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statusLabel: { fontSize: 12, color: colors.textMuted },
  statusValue: { fontSize: 12, color: colors.text, fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },

  loadingCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 30,
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  loadingText: { color: colors.textMuted, fontSize: 13 },

  locationCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.3)',
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 12,
    ...shadows.sm,
  },
  locationHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  locationIcon: { fontSize: 24 },
  locationTitle: { fontSize: 15, fontWeight: '700', color: colors.text },

  coordRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  coordItem: {
    flex: 1,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.sm,
    padding: 12,
  },
  coordLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  coordValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'monospace',
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginBottom: 8,
  },
  metaLabel: { fontSize: 12, color: colors.textMuted },
  metaValue: { fontSize: 12, color: colors.text, fontWeight: '600' },

  addressBox: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.sm,
    padding: 12,
    marginTop: 8,
  },
  addressLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  addressText: { fontSize: 13, color: colors.text, fontWeight: '600', lineHeight: 20 },
  addressSub: { fontSize: 11, color: colors.textMuted, marginTop: 4 },

  savedCard: {
    backgroundColor: 'rgba(129,140,248,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.3)',
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  savedTitle: { fontSize: 13, fontWeight: '700', color: colors.primary, marginBottom: 6 },
  savedCoords: { fontSize: 13, fontFamily: 'monospace', color: colors.text, marginBottom: 4 },
  savedAddress: { fontSize: 12, color: colors.textMuted },

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

  noteCard: {
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
    borderRadius: radius.md,
    padding: 14,
  },
  noteTitle: { fontSize: 12, fontWeight: '700', color: colors.warning, marginBottom: 6 },
  noteText: { fontSize: 12, color: colors.textMuted, lineHeight: 20 },
});