import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function toggleDark() {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  const links = ['/', '/events', '/team', '/volunteers', '/gallery', '/contact']
  const names = ['Home', 'Events', 'Team', 'Volunteers', 'Gallery', 'Contact']

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(26,26,46,0.97)' : '#1a1a2e',
      padding: '14px 40px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s'
    }}>
      <Link to="/" style={{
        color: '#e94560',
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '2px'
      }}>
        CSESA
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {links.map((path, i) => (
          <Link key={path} to={path} style={{
            color: location.pathname === path ? '#e94560' : 'white',
            fontSize: '15px',
            fontWeight: location.pathname === path ? 'bold' : 'normal',
            borderBottom: location.pathname === path ? '2px solid #e94560' : 'none',
            paddingBottom: '2px',
            transition: 'color 0.2s'
          }}>
            {names[i]}
          </Link>
        ))}

        {/* Dark Mode Button */}
        <button onClick={toggleDark} style={{
          background: 'transparent',
          border: '1px solid #e94560',
          color: '#e94560',
          padding: '6px 14px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <Link to="/admin" style={{
          background: '#e94560',
          color: 'white',
          padding: '8px 18px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Admin
        </Link>
      </div>
    </nav>
  )
}

export default Navbar