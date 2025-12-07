import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      background: 'rgba(10, 10, 10, 0.95)',
      borderTop: '1px solid rgba(0, 255, 255, 0.1)',
      padding: '3rem 5vw 2rem',
      marginTop: '4rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00FFFF, #FF00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
            }}>
              {'Inan Infinites'}
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}>
              Creating world-changing digital products that inspire and empower millions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: '#00ffff',
              marginBottom: '1rem',
              fontSize: '1.1rem',
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ x: 5, color: '#00ffff' }}
                    style={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{
              color: '#ff00ff',
              marginBottom: '1rem',
              fontSize: '1.1rem',
            }}>
              Connect
            </h4>
            <div style={{
              display: 'flex',
              gap: '1rem',
            }}>
              {[
                { name: 'GitHub', icon: '🔗', url: 'https://github.com/Muhilanraj18' },
                { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/muhilan-raj-a252a1328' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                  }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            color: '#808080',
            fontSize: '0.9rem',
          }}>
            © {currentYear} Muhilan Raj. Built with{' '}
            <span style={{ color: '#ff00ff' }}>passion</span>,{' '}
            <span style={{ color: '#00ffff' }}>creativity</span> &{' '}
            <span style={{ color: '#00ff88' }}>❤️</span>
          </p>

          <p style={{
            color: '#808080',
            fontSize: '0.9rem',
          }}>
            <motion.a
              href="https://github.com/Muhilanraj18"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#00ffff' }}
              style={{
                color: '#808080',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              View GitHub
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  )
}
