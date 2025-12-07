import React, { createContext, useContext, useState, useRef } from 'react'

const SoundContext = createContext()

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within SoundProvider')
  }
  return context
}

export function SoundProvider({ children }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const audioContextRef = useRef(null)

  // Initialize Web Audio API
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  const playSound = (frequency = 440, duration = 100, type = 'sine') => {
    if (!isSoundEnabled) return

    initAudioContext()
    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration / 1000
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
  }

  const sounds = {
    hover: () => playSound(600, 50, 'sine'),
    click: () => playSound(800, 100, 'square'),
    success: () => {
      playSound(523, 100, 'sine')
      setTimeout(() => playSound(659, 150, 'sine'), 100)
    },
    pop: () => playSound(1000, 80, 'sine'),
  }

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev)
    if (!isSoundEnabled) {
      initAudioContext()
      sounds.success()
    }
  }

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, sounds }}>
      {children}
    </SoundContext.Provider>
  )
}
