import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useResponsive } from '../hooks/useResponsive'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { isMobile } = useResponsive()

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true); setError('')
    try {
      const res = await loginUser(form)
      login(res.data, res.data.token)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data || 'Login failed. Check your credentials.')
    } finally { setLoading(false) }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: isMobile ? '14px 16px' : '13px 16px',
    color: '#fff',
    fontSize: isMobile ? '16px' : '14px', // 16px prevents zoom on iOS
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0c0f18',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '20px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '300px' : '500px',
        height: isMobile ? '300px' : '500px',
        background: 'radial-gradient(circle, rgba(232,65,24,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: isMobile ? '20px' : '24px',
        padding: isMobile ? '32px 24px' : '48px 44px',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '36px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '36px', height: '36px', background: '#e84118',
              borderRadius: '10px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '18px'
            }}>🚗</div>
            <h1 style={{
              fontSize: isMobile ? '28px' : '32px',
              fontWeight: '900', color: '#fff',
              letterSpacing: '-1px', margin: 0
            }}>
              Go<span style={{ color: '#e84118' }}>Drive</span>
            </h1>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: isMobile ? '13px' : '14px',
            margin: 0
          }}>Welcome back to Bertoua</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(232,65,24,0.1)',
            border: '1px solid rgba(232,65,24,0.3)',
            borderRadius: '10px', padding: '12px 14px',
            color: '#f08060', fontSize: '13px',
            marginBottom: '20px', lineHeight: '1.5'
          }}>{error}</div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '12px',
            display: 'block', marginBottom: '8px',
            letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '600'
          }}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            placeholder="you@example.com"
            style={inputStyle}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '12px',
            display: 'block', marginBottom: '8px',
            letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '600'
          }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              style={{ ...inputStyle, paddingRight: '48px' }}
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.3)', cursor: 'pointer',
                fontSize: '16px', padding: '4px',
                minWidth: '32px', minHeight: '32px',
              }}
            >{showPass ? '🙈' : '👁️'}</button>
          </div>
        </div>

        {/* Button */}
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
            transition: 'all 0.2s',
            letterSpacing: '0.3px',
            minHeight: '52px', // Good touch target on mobile
          }}
        >
          {loading ? '⏳ Signing in...' : 'Sign In →'}
        </button>

        <p style={{
          textAlign: 'center', marginTop: '20px',
          color: 'rgba(255,255,255,0.25)',
          fontSize: isMobile ? '14px' : '13px'
        }}>
          No account?{' '}
          <Link to="/register" style={{
            color: '#e84118', textDecoration: 'none', fontWeight: '600'
          }}>Register here</Link>
        </p>
      </div>
    </div>
  )
}