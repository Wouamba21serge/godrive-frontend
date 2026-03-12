import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

// Bertoua scenes — using beautiful African city imagery
const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1609183480405-f4d46b3ab354?w=1200&q=80',
    label: 'Bertoua City Centre',
    sub: 'Le cœur de notre ville'
  },
  {
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    label: 'East Region Roads',
    sub: 'Des routes qui nous connectent'
  },
  {
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
    label: 'Travel Across Cameroon',
    sub: 'Voyagez en toute liberté'
  },
  {
    url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
    label: 'Your Journey Starts Here',
    sub: 'Votre trajet commence ici'
  },
]

const STATS = [
  { value: 120, label: 'Vehicles Available', suffix: '+' },
  { value: 850, label: 'Happy Riders', suffix: '+' },
  { value: 24, label: 'Hour Service', suffix: '/7' },
  { value: 98, label: 'Satisfaction Rate', suffix: '%' },
]

const FEATURES = [
  { icon: '🚗', title: 'Wide Selection', desc: 'Cars, vans, trucks — every vehicle type for every need in Bertoua.' },
  { icon: '💳', title: 'Mobile Money', desc: 'Pay instantly with MTN MoMo or Orange Money. No cash needed.' },
  { icon: '📍', title: 'Live Tracking', desc: 'Track your driver in real time from pickup to drop-off.' },
  { icon: '🤖', title: 'Smart AI Picks', desc: 'Our system learns your preferences and recommends the best vehicle for you.' },
  { icon: '⭐', title: 'Verified Drivers', desc: 'Every driver is rated and reviewed by the Bertoua community.' },
  { icon: '🔔', title: 'Instant Alerts', desc: 'Get notified the moment your vehicle is confirmed and on its way.' },
]

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ value, label, suffix, animate }) {
  const count = useCounter(value, 1800, animate)
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '24px 16px',
      textAlign: 'center',
      transition: 'transform 0.3s',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '42px', fontWeight: 900, color: '#e84118', lineHeight: 1 }}>
        {animate ? count : 0}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '6px' }}>{label}</div>
    </div>
  )
}

