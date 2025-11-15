'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import MemberModal from '../components/MemberModal';
import { dummyMembers, dummyPlans } from '../data/dummyData';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MembersPage() {
  const [members, setMembers] = useLocalStorage('members', dummyMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (formData) => {
    if (selectedMember) {
      setMembers(members.map(m => m.id === selectedMember.id ? { ...selectedMember, ...formData } : m));
    } else {
      setMembers([...members, { id: Date.now(), joinDate: new Date().toISOString().split('T')[0], lastVisit: new Date().toISOString().split('T')[0], ...formData }]);
    }
    setSelectedMember(null);
  };

  const handleDelete = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const openModal = (member = null) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Members</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your gym members</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Plan</th>
                <th className="text-left px-4 py-3 font-semibold">Join Date</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="px-4 py-3 font-semibold">{member.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{member.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{member.plan}</td>
                  <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openModal(member)}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition text-blue-600 dark:text-blue-400"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        member={selectedMember}
        plans={dummyPlans}
      />
    </div>
  );
}
