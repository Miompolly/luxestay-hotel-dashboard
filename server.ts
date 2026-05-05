/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  app.use(express.json());

  // In-memory data for demo purposes
  let rooms = [
    { id: '1', number: '101', type: 'Single', price: 120, status: 'Available', location: 'London', currency: 'USD' },
    { id: '2', number: '102', type: 'Double', price: 180, status: 'Occupied', location: 'Paris', currency: 'USD' },
    { id: '3', number: '103', type: 'Suite', price: 350, status: 'Maintenance', location: 'New York', currency: 'USD' },
    { id: '4', number: '201', type: 'Deluxe', price: 250, status: 'Available', location: 'London', currency: 'USD' },
    { id: '5', number: '202', type: 'Double', price: 180, status: 'Available', location: 'Dubai', currency: 'USD' },
    { id: '6', number: '301', type: 'Suite', price: 500, status: 'Available', location: 'Tokyo', currency: 'USD' },
    { id: '7', number: '302', type: 'Single', price: 110, status: 'Occupied', location: 'Berlin', currency: 'USD' },
    { id: '8', number: '401', type: 'Deluxe', price: 290, status: 'Available', location: 'Singapore', currency: 'USD' },
  ];

  let bookings = [
    { id: 'B1', customerName: 'John Doe', roomNumber: '102', checkIn: '2024-05-01', checkOut: '2024-05-05', status: 'Checked-in', amount: 600 },
    { id: 'B2', customerName: 'Alice Wong', roomNumber: '202', checkIn: '2024-06-10', checkOut: '2024-06-12', status: 'Confirmed', amount: 360 },
  ];

  let notifications: any[] = [
    { id: 1, type: 'SYSTEM', title: 'System Healthy', message: 'All services are running smoothly.', time: '08:00 AM', unread: true },
    { id: 2, type: 'BOOKING_NEW', title: 'New Reservation', message: 'Room 202 booked by Alice Wong.', time: '07:45 AM', unread: true },
  ];
  let cart: any[] = [];
  let wishlist: any[] = [];

  // Helper to broadast to all clients
  function broadcast(data: any) {
    const payload = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  // API Routes
  app.get("/api/rooms", (req, res) => res.json(rooms));
  app.get("/api/bookings", (req, res) => res.json(bookings));
  app.get("/api/notifications", (req, res) => res.json(notifications));

  app.post("/api/bookings", (req, res) => {
    const newBooking = { ...req.body, id: `B${Date.now()}` };
    bookings.push(newBooking);
    
    const notification = {
      id: Date.now(),
      type: 'BOOKING_NEW',
      title: 'New Booking',
      message: `New booking from ${newBooking.customerName} for Room ${newBooking.roomNumber}`,
      time: new Date().toLocaleTimeString(),
      unread: true
    };
    notifications.unshift(notification);
    
    broadcast({ type: 'NOTIFICATION', data: notification });
    broadcast({ type: 'BOOKING_UPDATED', data: bookings });
    res.json(newBooking);
  });

  app.put("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...req.body };
      
      const notification = {
        id: Date.now(),
        type: 'BOOKING_UPDATE',
        title: 'Booking Updated',
        message: `Booking #${id} status changed to ${req.body.status}`,
        time: new Date().toLocaleTimeString(),
        unread: true
      };
      notifications.unshift(notification);
      
      broadcast({ type: 'NOTIFICATION', data: notification });
      broadcast({ type: 'BOOKING_UPDATED', data: bookings });
      res.json(bookings[index]);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  });

  app.post("/api/rooms", (req, res) => {
    const newRoom = { ...req.body, id: Date.now().toString() };
    rooms.push(newRoom);
    broadcast({ type: 'ROOMS_UPDATED', data: rooms });
    res.json(newRoom);
  });

  app.put("/api/rooms/:id", (req, res) => {
    const { id } = req.params;
    const index = rooms.findIndex(r => r.id === id);
    if (index !== -1) {
      rooms[index] = { ...rooms[index], ...req.body };
      broadcast({ type: 'ROOMS_UPDATED', data: rooms });
      res.json(rooms[index]);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  });

  app.delete("/api/rooms/:id", (req, res) => {
    const { id } = req.params;
    rooms = rooms.filter(r => r.id !== id);
    broadcast({ type: 'ROOMS_UPDATED', data: rooms });
    res.json({ success: true });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
