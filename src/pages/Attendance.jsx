import React, { useState } from 'react'
import { Plus, LogOut, Calendar } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { attendanceData } from '../data/attendance'

export default function Attendance() {
  const [records, setRecords] = useState(attendanceData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterDate, setFilterDate] = useState('')
  const [formData, setFormData] = useState({ memberId: '', memberName: '', checkInTime: '', type: 'check-in' })

  const filteredRecords = filterDate 
    ? records.filter(r => r.date === filterDate)
    : records

  const handleAddAttendance = () => {
    setFormData({ memberId: '', memberName: '', checkInTime: '', type: 'check-in' })
    setIsModalOpen(true)
  }

  const handleSaveAttendance = () => {
    setRecords([...records, { 
      id: Date.now(), 
      ...formData, 
      date: new Date().toLocaleDateString()
    }])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Attendance</h1>
        <Button variant="primary" onClick={handleAddAttendance} className="flex items-center gap-2">
          <Plus size={20} />
          Check-in
        </Button>
      </div>

      <Card>
        <div className="mb-4 flex items-center gap-4">
          <Calendar size={20} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          {filterDate && (
            <Button variant="ghost" onClick={() => setFilterDate('')} size="sm">
              Clear Filter
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderColor: 'var(--border)' }} className="border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Member ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} style={{ borderColor: 'var(--border)' }} className="border-b hover:opacity-75">
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{record.memberId}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{record.memberName}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{record.date}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{record.checkInTime}</td>
                  <td className="px-4 py-3">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: record.type === 'check-in' ? '#10b98120' : '#ef444420',
                        color: record.type === 'check-in' ? '#10b981' : '#ef4444'
                      }}
                    >
                      {record.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Attendance">
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
            type="text"
            placeholder="Member Name"
            value={formData.memberName}
            onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <input
            type="time"
            value={formData.checkInTime}
            onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--surface-light)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="check-in">Check-in</option>
            <option value="check-out">Check-out</option>
          </select>
          <Button variant="primary" className="w-full" onClick={handleSaveAttendance}>
            Save Attendance
          </Button>
        </div>
      </Modal>
    </div>
  )
}
