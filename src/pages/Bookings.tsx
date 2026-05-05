/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI';
import { Search, Filter, Calendar, ExternalLink, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocket } from '../hooks/useSocket';
import { Booking } from '../types';

const BookingsPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState('All');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const { addListener } = useSocket();

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    amount: 0,
    status: 'Confirmed'
  });

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();

    const cleanup = addListener((event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'BOOKING_UPDATED') {
        setBookings(data);
      }
    });

    return cleanup;
  }, [addListener]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ customerName: '', roomNumber: '', checkIn: '', checkOut: '', amount: 0, status: 'Confirmed' });
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch (err) {
      console.error("Failed to add booking", err);
    }
  };

  const statuses = ['All', 'Confirmed', 'Pending', 'Checked-in', 'Checked-out', 'Cancelled'];
  
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = activeStatus === 'All' || b.status === activeStatus;
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.roomNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Bookings History</h2>
          <p className="text-text-secondary">Keep track of all guest reservations and check-ins.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Booking ID, Name..." 
              className="bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary text-background px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            New Booking
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-5 py-2 rounded-xl text-sm font-medium shrink-0 transition-all ${
              activeStatus === status 
              ? 'bg-primary text-background' 
              : 'bg-card text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary">
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">ID</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Customer</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Room</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Check In / Out</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Amount</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-text-secondary font-medium italic">No bookings found</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-background/40 transition-all group">
                    <td className="py-5 text-sm font-mono text-text-secondary">#{booking.id}</td>
                    <td className="py-5">
                      <p className="text-sm font-bold text-text-primary">{booking.customerName}</p>
                    </td>
                    <td className="py-5">
                      <span className="text-xs font-bold px-2 py-1 bg-background border border-border rounded-md text-text-secondary group-hover:border-primary group-hover:text-primary transition-all">
                        Room {booking.roomNumber}
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-text-secondary text-xs">
                        <Calendar size={12} />
                        <span>{booking.checkIn} → {booking.checkOut}</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                        booking.status === 'Checked-in' ? 'bg-success/10 text-success' :
                        booking.status === 'Pending' ? 'bg-primary/10 text-primary' :
                        booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-text-secondary/10 text-text-secondary'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 text-sm font-bold text-text-primary">
                      ${booking.amount}
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-text-secondary hover:text-primary p-2 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-8 right-8 z-50 bg-success text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2"
          >
            ✓ Booking created successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">New Guest Reservation</h3>
                <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Customer Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.customerName}
                      onChange={e => setFormData({...formData, customerName: e.target.value})}
                      placeholder="Guest Full Name"
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Room Number</label>
                    <input 
                      required
                      type="text" 
                      value={formData.roomNumber}
                      onChange={e => setFormData({...formData, roomNumber: e.target.value})}
                      placeholder="e.g. 102"
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Check-In</label>
                    <input 
                      required
                      type="date" 
                      value={formData.checkIn}
                      onChange={e => setFormData({...formData, checkIn: e.target.value})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Check-Out</label>
                    <input 
                      required
                      type="date" 
                      value={formData.checkOut}
                      onChange={e => setFormData({...formData, checkOut: e.target.value})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Total Amount ($)</label>
                    <input 
                      required
                      type="number"
                      min={0}
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors"
                    >
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Checked-in</option>
                      <option>Checked-out</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-background py-3 rounded-xl font-bold mt-2 hover:opacity-90 transition-opacity">
                  Confirm Reservation
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsPage;
