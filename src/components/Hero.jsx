import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="section hero-section" 
      style={{ 
        minHeight: '100vh', 
        display: 'grid', 
        placeItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="hero-inner" style={{ 
        textAlign: 'center', 
        color: '#fff',
        position: 'relative',
        zIndex: 10,
        maxWidth: '800px',
        padding: '0 2rem'
      }}>
        {/* Main title with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #00FF88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hi, I'm <span style={{ display: 'inline-block' }}>Muhilan Raj</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ 
            color: '#b0b0b0', 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}
        >
          Frontend Developer • Creative Technologist
          <br />
          <span style={{ color: '#00ffff' }}>HTML</span> • <span style={{ color: '#ff00ff' }}>CSS</span> • <span style={{ color: '#00ff88' }}>JavaScript</span>
        </motion.p>        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="neon-button"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(0, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}
          >
            View My Work
          </motion.a>

          <motion.a
            href="#contact"
            className="neon-button"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 0, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.15), rgba(0, 255, 136, 0.1))',
              borderColor: 'rgba(255, 0, 255, 0.3)',
              marginBottom: '1rem'
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '2px',
              height: '40px',
              background: 'linear-gradient(180deg, transparent, #00ffff)',
              margin: '0 auto',
            }}
          />
          <p style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.85rem', 
            color: '#808080',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Scroll
          </p>
        </motion.div>
      </div>
    </section>
  )
}
