'use client';

import React from 'react';
import { Menu, X, Home, Users, Dumbbell, Calendar, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ isOpen, toggleSidebar, currentPage, setCurrentPage }) {
  const { theme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'plans', label: 'Plans', icon: Dumbbell },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed md:relative top-16 md:top-0 left-0 h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-40`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <span className="font-bold text-lg">FitPro</span>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    toggleSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    currentPage === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
