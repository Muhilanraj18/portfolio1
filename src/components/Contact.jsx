import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00ffff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#00ffff"
        emissiveIntensity={0.3}
      />
    </Sphere>
  )
}

export default function Contact() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thanks for reaching out! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section
      id="contact"
      className="section contact-section"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            color: '#ff00ff',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            textAlign: 'center',
            color: '#b0b0b0',
            fontSize: '1.1rem',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}
        >
          Have a project in mind or just want to chat? Drop me a message!
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              height: '400px',
              position: 'relative',
              display: 'none', // Hide on mobile
            }}
            className="contact-3d"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedSphere />
            </Canvas>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass"
            style={{
              padding: '2.5rem',
              maxWidth: '550px',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#00ffff',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,255,255,0.3)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#00ffff',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,255,255,0.3)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#00ffff',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,255,255,0.3)'}
                />
              </div>

              <motion.button
                type="submit"
                className="neon-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            {/* Social Links */}
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
            }}>
              {[
                { name: 'GitHub', icon: '🔗', url: 'https://github.com/Muhilanraj18' },
                { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/muhilan-raj-a252a1328' },
                { name: 'Email', icon: '📧', url: 'mailto:muhilanraj@example.com' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    fontSize: '1.8rem',
                    transition: 'all 0.3s ease',
                  }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-3d {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
