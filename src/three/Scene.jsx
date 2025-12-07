import React, { useMemo } from 'react'
import { OrbitControls, Stars, Float, Environment } from '@react-three/drei'
import Lights from './Lights'
import FloatingShapes from './FloatingShapes'
import CameraControls from './CameraControls'

export default function Scene() {
  return (
    <>
      {/* Environment and lighting */}
      <Lights />
      <Environment preset="night" />
      
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      {/* Floating 3D shapes */}
      <Float 
        speed={1.5} 
        rotationIntensity={0.6} 
        floatIntensity={0.8}
        floatingRange={[-0.5, 0.5]}
      >
        <FloatingShapes />
      </Float>

      {/* Camera animation controller */}
      <CameraControls />
      
      {/* OrbitControls disabled for scroll control, enable for debugging */}
      <OrbitControls 
        enabled={false} 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  )
}
