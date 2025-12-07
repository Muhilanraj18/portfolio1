import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Product Manager at TechCorp',
    image: 'https://i.pravatar.cc/150?img=1',
    text: 'Muhilan delivered an outstanding website with amazing animations. His attention to detail and creative approach exceeded our expectations!',
    rating: 5,
    color: '#00FFFF',
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'CEO at StartupX',
    image: 'https://i.pravatar.cc/150?img=12',
    text: 'Working with Muhilan was a pleasure. He transformed our vision into a stunning, interactive portfolio that truly stands out.',
    rating: 5,
    color: '#FF00FF',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    role: 'Designer at CreativeLab',
    image: 'https://i.pravatar.cc/150?img=5',
    text: 'The animations and 3D elements Muhilan created brought our designs to life. Highly recommend for any creative project!',
    rating: 5,
    color: '#00FF88',
  },
]

function TestimonialCard({ testimonial, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass"
      style={{
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Quote icon */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '3rem',
        opacity: 0.1,
        color: testimonial.color,
      }}>
        "
      </div>

      {/* Profile section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <motion.img
          src={testimonial.image}
          alt={testimonial.name}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: `2px solid ${testimonial.color}`,
            boxShadow: `0 0 15px ${testimonial.color}40`,
          }}
        />
        <div>
          <h4 style={{
            color: testimonial.color,
            fontSize: '1.2rem',
            marginBottom: '0.25rem',
          }}>
            {testimonial.name}
          </h4>
          <p style={{
            color: '#808080',
            fontSize: '0.9rem',
          }}>
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Rating stars */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '1rem',
      }}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 + i * 0.1 }}
            style={{
              color: '#FFD700',
              fontSize: '1.2rem',
            }}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Testimonial text */}
      <p style={{
        color: '#b0b0b0',
        fontSize: '1rem',
        lineHeight: 1.7,
        fontStyle: 'italic',
      }}>
        "{testimonial.text}"
      </p>

      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${testimonial.color}, transparent)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="testimonials"
      className="section testimonials-section"
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
            color: '#ff00ff',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          What People Say
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
            maxWidth: '700px',
            margin: '0 auto 4rem',
          }}
        >
          Don't just take my word for it - here's what clients and collaborators have to say
        </motion.p>

        <div
          className="grid grid-3"
          style={{
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
