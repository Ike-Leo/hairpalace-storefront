'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Cart, CartItem } from '@/lib/types';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '@/lib/api';
import { useSession } from './SessionContext';

interface CartContextType {
  cartId: string | null;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  loadCart: () => Promise<void>;
  addItem: (productId: string, variantId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { sessionId, initialized } = useSession();
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from API
  const loadCart = useCallback(async () => {
    if (!initialized || !sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const cart = await getCart(sessionId);
      setCartId(cart._id);
      setItems(cart.items);
      setTotalAmount(cart.totalAmount);
      setTotalItems(cart.totalItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  }, [sessionId, initialized]);

  // Load cart on mount
  useEffect(() => {
    if (initialized && sessionId) {
      loadCart();
    }
  }, [loadCart, initialized, sessionId]);

  // Add item to cart
  const addItem = async (productId: string, variantId: string, quantity: number) => {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      await apiAddToCart(sessionId, productId, variantId, quantity);
      await loadCart(); // Reload cart to get updated state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Error adding item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (variantId: string, quantity: number) => {
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      await updateCartItem(cartId, variantId, quantity);
      await loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      console.error('Error updating item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (variantId: string) => {
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      await apiRemoveFromCart(cartId, variantId);
      await loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      console.error('Error removing item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear cart (after checkout)
  const clearCart = () => {
    setCartId(null);
    setItems([]);
    setTotalAmount(0);
    setTotalItems(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        totalAmount,
        totalItems,
        loading,
        error,
        loadCart,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
