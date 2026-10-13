import { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';

const RULES = {
  username: (v) => {
    if (!v) return 'Username is required';
    if (v.length < 3) return 'Min 3 characters';
    if (v.length > 20) return 'Max 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Only letters, numbers, underscore';
    return null;
  },
  email: (v) => {
    if (!v) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(v)) return 'Invalid email format';
    return null;
  },
  age: (v) => {
    if (!v) return 'Age is required';
    const n = Number(v);
    if (isNaN(n)) return 'Must be a number';
    if (n < 13) return 'Min age 13';
    if (n > 120) return 'Max age 120';
    return null;
  },
};

export default function ValidationScreen({ navigation }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ username: '', email: '', age: '' });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState(null);

  const errors = {};
  Object.keys(RULES).forEach(k => {
    const e = RULES[k](form[k]);
    if (e) errors[k] = e;
  });

  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field) => setTouched(p => ({ ...p, [field]: true }));

  const handleSubmit = async () => {
    setTouched({ username: true, email: true, age: true });
    if (!isValid) {
      showToast('Form mein errors hain', 'error');
      setSubmitState('error');
      return;
    }
    setSubmitting(true);
    setSubmitState('submitting');
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitState('success');
    showToast('Form submitted ✓', 'success');
  };

  const Field = ({ name, label, placeholder, keyboardType }) => {
    const showError = touched[name] && errors[name];
    return (
      <View style={styles.field}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {form[name] && !errors[name] && (
            <Text style={styles.validIcon}>✓</Text>
          )}
        </View>
        <TextInput
          value={form[name]}
          onChangeText={(v) => setForm(p => ({ ...p, [name]: v }))}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          placeholderTextColor={colors.textDim}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={[
            styles.input,
            showError && styles.inputError,
            form[name] && !errors[name] && styles.inputValid,
          ]}
        />
        {showError && (
          <View style={styles.errorRow}>
            <Text style={styles.errorIcon}>✕</Text>
            <Text style={styles.errorText}>{errors[name]}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Validation UX"
        subtitle="Task 7 — Inline errors"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>✅ Mobile Validation UX</Text>
          <Text style={styles.heroDesc}>
            Inline errors • Blur validation • Success/error states
          </Text>
        </View>

        <Field name="username" label="USERNAME *" placeholder="anas_khan" />
        <Field name="email" label="EMAIL *" placeholder="you@example.com" keyboardType="email-address" />
        <Field name="age" label="AGE *" placeholder="20" keyboardType="number-pad" />

        {/* Submit state indicator */}
        {submitState && (
          <View style={[
            styles.stateBadge,
            submitState === 'success' && { backgroundColor: colors.accent + '22', borderColor: colors.accent },
            submitState === 'error' && { backgroundColor: colors.danger + '22', borderColor: colors.danger },
            submitState === 'submitting' && { backgroundColor: colors.primary + '22', borderColor: colors.primary },
          ]}>
            <Text style={styles.stateText}>
              {submitState === 'success' && '✓ Submitted'}
              {submitState === 'error' && '✕ Has errors'}
              {submitState === 'submitting' && '⏳ Submitting...'}
            </Text>
          </View>
        )}

        <Button
          variant="primary"
          onPress={handleSubmit}
          loading={submitting}
          disabled={!isValid || submitting}
          style={{ marginBottom: 10 }}
        >
          {submitting ? 'Submitting...' : isValid ? '✓ Submit' : '✕ Fix Errors'}
        </Button>

        <Button variant="ghost" onPress={() => { setForm({ username: '', email: '', age: '' }); setTouched({}); setSubmitState(null); }}>
          🔄 Reset
        </Button>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Task 7 Features</Text>
          <Text style={styles.infoText}>
            • Inline errors (field ke neeche){'\n'}
            • Blur validation (type nahi, blur pe){'\n'}
            • Green checkmark when valid{'\n'}
            • Red border on error{'\n'}
            • Submit disabled when invalid{'\n'}
            • Submit states: idle/submitting/success/error{'\n'}
            • Reset button
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  heroCard: { backgroundColor: 'rgba(52,211,153,0.08)', borderWidth: 1, borderColor: 'rgba(52,211,153,0.3)', borderRadius: radius.md, padding: 14, marginBottom: 20 },
  heroTitle: { fontSize: 15, fontWeight: '700', color: colors.accent, marginBottom: 4 },
  heroDesc: { fontSize: 12.5, color: colors.textMuted, lineHeight: 18 },

  field: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: 11, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4 },
  validIcon: { fontSize: 14, color: colors.accent, fontWeight: '700' },
  input: { backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 13, color: colors.text, fontSize: 15, fontWeight: '500', minHeight: 48 },
  inputError: { borderColor: colors.danger, borderWidth: 1.5 },
  inputValid: { borderColor: colors.accent },

  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  errorIcon: { fontSize: 11, color: colors.danger, fontWeight: '700' },
  errorText: { color: colors.danger, fontSize: 11.5, fontWeight: '600' },

  stateBadge: { padding: 12, borderRadius: radius.md, borderWidth: 1, alignItems: 'center', marginBottom: 12 },
  stateText: { fontSize: 13, fontWeight: '700', color: colors.text },

  infoCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginTop: 16 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 8 },
  infoText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 22 },
});