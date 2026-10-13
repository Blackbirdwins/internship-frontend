import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import ImagePickerButton from '../components/ImagePickerButton';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import { isWeb, getPlatformName } from '../utils/permissions';

export default function ImagePickerScreen({ navigation }) {
  const { showToast } = useToast();
  const [image, setImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);

  const handleSave = () => {
    if (!image) {
      showToast('Pehle image select karo', 'warning');
      return;
    }
    setSavedImage(image);
    showToast('Image saved locally ✓', 'success');
  };

  const handleReset = () => {
    setImage(null);
    setSavedImage(null);
    showToast('Reset done', 'info');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Image Picker"
        subtitle={`Task 2 — ${getPlatformName()}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Main Picker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📸 Select Image</Text>
          <Text style={styles.cardDesc}>
            Gallery se choose karo {!isWeb && 'ya camera se photo lo'}
          </Text>
          <ImagePickerButton
            imageUri={image}
            onImageChange={setImage}
            size={160}
          />
        </View>

        {/* Preview */}
        {image && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>👁️ Preview</Text>
            <Text style={styles.cardDesc}>Selected image ka preview</Text>
            <Image source={{ uri: image }} style={styles.preview} resizeMode="cover" />
            <View style={styles.previewActions}>
              <Button
                variant="primary"
                size="sm"
                onPress={handleSave}
                style={{ flex: 1 }}
              >
                💾 Save Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onPress={handleReset}
                style={{ flex: 1 }}
              >
                🔄 Reset
              </Button>
            </View>
          </View>
        )}

        {/* Saved confirmation */}
        {savedImage && (
          <View style={[styles.card, styles.savedCard]}>
            <Text style={styles.savedIcon}>✅</Text>
            <Text style={styles.savedTitle}>Image Saved</Text>
            <Text style={styles.savedDesc}>
              Yeh URI AsyncStorage mein persist kiya ja sakta hai (Task 3)
            </Text>
            <Text style={styles.uri} numberOfLines={2}>{savedImage}</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Kya Seekha</Text>
          <Text style={styles.infoText}>
            • `expo-image-picker` — gallery + camera{'\n'}
            • `launchImageLibraryAsync()` — gallery{'\n'}
            • `launchCameraAsync()` — camera{'\n'}
            • `allowsEditing` — crop/edit{'\n'}
            • `aspect` — 1:1 ratio{'\n'}
            • `quality: 0.8` — compressed image{'\n'}
            • Permissions required (Task 1)
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 12,
    ...shadows.sm,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 4 },
  cardDesc: { fontSize: 12.5, color: colors.textMuted, marginBottom: 16 },

  preview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.md,
    marginBottom: 12,
    backgroundColor: colors.bgElevated,
  },
  previewActions: { flexDirection: 'row', gap: 8 },

  savedCard: {
    borderColor: 'rgba(52,211,153,0.4)',
    backgroundColor: 'rgba(52,211,153,0.06)',
    alignItems: 'center',
  },
  savedIcon: { fontSize: 40, marginBottom: 6 },
  savedTitle: { fontSize: 15, fontWeight: '700', color: colors.accent, marginBottom: 4 },
  savedDesc: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginBottom: 10 },
  uri: {
    fontSize: 10,
    color: colors.textDim,
    fontFamily: 'monospace',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

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