export default function Card({ children, className = '' }) {
  return (
    <div 
      className={`rounded-lg p-6 ${className}`}
      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {children}
    </div>
  )
}
