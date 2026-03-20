import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'
import { useState, useEffect } from 'react'
import API from '../services/api'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { isMobile } = useResponsive()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => { logout(); navigate('/') }

  // Fetch real users if ADMIN
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      setLoading(true)
      API.get('/auth/users')
        .then(res => setUsers(res.data))
        .catch(() => setUsers([]))
        .finally(() => setLoading(false))
    }
  }, [user])

  const roleColor = {
    ADMIN:    '#e84118',
    CUSTOMER: '#1a5cff',
    DRIVER:   '#7c3aed',
    LESSOR:   '#18b87a',
  }
  const rc = roleColor[user?.role] || '#1a5cff'

  return (
    <div style={{
      minHeight: '100vh', background: '#0c0f18', color: '#fff',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* ── TOP NAVBAR ── */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '14px 16px' : '0 40px',
        height: isMobile ? 'auto' : '64px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', background: '#e84118',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '16px',
          }}>🚗</div>
          <span style={{ fontSize: '18px', fontWeight: '900' }}>
            Go<span style={{ color: '#e84118' }}>Drive</span>
          </span>
          <span style={{
            background: `${rc}20`, color: rc,
            border: `1px solid ${rc}40`,
            padding: '2px 10px', borderRadius: '50px',
            fontSize: '10px', fontWeight: '700',
            letterSpacing: '1px', textTransform: 'uppercase',
          }}>{user?.role}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            {user?.firstname} {user?.lastname || ''}
          </span>
          <button onClick={() => navigate('/')} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            padding: '7px 14px', borderRadius: '7px',
            cursor: 'pointer', fontSize: '13px',
          }}>Home</button>
          <button onClick={handleLogout} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            padding: '7px 14px', borderRadius: '7px',
            cursor: 'pointer', fontSize: '13px',
          }}>Sign Out</button>
        </div>
      </div>

      <div style={{
        padding: isMobile ? '20px 16px' : '36px 40px',
        maxWidth: '1200px', margin: '0 auto',
      }}>

        {/* ── WELCOME BANNER ── */}
        <div style={{
          background: `linear-gradient(135deg, ${rc}15, transparent)`,
          border: `1.5px solid ${rc}30`,
          borderRadius: isMobile ? '16px' : '20px',
          padding: isMobile ? '20px' : '32px 40px',
          marginBottom: '28px',
          display: 'flex', alignItems: 'center',
          gap: '20px', flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: isMobile ? '48px' : '64px', lineHeight: 1 }}>
            {user?.role === 'ADMIN' ? '⚙️' : user?.role === 'DRIVER' ? '🧑‍✈️' : user?.role === 'LESSOR' ? '🏠' : '🚗'}
          </div>
          <div>
            <p style={{ fontSize: '11px', color: rc, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
              {user?.role} Dashboard
            </p>
            <h1 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: '900', letterSpacing: '-1px', margin: '0 0 6px', lineHeight: 1.1 }}>
              Welcome back, {user?.firstname}! 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
              {user?.email}
            </p>
          </div>
        </div>

        {/* ── ADMIN DASHBOARD ── */}
        {user?.role === 'ADMIN' && (
          <AdminDashboard
            users={users}
            loading={loading}
            isMobile={isMobile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navigate={navigate}
          />
        )}

        {/* ── CUSTOMER DASHBOARD ── */}
        {user?.role === 'CUSTOMER' && (
          <CustomerDashboard isMobile={isMobile} navigate={navigate} />
        )}

        {/* ── DRIVER DASHBOARD ── */}
        {user?.role === 'DRIVER' && (
          <DriverDashboard isMobile={isMobile} />
        )}

        {/* ── LESSOR DASHBOARD ── */}
        {user?.role === 'LESSOR' && (
          <LessorDashboard isMobile={isMobile} navigate={navigate} />
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════ */
function AdminDashboard({ users, loading, isMobile, activeTab, setActiveTab, navigate }) {
  const tabs = ['overview', 'users', 'vehicles', 'bookings']

  const STATS = [
    { icon:'👥', label:'Total Users',    value: users.length, color:'#1a5cff', real: true },
    { icon:'🚗', label:'Vehicles',       value:'—',           color:'#18b87a', real: false },
    { icon:'📅', label:'Bookings',       value:'—',           color:'#7c3aed', real: false },
    { icon:'💰', label:'Revenue (FCFA)', value:'—',           color:'#f5c518', real: false },
  ]

  const roleColors = {
    ADMIN:'#e84118', CUSTOMER:'#1a5cff',
    DRIVER:'#7c3aed', LESSOR:'#18b87a'
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '6px', flexWrap: 'wrap',
        marginBottom: '24px',
      }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? '#e84118' : 'rgba(255,255,255,0.04)',
            border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.08)',
            color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
            padding: '8px 20px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '13px', fontWeight: '700',
            textTransform: 'capitalize', transition: 'all 0.2s',
            minHeight: '40px',
          }}>{tab}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* Stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '140px' : '200px'}, 1fr))`,
            gap: '12px', marginBottom: '24px',
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${s.color}25`,
                borderRadius: '14px',
                padding: isMobile ? '16px' : '24px 20px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
                <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '900', color: s.color, letterSpacing: '-1px', marginBottom: '4px' }}>
                  {s.real ? (loading ? '...' : s.value) : s.value}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                {!s.real && (
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '4px', fontStyle: 'italic' }}>
                    💪 Bertoua is moving forward — and so are we!
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', padding: '20px 24px',
            marginBottom: '20px',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label:'➕ Add Vehicle', color:'#18b87a', action: () => {} },
                { label:'👥 View Users', color:'#1a5cff', action: () => {} },
                { label:'📅 View Bookings', color:'#7c3aed', action: () => {} },
                { label:'🌐 View Site', color:'#e84118', action: () => navigate('/') },
              ].map((btn, i) => (
                <button key={i} onClick={btn.action} style={{
                  background: `${btn.color}15`,
                  border: `1px solid ${btn.color}30`,
                  color: btn.color, padding: '10px 18px',
                  borderRadius: '8px', cursor: 'pointer',
                  fontSize: '13px', fontWeight: '700',
                  minHeight: '42px',
                }}>{btn.label}</button>
              ))}
            </div>
          </div>

          {/* Coming soon banner */}
          <div style={{
            background: 'rgba(26,92,255,0.06)',
            border: '1px solid rgba(26,92,255,0.15)',
            borderRadius: '12px', padding: '16px 20px',
            display: 'flex', gap: '12px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🔧</span>
            <div>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.65 }}>
                <strong style={{ color: '#1a5cff' }}>Vehicle & Booking modules.</strong> This dashboard shows live vehicle listings, active bookings, payment records, and real-time revenue analytics.
              </p>
            </div>
          </div>
        </>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
              All Users <span style={{ color: '#1a5cff', fontSize: '14px' }}>({users.length})</span>
            </h3>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '40px', textAlign: 'center',
              color: 'rgba(255,255,255,0.3)',
            }}>
              No users found. Register some users first.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#141820' }}>
                    {['ID', 'Name', 'Email', 'Phone', 'Role', 'Joined'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px', textAlign: 'left',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '11px', fontWeight: '700',
                        letterSpacing: '1px', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    }}>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>#{u.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {u.firstname} {u.lastname}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.55)' }}>{u.email}</td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.4)' }}>{u.phoneNumber || '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: `${roleColors[u.role] || '#fff'}15`,
                          color: roleColors[u.role] || '#fff',
                          border: `1px solid ${roleColors[u.role] || '#fff'}30`,
                          padding: '3px 10px', borderRadius: '50px',
                          fontSize: '10px', fontWeight: '800',
                          letterSpacing: '0.5px',
                        }}>{u.role}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.3)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VEHICLES TAB */}
      {activeTab === 'vehicles' && (
        <ComingSoonTab
          icon="🚗" title="Vehicle Management"
          desc="Vehicle CRUD — add, edit, delete vehicles. Cloudinary image upload."
          color="#18b87a"
        />
      )}

      {/* BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <ComingSoonTab
          icon="📅" title="Booking Management"
          desc="All reservations with status tracking — PENDING, CONFIRMED, COMPLETED, CANCELLED."
          color="#7c3aed"
        />
      )}
    </div>
  )
}

/* ══════════════════════════════
   CUSTOMER DASHBOARD
══════════════════════════════ */
function CustomerDashboard({ isMobile, navigate }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px', marginBottom: '24px',
      }}>
        {[
          { icon:'📅', label:'My Bookings', value:'0', color:'#1a5cff' },
          { icon:'💰', label:'Total Spent', value:'0 FCFA', color:'#18b87a' },
          { icon:'⭐', label:'Reviews Given', value:'0', color:'#f5c518' },
          { icon:'🚗', label:'Vehicles Used', value:'0', color:'#7c3aed' },
        ].map((s,i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1.5px solid ${s.color}25`,
            borderRadius: '14px', padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: s.color, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button onClick={() => navigate('/vehicles')} style={{
          background: '#e84118', border: 'none', color: '#fff',
          padding: '14px 28px', borderRadius: '10px', cursor: 'pointer',
          fontSize: '15px', fontWeight: '800', minHeight: '50px',
        }}>🚗 Browse Vehicles</button>
        <button style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
          padding: '14px 28px', borderRadius: '10px', cursor: 'pointer',
          fontSize: '15px', fontWeight: '600', minHeight: '50px',
        }}>📅 My Bookings (coming soon)</button>
      </div>

      <ComingSoonTab
        icon="📅" title="Booking History"
        desc="Your booking history, payment receipts, and vehicle ratings will appear here."
        color="#1a5cff"
      />
    </div>
  )
}

/* ══════════════════════════════
   DRIVER DASHBOARD
══════════════════════════════ */
function DriverDashboard({ isMobile }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px', marginBottom: '24px',
      }}>
        {[
          { icon:'🗓️', label:'Assigned Trips', value:'0', color:'#7c3aed' },
          { icon:'✅', label:'Completed', value:'0', color:'#18b87a' },
          { icon:'⭐', label:'Rating', value:'—', color:'#f5c518' },
          { icon:'💰', label:'Earnings', value:'0 FCFA', color:'#e84118' },
        ].map((s,i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1.5px solid ${s.color}25`,
            borderRadius: '14px', padding: '20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: s.color, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <ComingSoonTab
        icon="🧑‍✈️" title="My Assigned Trips"
        desc="Bookings assigned to you by admin, customer pickup details, trip status updates."
        color="#7c3aed"
      />
    </div>
  )
}

/* ══════════════════════════════
   LESSOR DASHBOARD
══════════════════════════════ */
function LessorDashboard({ isMobile, navigate }) {
  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px', marginBottom: '24px',
      }}>
        {[
          { icon:'🚗', label:'My Vehicles', value:'0', color:'#18b87a' },
          { icon:'📅', label:'Active Bookings', value:'0', color:'#1a5cff' },
          { icon:'💰', label:'Total Earnings', value:'0 FCFA', color:'#f5c518' },
          { icon:'⭐', label:'Avg Rating', value:'—', color:'#e84118' },
        ].map((s,i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1.5px solid ${s.color}25`,
            borderRadius: '14px', padding: '20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: s.color, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <button style={{
          background: '#18b87a', border: 'none', color: '#fff',
          padding: '14px 28px', borderRadius: '10px', cursor: 'pointer',
          fontSize: '15px', fontWeight: '800', minHeight: '50px',
        }}>➕ Add Vehicle (coming soon)</button>
      </div>

      <ComingSoonTab
        icon="🏠" title="My Vehicle Fleet"
        desc="List and manage your vehicles, set prices and availability, track bookings and earnings."
        color="#18b87a"
      />
    </div>
  )
}

/* ══════════════════════════════
   COMING SOON COMPONENT
══════════════════════════════ */
function ComingSoonTab({ icon, title, desc, color }) {
  return (
    <div style={{
      background: `${color}08`,
      border: `1.5px solid ${color}20`,
      borderRadius: '16px', padding: '40px 28px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '52px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '20px', fontWeight: '800', color, marginBottom: '10px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 20px' }}>
        {desc}
      </p>
      <div style={{
        display: 'inline-block',
        background: `${color}15`, color,
        border: `1px solid ${color}30`,
        padding: '6px 18px', borderRadius: '50px',
        fontSize: '11px', fontWeight: '700', letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>🚀Bertoua is moving forward — 💪 so are we!!</div>
    </div>
  )
}

const roleColors = {
  ADMIN:'#e84118', CUSTOMER:'#1a5cff',
  DRIVER:'#7c3aed', LESSOR:'#18b87a'
}
