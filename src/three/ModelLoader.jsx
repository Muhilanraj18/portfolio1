import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { Html } from '@react-three/drei'

/**
 * Component to load and display a GLB/GLTF model
 * @param {string} url - URL to the .glb/.gltf file
 * @param {number} scale - Scale of the model
 * @param {array} position - Position [x, y, z]
 */
export function Model({ url, scale = 1, position = [0, 0, 0], ...props }) {
  const gltf = useGLTF(url)
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={scale} 
      position={position}
      {...props}
    />
  )
}

/**
 * Lazy-loaded model with Suspense fallback
 */
export function LazyModel({ url, fallbackText = 'Loading model...', ...props }) {
  return (
    <Suspense 
      fallback={
        <Html center>
          <div style={{ 
            color: '#00ffff', 
            fontSize: '0.9rem',
            textAlign: 'center',
            padding: '1rem'
          }}>
            {fallbackText}
          </div>
        </Html>
      }
    >
      <Model url={url} {...props} />
    </Suspense>
  )
}

/**
 * Preload a model for better performance
 */
export function preloadModel(url) {
  useGLTF.preload(url)
}

export default LazyModel
