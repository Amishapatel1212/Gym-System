import React, { useEffect } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: { bg: 'bg-green-900', text: 'text-green-100', border: 'border-green-700' },
    error: { bg: 'bg-red-900', text: 'text-red-100', border: 'border-red-700' },
    info: { bg: 'bg-blue-900', text: 'text-blue-100', border: 'border-blue-700' },
  }

  const color = colors[type]
  const Icon = type === 'success' ? CheckCircle : AlertCircle

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border flex items-center gap-3 ${color.bg} ${color.text} ${color.border} z-50`}>
      <Icon size={20} />
      <span>{message}</span>
    </div>
  )
}
