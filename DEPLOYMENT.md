# Deployment Guide

## 🚀 Vercel (Recommended - Easiest)

### Automatic Deployment
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Custom Domain (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. SSL certificate is automatic

### Environment Variables (if needed)
```bash
# In Vercel dashboard, add:
VITE_API_KEY=your_key_here
VITE_ANALYTICS_ID=your_id
```

---

## 📦 Netlify

### Via Git
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy

### Via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Custom Domain (Netlify)
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## 🐙 GitHub Pages

### Step 1: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/3d-dev-portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Update vite.config.js
```js
export default defineConfig({
  base: '/3d-dev-portfolio/', // Your repo name
  // ... rest of config
})
```

### Step 4: Deploy
```bash
npm run deploy
```

Your site will be at `https://yourusername.github.io/3d-dev-portfolio`

### Custom Domain (GitHub Pages)
1. Create `CNAME` file in `public/` folder with your domain
2. Update DNS A records to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

---

## ☁️ Cloudflare Pages

1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

**Benefits**: Free, fast CDN, automatic SSL

---

## 🔧 Build Optimization

### Production Build
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

### Build Size Analysis
```bash
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer()
  ]
})
```

---

## 🎯 Pre-Deployment Checklist

### 1. Content Updates
- [ ] Replace "Your Name" with actual name
- [ ] Update project descriptions and links
- [ ] Add real social media URLs
- [ ] Update contact email
- [ ] Customize about section

### 2. Performance
- [ ] Optimize images (use WebP, compress)
- [ ] Test 3D model file sizes (keep under 5MB)
- [ ] Check Lighthouse score (aim for 90+)
- [ ] Test on mobile devices
- [ ] Verify smooth 60 FPS performance

### 3. SEO
- [ ] Update `index.html` title and meta description
- [ ] Add Open Graph tags
- [ ] Create `robots.txt`
- [ ] Add `sitemap.xml`
- [ ] Set up Google Analytics (optional)

### 4. Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (desktop & mobile)
- [ ] Mobile browsers (iOS/Android)

### 5. Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Sufficient color contrast
- [ ] Reduced motion support

---

## 📊 Post-Deployment

### Analytics Setup (Optional)

#### Google Analytics 4
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Plausible (Privacy-friendly)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Performance Monitoring
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

---

## 🐛 Common Deployment Issues

### Issue: White screen after deployment
**Solution**: Check browser console, likely a base URL issue
```js
// vite.config.js
base: './' // Use relative paths
```

### Issue: 404 on refresh (SPA routing)
**Solution**: Add redirect rules

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (automatic, no config needed)

### Issue: CORS errors with 3D models
**Solution**: Host models on same domain or use CORS-enabled CDN

### Issue: Slow loading
**Solution**:
- Compress GLB models with Draco
- Use 2K textures instead of 4K
- Implement lazy loading
- Add loading states

---

## 🔐 Environment Variables

If you need API keys or secrets:

### Create `.env` file (don't commit!)
```env
VITE_FORM_API_KEY=your_key
VITE_ANALYTICS_ID=your_id
```

### Use in code
```js
const apiKey = import.meta.env.VITE_FORM_API_KEY
```

### Add to hosting platform
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- GitHub: Repository Settings → Secrets

---

## ✅ Success!

Your 3D portfolio is now live! 🎉

### Share it:
- Add to your resume
- Share on LinkedIn
- Submit to web design showcases
- Add to portfolio directories

### Showcase Sites:
- [Awwwards](https://www.awwwards.com/)
- [Behance](https://www.behance.net/)
- [Dribbble](https://dribbble.com/)
- [CSS Design Awards](https://www.cssdesignawards.com/)

---

Need help? Check the [README.md](./README.md) or open an issue!
