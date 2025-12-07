import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingShapes() {
  const groupRef = useRef()
  
  // Generate random shape data
  const shapes = useMemo(() => {
    const items = []
    const geometryTypes = ['icosahedron', 'octahedron', 'tetrahedron', 'torus']
    
    for (let i = 0; i < 12; i++) {
      const pos = [
        (Math.random() - 0.5) * 14,
        Math.random() * 6 - 1,
        (Math.random() - 0.5) * 10 - 3,
      ]
      const scale = Math.random() * 0.7 + 0.3
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]
      const rotationSpeed = (Math.random() - 0.5) * 0.5
      
      // Cycle through neon colors
      const color = i % 3 === 0 
        ? '#00FFFF' 
        : i % 3 === 1 
        ? '#FF00FF' 
        : '#00FF88'
      
      const type = geometryTypes[i % geometryTypes.length]
      
      items.push({ pos, scale, rotation, rotationSpeed, color, type })
    }
    return items
  }, [])

  // Gentle rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, idx) => (
        <mesh 
          key={idx} 
          position={shape.pos} 
          scale={shape.scale}
          rotation={shape.rotation}
          castShadow
          receiveShadow
        >
          {shape.type === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
          {shape.type === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 32]} />}
          
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={shape.color}
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            wireframe={idx % 4 === 0}
          />
        </mesh>
      ))}
    </group>
  )
}
