import { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, StyleSheet, Image, Pressable,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { useToast } from '../contexts/ToastContext';
import useAsyncStorage from '../hooks/useAsyncStorage';

const INITIAL = {
  name: 'Anas Khan',
  email: 'anas@example.pk',
  phone: '+92 300 1234567',
  bio: 'Full Stack Developer',
  imageUri: null,
};

export default function ProfileScreen({ navigation }) {
  const { showToast } = useToast();
  const [profile, saveProfile, { loaded, remove }] = useAsyncStorage('@profile_v2', INITIAL);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Load stored profile into form
  useEffect(() => {
    if (loaded) setForm(profile);
  }, [loaded, profile]);

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name?.trim()) errs.name = 'Name required';
    else if (form.name.trim().length < 3) errs.name = 'Min 3 characters';

    if (!form.email?.trim()) errs.email = 'Email required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email';

    if (form.phone && !/^[\d\s+\-()]{7,}$/.test(form.phone)) {
      errs.phone = 'Invalid phone';
    }
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      showToast('Form mein errors hain', 'error');
      return;
    }
    setSaving(true);
    const result = await saveProfile(form);
    setSaving(false);
    if (result.success) showToast('Profile saved ✓', 'success');
    else showToast('Save failed: ' + result.error, 'error');
  };

  const handleReplaceImage = () => {
    // Placeholder — Task 2 ke ImagePickerButton se replace karna
    showToast('Use picker (Task 2) to change image', 'info');
  };

  const handleRemoveImage = () => {
    const doRemove = () => {
      update('imageUri', null);
      showToast('Image removed', 'warning');
    };
    if (Platform.OS === 'web') {
      if (window.confirm('Remove profile image?')) doRemove();
    } else {
      Alert.alert('Remove Image', 'Kya aap profile image hatana chahte ho?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: doRemove },
      ]);
    }
  };

  const handleReset = async () => {
    const doReset = async () => {
      await remove();
      setForm(INITIAL);
      showToast('Profile reset', 'info');
    };
    if (Platform.OS === 'web') {
      if (window.confirm('Reset all profile data?')) doReset();
    } else {
      Alert.alert('Reset Profile', 'Sab data delete ho jayega?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: doReset },
      ]);
    }
  };

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Profile" subtitle="Loading..." onBack={() => navigation.goBack()} />
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const hasChanges = JSON.stringify(form) !== JSON.stringify(profile);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Profile"
        subtitle="Task 3 — Image Flow"
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Image Section */}
          <View style={styles.imageSection}>
            <View style={styles.avatarWrap}>
              {form.imageUri ? (
                <Image source={{ uri: form.imageUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarIcon}>👤</Text>
                  <Text style={styles.avatarHint}>No image</Text>
                </View>
              )}
              <View style={styles.imageBadge}>
                <Text style={styles.imageBadgeText}>
                  {form.imageUri ? '✓ Set' : '— Empty'}
                </Text>
              </View>
            </View>

            <Text style={styles.profileName}>{form.name || 'Your Name'}</Text>
            <Text style={styles.profileEmail}>{form.email || 'your@email.com'}</Text>

            <View style={styles.imageActions}>
              <Button
                variant="outline"
                size="sm"
                onPress={handleReplaceImage}
                style={{ flex: 1 }}
              >
                🔄 Replace
              </Button>
              {form.imageUri && (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={handleRemoveImage}
                  style={{ flex: 1 }}
                >
                  🗑️ Remove
                </Button>
              )}
            </View>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Edit Details</Text>

            <Input
              label="FULL NAME"
              value={form.name}
              onChangeText={(v) => update('name', v)}
              placeholder="Your name"
              error={errors.name}
            />

            <Input
              label="EMAIL"
              value={form.email}
              onChangeText={(v) => update('email', v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="PHONE"
              value={form.phone}
              onChangeText={(v) => update('phone', v)}
              placeholder="+92 300 1234567"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <Input
              label="BIO"
              value={form.bio}
              onChangeText={(v) => update('bio', v)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={3}
              style={{ minHeight: 80, textAlignVertical: 'top' }}
            />
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              variant="primary"
              onPress={handleSave}
              loading={saving}
              disabled={!hasChanges}
              style={{ marginBottom: 10 }}
            >
              {hasChanges ? '💾 Save Changes' : '✓ No Changes'}
            </Button>

            <Button
              variant="danger"
              onPress={handleReset}
            >
              🗑️ Reset Profile
            </Button>
          </View>

          {/* Status Info */}
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>📊 Current State</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Image:</Text>
              <Text style={styles.statusValue}>{form.imageUri ? 'Set' : 'Empty'}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Has Changes:</Text>
              <Text style={styles.statusValue}>{hasChanges ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Storage Key:</Text>
              <Text style={[styles.statusValue, { fontFamily: 'monospace', fontSize: 11 }]}>
                @profile_v2
              </Text>
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Kya Seekha</Text>
            <Text style={styles.infoText}>
              • Image ko **AsyncStorage** mein save kiya{'\n'}
              • **Reload pe image persist** rehti hai{'\n'}
              • Replace = naya image URI set{'\n'}
              • Remove = null set + confirm dialog{'\n'}
              • `hasChanges` — dirty check (save enable/disable){'\n'}
              • `useAsyncStorage` custom hook{'\n'}
              • `KeyboardAvoidingView` — form UX{'\n'}
              • Platform-specific confirm dialogs
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: colors.textMuted, fontSize: 14 },

  // Image section
  imageSection: {
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 20,
    marginBottom: 12,
    ...shadows.sm,
  },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 3, borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 2, borderColor: colors.border2,
    borderStyle: 'dashed',
    backgroundColor: colors.bgElevated,
    alignItems: 'center', justifyContent: 'center',
    gap: 6,
  },
  avatarIcon: { fontSize: 40 },
  avatarHint: { fontSize: 10, color: colors.textMuted, fontWeight: '600' },
  imageBadge: {
    position: 'absolute',
    bottom: 0, right: 0,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: colors.bgElevated,
    borderWidth: 1, borderColor: colors.border2,
  },
  imageBadgeText: { fontSize: 9, fontWeight: '700', color: colors.textMuted },

  profileName: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 2 },
  profileEmail: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },

  imageActions: { flexDirection: 'row', gap: 8, width: '100%', maxWidth: 320 },

  // Form
  formCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 12,
  },
  formTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 16 },

  actions: { marginBottom: 12 },

  // Status
  statusCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  statusTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 10 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  statusLabel: { fontSize: 12, color: colors.textMuted },
  statusValue: { fontSize: 12, color: colors.text, fontWeight: '600' },

  // Info
  infoCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },
});