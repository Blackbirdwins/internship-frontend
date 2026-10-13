import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/Input';
import NeonButton from '../components/NeonButton';
import { radius, shadows, neonGlow } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const { colors, isDark, toggle, accent } = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState('anas');
  const [password, setPassword] = useState('anas123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      showToast(result.error, 'error');
    } else {
      showToast(`Welcome, ${result.user.name}`, 'success');
    }
  };

  const logoGlow = Platform.OS === 'web' ? neonGlow(accent.glow, 30, 0.8) : {};

  return (
    <LinearGradient colors={isDark ? ['#05060A', '#0A0E1A', '#05060A'] : ['#F1F5F9', '#E2E8F0', '#F1F5F9']} style={{ flex: 1 }}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <View style={styles.topRow}>
              <View style={{ flex: 1 }} />
              <Pressable
                onPress={toggle}
                style={[styles.iconBtn, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}
              >
                <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={18} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.brand}>
              <View style={[styles.logo, { backgroundColor: colors.primary }, logoGlow]}>
                <Ionicons name="flash" size={40} color="#05060A" />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>CAPSTONE</Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                {accent.name.toUpperCase()} EDITION · v1.0
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.lg }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>SIGN IN</Text>
              <Text style={[styles.cardSub, { color: colors.textMuted }]}>Enter your credentials to continue</Text>

              <Input
                label="USERNAME"
                value={username}
                onChangeText={setUsername}
                placeholder="anas"
                autoCapitalize="none"
                icon="person-outline"
              />
              <Input
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                secureTextEntry
                icon="lock-closed-outline"
              />

              {error ? (
                <View style={[styles.errorBox, { backgroundColor: colors.dangerSoft, borderColor: colors.danger }]}>
                  <Ionicons name="alert-circle" size={16} color={colors.danger} />
                  <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
                </View>
              ) : null}

              <NeonButton variant="primary" onPress={handleLogin} loading={loading} fullWidth size="lg">
                Sign In
              </NeonButton>
            </View>

            <View style={styles.hintBox}>
              <Text style={[styles.hintLabel, { color: colors.textDim }]}>DEMO ACCESS</Text>
              <Text style={[styles.hintText, { color: colors.textMuted }]}>
                anas / anas123  ·  ali / ali123
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate('Register')} style={styles.registerRow}>
              <Text style={{ color: colors.textMuted, fontSize: 13.5 }}>New here? </Text>
              <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 13.5, letterSpacing: 0.4 }}>
                CREATE ACCOUNT
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 24, paddingBottom: 40, flexGrow: 1 },
  topRow: { flexDirection: 'row', marginBottom: 20 },
  iconBtn: {
    width: 40, height: 40, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
  brand: { alignItems: 'center', marginBottom: 32 },
  logo: {
    width: 80, height: 80, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  title: { fontSize: 32, fontWeight: '900', letterSpacing: 6, marginBottom: 6 },
  subtitle: { fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  card: { padding: 24, borderRadius: radius.lg, borderWidth: 1, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: '800', letterSpacing: 2, marginBottom: 4 },
  cardSub: { fontSize: 12, fontWeight: '500', marginBottom: 20 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 10, borderRadius: radius.sm, marginBottom: 12, borderWidth: 1,
  },
  errorText: { fontSize: 12.5, fontWeight: '600', flex: 1 },
  hintBox: { alignItems: 'center', marginBottom: 24 },
  hintLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  hintText: { fontSize: 12.5, fontWeight: '500', letterSpacing: 0.5 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});