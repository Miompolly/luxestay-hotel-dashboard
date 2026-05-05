/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI';
import { Filter, Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocket } from '../hooks/useSocket';
import { Room } from '../types';

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { addListener } = useSocket();

  // Form state
  const [formData, setFormData] = useState({
    number: '',
    type: 'Single',
    price: 0,
    status: 'Available'
  });

  const fetchRooms = () => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
  };

  useEffect(() => {
    fetchRooms();

    const cleanup = addListener((event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'ROOMS_UPDATED') {
        setRooms(data);
      }
    });

    return cleanup;
  }, [addListener]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ number: '', type: 'Single', price: 0, status: 'Available' });
      }
    } catch (err) {
      console.error("Failed to add room", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      try {
        await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error("Failed to delete room", err);
      }
    }
  };

  const tabs = ['All', 'Available', 'Occupied', 'Maintenance'];

  const filteredRooms = rooms.filter(room => {
    const matchesTab = activeTab === 'All' || room.status === activeTab;
    const matchesSearch = room.number.includes(searchQuery) || room.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Room Management</h2>
          <p className="text-text-secondary">View and manage all hotel rooms status and details.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-background px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add New Room
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-2 rounded-2xl border border-border gap-2">
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab 
                ? 'bg-background text-primary border border-primary/20' 
                : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search room..." 
            className="w-full bg-background border border-border rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary">
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Room No.</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Type</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Price / Night</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-text-secondary">No rooms found</td>
                </tr>
              ) : (
                filteredRooms.map((room) => (
                  <tr key={room.id} className="group hover:bg-background/40 transition-colors">
                    <td className="py-5 font-bold text-text-primary">#{room.number}</td>
                    <td className="py-5 text-sm">
                      <span className="bg-card border border-border px-3 py-1 rounded-lg text-text-secondary group-hover:text-text-primary transition-colors">
                        {room.type}
                      </span>
                    </td>
                    <td className="py-5 text-sm font-mono text-primary">${room.price}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          room.status === 'Available' ? 'bg-success' :
                          room.status === 'Occupied' ? 'bg-danger' : 'bg-text-secondary'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          room.status === 'Available' ? 'text-success' :
                          room.status === 'Occupied' ? 'text-danger' : 'text-text-secondary'
                        }`}>
                          {room.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-background border border-border rounded-lg text-text-secondary hover:text-primary transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(room.id)}
                          className="p-2 bg-background border border-border rounded-lg text-text-secondary hover:text-danger transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

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
              className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Register New Room</h3>
                <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Room Number</label>
                  <input 
                    required
                    type="text" 
                    value={formData.number}
                    onChange={e => setFormData({...formData, number: e.target.value})}
                    placeholder="e.g. 101"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Room Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as any})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suite">Suite</option>
                      <option value="Deluxe">Deluxe</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Price / Night ($)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-text-secondary mb-1 block">Initial Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="Available">Available</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-background py-3 rounded-xl font-bold mt-6 hover:opacity-90 transition-opacity">
                  Add Room
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomsPage;
