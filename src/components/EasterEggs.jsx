import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEggs() {
  const [showSecret, setShowSecret] = useState(false)
  const [konami, setKonami] = useState([])
  const [clicks, setClicks] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.key.toLowerCase()]
      setKonami(newKonami.slice(-10))

      // Check if konami code is matched
      if (newKonami.slice(-10).join(',') === konamiCode.join(',')) {
        triggerSecretMode()
        setKonami([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konami])

  const triggerSecretMode = () => {
    setShowSecret(true)
    setShowConfetti(true)
    setTimeout(() => setShowSecret(false), 5000)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  // Triple click on logo easter egg
  const handleLogoClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)

    if (newClicks >= 5) {
      triggerSecretMode()
      setClicks(0)
    }

    setTimeout(() => setClicks(0), 2000)
  }

  useEffect(() => {
    // Add click listener to logo
    const logo = document.querySelector('nav a[href="#hero"]')
    if (logo) {
      logo.addEventListener('click', handleLogoClick)
      return () => logo.removeEventListener('click', handleLogoClick)
    }
  }, [clicks])

  return (
    <>
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden',
          }}>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  background: ['#00FFFF', '#FF00FF', '#00FF88', '#FFD700'][i % 4],
                  borderRadius: i % 3 === 0 ? '50%' : '0',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Secret Message */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              pointerEvents: 'none',
            }}
          >
            <div
              className="glass"
              style={{
                padding: '3rem 4rem',
                textAlign: 'center',
                border: '2px solid #00FFFF',
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
                style={{ fontSize: '4rem', marginBottom: '1rem' }}
              >
                🎉
              </motion.div>
              <h2 style={{
                background: 'linear-gradient(135deg, #00FFFF, #FF00FF, #00FF88)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2.5rem',
                marginBottom: '1rem',
              }}>
                You Found It!
              </h2>
              <p style={{
                color: '#b0b0b0',
                fontSize: '1.2rem',
              }}>
                Secret Developer Mode Activated! 🚀
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Icons on Hover */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        .neon-button:active::after {
          content: '✨';
          position: absolute;
          top: 50%;
          left: 50%;
          animation: float-up 1s ease-out forwards;
          pointer-events: none;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  )
}
