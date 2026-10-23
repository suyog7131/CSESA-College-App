import { useState, useEffect } from 'react'

const ADMIN_EMAIL = 'admin@csesa.com'
const ADMIN_PASSWORD = 'csesa2025'

const TABS = [
  { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
  { id: 'events', label: '📅 Events', icon: '📅' },
  { id: 'team', label: '👥 Team', icon: '👥' },
  { id: 'volunteers', label: '🙋 Volunteers', icon: '🙋' },
]

// ── Login Page ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin() {
    setLoading(true)
    setTimeout(() => {
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        onLogin()
      } else {
        setError('Wrong email or password. Try again!')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)'
    }}>
      <div style={{
        background: 'var(--card)', borderRadius: '20px', padding: '50px 44px',
        width: '100%', maxWidth: '420px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #1a1a2e, #e94560)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', margin: '0 auto 12px'
          }}>🔐</div>
          <h2 style={{ fontSize: '26px', color: 'var(--text)', marginBottom: '4px' }}>
            Admin Login
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            CSESA Management Panel
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fde8ec', color: '#e94560', padding: '12px 16px',
            borderRadius: '8px', marginBottom: '20px', textAlign: 'center',
            fontSize: '14px', fontWeight: 'bold'
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text)', fontSize: '14px' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@csesa.com"
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); setError('') }}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '8px',
              border: '2px solid #ddd', fontSize: '15px',
              background: 'var(--bg)', color: 'var(--text)',
              boxSizing: 'border-box', outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text)', fontSize: '14px' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={e => { setForm({ ...form, password: e.target.value }); setError('') }}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '8px',
              border: '2px solid #ddd', fontSize: '15px',
              background: 'var(--bg)', color: 'var(--text)',
              boxSizing: 'border-box', outline: 'none'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', background: loading ? '#999' : '#1a1a2e',
            color: 'white', padding: '14px', border: 'none',
            borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
          }}
        >
          {loading ? 'Logging in...' : 'Login to Dashboard →'}
        </button>

        <div style={{
          marginTop: '24px', padding: '12px', background: 'var(--bg)',
          borderRadius: '8px', textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
            Demo credentials:
          </p>
          <p style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 'bold' }}>
            admin@csesa.com / csesa2025
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ events, team, volunteers }) {
  const stats = [
    { label: 'Total Events', value: events.length, color: '#e94560', icon: '📅' },
    { label: 'Team Members', value: team.length, color: '#0f3460', icon: '👥' },
    { label: 'Volunteers', value: volunteers.length, color: '#27ae60', icon: '🙋' },
    { label: 'Registrations', value: volunteers.length + events.length, color: '#e67e22', icon: '📝' }
  ]

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '24px' }}>
        Welcome back, Admin! 👋
      </h2>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px', marginBottom: '40px'
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'var(--card)', borderRadius: '14px', padding: '24px',
            boxShadow: 'var(--shadow)', borderTop: `4px solid ${s.color}`,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
            <h3 style={{ fontSize: '36px', color: s.color, margin: '0' }}>{s.value}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '14px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>
        📅 Recent Events
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {events.slice(0, 3).map((e, i) => (
          <div key={i} style={{
            background: 'var(--card)', borderRadius: '10px', padding: '14px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            <div>
              <p style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '2px' }}>{e.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{e.category} · {e.date}</p>
            </div>
            <span style={{
              background: '#e94560', color: 'white', padding: '4px 12px',
              borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
            }}>{e.category}</span>
          </div>
        ))}
        {events.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No events yet. Add one!</p>
        )}
      </div>

      {/* Recent Volunteers */}
      <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>
        🙋 Recent Volunteers
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {volunteers.slice(0, 3).map((v, i) => (
          <div key={i} style={{
            background: 'var(--card)', borderRadius: '10px', padding: '14px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#27ae60', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '16px'
              }}>{v.name?.charAt(0)}</div>
              <div>
                <p style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '2px' }}>{v.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{v.interest}</p>
              </div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{v.year}</span>
          </div>
        ))}
        {volunteers.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No volunteers yet.</p>
        )}
      </div>
    </div>
  )
}

