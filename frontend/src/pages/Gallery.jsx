const galleryItems = [
  { id: 1, title: 'Hackathon 2024', emoji: '💻', color: '#1a1a2e' },
  { id: 2, title: 'Tech Workshop', emoji: '🔧', color: '#e94560' },
  { id: 3, title: 'Alumni Meet', emoji: '🤝', color: '#0f3460' },
  { id: 4, title: 'Code Sprint', emoji: '🏆', color: '#e67e22' },
  { id: 5, title: 'Project Exhibition', emoji: '🚀', color: '#27ae60' },
  { id: 6, title: 'Cultural Night', emoji: '🎉', color: '#8e44ad' },
  { id: 7, title: 'Guest Lecture', emoji: '🎤', color: '#2980b9' },
  { id: 8, title: 'Team Outing', emoji: '🌟', color: '#e94560' }
]

function Gallery() {
  return (
    <div style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>

      <h1 style={{ textAlign: 'center', fontSize: '40px', color: '#1a1a2e', marginBottom: '10px' }}>
        Gallery
      </h1>
      <p style={{ textAlign: 'center', color: '#777', fontSize: '17px', marginBottom: '50px' }}>
        Memories from our events and activities
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {galleryItems.map((item) => (
          <div key={item.id} style={{
            background: item.color,
            borderRadius: '12px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '52px', marginBottom: '12px' }}>{item.emoji}</div>
            <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{item.title}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '40px', fontSize: '14px' }}>
        * Replace these cards with real photos from your events
      </p>
    </div>
  )
}

export default Gallery