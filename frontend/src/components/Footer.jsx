function Footer() {
  return (
    <footer style={{
      background: '#1a1a2e',
      color: 'white',
      textAlign: 'center',
      padding: '40px 20px',
      marginTop: '60px'
    }}>
      <h3 style={{ color: '#e94560', fontSize: '24px', marginBottom: '12px' }}>CSESA</h3>
      <p style={{ opacity: '0.7', marginBottom: '16px' }}>
        Computer Science Engineering Students Association
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
        {['Home', 'Events', 'Team', 'Volunteers', 'Gallery', 'Contact'].map((page) => (
          <a key={page} href={`/${page.toLowerCase()}`} style={{
            color: 'white', textDecoration: 'none', opacity: '0.7', fontSize: '14px'
          }}>
            {page}
          </a>
        ))}
      </div>
      <p style={{ opacity: '0.5', fontSize: '13px' }}>© 2025 CSESA. All rights reserved.</p>
    </footer>
  )
}

export default Footer