import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { radius, shadows } from '../utils/theme';

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    if (password.length < 6) {
      setError('Password min 6 characters');
      return;
    }
    setLoading(true);
    const result = await register(username, password, name);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      showToast(result.error, 'error');
    } else {
      showToast('Account created!', 'success');
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}
          >
            <Text style={{ fontSize: 16, color: colors.text }}>←</Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Just a few details to get started
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.sm }]}>
            <Input label="FULL NAME" value={name} onChangeText={setName} placeholder="Anas Khan" icon="👤" />
            <Input
              label="USERNAME"
              value={username}
              onChangeText={setUsername}
              placeholder="anas"
              autoCapitalize="none"
              icon="@"
            />
            <Input
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              placeholder="Min 6 characters"
              secureTextEntry
              icon="🔒"
            />
            {error ? (
              <View style={[styles.errorBox, { backgroundColor: colors.dangerSoft }]}>
                <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
              </View>
            ) : null}
            <Button variant="primary" onPress={handleRegister} loading={loading} fullWidth>
              Create Account
            </Button>
          </View>

          <Pressable onPress={() => navigation.goBack()} style={styles.loginRow}>
            <Text style={{ color: colors.textMuted, fontSize: 13.5 }}>Already a member? </Text>
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 13.5 }}>Sign In</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 24, paddingBottom: 40, flexGrow: 1 },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, marginBottom: 24,
  },
  header: { marginBottom: 28 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, marginBottom: 6 },
  subtitle: { fontSize: 14, fontWeight: '500' },
  card: { padding: 20, borderRadius: radius.lg, borderWidth: 0.5, marginBottom: 20 },
  errorBox: { padding: 10, borderRadius: radius.sm, marginBottom: 12 },
  errorText: { fontSize: 12.5, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});