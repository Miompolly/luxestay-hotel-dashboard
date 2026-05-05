/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Hotel, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Card } from '../components/UI';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const DUMMY_USER = { email: 'admin@luxestay.com', password: 'admin123' };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      localStorage.setItem('auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
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
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
          <p className="text-text-secondary text-sm mb-8">Access the hotel management dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs uppercase font-bold text-text-secondary mb-2 block tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@luxestay.com"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase font-bold text-text-secondary tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all">
              Sign In <ArrowRight size={18} />
            </button>

            {error && (
              <p className="text-danger text-sm text-center font-medium">{error}</p>
            )}
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-text-secondary font-bold">Or continue with</span>
            </div>
          </div>

          {/* Dummy credentials hint */}
          <div className="bg-background border border-border rounded-2xl px-4 py-3 mb-6">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-text-primary"><span className="text-text-secondary">Email:</span> admin@luxestay.com</p>
                <p className="text-xs text-text-primary"><span className="text-text-secondary">Password:</span> admin123</p>
              </div>
              <button
                type="button"
                onClick={() => { setEmail('admin@luxestay.com'); setPassword('admin123'); }}
                className="text-xs font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-background transition-all"
              >
                Fill In
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-border rounded-2xl hover:bg-background transition-colors">
              <Chrome size={18} />
              <span className="text-xs font-bold font-sans">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-border rounded-2xl hover:bg-background transition-colors">
              <Github size={18} />
              <span className="text-xs font-bold font-sans">GitHub</span>
            </button>
          </div>
        </Card>

        <p className="text-center mt-8 text-sm text-text-secondary">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
