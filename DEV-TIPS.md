# 💡 Development Tips & Best Practices

## 🎨 Customization Priority Order

Start with these files in order:

1. **`src/components/Hero.jsx`** - Your name and intro
2. **`src/components/About.jsx`** - Your bio and stats
3. **`src/components/Projects.jsx`** - Your actual projects
4. **`src/components/Contact.jsx`** - Social links
5. **`src/styles/variables.css`** - Color scheme
6. **`src/three/FloatingShapes.jsx`** - 3D visuals

## 🎯 Key Features Explained

### GSAP ScrollTrigger (Camera Movement)
- Located in: `src/three/CameraControls.jsx`
- Animates camera position as you scroll
- Adjust positions for each section (lines 25-55)

### Framer Motion (UI Animations)
- Used throughout all components
- Provides smooth transitions and hover effects
- Examples: Hero buttons, project cards, skill items

### Three.js Scene
- Main scene: `src/three/Scene.jsx`
- Lights: `src/three/Lights.jsx`
- Floating shapes: `src/three/FloatingShapes.jsx`

## 🚀 Performance Optimization

### 1. Optimize 3D Models
```bash
# Use gltf-pipeline to compress models
npm install -g gltf-pipeline

# Compress with Draco
gltf-pipeline -i input.glb -o output.glb -d
```

### 2. Image Optimization
```bash
# Install sharp for image processing
npm install -D sharp

# Convert to WebP
npx sharp-cli --input image.jpg --output image.webp
```

### 3. Lazy Load Components
```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 4. Monitor Performance
```jsx
// Add FPS counter (dev only)
import { Perf } from 'r3f-perf'

<Canvas>
  <Perf position="top-left" />
  {/* rest of scene */}
</Canvas>
```

## 🎨 Color Scheme Variations

### Cyberpunk Neon (Current)
```css
--neon-cyan: #00FFFF;
--neon-magenta: #FF00FF;
--neon-green: #00FF88;
```

### Ocean Blue
```css
--neon-cyan: #00D9FF;
--neon-magenta: #0088FF;
--neon-green: #00FFD9;
```

### Purple Haze
```css
--neon-cyan: #AA00FF;
--neon-magenta: #FF00AA;
--neon-green: #FF00FF;
```

### Sunset
```css
--neon-cyan: #FF6B35;
--neon-magenta: #F7931E;
--neon-green: #FDC500;
```

## 🔧 Useful VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - Quick React snippets
- **Prettier** - Code formatting
- **Auto Rename Tag** - Rename paired HTML/JSX tags
- **Color Highlight** - Preview colors in CSS
- **GLSL Literal** - Syntax highlighting for shaders
- **Three.js Snippets** - Three.js code snippets

## 🐛 Common Issues & Solutions

### Issue: 3D scene not visible
**Check:**
1. Camera position in Canvas component
2. Lights are added to scene
3. Models have materials assigned
4. Console for errors

### Issue: Scroll animations not working
**Solution:**
```jsx
// Make sure GSAP is registered
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Issue: Performance is slow
**Solutions:**
1. Reduce particle count in `<Stars />`
2. Lower shadow map resolution
3. Use fewer lights
4. Simplify 3D models
5. Add PerformanceMonitor from Drei

### Issue: Models not loading from URLs
**Check:**
1. CORS headers on hosting server
2. URL is accessible (test in browser)
3. File format is .glb or .gltf
4. Suspense wrapper is in place

## 📱 Mobile Optimization

### Detect Mobile
```jsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Or use window width
const isMobile = window.innerWidth < 768
```

### Adjust Quality
```jsx
// In Scene.jsx
const isMobile = window.innerWidth < 768

<Stars count={isMobile ? 1000 : 5000} />

<Canvas dpr={isMobile ? [1, 1] : [1, 2]}>
  {/* Lower pixel ratio on mobile */}
</Canvas>
```

### Disable Heavy Effects
```jsx
{!isMobile && <FloatingShapes />}
{!isMobile && <EffectComposer />}
```

## 🎬 Animation Tips

### Smooth Scroll Sync
```jsx
// In CameraControls.jsx
scrollTrigger: {
  scrub: 1, // Lower = faster, Higher = smoother
  start: 'top top',
  end: 'bottom bottom',
}
```

### Stagger Animations
```jsx
// In Skills.jsx
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.1 } // Delay between children
  }
}
```

### Spring Physics
```jsx
// Framer Motion spring
<motion.div
  animate={{ y: 0 }}
  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
/>
```

## 🔍 SEO Optimization

### Add to `index.html`
```html
<head>
  <!-- Primary Meta Tags -->
  <title>Your Name - 3D Developer Portfolio</title>
  <meta name="title" content="Your Name - 3D Developer Portfolio">
  <meta name="description" content="Interactive 3D portfolio showcasing web development projects">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/">
  <meta property="og:title" content="Your Name - 3D Developer Portfolio">
  <meta property="og:description" content="Interactive 3D portfolio">
  <meta property="og:image" content="https://yoursite.com/preview.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yoursite.com/">
  <meta property="twitter:title" content="Your Name - 3D Developer Portfolio">
  <meta property="twitter:description" content="Interactive 3D portfolio">
  <meta property="twitter:image" content="https://yoursite.com/preview.jpg">
</head>
```

## 🎓 Learning Resources

### Three.js
- [Three.js Journey](https://threejs-journey.com/) - Best Three.js course
- [Three.js Fundamentals](https://threejs.org/manual/)
- [Discover Three.js](https://discoverthreejs.com/)

### React Three Fiber
- [Official Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Examples](https://github.com/pmndrs/drei#readme)
- [Poimandres Discord](https://discord.gg/poimandres)

### GSAP
- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [GSAP Forum](https://greensock.com/forums/)

### WebGL Shaders
- [The Book of Shaders](https://thebookofshaders.com/)
- [Shader toy](https://www.shadertoy.com/)
- [GLSL Sandbox](http://glslsandbox.com/)

## 🎯 Project Ideas to Add

1. **Custom Cursor** - 3D cursor that follows mouse
2. **Parallax Layers** - Multiple depth layers
3. **Interactive Particles** - React to mouse movement
4. **Sound Reactive** - Animate with Web Audio API
5. **Dark/Light Mode** - Toggle theme
6. **Loading Progress** - Show asset loading percentage
7. **Easter Eggs** - Hidden interactions
8. **Keyboard Shortcuts** - Navigate with keyboard

## 📊 Testing Checklist

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Chrome Android
- [ ] Tablet (iPad)
- [ ] Slow 3G network
- [ ] Screen reader (NVDA/JAWS)
- [ ] Keyboard navigation only
- [ ] Reduced motion preference

## 🎉 Launch Checklist

- [ ] Replace all placeholder content
- [ ] Add real project screenshots
- [ ] Test all links
- [ ] Optimize all assets
- [ ] Run Lighthouse audit (score 90+)
- [ ] Add analytics
- [ ] Set up contact form backend
- [ ] Create custom 404 page
- [ ] Add sitemap.xml
- [ ] Test on multiple devices
- [ ] Share on social media

---

Happy coding! 🚀✨
