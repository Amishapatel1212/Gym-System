export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
          focusRing: 'var(--primary)'
        }}
      />
    </div>
  )
}
