import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import API from '../services/api'

const VEHICLES_FALLBACK = [
  { img:'/vehicles/car5.jpg',  name:'Suzuki Swift 2024',    type:'Taxi',      price:'2,500',  seats:2, tag:'Most Popular', color:'#e84118',
    desc:'Modern hatchback with sporty features.' },
  { img:'/vehicles/car7.jpg',  name:'Suzuki Mehran 2024',   type:'Clando',    price:'3,500',  seats:3, tag:'City Travel',  color:'#1a5cff',
    desc:'Simple and economical car, comfortably carries passengers with luggage.' },
  { img:'/vehicles/Civic.jpg', name:'Honda Civic 2024',     type:'Civic Taxi',price:'8,000',  seats:4, tag:'Comfortable',  color:'#18b87a',
    desc:'Reliable and comfortable for longer journeys. Air-conditioned, safe, and suitable for business.' },
  { img:'/vehicles/car8.jpg',  name:'Toyota Fortuner 2024', type:'4x4 SUV',   price:'15,000', seats:5, tag:'Off-Road',     color:'#7c3aed',
    desc:'Robust SUV for all terrains. Perfect for travel outside Bertoua to rural areas and forest roads.' },
  { img:'/vehicles/Honda.jpg', name:'Honda City 2024',      type:'Honda',     price:'20,000', seats:4, tag:'Group Travel', color:'#f5c518',
    desc:'Ideal for group travel, events, and corporate transfers. Compact and stylish with great fuel economy.' },
  { img:'/vehicles/car4.jpg',  name:'Suzuki Cultus 2024',   type:'Cultus',    price:'35,000', seats:4, tag:'Freight',      color:'#e84118',
    desc:'Efficient and practical city car, suitable for commercial freight.' },
]

const FILTERS = ['All', 'Taxi', 'Clando', 'Civic Taxi', '4x4 SUV', 'Honda', 'Cultus']

const TAG_COLORS = {
  'Most Popular': '#e84118',
  'City Travel':  '#1a5cff',
  'Comfortable':  '#18b87a',
  'Off-Road':     '#7c3aed',
  'Group Travel': '#f5c518',
  'Freight':      '#e84118',
  'Available':    '#18b87a',
  'Unavailable':  '#8b877e',
}

const IMG_MAP = {
  'Taxi':      '/vehicles/car5.jpg',
  'Clando':    '/vehicles/car7.jpg',
  'Civic Taxi':'/vehicles/Civic.jpg',
  '4x4 SUV':   '/vehicles/car8.jpg',
  'Honda':     '/vehicles/Honda.jpg',
  'Cultus':    '/vehicles/car4.jpg',
}

