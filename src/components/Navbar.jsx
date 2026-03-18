import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'About',    path: '/about' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Team',     path: '/team' },
    { label: 'Contact',  path: '/contact' },
  ]

  const isActive = path => location.pathname === path

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(12,15,24,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 clamp(16px,4vw,48px)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px', fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>

        {/* Logo */}
        <div onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <div style={{
            width: '34px', height: '34px', background: '#e84118',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '17px',
          }}>🚗</div>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>
            Go<span style={{ color: '#e84118' }}>Drive</span>
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <button key={l.path} onClick={() => navigate(l.path)} style={{
              background: isActive(l.path) ? 'rgba(232,65,24,0.1)' : 'transparent',
              border: isActive(l.path) ? '1px solid rgba(232,65,24,0.25)' : '1px solid transparent',
              color: isActive(l.path) ? '#e84118' : 'rgba(255,255,255,0.55)',
              padding: '7px 16px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (!isActive(l.path)) e.target.style.color = '#fff' }}
              onMouseLeave={e => { if (!isActive(l.path)) e.target.style.color = 'rgba(255,255,255,0.55)' }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            padding: '8px 16px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', fontWeight: '600',
            minHeight: '40px',
          }} className="login-btn">Login</button>

          <button onClick={() => navigate('/register')} style={{
            background: '#e84118', border: 'none', color: '#fff',
            padding: '8px 18px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', fontWeight: '800',
            minHeight: '40px',
          }}>Book Now →</button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', cursor: 'pointer',
            padding: '6px 10px', borderRadius: '6px',
            fontSize: '18px', minHeight: '40px', minWidth: '40px',
          }} className="hamburger">☰</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
          background: '#141820',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          {links.map(l => (
            <button key={l.path}
              onClick={() => { navigate(l.path); setMenuOpen(false) }}
              style={{
                background: isActive(l.path) ? 'rgba(232,65,24,0.1)' : 'transparent',
                border: 'none',
                color: isActive(l.path) ? '#e84118' : 'rgba(255,255,255,0.7)',
                padding: '14px 12px', borderRadius: '8px',
                cursor: 'pointer', fontSize: '16px', fontWeight: '600',
                textAlign: 'left',
              }}>
              {l.label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => { navigate('/login'); setMenuOpen(false) }} style={{
              flex: 1, background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', padding: '13px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '15px', fontWeight: '700',
            }}>Login</button>
            <button onClick={() => { navigate('/register'); setMenuOpen(false) }} style={{
              flex: 1, background: '#e84118', border: 'none',
              color: '#fff', padding: '13px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '15px', fontWeight: '800',
            }}>Register</button>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .nav-desktop{ display:none !important; }
          .login-btn{ display:none !important; }
          .hamburger{ display:flex !important; }
        }
        @media(min-width:769px){
          .hamburger{ display:none !important; }
        }
      `}</style>
    </>
  )
}