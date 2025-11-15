import React, { useState } from 'react'
import { Plus, Eye, Trash2, Search } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { paymentsData } from '../data/payments'

export default function Payments() {
  const [payments, setPayments] = useState(paymentsData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ memberId: '', amount: '', date: '', status: 'Pending' })

  const filteredPayments = payments.filter(p =>
    p.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPayment = () => {
    setFormData({ memberId: '', amount: '', date: '', status: 'Pending' })
    setIsModalOpen(true)
  }

  const handleSavePayment = () => {
    setPayments([...payments, { 
      id: Date.now(), 
      memberName: 'New Member',
      ...formData 
    }])
    setIsModalOpen(false)
  }

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id))
  }

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Payments</h1>
        <Button variant="primary" onClick={handleAddPayment} className="flex items-center gap-2">
          <Plus size={20} />
          Add Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Total Revenue</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>${totalRevenue.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Paid Invoices</p>
          <p className="text-3xl font-bold" style={{ color: '#10b981' }}>{payments.filter(p => p.status === 'Paid').length}</p>
        </Card>
        <Card>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Pending Invoices</p>
          <p className="text-3xl font-bold" style={{ color: '#f59e0b' }}>{payments.filter(p => p.status === 'Pending').length}</p>
        </Card>
      </div>

      <Card>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments..."
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
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Member ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} style={{ borderColor: 'var(--border)' }} className="border-b hover:opacity-75">
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{payment.memberId}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{payment.memberName}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-primary)' }}>${payment.amount}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{payment.date}</td>
                  <td className="px-4 py-3">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: payment.status === 'Paid' ? '#10b98120' : '#f59e0b20',
                        color: payment.status === 'Paid' ? '#10b981' : '#f59e0b'
                      }}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleDeletePayment(payment.id)}
                      className="p-1 hover:opacity-75"
                    >
                      <Trash2 size={18} style={{ color: '#ef4444' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Payment">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Member ID"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>
          <Button variant="primary" className="w-full" onClick={handleSavePayment}>
            Save Payment
          </Button>
        </div>
      </Modal>
    </div>
  )
}
