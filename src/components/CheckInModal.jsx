'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CheckInModal({ isOpen, onClose, onSave, members }) {
  const [selectedMember, setSelectedMember] = useState('');
  const [checkInTime, setCheckInTime] = useState(new Date().toLocaleTimeString());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMember) {
      onSave(selectedMember);
      setSelectedMember('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Member Check-In</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Select Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a member</option>
              {members && members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Check-in Time</label>
            <input
              type="text"
              value={checkInTime}
              disabled
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
