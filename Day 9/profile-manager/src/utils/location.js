import * as Location from 'expo-location';
import { Platform } from 'react-native';

// Check if location service is enabled
export const isLocationEnabled = async () => {
  if (Platform.OS === 'web') return true;
  try {
    return await Location.hasServicesEnabledAsync();
  } catch {
    return false;
  }
};

// Get current position with high accuracy
export const getCurrentPosition = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return { success: false, error: 'Permission denied', code: 'PERMISSION_DENIED' };
    }

    const enabled = await isLocationEnabled();
    if (!enabled) {
      return { success: false, error: 'Location services off', code: 'SERVICES_OFF' };
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeout: 15000,
    });

    return {
      success: true,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      },
      timestamp: position.timestamp,
    };
  } catch (e) {
    if (e.message?.includes('timeout')) {
      return { success: false, error: 'Timeout', code: 'TIMEOUT' };
    }
    return { success: false, error: e.message || 'Unknown error', code: 'ERROR' };
  }
};

// Reverse geocode (coords → address)
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (results && results[0]) {
      const r = results[0];
      return {
        success: true,
        address: {
          city: r.city || r.subregion || r.region || '',
          region: r.region || '',
          country: r.country || '',
          postalCode: r.postalCode || '',
          street: r.street || '',
          full: [r.city, r.region, r.country].filter(Boolean).join(', '),
        },
      };
    }
    return { success: false, error: 'No address found' };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

// Permission status
export const getPermissionStatus = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status;
  } catch {
    return 'unknown';
  }
};

// Format coords for display
export const formatCoords = (lat, lon) => {
  if (lat === undefined || lon === undefined) return '—';
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
};      