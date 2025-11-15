import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Users, CreditCard, Calendar, DollarSign, Home } from 'lucide-react'

export default function Sidebar({ isOpen }) {
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Members', icon: Users, path: '/members' },
    { label: 'Plans', icon: CreditCard, path: '/plans' },
    { label: 'Attendance', icon: Calendar, path: '/attendance' },
    { label: 'Payments', icon: DollarSign, path: '/payments' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside 
      className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col border-r`}
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="h-20 flex items-center justify-center border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-bold text-2xl" style={{ color: 'var(--primary)' }}>
          {isOpen ? 'GymPro' : 'GP'}
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              style={active ? { backgroundColor: 'var(--primary)' } : {}}
              title={!isOpen ? item.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
