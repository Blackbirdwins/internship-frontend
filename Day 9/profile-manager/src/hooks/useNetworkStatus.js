import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function useNetworkStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setOnline(true);
      return;
    }

    const on = () => setOnline(true);
    const off = () => setOnline(false);

    setOnline(navigator.onLine);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);

    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return online;
}