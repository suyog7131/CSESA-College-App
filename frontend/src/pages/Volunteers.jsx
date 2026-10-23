import { useState, useEffect } from 'react'

function Volunteers() {
  const [volunteers, setVolunteers] = useState([])
  const [form, setForm] = useState({ name: '', email: '', year: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/volunteers')
      .then(res => res.json())
      .then(data => {
        setVolunteers(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.year || !form.interest) {
      alert('Please fill in all fields!')
      return
    }

    fetch('http://localhost:8080/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setVolunteers([...volunteers, data])
        setSubmitted(true)
      })
      .catch(err => {
        console.log(err)
        alert('Something went wrong. Is the backend running?')
      })
  }

  return (
    <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto', background: 'var(--bg)', minHeight: '100vh' }}>

      <h1 style={{ textAlign: 'center', fontSize: '40px', color: 'var(--text)', marginBottom: '10px' }}>
        Volunteers
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '17px', marginBottom: '50px' }}>
        Join our team and make a difference!
      </p>

      {/* Current Volunteers */}
      <h2 style={{ fontSize: '26px', color: 'var(--text)', marginBottom: '24px' }}>
        Current Volunteers ({volunteers.length})
      </h2>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Loading...</p>
      ) : volunteers.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          No volunteers yet. Be the first!
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {volunteers.map((v, i) => (
            <div key={v.id || i} style={{
              background: 'var(--card)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)',
              borderTop: '4px solid #e94560'
            }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: '#e94560', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', fontWeight: 'bold',
                margin: '0 auto 12px'
              }}>
                {v.name.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '6px' }}>
                {v.name}
              </h3>
              <p style={{ color: '#e94560', fontSize: '13px', marginBottom: '4px' }}>
                {v.interest}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                {v.year}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Registration Form */}
      <div style={{
        background: 'var(--card)',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 style={{ fontSize: '26px', color: 'var(--text)', marginBottom: '28px' }}>
          Register as Volunteer
        </h2>

        {submitted ? (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '32px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '52px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ marginBottom: '8px', fontSize: '22px' }}>
              Thank you for registering!
            </h3>
            <p>We will contact you soon. Welcome to CSESA!</p>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm({ name: '', email: '', year: '', interest: '' })
              }}
              style={{
                marginTop: '20px',
                background: '#e94560', color: 'white',
                border: 'none', padding: '10px 24px',
                borderRadius: '8px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 'bold'
              }}
            >
              Register Another
            </button>
          </div>
        ) : (
          <div>
            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: 'var(--text)', fontWeight: 'bold', fontSize: '14px'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px',
                  borderRadius: '8px', border: '2px solid #ddd',
                  fontSize: '15px', background: 'var(--bg)',
                  color: 'var(--text)', boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: 'var(--text)', fontWeight: 'bold', fontSize: '14px'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px',
                  borderRadius: '8px', border: '2px solid #ddd',
                  fontSize: '15px', background: 'var(--bg)',
                  color: 'var(--text)', boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Year */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: 'var(--text)', fontWeight: 'bold', fontSize: '14px'
              }}>
                Year *
              </label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px',
                  borderRadius: '8px', border: '2px solid #ddd',
                  fontSize: '15px', background: 'var(--bg)',
                  color: 'var(--text)', boxSizing: 'border-box',
                  outline: 'none'
                }}
              >
                <option value="">Select Year</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>

            {/* Interest */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                color: 'var(--text)', fontWeight: 'bold', fontSize: '14px'
              }}>
                Area of Interest *
              </label>
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '12px 16px',
                  borderRadius: '8px', border: '2px solid #ddd',
                  fontSize: '15px', background: 'var(--bg)',
                  color: 'var(--text)', boxSizing: 'border-box',
                  outline: 'none'
                }}
              >
                <option value="">Select Interest</option>
                <option value="Event Setup">Event Setup</option>
                <option value="Photography">Photography</option>
                <option value="Social Media">Social Media</option>
                <option value="Registration Desk">Registration Desk</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Design">Design</option>
                <option value="Content Writing">Content Writing</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: '#e94560',
                color: 'white',
                padding: '16px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Submit Registration 🎯
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Volunteers