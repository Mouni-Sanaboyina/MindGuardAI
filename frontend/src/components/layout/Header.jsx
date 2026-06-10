import React from 'react'
import { Sun } from 'lucide-react'

export default function Header({ title = 'Dashboard' }) {
  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'var(--white)',
      borderBottom: '1px solid var(--gray-200)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      justifyContent: 'space-between',
    }}>
      <h1 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={{
          width: 32, height: 32, borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--gray-200)', background: 'var(--white)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gray-500)',
        }}>
          <Sun size={15} />
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--blue-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
        }}>M</div>
      </div>
    </header>
  )
}
