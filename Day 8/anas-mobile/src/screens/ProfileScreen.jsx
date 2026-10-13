import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../utils/theme';
import { useResponsive } from '../utils/useResponsive';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function ProfileScreen() {
  const { maxWidth, hPad } = useResponsive();

  const [form, setForm] = useState({ name: 'Anas Khan', email: 'anas@example.pk', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const validateProfile = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 3) errs.name = 'Min 3 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleProfile = () => {
    const errs = validateProfile();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const validateLogin = () => {
    const errs = {};
    if (!login.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(login.email)) errs.email = 'Invalid email format';
    if (!login.password) errs.password = 'Password is required';
    else if (login.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleLogin = () => {
    const errs = validateLogin();
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoginErrors({});
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoggedIn(true);
      setTimeout(() => setLoggedIn(false), 3000);
    }, 1500);
  };

  const updateProfile = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const updateLogin = (key, value) => {
    setLogin({ ...login, [key]: value });
    if (loginErrors[key]) setLoginErrors({ ...loginErrors, [key]: undefined });
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Profile" subtitle="Edit your details" />

      <ScrollView
        contentContainerStyle={[styles.content, { maxWidth, paddingHorizontal: hPad, alignSelf: 'center', width: '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.avatarName}>{form.name}</Text>
          <Text style={styles.avatarEmail}>{form.email}</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>🔐 Login</Text>
          {loggedIn && (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>✅ Login successful!</Text>
            </View>
          )}
          <Input label="Email" value={login.email} onChangeText={(v) => updateLogin('email', v)} placeholder="you@example.com" keyboardType="email-address" error={loginErrors.email} />
          <Input label="Password" value={login.password} onChangeText={(v) => updateLogin('password', v)} placeholder="Enter password" secureTextEntry error={loginErrors.password} />
          <Button onPress={handleLogin} loading={loginLoading} disabled={loggedIn}>
            {loginLoading ? 'Logging in...' : loggedIn ? 'Logged In ✅' : 'Login'}
          </Button>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>👤 Edit Profile</Text>
          <Input label="Full Name" value={form.name} onChangeText={(v) => updateProfile('name', v)} placeholder="Your name" error={errors.name} />
          <Input label="Email" value={form.email} onChangeText={(v) => updateProfile('email', v)} placeholder="you@example.com" keyboardType="email-address" error={errors.email} />
          <Input label="Password" value={form.password} onChangeText={(v) => updateProfile('password', v)} placeholder="Enter password" secureTextEntry error={errors.password} />
          <Button onPress={handleProfile} loading={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingVertical: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.lg },
  avatarWrap: { alignItems: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  avatarText: { fontSize: 40, fontWeight: '800', color: '#fff' },
  avatarName: { ...typography.h2, color: colors.text },
  avatarEmail: { ...typography.body, color: colors.textMuted },
  cardTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },
  successBanner: { backgroundColor: 'rgba(52, 211, 153, 0.15)', borderWidth: 1, borderColor: colors.success, borderRadius: 8, padding: spacing.md, marginBottom: spacing.md },
  successText: { ...typography.body, color: colors.success, fontWeight: '700', textAlign: 'center' },
});