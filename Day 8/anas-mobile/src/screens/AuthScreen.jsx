import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../utils/theme';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { useToast } from '../contexts/ToastContext';

export default function AuthScreen({ navigation }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleLogin = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Welcome back, Anas!', 'success');
      navigation.goBack();
    }, 1200);
  };

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  return (
    <View style={styles.root}>
      <Header title="Login" subtitle="Welcome back" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoIcon}>⚡</Text>
            </View>
            <Text style={styles.title}>Anas Mobile</Text>
            <Text style={styles.tagline}>Sign in to continue</Text>
          </View>

          <Card>
            <Input
              label="Email"
              value={form.email}
              onChangeText={(v) => update('email', v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              error={errors.email}
            />
            <Input
              label="Password"
              value={form.password}
              onChangeText={(v) => update('password', v)}
              placeholder="Min 6 characters"
              secureTextEntry
              error={errors.password}
            />
            <Button onPress={handleLogin} loading={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Card>

          <Text style={styles.hint}>Demo: any email + 6+ char password</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl * 2,
    flexGrow: 1,
  },
  brand: { alignItems: 'center', gap: spacing.sm, marginVertical: spacing.xl },
  logo: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoIcon: { fontSize: 32 },
  title: { ...typography.h1, color: colors.text },
  tagline: { ...typography.body, color: colors.textMuted },
  hint: { ...typography.small, color: colors.textDim, textAlign: 'center', marginTop: spacing.md },
});