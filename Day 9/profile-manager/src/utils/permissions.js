import { Platform, Linking, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Check platform
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Permission types
export const PERMISSIONS = {
  camera: 'camera',
  photos: 'photos',
  location: 'location',
};

// Get permission status
export const checkPermission = async (type) => {
  try {
    if (isWeb) {
      // Web: browser APIs
      if (type === PERMISSIONS.camera) {
        const result = await navigator.permissions?.query({ name: 'camera' });
        return result?.state || 'unknown';
      }
      if (type === PERMISSIONS.location) {
        const result = await navigator.permissions?.query({ name: 'geolocation' });
        return result?.state || 'unknown';
      }
      return 'unknown';
    }

    if (type === PERMISSIONS.camera) {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      return status;
    }
    if (type === PERMISSIONS.photos) {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      return status;
    }
    if (type === PERMISSIONS.location) {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status;
    }
  } catch (e) {
    return 'unknown';
  }
  return 'unknown';
};

// Request permission
export const requestPermission = async (type) => {
  try {
    if (isWeb) {
      // Web: no explicit permission request API for most
      return { granted: true, status: 'granted', web: true };
    }

    if (type === PERMISSIONS.camera) {
      const result = await ImagePicker.requestCameraPermissionsAsync();
      return { granted: result.granted, status: result.status };
    }
    if (type === PERMISSIONS.photos) {
      const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return { granted: result.granted, status: result.status };
    }
    if (type === PERMISSIONS.location) {
      const result = await Location.requestForegroundPermissionsAsync();
      return { granted: result.granted, status: result.status };
    }
  } catch (e) {
    return { granted: false, status: 'error', error: e.message };
  }
  return { granted: false, status: 'unknown' };
};

// Open device settings
export const openSettings = async () => {
  if (isWeb) {
    Alert.alert('Info', 'Web pe browser settings use karo');
    return;
  }
  try {
    await Linking.openSettings();
  } catch (e) {
    Alert.alert('Error', 'Settings nahi khul sake');
  }
};

// Platform name
export const getPlatformName = () => {
  if (isWeb) return 'Web';
  if (isIOS) return 'iOS';
  if (isAndroid) return 'Android';
  return 'Unknown';
};