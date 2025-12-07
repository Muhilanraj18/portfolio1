// ===== ANIMATED ICONS SYSTEM =====

class AnimatedIconsController {
    constructor() {
        this.icons = new Map();
        this.observedIcons = new Set();
        this.init();
    }

    init() {
        this.createSVGDefs();
        this.initializeIcons();
        this.setupIntersectionObserver();
        this.bindEvents();
    }

    // ===== SVG DEFINITIONS =====
    createSVGDefs() {
        const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgDefs.setAttribute('style', 'display: none;');
        svgDefs.innerHTML = `
            <defs>
                <!-- Gradients -->
                <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
                
                <linearGradient id="creativGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
                </linearGradient>
                
                <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#43e97b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#38f9d7;stop-opacity:1" />
                </linearGradient>
                
                <linearGradient id="socialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffa726;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fb8c00;stop-opacity:1" />
                </linearGradient>

                <!-- Filters -->
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                
                <filter id="dropShadow">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
            </defs>
        `;
        
        document.body.appendChild(svgDefs);
    }

    // ===== ICON DEFINITIONS =====
    getIconSVG(iconType, config = {}) {
        const icons = {
            // ===== SKILL ICONS =====
            javascript: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <rect x="10" y="10" width="80" height="80" rx="15" fill="url(#codeGradient)" opacity="0.9">
                        <animate attributeName="rx" values="15;25;15" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    <text x="50" y="60" text-anchor="middle" fill="white" font-size="24" font-weight="bold">JS</text>
                    <circle cx="25" cy="25" r="3" fill="#fff" opacity="0.7">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="75" cy="75" r="2" fill="#fff" opacity="0.5">
                        <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            `,
            
            react: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <g transform="translate(50,50)">
                        <!-- Electron orbits -->
                        <ellipse cx="0" cy="0" rx="35" ry="15" fill="none" stroke="url(#techGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
                        </ellipse>
                        <ellipse cx="0" cy="0" rx="35" ry="15" fill="none" stroke="url(#techGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite" begin="0s"/>
                            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="8s" repeatCount="indefinite" begin="0s"/>
                        </ellipse>
                        <ellipse cx="0" cy="0" rx="35" ry="15" fill="none" stroke="url(#techGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="120;480" dur="8s" repeatCount="indefinite"/>
                        </ellipse>
                        
                        <!-- Nucleus -->
                        <circle cx="0" cy="0" r="6" fill="url(#techGradient)">
                            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Electrons -->
                        <circle cx="35" cy="0" r="3" fill="#61dafb">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-17.5" cy="30" r="3" fill="#61dafb">
                            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="8s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-17.5" cy="-30" r="3" fill="#61dafb">
                            <animateTransform attributeName="transform" type="rotate" values="120;480" dur="8s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
            `,
            
            threejs: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <defs>
                        <linearGradient id="threeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#000000"/>
                            <stop offset="100%" style="stop-color:#ffffff"/>
                        </linearGradient>
                    </defs>
                    
                    <!-- 3D Cube -->
                    <g transform="translate(50,50)">
                        <!-- Front face -->
                        <polygon points="-20,-20 20,-20 20,20 -20,20" fill="url(#techGradient)" opacity="0.8">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite"/>
                        </polygon>
                        
                        <!-- Top face -->
                        <polygon points="-20,-20 -15,-25 25,-25 20,-20" fill="url(#codeGradient)" opacity="0.6">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite"/>
                        </polygon>
                        
                        <!-- Right face -->
                        <polygon points="20,-20 25,-25 25,15 20,20" fill="url(#creativGradient)" opacity="0.7">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite"/>
                        </polygon>
                        
                        <!-- 3D text -->
                        <text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">3D</text>
                    </g>
                </svg>
            `,

            webgl: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <g transform="translate(50,50)">
                        <!-- GPU grid -->
                        <g opacity="0.6">
                            <line x1="-30" y1="-30" x2="30" y2="-30" stroke="url(#codeGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                            </line>
                            <line x1="-30" y1="-10" x2="30" y2="-10" stroke="url(#codeGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.2s"/>
                            </line>
                            <line x1="-30" y1="10" x2="30" y2="10" stroke="url(#codeGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.4s"/>
                            </line>
                            <line x1="-30" y1="30" x2="30" y2="30" stroke="url(#codeGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                            </line>
                            
                            <line x1="-30" y1="-30" x2="-30" y2="30" stroke="url(#techGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.8s"/>
                            </line>
                            <line x1="-10" y1="-30" x2="-10" y2="30" stroke="url(#techGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
                            </line>
                            <line x1="10" y1="-30" x2="10" y2="30" stroke="url(#techGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.2s"/>
                            </line>
                            <line x1="30" y1="-30" x2="30" y2="30" stroke="url(#techGradient)" stroke-width="1">
                                <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.4s"/>
                            </line>
                        </g>
                        
                        <!-- WebGL logo -->
                        <circle cx="0" cy="0" r="25" fill="none" stroke="url(#creativGradient)" stroke-width="3">
                            <animate attributeName="stroke-dasharray" values="0,157;78.5,78.5;0,157" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        
                        <text x="0" y="-5" text-anchor="middle" fill="url(#codeGradient)" font-size="10" font-weight="bold">WebGL</text>
                        <text x="0" y="10" text-anchor="middle" fill="url(#creativGradient)" font-size="8">GPU</text>
                    </g>
                </svg>
            `,

            quantum: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <g transform="translate(50,50)">
                        <!-- Quantum Sphere -->
                        <circle cx="0" cy="0" r="30" fill="none" stroke="url(#techGradient)" stroke-width="2" opacity="0.3">
                            <animate attributeName="r" values="30;35;30" dur="4s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Quantum Orbits -->
                        <ellipse cx="0" cy="0" rx="25" ry="8" fill="none" stroke="url(#codeGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite"/>
                        </ellipse>
                        <ellipse cx="0" cy="0" rx="25" ry="8" fill="none" stroke="url(#creativGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="6s" repeatCount="indefinite"/>
                        </ellipse>
                        <ellipse cx="0" cy="0" rx="25" ry="8" fill="none" stroke="url(#socialGradient)" stroke-width="2">
                            <animateTransform attributeName="transform" type="rotate" values="120;480" dur="6s" repeatCount="indefinite"/>
                        </ellipse>
                        
                        <!-- Quantum States -->
                        <circle cx="0" cy="0" r="4" fill="url(#techGradient)">
                            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Quantum Bits -->
                        <circle cx="20" cy="0" r="2" fill="#00ff41">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="6s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-10" cy="17" r="2" fill="#ff0080">
                            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="6s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Q Symbol -->
                        <text x="0" y="5" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Q</text>
                    </g>
                </svg>
            `,

            flutter: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <g transform="translate(50,50)">
                        <!-- Flutter Logo Animation -->
                        <polygon points="-20,-25 -20,5 10,35 20,25 -10,-5 -20,-15" fill="url(#techGradient)">
                            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
                        </polygon>
                        <polygon points="-10,-5 20,25 20,35 10,35 -20,5" fill="url(#creativGradient)" opacity="0.8">
                            <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="8s" repeatCount="indefinite"/>
                        </polygon>
                        <polygon points="10,25 20,15 20,35 10,35" fill="url(#codeGradient)">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                        </polygon>
                        
                        <!-- Floating Particles -->
                        <circle cx="25" cy="0" r="1.5" fill="#42A5F5" opacity="0.8">
                            <animate attributeName="cy" values="0;-10;0" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-25" cy="10" r="1" fill="#1976D2" opacity="0.6">
                            <animate attributeName="cy" values="10;0;10" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
            `,

            unity: () => `
                <svg viewBox="0 0 100 100" class="animated-icon skill-icon">
                    <g transform="translate(50,50)">
                        <!-- Unity Cube -->
                        <g>
                            <!-- Front Face -->
                            <polygon points="-15,-15 15,-15 15,15 -15,15" fill="url(#techGradient)" opacity="0.9">
                                <animateTransform attributeName="transform" type="rotateY" values="0;360" dur="6s" repeatCount="indefinite"/>
                            </polygon>
                            
                            <!-- Top Face -->
                            <polygon points="-15,-15 -10,-20 20,-20 15,-15" fill="url(#codeGradient)" opacity="0.7">
                                <animateTransform attributeName="transform" type="rotateY" values="0;360" dur="6s" repeatCount="indefinite"/>
                            </polygon>
                            
                            <!-- Right Face -->
                            <polygon points="15,-15 20,-20 20,10 15,15" fill="url(#creativGradient)" opacity="0.8">
                                <animateTransform attributeName="transform" type="rotateY" values="0;360" dur="6s" repeatCount="indefinite"/>
                            </polygon>
                        </g>
                        
                        <!-- Unity Logo Elements -->
                        <circle cx="-25" cy="-25" r="3" fill="white">
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="25" cy="-25" r="3" fill="white">
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                        </circle>
                        <circle cx="0" cy="25" r="3" fill="white">
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1s"/>
                        </circle>
                        
                        <!-- Connecting Lines -->
                        <line x1="-25" y1="-25" x2="0" y2="0" stroke="white" stroke-width="2" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                        </line>
                        <line x1="25" y1="-25" x2="0" y2="0" stroke="white" stroke-width="2" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s"/>
                        </line>
                        <line x1="0" y1="25" x2="0" y2="0" stroke="white" stroke-width="2" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="2s"/>
                        </line>
                    </g>
                </svg>
            `,

            // ===== SOCIAL ICONS =====
            github: () => `
                <svg viewBox="0 0 100 100" class="animated-icon social-icon">
                    <circle cx="50" cy="50" r="45" fill="url(#socialGradient)" opacity="0.1">
                        <animate attributeName="r" values="45;48;45" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <!-- GitHub Octocat -->
                    <g transform="translate(50,50)">
                        <!-- Head -->
                        <circle cx="0" cy="-5" r="18" fill="#333">
                            <animate attributeName="r" values="18;19;18" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Eyes -->
                        <circle cx="-6" cy="-8" r="2" fill="white">
                            <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="6" cy="-8" r="2" fill="white">
                            <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                        </circle>
                        
                        <!-- Tentacles -->
                        <path d="M -15,5 Q -20,15 -15,25" stroke="#333" stroke-width="3" fill="none">
                            <animate attributeName="d" values="M -15,5 Q -20,15 -15,25;M -15,5 Q -25,15 -20,25;M -15,5 Q -20,15 -15,25" dur="4s" repeatCount="indefinite"/>
                        </path>
                        <path d="M 15,5 Q 20,15 15,25" stroke="#333" stroke-width="3" fill="none">
                            <animate attributeName="d" values="M 15,5 Q 20,15 15,25;M 15,5 Q 25,15 20,25;M 15,5 Q 20,15 15,25" dur="4s" repeatCount="indefinite" begin="1s"/>
                        </path>
                        
                        <!-- Body -->
                        <ellipse cx="0" cy="15" rx="8" ry="12" fill="#333">
                            <animate attributeName="ry" values="12;13;12" dur="3s" repeatCount="indefinite"/>
                        </ellipse>
                    </g>
                </svg>
            `,

            linkedin: () => `
                <svg viewBox="0 0 100 100" class="animated-icon social-icon">
                    <rect x="15" y="15" width="70" height="70" rx="10" fill="url(#socialGradient)">
                        <animate attributeName="rx" values="10;15;10" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    
                    <!-- LinkedIn logo -->
                    <g fill="white">
                        <!-- Profile square -->
                        <rect x="25" y="25" width="8" height="8" rx="2">
                            <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Profile line -->
                        <rect x="25" y="38" width="8" height="30">
                            <animate attributeName="height" values="30;32;30" dur="2.5s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Connection lines -->
                        <rect x="40" y="38" width="8" height="30">
                            <animate attributeName="height" values="30;25;30" dur="3s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Network nodes -->
                        <circle cx="52" cy="45" r="2" opacity="0.8">
                            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <rect x="55" y="50" width="8" height="18">
                            <animate attributeName="height" values="18;22;18" dur="2.8s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Connection line -->
                        <line x1="48" y1="45" x2="55" y2="50" stroke="white" stroke-width="2" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                        </line>
                    </g>
                </svg>
            `,

            email: () => `
                <svg viewBox="0 0 100 100" class="animated-icon social-icon">
                    <circle cx="50" cy="50" r="40" fill="url(#creativGradient)" opacity="0.1">
                        <animate attributeName="r" values="40;43;40" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <!-- Envelope -->
                    <rect x="20" y="35" width="60" height="40" rx="5" fill="url(#creativGradient)" opacity="0.9">
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                    </rect>
                    
                    <!-- Envelope flap -->
                    <polygon points="20,35 50,55 80,35" fill="none" stroke="white" stroke-width="2">
                        <animate attributeName="stroke-width" values="2;3;2" dur="2.5s" repeatCount="indefinite"/>
                    </polygon>
                    
                    <!-- Email particles -->
                    <circle cx="30" cy="25" r="2" fill="#fff" opacity="0.7">
                        <animate attributeName="cy" values="25;15;25" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <circle cx="50" cy="20" r="1.5" fill="#fff" opacity="0.5">
                        <animate attributeName="cy" values="20;10;20" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                    
                    <circle cx="70" cy="25" r="1.8" fill="#fff" opacity="0.6">
                        <animate attributeName="cy" values="25;15;25" dur="3.2s" repeatCount="indefinite" begin="1s"/>
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                </svg>
            `,

            // ===== NAVIGATION ICONS =====
            menu: () => `
                <svg viewBox="0 0 100 100" class="animated-icon nav-icon">
                    <g transform="translate(50,50)">
                        <!-- Menu lines -->
                        <line x1="-20" y1="-10" x2="20" y2="-10" stroke="url(#techGradient)" stroke-width="3">
                            <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                        </line>
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="url(#creativGradient)" stroke-width="3">
                            <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.3s"/>
                        </line>
                        <line x1="-20" y1="10" x2="20" y2="10" stroke="url(#codeGradient)" stroke-width="3">
                            <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                        </line>
                        
                        <!-- Interactive dots -->
                        <circle cx="25" cy="-10" r="2" fill="url(#techGradient)" opacity="0.7">
                            <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="25" cy="0" r="2" fill="url(#creativGradient)" opacity="0.7">
                            <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                        </circle>
                        <circle cx="25" cy="10" r="2" fill="url(#codeGradient)" opacity="0.7">
                            <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                        </circle>
                    </g>
                </svg>
            `,

            close: () => `
                <svg viewBox="0 0 100 100" class="animated-icon nav-icon">
                    <g transform="translate(50,50)">
                        <!-- X lines -->
                        <line x1="-20" y1="-20" x2="20" y2="20" stroke="url(#creativGradient)" stroke-width="4">
                            <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                        </line>
                        <line x1="20" y1="-20" x2="-20" y2="20" stroke="url(#creativGradient)" stroke-width="4">
                            <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                        </line>
                        
                        <!-- Rotation ring -->
                        <circle cx="0" cy="0" r="30" fill="none" stroke="url(#creativGradient)" stroke-width="2" opacity="0.3">
                            <animate attributeName="stroke-dasharray" values="0,188;94,94;0,188" dur="3s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
            `,

            // ===== ACTION ICONS =====
            download: () => `
                <svg viewBox="0 0 100 100" class="animated-icon action-icon">
                    <g transform="translate(50,50)">
                        <!-- Cloud -->
                        <ellipse cx="0" cy="-10" rx="25" ry="15" fill="url(#socialGradient)" opacity="0.8">
                            <animate attributeName="ry" values="15;17;15" dur="3s" repeatCount="indefinite"/>
                        </ellipse>
                        
                        <!-- Download arrow -->
                        <line x1="0" y1="-5" x2="0" y2="20" stroke="white" stroke-width="3">
                            <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                        </line>
                        
                        <!-- Arrow head -->
                        <polygon points="0,20 -8,12 8,12" fill="white">
                            <animate attributeName="fill-opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/>
                        </polygon>
                        
                        <!-- Download particles -->
                        <circle cx="-5" cy="5" r="1.5" fill="white" opacity="0.6">
                            <animate attributeName="cy" values="5;25;5" dur="2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <circle cx="5" cy="8" r="1" fill="white" opacity="0.4">
                            <animate attributeName="cy" values="8;28;8" dur="2.2s" repeatCount="indefinite" begin="0.3s"/>
                            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite" begin="0.3s"/>
                        </circle>
                        
                        <!-- Base line -->
                        <line x1="-20" y1="25" x2="20" y2="25" stroke="url(#socialGradient)" stroke-width="3">
                            <animate attributeName="stroke-width" values="3;5;3" dur="2.5s" repeatCount="indefinite"/>
                        </line>
                    </g>
                </svg>
            `,

            // ===== PORTFOLIO ICONS =====
            project: () => `
                <svg viewBox="0 0 100 100" class="animated-icon portfolio-icon">
                    <g transform="translate(50,50)">
                        <!-- Project window -->
                        <rect x="-30" y="-25" width="60" height="40" rx="5" fill="url(#techGradient)" opacity="0.9">
                            <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Window header -->
                        <rect x="-30" y="-25" width="60" height="8" rx="5" fill="url(#creativGradient)"/>
                        
                        <!-- Window controls -->
                        <circle cx="-22" cy="-21" r="2" fill="#ff5f57"/>
                        <circle cx="-15" cy="-21" r="2" fill="#ffbd2e"/>
                        <circle cx="-8" cy="-21" r="2" fill="#28ca42"/>
                        
                        <!-- Code lines -->
                        <line x1="-25" y1="-10" x2="10" y2="-10" stroke="white" stroke-width="2" opacity="0.7">
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                        </line>
                        <line x1="-25" y1="-3" x2="20" y2="-3" stroke="white" stroke-width="2" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.2s"/>
                        </line>
                        <line x1="-25" y1="4" x2="5" y2="4" stroke="white" stroke-width="2" opacity="0.5">
                            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.4s"/>
                        </line>
                        
                        <!-- Cursor -->
                        <rect x="25" y="2" width="2" height="6" fill="white">
                            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Output display -->
                        <rect x="-25" y="20" width="50" height="15" fill="url(#codeGradient)" opacity="0.3">
                            <animate attributeName="width" values="50;55;50" dur="4s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Success indicator -->
                        <circle cx="20" cy="27" r="3" fill="#28ca42" opacity="0.8">
                            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
            `
        };

        return icons[iconType] ? icons[iconType]() : this.getDefaultIcon();
    }

