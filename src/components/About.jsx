import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const elements = ref.current.querySelectorAll('.animate-on-scroll')
    
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section 
      id="about" 
      className="section about-section" 
      ref={ref}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="animate-on-scroll"
        >
          <h2 style={{ 
            color: '#ff00ff',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            About Me
          </h2>
        </motion.div>

        <div className="glass animate-on-scroll" style={{
          padding: '3rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              lineHeight: 1.8,
              color: '#d0d0d0',
              marginBottom: '1.5rem'
            }}>
              Hey there! I'm <span style={{ color: '#00ffff', fontWeight: 600 }}>Muhilan Raj</span>, a passionate 
              <span style={{ color: '#ff00ff', fontWeight: 600 }}> front-end developer</span> who loves crafting 
              sleek and interactive web experiences.
            </p>

            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#b0b0b0',
              marginBottom: '1.5rem'
            }}>
              I specialize in building responsive websites using 
              <span style={{ color: '#00ff88' }}> HTML</span>, 
              <span style={{ color: '#00ffff' }}> CSS</span>, and 
              <span style={{ color: '#ff00ff' }}> JavaScript</span>, and I'm constantly exploring new technologies 
              to make designs come alive with animations, effects, and smooth user experiences. Every line of code 
              feels like art to me — a mix of logic, imagination, and detail.
            </p>

            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#b0b0b0',
              marginBottom: '1.5rem'
            }}>
              My dream is to build world-changing digital products under my company 
              <span style={{ color: '#00ffff', fontWeight: 600 }}> Inan Infinites</span>, creating technology 
              that inspires and empowers millions of people.
            </p>

            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#b0b0b0'
            }}>
              When I'm not coding, you'll probably find me sketching new ideas, exploring futuristic tech concepts, 
              or brainstorming ways to build the next big thing.
            </p>
          </motion.div>

          {/* Stats or highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-3"
            style={{ 
              marginTop: '3rem',
              textAlign: 'center'
            }}
          >
            <div>
              <h3 style={{ 
                color: '#00ffff', 
                fontSize: '2.5rem',
                marginBottom: '0.5rem'
              }}>
                3+
              </h3>
              <p style={{ color: '#808080' }}>Projects Built</p>
            </div>
            <div>
              <h3 style={{ 
                color: '#ff00ff', 
                fontSize: '2.5rem',
                marginBottom: '0.5rem'
              }}>
                100%
              </h3>
              <p style={{ color: '#808080' }}>Passion & Creativity</p>
            </div>
            <div>
              <h3 style={{ 
                color: '#00ff88', 
                fontSize: '2.5rem',
                marginBottom: '0.5rem'
              }}>
                ∞
              </h3>
              <p style={{ color: '#808080' }}>Ideas & Dreams</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
