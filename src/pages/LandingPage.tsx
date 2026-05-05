/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Hotel, 
  MapPin, 
  ShoppingCart, 
  Heart, 
  Star, 
  Calendar, 
  ArrowRight,
  Globe,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Card } from '../components/UI';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 151.4 },
};

export default function LandingPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [currency, setCurrency] = useState<keyof typeof currencies>('USD');
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data.filter((r: any) => r.status === 'Available')));
  }, []);

  const formatPrice = (price: number) => {
    const { symbol, rate } = currencies[currency];
    return `${symbol}${Math.round(price * rate)}`;
  };

  const toggleCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const roomImages = {
    Single:  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    Double:  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    Suite:   'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    Deluxe:  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  };

  return (
    <div className="bg-background min-h-screen text-text-primary">
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-primary text-background rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-3 flex items-center gap-3 cursor-pointer" onClick={() => setCartOpen(o => !o)}>
              <ShoppingCart size={20} />
              <span className="font-bold text-sm">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
              <span className="font-bold text-sm">·</span>
              <span className="font-bold text-sm">
                {formatPrice(rooms.filter(r => cart.includes(r.id)).reduce((s, r) => s + r.price, 0))}/night
              </span>
            </div>
            {cartOpen && (
              <div className="bg-card border-t border-white/20 px-5 py-4 space-y-3 max-h-64 overflow-y-auto">
                {rooms.filter(r => cart.includes(r.id)).map(r => (
                  <div key={r.id} className="flex items-center gap-3">
                    <img src={roomImages[r.type as keyof typeof roomImages] ?? roomImages.Single} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary text-xs font-bold truncate">{r.type} Room #{r.number}</p>
                      <p className="text-text-secondary text-xs">{formatPrice(r.price)}/night</p>
                    </div>
                    <button onClick={() => toggleCart(r.id)} className="text-text-secondary hover:text-danger transition-colors text-xs">✕</button>
                  </div>
                ))}
                <button className="w-full bg-primary text-background font-bold py-2 rounded-xl text-sm hover:opacity-90 transition-all mt-2">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
      {/* Hero Section */}
      <section id="home" className="relative h-[80vh] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Redefining <span className="text-primary">Luxury</span> For Your Stay.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary mt-6 text-lg max-w-lg"
          >
            Experience world-class hospitality in the heart of the world's most iconic cities. From London to Tokyo, your perfect stay awaits.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex gap-4"
          >
            <button className="bg-primary text-background px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
              Book Now <ArrowRight size={18} />
            </button>
            <button className="bg-card border border-border text-text-primary px-8 py-3 rounded-xl font-bold hover:bg-border transition-all">
              Explore Rooms
            </button>
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Featured Accommodations</h2>
            <p className="text-text-secondary mt-2">Curated selection of our finest suites and rooms worldwide.</p>
          </div>
          <div className="flex gap-2">
             <button className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium hover:border-primary transition-colors">London</button>
             <button className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium hover:border-primary transition-colors">New York</button>
             <button className="bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium hover:border-primary transition-colors">Tokyo</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <motion.div 
              key={room.id}
              whileHover={{ y: -10 }}
              className="bg-card border border-border rounded-3xl overflow-hidden group shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={roomImages[room.type as keyof typeof roomImages] ?? roomImages.Single}
                  alt={room.type}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button 
                  onClick={() => toggleWishlist(room.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                    wishlist.includes(room.id) ? 'bg-danger text-white' : 'bg-black/20 text-white hover:bg-primary hover:text-background'
                  }`}
                >
                  <Heart size={18} fill={wishlist.includes(room.id) ? "currentColor" : "none"} />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <MapPin size={10} /> {room.location}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{room.type} Room</h3>
                    <p className="text-xs text-text-secondary mt-1">Room #{room.number}</p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-6">
                  <span className="text-2xl font-bold text-primary">{formatPrice(room.price)}</span>
                  <span className="text-xs text-text-secondary">/ night</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-primary text-background font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-all">
                    Book Now
                  </button>
                  <button 
                    onClick={() => toggleCart(room.id)}
                    className={`p-3 rounded-xl border border-border transition-all ${
                      cart.includes(room.id) ? 'bg-success text-background border-success' : 'bg-background text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing/Benefits Section */}
      <section id="pricing" className="py-24 bg-card/30 border-y border-border px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Our Pricing Tiers</h2>
          <p className="text-text-secondary mt-4">Transparent packages designed for every type of traveler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Standard', price: 99, features: ['Free Wi-Fi', 'Basic Breakfast', 'Standard Room', 'City View'] },
            { name: 'Premium', price: 199, premium: true, features: ['Everything in Standard', 'All-access Spa', 'Deluxe Suite', 'Ocean View', 'Late Checkout'] },
            { name: 'Exclusive', price: 399, features: ['Everything in Premium', 'Personal Butler', 'Penthouse Suite', 'Private Airport Transfer', 'Complimentary Drinks'] }
          ].map((plan, i) => (
            <Card key={i} className={`p-10 flex flex-col items-center text-center relative ${plan.premium ? 'border-primary ring-1 ring-primary' : ''}`}>
              {plan.premium && <span className="absolute -top-3 bg-primary text-background text-[10px] font-bold uppercase py-1 px-4 rounded-full">Most Popular</span>}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-bold text-primary">{formatPrice(plan.price)}</span>
                <span className="text-text-secondary text-sm">/ night</span>
              </div>
              <ul className="space-y-4 mb-10 text-text-secondary text-sm">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.premium ? 'bg-primary text-background' : 'bg-background border border-border text-text-primary hover:border-primary group-hover:text-primary'}`}>
                Choose {plan.name}
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold">Get In Touch</h2>
            <p className="text-text-secondary mt-4 text-lg">Have questions about our rooms or services? We're here to help you 24/7.</p>
            
            <div className="mt-12 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-lg font-bold">reservations@luxestay.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">Call Center</p>
                  <p className="text-lg font-bold">+1 (888) LUXE-STAY</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-primary shadow-xl">
                   <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">Live Chat</p>
                  <p className="text-lg font-bold">m.me/luxestay</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-10">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">First Name</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Last Name</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Email Address</label>
                <input type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Subject</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option>Room Inquiry</option>
                  <option>Booking Problem</option>
                  <option>Special Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-primary text-background font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
                Send Message
              </button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-24 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Hotel className="text-background" size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">LuxeStay</span>
        </div>
        <p className="text-text-secondary text-sm">© 2024 LuxeStay Hotel Group. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-xs text-text-secondary hover:text-primary transition-colors uppercase font-bold tracking-widest">Privacy Policy</a>
          <a href="#" className="text-xs text-text-secondary hover:text-primary transition-colors uppercase font-bold tracking-widest">Terms of Service</a>
          <a href="#" className="text-xs text-text-secondary hover:text-primary transition-colors uppercase font-bold tracking-widest">Cookie Policy</a>
        </div>
      </footer>
    </div>
  );
}
