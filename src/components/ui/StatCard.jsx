export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colors = {
    blue: '#2563eb',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b',
  }

  return (
    <div 
      className="p-6 rounded-lg border flex items-start justify-between"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{title}</p>
        <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
      </div>
      <div 
        className="p-3 rounded-lg"
        style={{ backgroundColor: colors[color] + '20', color: colors[color] }}
      >
        <Icon size={24} />
      </div>
    </div>
  )
}
