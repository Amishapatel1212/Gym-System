'use client';

import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      window.location.reload();
    } else {
      setError('Invalid credentials. Try admin@fitpro.com / password');
    }
  };

  const handleDemo = () => {
    setEmail('admin@fitpro.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <span className="text-3xl font-bold text-white">FP</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">FitPro</h1>
            <p className="text-blue-100">Gym Management System</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-lg flex gap-3 items-start">
              <AlertCircle size={20} className="text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-100 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-blue-200" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fitpro.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-blue-200" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition mt-6"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleDemo}
            className="w-full py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition"
          >
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