// ── Events Manager ────────────────────────────────────────────────────────────
function EventsManager({ events, setEvents }) {
  const [form, setForm] = useState({
    title: '', date: '', description: '', category: 'Technical', venue: '', coordinator: '', prize: ''
  })
  const [msg, setMsg] = useState('')
  const [showForm, setShowForm] = useState(false)

  function addEvent() {
    if (!form.title || !form.date || !form.description) {
      alert('Please fill Title, Date and Description!')
      return
    }
    fetch('http://localhost:8080/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setEvents([...events, data])
        setForm({ title: '', date: '', description: '', category: 'Technical', venue: '', coordinator: '', prize: '' })
        setMsg('Event added successfully!')
        setShowForm(false)
        setTimeout(() => setMsg(''), 3000)
      })
      .catch(() => alert('Backend error. Is it running?'))
  }

  function deleteEvent(id) {
    if (!window.confirm('Delete this event?')) return
    fetch(`http://localhost:8080/api/events/${id}`, { method: 'DELETE' })
      .then(() => setEvents(events.filter(e => e.id !== id)))
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '8px',
    border: '2px solid #ddd', fontSize: '14px',
    background: 'var(--bg)', color: 'var(--text)',
    boxSizing: 'border-box', outline: 'none', marginBottom: '14px'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--text)' }}>
          📅 Manage Events ({events.length})
        </h2>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: '#e94560', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
          fontWeight: 'bold', fontSize: '14px'
        }}>
          {showForm ? '✕ Cancel' : '+ Add Event'}
        </button>
      </div>

      {msg && (
        <div style={{
          background: '#d4edda', color: '#155724', padding: '12px 16px',
          borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold'
        }}>
          ✅ {msg}
        </div>
      )}

      {/* Add Event Form */}
      {showForm && (
        <div style={{
          background: 'var(--card)', borderRadius: '14px', padding: '28px',
          boxShadow: 'var(--shadow)', marginBottom: '28px',
          border: '2px solid #e94560'
        }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '18px' }}>
            Add New Event
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Event Title *</label>
              <input style={inputStyle} placeholder="e.g. Hackathon 2025"
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Date *</label>
              <input style={inputStyle} placeholder="e.g. May 15, 2025"
                value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Venue</label>
              <input style={inputStyle} placeholder="e.g. CS Lab 101"
                value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Coordinator</label>
              <input style={inputStyle} placeholder="e.g. Rahul Sharma"
                value={form.coordinator} onChange={e => setForm({ ...form, coordinator: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Prize</label>
              <input style={inputStyle} placeholder="e.g. 5000 Prize Pool"
                value={form.prize} onChange={e => setForm({ ...form, prize: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Category</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}>
                {['Technical', 'Workshop', 'Seminar', 'Exhibition', 'Networking'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Description *</label>
            <textarea
              placeholder="Event description..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button onClick={addEvent} style={{
            background: '#e94560', color: 'white', border: 'none',
            padding: '12px 32px', borderRadius: '8px', fontSize: '15px',
            fontWeight: 'bold', cursor: 'pointer'
          }}>
            Save Event ✓
          </button>
        </div>
      )}

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map(event => (
          <div key={event.id} style={{
            background: 'var(--card)', borderRadius: '12px', padding: '18px 20px',
            boxShadow: 'var(--shadow)', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
            borderLeft: '4px solid #e94560'
          }}>
            <div>
              <h3 style={{ color: 'var(--text)', marginBottom: '4px', fontSize: '16px' }}>
                {event.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                📅 {event.date} · 📍 {event.venue} · 🏷️ {event.category}
              </p>
              {event.coordinator && (
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  🧑‍💼 {event.coordinator}
                </p>
              )}
            </div>
            <button onClick={() => deleteEvent(event.id)} style={{
              background: '#fde8ec', color: '#e94560', border: 'none',
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: 'bold', fontSize: '13px', flexShrink: 0
            }}>
              🗑️ Delete
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
            No events yet. Click "Add Event" to create one!
          </p>
        )}
      </div>
    </div>
  )
}

// ── Team Manager ──────────────────────────────────────────────────────────────
function TeamManager({ team, setTeam }) {
  const [form, setForm] = useState({ name: '', role: '', year: 'Second Year', emoji: '👨‍💻' })
  const [msg, setMsg] = useState('')
  const [showForm, setShowForm] = useState(false)

  function addMember() {
    if (!form.name || !form.role) {
      alert('Please fill Name and Role!')
      return
    }
    fetch('http://localhost:8080/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setTeam([...team, data])
        setForm({ name: '', role: '', year: 'Second Year', emoji: '👨‍💻' })
        setMsg('Team member added!')
        setShowForm(false)
        setTimeout(() => setMsg(''), 3000)
      })
      .catch(() => alert('Backend error. Is it running?'))
  }

  function deleteMember(id) {
    if (!window.confirm('Remove this team member?')) return
    fetch(`http://localhost:8080/api/team/${id}`, { method: 'DELETE' })
      .then(() => setTeam(team.filter(m => m.id !== id)))
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '8px',
    border: '2px solid #ddd', fontSize: '14px',
    background: 'var(--bg)', color: 'var(--text)',
    boxSizing: 'border-box', outline: 'none', marginBottom: '14px'
  }

  const emojis = ['👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🎨', '👨‍💼', '👩‍💼', '🧑‍💼', '👩‍🎓', '👨‍🎓']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--text)' }}>
          👥 Manage Team ({team.length})
        </h2>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: '#0f3460', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
          fontWeight: 'bold', fontSize: '14px'
        }}>
          {showForm ? '✕ Cancel' : '+ Add Member'}
        </button>
      </div>

      {msg && (
        <div style={{
          background: '#d4edda', color: '#155724', padding: '12px 16px',
          borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold'
        }}>
          ✅ {msg}
        </div>
      )}

      {/* Add Member Form */}
      {showForm && (
        <div style={{
          background: 'var(--card)', borderRadius: '14px', padding: '28px',
          boxShadow: 'var(--shadow)', marginBottom: '28px',
          border: '2px solid #0f3460'
        }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '18px' }}>
            Add Team Member
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Full Name *</label>
              <input style={inputStyle} placeholder="e.g. Rahul Sharma"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Role *</label>
              <input style={inputStyle} placeholder="e.g. President"
                value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Year</label>
              <select style={inputStyle} value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}>
                {['First Year', 'Second Year', 'Third Year', 'Final Year'].map(y => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Avatar Emoji</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {emojis.map(em => (
                  <button key={em} onClick={() => setForm({ ...form, emoji: em })} style={{
                    width: '36px', height: '36px', borderRadius: '8px', border: 'none',
                    background: form.emoji === em ? '#0f3460' : 'var(--bg)',
                    fontSize: '18px', cursor: 'pointer'
                  }}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={addMember} style={{
            background: '#0f3460', color: 'white', border: 'none',
            padding: '12px 32px', borderRadius: '8px', fontSize: '15px',
            fontWeight: 'bold', cursor: 'pointer'
          }}>
            Save Member ✓
          </button>
        </div>
      )}

      {/* Team List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {team.map(member => (
          <div key={member.id} style={{
            background: 'var(--card)', borderRadius: '12px', padding: '16px 20px',
            boxShadow: 'var(--shadow)', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
            borderLeft: '4px solid #0f3460'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: '#0f346020', border: '2px solid #0f3460',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0
              }}>
                {member.emoji || '👤'}
              </div>
              <div>
                <p style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '2px' }}>
                  {member.name}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  {member.role} · {member.year}
                </p>
              </div>
            </div>
            <button onClick={() => deleteMember(member.id)} style={{
              background: '#fde8ec', color: '#e94560', border: 'none',
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: 'bold', fontSize: '13px', flexShrink: 0
            }}>
              🗑️ Remove
            </button>
          </div>
        ))}
        {team.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
            No team members. Click "Add Member" to get started!
          </p>
        )}
      </div>
    </div>
  )
}

// ── Volunteers Viewer ─────────────────────────────────────────────────────────
function VolunteersViewer({ volunteers }) {
  return (
    <div>
      <h2 style={{ fontSize: '22px', color: 'var(--text)', marginBottom: '24px' }}>
        🙋 Volunteer Registrations ({volunteers.length})
      </h2>

      {volunteers.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
          No volunteers registered yet.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {volunteers.map((v, i) => (
            <div key={v.id || i} style={{
              background: 'var(--card)', borderRadius: '12px', padding: '16px 20px',
              boxShadow: 'var(--shadow)', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              borderLeft: '4px solid #27ae60'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: '#27ae60', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', fontSize: '18px', flexShrink: 0
                }}>
                  {v.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '2px' }}>
                    {v.name}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                    📧 {v.email} · {v.year}
                  </p>
                </div>
              </div>
              <span style={{
                background: '#e8f5e9', color: '#2e7d32',
                padding: '6px 14px', borderRadius: '20px',
                fontSize: '13px', fontWeight: 'bold', flexShrink: 0
              }}>
                {v.interest}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Admin Component ──────────────────────────────────────────────────────
function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [events, setEvents] = useState([])
  const [team, setTeam] = useState([])
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:8080/api/events')
        .then(res => res.json()).then(setEvents).catch(() => {})
      fetch('http://localhost:8080/api/team')
        .then(res => res.json()).then(setTeam).catch(() => {})
      fetch('http://localhost:8080/api/volunteers')
        .then(res => res.json()).then(setVolunteers).catch(() => {})
    }
  }, [loggedIn])

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px', background: '#1a1a2e', padding: '28px 16px',
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#e94560', fontSize: '20px', fontWeight: 'bold' }}>CSESA</h2>
          <p style={{ color: '#aaa', fontSize: '12px' }}>Admin Panel</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: activeTab === tab.id ? '#e94560' : 'transparent',
              color: 'white', border: 'none', padding: '12px 16px',
              borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
              fontSize: '14px', fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <button onClick={() => setLoggedIn(false)} style={{
          background: 'rgba(233,69,96,0.2)', color: '#e94560',
          border: '1px solid #e94560', padding: '10px',
          borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
        }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflow: 'auto' }}>
        {activeTab === 'dashboard' && (
          <Dashboard events={events} team={team} volunteers={volunteers} />
        )}
        {activeTab === 'events' && (
          <EventsManager events={events} setEvents={setEvents} />
        )}
        {activeTab === 'team' && (
          <TeamManager team={team} setTeam={setTeam} />
        )}
        {activeTab === 'volunteers' && (
          <VolunteersViewer volunteers={volunteers} />
        )}
      </div>
    </div>
  )
}

export default Admin