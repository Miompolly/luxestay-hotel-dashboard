/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, Booking, Customer, Payment } from './types';

export const ROOMS: Room[] = [
  { id: '1', number: '101', type: 'Single', price: 100, status: 'Available' },
  { id: '2', number: '102', type: 'Double', price: 150, status: 'Occupied' },
  { id: '3', number: '103', type: 'Suite', price: 300, status: 'Maintenance' },
  { id: '4', number: '201', type: 'Deluxe', price: 200, status: 'Available' },
  { id: '5', number: '202', type: 'Double', price: 150, status: 'Occupied' },
  { id: '6', number: '203', type: 'Suite', price: 300, status: 'Available' },
];

export const BOOKINGS: Booking[] = [
  { id: 'B1', customerName: 'John Doe', roomNumber: '102', checkIn: '2024-05-01', checkOut: '2024-05-05', status: 'Checked-in', amount: 600 },
  { id: 'B2', customerName: 'Jane Smith', roomNumber: '202', checkIn: '2024-05-02', checkOut: '2024-05-04', status: 'Confirmed', amount: 300 },
  { id: 'B3', customerName: 'Alice Johnson', roomNumber: '201', checkIn: '2024-05-10', checkOut: '2024-05-15', status: 'Pending', amount: 1000 },
];

export const CUSTOMERS: Customer[] = [
  { id: 'C1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', lastBooking: '2024-05-01', totalSpent: 1200 },
  { id: 'C2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', lastBooking: '2024-05-02', totalSpent: 850 },
];

export const PAYMENTS: Payment[] = [
  { id: 'P1', bookingId: 'B1', customerName: 'John Doe', amount: 600, date: '2024-05-01', status: 'Paid', method: 'Credit Card' },
  { id: 'P2', bookingId: 'B2', customerName: 'Jane Smith', amount: 300, date: '2024-05-02', status: 'Pending', method: 'PayPal' },
];

export const REVENUE_DATA = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 13 },
  { name: 'Wed', revenue: 5000, bookings: 35 },
  { name: 'Thu', revenue: 2780, bookings: 20 },
  { name: 'Fri', revenue: 1890, bookings: 12 },
  { name: 'Sat', revenue: 6390, bookings: 45 },
  { name: 'Sun', revenue: 3490, bookings: 30 },
];
