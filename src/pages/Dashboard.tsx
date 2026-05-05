/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  BedDouble, 
  Users, 
  DollarSign, 
  CalendarCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { StatCard, Card } from '../components/UI';
import { REVENUE_DATA } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Dashboard Overview</h2>
          <p className="text-text-secondary">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-card border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-border transition-colors">
            Download Report
          </button>
          <button className="bg-primary text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            + New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Rooms" 
          value={120} 
          icon={<BedDouble size={20} />} 
        />
        <StatCard 
          label="Available Rooms" 
          value={45} 
          icon={<TrendingUp size={20} />} 
          trend={{ value: '12%', isUp: true }}
        />
        <StatCard 
          label="Occupied Rooms" 
          value={75} 
          icon={<Users size={20} />} 
        />
        <StatCard 
          label="Total Revenue" 
          value="$45,210" 
          icon={<DollarSign size={20} />} 
          trend={{ value: '8.4%', isUp: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue & Bookings Trend">
          <div className="h-80 min-h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FCD535" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FCD535" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2B3139" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#848E9C', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#848E9C', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E2329', border: '1px solid #2B3139', borderRadius: '12px' }}
                  itemStyle={{ color: '#EAECEF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FCD535" 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Bookings Performance">
          <div className="h-80 min-h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2B3139" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#848E9C', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#848E9C', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#2B3139', opacity: 0.5 }}
                  contentStyle={{ backgroundColor: '#1E2329', border: '1px solid #2B3139', borderRadius: '12px' }}
                  itemStyle={{ color: '#EAECEF' }}
                />
                <Bar dataKey="bookings" fill="#0ECB81" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Recent Bookings">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border text-text-secondary">
                    <th className="pb-4 font-medium text-sm">Customer</th>
                    <th className="pb-4 font-medium text-sm">Room</th>
                    <th className="pb-4 font-medium text-sm">Date</th>
                    <th className="pb-4 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'John Cooper', room: '102', date: 'Oct 24, 2023', status: 'Checked-in' },
                    { name: 'Sarah Miller', room: '205', date: 'Oct 24, 2023', status: 'Pending' },
                    { name: 'Michael Ross', room: '401', date: 'Oct 23, 2023', status: 'Confirmed' },
                    { name: 'Elena Gilbert', room: '108', date: 'Oct 23, 2023', status: 'Checked-out' },
                  ].map((row, i) => (
                    <tr key={i} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold text-primary">
                            {row.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-text-secondary">{row.room}</td>
                      <td className="py-4 text-sm text-text-secondary">{row.date}</td>
                      <td className="py-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${
                          row.status === 'Checked-in' ? 'bg-success/10 text-success' :
                          row.status === 'Pending' ? 'bg-primary/10 text-primary' :
                          row.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-text-secondary/10 text-text-secondary'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Today's Timeline">
            <div className="space-y-6">
              {[
                { time: '09:00 AM', event: 'New Check-in', desc: 'Room 302 - David Lee', icon: <TrendingUp size={14} />, color: 'text-success' },
                { time: '11:30 AM', event: 'Cleaning Done', desc: 'Room 105 is now available', icon: <BedDouble size={14} />, color: 'text-primary' },
                { time: '01:00 PM', event: 'New Booking', desc: 'Suite 10 - Web Portal', icon: <CalendarCheck size={14} />, color: 'text-blue-500' },
                { time: '03:45 PM', event: 'Payment Error', desc: 'Booking #B1045 failed', icon: <Clock size={14} />, color: 'text-danger' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 3 && <div className="absolute left-3.5 top-8 bottom-0 w-px bg-border"></div>}
                  <div className={`w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center shrink-0 z-10 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">{item.time}</p>
                    <p className="text-sm font-semibold mt-1">{item.event}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
