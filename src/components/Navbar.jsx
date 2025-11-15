'use client';

import React from 'react';
import { Bell, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-50">
      <div className="md:hidden w-16" />

      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition text-red-600 dark:text-red-400"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
