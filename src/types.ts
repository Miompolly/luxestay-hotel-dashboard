/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance';
export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Checked-in' | 'Checked-out';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  price: number;
  status: RoomStatus;
}

export interface Booking {
  id: string;
  customerName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastBooking: string;
  totalSpent: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  method: 'Credit Card' | 'PayPal' | 'Bank Transfer';
}

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalRevenue: number;
  bookingsToday: number;
}
