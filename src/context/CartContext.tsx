/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';

export const roomImages: Record<string, string> = {
  Single: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  Double: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  Suite:  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
  Deluxe: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
};

export const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 151.4 },
};

interface CartContextType {
  cart: string[];
  rooms: any[];
  setRooms: (r: any[]) => void;
  wishlist: string[];
  currency: keyof typeof currencies;
  setCurrency: (c: keyof typeof currencies) => void;
  toggleCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType>(null!);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState<keyof typeof currencies>('USD');
  const [rooms, setRooms] = useState<any[]>([]);

  const toggleCart = (id: string) =>
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const formatPrice = (price: number) => {
    const { symbol, rate } = currencies[currency];
    return `${symbol}${Math.round(price * rate)}`;
  };

  return (
    <CartContext.Provider value={{ cart, rooms, setRooms, wishlist, currency, setCurrency, toggleCart, toggleWishlist, formatPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
