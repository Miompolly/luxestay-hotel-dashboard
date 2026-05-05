/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel, ShoppingCart, Globe, Menu, X, Trash2 } from 'lucide-react';
import { useCart, roomImages, currencies } from '../context/CartContext';

export const PublicNavbar: React.FC = () => {
  const { cart, toggleCart, formatPrice, currency, setCurrency } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/rooms').then(r => r.json()).then(setAllRooms);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cartRooms = allRooms.filter(r => cart.includes(r.id));
  const total = cartRooms.reduce((s, r) => s + r.price, 0);

  return (
    <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Hotel className="text-background" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">LuxeStay</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/#home" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Home</a>
        <Link to="/accommodations" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Accommodations</Link>
        <a href="/#pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Pricing</a>
        <a href="/#contact" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Contact</a>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Currency Switcher */}
        <div className="relative group hidden sm:block">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-bold hover:border-primary transition-all text-text-primary">
            <Globe size={14} className="text-primary" />
            {currency}
          </button>
          <div className="absolute top-full right-0 mt-2 w-24 bg-card border border-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            {Object.keys(currencies).map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c as any)}
                className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-background hover:text-primary transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cart Icon + Drawer */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setCartOpen(o => !o)}
            className="relative p-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {cartOpen && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <span className="font-bold text-text-primary">Cart ({cart.length})</span>
                <button onClick={() => setCartOpen(false)}><X size={16} className="text-text-secondary" /></button>
              </div>

              {cartRooms.length === 0 ? (
                <div className="px-5 py-10 text-center text-text-secondary text-sm">Your cart is empty.</div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto divide-y divide-border">
                    {cartRooms.map(r => (
                      <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                        <img src={roomImages[r.type] ?? roomImages.Single} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate">{r.type} Room #{r.number}</p>
                          <p className="text-xs text-text-secondary">{r.location} · {formatPrice(r.price)}/night</p>
                        </div>
                        <button onClick={() => toggleCart(r.id)} className="text-text-secondary hover:text-danger transition-colors flex-shrink-0">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t border-border">
                    <div className="flex justify-between text-sm font-bold text-text-primary mb-3">
                      <span>Total / night</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                    <button
                      onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                      className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-bold text-text-primary hover:text-primary transition-colors">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-primary text-background text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">Create Account</Link>
        </div>

        <button className="md:hidden p-2 text-text-secondary" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-card border-b border-border p-6 flex flex-col gap-5 md:hidden z-40">
          <a href="/#home" onClick={() => setMenuOpen(false)} className="text-text-secondary font-medium">Home</a>
          <Link to="/accommodations" onClick={() => setMenuOpen(false)} className="text-text-secondary font-medium">Accommodations</Link>
          <a href="/#pricing" onClick={() => setMenuOpen(false)} className="text-text-secondary font-medium">Pricing</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="text-text-secondary font-medium">Contact</a>
          <hr className="border-border" />
          <Link to="/login" className="text-lg font-bold text-text-primary">Login</Link>
          <Link to="/register" className="text-lg font-bold text-primary">Create Account</Link>
        </div>
      )}
    </nav>
  );
};
