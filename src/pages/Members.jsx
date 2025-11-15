import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { membersData } from '../data/members'

export default function Members() {
  const [members, setMembers] = useState(membersData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', plan: 'Basic' })

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMember = () => {
    setEditingId(null)
    setFormData({ name: '', email: '', phone: '', plan: 'Basic' })
    setIsModalOpen(true)
  }

  const handleEditMember = (member) => {
    setEditingId(member.id)
    setFormData({ name: member.name, email: member.email, phone: member.phone, plan: member.plan })
    setIsModalOpen(true)
  }

  const handleSaveMember = () => {
    if (editingId) {
      setMembers(members.map(m => m.id === editingId ? { ...m, ...formData } : m))
    } else {
      setMembers([...members, { id: Date.now(), ...formData, joinDate: new Date().toLocaleDateString() }])
    }
    setIsModalOpen(false)
  }

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Members</h1>
        <Button variant="primary" onClick={handleAddMember} className="flex items-center gap-2">
          <Plus size={20} />
          Add Member
        </Button>
      </div>

      <Card>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderColor: 'var(--border)' }} className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Plan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Join Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} style={{ borderColor: 'var(--border)' }} className="border-b hover:opacity-75">
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{member.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{member.email}</td>
                  <td className="px-4 py-3">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: member.plan === 'Premium' ? '#8b5cf6' : '#2563eb',
                        color: 'white'
                      }}
                    >
                      {member.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{member.joinDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditMember(member)} className="p-1 hover:opacity-75">
                        <Edit size={18} style={{ color: 'var(--primary)' }} />
                      </button>
                      <button onClick={() => handleDeleteMember(member.id)} className="p-1 hover:opacity-75">
                        <Trash2 size={18} style={{ color: '#ef4444' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Member' : 'Add Member'}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
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
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <select
            value={formData.plan}
            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          >
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
          <Button variant="primary" className="w-full" onClick={handleSaveMember}>
            Save Member
          </Button>
        </div>
      </Modal>
    </div>
  )
}
