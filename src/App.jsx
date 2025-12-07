import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import Scene from './three/Scene'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import { motion } from 'framer-motion'

function LoadingFallback() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: '#0a0a0a',
      color: '#00FFFF',
      fontSize: '1.2rem',
      zIndex: 9999
    }}>
      <div>
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '1rem' }}>Loading 3D Experience...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-root">
      <Header />
      
      {/* Fixed 3D Canvas behind all content */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        camera={{ position: [0, 1.6, 6], fov: 50, near: 0.1, far: 100 }}
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Scrollable content overlay */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
