import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { radius, shadows } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState('Full Stack Developer from Pakistan');
  const [phone, setPhone] = useState('+92 300 1234567');

  const pickImage = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        showToast('Permission denied', 'error');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        showToast('Image updated', 'success');
      }
    } catch (e) {
      showToast('Failed: ' + e.message, 'error');
    }
  };

  const handleSave = () => {
    showToast('Profile saved', 'success');
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="Profile" subtitle="Manage your account" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <Pressable onPress={pickImage}>
            <View style={styles.avatarWrap}>
              <Avatar name={user?.name || 'User'} uri={imageUri} size={110} />
              <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
                <Text style={{ fontSize: 16, color: '#fff' }}>📷</Text>
              </View>
            </View>
          </Pressable>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'User'}</Text>
          <Badge variant={isAdmin ? 'primary' : 'default'}>{isAdmin ? 'ADMINISTRATOR' : 'MEMBER'}</Badge>
        </View>

        <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.sm }]}>
          <Text style={[styles.sectionLabel, { color: colors.textDim }]}>ACCOUNT DETAILS</Text>

          <Input label="USERNAME" value={user?.username || ''} editable={false} icon="@" />
          <Input label="PHONE" value={phone} onChangeText={setPhone} placeholder="+92..." keyboardType="phone-pad" icon="☎" />
          <Input label="BIO" value={bio} onChangeText={setBio} placeholder="Tell us about yourself" multiline numberOfLines={3} />
        </View>

        <Button variant="primary" fullWidth onPress={handleSave}>
          Save Changes
        </Button>

        <View style={[styles.infoCard, { backgroundColor: colors.primarySoft, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.primary }]}>ℹ️ Profile Features</Text>
          <Text style={[styles.infoText, { color: colors.textMuted }]}>
            • Image picker (gallery) • Permissions • Form validation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 24, gap: 10 },
  avatarWrap: { position: 'relative' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FAFAFA' },
  name: { fontSize: 20, fontWeight: '700', letterSpacing: -0.4, marginTop: 8 },
  card: { padding: 20, borderRadius: radius.lg, borderWidth: 0.5, marginBottom: 16 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 14 },
  infoCard: { padding: 14, borderRadius: radius.md, borderWidth: 0.5, marginTop: 12 },
  infoTitle: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  infoText: { fontSize: 12.5, fontWeight: '500', lineHeight: 18 },
});