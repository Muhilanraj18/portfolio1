// ===== SCROLL ANIMATIONS & INTEGRATION CONTROLLER =====

class ScrollIntegrationController {
    constructor() {
        this.scrollTriggers = [];
        this.parallaxElements = [];
        this.revealElements = [];
        this.isInitialized = false;
        this.init();
    }

    async init() {
        // Wait for GSAP and other dependencies
        await this.waitForDependencies();
        
        // Initialize scroll-triggered animations
        this.initScrollTriggers();
        this.initParallaxEffects();
        this.initRevealAnimations();
        this.initSectionTransitions();
        this.initProgressIndicators();
        
        // Integrate with other systems
        this.integrateWithParticles();
        this.integrateWithIcons();
        this.integrateWithARVR();
        
        // Performance optimizations
        this.setupPerformanceOptimizations();
        
        this.isInitialized = true;
        console.log('Scroll Integration Controller initialized');
    }

    // ===== DEPENDENCY MANAGEMENT =====
    async waitForDependencies() {
        const checkDependencies = () => {
            return typeof gsap !== 'undefined' && 
                   gsap.plugins.ScrollTrigger &&
                   window.particleSystem &&
                   window.animatedIcons &&
                   window.arvrController;
        };

        if (checkDependencies()) return;

        // Wait for dependencies with timeout
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const check = () => {
                if (checkDependencies() || attempts >= maxAttempts) {
                    resolve();
                    return;
                }
                attempts++;
                setTimeout(check, 100);
            };
            
            check();
        });
    }

    // ===== SCROLL TRIGGER SETUP =====
    initScrollTriggers() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section entrance
        this.createHeroAnimations();
        
        // Navigation transparency
        this.createNavAnimations();
        
        // Section reveals
        this.createSectionReveals();
        
        // Skills animation
        this.createSkillsAnimations();
        
        // Portfolio grid animations
        this.createPortfolioAnimations();
        
        // Contact form animations
        this.createContactAnimations();
    }

    createHeroAnimations() {
        const heroTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom center",
                scrub: 1,
                pin: false
            }
        });

        // Hero content parallax
        heroTimeline
            .to(".hero-content h1", {
                y: -50,
                opacity: 0.8,
                duration: 1
            })
            .to(".hero-subtitle", {
                y: -30,
                opacity: 0.6,
                duration: 1
            }, "-=0.8")
            .to(".cta-button", {
                y: -20,
                scale: 0.95,
                duration: 1
            }, "-=0.8");

        // Hero background particles
        this.scrollTriggers.push(
            ScrollTrigger.create({
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                    if (window.particleSystem) {
                        window.particleSystem.updateScrollProgress(self.progress);
                    }
                }
            })
        );
    }

    createNavAnimations() {
        // Navigation background blur
        this.scrollTriggers.push(
            ScrollTrigger.create({
                trigger: "body",
                start: "100px top",
                end: "bottom bottom",
                onEnter: () => this.activateNavBlur(),
                onLeave: () => this.deactivateNavBlur(),
                onEnterBack: () => this.activateNavBlur(),
                onLeaveBack: () => this.deactivateNavBlur()
            })
        );

        // Active section indicator
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            this.scrollTriggers.push(
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => this.updateActiveNav(section.id),
                    onEnterBack: () => this.updateActiveNav(section.id)
                })
            );
        });
    }

    createSectionReveals() {
        const sections = document.querySelectorAll('section:not(.hero)');
        
        sections.forEach((section, index) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1
                }
            });

            // Section slide in
            timeline.fromTo(section, 
                {
                    y: 100,
                    opacity: 0,
                    rotationX: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1,
                    ease: "power2.out"
                }
            );

            // Section title animation
            const title = section.querySelector('h2, .section-title');
            if (title) {
                timeline.fromTo(title,
                    {
                        scale: 0.8,
                        rotationY: 15
                    },
                    {
                        scale: 1,
                        rotationY: 0,
                        duration: 0.8
                    },
                    "-=0.8"
                );
            }
        });
    }

    createSkillsAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        if (skillItems.length > 0) {
            const skillsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: 1
                }
            });

            skillItems.forEach((skill, index) => {
                const delay = index * 0.1;
                
                skillsTimeline.fromTo(skill,
                    {
                        x: -100,
                        rotationY: -20,
                        opacity: 0
                    },
                    {
                        x: 0,
                        rotationY: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    },
                    delay
                );

                // Skill progress bars
                const progressBar = skill.querySelector('.skill-progress-fill');
                if (progressBar) {
                    const percentage = progressBar.getAttribute('data-percentage') || '70';
                    
                    skillsTimeline.fromTo(progressBar,
                        { width: '0%' },
                        { 
                            width: `${percentage}%`,
                            duration: 1,
                            ease: "power2.out"
                        },
                        delay + 0.3
                    );
                }
            });
        }
    }

    createPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (portfolioItems.length > 0) {
            portfolioItems.forEach((item, index) => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "top 15%",
                        scrub: 1
                    }
                });

                // Item entrance
                timeline.fromTo(item,
                    {
                        scale: 0.8,
                        rotationX: 30,
                        opacity: 0,
                        filter: "blur(10px)"
                    },
                    {
                        scale: 1,
                        rotationX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "power3.out"
                    }
                );

                // Image parallax
                const image = item.querySelector('.portfolio-image');
                if (image) {
                    timeline.fromTo(image,
                        { y: 30 },
                        { 
                            y: -30,
                            duration: 2,
                            ease: "none"
                        },
                        "-=1"
                    );
                }

                // Overlay slide up
                const overlay = item.querySelector('.portfolio-overlay');
                if (overlay) {
                    timeline.fromTo(overlay,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6
                        },
                        "-=0.4"
                    );
                }
            });
        }
    }

    createContactAnimations() {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: contactSection,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
            }
        });

        // Form entrance
        const form = contactSection.querySelector('.contact-form');
        if (form) {
            timeline.fromTo(form,
                {
                    x: -100,
                    opacity: 0,
                    rotationY: -15
                },
                {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1
                }
            );
        }

        // Contact info
        const info = contactSection.querySelector('.contact-info');
        if (info) {
            timeline.fromTo(info,
                {
                    x: 100,
                    opacity: 0,
                    rotationY: 15
                },
                {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1
                },
                "-=0.8"
            );
        }

        // Form fields stagger
        const fields = contactSection.querySelectorAll('.form-group');
        fields.forEach((field, index) => {
            timeline.fromTo(field,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                },
                index * 0.1
            );
        });
    }

    // ===== PARALLAX EFFECTS =====
    initParallaxEffects() {
        // Background elements parallax
        const parallaxBgs = document.querySelectorAll('[data-parallax]');
        
        parallaxBgs.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Floating elements
        this.createFloatingAnimations();
    }

    createFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.floating-element, .skill-orb, .portfolio-tag');
        
        floatingElements.forEach((element, index) => {
            const amplitude = 10 + (index % 3) * 5;
            const duration = 3 + (index % 4);
            
            gsap.to(element, {
                y: `+=${amplitude}`,
                rotation: `+=${2 + index % 3}`,
                duration: duration,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.2
            });
        });
    }

    // ===== REVEAL ANIMATIONS =====
    initRevealAnimations() {
        // Text reveals
        this.createTextReveals();
        
        // Image reveals
        this.createImageReveals();
        
        // Counter animations
        this.createCounterAnimations();
    }

    createTextReveals() {
        const textElements = document.querySelectorAll('h1, h2, h3, p, .btn');
        
        textElements.forEach((element, index) => {
            // Skip if already animated
            if (element.classList.contains('gsap-animated')) return;
            
            element.classList.add('gsap-animated');
            
            gsap.fromTo(element,
                {
                    y: 50,
                    opacity: 0,
                    rotationX: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1
                    }
                }
            );
        });
    }

    createImageReveals() {
        const images = document.querySelectorAll('img, .image-placeholder');
        
        images.forEach(image => {
            gsap.fromTo(image,
                {
                    scale: 1.1,
                    opacity: 0,
                    filter: "blur(20px)"
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: image,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1
                    }
                }
            );
        });
    }

    createCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const endValue = parseInt(counter.getAttribute('data-count'));
            const duration = 2;
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to({ value: 0 }, {
                        value: endValue,
                        duration: duration,
                        ease: "power2.out",
                        onUpdate: function() {
                            counter.textContent = Math.round(this.targets()[0].value);
                        }
                    });
                }
            });
        });
    }

    // ===== SECTION TRANSITIONS =====
    initSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index === 0) return; // Skip hero section
            
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => this.onSectionEnter(section),
                onLeave: () => this.onSectionLeave(section),
                onEnterBack: () => this.onSectionEnter(section),
                onLeaveBack: () => this.onSectionLeave(section)
            });
        });
    }

    onSectionEnter(section) {
        // Update body class for section-specific styling
        document.body.setAttribute('data-current-section', section.id);
        
        // Trigger section-specific particle effects
        if (window.particleSystem && section.id) {
            window.particleSystem.switchMode(section.id);
        }
        
        // Update AR/VR content based on section
        if (window.arvrController && section.id === 'portfolio') {
            // Prepare AR/VR content for portfolio section
        }
        
        // Animate section-specific icons
        const sectionIcons = section.querySelectorAll('[data-icon-id]');
        sectionIcons.forEach(icon => {
            if (window.animatedIcons) {
                // Trigger enhanced icon animations
                icon.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }

    onSectionLeave(section) {
        // Clean up section-specific effects
        const sectionEffects = section.querySelectorAll('.section-effect');
        sectionEffects.forEach(effect => {
            effect.style.opacity = '0';
        });
    }

    // ===== PROGRESS INDICATORS =====
    initProgressIndicators() {
        // Scroll progress bar
        this.createScrollProgress();
        
        // Section progress indicators
        this.createSectionProgress();
        
        // Reading progress (for long content)
        this.createReadingProgress();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const fill = progressBar.querySelector('.scroll-progress-fill');
        
        gsap.to(fill, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    }

    createSectionProgress() {
        const sections = document.querySelectorAll('section[id]');
        const progressContainer = document.createElement('div');
        progressContainer.className = 'section-progress';
        
        sections.forEach(section => {
            const indicator = document.createElement('div');
            indicator.className = 'progress-dot';
            indicator.setAttribute('data-section', section.id);
            
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => indicator.classList.add('active'),
                onLeave: () => indicator.classList.remove('active'),
                onEnterBack: () => indicator.classList.add('active'),
                onLeaveBack: () => indicator.classList.remove('active')
            });
            
            progressContainer.appendChild(indicator);
        });
        
        document.body.appendChild(progressContainer);
    }

    createReadingProgress() {
        const longSections = document.querySelectorAll('.long-content, #about');
        
        longSections.forEach(section => {
            const progressRing = document.createElement('div');
            progressRing.className = 'reading-progress';
            progressRing.innerHTML = `
                <svg viewBox="0 0 36 36">
                    <path class="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <path class="progress-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
            `;
            
            const fill = progressRing.querySelector('.progress-fill');
            
            gsap.to(fill, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    onUpdate: (self) => {
                        const circumference = 100;
                        const offset = circumference * (1 - self.progress);
                        fill.style.strokeDashoffset = offset;
                    }
                }
            });
            
            section.appendChild(progressRing);
        });
    }

    // ===== SYSTEM INTEGRATIONS =====
    integrateWithParticles() {
        if (!window.particleSystem) return;

        // Connect scroll progress to particle effects
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                window.particleSystem.updateScrollProgress(self.progress);
            }
        });

        // Section-based particle modes
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    if (window.particleSystem.switchMode) {
                        window.particleSystem.switchMode(section.id);
                    }
                }
            });
        });
    }

    integrateWithIcons() {
        if (!window.animatedIcons) return;

        // Trigger icon animations on scroll
        const iconContainers = document.querySelectorAll('[data-icon-id]');
        
        iconContainers.forEach(container => {
            ScrollTrigger.create({
                trigger: container,
                start: "top 80%",
                onEnter: () => {
                    // Trigger special scroll animation
                    container.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        container.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                }
            });
        });
    }

    integrateWithARVR() {
        if (!window.arvrController) return;

        // Show AR/VR hints when reaching portfolio section
        ScrollTrigger.create({
            trigger: "#portfolio",
            start: "top center",
            onEnter: () => {
                this.showARVRHints();
            }
        });

        // Auto-start AR demo on specific scroll position
        const arSection = document.querySelector('#ar-showcase');
        if (arSection) {
            ScrollTrigger.create({
                trigger: arSection,
                start: "top center",
                onEnter: () => {
                    // Auto-initialize AR preview (not full AR)
                    this.initARPreview();
                }
            });
        }
    }

    showARVRHints() {
        const hint = document.createElement('div');
        hint.className = 'ar-vr-hint';
        hint.innerHTML = `
            <div class="hint-content">
                <h4>🥽 Immersive Experience Available</h4>
                <p>Try our AR/VR features for a next-level portfolio view!</p>
                <button class="hint-close">×</button>
            </div>
        `;
        
        document.body.appendChild(hint);
        
        // Animate hint in
        gsap.from(hint, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            gsap.to(hint, {
                y: 100,
                opacity: 0,
                duration: 0.3,
                onComplete: () => hint.remove()
            });
        }, 5000);
        
        // Remove on close click
        hint.querySelector('.hint-close').addEventListener('click', () => {
            hint.remove();
        });
    }

    initARPreview() {
        // Initialize AR preview mode (not full AR session)
        const arContainer = document.getElementById('arContainer');
        if (arContainer && window.arvrController) {
            // Show AR preview
            arContainer.style.opacity = '0.1';
            arContainer.style.pointerEvents = 'none';
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        // Pause animations when not in viewport
        this.setupIntersectionOptimizations();
        
        // Reduce motion for users with preferences
        this.handleReducedMotion();
        
        // Optimize for mobile devices
        this.optimizeForMobile();
        
        // Throttle scroll events
        this.throttleScrollEvents();
    }

    setupIntersectionOptimizations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    // Resume animations
                    element.style.animationPlayState = 'running';
                } else {
                    // Pause animations outside viewport
                    element.style.animationPlayState = 'paused';
                }
            });
        }, { rootMargin: '50px' });

        // Observe all animated elements
        document.querySelectorAll('.animated-element, [data-parallax], .floating-element').forEach(el => {
            observer.observe(el);
        });
    }

    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable complex animations
            gsap.globalTimeline.timeScale(0.1);
            
            // Remove parallax effects
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.scrub) {
                    trigger.kill();
                }
            });
            
            // Simplify particle effects
            if (window.particleSystem) {
                window.particleSystem.reduceComplexity();
            }
        }
    }

    optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Reduce particle count
            if (window.particleSystem) {
                window.particleSystem.setMobileMode(true);
            }
            
            // Simplify scroll effects
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.scrub) {
                    trigger.vars.scrub = 0.5; // Make scrub less intensive
                }
            });
            
            // Disable complex 3D transforms
            document.documentElement.style.setProperty('--transform-3d', 'none');
        }
    }

    throttleScrollEvents() {
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Batch scroll updates
                    ScrollTrigger.refresh();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }

    // ===== UTILITY METHODS =====
    activateNavBlur() {
        const nav = document.querySelector('.navbar, .header');
        if (nav) {
            nav.classList.add('scrolled');
        }
    }

    deactivateNavBlur() {
        const nav = document.querySelector('.navbar, .header');
        if (nav) {
            nav.classList.remove('scrolled');
        }
    }

    updateActiveNav(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link, .navbar a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // ===== PUBLIC API =====
    refresh() {
        ScrollTrigger.refresh();
    }

    destroy() {
        // Clean up all scroll triggers
        this.scrollTriggers.forEach(trigger => trigger.kill());
        ScrollTrigger.killAll();
        
        // Remove created elements
        document.querySelectorAll('.scroll-progress, .section-progress, .reading-progress').forEach(el => {
            el.remove();
        });
    }

    pause() {
        gsap.globalTimeline.pause();
    }

    resume() {
        gsap.globalTimeline.resume();
    }

    // ===== RESPONSIVE HANDLING =====
    handleResize() {
        // Refresh ScrollTrigger on resize
        ScrollTrigger.refresh();
        
        // Reoptimize for new screen size
        this.optimizeForMobile();
    }
}

