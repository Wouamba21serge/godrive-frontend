import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight:'100vh', background:'#0c0f18', color:'#fff', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop:'clamp(100px,12vw,140px)',
        paddingBottom:'clamp(48px,6vw,80px)',
        padding:'clamp(100px,12vw,140px) clamp(24px,6vw,80px) clamp(48px,6vw,80px)',
        maxWidth:'900px', margin:'0 auto', textAlign:'center',
      }}>
        <div style={{
          display:'inline-block', background:'rgba(232,65,24,0.1)',
          border:'1px solid rgba(232,65,24,0.25)',
          borderRadius:'50px', padding:'6px 18px', marginBottom:'24px',
        }}>
          <span style={{ fontSize:'11px', color:'#e84118', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>
            About GoDrive
          </span>
        </div>
        <h1 style={{ fontSize:'clamp(36px,7vw,68px)', fontWeight:'900', letterSpacing:'-2px', lineHeight:1.05, marginBottom:'24px' }}>
          Bertoua's First<br /><span style={{ color:'#e84118' }}>Smart Mobility</span> Platform
        </h1>
        <p style={{ fontSize:'clamp(15px,2vw,18px)', color:'rgba(255,255,255,0.5)', lineHeight:1.8, maxWidth:'680px', margin:'0 auto' }}>
          GoDrive is a digital vehicle management and booking system built specifically
          for Bertoua, capital of Cameroon's East Region — where no such platform existed before.
        </p>
      </section>

      {/* Story */}
      <section style={{
        padding:'clamp(40px,6vw,80px) clamp(24px,6vw,80px)',
        background:'rgba(255,255,255,0.02)',
      }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'clamp(32px,5vw,80px)', alignItems:'center' }}>
          <div>
            <h2 style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:'900', letterSpacing:'-1px', marginBottom:'20px', lineHeight:1.1 }}>
              Why We Built <span style={{ color:'#e84118' }}>GoDrive</span>
            </h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.55)', lineHeight:1.85, marginBottom:'16px' }}>
              Before GoDrive, residents of Bertoua had no digital way to book a trusted vehicle.
              All transport arrangements were informal — negotiated verbally at motor parks,
              paid in cash, with no receipts, no verification, and no safety guarantees.
            </p>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.55)', lineHeight:1.85, marginBottom:'16px' }}>
              Global platforms like Uber and Yango are simply not available in Bertoua.
              GoDrive was designed from the ground up for the specific realities of the
              East Region — Mobile Money payments, local vehicle types, bilingual interface,
              and offline-capable PWA technology.
            </p>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.55)', lineHeight:1.85 }}>
              Developed as an HND Software Engineering project at ZTF University Institute
              (HIACOMST) during internship at QuamTech, Yaoundé — GoDrive represents the
              first contextually-designed mobility platform for Bertoua's community.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              { num:'4', label:'User Roles', sub:'Customer · Driver · Lessor · Admin', color:'#e84118' },
              { num:'6+', label:'Vehicle Types', sub:'Motos to cargo trucks', color:'#1a5cff' },
              { num:'PWA', label:'Technology', sub:'Works on any smartphone', color:'#18b87a' },
              { num:'AI', label:'Powered', sub:'Smart recommendations', color:'#7c3aed' },
            ].map((s,i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.03)',
                border:`1.5px solid ${s.color}30`,
                borderRadius:'16px', padding:'clamp(18px,2.5vw,28px)',
                textAlign:'center',
              }}>
                <div style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:'900', color:s.color, letterSpacing:'-1px', marginBottom:'6px' }}>{s.num}</div>
                <div style={{ fontSize:'13px', fontWeight:'800', marginBottom:'4px' }}>{s.label}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', lineHeight:1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding:'clamp(40px,6vw,80px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(24px,4vw,38px)', fontWeight:'900', letterSpacing:'-1px', marginBottom:'8px' }}>
            Built With <span style={{ color:'#1a5cff' }}>Modern Technology</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px', marginBottom:'32px' }}>
            A full-stack system with AI capabilities — built during internship at QuamTech.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'12px' }}>
            {[
              { icon:'⚛️', name:'React 18 + Vite', desc:'Frontend PWA', color:'#1a5cff' },
              { icon:'🍃', name:'Spring Boot 3.5', desc:'Backend API', color:'#18b87a' },
              { icon:'🔐', name:'JWT + BCrypt', desc:'Security', color:'#e84118' },
              { icon:'🗄️', name:'MySQL 8', desc:'Database', color:'#f5c518' },
              { icon:'🤖', name:'Python + Flask', desc:'AI Service', color:'#7c3aed' },
              { icon:'🗺️', name:'Leaflet.js', desc:'Bertoua Maps', color:'#18b87a' },
              { icon:'☁️', name:'Cloudinary', desc:'Image Storage', color:'#1a5cff' },
              { icon:'💸', name:'MTN MoMo', desc:'Payments', color:'#f5c518' },
            ].map((t,i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:'12px', padding:'clamp(14px,2vw,20px)',
                display:'flex', gap:'12px', alignItems:'center',
              }}>
                <span style={{ fontSize:'24px', flexShrink:0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'800', color:t.color }}>{t.name}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginTop:'2px' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding:'clamp(40px,6vw,80px) clamp(24px,6vw,80px)',
        background:'#e84118', textAlign:'center',
      }}>
        <h2 style={{ fontSize:'clamp(26px,5vw,48px)', fontWeight:'900', letterSpacing:'-1.5px', marginBottom:'16px' }}>
          Ready to Move with GoDrive?
        </h2>
        <p style={{ fontSize:'16px', opacity:0.8, marginBottom:'28px' }}>
          Join Bertoua's first digital transport platform today.
        </p>
        <button onClick={() => navigate('/register')} style={{
          background:'#fff', border:'none', color:'#e84118',
          padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
          borderRadius:'12px', cursor:'pointer',
          fontSize:'clamp(14px,2vw,17px)', fontWeight:'900', minHeight:'54px',
        }}>Get Started Free →</button>
      </section>

      {/* Footer */}
      <Footer navigate={navigate} />
    </div>
  )
}

function Footer({ navigate }) {
  return (
    <footer style={{
      background:'#070a12',
      borderTop:'1px solid rgba(255,255,255,0.05)',
      padding:'clamp(24px,4vw,40px) clamp(24px,6vw,80px)',
      display:'flex', justifyContent:'space-between',
      alignItems:'center', flexWrap:'wrap', gap:'16px',
      fontFamily:"'DM Sans',system-ui,sans-serif",
    }}>
      <div style={{ fontSize:'18px', fontWeight:'900', color:'#fff' }}>
        Go<span style={{ color:'#e84118' }}>Drive</span>
        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.25)', fontWeight:'400', marginTop:'3px' }}>
          Bertoua, East Region — Cameroon
        </div>
      </div>
      <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
        {['/about','/vehicles','/team','/contact'].map(p => (
          <span key={p} onClick={() => navigate(p)} style={{
            color:'rgba(255,255,255,0.4)', cursor:'pointer',
            fontSize:'13px', textTransform:'capitalize',
          }}>{p.slice(1).charAt(0).toUpperCase()+p.slice(2)}</span>
        ))}
      </div>
      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)' }}>
        © 2026 GoDrive · QuamTech · HND Defence
      </div>
    </footer>
  )
}