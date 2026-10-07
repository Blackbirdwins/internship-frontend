import { useState, useEffect } from 'react';

export default function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn(controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch');
        }
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, deps);

  return { data, loading, error };
}