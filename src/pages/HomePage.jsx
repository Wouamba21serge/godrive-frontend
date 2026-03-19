import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const SLIDES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600',
]

const STATS = [
  { value:120, suffix:'+', label:'Vehicles' },
  { value:850, suffix:'+', label:'Riders' },
  { value:24,  suffix:'/7', label:'Available' },
  { value:98,  suffix:'%', label:'Satisfaction' },
]

const FEATURES = [
  { icon:'🚗', title:'Wide Vehicle Range', desc:'Motos, taxis, 4x4, minibuses — all categories across Bertoua.', color:'#e84118' },
  { icon:'📱', title:'Book in Seconds', desc:'Register, choose vehicle, confirm — done in under 2 minutes.', color:'#1a5cff' },
  { icon:'💸', title:'Mobile Money', desc:'Pay with MTN MoMo or Orange Money — no bank card needed.', color:'#18b87a' },
  { icon:'🗺️', title:'Live Bertoua Map', desc:'See available vehicles near you on an interactive map.', color:'#7c3aed' },
  { icon:'🤖', title:'AI Recommendations', desc:'Smart suggestions based on your travel needs.', color:'#f5c518' },
  { icon:'🔒', title:'Verified & Secure', desc:'All drivers verified. JWT-secured accounts.', color:'#e84118' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [counters, setCounters] = useState([0,0,0,0])
  const statsRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1) % SLIDES.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsStarted) {
        setStatsStarted(true)
        STATS.forEach((s,i) => {
          let cur = 0
          const step = Math.ceil(s.value/50)
          const t = setInterval(() => {
            cur = Math.min(cur+step, s.value)
            setCounters(prev => { const n=[...prev]; n[i]=cur; return n })
            if (cur >= s.value) clearInterval(t)
          }, 30)
        })
      }
    }, { threshold:0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [statsStarted])

  return (
    <div style={{
      minHeight:'100vh', background:'#0c0f18', color:'#fff',
      fontFamily:"'DM Sans',system-ui,sans-serif", overflowX:'hidden',
    }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        position:'relative', height:'100vh', minHeight:'600px',
        display:'flex', alignItems:'center', overflow:'hidden',
      }}>
        {/* Slideshow */}
        {SLIDES.map((url,i) => (
          <div key={i} style={{
            position:'absolute', inset:0,
            backgroundImage:`url(${url})`,
            backgroundSize:'cover', backgroundPosition:'center',
            opacity: slide===i ? 1 : 0,
            transition:'opacity 1s ease',
          }} />
        ))}

        {/* Overlay */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right, rgba(12,15,24,0.97) 0%, rgba(12,15,24,0.65) 60%, rgba(12,15,24,0.25) 100%)',
        }} />

        {/* Red left line */}
        <div style={{
          position:'absolute', left:0, top:0, bottom:0, width:'4px',
          background:'linear-gradient(to bottom, transparent, #e84118, transparent)',
        }} />

        {/* Content */}
        <div style={{
          position:'relative', zIndex:2,
          padding:'0 clamp(24px,6vw,80px)',
          maxWidth:'720px', marginTop:'64px',
        }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'rgba(232,65,24,0.12)',
            border:'1px solid rgba(232,65,24,0.25)',
            borderRadius:'50px', padding:'6px 16px', marginBottom:'24px',
          }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#e84118', display:'inline-block' }} />
            <span style={{ fontSize:'11px', color:'#e84118', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>
              GoDrive — Bertoua, East Region
            </span>
          </div>

          <h1 style={{
            fontSize:'clamp(38px,7.5vw,76px)', fontWeight:'900',
            lineHeight:1, letterSpacing:'-2.5px', marginBottom:'20px',
          }}>
            Move freely<br />
            <span style={{ color:'#e84118' }}>across Bertoua</span><br />
            with GoDrive.
          </h1>

          <p style={{
            fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.5)',
            lineHeight:1.75, marginBottom:'8px', maxWidth:'500px',
          }}>
            The first digital vehicle booking platform built for Bertoua.
            Book motos, taxis, 4x4s and trucks — in seconds.
          </p>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.2)', fontStyle:'italic', marginBottom:'36px' }}>
            La première plateforme de réservation de véhicules à Bertoua.
          </p>

          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/register')} style={{
              background:'#e84118', border:'none', color:'#fff',
              padding:'clamp(13px,2vw,17px) clamp(24px,3vw,40px)',
              borderRadius:'12px', cursor:'pointer',
              fontSize:'clamp(14px,2vw,17px)', fontWeight:'800',
              minHeight:'54px',
            }}>🚗 Book a Vehicle</button>
            <button onClick={() => navigate('/vehicles')} style={{
              background:'rgba(255,255,255,0.06)',
              border:'1.5px solid rgba(255,255,255,0.15)',
              color:'#fff',
              padding:'clamp(13px,2vw,17px) clamp(24px,3vw,40px)',
              borderRadius:'12px', cursor:'pointer',
              fontSize:'clamp(14px,2vw,17px)', fontWeight:'600',
              minHeight:'54px',
            }}>View Vehicles →</button>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{
          position:'absolute', bottom:'28px', left:'50%',
          transform:'translateX(-50%)',
          display:'flex', gap:'8px', zIndex:2,
        }}>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => setSlide(i)} style={{
              width: slide===i ? '28px' : '8px', height:'8px',
              borderRadius:'4px', padding:0, border:'none',
              background: slide===i ? '#e84118' : 'rgba(255,255,255,0.25)',
              cursor:'pointer', transition:'all 0.35s',
            }} />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{
        background:'#e84118',
        padding:'clamp(28px,4vw,44px) clamp(24px,6vw,80px)',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',
        gap:'20px', textAlign:'center',
      }}>
        {STATS.map((s,i) => (
          <div key={i}>
            <div style={{ fontSize:'clamp(30px,5vw,48px)', fontWeight:'900', letterSpacing:'-1px', lineHeight:1 }}>
              {counters[i]}{s.suffix}
            </div>
            <div style={{ fontSize:'12px', opacity:0.75, marginTop:'6px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{
        padding:'clamp(56px,8vw,100px) clamp(24px,6vw,80px)',
        background:'#0c0f18',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
        gap:'clamp(32px,5vw,80px)',
        alignItems:'center',
        maxWidth:'1200px', margin:'0 auto',
      }}>
        <div>
          <p style={{ color:'#e84118', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'14px' }}>
            About GoDrive
          </p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:'900', letterSpacing:'-1.5px', lineHeight:1.1, marginBottom:'20px' }}>
            Bertoua's First<br /><span style={{ color:'#e84118' }}>Smart Mobility</span><br />Platform
          </h2>
          <p style={{ fontSize:'clamp(14px,1.6vw,16px)', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:'16px' }}>
            Before GoDrive, residents of Bertoua had no digital way to book a trusted vehicle.
            All transport was informal — negotiated verbally, paid in cash, with no verification, including difficulties in findind vehicles during peak hours.
          </p>
          <p style={{ fontSize:'clamp(14px,1.6vw,16px)', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:'28px' }}>
            GoDrive is the first platform built specifically for Bertoua — with Mobile Money payments,
            local vehicle types, bilingual interface, and AI-powered recommendations.
          </p>
          <button onClick={() => navigate('/about')} style={{
            background:'transparent',
            border:'1.5px solid rgba(232,65,24,0.4)',
            color:'#e84118', padding:'12px 28px',
            borderRadius:'10px', cursor:'pointer',
            fontSize:'14px', fontWeight:'700',
          }}>Learn More About GoDrive →</button>
        </div>

        {/* Feature mini-grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          {[
            { icon:'📱', title:'PWA App', desc:'Works on any phone without app store' },
            { icon:'💸', title:'Mobile Money', desc:'MTN MoMo & Orange Money' },
            { icon:'🗺️', title:'Bertoua Map', desc:'Live vehicle location map' },
          ].map((c,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'14px', padding:'clamp(16px,2vw,22px)',
            }}>
              <div style={{ fontSize:'28px', marginBottom:'10px' }}>{c.icon}</div>
              <div style={{ fontSize:'13px', fontWeight:'800', marginBottom:'4px' }}>{c.title}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', lineHeight:1.55 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{
        padding:'clamp(56px,8vw,100px) clamp(24px,6vw,80px)',
        background:'rgba(255,255,255,0.015)',
      }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,60px)' }}>
          <p style={{ color:'#1a5cff', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'12px' }}>
            Why GoDrive
          </p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:'900', letterSpacing:'-1.5px', lineHeight:1.1 }}>
            Built for <span style={{ color:'#1a5cff' }}>Bertoua</span>
          </h2>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
          gap:'14px', maxWidth:'1100px', margin:'0 auto',
        }}>
          {FEATURES.map((f,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px', padding:'clamp(20px,3vw,28px)',
            }}>
              <div style={{ fontSize:'32px', marginBottom:'14px' }}>{f.icon}</div>
              <h3 style={{ fontSize:'16px', fontWeight:'800', marginBottom:'8px', color:f.color }}>{f.title}</h3>
              <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.45)', lineHeight:1.65, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VEHICLE PREVIEW ── */}
      <section style={{
        padding:'clamp(56px,8vw,100px) clamp(24px,6vw,80px)',
        background:'#0c0f18', textAlign:'center',
      }}>
        <p style={{ color:'#18b87a', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'12px' }}>
          Our Fleet
        </p>
        <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:'900', letterSpacing:'-1.5px', marginBottom:'16px' }}>
          Every Vehicle <span style={{ color:'#18b87a' }}>You Need</span>
        </h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px', marginBottom:'36px', maxWidth:'540px', margin:'0 auto 36px' }}>
          From daily motos to cargo trucks — browse our full fleet and book instantly.
        </p>

        {/* Vehicle preview cards */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',
          gap:'12px', maxWidth:'1000px', margin:'0 auto 36px',
        }}>
          {[
            { img:'/vehicles/Corolla.jpg', name:'Toyota Corolla 2024 - Reliable and fuel-efficient sedan.',    price:'2,500',  color:'#e84118' },
            { img:'/vehicles/Honda.jpg', name:'Honda City 2024 - Compact and stylish with great fuel economy.',   price:'8,000',  color:'#18b87a' },
            { img:'/vehicles/car8.jpg',  name:'Toyota Fortuner 2024 - Robust SUV for all terrains.',      price:'15,000', color:'#7c3aed' },
            { img:'/vehicles/car9.jpg',  name:'Kia Sportage 2024 - Versatile and comfortable SUV',      price:'20,000', color:'#f5c518' },
          ].map((v,i) => (
            <div key={i} onClick={() => navigate('/vehicles')} style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'14px', overflow:'hidden',
              cursor:'pointer', transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='none'}
            >
              <div style={{ height:'130px', background:'rgba(255,255,255,0.04)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={v.img} alt={v.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML=`<span style="font-size:52px">${v.icon}</span>` }}
                />
              </div>
              <div style={{ padding:'14px' }}>
                <div style={{ fontSize:'13px', fontWeight:'800', marginBottom:'4px' }}>{v.name}</div>
                <div style={{ fontSize:'12px', color:v.color, fontWeight:'700' }}>{v.price} FCFA/day</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/vehicles')} style={{
          background:'#18b87a', border:'none', color:'#fff',
          padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
          borderRadius:'12px', cursor:'pointer',
          fontSize:'clamp(14px,2vw,16px)', fontWeight:'800', minHeight:'54px',
        }}>View All Vehicles →</button>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding:'clamp(56px,8vw,100px) clamp(24px,6vw,80px)',
        background:'rgba(255,255,255,0.015)',
      }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,60px)' }}>
          <p style={{ color:'#7c3aed', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'12px' }}>Simple Process</p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:'900', letterSpacing:'-1.5px' }}>
            Book in <span style={{ color:'#7c3aed' }}>3 Steps</span>
          </h2>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
          gap:'16px', maxWidth:'900px', margin:'0 auto',
        }}>
          {[
            { step:'01', icon:'📝', title:'Register', desc:'Create your GoDrive account in 60 seconds. Choose your role.', color:'#e84118' },
            { step:'02', icon:'🔍', title:'Choose Vehicle', desc:'Browse the catalogue, view on map, compare prices.', color:'#1a5cff' },
            { step:'03', icon:'✅', title:'Book & Pay', desc:'Confirm your booking and pay with MTN MoMo or Orange Money.', color:'#18b87a' },
          ].map((s,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.03)',
              border:`1.5px solid ${s.color}25`,
              borderRadius:'16px', padding:'clamp(24px,3vw,32px)',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{
                position:'absolute', top:'12px', right:'16px',
                fontSize:'clamp(50px,7vw,70px)', fontWeight:'900',
                color:`${s.color}10`, lineHeight:1, fontFamily:'monospace',
              }}>{s.step}</div>
              <div style={{ fontSize:'36px', marginBottom:'16px' }}>{s.icon}</div>
              <h3 style={{ fontSize:'18px', fontWeight:'800', color:s.color, marginBottom:'8px' }}>{s.title}</h3>
              <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.45)', lineHeight:1.65, margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding:'clamp(48px,6vw,80px) clamp(24px,6vw,80px)',
        background:'#e84118', textAlign:'center',
      }}>
        <h2 style={{ fontSize:'clamp(28px,5vw,52px)', fontWeight:'900', letterSpacing:'-1.5px', marginBottom:'16px', lineHeight:1.05 }}>
          Ready to Move<br />with GoDrive?
        </h2>
        <p style={{ fontSize:'clamp(14px,2vw,17px)', opacity:0.8, marginBottom:'32px', maxWidth:'480px', margin:'0 auto 32px' }}>
          Join Bertoua's first digital transport platform. Register free today.
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={() => navigate('/register')} style={{
            background:'#fff', border:'none', color:'#e84118',
            padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
            borderRadius:'12px', cursor:'pointer',
            fontSize:'clamp(14px,2vw,17px)', fontWeight:'900', minHeight:'54px',
          }}>Get Started Free →</button>
          <button onClick={() => navigate('/about')} style={{
            background:'transparent',
            border:'2px solid rgba(255,255,255,0.4)',
            color:'#fff',
            padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
            borderRadius:'12px', cursor:'pointer',
            fontSize:'clamp(14px,2vw,17px)', fontWeight:'700', minHeight:'54px',
          }}>Learn More</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background:'#070a12',
        borderTop:'1px solid rgba(255,255,255,0.05)',
        padding:'clamp(40px,6vw,64px) clamp(24px,6vw,80px) 0',
        fontFamily:"'DM Sans',system-ui,sans-serif",
      }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
          gap:'clamp(28px,4vw,52px)',
          marginBottom:'clamp(32px,4vw,52px)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
              <div style={{ width:'32px', height:'32px', background:'#e84118', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🚗</div>
              <span style={{ fontSize:'20px', fontWeight:'900', color:'#fff' }}>Go<span style={{ color:'#e84118' }}>Drive</span></span>
            </div>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)', lineHeight:1.75, maxWidth:'220px', marginBottom:'12px' }}>
              Bertoua's first digital vehicle booking platform. Fast, secure, local.
            </p>
            <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.15)', fontStyle:'italic' }}>
              Réservez en quelques secondes.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize:'11px', fontWeight:'700', color:'rgba(255,255,255,0.4)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'18px' }}>Platform</h4>
            {[
              { label:'About GoDrive', path:'/about' },
              { label:'Vehicle Models', path:'/vehicles' },
              { label:'Our Team', path:'/team' },
              { label:'Contact', path:'/contact' },
            ].map((l,i) => (
              <div key={i} onClick={() => navigate(l.path)} style={{
                color:'rgba(255,255,255,0.35)', cursor:'pointer',
                fontSize:'13.5px', marginBottom:'10px', transition:'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color='#e84118'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.35)'}>
                {l.label}
              </div>
            ))}
          </div>

          {/* Account */}
          <div>
            <h4 style={{ fontSize:'11px', fontWeight:'700', color:'rgba(255,255,255,0.4)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'18px' }}>Account</h4>
            {[
              { label:'Register as Customer', path:'/register' },
              { label:'Register as Driver', path:'/register' },
              { label:'List Your Vehicle', path:'/register' },
              { label:'Login', path:'/login' },
            ].map((l,i) => (
              <div key={i} onClick={() => navigate(l.path)} style={{
                color:'rgba(255,255,255,0.35)', cursor:'pointer',
                fontSize:'13.5px', marginBottom:'10px', transition:'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color='#e84118'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.35)'}>
                {l.label}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize:'11px', fontWeight:'700', color:'rgba(255,255,255,0.4)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'18px' }}>Contact</h4>
            {[
              { icon:'📍', text:'Bertoua, East Region' },
              { icon:'📞', text:'+237 694 99 76 08' },
              { icon:'📧', text:'wouambaserge21@gmail.com' },
              { icon:'⏰', text:'Available 24/7' },
            ].map((c,i) => (
              <div key={i} style={{ display:'flex', gap:'8px', alignItems:'center', color:'rgba(255,255,255,0.35)', fontSize:'13px', marginBottom:'10px' }}>
                <span>{c.icon}</span>{c.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:'1px solid rgba(255,255,255,0.05)',
          padding:'clamp(16px,3vw,24px) 0',
          display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:'12px',
        }}>
          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.2)' }}>
            © 2026 GoDrive · Built by Dibot Wouamba Serge Cabrel · QuamTech, Yaoundé
          </span>
          <div style={{ display:'flex', gap:'16px' }}>
            {['⚛️ React','🍃 Spring Boot','🗄️ MySQL','🤖 Python AI'].map((t,i) => (
              <span key={i} style={{ fontSize:'11px', color:'rgba(255,255,255,0.15)' }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0c0f18; }
        ::-webkit-scrollbar-thumb { background:#e84118; border-radius:3px; }
      `}</style>
    </div>
  )
}