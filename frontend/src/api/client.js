const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = body?.detail || 'Something went wrong.';
    throw new Error(message);
  }

  return body;
}

export const apiClient = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  getProducts: () => request('/products'),
  getCart: () => request('/cart'),
  addToCart: (payload) => request('/cart/items', { method: 'POST', body: JSON.stringify(payload) }),
  updateCartItem: (itemId, payload) => request(`/cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  removeCartItem: (itemId) => request(`/cart/items/${itemId}`, { method: 'DELETE' }),
  placeOrder: () => request('/orders', { method: 'POST' }),
};
