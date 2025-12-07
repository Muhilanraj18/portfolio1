import React from 'react'
import { motion } from 'framer-motion'
import { useSound } from '../context/SoundContext'

export default function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useSound()

  return (
    <motion.button
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: `2px solid ${isSoundEnabled ? '#00FF88' : 'rgba(255, 255, 255, 0.2)'}`,
        background: isSoundEnabled 
          ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))'
          : 'rgba(255, 255, 255, 0.05)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        transition: 'all 0.3s ease',
        boxShadow: isSoundEnabled ? '0 0 15px rgba(0, 255, 136, 0.3)' : 'none',
      }}
      aria-label={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
      title={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      <motion.span
        animate={{
          scale: isSoundEnabled ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          repeat: isSoundEnabled ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        {isSoundEnabled ? '🔊' : '🔇'}
      </motion.span>
    </motion.button>
  )
}
