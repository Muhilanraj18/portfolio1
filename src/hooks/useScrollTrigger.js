import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook to create GSAP ScrollTrigger animations
 * @param {Object} config - ScrollTrigger configuration
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export function useScrollTrigger(config, dependencies = []) {
  useEffect(() => {
    const trigger = ScrollTrigger.create(config)
    
    return () => {
      trigger.kill()
    }
  }, dependencies)
}

/**
 * Hook to track scroll progress
 * @returns {number} - Scroll progress from 0 to 1
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress(scrolled / scrollHeight)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}

export default useScrollTrigger
