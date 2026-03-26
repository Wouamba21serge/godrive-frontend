import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableVehicles, searchVehicles, getVehiclesByCategory } from '../services/api';
import Footer from '../components/Footer';

function getImage(vehicle) {
  if (!vehicle.imageUrl) return '/vehicles/car4.jpg';
  if (vehicle.imageUrl.startsWith('http')) return vehicle.imageUrl;
  return vehicle.imageUrl;
}

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  const categories = [
    'ALL','Taxi','Clando','Civic Taxi','4x4 SUV',
    'Cultus','Honda','SUV','Truck','Moto',
    'Tricycle','Minibus','Bus','Trailer','VIP',
    'Ambulance','Pickup'
  ];

  useEffect(() => { fetchVehicles(); }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAvailableVehicles();
      setVehicles(response.data);
    } catch (err) {
      setError('Failed to load vehicles. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) { fetchVehicles(); return; }
    try {
      setLoading(true);
      const response = await searchVehicles(search);
      setVehicles(response.data);
    } catch { setError('Search failed'); }
    finally { setLoading(false); }
  };

  const handleCategory = async (cat) => {
    setCategory(cat);
    try {
      setLoading(true);
      if (cat === 'ALL') {
        const r = await getAvailableVehicles();
        setVehicles(r.data);
      } else {
        const r = await getVehiclesByCategory(cat);
        setVehicles(r.data);
      }
    } catch { setError('Filter failed'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#0c0f18',
        padding: '40px clamp(16px,4vw,60px)',
        fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#e84118', fontSize: '11px', fontWeight: '700',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
            BERTOUA · EAST REGION
          </p>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: '900',
            letterSpacing: '-1.5px', color: '#fff', marginBottom: '12px', lineHeight: 1 }}>
            Available <span style={{ color: '#e84118' }}>Vehicles</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
            Browse and book your ride in Bertoua instantly
          </p>
        </div>

        {/* ── SEARCH ── */}
        <form onSubmit={handleSearch} style={{
          display: 'flex', gap: '10px',
          maxWidth: '520px', margin: '0 auto 28px' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, brand or category..."
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '12px 16px',
              color: '#fff', fontSize: '14px', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button type="submit" style={{
            background: '#e84118', border: 'none', color: '#fff',
            padding: '12px 24px', borderRadius: '10px',
            fontWeight: '700', fontSize: '14px', cursor: 'pointer',
          }}>Search</button>
        </form>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px',
          justifyContent: 'center', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => handleCategory(cat)} style={{
              padding: '7px 16px', borderRadius: '50px', fontSize: '12px',
              fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'inherit',
              background: category === cat ? '#e84118' : 'rgba(255,255,255,0.04)',
              color: category === cat ? '#fff' : 'rgba(255,255,255,0.5)',
              border: `1.5px solid ${category === cat ? '#e84118' : 'rgba(255,255,255,0.08)'}`,
            }}>{cat}</button>
          ))}
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{
            background: 'rgba(232,65,24,0.08)',
            border: '1px solid rgba(232,65,24,0.3)',
            color: '#e84118', borderRadius: '10px',
            padding: '14px 20px', textAlign: 'center',
            marginBottom: '24px', fontSize: '14px',
          }}>{error}</div>
        )}

        {/* ── LOADING ── */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center',
            alignItems: 'center', height: '200px', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '44px', height: '44px',
              border: '4px solid rgba(232,65,24,0.15)',
              borderTop: '4px solid #e84118',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
              Loading vehicles...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>

        ) : vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚗</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px',
              marginBottom: '20px' }}>No vehicles found</p>
            <button onClick={() => { setSearch(''); setCategory('ALL'); fetchVehicles(); }}
              style={{
                background: '#e84118', border: 'none', color: '#fff',
                padding: '12px 28px', borderRadius: '10px',
                fontWeight: '700', cursor: 'pointer', fontSize: '14px',
              }}>Show All Vehicles</button>
          </div>

        ) : (
          <>
            {/* Count */}
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px',
              textAlign: 'center', marginBottom: '28px' }}>
              {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} available in Bertoua
            </p>

            {/* ── GRID ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '20px', maxWidth: '1300px', margin: '0 auto',
            }}>
              {vehicles.map(vehicle => (
                <div key={vehicle.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1.5px solid rgba(255,255,255,0.07)',
                    borderRadius: '18px', overflow: 'hidden',
                    transition: 'all 0.25s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1.5px solid rgba(232,65,24,0.5)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(232,65,24,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* ── IMAGE ── */}
                  <div style={{ position: 'relative', height: '195px',
                    background: '#141820', overflow: 'hidden' }}>
                    <img
                      src={getImage(vehicle)}
                      alt={vehicle.name}
                      style={{ width: '100%', height: '100%',
                        objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                      onError={e => { e.target.onerror = null; e.target.src = '/vehicles/car4.jpg'; }}
                    />
                    {/* Category badge */}
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      background: '#e84118', color: '#fff',
                      fontSize: '10px', fontWeight: '700',
                      padding: '4px 10px', borderRadius: '50px',
                    }}>{vehicle.category}</span>
                    {/* Available badge */}
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'rgba(24,184,122,0.92)', color: '#fff',
                      fontSize: '10px', fontWeight: '700',
                      padding: '4px 10px', borderRadius: '50px',
                    }}>✓ Available</span>
                  </div>

                  {/* ── INFO ── */}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ color: '#fff', fontWeight: '800',
                      fontSize: '15px', marginBottom: '4px',
                      letterSpacing: '-0.3px' }}>
                      {vehicle.name || vehicle.category}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)',
                      fontSize: '12px', marginBottom: '8px' }}>
                      {vehicle.brand && `${vehicle.brand} · `}{vehicle.year || '2024'}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.3)',
                      fontSize: '12px', marginBottom: '12px' }}>
                      📍 {vehicle.location || 'Bertoua'}
                    </p>

                    {/* Details */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap',
                      fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                      marginBottom: '14px' }}>
                      {vehicle.fuelType && (
                        <span style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '3px 8px', borderRadius: '6px',
                        }}>⛽ {vehicle.fuelType}</span>
                      )}
                      {vehicle.numberOfSeats && (
                        <span style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '3px 8px', borderRadius: '6px',
                        }}>💺 {vehicle.numberOfSeats} seats</span>
                      )}
                    </div>

                    {/* Price + Button */}
                    <div style={{ display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ color: '#e84118', fontWeight: '900',
                          fontSize: '19px', letterSpacing: '-0.5px' }}>
                          {vehicle.pricePerDay?.toLocaleString()}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.25)',
                          fontSize: '11px' }}> FCFA/day</span>
                      </div>
                      <button
                        onClick={() => navigate(`/book/${vehicle.id}`)}
                        style={{
                          background: '#e84118', border: 'none', color: '#fff',
                          padding: '9px 18px', borderRadius: '8px',
                          fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                          transition: 'background 0.2s', fontFamily: 'inherit',
                        }}
                        onMouseEnter={e => e.target.style.background = '#c73610'}
                        onMouseLeave={e => e.target.style.background = '#e84118'}
                      >Book Now →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}