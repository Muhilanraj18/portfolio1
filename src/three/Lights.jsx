import React from 'react'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

export default function Lights() {
  return (
    <>
      {/* Ambient light with cyan tint */}
      <ambientLight intensity={0.3} color="#00ffff" />
      
      {/* Main directional light (magenta) */}
      <directionalLight
        castShadow
        position={[5, 10, 7]}
        intensity={1.5}
        color="#ff00ff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light (green accent) */}
      <directionalLight 
        position={[-5, -3, -5]} 
        intensity={0.8} 
        color="#00ff88" 
      />
      
      {/* Rim light (cyan) */}
      <directionalLight 
        position={[0, 5, -8]} 
        intensity={0.6} 
        color="#00ffff" 
      />
      
      {/* Point lights for dynamic glow effect */}
      <pointLight 
        position={[-3, 2, 4]} 
        intensity={0.5} 
        color="#ff00ff" 
        distance={10}
        decay={2}
      />
      
      <pointLight 
        position={[3, -1, -4]} 
        intensity={0.4} 
        color="#00ffff" 
        distance={8}
        decay={2}
      />
    </>
  )
}
