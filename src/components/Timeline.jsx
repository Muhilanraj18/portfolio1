import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timelineData = [
  {
    id: 1,
    year: '2025',
    title: 'Advanced 3D Web Development',
    description: 'Mastering Three.js, React Three Fiber, and creating immersive web experiences with cutting-edge animations.',
    icon: '🚀',
    color: '#00FFFF',
  },
  {
    id: 2,
    year: '2024',
    title: 'Professional Portfolio Projects',
    description: 'Built multiple client websites including Inan Book, Cut Pulse, and interactive resume builders with modern UI/UX.',
    icon: '💼',
    color: '#FF00FF',
  },
  {
    id: 3,
    year: '2023',
    title: 'Frontend Mastery',
    description: 'Deep dive into HTML, CSS, JavaScript, and React. Created stunning animations and responsive designs.',
    icon: '⚡',
    color: '#00FF88',
  },
  {
    id: 4,
    year: '2022',
    title: 'The Beginning',
    description: 'Started the journey into web development. Discovered passion for creating beautiful, interactive web experiences.',
    icon: '🌱',
    color: '#0088FF',
  },
]

function TimelineItem({ item, index, isLast }) {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr auto 1fr' : '1fr auto 1fr',
        gap: '2rem',
        marginBottom: isLast ? 0 : '4rem',
        alignItems: 'center',
      }}
    >
      {/* Left content (visible on even items) */}
      {isEven ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{
            padding: '1.5rem',
            textAlign: 'right',
          }}
        >
          <h3 style={{
            color: item.color,
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}>
            {item.title}
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            {item.description}
          </p>
        </motion.div>
      ) : (
        <div />
      )}

      {/* Center timeline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, type: 'spring' }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
            border: `3px solid ${item.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: `0 0 30px ${item.color}60`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {item.icon}
        </motion.div>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: `${item.color}20`,
            border: `1px solid ${item.color}40`,
            borderRadius: '20px',
            color: item.color,
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          {item.year}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              width: '3px',
              background: `linear-gradient(180deg, ${item.color}, transparent)`,
              marginTop: '1rem',
              position: 'absolute',
              top: '100%',
            }}
          />
        )}
      </div>

      {/* Right content (visible on odd items) */}
      {!isEven ? (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{
            padding: '1.5rem',
            textAlign: 'left',
          }}
        >
          <h3 style={{
            color: item.color,
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}>
            {item.title}
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            {item.description}
          </p>
        </motion.div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default function Timeline() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="timeline"
      className="section timeline-section"
      ref={ref}
      style={{
        minHeight: '100vh',
        paddingTop: '8vh',
        paddingBottom: '8vh',
      }}
    >
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            color: '#00ff88',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          My Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            textAlign: 'center',
            color: '#b0b0b0',
            fontSize: '1.1rem',
            marginBottom: '5rem',
            maxWidth: '700px',
            margin: '0 auto 5rem',
          }}
        >
          From curiosity to mastery - here's my evolution in web development
        </motion.p>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-section > div > div > div {
            grid-template-columns: auto 1fr !important;
            gap: 1rem !important;
          }
          .timeline-section > div > div > div > div:first-child,
          .timeline-section > div > div > div > div:last-child {
            display: none !important;
          }
          .timeline-section > div > div > div > div:nth-child(2) + div {
            display: block !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}
