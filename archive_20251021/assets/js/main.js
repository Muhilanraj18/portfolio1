// ===== MAIN APPLICATION CONTROLLER =====

class PortfolioApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupAnimations();
        this.initializeComponents();
    }

    init() {
        // Loading screen management
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressText = document.querySelector('.progress-text');
        
        // Navigation elements
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Hero elements
        this.heroCanvas = document.getElementById('heroCanvas');
        this.heroParticles = document.getElementById('heroParticles');
        this.exploreBtn = document.getElementById('exploreBtn');
        this.contactBtn = document.getElementById('contactBtn');
        
        // Statistics counters
        this.statNumbers = document.querySelectorAll('.stat-number');
        
        // Portfolio elements
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Contact form
        this.contactForm = document.getElementById('contactForm');
        
        // AR/VR elements
        this.enterVRBtn = document.getElementById('enterVR');
        this.startARBtn = document.getElementById('startAR');
        this.arContainer = document.getElementById('arContainer');
        
        // Animation states
        this.scrollY = 0;
        this.isScrolling = false;
        this.animationFrameId = null;
        
        // Initialize loading
        this.simulateLoading();
    }

    bindEvents() {
        // Loading complete
        window.addEventListener('load', () => this.handleLoadComplete());
        
        // Navigation events
        this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Hero button events
        this.exploreBtn?.addEventListener('click', () => this.scrollToSection('portfolio'));
        this.contactBtn?.addEventListener('click', () => this.scrollToSection('contact'));
        
        // Portfolio filter events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });
        
        // Portfolio item events
        this.portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.handlePortfolioHover(item));
            item.addEventListener('mouseleave', () => this.handlePortfolioLeave(item));
            item.addEventListener('click', () => this.handlePortfolioClick(item));
        });
        
        // Contact form events
        this.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // AR/VR button events
        this.enterVRBtn?.addEventListener('click', () => this.enterVR());
        this.startARBtn?.addEventListener('click', () => this.startAR());
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    // ===== LOADING MANAGEMENT =====
    simulateLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => this.hideLoadingScreen(), 500);
            }
            this.updateLoadingProgress(progress);
        }, 150);
    }

    updateLoadingProgress(progress) {
        if (this.progressText) {
            this.progressText.textContent = Math.round(progress) + '%';
        }
        
        // Animate progress bar
        if (this.progressBar) {
            const progressElement = this.progressBar.querySelector('::after') || this.progressBar;
            progressElement.style.width = progress + '%';
        }
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                this.startIntroAnimations();
            }, 500);
        }
    }

    handleLoadComplete() {
        // Initialize canvas and particles after load
        this.initializeCanvas();
        this.initializeParticles();
        this.initializeTypewriter();
    }

    // ===== NAVIGATION MANAGEMENT =====
    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.navToggle?.querySelectorAll('span');
        spans?.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        if (target && target.startsWith('#')) {
            this.scrollToSection(target.substring(1));
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - (this.navbar?.offsetHeight || 0);
            
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: offsetTop, autoKill: true },
                ease: "power2.inOut"
            });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== SCROLL MANAGEMENT =====
    handleScroll() {
        if (!this.isScrolling) {
            this.isScrolling = true;
            this.animationFrameId = requestAnimationFrame(() => this.updateScroll());
        }
    }

    updateScroll() {
        this.scrollY = window.scrollY;
        
        // Update navbar style
        this.updateNavbarStyle();
        
        // Update active nav link
        this.updateActiveNavLink();
        
        // Parallax effects
        this.updateParallax();
        
        // Reveal animations
        this.updateRevealAnimations();
        
        this.isScrolling = false;
    }

    updateNavbarStyle() {
        if (this.navbar) {
            if (this.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
    }

    updateParallax() {
        // Hero parallax
        const hero = document.querySelector('.hero-section');
        if (hero && this.scrollY < window.innerHeight) {
            const parallaxRate = this.scrollY * 0.5;
            hero.style.transform = `translateY(${parallaxRate}px)`;
        }
        
        // Particle parallax
        const particles = document.querySelectorAll('.particle-system');
        particles.forEach((particle, index) => {
            const rate = (index + 1) * 0.3;
            particle.style.transform = `translateY(${this.scrollY * rate}px)`;
        });
    }

    handleResize() {
        // Update canvas size
        this.resizeCanvas();
        
        // Update particle system
        this.resizeParticles();
        
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // ===== ANIMATION SETUP =====
    setupAnimations() {
        // Register GSAP plugins
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
        }
        
        // Set up timeline
        this.masterTimeline = gsap.timeline();
    }

    startIntroAnimations() {
        // Hero text animations
        const tl = gsap.timeline();
        
        tl.from('.hero-title .line-1', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-title .line-2', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-title .line-3', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-stats', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-actions', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.scroll-indicator', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3');
        
        // Start counting animations
        setTimeout(() => this.animateCounters(), 1500);
    }

    animateCounters() {
        this.statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60; // 60 frames for 1 second at 60fps
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleElementIntersect(entry.target);
                }
            });
        }, options);
        
        // Observe reveal elements
        const revealElements = document.querySelectorAll('.reveal-text, .skill-category, .portfolio-item');
        revealElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleElementIntersect(element) {
        if (element.classList.contains('reveal-text')) {
            element.classList.add('revealed');
        }
        
        if (element.classList.contains('skill-category')) {
            this.animateSkillBars(element);
        }
        
        if (element.classList.contains('portfolio-item')) {
            this.animatePortfolioItem(element);
        }
    }

    updateRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-text:not(.revealed)');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    animateSkillBars(skillCategory) {
        const skillBars = skillCategory.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 200);
        });
    }

    animatePortfolioItem(item) {
        gsap.from(item, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.out'
        });
    }

    // ===== PORTFOLIO MANAGEMENT =====
    handleFilterClick(e) {
        e.preventDefault();
        const filter = e.target.getAttribute('data-filter');
        
        // Update active filter
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter portfolio items
        this.filterPortfolioItems(filter);
    }

    filterPortfolioItems(filter) {
        this.portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                gsap.to(item, {
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    display: 'block',
                    ease: 'power2.out'
                });
            } else {
                gsap.to(item, {
                    duration: 0.3,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'power2.in',
                    onComplete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    handlePortfolioHover(item) {
        gsap.to(item, {
            duration: 0.3,
            y: -10,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            ease: 'power2.out'
        });
        
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            gsap.to(overlay, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        }
    }

    handlePortfolioLeave(item) {
        gsap.to(item, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            ease: 'power2.out'
        });
        
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            gsap.to(overlay, {
                duration: 0.3,
                y: '100%',
                ease: 'power2.out'
            });
        }
    }

    handlePortfolioClick(item) {
        // Create modal or navigate to project
        console.log('Portfolio item clicked:', item);
        
        // Add ripple effect
        this.createRippleEffect(item);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== CONTACT FORM =====
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = this.contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showFormSuccess();
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            this.contactForm.reset();
        }, 2000);
    }

    showFormSuccess() {
        // Create success notification
        const notification = document.createElement('div');
        notification.classList.add('notification', 'success');
        notification.innerHTML = `
            <div class="notification-content">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span>Message sent successfully!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        gsap.from(notification, {
            duration: 0.5,
            y: -100,
            opacity: 0,
            ease: 'power2.out'
        });
        
        // Remove after delay
        setTimeout(() => {
            gsap.to(notification, {
                duration: 0.3,
                y: -100,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    // ===== AR/VR FUNCTIONALITY =====
    enterVR() {
        const vrScene = document.getElementById('vrScene');
        if (vrScene) {
            vrScene.enterVR();
        }
    }

    startAR() {
        if (this.arContainer) {
            this.arContainer.style.display = 'block';
            
            // Initialize AR scene
            const arScene = this.arContainer.querySelector('a-scene');
            if (arScene) {
                arScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
            }
        }
    }

    // ===== CANVAS INITIALIZATION =====
    initializeCanvas() {
        if (!this.heroCanvas) return;
        
        this.canvas = this.heroCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.startCanvasAnimation();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startCanvasAnimation() {
        // Create geometric patterns
        this.geometricShapes = [];
        this.createGeometricShapes();
        this.animateCanvas();
    }

    createGeometricShapes() {
        const shapeCount = Math.floor(window.innerWidth / 100);
        
        for (let i = 0; i < shapeCount; i++) {
            this.geometricShapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animateCanvas() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw geometric shapes
        this.geometricShapes.forEach(shape => {
            this.ctx.save();
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);
            this.ctx.globalAlpha = shape.opacity;
            
            // Draw shape
            this.ctx.beginPath();
            this.ctx.rect(-shape.size/2, -shape.size/2, shape.size, shape.size);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.stroke();
            
            this.ctx.restore();
            
            // Update position
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            
            // Wrap around edges
            if (shape.x > this.canvas.width) shape.x = 0;
            if (shape.x < 0) shape.x = this.canvas.width;
            if (shape.y > this.canvas.height) shape.y = 0;
            if (shape.y < 0) shape.y = this.canvas.height;
        });
        
        requestAnimationFrame(() => this.animateCanvas());
    }

    // ===== PARTICLES INITIALIZATION =====
    initializeParticles() {
        if (!this.heroParticles) return;
        
        // Initialize particles.js if available
        if (typeof particlesJS !== 'undefined') {
            particlesJS('heroParticles', {
                particles: {
                    number: { value: 80 },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5 },
                    size: { value: 3 },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    resizeParticles() {
        // Refresh particles on resize
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            pJSDom[0].pJS.fn.canvasSize();
        }
    }

    // ===== TYPEWRITER EFFECT =====
    initializeTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-text');
            if (text) {
                this.typeWriter(element, text, 0);
            }
        });
    }

    typeWriter(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => this.typeWriter(element, text, index + 1), 50);
        }
    }

    // ===== COMPONENT INITIALIZATION =====
    initializeComponents() {
        // Initialize any additional components
        this.initializeMagneticButtons();
        this.initializeScrollIndicator();
        this.initializeCustomCursor();
    }

    initializeMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    duration: 0.3,
                    x: x * 0.3,
                    y: y * 0.3,
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    initializeScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('about');
            });
        }
    }

    initializeCustomCursor() {
        if (window.innerWidth > 768) {
            this.createCustomCursor();
        }
    }

    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(240, 147, 251, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(102, 126, 234, 0.8)';
            });
        });
    }
}

// ===== UTILITIES =====
class Utils {
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    static map(value, in_min, in_max, out_min, out_max) {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    static randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static debounce(func, wait) {
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
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.portfolioApp = new PortfolioApp();
    
    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
        }
        
        .notification.success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification svg {
            flex-shrink: 0;
        }
        
        .custom-cursor {
            mix-blend-mode: difference;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(notificationStyles);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}