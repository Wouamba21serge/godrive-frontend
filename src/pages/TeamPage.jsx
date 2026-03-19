import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function TeamPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight:'100vh', background:'#0c0f18', color:'#fff', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding:'clamp(100px,12vw,140px) clamp(24px,6vw,80px) clamp(32px,4vw,56px)', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'rgba(24,184,122,0.1)', border:'1px solid rgba(24,184,122,0.25)', borderRadius:'50px', padding:'6px 18px', marginBottom:'20px' }}>
          <span style={{ fontSize:'11px', color:'#18b87a', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>The Team</span>
        </div>
        <h1 style={{ fontSize:'clamp(34px,7vw,64px)', fontWeight:'900', letterSpacing:'-2px', lineHeight:1.05, marginBottom:'16px' }}>
          The People Behind <span style={{ color:'#18b87a' }}>GoDrive</span>
        </h1>
        <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'rgba(255,255,255,0.45)', lineHeight:1.75, maxWidth:'560px', margin:'0 auto' }}>
          GoDrive was designed and built during an HND Software Engineering internship at QuamTech, Yaoundé.
        </p>
      </section>

      {/* Team cards */}
      <section style={{ padding:'0 clamp(24px,6vw,80px) clamp(56px,8vw,100px)' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
          gap:'20px', maxWidth:'900px', margin:'0 auto',
        }}>

          {/* Developer — YOU */}
          <div style={{
            background:'rgba(255,255,255,0.03)',
            border:'1.5px solid rgba(232,65,24,0.2)',
            borderRadius:'24px', padding:'clamp(28px,4vw,44px)',
            textAlign:'center',
          }}>
            <div style={{
              width:'clamp(100px,15vw,130px)',
              height:'clamp(100px,15vw,130px)',
              borderRadius:'50%',
              margin:'0 auto 20px',
              border:'3px solid rgba(232,65,24,0.4)',
              overflow:'hidden',
              background:'linear-gradient(135deg,#e84118,#1a5cff)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'52px',
            }}>
              {
                <img src="/team/serge.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              }
            </div>

            <div style={{
              display:'inline-block',
              background:'rgba(232,65,24,0.1)',
              border:'1px solid rgba(232,65,24,0.25)',
              color:'#e84118', padding:'3px 14px',
              borderRadius:'50px', fontSize:'10px', fontWeight:'700',
              letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'14px',
            }}>Lead Developer</div>

            <h2 style={{ fontSize:'clamp(20px,3vw,26px)', fontWeight:'900', letterSpacing:'-0.5px', marginBottom:'6px' }}>
              Dibot Wouamba<br />Serge Cabrel
            </h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'20px', lineHeight:1.6 }}>
              HND Software Engineering Student<br />
              ZTF University Institute (ZTF-UI)<br />
              Internship at QuamTech, Yaoundé
            </p>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:'24px' }}>
              Full-stack developer of GoDrive. Responsible for system architecture,
              React frontend, Spring Boot backend API, MySQL database design,
              and all deployment infrastructure.
            </p>
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap' }}>
              {['React', 'Spring Boot', 'MySQL', 'JWT'].map(t => (
                <span key={t} style={{
                  background:'rgba(232,65,24,0.08)',
                  border:'1px solid rgba(232,65,24,0.2)',
                  color:'#e84118', padding:'4px 12px',
                  borderRadius:'50px', fontSize:'11px', fontWeight:'700',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Supervisor */}
          <div style={{
            background:'rgba(255,255,255,0.03)',
            border:'1.5px solid rgba(26,92,255,0.2)',
            borderRadius:'24px', padding:'clamp(28px,4vw,44px)',
            textAlign:'center',
          }}>
            <div style={{
              width:'clamp(100px,15vw,130px)',
              height:'clamp(100px,15vw,130px)',
              borderRadius:'50%',
              margin:'0 auto 20px',
              border:'3px solid rgba(26,92,255,0.4)',
              overflow:'hidden',
              background:'linear-gradient(135deg,#1a5cff,#7c3aed)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'52px',
            }}>
              {
                <img src="/team/supervisor.png" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              }
            
            </div>

            <div style={{
              display:'inline-block',
              background:'rgba(26,92,255,0.1)',
              border:'1px solid rgba(26,92,255,0.25)',
              color:'#1a5cff', padding:'3px 14px',
              borderRadius:'50px', fontSize:'10px', fontWeight:'700',
              letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'14px',
            }}>Supervisor</div>

            <h2 style={{ fontSize:'clamp(20px,3vw,26px)', fontWeight:'900', letterSpacing:'-0.5px', marginBottom:'6px' }}>
              M. MFONDOUM WILLIAM
            </h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'20px', lineHeight:1.6 }}>
              Supervisor<br />
              ZTF University Institute (ZTF-UI)<br />
              HND Software Engineering Programme
            </p>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:'24px' }}>
              Academic supervisor for the GoDrive project. Provided mentorship on
              software architecture decisions, project methodology, academic requirements,
              and technical guidance throughout the development process.
            </p>
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap' }}>
              {['Project Management', 'Architecture', 'Methodology'].map(t => (
                <span key={t} style={{
                  background:'rgba(26,92,255,0.08)',
                  border:'1px solid rgba(26,92,255,0.2)',
                  color:'#1a5cff', padding:'4px 12px',
                  borderRadius:'50px', fontSize:'11px', fontWeight:'700',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* Institution */}
      <section style={{
        padding:'clamp(40px,6vw,72px) clamp(24px,6vw,80px)',
        background:'rgba(255,255,255,0.02)',
      }}>
        <div style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'14px' }}>
          {[
            { icon:'🎓', title:'ZTF University Institute', sub:'ZTF-UI · Yaoundé, Cameroon', desc:'Academic institution where Serge Cabrel studies HND Software Engineering.', color:'#18b87a' },
            { icon:'💼', title:'QuamTech', sub:'Internship Host · Yaoundé', desc:'Technology company where GoDrive was designed and developed during the internship period.', color:'#1a5cff' },
            { icon:'📍', title:'GoDrive for Bertoua', sub:'East Region · Cameroon', desc:'The target community — Bertoua residents who benefit from digital transport booking for the first time.', color:'#e84118' },
          ].map((c,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.03)',
              border:`1.5px solid ${c.color}25`,
              borderRadius:'16px', padding:'clamp(20px,3vw,28px)',
            }}>
              <div style={{ fontSize:'32px', marginBottom:'12px' }}>{c.icon}</div>
              <h3 style={{ fontSize:'16px', fontWeight:'800', color:c.color, marginBottom:'4px' }}>{c.title}</h3>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', marginBottom:'10px' }}>{c.sub}</p>
              <p style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.45)', lineHeight:1.65, margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
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