// ===== CSS INJECTION FOR SCROLL EFFECTS =====
const scrollEffectsCSS = `
    /* Scroll Progress Bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(255,255,255,0.1);
        z-index: 9999;
    }

    .scroll-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        transform-origin: left;
        transform: scaleX(0);
    }

    /* Section Progress Dots */
    .section-progress {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    }

    .progress-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .progress-dot.active {
        background: #667eea;
        transform: scale(1.5);
        box-shadow: 0 0 10px #667eea;
    }

    /* Reading Progress Ring */
    .reading-progress {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        z-index: 1000;
    }

    .reading-progress svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    .progress-bg {
        fill: none;
        stroke: rgba(255,255,255,0.1);
        stroke-width: 2;
    }

    .progress-fill {
        fill: none;
        stroke: #667eea;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
    }

    /* AR/VR Hint */
    .ar-vr-hint {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0,0,0,0.9);
        border-radius: 10px;
        padding: 15px;
        color: white;
        max-width: 300px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    }

    .hint-content h4 {
        margin: 0 0 10px 0;
        font-size: 14px;
    }

    .hint-content p {
        margin: 0;
        font-size: 12px;
        opacity: 0.8;
    }

    .hint-close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        opacity: 0.7;
    }

    /* Scrolled Navigation */
    .navbar.scrolled,
    .header.scrolled {
        background: rgba(0,0,0,0.95) !important;
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    /* Mobile Optimizations */
    @media (max-width: 768px) {
        .section-progress,
        .reading-progress {
            display: none;
        }
        
        .scroll-progress {
            height: 2px;
        }
        
        .ar-vr-hint {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        .scroll-progress-fill,
        .progress-dot,
        .progress-fill {
            transition: none !important;
            animation: none !important;
        }
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = scrollEffectsCSS;
document.head.appendChild(styleSheet);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other systems to initialize
    setTimeout(() => {
        window.scrollIntegration = new ScrollIntegrationController();
    }, 100);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.scrollIntegration) {
            window.scrollIntegration.handleResize();
        }
    }, 250);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollIntegrationController;
}