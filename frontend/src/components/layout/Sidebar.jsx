import React from 'react'
import { Shield, LayoutDashboard, History, Info, Zap } from 'lucide-react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'analyses',  label: 'Analyses',        icon: History },
  { id: 'about',     label: 'About Project',   icon: Info },
]

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--white)',
      borderRight: '1px solid var(--gray-200)',
      height: '100vh',
      position: 'fixed',
      top: 0, left: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--blue-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Shield size={16} color="white" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)', letterSpacing: '-0.01em' }}>
          MindGuardAI
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none', cursor: 'pointer',
              background: active === id ? 'var(--blue-50)' : 'transparent',
              color: active === id ? 'var(--blue-700)' : 'var(--gray-600)',
              fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: active === id ? 600 : 400,
              textAlign: 'left', width: '100%',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (active !== id) e.currentTarget.style.background = 'var(--gray-50)' }}
            onMouseLeave={e => { if (active !== id) e.currentTarget.style.background = 'transparent' }}
          >
            <Icon size={16} strokeWidth={active === id ? 2 : 1.75} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>M</span>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-800)' }}>MindGuardAI</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>Powered by Bytez</div>
          </div>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)', lineHeight: 1.5 }}>
          AI-powered content moderation across Text, Audio and Image.
          <br />
          Built with ❤️ for safer digital communities.
        </div>
      </div>
    </aside>
  )
}
