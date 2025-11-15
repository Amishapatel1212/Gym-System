'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PlanModal({ isOpen, onClose, onSave, plan }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    features: ''
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features.join(', ')
      });
    } else {
      setFormData({ name: '', price: '', duration: '', features: '' });
    }
  }, [plan, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      features: formData.features.split(',').map(f => f.trim())
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{plan ? 'Edit Plan' : 'Add Plan'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Duration (months)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Features (comma-separated)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              required
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
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {plan ? 'Update' : 'Add'} Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
