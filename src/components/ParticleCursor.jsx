import React, { useEffect, useRef } from 'react'

export default function ParticleCursor() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = this.getRandomColor()
        this.life = 100
      }

      getRandomColor() {
        const colors = [
          'rgba(0, 255, 255, 0.8)',
          'rgba(255, 0, 255, 0.8)',
          'rgba(0, 255, 136, 0.8)',
          'rgba(0, 136, 255, 0.8)',
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.size *= 0.95
        this.life -= 2
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Create multiple particles
      for (let i = 0; i < 3; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY))
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(particle => particle.life > 0)

      particles.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
