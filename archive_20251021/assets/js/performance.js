// ===== PERFORMANCE OPTIMIZER =====

class PerformanceOptimizer {
    constructor() {
        this.isLowPowerDevice = false;
        this.reducedMotion = false;
        this.connectionSpeed = 'fast';
        this.init();
    }

    init() {
        this.detectDeviceCapabilities();
        this.setupAdaptivePerformance();
        this.monitorPerformance();
        this.optimizeBasedOnConnection();
    }

    // ===== DEVICE DETECTION =====
    detectDeviceCapabilities() {
        // Check for low-power devices
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        
        if (gl) {
            const renderer = gl.getParameter(gl.RENDERER);
            this.isLowPowerDevice = /PowerVR|Adreno 3|Mali-4/.test(renderer);
        }

        // Check for reduced motion preference
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check device memory (if available)
        if ('deviceMemory' in navigator) {
            if (navigator.deviceMemory <= 2) {
                this.isLowPowerDevice = true;
            }
        }

        // Check connection quality
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.connectionSpeed = 'slow';
            } else if (connection.effectiveType === '3g') {
                this.connectionSpeed = 'medium';
            }
        }
    }

    // ===== ADAPTIVE PERFORMANCE =====
    setupAdaptivePerformance() {
        if (this.isLowPowerDevice || this.reducedMotion) {
            this.applyLowPowerOptimizations();
        }

        if (this.connectionSpeed === 'slow') {
            this.applySlowConnectionOptimizations();
        }

        // Monitor frame rate and adapt
        this.startFrameRateMonitoring();
    }

    applyLowPowerOptimizations() {
        console.log('Applying low power optimizations');

        // Reduce particle count
        if (window.particleSystem) {
            window.particleSystem.setParticleCount(50); // Reduce from default
            window.particleSystem.disableComplexEffects();
        }

        // Disable expensive animations
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');

        // Reduce scroll effects
        if (window.scrollIntegration) {
            window.scrollIntegration.reduceComplexity();
        }

        // Disable AR/VR on very low power devices
        if (window.arvrController && this.isVeryLowPower()) {
            window.arvrController.disableFeatures();
        }
    }

    applySlowConnectionOptimizations() {
        console.log('Applying slow connection optimizations');

        // Lazy load non-critical resources
        this.setupLazyLoading();

        // Reduce image quality
        this.optimizeImages();

        // Defer non-essential scripts
        this.deferNonEssentialScripts();
    }

    // ===== FRAME RATE MONITORING =====
    startFrameRateMonitoring() {
        let frameCount = 0;
        let startTime = Date.now();
        let lastTime = startTime;

        const measureFPS = () => {
            frameCount++;
            const currentTime = Date.now();
            
            if (currentTime - startTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
                
                if (fps < 30) {
                    this.handleLowFrameRate();
                } else if (fps > 55) {
                    this.handleHighFrameRate();
                }
                
                frameCount = 0;
                startTime = currentTime;
            }
            
            lastTime = currentTime;
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    handleLowFrameRate() {
        console.log('Low frame rate detected, reducing effects');
        
        // Reduce particle count further
        if (window.particleSystem) {
            window.particleSystem.reduceParticleCount();
        }

        // Reduce animation complexity
        document.documentElement.classList.add('low-performance');
    }

    handleHighFrameRate() {
        // Can potentially increase quality if we've reduced it
        if (document.documentElement.classList.contains('low-performance')) {
            document.documentElement.classList.remove('low-performance');
        }
    }

    // ===== LAZY LOADING =====
    setupLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Lazy load scripts
        this.lazyLoadScripts();
    }

    lazyLoadScripts() {
        const nonCriticalScripts = [
            'assets/js/ar-vr.js',
            'assets/js/particles.js'
        ];

        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        };

        // Load scripts when user interacts or after delay
        const loadNonCritical = () => {
            nonCriticalScripts.forEach(src => {
                if (!document.querySelector(`script[src="${src}"]`)) {
                    loadScript(src);
                }
            });
        };

        // Load on first interaction
        ['click', 'touchstart', 'scroll'].forEach(event => {
            document.addEventListener(event, loadNonCritical, { once: true });
        });

        // Or after 3 seconds
        setTimeout(loadNonCritical, 3000);
    }

    // ===== IMAGE OPTIMIZATION =====
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Use WebP if supported
            if (this.supportsWebP() && !img.src.includes('.webp')) {
                const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                img.src = webpSrc;
            }
        });
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    // ===== CRITICAL RESOURCE PRELOADING =====
    preloadCriticalResources() {
        const criticalResources = [
            'assets/css/main.css',
            'assets/js/main.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            }
            
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // ===== MEMORY MANAGEMENT =====
    monitorPerformance() {
        // Monitor memory usage if available
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                const memUsage = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
                
                if (memUsage > 0.8) {
                    this.handleHighMemoryUsage();
                }
            }, 10000); // Check every 10 seconds
        }

        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) { // Tasks longer than 50ms
                        console.warn('Long task detected:', entry.duration);
                        this.handleLongTask();
                    }
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    handleHighMemoryUsage() {
        console.log('High memory usage detected, cleaning up');
        
        // Clean up particles
        if (window.particleSystem) {
            window.particleSystem.cleanup();
        }

        // Force garbage collection if possible
        if (window.gc) {
            window.gc();
        }
    }

    handleLongTask() {
        // Break up animations into smaller chunks
        if (window.scrollIntegration) {
            window.scrollIntegration.optimizeAnimations();
        }
    }

    // ===== SERVICE WORKER FOR CACHING =====
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    // ===== UTILITY METHODS =====
    isVeryLowPower() {
        return this.isLowPowerDevice && 
               ('deviceMemory' in navigator && navigator.deviceMemory <= 1);
    }

    deferNonEssentialScripts() {
        const nonEssential = document.querySelectorAll('script[data-non-essential]');
        
        nonEssential.forEach(script => {
            script.setAttribute('defer', 'true');
        });
    }

    // ===== PUBLIC API =====
    getPerformanceMetrics() {
        return {
            isLowPowerDevice: this.isLowPowerDevice,
            reducedMotion: this.reducedMotion,
            connectionSpeed: this.connectionSpeed,
            memoryInfo: 'memory' in performance ? performance.memory : null
        };
    }

    enableHighPerformanceMode() {
        document.documentElement.classList.add('high-performance');
        
        if (window.particleSystem) {
            window.particleSystem.setHighPerformanceMode(true);
        }
    }

    enableLowPowerMode() {
        document.documentElement.classList.add('low-power');
        this.applyLowPowerOptimizations();
    }
}

// ===== CSS FOR PERFORMANCE CLASSES =====
const performanceCSS = `
    /* Low Performance Mode */
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }

    .low-performance .floating-element,
    .low-performance .particle-system {
        display: none;
    }

    .low-performance .parallax-element {
        transform: none !important;
    }

    /* High Performance Mode */
    .high-performance .animated-icon {
        animation-duration: 0.3s;
    }

    .high-performance .particle-system {
        opacity: 1;
    }

    /* Low Power Mode */
    .low-power .background-animation,
    .low-power .complex-animation {
        display: none;
    }

    .low-power .skill-progress,
    .low-power .loading-animation {
        animation: none;
        transition: none;
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }

        .particle-system,
        .floating-element,
        .parallax-element {
            display: none !important;
        }
    }
`;

// Inject performance CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = performanceCSS;
document.head.appendChild(styleSheet);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
    
    // Preload critical resources
    window.performanceOptimizer.preloadCriticalResources();
    
    // Setup service worker
    window.performanceOptimizer.setupServiceWorker();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}