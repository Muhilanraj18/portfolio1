import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e, #0f0f1e)'
          : 'linear-gradient(135deg, #f0f0f0, #d0d0d0)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <motion.div
        animate={{
          x: theme === 'dark' ? 2 : 28,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          position: 'absolute',
          top: '2px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #00FFFF, #0088FF)'
            : 'linear-gradient(135deg, #FFD700, #FFA500)',
          boxShadow: theme === 'dark'
            ? '0 0 10px rgba(0, 255, 255, 0.5)'
            : '0 0 10px rgba(255, 215, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
        }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}
