import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total_amount: 0 });
  const [loading, setLoading] = useState(false);

  async function refreshCart() {
    if (!isAuthenticated) {
      setCart({ items: [], total_amount: 0 });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.getCart();
      setCart(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated]);

  const value = {
    cart,
    loading,
    itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
    refreshCart,
    addItem: async (productId, quantity = 1) => {
      const response = await apiClient.addToCart({ product_id: productId, quantity });
      setCart(response);
      return response;
    },
    updateItem: async (itemId, quantity) => {
      const response = await apiClient.updateCartItem(itemId, { quantity });
      setCart(response);
      return response;
    },
    removeItem: async (itemId) => {
      const response = await apiClient.removeCartItem(itemId);
      setCart(response);
      return response;
    },
    clearAfterOrder: () => setCart({ items: [], total_amount: 0 }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
