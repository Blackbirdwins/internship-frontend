import { createContext, useContext } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';

const FavoritesContext = createContext(null);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
};

export function FavoritesProvider({ children }) {
  const [ids, setIds, meta] = useAsyncStorage('favorite_ids', []);

  const isFavorite = (id) => ids.includes(id);

  const toggleFavorite = (id) => {
    setIds(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  };

  const clearFavorites = () => setIds([]);

  return (
    <FavoritesContext.Provider
      value={{ ids, isFavorite, toggleFavorite, clearFavorites, loaded: meta.loaded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}