import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import WebDesign from './pages/WebDesign'
import SalesMarketing from './pages/SalesMarketing'
import './index.css'

function DevNav() {
  const loc = useLocation()
  const pages = [
    { path: '/', label: 'Home' },
    { path: '/web-design', label: 'Web Design' },
    { path: '/sales-marketing', label: 'Sales & Marketing' },
  ]
  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', gap: 8, background: 'rgba(0,0,0,0.8)',
      padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
    }}>
      {pages.map(p => (
        <Link
          key={p.path}
          to={p.path}
          style={{
            color: loc.pathname === p.path ? '#fff' : 'rgba(255,255,255,0.5)',
            textDecoration: 'none', fontSize: 12, fontFamily: 'Inter, sans-serif',
            padding: '4px 10px', borderRadius: 999,
            background: loc.pathname === p.path ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          {p.label}
        </Link>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-design" element={<WebDesign />} />
        <Route path="/sales-marketing" element={<SalesMarketing />} />
      </Routes>
      <DevNav />
    </BrowserRouter>
  )
}
