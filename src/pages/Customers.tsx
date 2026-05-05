/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/UI';
import { Search, UserPlus, Mail, Phone, ExternalLink } from 'lucide-react';
import { CUSTOMERS } from '../constants';

const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Guest Directory</h2>
          <p className="text-text-secondary">Manage and view your hotel's customer database.</p>
        </div>
        <button className="bg-primary text-background px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <UserPlus size={18} />
          Add Guest
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or phone number..." 
            className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="bg-card border border-border px-8 py-3 rounded-2xl text-sm font-medium hover:bg-border transition-colors">
          Total Guests: 1,248
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CUSTOMERS.map(customer => (
          <Card key={customer.id} className="group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button className="text-text-secondary hover:text-primary transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-border flex items-center justify-center text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary leading-tight">{customer.name}</h3>
                <p className="text-xs text-text-secondary uppercase tracking-widest mt-1">ID: {customer.id}</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail size={14} className="text-primary" />
                <span className="text-xs">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone size={14} className="text-primary" />
                <span className="text-xs">{customer.phone}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Total Spent</p>
                <p className="text-lg font-bold text-primary">${customer.totalSpent}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Last Visit</p>
                <p className="text-xs text-text-primary font-medium">{customer.lastBooking}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
