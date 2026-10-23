import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function CountDown({ targetDate, eventName }) {
  const [time, setTime] = useState({})

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return setTime({ expired: true })
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }
    calc()
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (time.expired) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e94560, #0f3460)',
      borderRadius: '16px',
      padding: '28px',
      textAlign: 'center',
      color: 'white',
      marginBottom: '24px'
    }}>
      <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
        Next Event
      </p>
      <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>{eventName}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        {[
          { val: time.days, label: 'Days' },
          { val: time.hours, label: 'Hours' },
          { val: time.minutes, label: 'Mins' },
          { val: time.seconds, label: 'Secs' }
        ].map(t => (
          <div key={t.label} style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            padding: '12px 18px',
            minWidth: '64px'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
              {String(t.val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const notices = [
  '📢 Hackathon 2025 registrations are now open!',
  '🏆 Congratulations to Team Alpha for winning Code Sprint!',
  '📅 Web Development Workshop scheduled for April 20th',
  '🎓 Alumni Meet on June 1st — All students welcome!',
  '💡 Submit your project ideas to CSESA committee'
]

function NoticeBoard() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % notices.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      background: 'var(--card)',
      border: '2px solid #e94560',
      borderRadius: '12px',
      padding: '16px 24px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: 'var(--shadow)'
    }}>
      <span style={{
        background: '#e94560',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
      }}>
        NOTICE
      </span>
      <p style={{
        color: 'var(--text)',
        fontSize: '15px',
        transition: 'all 0.3s'
      }}>
        {notices[current]}
      </p>
    </div>
  )
}

function StatCard({ number, label, color }) {
  const [count, setCount] = useState(0)
  const target = parseInt(number)

  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 50)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [target])

  return (
    <div style={{
      background: 'var(--card)',
      borderRadius: '16px',
      padding: '32px 24px',
      textAlign: 'center',
      boxShadow: 'var(--shadow)',
      borderTop: `4px solid ${color}`,
      flex: '1',
      minWidth: '140px'
    }}>
      <h2 style={{ fontSize: '44px', color, margin: 0, fontWeight: 'bold' }}>
        {count}+
      </h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '16px' }}>
        {label}
      </p>
    </div>
  )
}

function Home() {
  return (
    <div>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '120px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(233,69,96,0.15) 0%, transparent 60%)'
        }}/>
        <p style={{ color: '#e94560', fontSize: '14px', letterSpacing: '4px', marginBottom: '16px' }}>
          WELCOME TO
        </p>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.2 }}>
          CSESA
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.8, marginBottom: '8px' }}>
          Computer Science Engineering Students Association
        </p>
        <p style={{ fontSize: '16px', opacity: 0.6, marginBottom: '40px' }}>
          Learn • Connect • Build • Grow
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/events" style={{
            background: '#e94560',
            color: 'white',
            padding: '14px 36px',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}>
            Explore Events
          </Link>
          <Link to="/volunteers" style={{
            background: 'transparent',
            color: 'white',
            padding: '14px 36px',
            borderRadius: '30px',
            fontSize: '16px',
            border: '2px solid white'
          }}>
            Join Us
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Notice Board */}
        <NoticeBoard />

        {/* Countdown */}
        <CountDown
          targetDate="2025-06-15T10:00:00"
          eventName="Annual Hackathon 2025"
        />

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <StatCard number="200" label="Members" color="#e94560" />
          <StatCard number="50" label="Events" color="#0f3460" />
          <StatCard number="30" label="Volunteers" color="#27ae60" />
          <StatCard number="5" label="Years Active" color="#e67e22" />
        </div>

        {/* About */}
        <div style={{
          background: 'var(--card)',
          borderRadius: '20px',
          padding: '50px',
          boxShadow: 'var(--shadow)',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '36px', color: 'var(--text)', marginBottom: '20px' }}>
            Who We Are
          </h2>
          <p style={{
            fontSize: '17px',
            color: 'var(--text-muted)',
            lineHeight: '1.9',
            maxWidth: '700px',
            margin: '0 auto 32px'
          }}>
            CSESA is the official student association of the Computer Science Engineering
            department. We organize technical events, workshops, hackathons and cultural
            activities to help students grow beyond the classroom.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'View Events', to: '/events', bg: '#1a1a2e' },
              { label: 'Meet the Team', to: '/team', bg: '#e94560' },
              { label: 'Become a Volunteer', to: '/volunteers', bg: '#0f3460' }
            ].map(btn => (
              <Link key={btn.label} to={btn.to} style={{
                background: btn.bg,
                color: 'white',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '15px'
              }}>
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '32px', color: 'var(--text)' }}>
          What We Offer
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {[
            { icon: '💻', title: 'Technical Events', desc: 'Hackathons, coding contests and tech talks' },
            { icon: '🎓', title: 'Workshops', desc: 'Hands-on learning sessions for real skills' },
            { icon: '🤝', title: 'Networking', desc: 'Connect with alumni and industry experts' },
            { icon: '🏆', title: 'Competitions', desc: 'Win prizes and gain recognition' },
            { icon: '📚', title: 'Study Groups', desc: 'Learn together with fellow students' },
            { icon: '🚀', title: 'Projects', desc: 'Build real projects for your portfolio' }
          ].map(item => (
            <div key={item.title} style={{
              background: 'var(--card)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ color: 'var(--text)', marginBottom: '8px', fontSize: '17px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home