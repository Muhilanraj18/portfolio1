// ===== AR/VR CONTROLLER =====

class ARVRController {
    constructor() {
        this.isARSupported = false;
        this.isVRSupported = false;
        this.arSession = null;
        this.vrSession = null;
        this.init();
    }

    async init() {
        await this.checkARSupport();
        await this.checkVRSupport();
        this.setupARScene();
        this.setupVRScene();
        this.bindEvents();
    }

    // ===== CAPABILITY DETECTION =====
    async checkARSupport() {
        if ('xr' in navigator) {
            try {
                this.isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
                console.log('AR Support:', this.isARSupported);
            } catch (error) {
                console.log('AR not supported:', error);
            }
        }
        
        // Fallback to AR.js detection
        if (!this.isARSupported) {
            this.isARSupported = typeof THREEx !== 'undefined' && typeof ARjs !== 'undefined';
        }
    }

    async checkVRSupported() {
        if ('xr' in navigator) {
            try {
                this.isVRSupported = await navigator.xr.isSessionSupported('immersive-vr');
                console.log('VR Support:', this.isVRSupported);
            } catch (error) {
                console.log('VR not supported:', error);
            }
        }
        
        // Fallback to A-Frame WebVR detection
        if (!this.isVRSupported && typeof AFRAME !== 'undefined') {
            this.isVRSupported = AFRAME.utils.device.checkHeadsetConnected();
        }
    }

    // ===== AR SCENE SETUP =====
    setupARScene() {
        this.initARMarkerTracking();
        this.createARContent();
        this.setupARInteractions();
    }

    initARMarkerTracking() {
        // Enhanced AR marker tracking
        const arScene = document.querySelector('#arContainer a-scene');
        if (arScene) {
            arScene.addEventListener('arjs-video-loaded', () => {
                console.log('AR camera loaded');
                this.onARCameraReady();
            });

            arScene.addEventListener('markerFound', (e) => {
                console.log('Marker found:', e.target);
                this.onMarkerFound(e.target);
            });

            arScene.addEventListener('markerLost', (e) => {
                console.log('Marker lost:', e.target);
                this.onMarkerLost(e.target);
            });
        }
    }

    createARContent() {
        // Create dynamic AR content
        const marker = document.querySelector('a-marker');
        if (marker) {
            this.createAnimatedARObjects(marker);
            this.createInteractiveARElements(marker);
            this.createARParticleSystem(marker);
        }
    }

    createAnimatedARObjects(marker) {
        // Animated 3D business card
        const businessCard = document.createElement('a-entity');
        businessCard.setAttribute('id', 'ar-business-card');
        businessCard.innerHTML = `
            <!-- Main card -->
            <a-box position="0 0.5 0" 
                   width="3" height="0.1" depth="2" 
                   color="#2C3E50"
                   animation="property: rotation; to: 0 360 0; loop: true; dur: 8000">
                
                <!-- Holographic text -->
                <a-text value="MUHILAN" 
                        position="0 0.2 1.01" 
                        align="center" 
                        color="#ECF0F1" 
                        scale="1.2 1.2 1.2"
                        animation="property: position; to: 0 0.4 1.01; loop: true; dur: 2000; dir: alternate"
                        font="kelsonsans"></a-text>
                
                <a-text value="Creative Developer" 
                        position="0 -0.1 1.01" 
                        align="center" 
                        color="#3498DB" 
                        scale="0.6 0.6 0.6"
                        font="kelsonsans"></a-text>
                
                <!-- Floating particles -->
                <a-sphere position="1.2 0.5 1.2" 
                          radius="0.08" 
                          color="#E74C3C"
                          animation="property: position; to: -1.2 1.0 -1.2; loop: true; dur: 4000; dir: alternate"></a-sphere>
                
                <a-sphere position="-1.2 0.5 1.2" 
                          radius="0.08" 
                          color="#F39C12"
                          animation="property: position; to: 1.2 1.0 -1.2; loop: true; dur: 3500; dir: alternate"></a-sphere>
                
                <a-sphere position="0 0.5 -1.0" 
                          radius="0.08" 
                          color="#27AE60"
                          animation="property: position; to: 0 1.0 1.0; loop: true; dur: 3000; dir: alternate"></a-sphere>
                
                <!-- Skill icons -->
                <a-cylinder position="1.8 1.2 0" 
                           radius="0.15" 
                           height="0.3" 
                           color="#9B59B6"
                           animation="property: rotation; to: 360 0 0; loop: true; dur: 2000"></a-cylinder>
                
                <a-octahedron position="-1.8 1.2 0" 
                             radius="0.2" 
                             color="#E67E22"
                             animation="property: rotation; to: 0 360 360; loop: true; dur: 3000"></a-octahedron>
            </a-box>
            
            <!-- Holographic ring -->
            <a-ring position="0 0.2 0" 
                    radius-inner="2.2" 
                    radius-outer="2.6" 
                    color="#9B59B6" 
                    opacity="0.4"
                    animation="property: rotation; to: 0 360 0; loop: true; dur: 15000"></a-ring>
            
            <!-- Energy field -->
            <a-ring position="0 0.1 0" 
                    radius-inner="1.8" 
                    radius-outer="2.0" 
                    color="#1ABC9C" 
                    opacity="0.6"
                    animation="property: rotation; to: 0 -360 0; loop: true; dur: 10000"></a-ring>
        `;
        
        marker.appendChild(businessCard);
    }

