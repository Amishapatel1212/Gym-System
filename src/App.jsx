'use client';

import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import PlansPage from './pages/PlansPage';
import AttendancePage from './pages/AttendancePage';

export default function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'members':
        return <MembersPage />;
      case 'plans':
        return <PlansPage />;
      case 'attendance':
        return <AttendancePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <MainLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {renderPage()}
    </MainLayout>
  );
}
