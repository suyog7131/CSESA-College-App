import { useState } from 'react'

// ── Demo Data ────────────────────────────────────────────────────────────────
const DEMO_EVENTS = [
  {
    id: 1,
    title: 'CodeQuiz Blitz 2025',
    category: 'Technical',
    date: 'May 10, 2025',
    time: '10:00 AM – 12:00 PM',
    venue: 'CS Lab 101',
    description: 'A fast-paced online code quiz covering DSA, OOP, and web dev fundamentals. Top 3 winners get cash prizes!',
    coordinator: { name: 'Arjun Mehta', email: 'arjun.mehta@csesa.edu', phone: '+91 98001 23456' },
    hasQuiz: true,
    maxParticipants: 60,
    prize: '₹5,000 Prize Pool',
    color: '#e94560',
    icon: '⚡',
    quizQuestions: [
      { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1 },
      { q: 'Which data structure uses LIFO?', options: ['Queue', 'Array', 'Stack', 'Linked List'], answer: 2 },
      { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Coded Style Syntax'], answer: 2 },
      { q: 'Which sorting algorithm has worst-case O(n log n)?', options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], answer: 1 },
      { q: 'In Python, which keyword is used to define a function?', options: ['function', 'def', 'fn', 'func'], answer: 1 }
    ]
  },
  {
    id: 2,
    title: 'HackSprint – 24hr Hackathon',
    category: 'Technical',
    date: 'June 1–2, 2025',
    time: '9:00 AM (24 hrs)',
    venue: 'Innovation Hub, Block C',
    description: 'Build a working prototype in 24 hours. Theme: "Tech for Social Good". Teams of 2–4. Mentors available throughout.',
    coordinator: { name: 'Priya Sharma', email: 'priya.sharma@csesa.edu', phone: '+91 97700 56789' },
    hasQuiz: false,
    maxParticipants: 100,
    prize: '₹15,000 Prize Pool',
    color: '#0f3460',
    icon: '🚀',
    quizQuestions: []
  },
  {
    id: 3,
    title: 'Web Dev Workshop',
    category: 'Workshop',
    date: 'May 20, 2025',
    time: '2:00 PM – 5:00 PM',
    venue: 'Seminar Hall A',
    description: 'Hands-on React & Node.js workshop for beginners. Build a full-stack app from scratch with expert guidance.',
    coordinator: { name: 'Sneha Patil', email: 'sneha.patil@csesa.edu', phone: '+91 99887 12345' },
    hasQuiz: false,
    maxParticipants: 40,
    prize: 'Certificate + Swag Kit',
    color: '#27ae60',
    icon: '🌐',
    quizQuestions: []
  },
  {
    id: 4,
    title: 'AI/ML Industry Seminar',
    category: 'Seminar',
    date: 'May 28, 2025',
    time: '11:00 AM – 1:00 PM',
    venue: 'Main Auditorium',
    description: 'Industry experts talk about the future of AI, machine learning careers, and emerging tech trends in 2025.',
    coordinator: { name: 'Rahul Desai', email: 'rahul.desai@csesa.edu', phone: '+91 91234 67890' },
    hasQuiz: false,
    maxParticipants: 200,
    prize: 'Certificate of Attendance',
    color: '#e67e22',
    icon: '🤖',
    quizQuestions: []
  }
]

const INITIAL_PARTICIPANTS = {
  1: [
    { name: 'Riya Joshi', email: 'riya@example.com', branch: 'CSE', year: '3rd', score: 92 },
    { name: 'Karan Patel', email: 'karan@example.com', branch: 'IT', year: '2nd', score: 85 },
    { name: 'Ananya Singh', email: 'ananya@example.com', branch: 'CSE', year: '4th', score: 78 },
    { name: 'Dev Chauhan', email: 'dev@example.com', branch: 'ECE', year: '3rd', score: 72 }
  ],
  2: [
    { name: 'Team Nexus', email: 'nexus@example.com', branch: 'CSE', year: 'Mixed', score: null },
    { name: 'ByteForce', email: 'byteforce@example.com', branch: 'IT', year: 'Mixed', score: null }
  ],
  3: [],
  4: []
}

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: '8px',
  border: '2px solid #ddd', fontSize: '15px',
