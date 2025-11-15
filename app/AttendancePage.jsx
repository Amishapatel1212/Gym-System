'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CheckInModal from '../components/CheckInModal';
import { dummyAttendance, dummyMembers } from '../data/dummyData';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function AttendancePage() {
  const [attendance, setAttendance] = useLocalStorage('attendance', dummyAttendance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterPayment, setFilterPayment] = useState('all');

  const filteredAttendance = attendance.filter(record => {
    const matchesDate = !filterDate || record.checkIn.includes(filterDate);
    const matchesPayment = filterPayment === 'all' || record.planStatus.toLowerCase() === filterPayment;
    return matchesDate && matchesPayment;
  });

  const handleCheckIn = (memberId) => {
    const newRecord = {
      id: Date.now(),
      memberId,
      memberName: dummyMembers.find(m => m.id === parseInt(memberId))?.name,
      checkIn: new Date().toLocaleString(),
      checkOut: '',
      planStatus: 'Active',
      expiryDate: '2025-12-31'
    };
    setAttendance([newRecord, ...attendance]);
    setIsModalOpen(false);
  };

  const stats = {
    todayCheckIns: attendance.filter(a => a.checkIn.includes(new Date().toISOString().split('T')[0])).length,
    activeMembers: attendance.filter(a => a.planStatus === 'Active').length,
    expiredPlans: attendance.filter(a => a.planStatus === 'Expired').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Attendance</h1>
          <p className="text-slate-600 dark:text-slate-400">Track member check-ins and attendance</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus size={20} />
          Check In
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Today's Check-ins</p>
          <p className="text-3xl font-bold">{stats.todayCheckIns}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active Plans</p>
          <p className="text-3xl font-bold text-green-500">{stats.activeMembers}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Expired Plans</p>
          <p className="text-3xl font-bold text-red-500">{stats.expiredPlans}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Plans</option>
            <option value="expired">Expired Plans</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-4 py-3 font-semibold">Member</th>
                <th className="text-left px-4 py-3 font-semibold">Check In</th>
                <th className="text-left px-4 py-3 font-semibold">Check Out</th>
                <th className="text-left px-4 py-3 font-semibold">Plan Status</th>
                <th className="text-left px-4 py-3 font-semibold">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map(record => (
                <tr key={record.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="px-4 py-3 font-semibold">{record.memberName}</td>
                  <td className="px-4 py-3 text-sm">{record.checkIn}</td>
                  <td className="px-4 py-3 text-sm">{record.checkOut || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.planStatus === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}>
                      {record.planStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{record.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCheckIn}
        members={dummyMembers}
      />
    </div>
  );
}