    createInteractiveARElements(marker) {
        // Interactive skill showcase
        const skillShowcase = document.createElement('a-entity');
        skillShowcase.setAttribute('id', 'ar-skills');
        skillShowcase.innerHTML = `
            <!-- Skill orbs -->
            <a-sphere position="2 1.5 0" 
                      radius="0.3" 
                      color="#667eea"
                      class="ar-skill-orb"
                      data-skill="WebGL"
                      animation="property: position; to: 2 2.0 0; loop: true; dur: 2500; dir: alternate">
                <a-text value="WebGL" 
                        position="0 -0.5 0" 
                        align="center" 
                        color="#ffffff"
                        scale="0.8 0.8 0.8"></a-text>
            </a-sphere>
            
            <a-sphere position="-2 1.5 0" 
                      radius="0.3" 
                      color="#f093fb"
                      class="ar-skill-orb"
                      data-skill="Three.js"
                      animation="property: position; to: -2 2.0 0; loop: true; dur: 3000; dir: alternate">
                <a-text value="Three.js" 
                        position="0 -0.5 0" 
                        align="center" 
                        color="#ffffff"
                        scale="0.8 0.8 0.8"></a-text>
            </a-sphere>
            
            <a-sphere position="0 2.5 0" 
                      radius="0.3" 
                      color="#43e97b"
                      class="ar-skill-orb"
                      data-skill="AR/VR"
                      animation="property: position; to: 0 3.0 0; loop: true; dur: 2800; dir: alternate">
                <a-text value="AR/VR" 
                        position="0 -0.5 0" 
                        align="center" 
                        color="#ffffff"
                        scale="0.8 0.8 0.8"></a-text>
            </a-sphere>
        `;
        
        marker.appendChild(skillShowcase);
    }

