import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const VEHICLES = [
  { img:'/vehicles/car5.jpg',     name:'Suzuki Swift 2024 ',   type:'Taxi',         price:'2,500',  seats:2,  tag:'Most Popular', color:'#e84118',
    desc:'Modern hatchback with sporty features.' },
  { img:'/vehicles/car7.jpg', name:'Suzuki Mehran 2024 - ', type:'Clando', price:'3,500',  seats:3,  tag:'City Travel',  color:'#1a5cff',
    desc:'Simple and economical car and comfortably with luggage.' },
  { img:'/vehicles/Civic.jpg',  name:'Honda Civic 2024', type:'Civic Taxi',         price:'8,000',  seats:4,  tag:'Comfortable',  color:'#18b87a',
    desc:'Reliable and comfortable for longer journeys. Air-conditioned, safe, and suitable for business.' },
  { img:'/vehicles/car8.jpg',    name:'Toyota Fortuner 2024',   type:'4x4 SUV',            price:'15,000', seats:5,  tag:'Off-Road',     color:'#7c3aed',
    desc:'Robust SUV for all terrains.. Perfect for travel outside Bertoua to rural areas, forest roads, and inter-city routes.' },
  { img:'/vehicles/Honda.jpg',    name:'Honda City 2024',   type:'Honda',            price:'20,000', seats:4, tag:'Group Travel', color:'#f5c518',
    desc:'Ideal for group travel, events, and corporate transfers.Compact and stylish with great fuel economy.' },
  { img:'/vehicles/car4.jpg',    name:'Suzuki Cultus 2024',      type:'Cultus',        price:'35,000', seats:4,  tag:'Freight',      color:'#e84118',
    desc:'Efficient and practical city car, suitable for commercial freight.' },
]

const FILTERS = ['All', 'Taxi', 'Clando', 'Civic Taxi', '4x4 SUV', 'Honda', 'Cultus']

export default function VehiclesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All' ? VEHICLES : VEHICLES.filter(v => v.type === filter)

  return (
    <div style={{ minHeight:'100vh', background:'#0c0f18', color:'#fff', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding:'clamp(100px,12vw,140px) clamp(24px,6vw,80px) clamp(32px,4vw,56px)', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'rgba(26,92,255,0.1)', border:'1px solid rgba(26,92,255,0.25)', borderRadius:'50px', padding:'6px 18px', marginBottom:'20px' }}>
          <span style={{ fontSize:'11px', color:'#1a5cff', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>Vehicle Models</span>
        </div>
        <h1 style={{ fontSize:'clamp(34px,7vw,64px)', fontWeight:'900', letterSpacing:'-2px', lineHeight:1.05, marginBottom:'16px' }}>
          Every Vehicle<br /><span style={{ color:'#1a5cff' }}>Bertoua Needs</span>
        </h1>
        <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.45)', lineHeight:1.75, maxWidth:'580px', margin:'0 auto 32px' }}>
          Browse our full fleet and book instantly with Mobile Money.
        </p>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter===f ? '#1a5cff' : 'rgba(255,255,255,0.05)',
              border: filter===f ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: filter===f ? '#fff' : 'rgba(255,255,255,0.55)',
              padding:'8px 18px', borderRadius:'50px',
              cursor:'pointer', fontSize:'13px', fontWeight:'700',
              transition:'all 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </section>

      {/* Vehicle Grid */}
      <section style={{ padding:'0 clamp(24px,6vw,80px) clamp(56px,8vw,100px)' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
          gap:'16px', maxWidth:'1200px', margin:'0 auto',
        }}>
          {filtered.map((v,i) => (
            <div key={i} onClick={() => setSelected(selected===i ? null : i)} style={{
              background: selected===i ? `rgba(${v.color==='#e84118'?'232,65,24':v.color==='#1a5cff'?'26,92,255':v.color==='#18b87a'?'24,184,122':v.color==='#7c3aed'?'124,58,237':'245,197,24'},0.08)` : 'rgba(255,255,255,0.03)',
              border:`1.5px solid ${selected===i ? v.color+'60' : 'rgba(255,255,255,0.08)'}`,
              borderRadius:'18px', overflow:'hidden',
              cursor:'pointer', transition:'all 0.25s',
              transform: selected===i ? 'translateY(-4px)' : 'none',
              boxShadow: selected===i ? `0 12px 40px ${v.color}20` : 'none',
            }}>
              {/* Image */}
              <div style={{ height:'200px', overflow:'hidden', background:'rgba(255,255,255,0.04)', position:'relative' }}>
                <img src={v.img} alt={v.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                  onError={e => { e.target.style.display='none' }}
                />
                <div style={{
                  position:'absolute', top:'12px', right:'12px',
                  background:v.color, color:'#fff',
                  padding:'3px 12px', borderRadius:'50px',
                  fontSize:'10px', fontWeight:'800', letterSpacing:'0.5px',
                }}>{v.tag}</div>
              </div>

              {/* Info */}
              <div style={{ padding:'20px' }}>
                <div style={{ fontSize:'12px', color:v.color, fontWeight:'700', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:'6px' }}>{v.type}</div>
                <h3 style={{ fontSize:'20px', fontWeight:'900', letterSpacing:'-0.5px', marginBottom:'8px' }}>{v.name}</h3>

                {/* Expanded description */}
                {selected===i && (
                  <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:'16px' }}>{v.desc}</p>
                )}

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'14px', marginTop:'10px' }}>
                  <div>
                    <span style={{ fontSize:'22px', fontWeight:'900', color:v.color }}>{v.price}</span>
                    <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginLeft:'4px' }}>FCFA/day</span>
                  </div>
                  <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>👤 {v.seats} seat{v.seats>1?'s':''}</span>
                </div>

                {selected===i && (
                  <button onClick={e => { e.stopPropagation(); navigate('/register') }} style={{
                    width:'100%', background:v.color, border:'none', color:'#fff',
                    padding:'13px', borderRadius:'10px', cursor:'pointer',
                    fontSize:'15px', fontWeight:'800', marginTop:'14px',
                  }}>Book This Vehicle →</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'clamp(40px,6vw,72px) clamp(24px,6vw,80px)', background:'rgba(26,92,255,0.06)', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:'900', letterSpacing:'-1px', marginBottom:'12px' }}>
          Can't find your vehicle?
        </h2>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', marginBottom:'24px' }}>
          Register and request any vehicle type — our team will match you with the right option.
        </p>
        <button onClick={() => navigate('/register')} style={{
          background:'#1a5cff', border:'none', color:'#fff',
          padding:'clamp(13px,2vw,17px) clamp(28px,4vw,52px)',
          borderRadius:'12px', cursor:'pointer',
          fontSize:'clamp(14px,2vw,16px)', fontWeight:'800', minHeight:'54px',
        }}>Register to Book →</button>
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