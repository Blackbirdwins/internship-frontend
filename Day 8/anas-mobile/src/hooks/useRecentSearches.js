import { useCallback } from 'react';
import useAsyncStorage from './useAsyncStorage';

export default function useRecentSearches(max = 6) {
  const [searches, setSearches] = useAsyncStorage('recent_searches', []);

  const addSearch = useCallback(
    (query) => {
      const q = query.trim().toLowerCase();
      if (!q || q.length < 2) return;
      const next = [q, ...searches.filter((s) => s !== q)].slice(0, max);
      setSearches(next);
    },
    [searches, setSearches, max]
  );

  const clearSearches = useCallback(() => setSearches([]), [setSearches]);

  return { searches, addSearch, clearSearches };
}