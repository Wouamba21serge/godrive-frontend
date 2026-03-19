import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function ContactPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0c0f18', color:'#fff', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding:'clamp(100px,12vw,140px) clamp(24px,6vw,80px) clamp(32px,4vw,56px)', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)', borderRadius:'50px', padding:'6px 18px', marginBottom:'20px' }}>
          <span style={{ fontSize:'11px', color:'#7c3aed', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>Contact Us</span>
        </div>
        <h1 style={{ fontSize:'clamp(34px,7vw,64px)', fontWeight:'900', letterSpacing:'-2px', lineHeight:1.05, marginBottom:'16px' }}>
          Find Us in <span style={{ color:'#7c3aed' }}>Bertoua</span>
        </h1>
        <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.45)', lineHeight:1.75, maxWidth:'540px', margin:'0 auto' }}>
          Questions about GoDrive? Want to list your vehicle? We're here to help.
        </p>
      </section>

      {/* Main content */}
      <section style={{ padding:'0 clamp(24px,6vw,80px) clamp(56px,8vw,100px)' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
          gap:'24px', maxWidth:'1100px', margin:'0 auto',
          alignItems:'start',
        }}>

          {/* Contact form */}
          <div style={{
            background:'rgba(255,255,255,0.03)',
            border:'1.5px solid rgba(124,58,237,0.2)',
            borderRadius:'20px', padding:'clamp(24px,3vw,40px)',
          }}>
            <h2 style={{ fontSize:'clamp(20px,3vw,28px)', fontWeight:'900', letterSpacing:'-0.5px', marginBottom:'8px' }}>Send a Message</h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.4)', marginBottom:'28px' }}>We reply within 24 hours.</p>

            {sent ? (
              <div style={{
                background:'rgba(24,184,122,0.1)',
                border:'1.5px solid rgba(24,184,122,0.3)',
                borderRadius:'12px', padding:'32px',
                textAlign:'center',
              }}>
                <div style={{ fontSize:'48px', marginBottom:'12px' }}>✅</div>
                <h3 style={{ fontSize:'20px', fontWeight:'800', color:'#18b87a', marginBottom:'8px' }}>Message Sent!</h3>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'14px' }}>We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {[
                  { key:'name', label:'Full Name', placeholder:'Serge Dibot', type:'text' },
                  { key:'email', label:'Email Address', placeholder:'you@example.com', type:'email' },
                  { key:'phone', label:'Phone (optional)', placeholder:'+237 6XX XXX XXX', type:'tel' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom:'16px' }}>
                    <label style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', display:'block', marginBottom:'7px', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'700' }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]}
                      onChange={e => setForm({...form, [f.key]:e.target.value})}
                      placeholder={f.placeholder}
                      style={{
                        width:'100%', background:'rgba(255,255,255,0.05)',
                        border:'1.5px solid rgba(255,255,255,0.09)',
                        borderRadius:'10px', padding:'13px 16px',
                        color:'#fff', fontSize:'14px', outline:'none',
                        boxSizing:'border-box',
                      }} />
                  </div>
                ))}

                <div style={{ marginBottom:'24px' }}>
                  <label style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', display:'block', marginBottom:'7px', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'700' }}>Message</label>
                  <textarea value={form.message}
                    onChange={e => setForm({...form, message:e.target.value})}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    style={{
                      width:'100%', background:'rgba(255,255,255,0.05)',
                      border:'1.5px solid rgba(255,255,255,0.09)',
                      borderRadius:'10px', padding:'13px 16px',
                      color:'#fff', fontSize:'14px', outline:'none',
                      resize:'vertical', boxSizing:'border-box',
                      fontFamily:"'DM Sans',system-ui,sans-serif",
                    }} />
                </div>

                <button onClick={handleSubmit} style={{
                  width:'100%', background:'#7c3aed', border:'none', color:'#fff',
                  padding:'16px', borderRadius:'12px', cursor:'pointer',
                  fontSize:'16px', fontWeight:'800', minHeight:'54px',
                }}>Send Message →</button>
              </>
            )}
          </div>

          {/* Map + Info */}
          <div>
            {/* Contact details */}
            <div style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px', padding:'clamp(20px,3vw,28px)',
              marginBottom:'16px',
            }}>
              <h3 style={{ fontSize:'18px', fontWeight:'800', marginBottom:'20px' }}>Contact Information</h3>
              {[
                { icon:'📍', label:'Address', value:'Bertoua, East Region, Cameroon' },
                { icon:'📞', label:'Phone', value:'+237 694 99 76 08' },
                { icon:'📧', label:'Email', value:'wouambaserge21@gmail.com' },
                { icon:'⏰', label:'Hours', value:'24/7 — Always available' },
              ].map((c,i) => (
                <div key={i} style={{
                  display:'flex', gap:'14px', alignItems:'flex-start',
                  padding:'12px 0',
                  borderBottom: i<4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{
                    width:'38px', height:'38px', borderRadius:'9px',
                    background:'rgba(124,58,237,0.1)',
                    border:'1px solid rgba(124,58,237,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'16px', flexShrink:0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:'10px', color:'#7c3aed', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'3px' }}>{c.label}</div>
                    <div style={{ fontSize:'14px', color:'rgba(255,255,255,0.7)', fontWeight:'500' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bertoua Map */}
            <div style={{
              borderRadius:'16px', overflow:'hidden',
              border:'2px solid rgba(124,58,237,0.25)',
              height:'clamp(280px,35vw,380px)',
            }}>
              <iframe
                title="Bertoua City Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63770.0!2d13.6486!3d4.5785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10601b28c6e7e999%3A0x8c27af0f28b72c7!2sBertoua%2C%20Cameroon!5e0!3m2!1sen!2scm!4v1710000000000!5m2!1sen!2scm"
                width="100%" height="100%"
                style={{ border:0, display:'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.2)', textAlign:'center', marginTop:'10px' }}>
              📍 Bertoua, East Region — 4.5785°N, 13.6836°E
            </p>
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section style={{ padding:'clamp(40px,6vw,72px) clamp(24px,6vw,80px)', background:'rgba(124,58,237,0.06)', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:'900', letterSpacing:'-1px', marginBottom:'12px' }}>
          Ready to try GoDrive?
        </h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px', marginBottom:'24px' }}>
          Register now and book your first vehicle in under 2 minutes.
        </p>
        <button onClick={() => navigate('/register')} style={{
          background:'#7c3aed', border:'none', color:'#fff',
          padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
          borderRadius:'12px', cursor:'pointer',
          fontSize:'clamp(14px,2vw,16px)', fontWeight:'800', minHeight:'54px',
        }}>Create Free Account →</button>
      </section>

      <FooterSimple navigate={navigate} />
    </div>
  )
}

function FooterSimple({ navigate }) {
  return (
    <footer style={{
      background:'#070a12', borderTop:'1px solid rgba(255,255,255,0.05)',
      padding:'24px clamp(24px,6vw,80px)',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      flexWrap:'wrap', gap:'12px', fontFamily:"'DM Sans',system-ui,sans-serif",
    }}>
      <span style={{ fontSize:'16px', fontWeight:'900', color:'#fff' }}>Go<span style={{ color:'#e84118' }}>Drive</span></span>
      <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)' }}>© 2026 GoDrive · Bertoua, Cameroon</span>
    </footer>
  )
}

