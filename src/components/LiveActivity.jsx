import React from 'react'
import { motion } from 'framer-motion'

export default function LiveActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        maxWidth: '280px',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="glass"
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          {/* Pulsing indicator */}
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00FF88',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#00FF88',
              boxShadow: '0 0 10px #00FF88',
            }} />
          </div>

          <div style={{ flex: 1 }}>
            <p style={{
              color: '#00FF88',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.15rem',
            }}>
              Currently Active
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.85rem',
              lineHeight: 1.3,
            }}>
              Learning WebGL & Shaders 🎨
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="bottom: 2rem"] {
            bottom: 1rem !important;
            right: 1rem !important;
            max-width: 220px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
