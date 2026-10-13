import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (mounted && raw !== null) setValue(JSON.parse(raw));
      } catch (e) {}
      finally { if (mounted) setLoaded(true); }
    })();
    return () => { mounted = false; };
  }, [key]);

  const save = useCallback(async (newValue) => {
    setValue(newValue);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, [key]);

  const remove = useCallback(async () => {
    setValue(initialValue);
    await AsyncStorage.removeItem(key);
  }, [key, initialValue]);

  return [value, save, { loaded, remove }];
}