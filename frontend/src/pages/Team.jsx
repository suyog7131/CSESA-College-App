import { useState, useEffect } from 'react'

const DEMO_TEAM = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'President',
    year: 'Final Year',
    emoji: '👨‍💻',
    branch: 'CSE',
    color: '#e94560',
    bio: 'Leading CSESA with a vision to make every student industry-ready. Passionate about AI and full-stack development.',
    skills: ['React', 'Node.js', 'Python', 'Leadership'],
    email: 'rahul@csesa.edu',
    github: 'github.com/rahul',
    linkedin: 'linkedin.com/in/rahul',
    achievements: ['Best President Award 2024', 'Hackathon Winner', 'Google Intern']
  },
  {
    id: 2,
    name: 'Priya Patil',
    role: 'Vice President',
    year: 'Final Year',
    emoji: '👩‍💻',
    branch: 'CSE',
    color: '#0f3460',
    bio: 'Managing day-to-day operations and event coordination. Expert in UI/UX design and team management.',
    skills: ['Figma', 'React', 'Management', 'UI/UX'],
    email: 'priya@csesa.edu',
    github: 'github.com/priya',
    linkedin: 'linkedin.com/in/priya',
    achievements: ['Best Designer 2024', 'Microsoft Intern', 'TEDx Speaker']
  },
  {
    id: 3,
    name: 'Amit Desai',
    role: 'Technical Head',
    year: 'Third Year',
    emoji: '👨‍🔬',
    branch: 'CSE',
    color: '#27ae60',
    bio: 'Building technical infrastructure for CSESA. Loves competitive programming and open source contributions.',
    skills: ['Java', 'Spring Boot', 'DSA', 'AWS'],
    email: 'amit@csesa.edu',
    github: 'github.com/amit',
    linkedin: 'linkedin.com/in/amit',
    achievements: ['LeetCode Top 5%', 'Open Source Contributor', 'AWS Certified']
  },
  {
    id: 4,
    name: 'Sneha Kulkarni',
    role: 'Event Manager',
    year: 'Third Year',
    emoji: '👩‍🎨',
    branch: 'IT',
    color: '#e67e22',
    bio: 'Organizing events that bring students together. Creative mind behind all CSESA events and workshops.',
    skills: ['Event Planning', 'Marketing', 'Design', 'Communication'],
    email: 'sneha@csesa.edu',
    github: 'github.com/sneha',
    linkedin: 'linkedin.com/in/sneha',
    achievements: ['Best Event 2024', 'Marketing Lead', '500+ Event Attendees']
  },
  {
    id: 5,
    name: 'Rohan Jadhav',
    role: 'Web Developer',
    year: 'Second Year',
    emoji: '👨‍💼',
    branch: 'CSE',
    color: '#8e44ad',
    bio: 'Building and maintaining the CSESA website. Passionate about creating beautiful user experiences.',
    skills: ['React', 'JavaScript', 'CSS', 'MongoDB'],
    email: 'rohan@csesa.edu',
    github: 'github.com/rohan',
    linkedin: 'linkedin.com/in/rohan',
    achievements: ['Best Web Project', 'Hackathon Runner Up', 'CSS Battle Winner']
  },
  {
    id: 6,
    name: 'Neha Joshi',
    role: 'Design Head',
    year: 'Second Year',
    emoji: '👩‍🎓',
    branch: 'IT',
    color: '#2980b9',
    bio: 'Creating visual identity for CSESA. Every poster, banner and social media post goes through her creative hands.',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Canva'],
    email: 'neha@csesa.edu',
    github: 'github.com/neha',
    linkedin: 'linkedin.com/in/neha',
    achievements: ['Best Design Award', 'Adobe Certified', '1K+ Instagram Followers']
  },
  {
    id: 7,
    name: 'Vikram More',
    role: 'PR Manager',
    year: 'Third Year',
    emoji: '🧑‍💼',
    branch: 'CSE',
    color: '#16a085',
    bio: 'Managing public relations and social media presence of CSESA. Building bridges between students and industry.',
    skills: ['Communication', 'Social Media', 'Content Writing', 'Networking'],
    email: 'vikram@csesa.edu',
    github: 'github.com/vikram',
    linkedin: 'linkedin.com/in/vikram',
    achievements: ['Best PR Campaign', '2K Social Media Growth', 'Industry Connect Award']
  },
  {
    id: 8,
    name: 'Ananya Singh',
    role: 'Secretary',
    year: 'Second Year',
    emoji: '👩‍💼',
    branch: 'CSE',
    color: '#c0392b',
    bio: 'Keeping everything organized and on track. Managing records, meetings and official communications for CSESA.',
    skills: ['Organization', 'Documentation', 'Excel', 'Communication'],
    email: 'ananya@csesa.edu',
    github: 'github.com/ananya',
    linkedin: 'linkedin.com/in/ananya',
    achievements: ['Best Secretary Award', 'Zero Missed Deadlines', 'Process Excellence']
  }
]

