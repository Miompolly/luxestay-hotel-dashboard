/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/UI';
import { 
  CreditCard, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from 'lucide-react';
import { PAYMENTS } from '../constants';

const PaymentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Finance & Payments</h2>
          <p className="text-text-secondary">Detailed history of all guest transactions and invoices.</p>
        </div>
        <button className="bg-card border border-border px-6 py-2 rounded-xl text-sm font-medium hover:bg-border transition-colors flex items-center gap-2">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-background border-border relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          <p className="text-text-secondary text-sm font-medium">Monthly Revenue</p>
          <div className="flex items-center gap-4 mt-2">
            <h3 className="text-3xl font-bold text-primary">$12,850.00</h3>
            <span className="flex items-center text-xs text-success bg-success/10 px-2 py-0.5 rounded-md">
              <ArrowUpRight size={12} className="mr-1" />
              12.5%
            </span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-background border-border relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-success/5 rounded-full blur-2xl group-hover:bg-success/10 transition-all"></div>
          <p className="text-text-secondary text-sm font-medium">Pending Payments</p>
          <div className="flex items-center gap-4 mt-2">
            <h3 className="text-3xl font-bold text-text-primary">$3,420.00</h3>
            <span className="flex items-center text-xs text-text-secondary bg-background border border-border px-2 py-0.5 rounded-md">
              8 transactions
            </span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-card to-background border-border relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-danger/5 rounded-full blur-2xl group-hover:bg-danger/10 transition-all"></div>
          <p className="text-text-secondary text-sm font-medium">Avg Chargeback</p>
          <div className="flex items-center gap-4 mt-2">
            <h3 className="text-3xl font-bold text-text-primary">0.45%</h3>
            <span className="flex items-center text-xs text-danger bg-danger/10 px-2 py-0.5 rounded-md">
              <ArrowDownLeft size={12} className="mr-1" />
              2.1%
            </span>
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-4">
          <div className="bg-background border border-border px-4 py-2 rounded-xl text-sm font-medium text-text-primary flex items-center gap-2">
            <Filter size={16} />
            Sort by: Date (Newest)
          </div>
          <div className="h-6 w-px bg-border"></div>
          <p className="text-sm text-text-secondary">Showing 2 results of 145</p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary">
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Transaction ID</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Booking / Guest</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Date</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Method</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 font-medium text-xs uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-background/40 transition-all group">
                  <td className="py-5 text-sm font-mono text-text-secondary uppercase">#{payment.id}</td>
                  <td className="py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-primary">{payment.customerName}</span>
                      <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Booking: {payment.bookingId}</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm text-text-secondary">{payment.date}</td>
                  <td className="py-5">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <CreditCard size={14} className="text-primary" />
                      {payment.method}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className={`flex items-center gap-2 text-xs font-bold ${
                      payment.status === 'Paid' ? 'text-success' :
                      payment.status === 'Pending' ? 'text-primary' : 'text-danger'
                    }`}>
                      {payment.status === 'Paid' ? <CheckCircle2 size={14} /> :
                       payment.status === 'Pending' ? <Clock size={14} /> : <XCircle size={14} />}
                      {payment.status}
                    </div>
                  </td>
                  <td className="py-5 text-right font-bold text-text-primary">
                    ${payment.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PaymentsPage;
