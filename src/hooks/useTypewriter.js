import { useState, useEffect } from 'react'

export default function useTypewriter(text, speed = 100, delay = 0) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(0)
      }, delay)
      return () => clearTimeout(delayTimeout)
    }
  }, [delay])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && text.length > 0) {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed])

  return { displayText, isComplete }
}
