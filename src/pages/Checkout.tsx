/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart, roomImages } from '../context/CartContext';
import { Card } from '../components/UI';

export default function Checkout() {
  const { cart, toggleCart, formatPrice } = useCart();
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [nights, setNights] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/rooms').then(r => r.json()).then(setAllRooms);
  }, []);

  const cartRooms = allRooms.filter(r => cart.includes(r.id));
  const subtotal = cartRooms.reduce((s, r) => s + r.price, 0) * nights;
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center text-4xl">✓</div>
        <h2 className="text-3xl font-bold text-text-primary">Booking Confirmed!</h2>
        <p className="text-text-secondary text-center max-w-md">
          Your reservation has been placed. A confirmation will be sent to your email.
        </p>
        <button onClick={() => navigate('/')} className="bg-primary text-background font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all">
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-2xl font-bold text-text-primary">Your cart is empty</p>
        <button onClick={() => navigate('/accommodations')} className="bg-primary text-background font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all">
          Browse Accommodations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen px-6 md:px-12 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Guest Details Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="text-xl font-bold mb-6">Guest Details</h2>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">First Name</label>
                  <input required type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Last Name</label>
                  <input required type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Email</label>
                <input required type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Phone</label>
                <input required type="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Check-in</label>
                  <input required type="date" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Check-out</label>
                  <input required type="date" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Nights</label>
                  <input
                    type="number" min={1} value={nights}
                    onChange={e => setNights(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <hr className="border-border my-2" />
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Card Number</label>
                <input required type="text" placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Expiry</label>
                  <input required type="text" placeholder="MM / YY" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">CVV</label>
                  <input required type="text" placeholder="•••" maxLength={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all mt-2">
                Confirm & Pay {formatPrice(total)}
              </button>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartRooms.map(r => (
                <div key={r.id} className="flex items-center gap-3">
                  <img src={roomImages[r.type] ?? roomImages.Single} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{r.type} Room #{r.number}</p>
                    <p className="text-xs text-text-secondary">{r.location} · {formatPrice(r.price)}/night</p>
                  </div>
                  <button onClick={() => toggleCart(r.id)} className="text-text-secondary hover:text-danger transition-colors flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <hr className="border-border mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal ({nights} night{nights > 1 ? 's' : ''})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Taxes & fees (12%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-text-primary font-bold text-base pt-2 border-t border-border mt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