    getDefaultIcon() {
        return `
            <svg viewBox="0 0 100 100" class="animated-icon default-icon">
                <circle cx="50" cy="50" r="30" fill="url(#techGradient)" opacity="0.8">
                    <animate attributeName="r" values="30;33;30" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="50" y="55" text-anchor="middle" fill="white" font-size="16">?</text>
            </svg>
        `;
    }

    // ===== ICON INITIALIZATION =====
    initializeIcons() {
        // Replace icon placeholders with animated SVGs
        this.replaceSkillIcons();
        this.replaceSocialIcons();
        this.replaceNavigationIcons();
        this.replaceActionIcons();
        this.replacePortfolioIcons();
    }

    replaceSkillIcons() {
        const skillCategories = document.querySelectorAll('.skill-category');
        const skillIcons = ['quantum', 'react', 'flutter', 'unity'];
        
        skillCategories.forEach((category, index) => {
            const iconContainer = category.querySelector('.category-icon');
            if (iconContainer) {
                const iconType = skillIcons[index % skillIcons.length];
                iconContainer.innerHTML = this.getIconSVG(iconType);
                this.registerIcon(iconContainer, iconType);
            }
        });

        // Also handle individual skill items if they exist
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const iconContainer = item.querySelector('.skill-icon-container');
            if (iconContainer) {
                const iconType = skillIcons[index % skillIcons.length];
                iconContainer.innerHTML = this.getIconSVG(iconType);
                this.registerIcon(iconContainer, iconType);
            }
        });
    }

    replaceSocialIcons() {
        const socialLinks = {
            'github': 'github',
            'linkedin': 'linkedin', 
            'email': 'email'
        };
        
        Object.entries(socialLinks).forEach(([className, iconType]) => {
            const elements = document.querySelectorAll(`.${className}-icon, .social-${className}`);
            elements.forEach(element => {
                element.innerHTML = this.getIconSVG(iconType);
                this.registerIcon(element, iconType);
            });
        });
    }

    replaceNavigationIcons() {
        // Mobile menu toggle
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn) {
            menuBtn.innerHTML = this.getIconSVG('menu');
            this.registerIcon(menuBtn, 'menu');
        }
        
        // Close buttons
        document.querySelectorAll('.close-btn, .modal-close').forEach(btn => {
            btn.innerHTML = this.getIconSVG('close');
            this.registerIcon(btn, 'close');
        });
    }

    replaceActionIcons() {
        // Download buttons
        document.querySelectorAll('.download-btn, .resume-download').forEach(btn => {
            const iconContainer = btn.querySelector('.icon') || btn;
            iconContainer.innerHTML = this.getIconSVG('download');
            this.registerIcon(iconContainer, 'download');
        });
    }

    replacePortfolioIcons() {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const iconContainer = item.querySelector('.project-icon') || 
                                document.createElement('div');
            
            if (!item.querySelector('.project-icon')) {
                iconContainer.className = 'project-icon';
                item.insertBefore(iconContainer, item.firstChild);
            }
            
            iconContainer.innerHTML = this.getIconSVG('project');
            this.registerIcon(iconContainer, 'project');
        });
    }

    // ===== ICON REGISTRATION AND MANAGEMENT =====
    registerIcon(element, iconType) {
        const iconId = `icon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        element.setAttribute('data-icon-id', iconId);
        
        this.icons.set(iconId, {
            element,
            type: iconType,
            svg: element.querySelector('svg'),
            isVisible: false,
            hasAnimated: false
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iconId = entry.target.getAttribute('data-icon-id');
                if (iconId && this.icons.has(iconId)) {
                    const icon = this.icons.get(iconId);
                    
                    if (entry.isIntersecting) {
                        this.animateIconEntry(icon);
                    } else {
                        this.animateIconExit(icon);
                    }
                }
            });
        }, options);
        
        // Observe all registered icons
        this.icons.forEach(icon => {
            this.observer.observe(icon.element);
        });
    }

    // ===== ANIMATION METHODS =====
    animateIconEntry(icon) {
        if (icon.hasAnimated) return;
        
        icon.isVisible = true;
        icon.hasAnimated = true;
        
        const svg = icon.svg;
        if (!svg) return;
        
        // Entry animation based on icon type
        switch (icon.type) {
            case 'javascript':
            case 'react':
            case 'threejs':
            case 'webgl':
                this.animateSkillIconEntry(svg);
                break;
                
            case 'github':
            case 'linkedin':
            case 'email':
                this.animateSocialIconEntry(svg);
                break;
                
            case 'menu':
            case 'close':
                this.animateNavIconEntry(svg);
                break;
                
            case 'download':
                this.animateActionIconEntry(svg);
                break;
                
            case 'project':
                this.animatePortfolioIconEntry(svg);
                break;
                
            default:
                this.animateDefaultIconEntry(svg);
        }
    }

    animateIconExit(icon) {
        icon.isVisible = false;
        // Icons keep their animations running even when not visible
        // This maintains smooth experience when scrolling
    }

    animateSkillIconEntry(svg) {
        // Scale and fade in
        svg.style.transform = 'scale(0) rotate(-180deg)';
        svg.style.opacity = '0';
        
        svg.animate([
            { 
                transform: 'scale(0) rotate(-180deg)', 
                opacity: '0',
                filter: 'blur(10px)'
            },
            { 
                transform: 'scale(1.1) rotate(10deg)', 
                opacity: '0.8',
                filter: 'blur(2px)',
                offset: 0.7
            },
            { 
                transform: 'scale(1) rotate(0deg)', 
                opacity: '1',
                filter: 'blur(0px)'
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards'
        });
    }

    animateSocialIconEntry(svg) {
        // Bounce in from left
        svg.style.transform = 'translateX(-100px) scale(0.5)';
        svg.style.opacity = '0';
        
        svg.animate([
            { 
                transform: 'translateX(-100px) scale(0.5)', 
                opacity: '0' 
            },
            { 
                transform: 'translateX(10px) scale(1.1)', 
                opacity: '0.8',
                offset: 0.6
            },
            { 
                transform: 'translateX(0) scale(1)', 
                opacity: '1' 
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fill: 'forwards'
        });
    }

    animateNavIconEntry(svg) {
        // Fade and rotate in
        svg.style.transform = 'rotate(90deg) scale(0.8)';
        svg.style.opacity = '0';
        
        svg.animate([
            { 
                transform: 'rotate(90deg) scale(0.8)', 
                opacity: '0' 
            },
            { 
                transform: 'rotate(0deg) scale(1)', 
                opacity: '1' 
            }
        ], {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }

    animateActionIconEntry(svg) {
        // Drop down effect
        svg.style.transform = 'translateY(-50px) scale(1.2)';
        svg.style.opacity = '0';
        
        svg.animate([
            { 
                transform: 'translateY(-50px) scale(1.2)', 
                opacity: '0' 
            },
            { 
                transform: 'translateY(5px) scale(0.95)', 
                opacity: '0.8',
                offset: 0.7
            },
            { 
                transform: 'translateY(0) scale(1)', 
                opacity: '1' 
            }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }

    animatePortfolioIconEntry(svg) {
        // Glitch effect entry
        svg.style.transform = 'scale(0.9)';
        svg.style.opacity = '0';
        svg.style.filter = 'hue-rotate(0deg)';
        
        const animation = svg.animate([
            { 
                transform: 'scale(0.9)', 
                opacity: '0',
                filter: 'hue-rotate(0deg)'
            },
            {
                transform: 'scale(1.05)',
                opacity: '0.7',
                filter: 'hue-rotate(180deg)',
                offset: 0.3
            },
            {
                transform: 'scale(0.98)',
                opacity: '0.9',
                filter: 'hue-rotate(360deg)',
                offset: 0.6
            },
            { 
                transform: 'scale(1)', 
                opacity: '1',
                filter: 'hue-rotate(0deg)'
            }
        ], {
            duration: 700,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }

    animateDefaultIconEntry(svg) {
        // Simple fade in
        svg.style.opacity = '0';
        svg.style.transform = 'scale(0.8)';
        
        svg.animate([
            { opacity: '0', transform: 'scale(0.8)' },
            { opacity: '1', transform: 'scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }

    // ===== INTERACTION METHODS =====
    bindEvents() {
        // Hover effects for all icons
        document.addEventListener('mouseover', (e) => {
            const iconElement = e.target.closest('[data-icon-id]');
            if (iconElement) {
                this.onIconHover(iconElement);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const iconElement = e.target.closest('[data-icon-id]');
            if (iconElement) {
                this.onIconHoverExit(iconElement);
            }
        });
        
        // Click effects
        document.addEventListener('click', (e) => {
            const iconElement = e.target.closest('[data-icon-id]');
            if (iconElement) {
                this.onIconClick(iconElement);
            }
        });
    }

    onIconHover(element) {
        const iconId = element.getAttribute('data-icon-id');
        const icon = this.icons.get(iconId);
        
        if (!icon || !icon.svg) return;
        
        // Hover animation
        icon.svg.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        icon.svg.style.transform = 'scale(1.1) rotate(5deg)';
        
        // Add glow effect
        icon.svg.style.filter = 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.5))';
        
        // Trigger specific hover effects
        this.triggerIconSpecificHover(icon);
    }

    onIconHoverExit(element) {
        const iconId = element.getAttribute('data-icon-id');
        const icon = this.icons.get(iconId);
        
        if (!icon || !icon.svg) return;
        
        // Reset hover animation
        icon.svg.style.transform = 'scale(1) rotate(0deg)';
        icon.svg.style.filter = 'none';
    }

    onIconClick(element) {
        const iconId = element.getAttribute('data-icon-id');
        const icon = this.icons.get(iconId);
        
        if (!icon || !icon.svg) return;
        
        // Click animation
        icon.svg.animate([
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(0.9) rotate(-5deg)' },
            { transform: 'scale(1.05) rotate(2deg)' },
            { transform: 'scale(1) rotate(0deg)' }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
        // Add click particles
        this.createClickParticles(element);
    }

    triggerIconSpecificHover(icon) {
        const svg = icon.svg;
        
        switch (icon.type) {
            case 'react':
                // Speed up electron orbit
                const electrons = svg.querySelectorAll('circle[cx="35"], circle[cx="-17.5"]');
                electrons.forEach(electron => {
                    const animation = electron.querySelector('animateTransform');
                    if (animation) {
                        animation.setAttribute('dur', '4s');
                    }
                });
                break;
                
            case 'github':
                // Make tentacles wave faster
                const tentacles = svg.querySelectorAll('path');
                tentacles.forEach(tentacle => {
                    const animation = tentacle.querySelector('animate');
                    if (animation) {
                        animation.setAttribute('dur', '2s');
                    }
                });
                break;
        }
    }

    createClickParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create particle burst
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / 6) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    left: `${centerX}px`, 
                    top: `${centerY}px`, 
                    opacity: 1, 
                    transform: 'scale(1)' 
                },
                { 
                    left: `${endX}px`, 
                    top: `${endY}px`, 
                    opacity: 0, 
                    transform: 'scale(0)' 
                }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }
    }

    // ===== PUBLIC API =====
    addIcon(element, iconType) {
        element.innerHTML = this.getIconSVG(iconType);
        this.registerIcon(element, iconType);
        this.observer.observe(element);
    }

    removeIcon(element) {
        const iconId = element.getAttribute('data-icon-id');
        if (iconId && this.icons.has(iconId)) {
            this.observer.unobserve(element);
            this.icons.delete(iconId);
            element.removeAttribute('data-icon-id');
        }
    }

    refreshIcons() {
        // Re-scan document for new icon placeholders
        this.initializeIcons();
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    pauseAnimations() {
        document.querySelectorAll('.animated-icon animate, .animated-icon animateTransform').forEach(animation => {
            animation.setAttribute('dur', 'indefinite');
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.animated-icon animate, .animated-icon animateTransform').forEach(animation => {
            // Restore original duration
            const originalDur = animation.getAttribute('data-original-dur') || '2s';
            animation.setAttribute('dur', originalDur);
        });
    }

    // ===== RESPONSIVE HANDLING =====
    handleResize() {
        // Adjust icon sizes for different screen sizes
        const isMobile = window.innerWidth <= 768;
        
        document.querySelectorAll('.animated-icon').forEach(svg => {
            if (isMobile) {
                svg.style.width = '24px';
                svg.style.height = '24px';
            } else {
                svg.style.width = '32px';
                svg.style.height = '32px';
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.animatedIcons = new AnimatedIconsController();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.animatedIcons.handleResize();
        }, 250);
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimatedIconsController;
}