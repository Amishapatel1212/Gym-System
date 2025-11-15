import React from 'react'
import { Users, DollarSign, CreditCard, TrendingUp, Activity } from 'lucide-react'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 25000 },
  { month: 'Jun', revenue: 28000 },
]

const attendanceData = [
  { day: 'Mon', attendance: 45 },
  { day: 'Tue', attendance: 52 },
  { day: 'Wed', attendance: 48 },
  { day: 'Thu', attendance: 61 },
  { day: 'Fri', attendance: 55 },
  { day: 'Sat', attendance: 42 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Members" 
          value="342" 
          icon={Users}
          color="blue"
        />
        <StatCard 
          title="Active Plans" 
          value="215" 
          icon={CreditCard}
          color="green"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$28K" 
          icon={DollarSign}
          color="purple"
        />
        <StatCard 
          title="Today's Attendance" 
          value="61" 
          icon={Activity}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--primary)" 
                dot={{ fill: 'var(--primary)' }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Bar dataKey="attendance" fill="var(--primary)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Add Member', 'New Plan', 'Check-in', 'Add Payment'].map((action) => (
            <button
              key={action}
              className="p-4 rounded-lg text-center transition-colors"
              style={{ backgroundColor: 'var(--surface-light)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--surface-light)'}
            >
              {action}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
