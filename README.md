# 🌌 3D Developer Portfolio

A modern, interactive 3D portfolio built with React, Three.js, and cutting-edge web technologies.

## ✨ Features

- **Immersive 3D Experience**: Full-screen Three.js background with floating shapes and lighting
- **Smooth Scroll Animations**: GSAP ScrollTrigger for camera parallax and section transitions
- **Interactive Components**: Framer Motion for butter-smooth UI transitions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Optimized**: Lazy loading, Suspense, and 60 FPS target
- **Neon Cyber Theme**: Dark background with glowing accent colors (#00FFFF, #FF00FF, #00FF88)

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **GSAP** - Advanced animation library
- **Framer Motion** - React animation library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Project Structure

```
3d-dev-portfolio/
├── src/
│   ├── components/         # React UI components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── three/             # Three.js scene components
│   │   ├── Scene.jsx
│   │   ├── Lights.jsx
│   │   ├── FloatingShapes.jsx
│   │   ├── ModelLoader.jsx
│   │   └── CameraControls.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useScrollTrigger.js
│   │   └── usePrefersReducedMotion.js
│   ├── styles/            # CSS files
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## 🎯 Sections

1. **Hero** - Full 3D background with floating shapes and call-to-action
2. **About** - Smooth camera pan revealing developer introduction
3. **Skills** - Floating 3D tech stack icons with interactive hover effects
4. **Projects** - 3D project cards with hover animations
5. **Contact** - Interactive 3D form with animated globe

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### GitHub Pages
```bash
# Deploy to GitHub Pages
npm run deploy
```

## 🎨 Customization

### Colors
Edit `src/styles/variables.css` to change the neon color scheme:
```css
--neon-cyan: #00FFFF;
--neon-magenta: #FF00FF;
--neon-green: #00FF88;
```

### 3D Assets
Replace model URLs in components with your own:
- `src/three/ModelLoader.jsx` - GLB model loading
- Use free assets from [Poly Haven](https://polyhaven.com/), [Sketchfab](https://sketchfab.com/), or host your own

### Personal Info
Update the following files:
- `src/components/Hero.jsx` - Name and title
- `src/components/About.jsx` - Bio and description
- `src/components/Skills.jsx` - Tech stack
- `src/components/Projects.jsx` - Portfolio projects

## ⚡ Performance Tips

- Models are lazy-loaded with Suspense
- Geometries and materials use `useMemo`
- Optimized shadow maps (2048x2048)
- Compressed textures recommended (KTX2, Draco GLB)
- Mobile-specific fallbacks included

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers with WebGL 2.0 support

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

- Three.js community
- React Three Fiber team
- GSAP by GreenSock
- Framer Motion by Framer

---

Built with 💜 by [Your Name]
