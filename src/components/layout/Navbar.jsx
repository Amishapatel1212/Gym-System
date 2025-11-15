import React, { useContext } from 'react'
import { Menu, Moon, Sun, LogOut } from 'lucide-react'
import { ThemeContext } from '../../context/ThemeContext'

export default function Navbar({ onMenuClick, onLogout }) {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <nav 
      className="h-20 border-b flex items-center justify-between px-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <button
        onClick={onMenuClick}
        className="p-2 hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text-primary)' }}
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--surface-light)', color: 'var(--text-primary)' }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          JD
        </div>

        <button
          onClick={onLogout}
          className="p-2 rounded-lg transition-colors ml-2"
          style={{ backgroundColor: 'var(--surface-light)', color: 'var(--text-primary)' }}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  )
}
