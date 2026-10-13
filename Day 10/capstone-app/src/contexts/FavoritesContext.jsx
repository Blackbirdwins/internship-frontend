import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext(null);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
};

const KEY = '@favorites_v3';

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setIds(JSON.parse(raw));
      } catch {}
      finally { setLoaded(true); }
    })();
  }, []);

  const persist = async (next) => {
    setIds(next);
    try { await AsyncStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const isFavorite = (id) => ids.includes(id);
  const toggleFavorite = (id) => {
    persist(ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);
  };
  const clearFavorites = () => persist([]);

  return (
    <FavoritesContext.Provider value={{ ids, isFavorite, toggleFavorite, clearFavorites, loaded }}>
      {children}
    </FavoritesContext.Provider>
  );
}