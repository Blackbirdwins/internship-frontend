const BASE_URL = 'https://dummyjson.com';
const TIMEOUT = 10000;

export const fetchWithTimeout = async (url, opts = {}) => {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(t);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, data: await res.json() };
  } catch (e) {
    clearTimeout(t);
    if (e.name === 'AbortError') return { success: false, error: 'Request timed out' };
    return { success: false, error: e.message };
  }
};

export const api = {
  getProducts: (limit = 20) => fetchWithTimeout(`${BASE_URL}/products?limit=${limit}`),
  getProductById: (id) => fetchWithTimeout(`${BASE_URL}/products/${id}`),
  searchProducts: (q) => fetchWithTimeout(`${BASE_URL}/products/search?q=${encodeURIComponent(q)}`),
};