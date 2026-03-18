import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { isMobile } = useResponsive()

  const handleLogout = () => { logout(); navigate('/') }

  const roleConfig = {
    ADMIN:    { color:'#e84118', bg:'rgba(232,65,24,0.1)',    border:'rgba(232,65,24,0.3)',    icon:'⚙️',  label:'Administrator' },
    CUSTOMER: { color:'#1a5cff', bg:'rgba(26,92,255,0.1)',    border:'rgba(26,92,255,0.3)',    icon:'🚗',  label:'Customer' },
    DRIVER:   { color:'#7c3aed', bg:'rgba(124,58,237,0.1)',   border:'rgba(124,58,237,0.3)',   icon:'🧑‍✈️', label:'Driver' },
    LESSOR:   { color:'#18b87a', bg:'rgba(24,184,122,0.1)',   border:'rgba(24,184,122,0.3)',   icon:'🏠',  label:'Vehicle Owner' },
  }

  const rc = roleConfig[user?.role] || roleConfig.CUSTOMER

  const cards = [
    { icon:'🚗', label:'Vehicles', value:'Coming Week A', color:'#1a5cff' },
    { icon:'📅', label:'Bookings', value:'Coming Week A', color:'#18b87a' },
    { icon:'💰', label:'Payments', value:'Coming Week A', color:'#f5c518' },
    { icon:'🤖', label:'AI Recs', value:'Coming Week B', color:'#7c3aed' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0c0f18',
      color: '#fff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* Top nav bar */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '14px 16px' : '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: '900', margin: 0,
          letterSpacing: '-0.5px'
        }}>
          Go<span style={{ color: '#e84118' }}>Drive</span>
        </h2>
        <button onClick={handleLogout} style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.5)',
          padding: isMobile ? '8px 16px' : '8px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: isMobile ? '13px' : '14px',
          minHeight: '40px',
        }}>
          Sign Out
        </button>
      </div>

      {/* Main content */}
      <div style={{
        padding: isMobile ? '24px 16px' : '48px 40px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>

        {/* Welcome banner */}
        <div style={{
          background: `linear-gradient(135deg, ${rc.bg}, transparent)`,
          border: `1.5px solid ${rc.border}`,
          borderRadius: isMobile ? '16px' : '20px',
          padding: isMobile ? '24px 20px' : '36px 40px',
          marginBottom: isMobile ? '24px' : '36px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '20px',
        }}>
          <div style={{
            fontSize: isMobile ? '48px' : '64px',
            lineHeight: 1, flexShrink: 0
          }}>{rc.icon}</div>
          <div>
            <p style={{
              fontSize: isMobile ? '12px' : '11px',
              color: rc.color, fontWeight: '700',
              letterSpacing: '1.5px', textTransform: 'uppercase',
              margin: '0 0 6px'
            }}>{rc.label}</p>
            <h1 style={{
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: '900', margin: '0 0 6px',
              letterSpacing: '-1px', lineHeight: 1.1
            }}>
              Welcome, {user?.firstname}! 🎉
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: isMobile ? '13px' : '14px',
              margin: 0
            }}>{user?.email}</p>
          </div>
        </div>

        {/* Feature cards — 2 col on mobile, 4 on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '10px' : '14px',
          marginBottom: isMobile ? '24px' : '36px',
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              padding: isMobile ? '16px 14px' : '24px 20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: isMobile ? '28px' : '32px', marginBottom: '8px' }}>
                {card.icon}
              </div>
              <div style={{
                fontSize: '11px', color: card.color,
                fontWeight: '700', textTransform: 'uppercase',
                letterSpacing: '0.5px', marginBottom: '4px'
              }}>{card.label}</div>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: 'rgba(255,255,255,0.3)'
              }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Progress banner */}
        <div style={{
          background: 'rgba(26,92,255,0.06)',
          border: '1px solid rgba(26,92,255,0.2)',
          borderRadius: '14px',
          padding: isMobile ? '18px 16px' : '24px 28px',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: isMobile ? '13px' : '14px',
            margin: 0, lineHeight: 1.7
          }}>
            🔐 Authentication complete!<br/>
            🚗 Vehicle catalogue coming in <strong style={{ color:'#1a5cff' }}>Week A</strong><br/>
            📅 Booking system coming in <strong style={{ color:'#18b87a' }}>Week A</strong><br/>
            🤖 AI recommendations in <strong style={{ color:'#7c3aed' }}>Week B</strong>
          </p>
        </div>
      </div>
    </div>
  )
}