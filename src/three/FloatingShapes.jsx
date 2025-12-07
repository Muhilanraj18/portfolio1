import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function MorphingShape({ position }) {
  const meshRef = useRef()
  const [morphIndex, setMorphIndex] = useState(0)
  const timeRef = useRef(0)

  // Define different shape configurations
  const shapeConfigs = useMemo(() => [
    // Blob/Jelly shape
    {
      name: 'blob',
      color: '#00FFFF',
      createGeometry: () => {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32)
        const positions = geometry.attributes.position
        
        for (let i = 0; i < positions.count; i++) {
          const vertex = new THREE.Vector3()
          vertex.fromBufferAttribute(positions, i)
          
          const noise = Math.sin(vertex.x * 2) * Math.cos(vertex.y * 2) * 0.2
          vertex.multiplyScalar(1 + noise)
          
          positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
        }
        geometry.computeVertexNormals()
        return geometry
      }
    },
    // Teddy Bear-ish shape
    {
      name: 'bear',
      color: '#FF00FF',
      createGeometry: () => {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        
        // Head (sphere)
        const headRadius = 1.2
        for (let i = 0; i <= 16; i++) {
          for (let j = 0; j <= 16; j++) {
            const u = i / 16
            const v = j / 16
            const theta = u * Math.PI
            const phi = v * Math.PI * 2
            
            const x = headRadius * Math.sin(theta) * Math.cos(phi)
            const y = headRadius * Math.cos(theta) + 0.5
            const z = headRadius * Math.sin(theta) * Math.sin(phi)
            vertices.push(x, y, z)
          }
        }
        
        // Body (oval)
        const bodyRadiusX = 1.5
        const bodyRadiusY = 1.8
        for (let i = 0; i <= 16; i++) {
          for (let j = 0; j <= 16; j++) {
            const u = i / 16
            const v = j / 16
            const theta = u * Math.PI
            const phi = v * Math.PI * 2
            
            const x = bodyRadiusX * Math.sin(theta) * Math.cos(phi)
            const y = bodyRadiusY * Math.cos(theta) - 1.5
            const z = bodyRadiusX * Math.sin(theta) * Math.sin(phi)
            vertices.push(x, y, z)
          }
        }
        
        // Add ears (small spheres)
        const earRadius = 0.4
        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i <= 8; i++) {
            for (let j = 0; j <= 8; j++) {
              const u = i / 8
              const v = j / 8
              const theta = u * Math.PI
              const phi = v * Math.PI * 2
              
              const x = earRadius * Math.sin(theta) * Math.cos(phi) + side * 0.8
              const y = earRadius * Math.cos(theta) + 1.5
              const z = earRadius * Math.sin(theta) * Math.sin(phi)
              vertices.push(x, y, z)
            }
          }
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        geometry.computeVertexNormals()
        return geometry
      }
    },
    // Dragon/Monster shape
    {
      name: 'dragon',
      color: '#00FF88',
      createGeometry: () => {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        
        // Dragon body (elongated)
        for (let i = 0; i <= 20; i++) {
          for (let j = 0; j <= 16; j++) {
            const u = i / 20
            const v = j / 16
            const theta = u * Math.PI
            const phi = v * Math.PI * 2
            
            const scale = 1 - u * 0.3 // Taper towards tail
            const x = scale * 0.8 * Math.sin(theta) * Math.cos(phi)
            const y = 2.5 * Math.cos(theta)
            const z = scale * 0.8 * Math.sin(theta) * Math.sin(phi)
            
            // Add spikes along the back
            const spike = Math.sin(phi) > 0.9 ? Math.sin(u * Math.PI * 4) * 0.3 : 0
            
            vertices.push(x, y + spike, z)
          }
        }
        
        // Add wings (flat triangular shapes)
        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i <= 10; i++) {
            for (let j = 0; j <= 10; j++) {
              const u = i / 10
              const v = j / 10
              
              const x = side * (1.5 + u * 2)
              const y = 0.5 - v * 1.5
              const z = -u * 0.5
              
              vertices.push(x, y, z)
            }
          }
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        geometry.computeVertexNormals()
        return geometry
      }
    },
    // Star/Crystal shape
    {
      name: 'star',
      color: '#FFD700',
      createGeometry: () => {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        
        const points = 8
        const innerRadius = 0.8
        const outerRadius = 2
        const height = 2
        
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          
          const innerAngle = angle + Math.PI / points
          
          // Create star points in 3D
          const outerX = Math.cos(angle) * outerRadius
          const outerZ = Math.sin(angle) * outerRadius
          const innerX = Math.cos(innerAngle) * innerRadius
          const innerZ = Math.sin(innerAngle) * innerRadius
          
          for (let h = -1; h <= 1; h++) {
            const y = h * height / 2
            vertices.push(outerX, y, outerZ)
            vertices.push(innerX, y, innerZ)
          }
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        geometry.computeVertexNormals()
        return geometry
      }
    },
  ], [])

  const [currentGeometry, setCurrentGeometry] = useState(() => 
    shapeConfigs[0].createGeometry()
  )
  const [targetGeometry, setTargetGeometry] = useState(() => 
    shapeConfigs[1].createGeometry()
  )
  const [currentColor, setCurrentColor] = useState(shapeConfigs[0].color)
  const [targetColor, setTargetColor] = useState(shapeConfigs[1].color)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    timeRef.current += delta

    // Morph to next shape every 4 seconds
    if (timeRef.current > 4) {
      timeRef.current = 0
      const nextIndex = (morphIndex + 1) % shapeConfigs.length
      setMorphIndex(nextIndex)
      
      setCurrentGeometry(targetGeometry)
      setTargetGeometry(shapeConfigs[nextIndex].createGeometry())
      setCurrentColor(targetColor)
      setTargetColor(shapeConfigs[nextIndex].color)
    }

    // Gentle floating motion
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    
    // Slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2

    // Color transition
    const t = (timeRef.current / 4)
    if (meshRef.current.material) {
      const color1 = new THREE.Color(currentColor)
      const color2 = new THREE.Color(targetColor)
      const morphedColor = color1.clone().lerp(color2, t)
      meshRef.current.material.emissive = morphedColor
    }

    // Add subtle pulsing
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <bufferGeometry attach="geometry" {...currentGeometry} />
      <meshStandardMaterial
        color="#0a0a0a"
        emissive={currentColor}
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  const groupRef = useRef()
  
  // Keep some background shapes
  const backgroundShapes = useMemo(() => {
    const items = []
    const geometryTypes = ['icosahedron', 'octahedron', 'dodecahedron']
    
    for (let i = 0; i < 8; i++) {
      const pos = [
        (Math.random() - 0.5) * 14,
        Math.random() * 6 - 1,
        (Math.random() - 0.5) * 10 - 5,
      ]
      const scale = Math.random() * 0.5 + 0.2
      const color = ['#00FFFF', '#FF00FF', '#00FF88'][i % 3]
      const type = geometryTypes[i % geometryTypes.length]
      
      items.push({ pos, scale, color, type })
    }
    return items
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main morphing shape - positioned near contact form */}
      <MorphingShape position={[-4, 2, -2]} />
      
      {/* Background decorative shapes */}
      {backgroundShapes.map((shape, idx) => (
        <mesh 
          key={idx} 
          position={shape.pos} 
          scale={shape.scale}
          castShadow
        >
          {shape.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
          
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={shape.color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe={idx % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  )
}
