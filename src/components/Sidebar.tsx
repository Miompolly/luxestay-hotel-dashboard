/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  Users, 
  CreditCard,
  Settings,
  Hotel
} from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { path: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col sticky top-0 left-0 overflow-hidden">
      <div className="p-6 flex items-center gap-3">
        <NavLink to="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Hotel className="text-background" size={24} />
        </NavLink>
        <NavLink to="/" className="text-xl font-bold tracking-tight text-text-primary">LuxeStay</NavLink>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-primary text-background' 
                : 'text-text-secondary hover:bg-card hover:text-text-primary'
              }
            `}
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-text-secondary hover:bg-card hover:text-text-primary transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};
