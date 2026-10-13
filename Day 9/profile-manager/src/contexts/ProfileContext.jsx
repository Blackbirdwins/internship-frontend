import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext(null);

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be inside ProfileProvider');
  return ctx;
};

const STORAGE_KEY = '@profile_data';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: 'Anas Khan',
    email: 'anas@example.pk',
    phone: '+92 300 1234567',
    bio: 'Full Stack Developer',
    imageUri: null,
    location: null,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch (e) {}
      finally { setLoaded(true); }
    })();
  }, []);

  const updateProfile = async (updates) => {
    const next = { ...profile, ...updates };
    setProfile(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loaded }}>
      {children}
    </ProfileContext.Provider>
  );
}