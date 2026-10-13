import { useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TextInput,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import BottomSheet, { SheetAction } from '../components/BottomSheet';
import { useToast } from '../contexts/ToastContext';
import { getPlatformName } from '../utils/permissions';

const RULES = {
  name: {
    required: 'Name is required',
    minLength: { value: 3, message: 'Min 3 characters' },
    maxLength: { value: 50, message: 'Max 50 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' },
  },
  phone: {
    required: 'Phone is required',
    pattern: { value: /^[\d\s+\-()]{10,}$/, message: 'Min 10 digits' },
  },
  bio: {
    maxLength: { value: 200, message: 'Max 200 characters' },
  },
};

function FormField({ label, error, control, name, rules, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, error && styles.inputError, props.multiline && styles.inputMultiline]}
            placeholderTextColor={colors.textDim}
            {...props}
          />
          {error && (
            <View style={styles.errorRow}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

export default function FormScreen({ navigation }) {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const { control, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    defaultValues: { name: '', email: '', phone: '', bio: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1200));
      setLastSubmission(data);
      showToast('Form submitted ✓', 'success');
      setSheetVisible(true);
    } catch (e) {
      showToast('Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid = () => {
    showToast('Form mein errors hain — check karo', 'error');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="RHF Form"
        subtitle={`Task 6-7-9 — ${getPlatformName()}`}
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
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>📝 React Hook Form</Text>
            <Text style={styles.heroDesc}>
              Controller + Validation + Inline errors + Bottom Sheet
            </Text>
          </View>

          <FormField
            label="FULL NAME *"
            name="name"
            control={control}
            rules={RULES.name}
            placeholder="Your name"
            autoCapitalize="words"
            error={errors.name}
          />

          <FormField
            label="EMAIL *"
            name="email"
            control={control}
            rules={RULES.email}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <FormField
            label="PHONE *"
            name="phone"
            control={control}
            rules={RULES.phone}
            placeholder="+92 300 1234567"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <FormField
            label="BIO (Optional)"
            name="bio"
            control={control}
            rules={RULES.bio}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
            error={errors.bio}
          />

          <View style={styles.actions}>
            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit, onInvalid)}
              loading={submitting}
              disabled={!isDirty}
              style={{ marginBottom: 10 }}
            >
              {submitting ? 'Submitting...' : '✓ Submit Form'}
            </Button>

            <Button variant="ghost" onPress={() => reset()}>
              🔄 Reset Form
            </Button>
          </View>

          {/* Error summary */}
          {Object.keys(errors).length > 0 && (
            <View style={styles.errorSummary}>
              <Text style={styles.errorSummaryTitle}>❌ Form has {Object.keys(errors).length} error(s)</Text>
              {Object.entries(errors).map(([key, err]) => (
                <Text key={key} style={styles.errorSummaryItem}>• {key}: {err.message}</Text>
              ))}
            </View>
          )}

          {/* Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Kya Seekha</Text>
            <Text style={styles.infoText}>
              • **useForm** hook — form state{'\n'}
              • **Controller** — RN TextInput integration{'\n'}
              • **rules** — required, minLength, pattern{'\n'}
              • **errors** — inline field errors{'\n'}
              • **isDirty** — submit enabled/disabled{'\n'}
              • **handleSubmit** — validation on submit{'\n'}
              • **onInvalid** — error callback{'\n'}
              • **reset()** — form clear{'\n'}
              • **BottomSheet** — success modal
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Bottom Sheet */}
      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="✓ Form Submitted"
      >
        {lastSubmission && (
          <View style={{ gap: 12 }}>
            <Text style={{ color: colors.textMuted, fontSize: 13, marginBottom: 8 }}>
              Aapka form successfully submit ho gaya. Yeh data:
            </Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>NAME</Text>
              <Text style={styles.resultValue}>{lastSubmission.name}</Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>EMAIL</Text>
              <Text style={styles.resultValue}>{lastSubmission.email}</Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>PHONE</Text>
              <Text style={styles.resultValue}>{lastSubmission.phone}</Text>
            </View>

            <SheetAction
              icon="✅"
              label="Done"
              onPress={() => setSheetVisible(false)}
            />
            <SheetAction
              icon="🔄"
              label="Fill Again"
              onPress={() => {
                setSheetVisible(false);
                reset();
              }}
            />
            <SheetAction
              icon="🗑️"
              label="Discard"
              variant="danger"
              onPress={() => {
                setSheetVisible(false);
                reset();
                showToast('Discarded', 'warning');
              }}
            />
          </View>
        )}
      </BottomSheet>
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

  field: { marginBottom: 16 },
  label: { fontSize: 11, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4, marginBottom: 6 },
  input: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14, paddingVertical: 13,
    color: colors.text, fontSize: 15, fontWeight: '500',
    minHeight: 48,
  },
  inputError: { borderColor: colors.danger },
  inputMultiline: { minHeight: 90, textAlignVertical: 'top' },

  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  errorIcon: { fontSize: 11 },
  errorText: { color: colors.danger, fontSize: 11.5, fontWeight: '600' },

  actions: { marginTop: 8, marginBottom: 16 },

  errorSummary: {
    backgroundColor: 'rgba(248,113,113,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.3)',
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 12,
  },
  errorSummaryTitle: { fontSize: 12.5, fontWeight: '700', color: colors.danger, marginBottom: 6 },
  errorSummaryItem: { fontSize: 11.5, color: colors.textMuted, lineHeight: 18 },

  infoCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 14,
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },

  resultBox: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.sm,
    padding: 10,
    marginBottom: 6,
  },
  resultLabel: { fontSize: 9, fontWeight: '700', color: colors.textDim, letterSpacing: 0.6, marginBottom: 2 },
  resultValue: { fontSize: 13, color: colors.text, fontWeight: '600' },
});