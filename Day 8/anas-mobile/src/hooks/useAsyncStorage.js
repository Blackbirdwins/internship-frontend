import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from '../utils/logger';

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (mounted && raw !== null) {
          setValue(JSON.parse(raw));
        }
      } catch (err) {
        log('AsyncStorage load error:', key, err.message);
      } finally {
        if (mounted) setLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, [key]);

  // Save on change
  const save = useCallback(
    async (newValue) => {
      setValue(newValue);
      try {
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
        log('AsyncStorage saved:', key);
      } catch (err) {
        log('AsyncStorage save error:', key, err.message);
      }
    },
    [key]
  );

  const remove = useCallback(async () => {
    setValue(initialValue);
    await AsyncStorage.removeItem(key);
    log('AsyncStorage removed:', key);
  }, [key, initialValue]);

  return [value, save, { loaded, remove }];
}