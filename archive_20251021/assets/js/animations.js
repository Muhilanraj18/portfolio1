// ===== ADVANCED ANIMATIONS CONTROLLER =====

class AnimationController {
    constructor() {
        this.isGSAPAvailable = typeof gsap !== 'undefined';
        this.animationQueue = [];
        this.activeAnimations = new Set();
        this.intersectionObserver = null;
        this.init();
    }

    init() {
        this.setupGSAP();
        this.setupScrollAnimations();
        this.setupTextAnimations();
        this.setupMorphingAnimations();
        this.setupParticleAnimations();
        this.setupHoverAnimations();
        this.bindEvents();
    }

    setupGSAP() {
        if (this.isGSAPAvailable) {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            
            // Set default GSAP settings
            gsap.defaults({
                duration: 0.8,
                ease: "power2.out"
            });
            
            // Create master timeline
            this.masterTimeline = gsap.timeline();
        }
    }

    // ===== SCROLL TRIGGERED ANIMATIONS =====
    setupScrollAnimations() {
        if (!this.isGSAPAvailable) return;
        
        // Hero section parallax
        gsap.to('.hero-background', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Section reveals
        gsap.utils.toArray('.reveal-text').forEach((element, index) => {
            gsap.from(element, {
                y: 100,
                opacity: 0,
                duration: 1,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Skills section animations
        gsap.utils.toArray('.skill-category').forEach((card, index) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                rotation: 5,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Portfolio items staggered animation
        gsap.from('.portfolio-item', {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: "top 80%",
                end: "bottom 20%"
            }
        });
        
        // Contact section slide in
        gsap.from('.contact-content', {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-section',
                start: "top 70%"
            }
        });
    }

    // ===== TEXT ANIMATIONS =====
    setupTextAnimations() {
        this.initTypewriterEffect();
        this.initTextRevealAnimations();
        this.initLetterAnimations();
        this.initGlitchEffect();
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-text') || element.textContent;
            element.textContent = '';
            
            if (this.isGSAPAvailable) {
                gsap.to(element, {
                    duration: 2,
                    text: {
                        value: text,
                        delimiter: ""
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            } else {
                this.fallbackTypewriter(element, text);
            }
        });
    }

    fallbackTypewriter(element, text) {
        let index = 0;
        const typeSpeed = 50;
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typeSpeed);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeChar();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    }

    initTextRevealAnimations() {
        const revealElements = document.querySelectorAll('.text-reveal');
        
        revealElements.forEach(element => {
            this.createTextRevealEffect(element);
        });
    }

    createTextRevealEffect(element) {
        const text = element.textContent;
        element.innerHTML = `<span class="reveal-mask">${text}</span>`;
        
        if (this.isGSAPAvailable) {
            const mask = element.querySelector('.reveal-mask');
            
            gsap.from(mask, {
                y: '100%',
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                }
            });
        }
    }

    initLetterAnimations() {
        const letterElements = document.querySelectorAll('.text-animate-letters');
        
        letterElements.forEach(element => {
            this.wrapLetters(element);
            this.animateLetters(element);
        });
    }

    wrapLetters(element) {
        const text = element.textContent;
        element.innerHTML = text.split('').map(char => 
            char === ' ' ? '&nbsp;' : `<span class="letter">${char}</span>`
        ).join('');
    }

    animateLetters(element) {
        const letters = element.querySelectorAll('.letter');
        
        if (this.isGSAPAvailable) {
            gsap.from(letters, {
                y: 50,
                opacity: 0,
                rotationX: 90,
                duration: 0.6,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                }
            });
        } else {
            letters.forEach((letter, index) => {
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    letter.style.transition = 'all 0.6s ease';
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    }

    initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            this.setupGlitchAnimation(element);
        });
    }

    setupGlitchAnimation(element) {
        const text = element.getAttribute('data-text') || element.textContent;
        element.setAttribute('data-text', text);
        
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.triggerGlitch(element);
            }
        }, 100);
        
