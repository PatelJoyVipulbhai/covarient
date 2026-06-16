import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Linking, Platform, ScrollView, Image } from 'react-native';
import {
  useFonts,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold
} from '@expo-google-fonts/space-grotesk';
import {
  Inter_400Regular,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import {
  Terminal,
  Layers,
  ShoppingBag,
  Cpu,
  Award,
  Menu,
  X,
  Send,
  Mail,
  Clock,
  ChevronRight,
  ArrowRight,
  Star
} from 'lucide-react';

// Custom inline SVG icons for brands/socials to ensure cross-platform compatibility
function Figma({ color, size }: { color?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5A3.5 3.5 0 0 1 8.5 16H8.5A3.5 3.5 0 0 1 5 12.5z" />
      <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5a3.5 3.5 0 0 1-3.5 3.5h-.0A3.5 3.5 0 0 1 5 18.5z" />
    </svg>
  );
}

function Linkedin({ color, size }: { color?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Instagram({ color, size }: { color?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Twitter({ color, size }: { color?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Github({ color, size }: { color?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

import { useForm, Controller } from 'react-hook-form';

function Logo({ size = 24 }: { size?: number }) {
  return (
    <Image
      source={require('../assets/images/logo.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

// ==========================================
// 3D Canvas component using standard WebGL
// ==========================================
function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined' || !containerRef.current) return;

    let THREE: any;
    let scene: any;
    let camera: any;
    let renderer: any;
    let nodesGeometry: any;
    let nodesMaterial: any;
    let nodeSystem: any;
    let lineGeometry: any;
    let lineMaterial: any;
    let lineSystem: any;
    let animationFrameId: number;

    const initThree = async () => {
      THREE = await import('three');
      scene = new THREE.Scene();

      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || 600;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current?.appendChild(renderer.domElement);

      // Node count and properties
      const nodeCount = 75;
      const positions = new Float32Array(nodeCount * 3);
      const velocities = new Float32Array(nodeCount * 3);
      const nodeColors = new Float32Array(nodeCount * 3);
      const isLimeNode = new Uint8Array(nodeCount);

      // Bounding box limits for nodes
      const limitX = 8.5;
      const limitY = 5.5;
      const limitZ = 4.0;

      for (let i = 0; i < nodeCount; i++) {
        // Random positions within limits
        positions[i * 3] = (Math.random() - 0.5) * limitX * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * limitY * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * limitZ * 2;

        // Slow velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.015;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

        // 15% of nodes are lime (#8EE000), 85% are white
        const isLime = Math.random() < 0.18;
        isLimeNode[i] = isLime ? 1 : 0;

        if (isLime) {
          nodeColors[i * 3] = 0.556;     // R (88 in hex / 255)
          nodeColors[i * 3 + 1] = 0.878; // G (224 in hex / 255)
          nodeColors[i * 3 + 2] = 0.0;   // B (0)
        } else {
          nodeColors[i * 3] = 0.9;
          nodeColors[i * 3 + 1] = 0.9;
          nodeColors[i * 3 + 2] = 0.9;
        }
      }

      // Nodes geometry setup
      nodesGeometry = new THREE.BufferGeometry();
      nodesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

      // Circular canvas texture for smooth round glowing nodes
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Core dot
        ctx.arc(16, 16, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Outer glow
        const grad = ctx.createRadialGradient(16, 16, 8, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,0.4)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      const nodeTexture = new THREE.CanvasTexture(canvas);

      nodesMaterial = new THREE.PointsMaterial({
        size: 0.28,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        map: nodeTexture,
        depthWrite: false,
      });

      nodeSystem = new THREE.Points(nodesGeometry, nodesMaterial);
      scene.add(nodeSystem);

      // Lines setup for network connections
      const maxConnections = nodeCount * (nodeCount - 1);
      const linePositions = new Float32Array(maxConnections * 6);
      const lineColors = new Float32Array(maxConnections * 6);

      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });

      lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSystem);

      // Mouse position tracker in 3D coordinate space
      const mouse = { x: -999, y: -999 };
      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const posAttr = nodesGeometry.getAttribute('position');
        const posArray = posAttr.array as Float32Array;

        // Project mouse coordinates to 3D world space (matching layout perspective)
        const mx = mouse.x * 7.5;
        const my = mouse.y * 4.8;

        // Update node positions and bounce off boundary limits
        for (let i = 0; i < nodeCount; i++) {
          const xIdx = i * 3;
          const yIdx = i * 3 + 1;
          const zIdx = i * 3 + 2;

          // Velocity move
          posArray[xIdx] += velocities[xIdx];
          posArray[yIdx] += velocities[yIdx];
          posArray[zIdx] += velocities[zIdx];

          // Bounce X
          if (posArray[xIdx] < -limitX || posArray[xIdx] > limitX) {
            velocities[xIdx] *= -1;
            posArray[xIdx] = Math.max(-limitX, Math.min(limitX, posArray[xIdx]));
          }
          // Bounce Y
          if (posArray[yIdx] < -limitY || posArray[yIdx] > limitY) {
            velocities[yIdx] *= -1;
            posArray[yIdx] = Math.max(-limitY, Math.min(limitY, posArray[yIdx]));
          }
          // Bounce Z
          if (posArray[zIdx] < -limitZ || posArray[zIdx] > limitZ) {
            velocities[zIdx] *= -1;
            posArray[zIdx] = Math.max(-limitZ, Math.min(limitZ, posArray[zIdx]));
          }

          // Mouse distort/repel mesh calculation
          if (mouse.x !== -999) {
            const dx = posArray[xIdx] - mx;
            const dy = posArray[yIdx] - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 2.5) {
              const force = (2.5 - dist) * 0.08;
              posArray[xIdx] += (dx / dist) * force;
              posArray[yIdx] += (dy / dist) * force;
            }
          }
        }

        posAttr.needsUpdate = true;

        // Dynamic Line mesh builder
        const linkPositions = lineGeometry.getAttribute('position').array as Float32Array;
        const linkColors = lineGeometry.getAttribute('color').array as Float32Array;
        let lineIdx = 0;
        let colorIdx = 0;
        let connectionCount = 0;

        const maxDist = 2.8;

        for (let i = 0; i < nodeCount; i++) {
          const ix = posArray[i * 3];
          const iy = posArray[i * 3 + 1];
          const iz = posArray[i * 3 + 2];

          for (let j = i + 1; j < nodeCount; j++) {
            const jx = posArray[j * 3];
            const jy = posArray[j * 3 + 1];
            const jz = posArray[j * 3 + 2];

            const dx = ix - jx;
            const dy = iy - jy;
            const dz = iz - jz;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const alpha = 1.0 - dist / maxDist; // closer = brighter

              // Line position start
              linkPositions[lineIdx++] = ix;
              linkPositions[lineIdx++] = iy;
              linkPositions[lineIdx++] = iz;

              // Line position end
              linkPositions[lineIdx++] = jx;
              linkPositions[lineIdx++] = jy;
              linkPositions[lineIdx++] = jz;

              // Line color fade matching node colors
              const r1 = nodeColors[i * 3];
              const g1 = nodeColors[i * 3 + 1];
              const b1 = nodeColors[i * 3 + 2];

              const r2 = nodeColors[j * 3];
              const g2 = nodeColors[j * 3 + 1];
              const b2 = nodeColors[j * 3 + 2];

              // Set segment 1 vertex color
              linkColors[colorIdx++] = r1 * alpha;
              linkColors[colorIdx++] = g1 * alpha;
              linkColors[colorIdx++] = b1 * alpha;

              // Set segment 2 vertex color
              linkColors[colorIdx++] = r2 * alpha;
              linkColors[colorIdx++] = g2 * alpha;
              linkColors[colorIdx++] = b2 * alpha;

              connectionCount++;
            }
          }
        }

        lineGeometry.getAttribute('position').needsUpdate = true;
        lineGeometry.getAttribute('color').needsUpdate = true;
        lineGeometry.setDrawRange(0, connectionCount * 2);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Cleanups
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    };

    let cleanupFn: (() => void) | undefined;
    initThree().then(cleanup => {
      cleanupFn = cleanup;
    });

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  if (Platform.OS !== 'web') {
    return (
      <View className="w-full h-80 items-center justify-center">
        <Text className="text-customMuted font-mono">Interactive Particle Canvas</Text>
      </View>
    );
  }

  return <div ref={containerRef} className="w-full h-[450px] lg:h-[600px] select-none" />;
}


export default function Index() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    JetBrainsMono_400Regular
  });

  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const [activeTechIdx, setActiveTechIdx] = useState(0);

  const techStack = [
    { name: 'React', category: 'Frontend Library', desc: 'A declarative, efficient component library for building highly interactive, fluid, and component-driven user interfaces.' },
    { name: 'Next.js', category: 'Production Framework', desc: 'The leading React framework featuring hybrid static & server-rendering, smart bundling, and routing optimized for SEO and performance.' },
    { name: 'TypeScript', category: 'Type Safety', desc: 'A strongly typed superset of JavaScript that catches syntax and runtime bugs early, ensuring robust scaling across large team codebases.' },
    { name: 'Node.js', category: 'Backend Runtime', desc: 'An asynchronous event-driven JavaScript runtime designed to power high-throughput backend APIs, real-time engines, and scalable microservices.' },
    { name: 'PostgreSQL', category: 'Relational Database', desc: 'The most advanced open-source SQL database, offering rock-solid ACID transactions, native JSON queries, and enterprise scalability.' },
    { name: 'AWS', category: 'Cloud Infrastructure', desc: 'Comprehensive cloud hosting platforms providing serverless function execution, secure database scaling, and global CDN delivery.' },
    { name: 'React Native', category: 'Mobile Apps', desc: 'Building fully native iOS and Android apps using React and web developer skills, compiling directly to real native UI elements.' },
    { name: 'Flutter', category: 'Mobile Apps', desc: 'Google UI toolkit for compiling beautiful, natively compiled mobile, web, and desktop applications from a single codebase.' },
    { name: 'Figma', category: 'UI/UX Design', desc: 'Collaborative vector graphics editor and prototyping tool used to craft, prototype, and iterate pixel-perfect user experiences.' }
  ];

  // Preloader progress trigger
  useEffect(() => {
    if (!fontsLoaded) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small delay for 100% display, then fade out
          setTimeout(() => {
            setPreloaderVisible(false);
            // Trigger GSAP entry reveals
            if (Platform.OS === 'web') {
              import('gsap').then(({ default: gsap }) => {
                import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                  gsap.registerPlugin(ScrollTrigger);

                  // Sync ScrollTrigger with Lenis updates
                  const globalLenis = (window as any).lenis;
                  if (globalLenis) {
                    globalLenis.on('scroll', () => {
                      ScrollTrigger.update();
                    });
                  }

                  // Force a layout recalculation after DOM settles
                  setTimeout(() => {
                    ScrollTrigger.refresh();
                  }, 250);

                  // Pin left side panel on desktop scroll
                  ScrollTrigger.create({
                    trigger: "#process",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".process-left-panel",
                    pinSpacing: false,
                  });

                  // Sticky scroll process progress line animation
                  gsap.to('.process-progress-line-fill', {
                    scrollTrigger: {
                      trigger: '#process',
                      start: 'top 30%',
                      end: 'bottom 70%',
                      scrub: true,
                    },
                    height: '100%',
                    ease: 'none',
                  });

                  // Step indicators highlight switcher
                  [0, 1, 2, 3].forEach((idx) => {
                    ScrollTrigger.create({
                      trigger: `.process-step-content-${idx}`,
                      start: 'top 40%',
                      end: 'bottom 40%',
                      onToggle: (self) => {
                        const linkEl = document.querySelector(`.step-link-${idx}`);
                        if (linkEl) {
                          if (self.isActive) {
                            linkEl.classList.add('text-[#8EE000]', 'font-bold');
                            linkEl.classList.remove('text-white/30');
                          } else {
                            linkEl.classList.remove('text-[#8EE000]', 'font-bold');
                            linkEl.classList.add('text-white/30');
                          }
                        }
                      }
                    });
                  });

                  // Pin right side panel for Tech Stack on desktop scroll
                  ScrollTrigger.create({
                    trigger: "#tech",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".tech-right-panel",
                    pinSpacing: false,
                  });

                  // Tech stack progress indicators highlight switcher
                  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
                    ScrollTrigger.create({
                      trigger: `.tech-step-content-${idx}`,
                      start: 'top 40%',
                      end: 'bottom 40%',
                      onToggle: (self) => {
                        const linkEl = document.querySelector(`.tech-link-${idx}`);
                        const cardEl = document.querySelector(`.tech-step-content-${idx}`);
                        if (linkEl) {
                          if (self.isActive) {
                            linkEl.classList.add('text-[#8EE000]', 'font-bold');
                            linkEl.classList.remove('text-white/30');
                          } else {
                            linkEl.classList.remove('text-[#8EE000]', 'font-bold');
                            linkEl.classList.add('text-white/30');
                          }
                        }
                        if (cardEl) {
                          if (self.isActive) {
                            cardEl.classList.add('opacity-100');
                            cardEl.classList.remove('opacity-20');
                          } else {
                            cardEl.classList.remove('opacity-100');
                            cardEl.classList.add('opacity-20');
                          }
                        }
                      }
                    });
                  });

                  // Client stories screenshots reveal
                  gsap.utils.toArray('.client-story-screenshot').forEach((elem: any) => {
                    gsap.from(elem, {
                      scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                      },
                      opacity: 0,
                      scale: 0.9,
                      y: 40,
                      duration: 0.8,
                      ease: 'power3.out'
                    });
                  });

                  // Slide down H1 lines
                  gsap.from('.hero-h1-line', {
                    y: 80,
                    opacity: 0,
                    duration: 1.0,
                    stagger: 0.15,
                    ease: 'power4.out',
                  });

                  // Fade in label, subtext and CTA buttons
                  gsap.from('.hero-fade-in', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 0.6,
                    ease: 'power3.out',
                  });

                  // Setup ScrollTrigger Reveals
                  gsap.utils.toArray('.scroll-reveal-text').forEach((elem: any) => {
                    gsap.from(elem, {
                      scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                      },
                      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                      y: 40,
                      opacity: 0,
                      duration: 0.8,
                      ease: 'power3.out'
                    });
                  });

                  // About/Stats counts
                  gsap.utils.toArray('.stat-counter').forEach((elem: any) => {
                    const targetVal = parseInt(elem.getAttribute('data-target') || '0', 10);
                    const isSatisfaction = elem.getAttribute('data-satisfaction') === 'true';
                    const isGain = elem.getAttribute('data-gain') === 'true';
                    const counterObj = { val: 0 };

                    gsap.to(counterObj, {
                      scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                      },
                      val: targetVal,
                      duration: 1.5,
                      ease: 'power2.out',
                      onUpdate: () => {
                        if (isSatisfaction) {
                          elem.innerText = `${Math.floor(counterObj.val)}%`;
                        } else if (isGain) {
                          elem.innerText = `${Math.floor(counterObj.val)}x`;
                        } else {
                          elem.innerText = `${Math.floor(counterObj.val)}+`;
                        }
                      }
                    });
                  });

                  // Services stagger reveal
                  gsap.from('.service-card', {
                    scrollTrigger: {
                      trigger: '.services-grid-container',
                      start: 'top 80%'
                    },
                    opacity: 0,
                    y: 40,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: 'power2.out'
                  });

                  // SVG process line path drawing
                  const path = document.querySelector('.process-svg-path') as SVGPathElement;
                  if (path) {
                    const pathLength = path.getTotalLength();
                    path.style.strokeDasharray = `${pathLength}`;
                    path.style.strokeDashoffset = `${pathLength}`;

                    gsap.to(path, {
                      scrollTrigger: {
                        trigger: '.process-timeline-container',
                        start: 'top 70%',
                        end: 'bottom 60%',
                        scrub: true
                      },
                      strokeDashoffset: 0,
                      ease: 'none'
                    });
                  }

                  // Process Node reveal scales
                  gsap.utils.toArray('.process-node-circle').forEach((node: any) => {
                    gsap.from(node, {
                      scrollTrigger: {
                        trigger: node,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                      },
                      scale: 0,
                      duration: 0.5,
                      ease: 'back.out(1.7)'
                    });
                  });
                });
              });
            }
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [fontsLoaded]);

  // Track Header Background Scroll
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submission handler
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      project: '',
      budget: 'Under $5k'
    }
  });

  const onSubmit = async (data: any) => {
    setSendingForm(true);
    try {
      if (Platform.OS === 'web') {
        const emailjs = await import('@emailjs/browser');
        // If developer has credentials, they can replace these.
        // We will simulate sending to show the UX transitions.
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success: Confetti burst
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 120,
          spread: 80,
          colors: ['#8EE000', '#ffffff', '#141414'],
          origin: { y: 0.6 }
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setFormSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setSendingForm(false);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        // If lenis is active, scroll using lenis
        const globalLenis = (window as any).lenis;
        if (globalLenis) {
          globalLenis.scrollTo(element, { offset: -70 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };



  const services = [
    {
      num: '01',
      title: 'Web Development',
      desc: 'Custom websites & web apps built on React, Next.js, and Node.js. Blazing fast, SEO-optimized, pixel-perfect.',
      icon: Terminal
    },
    {
      num: '02',
      title: 'Mobile App Development',
      desc: 'Native and cross-platform apps in Flutter, React Native, Swift, and Kotlin. iOS + Android.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'UI/UX Design',
      desc: 'Research-driven design in Figma. Wireframes, prototypes, design systems, and full brand UI kits.',
      icon: Figma
    },
    {
      num: '04',
      title: 'E-commerce Solutions',
      desc: 'Shopify, WooCommerce, custom storefronts. Built to convert and scale.',
      icon: ShoppingBag
    },
    {
      num: '05',
      title: 'SaaS Product Development',
      desc: 'End-to-end SaaS platforms with auth, billing, dashboards, multi-tenancy.',
      icon: Layers
    },
    {
      num: '06',
      title: 'Brand Identity',
      desc: 'Logo design, brand guidelines, motion identity, and complete visual systems.',
      icon: Award
    }
  ];



  const clientStories = [
    {
      company: 'FinTrack Pro',
      challenge: 'Real-time financial analytics dashboards were slow and lagged under concurrent user queries.',
      solution: 'Re-engineered backend data layer with optimized PostgreSQL caching, using Next.js Server Components for instant pre-rendering.',
      result: 'Dashboard latency reduced by 78%, client satisfaction score increased from 3.2 to 4.9 stars.',
      metric: '+240%',
      metricLabel: 'Query Speedup',
      quote: "Covarient didn't just build our app — they transformed our business. Delivered in 6 weeks, zero bugs at launch.",
      author: 'Aryan Shah',
      role: 'CEO at FinTrack'
    },
    {
      company: 'StyleHive',
      challenge: 'Outdated fashion marketplace architecture caused high shopping cart bounce rates on mobile browsers.',
      solution: 'Designed and built a custom React SPA client aligned to modern micro-interaction principles and headless checkout routes.',
      result: 'Bounce rates dropped by 45%, and weekly sales conversion increased by 2.2x.',
      metric: '+120%',
      metricLabel: 'Checkout Volume',
      quote: "The most professional dev team we've worked with. They understood our vision better than we did.",
      author: 'Sarah Collins',
      role: 'Founder at StyleHive'
    },
    {
      company: 'BuildFast',
      challenge: 'Construction management quotation pipelines were manual, taking up to 48 hours per customer inquiry.',
      solution: 'Built an automated document-generation dashboard using smart layout engines and serverless PDF generation.',
      result: 'Operational dispatch speed jumped +63%, reducing quotation delays from 2 days to under 5 minutes.',
      metric: '-90%',
      metricLabel: 'Manual Overhead',
      quote: "Our operational systems went from manual spreadsheets to automated workflows. Work is 10 times smoother.",
      author: 'Raj Mehta',
      role: 'Director at BuildFast'
    },
    {
      company: 'MediConnect',
      challenge: 'Critical healthcare telemedicine scheduling screens had poor accessibility and device scaling on Android.',
      solution: 'Refactored Android & iOS modules into a standardized Expo-based codebase with strict automated UI test suites.',
      result: 'App store ratings climbed to 4.9 stars, and appointment booking drop-offs decreased by 60%.',
      metric: '4.9★',
      metricLabel: 'App Store Rating',
      quote: "Top-tier cross-platform work. The app has 4.9 stars on both stores. Our users love it.",
      author: 'Priya Desai',
      role: 'CTO at MediConnect'
    }
  ];

  if (!fontsLoaded) return null;

  return (
    <div className="min-h-screen bg-dark select-text relative w-full overflow-visible">


      {/* SECTION 1: PRELOADER */}
      {preloaderVisible && (
        <View className="absolute inset-0 bg-[#000000] z-[9999] justify-center items-center px-6">
          <View className="items-center max-w-sm w-full">
            {/* Animated CV monogram SVG */}
            <Image
              source={require('../assets/images/logo.png')}
              style={{ width: 100, height: 100, opacity: progress / 100 }}
              resizeMode="contain"
            />

            {/* Progress counter text */}
            <Text className="text-white text-3xl font-space font-bold mt-8 mb-4">
              {progress}%
            </Text>

            {/* Thin neon progress bar */}
            <View className="w-48 h-[1px] bg-white/10 overflow-hidden">
              <View
                className="h-full bg-lime"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        </View>
      )}

      {/* SECTION 2: NAVIGATION */}
      <View
        className={`fixed top-0 left-0 right-0 z-[999] px-6 lg:px-16 py-4 transition-all duration-300 flex-row items-center justify-between ${scrolled
          ? 'bg-[#000000]/85 backdrop-blur-[20px] border-b border-lime/20'
          : 'bg-transparent border-b border-transparent'
          }`}
      >
        <Pressable onPress={() => handleScrollToSection('hero')} className="flex-row items-center gap-2 clickable">
          <Logo size={28} />
          <Text className="text-white font-space font-bold text-lg tracking-[0.15em]">COVARIENT</Text>
        </Pressable>

        {/* Desktop nav links */}
        <View className="hidden lg:flex flex-row items-center gap-8">
          {['Home', 'Services', 'Process', 'About', 'Contact'].map((section) => (
            <Pressable
              key={section}
              onPress={() => handleScrollToSection(section.toLowerCase())}
              className="clickable py-1 relative group"
            >
              <Text className="text-white/70 group-hover:text-lime text-[13px] font-sans font-medium uppercase tracking-[0.08em] transition-colors duration-200">
                {section}
              </Text>
              <View className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Pressable>
          ))}
        </View>

        {/* Let's Talk CTA button */}
        <View className="hidden lg:flex">
          <Pressable
            onPress={() => handleScrollToSection('contact')}
            className="border border-lime px-6 py-2.5 rounded-sm group hover:bg-lime transition-all duration-300 clickable"
          >
            <Text className="text-lime group-hover:text-black font-space font-bold uppercase text-[12px] tracking-[0.08em] transition-colors duration-200">
              Let's Talk
            </Text>
          </Pressable>
        </View>

        {/* Mobile Hamburger toggle */}
        <Pressable
          onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 clickable"
        >
          {mobileMenuOpen
            ? <X color="#8EE000" size={24} />
            : <Menu color="#FFFFFF" size={24} />
          }
        </Pressable>
      </View>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <View className="fixed inset-0 bg-black z-[998] pt-24 px-8 justify-start">
          <View className="flex-col gap-6 items-start">
            {['Home', 'Services', 'Process', 'About', 'Contact'].map((section) => (
              <Pressable
                key={section}
                onPress={() => handleScrollToSection(section.toLowerCase())}
                className="w-full border-b border-white/5 py-4"
              >
                <Text className="text-white hover:text-lime text-2xl font-space font-semibold uppercase tracking-wider">
                  {section}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => handleScrollToSection('contact')}
              className="mt-8 bg-lime py-4 w-full items-center justify-center rounded-sm"
            >
              <Text className="text-black font-space font-bold uppercase tracking-wider">
                Let's Talk
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <div className="w-full mt-0 overflow-visible">

        {/* SECTION 3: HERO */}
        <View id="home" className="min-h-screen justify-center relative overflow-hidden bg-dark px-6 lg:px-16 pt-24">
          <View className="absolute inset-0 z-0">
            <ThreeCanvas />
          </View>

          <View className="max-w-[1280px] mx-auto z-10 w-full pt-12">
            <View className="max-w-[800px] items-start">
              <Text className="hero-fade-in text-lime font-mono text-xs tracking-[0.2em] uppercase mb-6 font-semibold">
                DIGITAL AGENCY · EST. 2022
              </Text>

              {/* H1 Slide-in lines */}
              <View className="overflow-hidden mb-1">
                <h1 className="hero-h1-line text-white font-space font-bold text-5xl lg:text-[96px] leading-[0.95] tracking-tight">
                  We Build
                </h1>
              </View>
              <View className="overflow-hidden mb-1">
                <h1 className="hero-h1-line text-white font-space font-bold text-5xl lg:text-[96px] leading-[0.95] tracking-tight">
                  Digital Products
                </h1>
              </View>
              <View className="overflow-hidden mb-6">
                <h1 className="hero-h1-line text-white font-space font-bold text-5xl lg:text-[96px] leading-[0.95] tracking-tight">
                  That <span className="text-[#8EE000]">Dominate.</span>
                </h1>
              </View>

              <Text className="hero-fade-in text-customMuted font-sans text-lg lg:text-[20px] max-w-[500px] leading-relaxed mb-10">
                Apps & Websites engineered for performance, crafted for impact.
              </Text>

              <View className="hero-fade-in flex-row gap-4 flex-wrap">
                <Pressable
                  onPress={() => handleScrollToSection('contact')}
                  className="bg-lime px-8 py-4 rounded-[4px] hover:scale-[1.04] active:scale-[0.98] transition-transform duration-200 clickable"
                >
                  <Text className="text-black font-space font-bold uppercase text-[14px] tracking-wider">
                    Start a Project
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleScrollToSection('services')}
                  className="border border-lime px-8 py-4 rounded-[4px] hover:bg-lime/10 transition-colors duration-200 clickable"
                >
                  <Text className="text-lime font-space font-bold uppercase text-[14px] tracking-wider">
                    Our Services
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Scroll Indicator */}
          <View className="absolute bottom-10 left-1/2 -translate-x-1/2 items-center">
            <Text className="text-[10px] font-mono text-white/40 tracking-[0.25em] mb-2 uppercase">
              SCROLL
            </Text>
            <View className="w-1.5 h-1.5 rounded-full bg-lime animate-bounce" />
          </View>
        </View>

        {/* SECTION 4: MARQUEE TICKER STRIP */}
        <View className="w-full h-14 bg-[#8EE000] overflow-hidden flex-row items-center border-y border-white/5">
          <style>{`
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .marquee-inner {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .marquee-inner:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="marquee-inner flex-row items-center select-none cursor-pointer">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex-row items-center whitespace-nowrap">
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  WEB DEVELOPMENT
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  MOBILE APPS
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  UI/UX DESIGN
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  BRANDING
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  E-COMMERCE
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  SAAS PRODUCTS
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
                <span className="text-black font-space font-bold text-[14px] tracking-[0.15em] uppercase mx-4">
                  DIGITAL STRATEGY
                </span>
                <span className="text-black/60 mx-2 text-xs">◆</span>
              </span>
            ))}
          </div>
        </View>

        {/* SECTION 5: ABOUT / NUMBERS */}
        <View id="about" className="px-6 lg:px-16 py-[120px] bg-dark border-b border-white/5">
          <View className="max-w-[1280px] mx-auto flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left Col */}
            <View className="w-full lg:w-[55%] items-start">
              <Text className="text-lime font-mono text-[12px] tracking-[0.25em] uppercase mb-4 font-semibold">
                ABOUT COVARIENT
              </Text>

              <div
                className="scroll-reveal-text"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <Text className="text-white font-space font-bold text-3xl lg:text-[56px] leading-[1.1] mb-8">
                  We turn bold ideas into world-class digital products.
                </Text>
              </div>

              <Text className="text-customMuted font-sans text-base lg:text-[17px] leading-[1.8] mb-8">
                Covarient is a full-stack development agency specializing in building high-performance web apps, mobile experiences, and scalable SaaS platforms. We combine sharp engineering with thoughtful design.
              </Text>

              <View className="flex-row gap-3">
                <View className="bg-card border border-lime/30 px-4 py-2 rounded-full">
                  <Text className="text-lime font-sans text-xs">#StartupFriendly</Text>
                </View>
                <View className="bg-card border border-lime/30 px-4 py-2 rounded-full">
                  <Text className="text-lime font-sans text-xs">#EnterpriseReady</Text>
                </View>
              </View>
            </View>

            {/* Right Col */}
            <View className="w-full lg:w-[45%] grid grid-cols-2 gap-[1px] bg-white/5 border border-white/5 overflow-hidden">
              {[
                { label: 'Projects Delivered', val: 50, sfx: '+' },
                { label: 'Years of Excellence', val: 3, sfx: '+' },
                { label: 'Countries Served', val: 15, sfx: '+' },
                { label: 'Client Satisfaction', val: 100, sfx: '%', satisfy: true }
              ].map((stat, i) => (
                <View
                  key={i}
                  className="bg-[#141414] p-8 hover:border-lime/40 border border-transparent transition-all duration-300 group"
                >
                  <span
                    className="stat-counter text-lime font-space font-bold text-4xl lg:text-6xl"
                    data-target={stat.val}
                    data-satisfaction={stat.satisfy ? 'true' : 'false'}
                  >
                    0{stat.sfx}
                  </span>
                  <Text className="text-customMuted font-sans text-xs lg:text-[14px] mt-2 group-hover:text-white transition-colors duration-200">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 6: SERVICES */}
        <div
          id="services"
          className="relative px-6 lg:px-16 py-32 bg-[#050505] border-b border-white/5 overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-20">
              <p className="text-[#8EE000] text-xs tracking-[0.25em] uppercase mb-4 font-mono">
                OUR SERVICES
              </p>

              <h2 className="text-white text-5xl lg:text-6xl font-bold leading-tight max-w-3xl font-space">
                Solutions Built
                <br />
                For Ambitious Brands.
              </h2>

              <p className="text-zinc-400 mt-6 max-w-xl font-sans text-base leading-relaxed">
                We design, develop and scale digital products
                that create measurable business impact.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {services.map((svc, i) => {
                const IconComp = svc.icon;
                const colSpanClass = [
                  "lg:col-span-6", // Web Development
                  "lg:col-span-3", // Mobile Apps
                  "lg:col-span-3", // UI/UX Design
                  "lg:col-span-4", // Ecommerce
                  "lg:col-span-4", // SaaS Development
                  "lg:col-span-4"  // Brand Identity
                ][i] || "lg:col-span-4";

                return (
                  <div
                    key={i}
                    className={`group bg-[#0A0A0A] border border-white/5 p-10 min-h-[320px] flex flex-col transition-all duration-300 hover:border-[#8EE000] relative ${colSpanClass}`}
                  >
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#8EE000] transition-all duration-500 group-hover:w-full" />

                    {/* Giant Faded Background Number */}
                    <span className="absolute right-6 top-6 text-[90px] font-bold text-white/[0.03] select-none pointer-events-none font-space group-hover:text-[#8EE000]/[0.05] transition-colors duration-300">
                      {svc.num}
                    </span>

                    <span className="text-white/20 text-5xl font-bold mb-10 font-space block">
                      {svc.num}
                    </span>

                    <div className="mb-8">
                      <IconComp
                        size={24}
                        strokeWidth={1.5}
                        color="#8EE000"
                      />
                    </div>

                    <h3 className="text-white text-2xl font-bold mb-4 font-space">
                      {svc.title}
                    </h3>

                    <p className="text-white/60 text-[15px] leading-7 flex-grow font-sans">
                      {svc.desc}
                    </p>


                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 8: PROCESS */}
        <div id="process" className="px-6 lg:px-16 py-32 bg-[#0D0D0D] border-b border-white/5 relative overflow-visible">

          {/* Mobile Header (Visible only on mobile/tablet, hidden on desktop) */}
          <div className="lg:hidden mb-16">
            <p className="text-lime font-mono text-xs tracking-[0.25em] uppercase mb-4">
              HOW WE WORK
            </p>
            <h2 className="text-white text-4xl font-bold leading-tight font-space mb-6">
              From Idea to <span className="text-lime">Launch.</span>
            </h2>
            <p className="text-customMuted text-base font-sans leading-relaxed">
              A proven process that keeps projects fast, transparent, and predictable.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 overflow-visible">

            {/* Left Column - Sticky Side (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="process-left-panel h-fit flex flex-col justify-between" style={{ minHeight: '60vh', alignSelf: 'start' }}>
                <div>
                  <p className="text-lime font-mono text-xs tracking-[0.25em] uppercase mb-4">
                    HOW WE WORK
                  </p>

                  <h2 className="text-white text-6xl font-bold leading-tight font-space mb-6">
                    From Idea to
                    <span className="text-lime block mt-2">Launch.</span>
                  </h2>

                  <p className="text-customMuted text-lg font-sans max-w-md mb-12 leading-relaxed">
                    A proven process that keeps projects fast, transparent, and predictable.
                  </p>
                </div>

                {/* Progress Tracker */}
                <div className="flex flex-row items-center gap-8 mt-auto">
                  {/* Vertical Progress Line */}
                  <div className="w-[2px] h-32 bg-white/10 relative overflow-hidden">
                    <div className="process-progress-line-fill absolute top-0 left-0 w-full h-0 bg-[#8EE000]" />
                  </div>

                  {/* Steps List */}
                  <div className="flex flex-col gap-3">
                    {[
                      { num: '01', title: 'Discovery' },
                      { num: '02', title: 'Design' },
                      { num: '03', title: 'Development' },
                      { num: '04', title: 'Launch' }
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`step-link step-link-${idx} flex items-center gap-3 text-white/30 text-sm font-space uppercase tracking-wider transition-all duration-300`}
                      >
                        <span className="font-mono text-xs">{step.num}</span>
                        <span className="font-bold text-[14px]">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Scrolling Side */}
            <div className="w-full lg:col-span-7 flex flex-col gap-16 lg:gap-24">
              {[
                {
                  num: '01',
                  title: 'Discovery',
                  desc: 'We dive into your goals, audience, and market. Research, strategy, and clarity. We map out the exact path to achieve your business objectives before writing any code.'
                },
                {
                  num: '02',
                  title: 'Design',
                  desc: 'Wireframes → Prototypes → Final UI. Every pixel reviewed with your team. We construct a complete, component-driven design system in Figma tailored perfectly to your brand.'
                },
                {
                  num: '03',
                  title: 'Development',
                  desc: 'Clean, tested, documented code. Agile sprints with weekly demos and Slack updates. We engineer high-performance web and mobile products with scaling in mind.'
                },
                {
                  num: '04',
                  title: 'Launch & Scale',
                  desc: 'Deployment, QA, monitoring, and post-launch growth support. We ensure a flawless release and provide continuous speed audits and optimization to keep you ahead.'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`process-step-content process-step-content-${idx} bg-[#0A0A0A] border border-white/5 p-12 min-h-[300px] flex flex-col justify-center relative hover:border-[#8EE000]/30 transition-colors duration-300`}
                >
                  {/* Giant Faded Background Number */}
                  <span className="absolute right-8 top-8 text-[110px] font-bold text-white/[0.02] font-space select-none pointer-events-none">
                    {step.num}
                  </span>

                  <span className="text-lime text-sm font-mono mb-8 block">
                    {step.num}
                  </span>

                  <div className="w-[2px] h-12 bg-[#8EE000] mb-8" />

                  <h3 className="text-white text-3xl font-space font-bold mb-4">
                    {step.title}
                  </h3>

                  <p className="text-customMuted leading-relaxed text-[16px] font-sans">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* SECTION 9: TECH STACK (Typography Wall) */}
        <div id="tech" className="px-6 lg:px-16 py-32 bg-dark border-b border-white/5 relative overflow-visible">

          {/* Mobile Header (Visible only on mobile/tablet) */}
          <div className="lg:hidden mb-16">
            <p className="text-lime font-mono text-xs tracking-[0.25em] uppercase mb-4">
              TECHNOLOGIES
            </p>
            <h2 className="text-white text-4xl font-bold leading-tight font-space mb-6">
              Tools we <span className="text-lime">trust.</span>
            </h2>
            <p className="text-customMuted text-base font-sans leading-relaxed">
              We leverage a curated, battle-tested modern tech stack to build lightning-fast, secure, and infinitely scalable applications.
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 overflow-visible">

            {/* Left side: Giant Typography List (Scrolling) - desktop order-1, mobile order-2 */}
            <div className="w-full lg:col-span-7 flex flex-col gap-24 lg:gap-32 order-2 lg:order-1">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className={`tech-step-content tech-step-content-${idx} flex flex-col items-start transition-opacity duration-300 opacity-20`}
                >
                  <span className="text-lime font-mono text-xs mb-4 uppercase tracking-wider">
                    {tech.category}
                  </span>

                  <h3 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6">
                    {tech.name.toUpperCase()}
                  </h3>

                  <p className="text-customMuted font-sans text-lg leading-relaxed max-w-xl">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right side: Heading & Pinned Navigator (Desktop Only) - desktop order-2, mobile order-1 */}
            <div className="hidden lg:block lg:col-span-5 order-1 lg:order-2">
              <div className="tech-right-panel h-fit flex flex-col justify-between" style={{ minHeight: '60vh', alignSelf: 'start' }}>
                <div>
                  <p className="text-lime font-mono text-xs tracking-[0.25em] uppercase mb-4">
                    TECHNOLOGIES
                  </p>
                  <h2 className="text-white text-6xl font-bold leading-tight font-space mb-6">
                    Tools we
                    <span className="text-lime block mt-2">trust.</span>
                  </h2>
                  <p className="text-customMuted text-base font-sans max-w-sm leading-relaxed mb-12">
                    We leverage a curated, battle-tested modern tech stack to build lightning-fast, secure, and infinitely scalable applications.
                  </p>
                </div>

                {/* Tech Navigator List */}
                <div className="flex flex-col gap-3 mt-auto">
                  {techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className={`tech-link tech-link-${idx} flex items-center gap-3 text-white/30 text-sm font-space uppercase tracking-wider transition-all duration-300`}
                    >
                      <span className="font-mono text-xs">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="font-bold text-[14px]">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 10: CLIENT STORIES (Screenshot / Chat Wall) */}
        <div id="testimonials" className="px-6 lg:px-16 py-32 bg-dark border-b border-white/5 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10">

            {/* Header */}
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <p className="text-[#8EE000] text-xs tracking-[0.25em] uppercase mb-4 font-mono">
                CLIENT STORIES
              </p>
              <h2 className="text-white text-5xl lg:text-6xl font-bold leading-tight font-space mb-6">
                Real Slack, WhatsApp & Mail Snaps.
              </h2>
              <p className="text-zinc-400 font-sans text-base leading-relaxed">
                We don't do boring text reviews. Here is actual feedback from our project channels demonstrating how we deliver real outcomes.
              </p>
            </div>

            {/* Interactive Grid Wall */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative select-none">

              {/* SLACK SNAPSHOT CARD */}
              <div className="client-story-screenshot bg-[#0F0D13] border border-white/10 rounded-lg p-6 rotate-[-1deg] hover:rotate-0 hover:scale-[1.03] hover:border-lime/50 transition-all duration-300 shadow-2xl relative group">
                <div className="flex flex-row items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E01E5A]" />
                    <span className="text-white/60 font-mono text-xs uppercase tracking-wider font-semibold">#product-telemetry</span>
                  </div>
                  <span className="text-white/30 font-mono text-[10px]">slack-channel</span>
                </div>

                <div className="flex flex-row items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-[#4A154B] items-center justify-center flex font-bold text-white font-space text-sm">
                    AS
                  </div>
                  <div>
                    <div className="flex flex-row items-baseline gap-2">
                      <span className="text-white font-space font-bold text-sm">Aryan Shah</span>
                      <span className="text-white/40 text-[10px] font-sans">11:24 AM</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mt-1 font-sans">
                      Just checked the telemetry dashboards. Loading speeds are under <span className="text-[#8EE000] font-semibold">0.8s</span> now across all regions. Absolutely phenomenal job by the Covarient team! 🚀
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-2 pl-12">
                  <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-xs flex flex-row items-center gap-1.5 hover:bg-[#8EE000]/10 hover:border-[#8EE000]/30 transition-colors">
                    <span>🔥</span> <span className="text-white/70 font-semibold font-sans">8</span>
                  </div>
                  <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-xs flex flex-row items-center gap-1.5 hover:bg-[#8EE000]/10 hover:border-[#8EE000]/30 transition-colors">
                    <span>🙌</span> <span className="text-white/70 font-semibold font-sans">5</span>
                  </div>
                  <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-xs flex flex-row items-center gap-1.5 hover:bg-[#8EE000]/10 hover:border-[#8EE000]/30 transition-colors">
                    <span>🚀</span> <span className="text-white/70 font-semibold font-sans">12</span>
                  </div>
                </div>
              </div>

              {/* WHATSAPP SNAPSHOT CARD */}
              <div className="client-story-screenshot bg-[#075e54]/10 border border-[#075e54]/30 rounded-lg p-6 rotate-[1.5deg] hover:rotate-0 hover:scale-[1.03] hover:border-[#8EE000]/50 transition-all duration-300 shadow-2xl relative group">
                <div className="flex flex-row items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] items-center justify-center flex text-[8px] text-white">✓</span>
                    <span className="text-white/60 font-space text-xs uppercase tracking-wider font-semibold">Sarah Collins (StyleHive)</span>
                  </div>
                  <span className="text-[#25d366] font-mono text-[10px] uppercase tracking-wider">online</span>
                </div>

                <div className="flex flex-col gap-3 font-sans text-[13px]">
                  {/* Client message bubble */}
                  <div className="bg-[#202C33] rounded-r-lg rounded-bl-lg p-3.5 text-white/90 max-w-[85%] self-start border-l-2 border-[#8EE000]">
                    <p className="leading-relaxed">
                      Hey team, the mobile checkout flow is super smooth. Bounce rate dropped to <span className="text-[#8EE000] font-semibold">14%</span> this week! Conversions are way up.
                    </p>
                    <span className="text-[9px] text-white/40 block text-right mt-1">10:42 PM</span>
                  </div>

                  {/* Our message bubble */}
                  <div className="bg-[#005C4B] rounded-l-lg rounded-br-lg p-3.5 text-white max-w-[85%] self-end">
                    <p className="leading-relaxed font-sans text-[13px]">
                      Incredible news Sarah! 🚀 We're monitoring the edge server response rates now to support the weekend traffic spikes.
                    </p>
                    <div className="flex flex-row justify-end items-center gap-1 mt-1">
                      <span className="text-[9px] text-white/60">10:45 PM</span>
                      <span className="text-[#53bdeb] text-[10px]">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LINKEDIN REVIEW CARD */}
              <div className="client-story-screenshot bg-[#0b1625] border border-white/10 rounded-lg p-6 rotate-[0.5deg] hover:rotate-0 hover:scale-[1.03] hover:border-lime/50 transition-all duration-300 shadow-2xl relative group">
                <div className="flex flex-row items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex flex-row items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" style={{ display: 'inline-block' }}>
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span className="text-white/60 font-mono text-xs uppercase tracking-wider font-semibold">LinkedIn Recommendation</span>
                  </div>
                  <span className="text-white/30 font-mono text-[10px]">verified</span>
                </div>

                <div className="flex flex-row items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#8EE000]/10 border border-[#8EE000]/30 items-center justify-center flex font-bold text-[#8EE000] text-sm font-space">
                    RM
                  </div>
                  <div>
                    <span className="text-white font-space font-bold text-sm block">Raj Mehta</span>
                    <span className="text-white/40 text-[10px] font-sans">Director at BuildFast · 1st</span>
                  </div>
                </div>

                <p className="text-white/80 italic text-sm leading-relaxed mb-4 font-sans">
                  "Highly recommend Covarient for product engineering. We migrated our quotation engine from manual spreadsheets to automated workflows in under 6 weeks. Our team efficiency is up by <span className="text-[#8EE000] font-semibold">+63%</span>!"
                </p>

                <div className="border-t border-white/5 pt-3 flex flex-row justify-between text-white/40 font-mono text-[10px]">
                  <span>👍 24 Likes</span>
                  <span>💬 4 Comments</span>
                </div>
              </div>

              {/* GMAIL EMAIL SLICE */}
              <div className="client-story-screenshot bg-[#151111] border border-white/10 rounded-lg p-6 rotate-[-1.5deg] hover:rotate-0 hover:scale-[1.03] hover:border-lime/50 transition-all duration-300 shadow-2xl relative group">
                <div className="flex flex-row items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EA4335]" />
                    <span className="text-white/60 font-mono text-xs uppercase tracking-wider font-semibold">telemedicine release</span>
                  </div>
                  <span className="text-white/30 font-mono text-[10px]">gmail-snippet</span>
                </div>

                <div className="flex flex-col gap-2 font-sans text-sm">
                  <div className="flex flex-row justify-between text-white/50 text-[11px] mb-2 font-mono">
                    <div>
                      <span className="text-white/30 font-sans">From: </span>Priya Desai &lt;cto@mediconnect.com&gt;
                    </div>
                    <div>Jun 14</div>
                  </div>

                  <p className="text-white/90 leading-relaxed font-sans text-sm">
                    Hi team, iOS & Android apps have been approved and are live. We've officially hit <span className="text-[#8EE000] font-semibold">4.9 stars</span> on the stores. Booking drop-offs decreased by 60% as projected. Let's start planning phase 2.
                  </p>

                  <div className="w-12 h-[1px] bg-white/10 my-2" />

                  <p className="text-white/40 text-xs font-sans">
                    Best regards,<br />
                    Priya Desai, CTO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 11: CTA / CONTACT */}
        <div id="contact" className="px-6 lg:px-16 py-32 bg-dark border-t border-white/5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, #0d1500 0%, #000000 75%)'
          }} />

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

            {/* Giant Heading */}
            <div className="text-center mb-16 max-w-4xl">
              <h2 className="text-white font-space font-bold text-5xl md:text-7xl lg:text-[100px] leading-[0.95] tracking-tighter uppercase mb-8">
                Ready to build
                <br />
                your next <span className="text-[#8EE000]">big idea?</span>
              </h2>
              <p className="text-zinc-400 font-sans text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Let's turn your concept into a production-grade software product.
              </p>
            </div>

            {/* Content Container (No card background, clean input underlines, lots of whitespace) */}
            <div className="w-full max-w-[640px] flex flex-col items-stretch">

              {formSubmitted ? (
                <div className="text-center py-16">
                  <span className="text-[#8EE000] text-6xl mb-6 block">✓</span>
                  <h4 className="text-white font-space font-bold text-2xl mb-3 uppercase">
                    Message Dispatched
                  </h4>
                  <p className="text-zinc-400 font-sans text-sm mb-8">
                    Thank you. A Covarient engineer will review your project specs and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="border border-[#8EE000] px-8 py-3.5 rounded-sm text-[#8EE000] hover:bg-[#8EE000] hover:text-black font-space font-bold text-xs uppercase tracking-wider transition-all cursor-pointer bg-transparent"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Name */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Name</label>
                    <Controller
                      control={control}
                      rules={{ required: 'Name is required' }}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="text"
                          onChange={onChange}
                          value={value}
                          className="bg-transparent border-b border-white/10 focus:border-[#8EE000] pb-3 pt-1 text-white font-sans text-lg outline-none transition-colors"
                          placeholder="Sarah Connor"
                        />
                      )}
                    />
                    {errors.name && (
                      <span className="text-red-500 font-mono text-xs mt-1 absolute bottom-[-20px]">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Email Address</label>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      }}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="email"
                          onChange={onChange}
                          value={value}
                          className="bg-transparent border-b border-white/10 focus:border-[#8EE000] pb-3 pt-1 text-white font-sans text-lg outline-none transition-colors"
                          placeholder="sarah@skynet.com"
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="text-red-500 font-mono text-xs mt-1 absolute bottom-[-20px]">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Message / Project Info */}
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-white/40 font-mono text-[10px] uppercase tracking-widest">What are you building?</label>
                    <Controller
                      control={control}
                      rules={{ required: 'Please tell us about your project' }}
                      name="project"
                      render={({ field: { onChange, value } }) => (
                        <textarea
                          rows={3}
                          onChange={onChange}
                          value={value}
                          className="bg-transparent border-b border-white/10 focus:border-[#8EE000] pb-3 pt-1 text-white font-sans text-lg outline-none transition-colors resize-none"
                          placeholder="Describe your vision, timeline, or key technical specifications..."
                        />
                      )}
                    />
                    {errors.project && (
                      <span className="text-red-500 font-mono text-xs mt-1 absolute bottom-[-20px]">{errors.project.message}</span>
                    )}
                  </div>

                  {/* Estimated Budget Selector */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Estimated Budget</label>
                    <Controller
                      control={control}
                      name="budget"
                      render={({ field: { onChange, value } }) => (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {['Under $5k', '$5k–15k', '$15k–50k', '$50k+'].map((budget) => (
                            <button
                              type="button"
                              key={budget}
                              onClick={() => onChange(budget)}
                              className={`px-5 py-3 border text-xs font-space font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${value === budget
                                ? 'bg-[#8EE000] text-black border-[#8EE000]'
                                : 'border-white/10 text-white hover:border-[#8EE000]'
                                }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={sendingForm}
                    className="bg-[#8EE000] hover:scale-[1.02] active:scale-[0.98] transition-all py-5 w-full rounded-sm items-center justify-center flex mt-6 group cursor-pointer border-none"
                  >
                    <span className="text-black font-space font-bold uppercase tracking-wider text-base">
                      {sendingForm ? 'Sending Project Specs...' : 'Initialize Project Specs ✓'}
                    </span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* SECTION 12: FOOTER */}
        <View className="bg-[#050505] border-t border-white/5 px-6 lg:px-16 py-[100px] pb-12 relative overflow-hidden">
          <View className="max-w-[1280px] mx-auto z-10 relative">





            {/* Footer Navigation & Brand Details */}
            <View className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6 mb-16">

              {/* Left Column: Brand details & Socials */}
              <View className="items-start">
                <View className="flex-row items-center gap-2 mb-6">
                  <Logo size={24} />
                  <Text className="text-white font-space font-bold text-base tracking-wider">COVARIENT</Text>
                </View>
                <Text className="text-customMuted font-sans text-sm leading-relaxed mb-8">
                  A high-end digital design and development partner crafting premium software products that stand out.
                </Text>

                {/* Social Links with hover state */}
                <View className="flex-row gap-6">
                  <Pressable onPress={() => Linking.openURL('#')} className="clickable group flex-row items-center gap-1">
                    <Linkedin color="#888888" size={18} />
                    <span className="text-xs font-mono text-white/40 group-hover:text-[#8EE000] transition-colors duration-300">LI</span>
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL('#')} className="clickable group flex-row items-center gap-1">
                    <Instagram color="#888888" size={18} />
                    <span className="text-xs font-mono text-white/40 group-hover:text-[#8EE000] transition-colors duration-300">IG</span>
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL('#')} className="clickable group flex-row items-center gap-1">
                    <Twitter color="#888888" size={18} />
                    <span className="text-xs font-mono text-white/40 group-hover:text-[#8EE000] transition-colors duration-300">TW</span>
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL('#')} className="clickable group flex-row items-center gap-1">
                    <Github color="#888888" size={18} />
                    <span className="text-xs font-mono text-white/40 group-hover:text-[#8EE000] transition-colors duration-300">GH</span>
                  </Pressable>
                </View>
              </View>

              {/* Middle Column: Services & Links (Grouped for cleaner layout) */}
              <View className="grid grid-cols-2 gap-8 md:col-span-2">
                <View>
                  <Text className="text-white font-space font-bold text-xs uppercase tracking-widest mb-6 border-l-2 border-[#8EE000] pl-3">
                    Capabilities
                  </Text>
                  <View className="flex-col gap-3.5">
                    {['Web Development', 'Mobile App Dev', 'UI/UX Design', 'SaaS Solutions', 'Brand Identity'].map((lnk, i) => (
                      <Pressable
                        key={i}
                        onPress={() => { }}
                        className="clickable group flex-row items-center"
                      >
                        <Text className="text-white/50 group-hover:text-[#8EE000] group-hover:translate-x-1 transition-all duration-300 text-sm font-sans">
                          → {lnk}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-white font-space font-bold text-xs uppercase tracking-widest mb-6 border-l-2 border-[#8EE000] pl-3">
                    Company
                  </Text>
                  <View className="flex-col gap-3.5">
                    {['About Us', 'Our Process', 'Contact Us'].map((lnk, i) => (
                      <Pressable
                        key={i}
                        onPress={() => handleScrollToSection(lnk === 'Contact Us' ? 'contact' : lnk === 'About Us' ? 'about' : 'process')}
                        className="clickable group flex-row items-center"
                      >
                        <Text className="text-white/50 group-hover:text-[#8EE000] group-hover:translate-x-1 transition-all duration-300 text-sm font-sans">
                          → {lnk}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>

            </View>

            {/* Bottom copyright bar */}
            <View className="border-t border-white/5 pt-8 flex-col md:flex-row justify-between items-center gap-4">
              <Text className="text-white/30 font-sans text-xs">
                © 2026 Covarient. Crafted with precision.
              </Text>
              <Text className="text-white/30 font-sans text-xs">
                Ahmedabad, India
              </Text>
            </View>
          </View>
        </View>
      </div>
    </div >
  );
}