export default function App() {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [apiMsg, setApiMsg] = useState('Connecting...')
  const [menuOpen, setMenuOpen] = useState(false)
  const statsRef = useRef(null)

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length)
        setAnimating(false)
      }, 500)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Intersection observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  // API ping
  useEffect(() => {
    axios.get('http://localhost:8080/api/hello')
      .then(() => setApiMsg('✅ GoDrive System Online'))
      .catch(() => setApiMsg('🟡 Starting up...'))
  }, [])

  const goToSlide = (i) => {
    setAnimating(true)
    setTimeout(() => { setSlide(i); setAnimating(false) }, 400)
  }

  return (
    <div style={{ background: '#0c0f18', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', color: '#fff', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(12,15,24,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px' }}>
          Go<span style={{ color: '#e84118' }}>Drive</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px', fontWeight: 400, letterSpacing: '2px' }}>BERTOUA</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          {['Vehicles', 'How it Works', 'About', 'Contact'].map(item => (
            <span key={item} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >{item}</span>
          ))}
        </div>
        <button style={{
          background: '#e84118', color: '#fff', border: 'none',
          padding: '10px 24px', borderRadius: '8px', fontWeight: 700,
          fontSize: '14px', cursor: 'pointer'
        }}>Book Now →</button>
      </nav>

      {/* ── HERO WITH ROTATING SLIDESHOW ── */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${SLIDES[slide].url})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: animating ? 0 : 1,
          transition: 'opacity 0.5s ease',
          transform: animating ? 'scale(1.05)' : 'scale(1)',
        }} />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(12,15,24,0.92) 40%, rgba(12,15,24,0.4) 100%)'
        }} />

        {/* Animated red accent line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
          background: 'linear-gradient(to bottom, transparent, #e84118, transparent)',
          animation: 'pulse 2s infinite'
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2,
          paddingTop: '64px', height: '100%',
          display: 'flex', alignItems: 'center', paddingLeft: '80px'
        }}>
          <div style={{ maxWidth: '600px' }}>
            {/* Location badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(232,65,24,0.15)', border: '1px solid rgba(232,65,24,0.3)',
              borderRadius: '50px', padding: '6px 16px', marginBottom: '24px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e84118', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
              <span style={{ fontSize: '12px', color: '#e84118', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                📍 GoDrive in Bertoua
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '20px' }}>
              Move freely<br />
              <span style={{ color: '#e84118' }}>across Bertoua</span><br />
              with GoDrive.
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: 1.7, marginBottom: '12px' }}>
              The fastest way to book a trusted vehicle in Bertoua. From the market to Abong-Mbang — we get you there safely.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', fontStyle: 'italic', marginBottom: '36px' }}>
              Réservez un véhicule de confiance à Bertoua en quelques secondes.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <button style={{
                background: '#e84118', color: '#fff', border: 'none',
                padding: '16px 36px', borderRadius: '12px', fontWeight: 800,
                fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 8px 32px rgba(232,65,24,0.4)'
              }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(232,65,24,0.6)' }}
                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(232,65,24,0.4)' }}
              >
                🚗 Book a Vehicle
              </button>
              <button style={{
                background: 'transparent', color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)',
                padding: '16px 36px', borderRadius: '12px', fontWeight: 700,
                fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.2)' }}
              >
                List Your Vehicle →
              </button>
            </div>

            {/* Slide label */}
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontStyle: 'italic' }}>
               {SLIDES[slide].label} — <span style={{ color: 'rgba(255,255,255,0.25)' }}>{SLIDES[slide].sub}</span>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{
          position: 'absolute', bottom: '40px', left: '80px',
          display: 'flex', gap: '10px', zIndex: 3
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: i === slide ? '32px' : '8px', height: '8px',
              borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: i === slide ? '#e84118' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s', padding: 0
            }} />
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '40px', right: '40px', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '2px'
        }}>
          <span style={{ animation: 'bounce 2s infinite' }}>↓</span>
          SCROLL
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div ref={statsRef} style={{
        background: 'rgba(232,65,24,0.08)',
        borderTop: '1px solid rgba(232,65,24,0.2)',
        borderBottom: '1px solid rgba(232,65,24,0.2)',
        padding: '48px 80px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: '100px 80px', textAlign: 'center' }}>
        <p style={{ color: '#e84118', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Simple & Fast</p>
        <h2 style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '60px' }}>
          Book in <span style={{ color: '#e84118' }}>3 steps</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: '36px', left: '20%', right: '20%', height: '2px', background: 'rgba(232,65,24,0.3)', zIndex: 0 }} />
          {[
            { num: '01', icon: '🔍', title: 'Choose Your Vehicle', desc: 'Browse our catalogue. Filter by type, location, and price.' },
            { num: '02', icon: '📅', title: 'Pick Date & Location', desc: 'Set your pickup point and schedule anywhere in Bertoua.' },
            { num: '03', icon: '✅', title: 'Confirm & Pay', desc: 'Pay with Mobile Money. Get instant confirmation.' },
          ].map((step) => (
            <div key={step.num} style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#e84118', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', boxShadow: '0 8px 32px rgba(232,65,24,0.4)'
              }}>{step.icon}</div>
              <div style={{ color: 'rgba(232,65,24,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>{step.num}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13.5px', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <div style={{ padding: '0 80px 100px' }}>
        <p style={{ color: '#e84118', fontWeight: 700, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Everything You Need</p>
        <h2 style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '48px', textAlign: 'center' }}>
          Built for <span style={{ color: '#e84118' }}>Bertoua</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
          {FEATURES.map((f, i) => (
            <div key={i}
              onMouseEnter={() => setActiveFeature(i)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                background: activeFeature === i ? 'rgba(232,65,24,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${activeFeature === i ? 'rgba(232,65,24,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '16px', padding: '28px 24px',
                cursor: 'default', transition: 'all 0.25s',
                transform: activeFeature === i ? 'translateY(-4px)' : 'none'
              }}>
              <div style={{ fontSize: '32px', marginBottom: '14px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{
        margin: '0 80px 100px',
        background: 'linear-gradient(135deg, #e84118 0%, #c0320f 100%)',
        borderRadius: '24px', padding: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '32px',
        boxShadow: '0 32px 80px rgba(232,65,24,0.3)'
      }}>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '10px' }}>
            Ready to move smarter<br />in Bertoua?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>
            Join hundreds of Bertoua residents already using GoDrive.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '14px' }}>
          <button style={{
            background: '#fff', color: '#e84118', border: 'none',
            padding: '16px 36px', borderRadius: '12px', fontWeight: 800,
            fontSize: '16px', cursor: 'pointer'
          }}>Get Started Free</button>
          <button style={{
            background: 'rgba(0,0,0,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)',
            padding: '16px 36px', borderRadius: '12px', fontWeight: 700,
            fontSize: '16px', cursor: 'pointer'
          }}>Learn More</button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 900 }}>Go<span style={{ color: '#e84118' }}>Drive</span></div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '4px' }}>Proudly built for Bertoua © 2025</div>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          {apiMsg}
        </div>
      </footer>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0c0f18; }
        ::-webkit-scrollbar-thumb { background: #e84118; border-radius: 3px; }
      `}</style>
    </div>
  )
}
