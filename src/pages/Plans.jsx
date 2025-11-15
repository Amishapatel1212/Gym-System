import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { plansData } from '../data/plans'

export default function Plans() {
  const [plans, setPlans] = useState(plansData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', price: '', duration: '', features: '' })

  const handleAddPlan = () => {
    setEditingId(null)
    setFormData({ name: '', price: '', duration: '', features: '' })
    setIsModalOpen(true)
  }

  const handleEditPlan = (plan) => {
    setEditingId(plan.id)
    setFormData({ ...plan })
    setIsModalOpen(true)
  }

  const handleSavePlan = () => {
    if (editingId) {
      setPlans(plans.map(p => p.id === editingId ? { ...p, ...formData } : p))
    } else {
      setPlans([...plans, { id: Date.now(), ...formData }])
    }
    setIsModalOpen(false)
  }

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Membership Plans</h1>
        <Button variant="primary" onClick={handleAddPlan} className="flex items-center gap-2">
          <Plus size={20} />
          Add Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
            <p className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>${plan.price}<span className="text-sm" style={{ color: 'var(--text-secondary)' }}>/mo</span></p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Duration: {plan.duration}</p>
            
            <div className="flex-1 mb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Features:</p>
              <p style={{ color: 'var(--text-primary)' }} className="text-sm">{plan.features}</p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => handleEditPlan(plan)}
              >
                <Edit size={16} />
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => handleDeletePlan(plan.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Plan' : 'Add Plan'}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Plan Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="number"
            placeholder="Price ($)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="text"
            placeholder="Duration (e.g., 1 Month)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <textarea
            placeholder="Features (comma separated)"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
            rows="3"
          />
          <Button variant="primary" className="w-full" onClick={handleSavePlan}>
            Save Plan
          </Button>
        </div>
      </Modal>
    </div>
  )
}
