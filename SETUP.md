# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## Installation

### 1. Navigate to project directory
```bash
cd 3d-dev-portfolio
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📝 Customization Guide

### Personal Information
1. **Hero Section** (`src/components/Hero.jsx`)
   - Line 37: Change "Your Name" to your actual name
   - Line 51: Update your title/role

2. **About Section** (`src/components/About.jsx`)
   - Lines 69-89: Update your bio and description
   - Lines 101-117: Modify stats (years, projects, clients)

3. **Skills Section** (`src/components/Skills.jsx`)
   - Lines 5-17: Add/remove/modify your tech stack

4. **Projects Section** (`src/components/Projects.jsx`)
   - Lines 5-65: Replace with your actual projects
   - Update titles, descriptions, images, tech stack, and links

5. **Contact Section** (`src/components/Contact.jsx`)
   - Lines 207-212: Update social media links
   - Consider integrating a real form backend (FormSpree, Netlify Forms, etc.)

### Colors
Edit `src/styles/variables.css` to change the neon color scheme:
```css
--neon-cyan: #00FFFF;
--neon-magenta: #FF00FF;
--neon-green: #00FF88;
```

### 3D Scene
Modify `src/three/FloatingShapes.jsx` to:
- Change number of shapes (line 15)
- Adjust colors and geometry types
- Modify animation speed and behavior

## 🎨 Adding External 3D Models

### Loading a GLB Model
```jsx
import { LazyModel } from './three/ModelLoader'

// In your component
<LazyModel 
  url="https://your-cdn.com/model.glb" 
  scale={1.5}
  position={[0, 0, 0]}
/>
```

### Free 3D Model Resources
- [Poly Haven](https://polyhaven.com/models) - Free PBR models
- [Sketchfab](https://sketchfab.com/features/free-3d-models) - Thousands of free models
- [Quaternius](http://quaternius.com/) - Low-poly game assets

### HDRI Environments
Add HDR lighting in `src/three/Scene.jsx`:
```jsx
<Environment 
  files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr"
  background={false}
/>
```

## 📱 Mobile Optimization

The portfolio is responsive, but you can further optimize:

1. **Reduce particle count** in `src/three/Scene.jsx` (line 23)
2. **Disable heavy effects** on mobile using:
```jsx
const isMobile = window.innerWidth < 768
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/3d-dev-portfolio"

# Deploy
npm run deploy
```

### Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

## 🐛 Troubleshooting

### Three.js Performance Issues
- Reduce shadow quality in `src/three/Lights.jsx`
- Lower particle count in Stars component
- Use lower-resolution textures

### CORS Errors with Models
- Host models on your own domain
- Use CORS-enabled CDNs (GitHub raw, Cloudflare R2)
- Add CORS headers to your hosting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helper Components](https://github.com/pmndrs/drei)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Framer Motion](https://www.framer.com/motion/)

## 🎯 Next Steps

1. Replace placeholder content with your information
2. Add your actual projects with live links
3. Integrate a real contact form backend
4. Optimize 3D assets for production
5. Add Google Analytics or privacy-friendly alternative
6. Set up custom domain
7. Submit to web design showcases

## 💡 Tips

- Keep GLB models under 5MB for fast loading
- Test on multiple devices and browsers
- Use Chrome DevTools Performance tab to profile
- Consider adding a loading screen for slower connections
- Add meta tags for better SEO and social sharing

---

Built with ❤️ using React, Three.js, and modern web technologies.
