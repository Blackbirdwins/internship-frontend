import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Button from './Button';
import { useToast } from '../contexts/ToastContext';

export default function ImagePickerButton({ imageUri, onImageChange, size = 140 }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const requestPermission = async (type) => {
    if (Platform.OS === 'web') return { granted: true };

    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return { granted: status === 'granted' };
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return { granted: status === 'granted' };
  };

  const pickFromGallery = async () => {
    setLoading(true);
    try {
      const perm = await requestPermission('gallery');
      if (!perm.granted) {
        showToast('Gallery permission denied', 'error');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        onImageChange(result.assets[0].uri);
        showToast('Image selected ✓', 'success');
      }
    } catch (e) {
      showToast('Error: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const pickFromCamera = async () => {
    setLoading(true);
    try {
      const perm = await requestPermission('camera');
      if (!perm.granted) {
        showToast('Camera permission denied', 'error');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        onImageChange(result.assets[0].uri);
        showToast('Photo captured ✓', 'success');
      }
    } catch (e) {
      showToast('Error: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Remove image?')) {
        onImageChange(null);
        showToast('Image removed', 'warning');
      }
      return;
    }
    Alert.alert('Remove Image', 'Kya aap image hatana chahte ho?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => {
        onImageChange(null);
        showToast('Image removed', 'warning');
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={imageUri ? removeImage : pickFromGallery}
        style={({ pressed }) => [
          styles.avatarBox,
          { width: size, height: size, borderRadius: size / 2 },
          pressed && { opacity: 0.9 },
        ]}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Tap to add</Text>
          </View>
        )}
      </Pressable>

      <View style={styles.actions}>
        <Button
          variant="outline"
          size="sm"
          onPress={pickFromGallery}
          loading={loading}
          style={{ flex: 1 }}
        >
          🖼️ Gallery
        </Button>
        {Platform.OS !== 'web' && (
          <Button
            variant="outline"
            size="sm"
            onPress={pickFromCamera}
            loading={loading}
            style={{ flex: 1 }}
          >
            📸 Camera
          </Button>
        )}
        {imageUri && (
          <Button
            variant="ghost"
            size="sm"
            onPress={removeImage}
            style={{ flex: 1 }}
          >
            🗑️ Remove
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 16, marginBottom: 20 },
  avatarBox: {
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.border2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadows.sm,
  },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', gap: 6 },
  placeholderIcon: { fontSize: 32 },
  placeholderText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    maxWidth: 400,
    flexWrap: 'wrap',
  },
});