function MemberModal({ member, onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 3000, padding: '16px'
    }}>
      <div style={{
        background: 'var(--card)', borderRadius: '20px', width: '100%',
        maxWidth: '560px', maxHeight: '90vh', overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
      }}>
        {/* Header */}
        <div style={{
          background: member.color, color: 'white',
          padding: '32px 28px', borderRadius: '20px 20px 0 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', flexShrink: 0
            }}>
              {member.emoji}
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>
                {member.name}
              </h2>
              <p style={{ opacity: 0.85, fontSize: '14px', marginBottom: '4px' }}>
                {member.role}
              </p>
              <p style={{ opacity: 0.7, fontSize: '13px' }}>
                {member.branch} · {member.year}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '16px', fontWeight: 'bold', flexShrink: 0
          }}>✕</button>
        </div>

        <div style={{ padding: '28px' }}>

          {/* Bio */}
          <div style={{
            background: 'var(--bg)', borderRadius: '12px',
            padding: '16px', marginBottom: '24px'
          }}>
            <p style={{ color: 'var(--text)', lineHeight: '1.7', fontSize: '15px' }}>
              {member.bio}
            </p>
          </div>

          {/* Skills */}
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px', fontWeight: 'bold' }}>
            🛠️ Skills
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {member.skills.map(skill => (
              <span key={skill} style={{
                background: member.color, color: 'white',
                padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Achievements */}
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px', fontWeight: 'bold' }}>
            🏆 Achievements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {member.achievements.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'var(--bg)', borderRadius: '8px', padding: '10px 14px'
              }}>
                <span style={{ color: member.color, fontSize: '16px' }}>⭐</span>
                <span style={{ color: 'var(--text)', fontSize: '14px' }}>{a}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px', fontWeight: 'bold' }}>
            📬 Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '📧', label: member.email },
              { icon: '💻', label: member.github },
              { icon: '🔗', label: member.linkedin }
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'var(--bg)', borderRadius: '8px', padding: '10px 14px'
              }}>
                <span style={{ fontSize: '16px' }}>{c.icon}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Team() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [backendTeam, setBackendTeam] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/team')
      .then(res => res.json())
      .then(data => setBackendTeam(data))
      .catch(err => console.log(err))
  }, [])

  const roles = ['All', 'President', 'Vice President', 'Technical Head', 'Event Manager', 'Web Developer', 'Design Head', 'PR Manager', 'Secretary']

  const filtered = DEMO_TEAM.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.role.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || m.role === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', background: 'var(--bg)', minHeight: '100vh' }}>

      <h1 style={{ textAlign: 'center', fontSize: '42px', color: 'var(--text)', marginBottom: '10px' }}>
        Meet Our Team
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '17px', marginBottom: '44px' }}>
        The passionate people behind CSESA — Click any member to know more!
      </p>

      {/* Stats Bar */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '40px',
        marginBottom: '40px', flexWrap: 'wrap'
      }}>
        {[
          { label: 'Total Members', value: DEMO_TEAM.length, color: '#e94560' },
          { label: 'Final Year', value: DEMO_TEAM.filter(m => m.year === 'Final Year').length, color: '#0f3460' },
          { label: 'Third Year', value: DEMO_TEAM.filter(m => m.year === 'Third Year').length, color: '#27ae60' },
          { label: 'Second Year', value: DEMO_TEAM.filter(m => m.year === 'Second Year').length, color: '#e67e22' }
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--card)', borderRadius: '12px',
            padding: '16px 28px', textAlign: 'center',
            boxShadow: 'var(--shadow)', borderTop: `4px solid ${stat.color}`
          }}>
            <h3 style={{ fontSize: '28px', color: stat.color, margin: 0 }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search team members..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '14px 20px', borderRadius: '12px',
            border: '2px solid #ddd', fontSize: '16px',
            background: 'var(--card)', color: 'var(--text)',
            boxSizing: 'border-box', outline: 'none'
          }}
        />
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {['All', 'Final Year', 'Third Year', 'Second Year'].map(f => (
          <button key={f} onClick={() => setFilter(f === filter ? 'All' : f)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '14px',
            background: filter === f ? '#e94560' : 'var(--card)',
            color: filter === f ? 'white' : 'var(--text)',
            boxShadow: 'var(--shadow)', transition: 'all 0.2s'
          }}>{f}</button>
        ))}
      </div>

      {/* Team Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '28px'
      }}>
        {filtered.map(member => (
          <div key={member.id}
            onClick={() => setSelectedMember(member)}
            style={{
              background: 'var(--card)', borderRadius: '18px',
              padding: '32px 24px', textAlign: 'center',
              boxShadow: 'var(--shadow)', cursor: 'pointer',
              borderTop: `4px solid ${member.color}`,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow)'
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: member.color + '20',
              border: `3px solid ${member.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', margin: '0 auto 16px'
            }}>
              {member.emoji}
            </div>

            <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px', fontWeight: 'bold' }}>
              {member.name}
            </h3>

            <span style={{
              background: member.color, color: 'white',
              padding: '4px 14px', borderRadius: '20px',
              fontSize: '12px', fontWeight: 'bold',
              display: 'inline-block', marginBottom: '10px'
            }}>
              {member.role}
            </span>

            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
              {member.branch} · {member.year}
            </p>

            {/* Skills preview */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
              {member.skills.slice(0, 3).map(skill => (
                <span key={skill} style={{
                  background: 'var(--bg)', color: 'var(--text-muted)',
                  padding: '3px 10px', borderRadius: '10px', fontSize: '11px'
                }}>
                  {skill}
                </span>
              ))}
            </div>

            <button style={{
              background: member.color, color: 'white', border: 'none',
              padding: '10px', borderRadius: '10px', fontSize: '13px',
              fontWeight: 'bold', cursor: 'pointer', width: '100%'
            }}>
              View Profile →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  )
}

export default Team