/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Heart, Star, ShoppingCart } from 'lucide-react';
import { useCart, roomImages } from '../context/CartContext';

const locations = ['All', 'London', 'Paris', 'New York', 'Dubai', 'Tokyo', 'Berlin', 'Singapore'];
const types = ['All', 'Single', 'Double', 'Suite', 'Deluxe'];

export default function Accommodations() {
  const { cart, wishlist, toggleCart, toggleWishlist, formatPrice, setRooms, rooms } = useCart();
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        setAllRooms(data);
        setRooms(data.filter((r: any) => r.status === 'Available'));
      });
  }, []);

  const filtered = allRooms.filter(r =>
    (location === 'All' || r.location === location) &&
    (type === 'All' || r.type === type)
  );

  return (
    <div className="bg-background min-h-screen px-6 md:px-12 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text-primary">All Accommodations</h1>
        <p className="text-text-secondary mt-2">Browse our full collection of rooms worldwide.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {locations.map(l => (
            <button
              key={l}
              onClick={() => setLocation(l)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                location === l ? 'bg-primary text-background border-primary' : 'bg-card border-border text-text-secondary hover:border-primary'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                type === t ? 'bg-primary text-background border-primary' : 'bg-card border-border text-text-secondary hover:border-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(room => (
          <motion.div
            key={room.id}
            whileHover={{ y: -8 }}
            className="bg-card border border-border rounded-3xl overflow-hidden group shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={roomImages[room.type] ?? roomImages.Single}
                alt={room.type}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <button
                onClick={() => toggleWishlist(room.id)}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                  wishlist.includes(room.id) ? 'bg-danger text-white' : 'bg-black/20 text-white hover:bg-primary hover:text-background'
                }`}
              >
                <Heart size={16} fill={wishlist.includes(room.id) ? 'currentColor' : 'none'} />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  room.status === 'Available' ? 'bg-success/80 text-white' : 'bg-danger/80 text-white'
                }`}>
                  {room.status}
                </span>
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <MapPin size={10} /> {room.location}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{room.type} Room</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Room #{room.number}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={13} fill="currentColor" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <span className="text-xl font-bold text-primary">{formatPrice(room.price)}</span>
                <span className="text-xs text-text-secondary">/ night</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-primary text-background font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all">
                  Book Now
                </button>
                <button
                  onClick={() => toggleCart(room.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    cart.includes(room.id) ? 'bg-success text-background border-success' : 'bg-background text-text-secondary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-text-secondary py-20">No rooms match your filters.</p>
        )}
      </div>
    </div>
  );
}
