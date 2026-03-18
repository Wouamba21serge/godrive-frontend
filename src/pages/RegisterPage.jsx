import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useResponsive } from '../hooks/useResponsive'

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstname:'', lastname:'', email:'',
    password:'', phoneNumber:'', role:'CUSTOMER'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useResponsive()

  const update = field => e => setForm({...form, [field]: e.target.value})

  const handleSubmit = async () => {
    if (!form.firstname || !form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true); setError('')
    try {
      const res = await registerUser(form)
      login(res.data, res.data.token)
      navigate('/dashboard')
    } catch(e) {
      setError(e.response?.data || 'Registration failed. Try a different email.')
    } finally { setLoading(false) }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: isMobile ? '14px 16px' : '12px 16px',
    color: '#fff',
    fontSize: isMobile ? '16px' : '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    display: 'block',
    marginBottom: '7px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    fontWeight: '600'
  }

  const roles = [
    { value: 'CUSTOMER', label: '🚗 Book a Vehicle', desc: 'I want to rent' },
    { value: 'DRIVER',   label: '🧑‍✈️ Be a Driver',    desc: 'I want to drive' },
    { value: 'LESSOR',   label: '🏠 List My Car',     desc: 'I own vehicles' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0c0f18',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '24px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: isMobile ? '20px' : '24px',
        padding: isMobile ? '28px 20px' : '44px 40px',
        width: '100%',
        maxWidth: '500px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '32px' }}>
          <h1 style={{
            fontSize: isMobile ? '26px' : '30px',
            fontWeight: '900', color: '#fff',
            letterSpacing: '-1px', margin: '0 0 6px'
          }}>
            Go<span style={{ color: '#e84118' }}>Drive</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px', margin: 0
          }}>Join Bertoua's mobility platform</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(232,65,24,0.1)',
            border: '1px solid rgba(232,65,24,0.3)',
            borderRadius: '10px', padding: '12px 14px',
            color: '#f08060', fontSize: '13px',
            marginBottom: '16px', lineHeight: '1.5'
          }}>{error}</div>
        )}

        {/* Name row — stacks on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div>
            <label style={labelStyle}>First Name *</label>
            <input style={inputStyle} value={form.firstname}
              onChange={update('firstname')} placeholder="Serge"
              autoComplete="given-name" />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input style={inputStyle} value={form.lastname}
              onChange={update('lastname')} placeholder="Dibot"
              autoComplete="family-name" />
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Email *</label>
          <input type="email" style={inputStyle} value={form.email}
            onChange={update('email')} placeholder="you@example.com"
            autoComplete="email" />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Phone (Cameroon)</label>
          <input type="tel" style={inputStyle} value={form.phoneNumber}
            onChange={update('phoneNumber')} placeholder="6XX XXX XXX"
            autoComplete="tel" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Password *</label>
          <input type="password" style={inputStyle} value={form.password}
            onChange={update('password')} placeholder="Min. 8 characters"
            autoComplete="new-password" />
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>I want to...</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: '8px'
          }}>
            {roles.map(r => (
              <button
                key={r.value}
                onClick={() => setForm({...form, role: r.value})}
                style={{
                  padding: isMobile ? '14px 12px' : '12px 8px',
                  borderRadius: '10px',
                  border: `1.5px solid ${form.role===r.value ? '#e84118' : 'rgba(255,255,255,0.1)'}`,
                  background: form.role===r.value ? 'rgba(232,65,24,0.12)' : 'transparent',
                  color: form.role===r.value ? '#e84118' : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer',
                  textAlign: isMobile ? 'left' : 'center',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  alignItems: isMobile ? 'center' : 'center',
                  gap: isMobile ? '10px' : '4px',
                  minHeight: '52px',
                }}
              >
                <span style={{ fontSize: isMobile ? '20px' : '22px' }}>
                  {r.value === 'CUSTOMER' ? '🚗' : r.value === 'DRIVER' ? '🧑‍✈️' : '🏠'}
                </span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>
                    {r.value}
                  </div>
                  {isMobile && (
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{r.desc}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#a83010' : '#e84118',
            color: '#fff', border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '14px',
            fontWeight: '800',
            fontSize: isMobile ? '16px' : '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            minHeight: '52px',
          }}
        >
          {loading ? '⏳ Creating account...' : 'Create Account →'}
        </button>

        <p style={{
          textAlign: 'center', marginTop: '18px',
          color: 'rgba(255,255,255,0.25)',
          fontSize: isMobile ? '14px' : '13px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e84118', textDecoration: 'none', fontWeight: '600' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}