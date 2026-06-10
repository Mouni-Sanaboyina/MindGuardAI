import React, { useState } from 'react'
import './styles/globals.css'
import Sidebar from './components/layout/Sidebar.jsx'
import Header from './components/layout/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'

const PAGE_TITLES = { dashboard: 'Analyze Content', analyses: 'Analyses', about: 'About Project' }

export default function App() {
  const [page, setPage] = useState('dashboard')
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      <Sidebar active={page} onNav={setPage} />
      <div style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header title={PAGE_TITLES[page]} />
        <main style={{ flex: 1, overflow: 'hidden' }}>
          {page === 'dashboard' && <Dashboard />}
          {page === 'analyses' && (
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>Analyses</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>Your analysis history will appear here after you run content through the dashboard.</p>
            </div>
          )}
          {page === 'about' && <About />}
        </main>
      </div>
    </div>
  )
}