    createARParticleSystem(marker) {
        // AR particle system
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('a-sphere');
            const x = (Math.random() - 0.5) * 4;
            const y = Math.random() * 2 + 0.5;
            const z = (Math.random() - 0.5) * 4;
            const animDuration = Math.random() * 2000 + 3000;
            
            particle.setAttribute('position', `${x} ${y} ${z}`);
            particle.setAttribute('radius', '0.02');
            particle.setAttribute('color', '#ffffff');
            particle.setAttribute('opacity', '0.7');
            particle.setAttribute('animation', `
                property: position; 
                to: ${x} ${y + 1} ${z}; 
                loop: true; 
                dur: ${animDuration}; 
                dir: alternate;
                easing: easeInOutSine
            `);
            
            marker.appendChild(particle);
        }
    }

    setupARInteractions() {
        // AR cursor interactions
        document.addEventListener('click', (e) => {
            if (this.arSession) {
                this.handleARClick(e);
            }
        });

        // Gesture recognition
        this.setupARGestures();
    }

    setupARGestures() {
        let touchStart = null;
        let touchEnd = null;

        document.addEventListener('touchstart', (e) => {
            if (this.arSession) {
                touchStart = {
                    x: e.changedTouches[0].screenX,
                    y: e.changedTouches[0].screenY
                };
            }
        });

        document.addEventListener('touchend', (e) => {
            if (this.arSession && touchStart) {
                touchEnd = {
                    x: e.changedTouches[0].screenX,
                    y: e.changedTouches[0].screenY
                };
                
                this.processARGesture(touchStart, touchEnd);
            }
        });
    }

    processARGesture(start, end) {
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > 50) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0) {
                    this.onARSwipeRight();
                } else {
                    this.onARSwipeLeft();
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    this.onARSwipeDown();
                } else {
                    this.onARSwipeUp();
                }
            }
        }
    }

    // ===== VR SCENE SETUP =====
    setupVRScene() {
        this.createVREnvironment();
        this.setupVRInteractions();
        this.createVRGallery();
    }

    createVREnvironment() {
        const vrScene = document.getElementById('vrScene');
        if (!vrScene) return;

        // Enhanced lighting system
        this.setupVRLighting(vrScene);
        
        // Interactive environment elements
        this.createVRFloatingElements(vrScene);
        
        // Spatial audio
        this.setupVRSpatialAudio(vrScene);
    }

    setupVRLighting(scene) {
        // Dynamic lighting that responds to user presence
        const dynamicLight = document.createElement('a-light');
        dynamicLight.setAttribute('type', 'point');
        dynamicLight.setAttribute('position', '0 5 0');
        dynamicLight.setAttribute('color', '#FFB6C1');
        dynamicLight.setAttribute('intensity', '1.5');
        dynamicLight.setAttribute('animation', `
            property: intensity; 
            to: 2.5; 
            loop: true; 
            dur: 4000; 
            dir: alternate;
            easing: easeInOutSine
        `);
        
        scene.appendChild(dynamicLight);
        
        // Ambient lighting with color cycling
        const ambientLight = document.createElement('a-light');
        ambientLight.setAttribute('type', 'ambient');
        ambientLight.setAttribute('color', '#404040');
        ambientLight.setAttribute('animation', `
            property: color; 
            to: #606060; 
            loop: true; 
            dur: 8000; 
            dir: alternate
        `);
        
        scene.appendChild(ambientLight);
    }

    createVRFloatingElements(scene) {
        // Floating interactive orbs
        const orbColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        
        orbColors.forEach((color, index) => {
            const orb = document.createElement('a-sphere');
            const angle = (index / orbColors.length) * Math.PI * 2;
            const radius = 5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            orb.setAttribute('position', `${x} ${2 + Math.sin(index) * 2} ${z}`);
            orb.setAttribute('radius', '0.5');
            orb.setAttribute('color', color);
            orb.setAttribute('class', 'vr-interactive-orb');
            orb.setAttribute('animation', `
                property: rotation; 
                to: 0 360 0; 
                loop: true; 
                dur: ${5000 + index * 1000}
            `);
            
            // Add glow effect
            orb.setAttribute('material', `
                color: ${color}; 
                emissive: ${color}; 
                emissiveIntensity: 0.2
            `);
            
            // Click interaction
            orb.setAttribute('cursor-listener', '');
            
            scene.appendChild(orb);
        });
    }

    setupVRSpatialAudio(scene) {
        // Ambient soundscape
        const ambientAudio = document.createElement('a-sound');
        ambientAudio.setAttribute('src', '#ambientSound');
        ambientAudio.setAttribute('autoplay', 'true');
        ambientAudio.setAttribute('loop', 'true');
        ambientAudio.setAttribute('volume', '0.3');
        
        scene.appendChild(ambientAudio);
        
        // Positional audio for interactive elements
        document.querySelectorAll('.vr-interactive-orb').forEach((orb, index) => {
            const audio = document.createElement('a-sound');
            audio.setAttribute('src', `#orbSound${index}`);
            audio.setAttribute('positional', 'true');
            audio.setAttribute('volume', '0.5');
            
            orb.appendChild(audio);
        });
    }

    createVRGallery() {
        const vrScene = document.getElementById('vrScene');
        if (!vrScene) return;

        // Portfolio gallery walls
        this.createVRGalleryWalls(vrScene);
        
        // Interactive portfolio displays
        this.createVRPortfolioDisplays(vrScene);
        
        // Navigation waypoints
        this.createVRNavigationSystem(vrScene);
    }

    createVRGalleryWalls(scene) {
        // Gallery walls with artwork
        const wallPositions = [
            { pos: '-12 2.5 0', rot: '0 90 0' },
            { pos: '12 2.5 0', rot: '0 -90 0' },
            { pos: '0 2.5 -12', rot: '0 0 0' },
            { pos: '0 2.5 12', rot: '0 180 0' }
        ];
        
        wallPositions.forEach((wall, index) => {
            const wallElement = document.createElement('a-box');
            wallElement.setAttribute('position', wall.pos);
            wallElement.setAttribute('rotation', wall.rot);
            wallElement.setAttribute('width', '24');
            wallElement.setAttribute('height', '5');
            wallElement.setAttribute('depth', '0.2');
            wallElement.setAttribute('color', '#f8f9fa');
            wallElement.setAttribute('material', 'roughness: 0.8');
            
            scene.appendChild(wallElement);
        });
    }

    createVRPortfolioDisplays(scene) {
        const portfolioItems = [
            { title: 'WebGL Experience', color: '#667eea', pos: '-10 3 -11.8' },
            { title: 'AR Application', color: '#f093fb', pos: '-5 3 -11.8' },
            { title: 'VR Gallery', color: '#43e97b', pos: '0 3 -11.8' },
            { title: 'Motion Graphics', color: '#ffa726', pos: '5 3 -11.8' },
            { title: 'Interactive Art', color: '#26c6da', pos: '10 3 -11.8' }
        ];
        
        portfolioItems.forEach((item, index) => {
            // Frame
            const frame = document.createElement('a-box');
            frame.setAttribute('position', item.pos);
            frame.setAttribute('width', '3.5');
            frame.setAttribute('height', '2.5');
            frame.setAttribute('depth', '0.1');
            frame.setAttribute('color', '#333');
            
            // Artwork
            const artwork = document.createElement('a-box');
            artwork.setAttribute('position', `0 0 0.06`);
            artwork.setAttribute('width', '3');
            artwork.setAttribute('height', '2');
            artwork.setAttribute('depth', '0.02');
            artwork.setAttribute('color', item.color);
            artwork.setAttribute('class', 'vr-portfolio-item');
            artwork.setAttribute('data-title', item.title);
            
            // Hover animation
            artwork.setAttribute('animation__mouseenter', `
                property: scale; 
                to: 1.05 1.05 1.05; 
                startEvents: mouseenter; 
                dur: 300
            `);
            artwork.setAttribute('animation__mouseleave', `
                property: scale; 
                to: 1 1 1; 
                startEvents: mouseleave; 
                dur: 300
            `);
            
            // Title
            const title = document.createElement('a-text');
            title.setAttribute('value', item.title);
            title.setAttribute('position', '0 -1.5 0.1');
            title.setAttribute('align', 'center');
            title.setAttribute('color', '#333');
            title.setAttribute('scale', '0.8 0.8 0.8');
            
            frame.appendChild(artwork);
            frame.appendChild(title);
            scene.appendChild(frame);
        });
    }

    createVRNavigationSystem(scene) {
        // Teleportation points
        const navPoints = [
            { pos: '0 0.1 0', label: 'Center' },
            { pos: '8 0.1 8', label: 'Corner 1' },
            { pos: '-8 0.1 8', label: 'Corner 2' },
            { pos: '-8 0.1 -8', label: 'Corner 3' },
            { pos: '8 0.1 -8', label: 'Corner 4' }
        ];
        
        navPoints.forEach(point => {
            const navPoint = document.createElement('a-cylinder');
            navPoint.setAttribute('position', point.pos);
            navPoint.setAttribute('radius', '0.5');
            navPoint.setAttribute('height', '0.1');
            navPoint.setAttribute('color', '#4CAF50');
            navPoint.setAttribute('opacity', '0.7');
            navPoint.setAttribute('class', 'vr-nav-point');
            navPoint.setAttribute('cursor-listener', '');
            
            // Hover effect
            navPoint.setAttribute('animation__hover', `
                property: color; 
                to: #81C784; 
                startEvents: mouseenter; 
                dur: 200
            `);
            navPoint.setAttribute('animation__leave', `
                property: color; 
                to: #4CAF50; 
                startEvents: mouseleave; 
                dur: 200
            `);
            
            scene.appendChild(navPoint);
        });
    }

    setupVRInteractions() {
        // Register A-Frame components for VR interactions
        if (typeof AFRAME !== 'undefined') {
            this.registerVRComponents();
        }
        
        // Hand tracking (if supported)
        this.setupHandTracking();
        
        // Voice commands
        this.setupVoiceCommands();
    }

    registerVRComponents() {
        // Cursor listener component
        AFRAME.registerComponent('cursor-listener', {
            init: function () {
                this.el.addEventListener('click', (e) => {
                    if (e.target.classList.contains('vr-interactive-orb')) {
                        window.arvrController.onVROrbClick(e.target);
                    } else if (e.target.classList.contains('vr-portfolio-item')) {
                        window.arvrController.onVRPortfolioClick(e.target);
                    } else if (e.target.classList.contains('vr-nav-point')) {
                        window.arvrController.onVRTeleport(e.target);
                    }
                });
            }
        });
        
        // Look-at component for UI elements
        AFRAME.registerComponent('look-at-user', {
            tick: function () {
                const camera = document.querySelector('[camera]');
                if (camera) {
                    this.el.object3D.lookAt(camera.object3D.position);
                }
            }
        });
    }

    setupHandTracking() {
        if ('XRHand' in window) {
            console.log('Hand tracking supported');
            // Implement hand tracking interactions
        }
    }

    setupVoiceCommands() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = false;
            
            recognition.onresult = (event) => {
                const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
            
            this.voiceRecognition = recognition;
        }
    }

    // ===== EVENT HANDLERS =====
    onARCameraReady() {
        console.log('AR camera is ready');
        this.showARInstructions();
    }

    onMarkerFound(marker) {
        // Marker found - start AR experience
        this.triggerARIntro();
    }

    onMarkerLost(marker) {
        // Marker lost - pause AR animations
        this.pauseARAnimations();
    }

    onARClick(event) {
        // Handle AR click interactions
        console.log('AR click at:', event.clientX, event.clientY);
    }

    onARSwipeLeft() {
        console.log('AR swipe left - switch portfolio item');
        this.switchARPortfolioItem(-1);
    }

    onARSwipeRight() {
        console.log('AR swipe right - switch portfolio item');
        this.switchARPortfolioItem(1);
    }

    onARSwipeUp() {
        console.log('AR swipe up - show skills');
        this.showARSkills();
    }

    onARSwipeDown() {
        console.log('AR swipe down - hide skills');
        this.hideARSkills();
    }

    onVROrbClick(orb) {
        console.log('VR orb clicked:', orb.getAttribute('color'));
        this.triggerVROrbEffect(orb);
    }

    onVRPortfolioClick(item) {
        const title = item.getAttribute('data-title');
        console.log('VR portfolio item clicked:', title);
        this.showVRPortfolioDetails(item);
    }

    onVRTeleport(navPoint) {
        const position = navPoint.getAttribute('position');
        console.log('VR teleport to:', position);
        this.teleportVRUser(position);
    }

    processVoiceCommand(command) {
        console.log('Voice command:', command);
        
        if (command.includes('show skills')) {
            this.showARSkills();
        } else if (command.includes('hide skills')) {
            this.hideARSkills();
        } else if (command.includes('next')) {
            this.switchARPortfolioItem(1);
        } else if (command.includes('previous')) {
            this.switchARPortfolioItem(-1);
        }
    }

    // ===== AR METHODS =====
    showARInstructions() {
        // Show AR usage instructions
        const instructions = document.createElement('div');
        instructions.className = 'ar-instructions';
        instructions.innerHTML = `
            <div class="ar-instruction-content">
                <h3>AR Experience Ready!</h3>
                <p>Point your camera at the marker to see the magic</p>
                <ul>
                    <li>Swipe left/right to navigate</li>
                    <li>Swipe up to show skills</li>
                    <li>Tap to interact</li>
                </ul>
            </div>
        `;
        
        document.body.appendChild(instructions);
        
        setTimeout(() => {
            instructions.remove();
        }, 5000);
    }

    triggerARIntro() {
        // Animate AR elements on marker detection
        const businessCard = document.getElementById('ar-business-card');
        if (businessCard) {
            businessCard.setAttribute('animation', `
                property: scale; 
                from: 0 0 0; 
                to: 1 1 1; 
                dur: 1000; 
                easing: easeOutBack
            `);
        }
    }

    pauseARAnimations() {
        // Pause all AR animations when marker is lost
        const animatedElements = document.querySelectorAll('#arContainer [animation]');
        animatedElements.forEach(element => {
            element.setAttribute('animation', 'enabled: false');
        });
    }

    switchARPortfolioItem(direction) {
        // Switch between portfolio items in AR
        console.log('Switching AR portfolio item:', direction);
    }

    showARSkills() {
        const skillOrbs = document.querySelectorAll('.ar-skill-orb');
        skillOrbs.forEach((orb, index) => {
            orb.setAttribute('animation', `
                property: scale; 
                to: 1.2 1.2 1.2; 
                dur: 500; 
                delay: ${index * 100}
            `);
        });
    }

    hideARSkills() {
        const skillOrbs = document.querySelectorAll('.ar-skill-orb');
        skillOrbs.forEach(orb => {
            orb.setAttribute('animation', `
                property: scale; 
                to: 1 1 1; 
                dur: 500
            `);
        });
    }

    // ===== VR METHODS =====
    triggerVROrbEffect(orb) {
        // Create particle burst effect
        const color = orb.getAttribute('color');
        orb.setAttribute('animation', `
            property: scale; 
            to: 1.3 1.3 1.3; 
            dur: 200; 
            direction: alternate; 
            repeat: 1
        `);
        
        // Play sound if available
        const audio = orb.querySelector('a-sound');
        if (audio) {
            audio.components.sound.playSound();
        }
    }

    showVRPortfolioDetails(item) {
        const title = item.getAttribute('data-title');
        
        // Create floating info panel
        const infoPanel = document.createElement('a-plane');
        infoPanel.setAttribute('position', '0 2 -2');
        infoPanel.setAttribute('width', '4');
        infoPanel.setAttribute('height', '2');
        infoPanel.setAttribute('color', '#ffffff');
        infoPanel.setAttribute('opacity', '0.9');
        infoPanel.setAttribute('look-at-user', '');
        
        // Add text
        const infoText = document.createElement('a-text');
        infoText.setAttribute('value', `Project: ${title}\nClick to view details`);
        infoText.setAttribute('position', '0 0 0.01');
        infoText.setAttribute('align', 'center');
        infoText.setAttribute('color', '#333');
        
        infoPanel.appendChild(infoText);
        
        // Add to scene temporarily
        const scene = document.getElementById('vrScene');
        scene.appendChild(infoPanel);
        
        // Remove after 5 seconds
        setTimeout(() => {
            infoPanel.remove();
        }, 5000);
    }

    teleportVRUser(position) {
        const camera = document.querySelector('[camera]');
        if (camera) {
            camera.setAttribute('animation', `
                property: position; 
                to: ${position}; 
                dur: 1000; 
                easing: easeInOutQuart
            `);
        }
    }

    // ===== PUBLIC API =====
    async startAR() {
        if (!this.isARSupported) {
            alert('AR is not supported on this device');
            return;
        }
        
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.style.display = 'block';
            
            // Start AR session
            try {
                if ('xr' in navigator) {
                    this.arSession = await navigator.xr.requestSession('immersive-ar');
                }
            } catch (error) {
                console.log('WebXR AR failed, falling back to AR.js');
            }
        }
    }

    async startVR() {
        const vrScene = document.getElementById('vrScene');
        if (!vrScene) return;
        
        if (this.isVRSupported) {
            try {
                await vrScene.enterVR();
                
                // Start voice recognition in VR
                if (this.voiceRecognition) {
                    this.voiceRecognition.start();
                }
            } catch (error) {
                console.error('Failed to enter VR:', error);
            }
        } else {
            alert('VR is not supported on this device');
        }
    }

    stopAR() {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.style.display = 'none';
        }
        
        if (this.arSession) {
            this.arSession.end();
            this.arSession = null;
        }
    }

    stopVR() {
        const vrScene = document.getElementById('vrScene');
        if (vrScene) {
            vrScene.exitVR();
        }
        
        if (this.voiceRecognition) {
            this.voiceRecognition.stop();
        }
        
        if (this.vrSession) {
            this.vrSession.end();
            this.vrSession = null;
        }
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // AR/VR button events
        const enterVRBtn = document.getElementById('enterVR');
        const startARBtn = document.getElementById('startAR');
        
        if (enterVRBtn) {
            enterVRBtn.addEventListener('click', () => this.startVR());
        }
        
        if (startARBtn) {
            startARBtn.addEventListener('click', () => this.startAR());
        }
        
        // Fullscreen events
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.stopVR();
            }
        });
        
        // Device orientation for mobile AR
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                if (this.arSession) {
                    this.handleDeviceOrientation(event);
                }
            });
        }
    }

    handleDeviceOrientation(event) {
        // Use device orientation for AR interactions
        const { alpha, beta, gamma } = event;
        
        // Trigger actions based on device tilting
        if (Math.abs(gamma) > 30) {
            // Device tilted significantly
            if (gamma > 30) {
                // Tilted right
                this.onARSwipeRight();
            } else {
                // Tilted left
                this.onARSwipeLeft();
            }
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.arvrController = new ARVRController();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARVRController;
}