import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '40px', color: 'var(--text)', marginBottom: '10px' }}>
        Contact Us
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '17px', marginBottom: '50px' }}>
        Have a question or idea? We would love to hear from you!
      </p>

      {/* Contact Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '50px'
      }}>
        {[
          { icon: '📧', label: 'Email', value: 'csesa@college.edu', color: '#e94560' },
          { icon: '📱', label: 'WhatsApp', value: '+91 98765 43210', color: '#25D366' },
          { icon: '📍', label: 'Location', value: 'CS Dept, Campus', color: '#0f3460' },
          { icon: '📸', label: 'Instagram', value: '@csesa_official', color: '#E1306C' }
        ].map(info => (
          <div key={info.label} style={{
            background: 'var(--card)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow)',
            borderTop: `4px solid ${info.color}`
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{info.icon}</div>
            <p style={{ fontWeight: 'bold', color: 'var(--text)', marginBottom: '4px' }}>{info.label}</p>
            <p style={{ color: info.color, fontSize: '13px' }}>{info.value}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{
        background: 'var(--card)',
        borderRadius: '20px',
        padding: '44px',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 style={{ fontSize: '26px', color: 'var(--text)', marginBottom: '28px' }}>
          Send a Message
        </h2>

        {submitted ? (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '28px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
            <h3 style={{ marginBottom: '8px' }}>Message Sent!</h3>
            <p>We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {[
                { label: 'Your Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
                { label: 'Your Email', name: 'email', type: 'email', placeholder: 'Enter your email' }
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontWeight: 'bold' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #eee',
                      fontSize: '15px',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontWeight: 'bold' }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="What is this about?"
                value={form.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #eee',
                  fontSize: '15px',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontWeight: 'bold' }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #eee',
                  fontSize: '15px',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" style={{
              background: '#e94560',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}>
              Send Message 🚀
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Contact