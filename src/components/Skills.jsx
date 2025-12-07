import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: 'HTML', icon: '🌐', color: '#00FFFF', level: 90 },
  { name: 'CSS', icon: '�', color: '#FF00FF', level: 90 },
  { name: 'JavaScript', icon: '⚡', color: '#00FF88', level: 40 },
  { name: 'React', icon: '⚛️', color: '#0088FF', level: 5 },
  { name: 'Three.js', icon: '�', color: '#AA00FF', level: 0 },
  { name: 'Python', icon: '🐍', color: '#00FFFF', level: 40 },
  { name: 'Java', icon: '☕', color: '#FF00FF', level: 40 },
  { name: 'Animations', icon: '✨', color: '#00FF88', level: 85 },
  { name: 'UI/UX', icon: '💡', color: '#00FFFF', level: 80 },
  { name: 'Responsive', icon: '�', color: '#FF00FF', level: 88 },
  { name: 'Design', icon: '🎭', color: '#00FF88', level: 75 },
  { name: 'Git', icon: '�', color: '#0088FF', level: 70 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="glass"
      style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, ${skill.color}15, transparent)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} className="skill-glow" />

      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {skill.icon}
      </div>
      
      <h3 style={{ 
        color: skill.color,
        fontSize: '1.3rem',
        marginBottom: '1rem',
        textShadow: `0 0 10px ${skill.color}40`
      }}>
        {skill.name}
      </h3>

      {/* Skill level bar */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: '1rem'
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            borderRadius: '2px',
            boxShadow: `0 0 10px ${skill.color}60`
          }}
        />
      </div>
      
      <p style={{ 
        fontSize: '0.9rem', 
        color: '#808080',
        marginTop: '0.5rem'
      }}>
        {skill.level}%
      </p>

      <style>{`
        .glass:hover .skill-glow {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section 
      id="skills" 
      className="section skills-section"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            marginBottom: '3rem'
          }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-3"
          style={{ gap: '2rem' }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            color: '#b0b0b0',
            fontSize: '1.1rem'
          }}
        >
          ...and always learning more! 🚀
        </motion.p>
      </div>
    </section>
  )
}
