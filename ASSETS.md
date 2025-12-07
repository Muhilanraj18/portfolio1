# Asset Loading Examples

## External 3D Models (GLB/GLTF)

### Basic Usage
```jsx
import { LazyModel } from './three/ModelLoader'

function MyComponent() {
  return (
    <group>
      <LazyModel 
        url="https://raw.githubusercontent.com/user/repo/main/models/scene.glb"
        scale={2}
        position={[0, 0, 0]}
        fallbackText="Loading 3D model..."
      />
    </group>
  )
}
```

### Multiple Models
```jsx
const models = [
  { url: 'https://example.com/model1.glb', position: [0, 0, 0] },
  { url: 'https://example.com/model2.glb', position: [3, 0, 0] },
  { url: 'https://example.com/model3.glb', position: [-3, 0, 0] },
]

function Scene() {
  return (
    <>
      {models.map((model, index) => (
        <LazyModel 
          key={index}
          url={model.url}
          position={model.position}
          scale={1}
        />
      ))}
    </>
  )
}
```

### Preloading Models
```jsx
import { useEffect } from 'react'
import { preloadModel } from './three/ModelLoader'

function App() {
  useEffect(() => {
    // Preload important models on mount
    preloadModel('https://example.com/hero-model.glb')
    preloadModel('https://example.com/globe.glb')
  }, [])
  
  return <div>...</div>
}
```

## HDRI Environment Maps

### Using Poly Haven HDRIs
```jsx
import { Environment } from '@react-three/drei'

function Scene() {
  return (
    <>
      <Environment 
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr"
        background={false}
        blur={0.5}
      />
    </>
  )
}
```

### Multiple Environment Presets
```jsx
import { Environment } from '@react-three/drei'
import { useState } from 'react'

function Scene() {
  const [preset, setPreset] = useState('night')
  
  return (
    <Environment 
      preset={preset} // 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
      background={false}
    />
  )
}
```

## Textures from URLs

### PBR Textures
```jsx
import { useTexture } from '@react-three/drei'

function TexturedMesh() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    'https://example.com/textures/color.jpg',
    'https://example.com/textures/normal.jpg',
    'https://example.com/textures/roughness.jpg',
  ])
  
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  )
}
```

## Free Asset Resources

### 3D Models
- **Poly Haven Models**: https://polyhaven.com/models
  - Free, CC0 license
  - High quality, optimized
  - Direct download links

- **Sketchfab**: https://sketchfab.com/features/free-3d-models
  - Downloadable GLB format
  - Check license before use

- **Quaternius**: http://quaternius.com/
  - Free low-poly game assets
  - Perfect for web performance

- **Kenney**: https://kenney.nl/assets
  - Game assets, many 3D models
  - CC0 license

### HDRIs
- **Poly Haven**: https://polyhaven.com/hdris
  ```
  https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/[name]_2k.hdr
  ```
  
  Popular HDRIs:
  - `studio_small_08_2k.hdr`
  - `venice_sunset_2k.hdr`
  - `abandoned_parking_2k.hdr`
  - `royal_esplanade_2k.hdr`

### Textures
- **Poly Haven Textures**: https://polyhaven.com/textures
- **CC0 Textures**: https://cc0textures.com/

## Example: Complete 3D Scene with External Assets

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Html } from '@react-three/drei'
import { LazyModel } from './three/ModelLoader'

export default function CompleteScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <Suspense fallback={<Html center>Loading scene...</Html>}>
        {/* HDRI Environment */}
        <Environment 
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr"
          background={false}
        />
        
        {/* Main 3D Model */}
        <LazyModel 
          url="https://raw.githubusercontent.com/user/repo/main/models/laptop.glb"
          scale={0.5}
          position={[0, 0, 0]}
        />
        
        {/* Decorative Models */}
        <LazyModel 
          url="https://raw.githubusercontent.com/user/repo/main/models/plant.glb"
          scale={0.3}
          position={[2, 0, 0]}
        />
        
        <LazyModel 
          url="https://raw.githubusercontent.com/user/repo/main/models/coffee.glb"
          scale={0.4}
          position={[-2, 0.5, 0]}
        />
      </Suspense>
    </Canvas>
  )
}
```

## Performance Tips

1. **Use 2K textures max** for web (1024x1024 or 2048x2048)
2. **Compress models** with Draco compression
3. **Lazy load** non-critical assets
4. **Preload** hero section assets only
5. **Use lower resolution on mobile**

```jsx
const isMobile = window.innerWidth < 768
const hdriSize = isMobile ? '1k' : '2k'
```

## CORS Considerations

If you get CORS errors:
1. Host assets on your own domain
2. Use GitHub raw URLs (CORS-enabled)
3. Use Cloudflare R2 or similar CDN with CORS
4. Add proxy in vite.config.js if needed