export default function VehiclesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    API.get('/vehicles')
      .then(res => {
        if (res.data && res.data.length > 0) {
          // Map API data to display format
          const mapped = res.data.map(v => ({
            id: v.id,
            img: v.imageUrl || IMG_MAP[v.category] || '/vehicles/car5.jpg',
            name: v.vehicleName,
            type: v.category,
            price: v.pricePerDay.toLocaleString(),
            seats: v.numSeats,
            tag: v.available ? 'Available' : 'Unavailable',
            color: TAG_COLORS[v.available ? 'Available' : 'Unavailable'] || '#e84118',
            desc: v.description,
            location: v.location,
            year: v.year,
            fuel: v.fuelType,
          }))
          setVehicles(mapped)
        } else {
          setVehicles(VEHICLES_FALLBACK)
        }
        setLoading(false)
      })
      .catch(() => {
        setVehicles(VEHICLES_FALLBACK)
        setError(true)
        setLoading(false)
      })
  }, [])

  const filtered = filter === 'All'
    ? vehicles
    : vehicles.filter(v => v.type === filter)

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
          {error && <span style={{ color:'#f5c518', fontSize:'12px', display:'block', marginTop:'8px' }}>⚠️ Showing demo data — API connection issue</span>}
        </p>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setFilter(f); setSelected(null) }} style={{
              background: filter===f ? '#1a5cff' : 'rgba(255,255,255,0.05)',
              border: filter===f ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: filter===f ? '#fff' : 'rgba(255,255,255,0.55)',
              padding:'8px 18px', borderRadius:'50px',
              cursor:'pointer', fontSize:'13px', fontWeight:'700',
              transition:'all 0.2s', minHeight:'40px',
            }}>{f}</button>
          ))}
        </div>
      </section>

      {/* Vehicle Grid */}
      <section style={{ padding:'0 clamp(24px,6vw,80px) clamp(56px,8vw,100px)' }}>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign:'center', padding:'60px', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🚗</div>
            <p style={{ fontSize:'16px' }}>Loading vehicles from Bertoua...</p>
          </div>
        )}

        {/* Vehicle count */}
        {!loading && (
          <div style={{ maxWidth:'1200px', margin:'0 auto 20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'13px' }}>
              Showing <strong style={{ color:'#1a5cff' }}>{filtered.length}</strong> vehicle{filtered.length !== 1 ? 's' : ''}
              {filter !== 'All' && ` in ${filter}`}
            </p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'12px' }}>
              Click a vehicle to see details
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
            gap:'16px', maxWidth:'1200px', margin:'0 auto',
          }}>
            {filtered.map((v,i) => {
              const tagColor = TAG_COLORS[v.tag] || '#e84118'
              const isSelected = selected === i

              return (
                <div key={v.id || i}
                  onClick={() => setSelected(isSelected ? null : i)}
                  style={{
                    background: isSelected ? `rgba(26,92,255,0.08)` : 'rgba(255,255,255,0.03)',
                    border:`1.5px solid ${isSelected ? '#1a5cff60' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius:'18px', overflow:'hidden',
                    cursor:'pointer', transition:'all 0.25s',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    boxShadow: isSelected ? '0 12px 40px rgba(26,92,255,0.15)' : 'none',
                  }}>

                  {/* Vehicle image */}
                  <div style={{ height:'200px', overflow:'hidden', background:'rgba(255,255,255,0.04)', position:'relative' }}>
                    <img
                      src={v.img} alt={v.name}
                      style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.parentNode.style.display = 'flex'
                        e.target.parentNode.style.alignItems = 'center'
                        e.target.parentNode.style.justifyContent = 'center'
                        e.target.parentNode.innerHTML = '<span style="font-size:64px">🚗</span>'
                      }}
                    />
                    {/* Tag badge */}
                    <div style={{
                      position:'absolute', top:'12px', right:'12px',
                      background: tagColor, color:'#fff',
                      padding:'3px 12px', borderRadius:'50px',
                      fontSize:'10px', fontWeight:'800', letterSpacing:'0.5px',
                    }}>{v.tag}</div>
                    {/* Category badge */}
                    <div style={{
                      position:'absolute', top:'12px', left:'12px',
                      background:'rgba(12,15,24,0.8)',
                      border:'1px solid rgba(255,255,255,0.15)',
                      color:'rgba(255,255,255,0.8)',
                      padding:'3px 10px', borderRadius:'50px',
                      fontSize:'10px', fontWeight:'700',
                    }}>{v.type}</div>
                  </div>

                  {/* Info */}
                  <div style={{ padding:'20px' }}>
                    <h3 style={{ fontSize:'18px', fontWeight:'900', letterSpacing:'-0.5px', marginBottom:'6px' }}>{v.name}</h3>
                    <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'12px' }}>
                      📍 {v.location || 'Bertoua'} · 📅 {v.year || '2024'}
                    </p>

                    {/* Expanded details */}
                    {isSelected && (
                      <>
                        <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:'14px' }}>
                          {v.desc}
                        </p>
                        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'14px' }}>
                          {[
                            { icon:'⛽', text: v.fuel || 'Petrol' },
                            { icon:'👤', text: `${v.seats} seats` },
                            { icon:'✅', text: v.tag },
                          ].map((d,j) => (
                            <span key={j} style={{
                              background:'rgba(255,255,255,0.05)',
                              border:'1px solid rgba(255,255,255,0.1)',
                              padding:'4px 12px', borderRadius:'50px',
                              fontSize:'11px', color:'rgba(255,255,255,0.6)',
                            }}>{d.icon} {d.text}</span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Price + seats row */}
                    <div style={{
                      display:'flex', justifyContent:'space-between',
                      alignItems:'center',
                      borderTop:'1px solid rgba(255,255,255,0.06)',
                      paddingTop:'14px', marginTop: isSelected ? '0' : '10px',
                    }}>
                      <div>
                        <span style={{ fontSize:'22px', fontWeight:'900', color:'#1a5cff' }}>{v.price}</span>
                        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginLeft:'4px' }}>FCFA/day</span>
                      </div>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>
                        👤 {v.seats} seat{v.seats > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Book button — only when selected */}
                    {isSelected && (
                      <button
                        onClick={e => { e.stopPropagation(); navigate('/register') }}
                        style={{
                          width:'100%', background:'#e84118', border:'none', color:'#fff',
                          padding:'13px', borderRadius:'10px', cursor:'pointer',
                          fontSize:'15px', fontWeight:'800', marginTop:'14px',
                          minHeight:'48px',
                        }}>
                        Book This Vehicle →
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔍</div>
            <p style={{ fontSize:'16px' }}>No vehicles found in this category.</p>
            <button onClick={() => setFilter('All')} style={{
              background:'#1a5cff', border:'none', color:'#fff',
              padding:'12px 24px', borderRadius:'8px', cursor:'pointer',
              fontSize:'14px', fontWeight:'700', marginTop:'16px',
            }}>Show All Vehicles</button>
          </div>
        )}
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

      {/* Footer */}
      <footer style={{
        background:'#070a12', borderTop:'1px solid rgba(255,255,255,0.05)',
        padding:'24px clamp(24px,6vw,80px)',
        display:'flex', justifyContent:'space-between',
        alignItems:'center', flexWrap:'wrap', gap:'12px',
        fontFamily:"'DM Sans',system-ui,sans-serif",
      }}>
        <span style={{ fontSize:'16px', fontWeight:'900', color:'#fff' }}>
          Go<span style={{ color:'#e84118' }}>Drive</span>
        </span>
        <div style={{ display:'flex', gap:'16px' }}>
          {['/about','/vehicles','/team','/contact'].map(p => (
            <span key={p} onClick={() => navigate(p)} style={{
              color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:'13px',
            }}>{p.slice(1).charAt(0).toUpperCase()+p.slice(2)}</span>
          ))}
        </div>
        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)' }}>
          © 2026 GoDrive · Bertoua, Cameroon
        </span>
      </footer>
    </div>
  )
}