'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';
import PlanModal from '../components/PlanModal';
import { dummyPlans } from '../data/dummyData';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function PlansPage() {
  const [plans, setPlans] = useLocalStorage('plans', dummyPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSave = (formData) => {
    if (selectedPlan) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...selectedPlan, ...formData } : p));
    } else {
      setPlans([...plans, { id: Date.now(), ...formData }]);
    }
    setSelectedPlan(null);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const openModal = (plan = null) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const planColors = ['border-l-4 border-l-blue-500', 'border-l-4 border-l-purple-500', 'border-l-4 border-l-cyan-500'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Membership Plans</h1>
          <p className="text-slate-600 dark:text-slate-400">Create and manage membership plans</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus size={20} />
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={plan.id} className={`bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition ${planColors[idx % 3]}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-500 mt-2">${plan.price}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{plan.duration} month(s)</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(plan)}
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition text-blue-600 dark:text-blue-400"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition text-red-600 dark:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              {plan.features.map((feature, fidx) => (
                <div key={fidx} className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PlanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        plan={selectedPlan}
      />
    </div>
  );
}
