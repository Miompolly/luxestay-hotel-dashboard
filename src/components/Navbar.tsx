/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, Info, LogOut } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { addListener } = useSocket();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    // Fetch initial notifications
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));

    // Listen for new notifications
    const cleanup = addListener((event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'NOTIFICATION') {
        setNotifications(prev => [data, ...prev]);
      }
    });

    return cleanup;
  }, [addListener]);

  const markAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <header className="h-16 px-6 bg-background border-b border-border flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 text-text-secondary">
          <Menu size={20} />
        </button>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search booking, customer..." 
            className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markAsRead();
            }}
            className="p-2 text-text-secondary hover:text-primary transition-colors relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full ring-2 ring-background"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 focus:outline-none"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-background">
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-text-secondary hover:text-text-primary">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="p-10 text-center text-text-secondary">
                      <Info size={24} className="mx-auto mb-2 opacity-20" />
                      <p className="text-xs">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-border hover:bg-background/50 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-bold ${n.unread ? 'text-primary' : 'text-text-primary'}`}>{n.title}</p>
                          <span className="text-[10px] text-text-secondary">{n.time}</span>
                        </div>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <button className="w-full py-3 bg-background text-[10px] uppercase font-bold tracking-widest text-text-secondary hover:text-primary transition-colors border-t border-border">
                    Clear all
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(o => !o)}
            className="flex items-center gap-3 pl-2 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-text-primary leading-none">Admin User</p>
              <p className="text-xs text-text-secondary mt-1">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary transition-colors">
              <User className="text-text-secondary group-hover:text-primary transition-colors" size={20} />
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-bold text-text-primary">Admin User</p>
                  <p className="text-xs text-text-secondary">admin@luxestay.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