        // Hover trigger
        element.addEventListener('mouseenter', () => {
            this.triggerGlitch(element);
        });
    }

    triggerGlitch(element) {
        element.classList.add('glitch-active');
        
        // Scramble effect
        const originalText = element.textContent;
        const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iteration = 0;
        
        const scrambleInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join('');
            
            iteration += 1 / 3;
            
            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
                element.textContent = originalText;
                element.classList.remove('glitch-active');
            }
        }, 30);
    }

    // ===== MORPHING ANIMATIONS =====
    setupMorphingAnimations() {
        this.initMorphingShapes();
        this.initLiquidButtons();
        this.initFluidBackgrounds();
    }

    initMorphingShapes() {
        const morphingElements = document.querySelectorAll('.animate-morph');
        
        morphingElements.forEach(element => {
            if (this.isGSAPAvailable) {
                gsap.to(element, {
                    morphSVG: this.generateRandomPath(),
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            } else {
                element.style.animation = 'morph 4s ease-in-out infinite';
            }
        });
    }

    generateRandomPath() {
        // Generate random SVG path for morphing
        const points = [];
        for (let i = 0; i < 8; i++) {
            points.push({
                x: Math.random() * 100,
                y: Math.random() * 100
            });
        }
        
        return this.createSmoothPath(points);
    }

    createSmoothPath(points) {
        let path = `M ${points[0].x} ${points[0].y}`;
        
        for (let i = 1; i < points.length; i++) {
            const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
            const cp1y = points[i - 1].y + (points[i].y - points[i - 1].y) / 3;
            const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
            const cp2y = points[i].y - (points[i].y - points[i - 1].y) / 3;
            
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
        }
        
        return path + ' Z';
    }

    initLiquidButtons() {
        const liquidButtons = document.querySelectorAll('.btn-liquid');
        
        liquidButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createLiquidEffect(button);
            });
        });
    }

    createLiquidEffect(button) {
        const liquid = document.createElement('div');
        liquid.classList.add('liquid-effect');
        liquid.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: inherit;
            pointer-events: none;
            animation: liquidMotion 2s ease-in-out;
        `;
        
        button.style.position = 'relative';
        button.appendChild(liquid);
        
        setTimeout(() => {
            liquid.remove();
        }, 2000);
    }

    initFluidBackgrounds() {
        const fluidElements = document.querySelectorAll('.fluid-bg');
        
        fluidElements.forEach(element => {
            this.createFluidBackground(element);
        });
    }

    createFluidBackground(element) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(canvas);
        
        this.animateFluidBackground(ctx, canvas);
    }

    animateFluidBackground(ctx, canvas) {
        const particles = [];
        const particleCount = 50;
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 60 + 180}, 70%, 50%)`
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off walls
                if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = 0.6;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ===== PARTICLE ANIMATIONS =====
    setupParticleAnimations() {
        this.initCustomParticles();
        this.initInteractiveParticles();
        this.initTrailEffect();
    }

    initCustomParticles() {
        const particleContainers = document.querySelectorAll('.custom-particles');
        
        particleContainers.forEach(container => {
            this.createCustomParticleSystem(container);
        });
    }

    createCustomParticleSystem(container) {
        const particleCount = 100;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            
            particles.push({
                element: particle,
                x: Math.random() * container.offsetWidth,
                y: Math.random() * container.offsetHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random()
            });
        }
        
        this.animateCustomParticles(particles, container);
    }

    animateCustomParticles(particles, container) {
        const animate = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.01;
                
                // Reset particle if it dies or goes off screen
                if (particle.life <= 0 || 
                    particle.x < 0 || particle.x > container.offsetWidth ||
                    particle.y < 0 || particle.y > container.offsetHeight) {
                    
                    particle.x = Math.random() * container.offsetWidth;
                    particle.y = Math.random() * container.offsetHeight;
                    particle.life = 1;
                }
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.life;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initInteractiveParticles() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) {
                this.createMouseParticle(e.clientX, e.clientY);
            }
        });
        
        document.addEventListener('click', (e) => {
            this.createClickExplosion(e.clientX, e.clientY);
        });
    }

    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #667eea, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: mouseParticle 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Add CSS animation if not exists
        if (!document.querySelector('#mouseParticleStyle')) {
            const style = document.createElement('style');
            style.id = 'mouseParticleStyle';
            style.textContent = `
                @keyframes mouseParticle {
                    0% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => particle.remove(), 1000);
    }

    createClickExplosion(x, y) {
        const explosionCount = 12;
        
        for (let i = 0; i < explosionCount; i++) {
            const particle = document.createElement('div');
            const angle = (i / explosionCount) * Math.PI * 2;
            const velocity = 100;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #f093fb, #f5576c);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(particle);
            
            if (this.isGSAPAvailable) {
                gsap.to(particle, {
                    duration: 0.8,
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity,
                    scale: 0,
                    opacity: 0,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                });
            } else {
                particle.style.transition = 'all 0.8s ease-out';
                particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`;
                particle.style.opacity = '0';
                
                setTimeout(() => particle.remove(), 800);
            }
        }
    }

    initTrailEffect() {
        let mouseTrail = [];
        const maxTrailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }
            
            this.updateTrailEffect(mouseTrail);
        });
    }

    updateTrailEffect(trail) {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            const opacity = (index + 1) / trail.length * 0.5;
            const size = (index + 1) / trail.length * 20;
            
            trailElement.classList.add('mouse-trail');
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(102, 126, 234, ${opacity}), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailElement);
            
            // Auto remove after animation
            setTimeout(() => trailElement.remove(), 100);
        });
    }

    // ===== HOVER ANIMATIONS =====
    setupHoverAnimations() {
        this.initMagneticEffect();
        this.initTiltEffect();
        this.initGlowEffect();
    }

    initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                
                if (this.isGSAPAvailable) {
                    gsap.to(element, {
                        duration: 0.3,
                        x: x * strength,
                        y: y * strength,
                        ease: 'power2.out'
                    });
                } else {
                    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (this.isGSAPAvailable) {
                    gsap.to(element, {
                        duration: 0.5,
                        x: 0,
                        y: 0,
                        ease: 'elastic.out(1, 0.3)'
                    });
                } else {
                    element.style.transform = 'translate(0px, 0px)';
                }
            });
        });
    }

    initTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    initGlowEffect() {
        const glowElements = document.querySelectorAll('.glow-effect');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
                element.style.transition = 'box-shadow 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = 'none';
            });
        });
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Performance optimized scroll
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Resize handling
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Reduced motion support
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }

    handleScroll() {
        // Update scroll-dependent animations
        const scrollY = window.pageYOffset;
        
        // Update parallax elements
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update progress indicators
        this.updateScrollProgress();
    }

    handleResize() {
        // Recalculate animation triggers
        if (this.isGSAPAvailable && ScrollTrigger) {
            ScrollTrigger.refresh();
        }
        
        // Update particle systems
        this.updateParticleSystems();
    }

    updateScrollProgress() {
        const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        document.querySelectorAll('.scroll-progress').forEach(element => {
            element.style.width = scrollPercent + '%';
        });
    }

    updateParticleSystems() {
        // Refresh particle systems on resize
        document.querySelectorAll('.custom-particles').forEach(container => {
            // Clear existing particles
            container.innerHTML = '';
            // Recreate particle system
            this.createCustomParticleSystem(container);
        });
    }

    disableAnimations() {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== UTILITY METHODS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== PUBLIC API =====
    playAnimation(animationName, target, options = {}) {
        if (!this.isGSAPAvailable) return;
        
        const animations = {
            fadeIn: () => gsap.from(target, { opacity: 0, duration: 0.5, ...options }),
            slideUp: () => gsap.from(target, { y: 50, opacity: 0, duration: 0.8, ...options }),
            scale: () => gsap.from(target, { scale: 0, duration: 0.6, ease: 'back.out(1.7)', ...options }),
            rotate: () => gsap.to(target, { rotation: 360, duration: 1, ...options }),
            bounce: () => gsap.to(target, { y: -20, duration: 0.3, yoyo: true, repeat: 1, ...options })
        };
        
        return animations[animationName] ? animations[animationName]() : null;
    }

    stopAnimation(animation) {
        if (animation && animation.kill) {
            animation.kill();
        }
    }

    pauseAllAnimations() {
        if (this.isGSAPAvailable) {
            gsap.globalTimeline.pause();
        }
    }

    resumeAllAnimations() {
        if (this.isGSAPAvailable) {
            gsap.globalTimeline.resume();
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}