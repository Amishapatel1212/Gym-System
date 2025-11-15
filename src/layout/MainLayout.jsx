'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function MainLayout({ children, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex flex-col flex-1 md:ml-0">
        <Navbar onLogout={logout} />

        <main className="flex-1 overflow-auto mt-16 md:mt-0">
          <div className="p-6 md:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
