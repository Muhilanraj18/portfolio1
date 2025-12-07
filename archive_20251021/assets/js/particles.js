// ===== ADVANCED PARTICLE SYSTEM =====

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) {
            console.error('Particle container not found');
            return;
        }
        
        // Default configuration
        this.config = {
            particleCount: 100,
            particleSize: { min: 1, max: 4 },
            particleColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
            particleSpeed: { min: 0.5, max: 2 },
            particleLife: { min: 3000, max: 8000 },
            gravity: 0.1,
            wind: 0.02,
            interactive: true,
            mouseRadius: 100,
            mouseForce: 0.2,
            connectionDistance: 120,
            showConnections: true,
            respawn: true,
            shape: 'circle', // circle, square, triangle, custom
            blendMode: 'normal',
            opacity: { min: 0.3, max: 0.8 },
            ...options
        };
        
        this.particles = [];
        this.mouse = { x: 0, y: 0, isMoving: false };
        this.animationId = null;
        this.isRunning = false;
        
        this.setupCanvas();
        this.bindEvents();
        this.init();
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: ${this.config.interactive ? 'auto' : 'none'};
            z-index: 1;
        `;
        
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);
        
        this.resize();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
        
        // Update pixel density for retina displays
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx.scale(dpr, dpr);
    }
    
    bindEvents() {
        if (this.config.interactive) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                this.mouse.isMoving = true;
                
                clearTimeout(this.mouseTimeout);
                this.mouseTimeout = setTimeout(() => {
                    this.mouse.isMoving = false;
                }, 100);
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.isMoving = false;
            });
            
            this.canvas.addEventListener('click', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.explodeAt(e.clientX - rect.left, e.clientY - rect.top);
            });
        }
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.createParticles();
        this.start();
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle(x, y) {
        const colors = this.config.particleColor;
        const color = Array.isArray(colors) ? colors[Math.floor(Math.random() * colors.length)] : colors;
        
        return {
            x: x !== undefined ? x : Math.random() * this.width,
            y: y !== undefined ? y : Math.random() * this.height,
            vx: (Math.random() - 0.5) * (this.config.particleSpeed.max - this.config.particleSpeed.min) + this.config.particleSpeed.min,
            vy: (Math.random() - 0.5) * (this.config.particleSpeed.max - this.config.particleSpeed.min) + this.config.particleSpeed.min,
            size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
            originalSize: 0,
            color: color,
            opacity: Math.random() * (this.config.opacity.max - this.config.opacity.min) + this.config.opacity.min,
            life: Math.random() * (this.config.particleLife.max - this.config.particleLife.min) + this.config.particleLife.min,
            maxLife: 0,
            angle: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            trail: [],
            connections: []
        };
    }
    
    updateParticle(particle) {
        // Store original values for reset
        if (!particle.originalSize) particle.originalSize = particle.size;
        if (!particle.maxLife) particle.maxLife = particle.life;
        
        // Apply physics
        particle.vy += this.config.gravity;
        particle.vx += this.config.wind;
        
        // Mouse interaction
        if (this.config.interactive && this.mouse.isMoving) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseRadius) {
                const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                const angle = Math.atan2(dy, dx);
                
                particle.vx -= Math.cos(angle) * force * this.config.mouseForce;
                particle.vy -= Math.sin(angle) * force * this.config.mouseForce;
                
                // Change size based on proximity
                particle.size = particle.originalSize * (1 + force);
            }
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update rotation
        particle.angle += particle.rotationSpeed;
        
        // Update trail
        if (particle.trail) {
            particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
            if (particle.trail.length > 5) {
                particle.trail.shift();
            }
        }
        
        // Update life and opacity
        particle.life--;
        particle.opacity = (particle.life / particle.maxLife) * 0.8;
        
        // Boundary checking and wrapping
        if (particle.x < 0) particle.x = this.width;
        if (particle.x > this.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.height;
        if (particle.y > this.height) particle.y = 0;
        
        // Reset particle if life is over
        if (particle.life <= 0 && this.config.respawn) {
            const newParticle = this.createParticle();
            Object.assign(particle, newParticle);
        }
    }
    
    drawParticle(particle) {
        this.ctx.save();
        
        // Set blend mode
        this.ctx.globalCompositeOperation = this.config.blendMode;
        
        // Set opacity
        this.ctx.globalAlpha = particle.opacity;
        
        // Move to particle position
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.angle);
        
        // Set color
        this.ctx.fillStyle = particle.color;
        this.ctx.strokeStyle = particle.color;
        
        // Draw based on shape
        switch (this.config.shape) {
            case 'circle':
                this.drawCircle(particle);
                break;
            case 'square':
                this.drawSquare(particle);
                break;
            case 'triangle':
                this.drawTriangle(particle);
                break;
            case 'star':
                this.drawStar(particle);
                break;
            case 'diamond':
                this.drawDiamond(particle);
                break;
            default:
                this.drawCircle(particle);
        }
        
        this.ctx.restore();
        
        // Draw trail if enabled
        if (particle.trail && particle.trail.length > 1) {
            this.drawTrail(particle.trail);
        }
    }
    
    drawCircle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow effect
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawSquare(particle) {
        const size = particle.size;
        this.ctx.fillRect(-size/2, -size/2, size, size);
    }
    
    drawTriangle(particle) {
        const size = particle.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(-size, size);
        this.ctx.lineTo(size, size);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawStar(particle) {
        const size = particle.size;
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.5;
        
        this.ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (spikes * 2)) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawDiamond(particle) {
        const size = particle.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(0, size);
        this.ctx.lineTo(-size, 0);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawTrail(trail) {
        this.ctx.save();
        
        for (let i = 1; i < trail.length; i++) {
            const current = trail[i];
            const previous = trail[i - 1];
            const opacity = (i / trail.length) * current.opacity * 0.3;
            
            this.ctx.globalAlpha = opacity;
            this.ctx.strokeStyle = current.color || '#ffffff';
            this.ctx.lineWidth = 1;
            
            this.ctx.beginPath();
            this.ctx.moveTo(previous.x, previous.y);
            this.ctx.lineTo(current.x, current.y);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    drawConnections() {
        if (!this.config.showConnections) return;
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.2;
                    this.ctx.globalAlpha = opacity;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.restore();
    }
    
    explodeAt(x, y) {
        const explosionCount = 15;
        const explosionForce = 5;
        
        for (let i = 0; i < explosionCount; i++) {
            const angle = (i / explosionCount) * Math.PI * 2;
            const particle = this.createParticle(x, y);
            
            particle.vx = Math.cos(angle) * explosionForce;
            particle.vy = Math.sin(angle) * explosionForce;
            particle.life = particle.maxLife * 0.5;
            particle.size *= 1.5;
            
            this.particles.push(particle);
        }
        
        // Remove excess particles
        if (this.particles.length > this.config.particleCount * 2) {
            this.particles.splice(0, explosionCount);
        }
    }
    
    addBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            const particle = this.createParticle(x, y);
            
            particle.vx = Math.cos(angle) * speed;
            particle.vy = Math.sin(angle) * speed;
            
            this.particles.push(particle);
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            this.updateParticle(particle);
            this.drawParticle(particle);
            
            // Remove dead particles if respawn is disabled
            if (!this.config.respawn && particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        // Draw connections between particles
        this.drawConnections();
        
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    pause() {
        this.stop();
    }
    
    resume() {
        if (!this.isRunning) {
            this.start();
        }
    }
    
    clear() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        // Recreate particles if count changed
        if (newConfig.particleCount && newConfig.particleCount !== this.particles.length) {
            this.createParticles();
        }
    }
    
    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.particles = [];
    }
}

// ===== MOTION GRAPHICS CONTROLLER =====
class MotionGraphicsController {
    constructor() {
        this.particleSystems = new Map();
        this.init();
    }
    
    init() {
        this.initParticleSystems();
        this.initGeometricAnimations();
        this.initFlowFields();
        this.bindEvents();
    }
    
    initParticleSystems() {
        // Hero section particles
        const heroParticles = document.getElementById('heroParticles');
        if (heroParticles) {
            const heroSystem = new ParticleSystem(heroParticles, {
                particleCount: 60,
                particleSize: { min: 2, max: 6 },
                particleColor: ['rgba(255,255,255,0.8)', 'rgba(102,126,234,0.6)', 'rgba(240,147,251,0.6)'],
                particleSpeed: { min: 0.2, max: 1 },
                gravity: 0.02,
                wind: 0.005,
                interactive: true,
                mouseRadius: 120,
                showConnections: true,
                connectionDistance: 100,
                shape: 'circle'
            });
            
            this.particleSystems.set('hero', heroSystem);
        }
        
        // Loading particles
        const loadingParticles = document.getElementById('loadingParticles');
        if (loadingParticles) {
            const loadingSystem = new ParticleSystem(loadingParticles, {
                particleCount: 30,
                particleSize: { min: 1, max: 3 },
                particleColor: ['rgba(255,255,255,0.9)'],
                particleSpeed: { min: 0.5, max: 1.5 },
                gravity: 0,
                wind: 0,
                interactive: false,
                showConnections: false,
                shape: 'circle'
            });
            
            this.particleSystems.set('loading', loadingSystem);
        }
        
        // Skills section particles
        document.querySelectorAll('.skill-category').forEach((category, index) => {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'skill-particles';
            particleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            category.style.position = 'relative';
            category.appendChild(particleContainer);
            
            const skillSystem = new ParticleSystem(particleContainer, {
                particleCount: 15,
                particleSize: { min: 1, max: 2 },
                particleColor: ['rgba(102,126,234,0.4)', 'rgba(118,75,162,0.4)'],
                particleSpeed: { min: 0.1, max: 0.5 },
                gravity: -0.01,
                wind: 0,
                interactive: false,
                showConnections: false,
                shape: 'circle'
            });
            
            this.particleSystems.set(`skill-${index}`, skillSystem);
            
            // Show particles on hover
            category.addEventListener('mouseenter', () => {
                particleContainer.style.opacity = '1';
                skillSystem.addBurst(
                    particleContainer.offsetWidth / 2,
                    particleContainer.offsetHeight / 2,
                    5
                );
            });
            
            category.addEventListener('mouseleave', () => {
                particleContainer.style.opacity = '0';
            });
        });
    }
    
    initGeometricAnimations() {
        this.createFloatingShapes();
        this.createMorphingBackgrounds();
    }
    
    createFloatingShapes() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index % 2 === 0) { // Add shapes to every other section
                this.addFloatingShapesToSection(section);
            }
        });
    }
    
    addFloatingShapesToSection(section) {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes-container';
        shapesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
        `;
        
        section.style.position = 'relative';
        section.appendChild(shapesContainer);
        
        // Create various geometric shapes
        const shapes = ['circle', 'square', 'triangle', 'diamond'];
        const shapeCount = 5;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 60 + 20;
            const animationDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            shape.className = `floating-shape ${shapeType}`;
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                opacity: 0.1;
                animation: floatingShape ${animationDuration}s linear infinite ${delay}s;
                background: linear-gradient(45deg, #667eea, #764ba2);
            `;
            
            // Position randomly
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            
            // Shape-specific styles
            switch (shapeType) {
                case 'circle':
                    shape.style.borderRadius = '50%';
                    break;
                case 'triangle':
                    shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                    break;
                case 'diamond':
                    shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                    break;
            }
            
            shapesContainer.appendChild(shape);
        }
        
        // Add CSS animation if not exists
        if (!document.querySelector('#floatingShapeStyle')) {
            const style = document.createElement('style');
            style.id = 'floatingShapeStyle';
            style.textContent = `
                @keyframes floatingShape {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-100px) rotate(180deg);
                    }
                    100% {
                        transform: translateY(0px) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createMorphingBackgrounds() {
        const morphingSections = document.querySelectorAll('.hero-section, .ar-vr-section');
        
        morphingSections.forEach(section => {
            this.addMorphingBackground(section);
        });
    }
    
    addMorphingBackground(section) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.3;
        `;
        
        section.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        this.animateMorphingBackground(ctx, canvas);
    }
    
    animateMorphingBackground(ctx, canvas) {
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create flowing organic shapes
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            for (let i = 0; i < 3; i++) {
                const offset = i * (Math.PI * 2 / 3);
                const x = centerX + Math.sin(time * 0.01 + offset) * 100;
                const y = centerY + Math.cos(time * 0.008 + offset) * 80;
                const radius = 50 + Math.sin(time * 0.02 + offset) * 30;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `hsla(${240 + i * 60}, 70%, 60%, 0.3)`);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            time++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    initFlowFields() {
        // Create flow field effects for portfolio section
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            this.createFlowField(portfolioSection);
        }
    }
    
    createFlowField(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.2;
        `;
        
        container.style.position = 'relative';
        container.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        this.animateFlowField(ctx, canvas);
    }
    
    animateFlowField(ctx, canvas) {
        const particles = [];
        const particleCount = 100;
        
        // Initialize flow particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: 0,
                vy: 0,
                history: []
            });
        }
        
        let time = 0;
        
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Calculate flow field
                const angle = Math.sin(particle.x * 0.01) * Math.cos(particle.y * 0.01) + time * 0.01;
                
                particle.vx = Math.cos(angle) * 0.5;
                particle.vy = Math.sin(angle) * 0.5;
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Add to history
                particle.history.push({ x: particle.x, y: particle.y });
                if (particle.history.length > 20) {
                    particle.history.shift();
                }
                
                // Draw trail
                ctx.strokeStyle = 'rgba(102, 126, 234, 0.5)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                
                particle.history.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                
                ctx.stroke();
            });
            
            time++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    bindEvents() {
        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAll();
            } else {
                this.resumeAll();
            }
        });
        
        // Optimize for mobile
        if (window.innerWidth < 768) {
            this.optimizeForMobile();
        }
    }
    
    optimizeForMobile() {
        // Reduce particle count for better performance
        this.particleSystems.forEach(system => {
            system.updateConfig({
                particleCount: Math.floor(system.config.particleCount * 0.5),
                showConnections: false
            });
        });
    }
    
    pauseAll() {
        this.particleSystems.forEach(system => system.pause());
    }
    
    resumeAll() {
        this.particleSystems.forEach(system => system.resume());
    }
    
    destroyAll() {
        this.particleSystems.forEach(system => system.destroy());
        this.particleSystems.clear();
    }
    
    // Public API
    getSystem(name) {
        return this.particleSystems.get(name);
    }
    
    addSystem(name, container, options) {
        const system = new ParticleSystem(container, options);
        this.particleSystems.set(name, system);
        return system;
    }
    
    removeSystem(name) {
        const system = this.particleSystems.get(name);
        if (system) {
            system.destroy();
            this.particleSystems.delete(name);
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.motionGraphicsController = new MotionGraphicsController();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem, MotionGraphicsController };
}