background: 'var(--card)', color: 'var(--text)', boxSizing: 'border-box', outline: 'none'}
const btnPrimary = {
  background: '#e94560', color: 'white', border: 'none',
  padding: '12px 28px', borderRadius: '10px', fontSize: '15px',
  fontWeight: 'bold', cursor: 'pointer'
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function EventModal({ event, participants, onClose, onRegister }) {
  const [tab, setTab] = useState('list')
  const [form, setForm] = useState({ name: '', email: '', branch: '', year: '' })
  const [registered, setRegistered] = useState(false)
  const [myName, setMyName] = useState('')
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [quizDone, setQuizDone] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const list = participants[event.id] || []

  function handleRegister() {
    if (!form.name || !form.email || !form.branch || !form.year) {
      alert('Please fill in all fields.')
      return
    }
    onRegister(event.id, { ...form, score: null })
    setMyName(form.name)
    setRegistered(true)
  }

  function handleAnswer() {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    if (currentQ + 1 < event.quizQuestions.length) {
      setAnswers(newAnswers)
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      let sc = 0
      newAnswers.forEach((a, i) => { if (a === event.quizQuestions[i].answer) sc++ })
      setQuizScore(Math.round((sc / event.quizQuestions.length) * 100))
      setAnswers(newAnswers)
      setQuizDone(true)
    }
  }

  const tabBtn = (id, label, show = true) => show ? (
    <button onClick={() => setTab(id)} style={{
      padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
      fontWeight: 'bold', fontSize: '13px',
      background: tab === id ? '#e94560' : 'var(--bg)',
      color: tab === id ? 'white' : 'var(--text)', transition: 'all 0.2s'
    }}>{label}</button>
  ) : null

  return (
    <div style={{
  background: 'var(--card)', borderRadius: '20px', width: '100%',
  maxWidth: '640px', maxHeight: '90vh', overflow: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
}}>
      <div style={{
        background: 'var(--card)', borderRadius: '20px', width: '100%',
        maxWidth: '640px', maxHeight: '90vh', overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
      }}>
        {/* Header */}
        <div style={{
          background: event.color, color: 'white', padding: '24px 28px',
          borderRadius: '20px 20px 0 0', display: 'flex',
          justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>{event.icon}</div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>{event.title}</h2>
            <p style={{ opacity: 0.85, fontSize: '13px' }}>📅 {event.date} · {event.time}</p>
            <p style={{ opacity: 0.85, fontSize: '13px' }}>📍 {event.venue}</p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '16px', fontWeight: 'bold', flexShrink: 0
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '18px 24px 0', flexWrap: 'wrap' }}>
          {tabBtn('list', `👥 Participants (${list.length})`)}
          {tabBtn('register', '📝 Register')}
          {event.hasQuiz && tabBtn('quiz', '⚡ Quiz')}
          {event.hasQuiz && list.some(p => p.score !== null) && tabBtn('results', '🏆 Results')}
        </div>

        <div style={{ padding: '20px 24px' }}>
          {/* ── LIST TAB ── */}
          {tab === 'list' && (
            <div>
              {list.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>👥</div>
                  <p>No participants yet. Be the first to register!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {list.map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: 'var(--bg)', borderRadius: '10px', padding: '12px 16px'
                    }}>
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: event.color, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', fontSize: '16px', flexShrink: 0
                      }}>{p.name.charAt(0)}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 'bold', color: 'var(--text)' }}>{p.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{p.branch} · {p.year} Year</p>
                      </div>
                      {p.score !== null && (
                        <span style={{
                          background: '#e8f5e9', color: '#2e7d32',
                          padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
                        }}>{p.score}%</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── REGISTER TAB ── */}
          {tab === 'register' && (
            registered ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '52px', marginBottom: '14px' }}>🎉</div>
                <h3 style={{ fontSize: '22px', color: 'var(--text)', marginBottom: '8px' }}>You're Registered!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Welcome, <strong>{myName}</strong>! Check your email for confirmation.
                </p>
                {event.hasQuiz && (
                  <button onClick={() => setTab('quiz')} style={btnPrimary}>Take the Quiz ⚡</button>
                )}
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '17px', color: 'var(--text)', marginBottom: '18px', fontWeight: 'bold' }}>
                  Register for {event.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Full Name</label>
                    <input style={inputStyle} placeholder='Your full name'
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>College Email</label>
                    <input style={inputStyle} placeholder='your.name@college.edu' type='email'
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Branch</label>
                      <select style={inputStyle} value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>
                        <option value=''>Select</option>
                        {['CSE', 'IT', 'ECE', 'ENTC', 'Mechanical', 'Civil', 'Other'].map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: 'var(--text)' }}>Year</label>
                      <select style={inputStyle} value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
                        <option value=''>Select</option>
                        {['1st', '2nd', '3rd', '4th'].map(y => <option key={y} value={y}>{y} Year</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{
                    background: '#fff3cd', border: '1px solid #ffc107',
                    borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#856404'
                  }}>
                    ℹ️ Coordinator: <strong>{event.coordinator.name}</strong> — {event.coordinator.phone}
                  </div>
                  <button onClick={handleRegister} style={{ ...btnPrimary, width: '100%', padding: '13px' }}>
                    Confirm Registration 🎯
                  </button>
                </div>
              </div>
            )
          )}

          {/* ── QUIZ TAB ── */}
          {tab === 'quiz' && event.hasQuiz && (
            !quizStarted && !quizDone ? (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '52px', marginBottom: '14px' }}>⚡</div>
                <h3 style={{ fontSize: '22px', color: 'var(--text)', marginBottom: '8px' }}>Code Quiz Blitz</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {event.quizQuestions.length} questions · Multiple Choice · No negative marking
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
                  Topics: DSA, Web Dev, OOP, Python
                </p>
                <button onClick={() => setQuizStarted(true)} style={btnPrimary}>Start Quiz ▶</button>
              </div>
            ) : !quizDone ? (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Q {currentQ + 1} / {event.quizQuestions.length}</span>
                    <span style={{ color: '#e94560', fontSize: '13px', fontWeight: 'bold' }}>
                      {Math.round((currentQ / event.quizQuestions.length) * 100)}% done
                    </span>
                  </div>
                  <div style={{ background: '#eee', borderRadius: '10px', height: '7px' }}>
                    <div style={{
                      background: '#e94560', height: '7px', borderRadius: '10px',
                      width: `${(currentQ / event.quizQuestions.length) * 100}%`, transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: '10px', padding: '18px', marginBottom: '18px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text)', lineHeight: '1.5' }}>
                    {event.quizQuestions[currentQ].q}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                  {event.quizQuestions[currentQ].options.map((opt, i) => (
                    <button key={i} onClick={() => setSelected(i)} style={{
                      padding: '13px 16px', borderRadius: '10px', textAlign: 'left',
                      border: `2px solid ${selected === i ? '#e94560' : '#ddd'}`,
                      background: selected === i ? '#fff0f3' : 'var(--bg)',
                      color: 'var(--text)', cursor: 'pointer', fontSize: '14px',
                      fontWeight: selected === i ? 'bold' : 'normal', transition: 'all 0.15s'
                    }}>
                      <span style={{
                        display: 'inline-flex', width: '24px', height: '24px',
                        borderRadius: '50%', background: selected === i ? '#e94560' : '#ddd',
                        color: selected === i ? 'white' : '#666',
                        alignItems: 'center', justifyContent: 'center',
                        marginRight: '12px', fontSize: '12px', fontWeight: 'bold', flexShrink: 0
                      }}>{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAnswer}
                  disabled={selected === null}
                  style={{
                    ...btnPrimary, width: '100%', padding: '13px',
                    opacity: selected === null ? 0.5 : 1,
                    cursor: selected === null ? 'not-allowed' : 'pointer'
                  }}
                >
                  {currentQ + 1 === event.quizQuestions.length ? 'Submit Quiz 🏁' : 'Next →'}
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  width: '90px', height: '90px', borderRadius: '50%', margin: '0 auto 16px',
                  background: quizScore >= 60 ? '#e8f5e9' : '#fce8e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px', fontWeight: 'bold',
                  color: quizScore >= 60 ? '#2e7d32' : '#c62828',
                  border: `4px solid ${quizScore >= 60 ? '#4caf50' : '#e94560'}`
                }}>
                  {quizScore}%
                </div>
                <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'var(--text)', marginBottom: '6px' }}>
                  {quizScore >= 80 ? '🏆 Excellent!' : quizScore >= 60 ? '👍 Good Job!' : '📖 Keep Practicing!'}
                </h3>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Your score: {quizScore}% on Code Quiz Blitz
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {answers.map((a, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      background: 'var(--bg)', padding: '10px 14px', borderRadius: '8px',
                      borderLeft: `4px solid ${a === event.quizQuestions[i].answer ? '#4caf50' : '#e94560'}`
                    }}>
                      <span>{a === event.quizQuestions[i].answer ? '✅' : '❌'}</span>
                      <span style={{ fontSize: '13px', color: 'var(--text)' }}>{event.quizQuestions[i].q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* ── RESULTS TAB ── */}
          {tab === 'results' && event.hasQuiz && (
            <div>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '18px' }}>🏆 Leaderboard</h3>
              {list.filter(p => p.score !== null).sort((a, b) => b.score - a.score).map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: i === 0 ? '#fff8e1' : i === 1 ? '#f5f5f5' : i === 2 ? '#fbe9e7' : 'var(--bg)',
                  borderRadius: '12px', padding: '14px 18px', marginBottom: '10px',
                  border: `2px solid ${i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : 'transparent'}`
                }}>
                  <div style={{ fontSize: '22px', width: '34px', textAlign: 'center', fontWeight: 'bold' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 'bold', color: 'var(--text)' }}>{p.name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.branch} · {p.year} Year</p>
                  </div>
                  <span style={{
                    background: '#e94560', color: 'white',
                    padding: '4px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px'
                  }}>{p.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function Events() {
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Technical', 'Workshop', 'Seminar', 'Exhibition', 'Networking']

  const filtered = DEMO_EVENTS.filter(e => {
    const ms = e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())
    const mf = filter === 'All' || e.category === filter
    return ms && mf
  })

  function handleRegister(eventId, participant) {
    // Save to backend
    fetch('http://localhost:8080/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: participant.name,
        email: participant.email,
        branch: participant.branch,
        year: participant.year,
        eventId: eventId,
        score: null
      })
    }).catch(err => console.log(err))

    // Also update local state so UI updates immediately
    setParticipants(prev => ({ ...prev, [eventId]: [...(prev[eventId] || []), participant] }))
  }

  return (
<div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', background: 'var(--bg)', minHeight: '100vh' }}>      <h1 style={{ textAlign: 'center', fontSize: '42px', color: 'var(--text)', marginBottom: '10px' }}>Our Events</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '17px', marginBottom: '44px' }}>
        Register, compete, and learn — Click any event to explore details and sign up!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input type='text' placeholder='🔍 Search events...' value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '14px 20px', borderRadius: '12px',
            border: '2px solid #ddd', fontSize: '16px',
            background: 'var(--card)', color: 'var(--text)', boxSizing: 'border-box', outline: 'none'
          }} />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '14px',
            background: filter === cat ? '#e94560' : 'var(--card)',
            color: filter === cat ? 'white' : 'var(--text)',
            boxShadow: 'var(--shadow)', transition: 'all 0.2s'
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
        {filtered.map(event => {
          const pList = participants[event.id] || []
          return (
            <div key={event.id}
              style={{
                background: 'var(--card)', borderRadius: '18px', padding: '28px',
                boxShadow: 'var(--shadow)', borderTop: `4px solid ${event.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
              onClick={() => setSelectedEvent(event)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontSize: '36px' }}>{event.icon}</span>
                <span style={{
                  background: event.color, color: 'white',
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                }}>{event.category}</span>
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '8px', fontWeight: 'bold' }}>
                {event.title}
              </h3>
              <p style={{ color: '#e94560', fontSize: '13px', marginBottom: '4px' }}>📅 {event.date} · {event.time}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>📍 {event.venue}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                {event.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{ background: 'var(--bg)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  👥 {pList.length}/{event.maxParticipants} registered
                </span>
                <span style={{ background: 'var(--bg)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  🎁 {event.prize}
                </span>
                {event.hasQuiz && (
                  <span style={{ background: '#fff0f3', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', color: '#e94560', fontWeight: 'bold' }}>
                    ⚡ Quiz Included
                  </span>
                )}
              </div>
              <div style={{
                background: 'var(--bg)', borderRadius: '8px', padding: '10px 12px',
                fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px'
              }}>
                🧑‍💼 <strong style={{ color: 'var(--text)' }}>{event.coordinator.name}</strong> · {event.coordinator.email}
              </div>
              <button style={{
                background: event.color, color: 'white', border: 'none',
                padding: '11px', borderRadius: '10px', fontSize: '14px',
                fontWeight: 'bold', cursor: 'pointer', width: '100%'
              }} onClick={e => { e.stopPropagation(); setSelectedEvent(event) }}>
                View & Register →
              </button>
            </div>
          )
        })}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          participants={participants}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
        />
      )}
    </div>
  )
}

export default Events
