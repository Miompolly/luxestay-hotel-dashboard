/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Hotel, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Card } from '../components/UI';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    console.log("Registered with:", formData);
    navigate('/'); // Navigate to dashboard
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-success/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-text-secondary text-sm mb-8">Join the elite hotel management network</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="admin@luxestay.com"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all mt-4">
              Register Now <ArrowRight size={18} />
            </button>
          </form>
        </Card>

        <p className="text-center mt-8 text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
