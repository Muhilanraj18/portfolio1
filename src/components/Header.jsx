import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 5vw',
        background: isScrolled 
          ? 'rgba(10, 10, 10, 0.9)' 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled 
          ? '1px solid rgba(0, 255, 255, 0.1)' 
          : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00FFFF, #FF00FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          {'MR'}
        </motion.a>

        {/* Navigation */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          alignItems: 'center',
        }}>
          {navItems.map((item) => (
            <motion.li key={item.id}>
              <motion.a
                href={`#${item.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: activeSection === item.id ? '#00ffff' : '#b0b0b0',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  textShadow: activeSection === item.id 
                    ? '0 0 8px rgba(0, 255, 255, 0.5)' 
                    : 'none',
                }}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="neon-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '0.9rem',
          }}
        >
          Hire Me
        </motion.a>
      </nav>

      {/* Mobile menu styles (hidden for now, can be expanded) */}
      <style>{`
        @media (max-width: 768px) {
          nav ul {
            display: none;
          }
          nav a.neon-button {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </motion.header>
  )
}
