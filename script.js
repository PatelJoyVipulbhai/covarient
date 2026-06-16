document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. STATE & UTILS
    // ==========================================
    let progress = 0;
    const preloader = document.getElementById('preloader');
    const progressText = document.getElementById('preloader-progress-text');
    const progressBar = document.getElementById('preloader-progress-bar');
    const preloaderLogo = document.getElementById('preloader-logo');

    // ==========================================
    // 2. PRELOADER TICKER
    // ==========================================
    const preloaderInterval = setInterval(() => {
        progress += 2;
        if (progressText) progressText.innerText = `${progress}%`;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (preloaderLogo) preloaderLogo.style.opacity = progress / 100;

        if (progress >= 100) {
            clearInterval(preloaderInterval);
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('fade-out');
                }
                // Trigger entry reveals once preloader is gone
                initializeScrollAnimations();
            }, 500);
        }
    }, 25);

    // ==========================================
    // 3. NAVIGATION & MOBILE OVERLAY
    // ==========================================
    const header = document.getElementById('main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');

    // Track scroll for sticky header border/bg
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isHidden = mobileNav.classList.contains('hidden');
            if (isHidden) {
                mobileNav.classList.remove('hidden');
                menuIcon.setAttribute('data-lucide', 'x');
                lucide.createIcons();
            } else {
                mobileNav.classList.add('hidden');
                menuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            mobileNav.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
            
            // Handle smooth scroll offset
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for desktop nav links
    const desktopLinks = document.querySelectorAll('.nav-link, .header-cta-btn, .hero-cta-primary, .hero-cta-secondary');
    desktopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const offsetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize Lucide icons on static elements
    lucide.createIcons();

    // ==========================================
    // 4. THREE.JS PARTICLE MESH
    // ==========================================
    const canvasContainer = document.getElementById('particle-canvas-container');
    if (canvasContainer) {
        let scene, camera, renderer, nodesGeometry, nodesMaterial, nodeSystem, lineGeometry, lineMaterial, lineSystem;
        let animationFrameId;

        const initThree = () => {
            scene = new THREE.Scene();
            const width = canvasContainer.clientWidth || window.innerWidth;
            const height = canvasContainer.clientHeight || window.innerHeight;

            camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
            camera.position.z = 10;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            canvasContainer.appendChild(renderer.domElement);

            const nodeCount = 75;
            const positions = new Float32Array(nodeCount * 3);
            const velocities = new Float32Array(nodeCount * 3);
            const nodeColors = new Float32Array(nodeCount * 3);

            const limitX = 8.5;
            const limitY = 5.5;
            const limitZ = 4.0;

            for (let i = 0; i < nodeCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * limitX * 2;
                positions[i * 3 + 1] = (Math.random() - 0.5) * limitY * 2;
                positions[i * 3 + 2] = (Math.random() - 0.5) * limitZ * 2;

                velocities[i * 3] = (Math.random() - 0.5) * 0.015;
                velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

                const isLime = Math.random() < 0.18;
                if (isLime) {
                    nodeColors[i * 3] = 0.556;
                    nodeColors[i * 3 + 1] = 0.878;
                    nodeColors[i * 3 + 2] = 0.0;
                } else {
                    nodeColors[i * 3] = 0.9;
                    nodeColors[i * 3 + 1] = 0.9;
                    nodeColors[i * 3 + 2] = 0.9;
                }
            }

            nodesGeometry = new THREE.BufferGeometry();
            nodesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.arc(16, 16, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

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

            const mouse = { x: -999, y: -999 };
            window.addEventListener('mousemove', (e) => {
                const rect = canvasContainer.getBoundingClientRect();
                mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            });

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);

                const posAttr = nodesGeometry.getAttribute('position');
                const posArray = posAttr.array;

                const mx = mouse.x * 7.5;
                const my = mouse.y * 4.8;

                for (let i = 0; i < nodeCount; i++) {
                    const xIdx = i * 3;
                    const yIdx = i * 3 + 1;
                    const zIdx = i * 3 + 2;

                    posArray[xIdx] += velocities[xIdx];
                    posArray[yIdx] += velocities[yIdx];
                    posArray[zIdx] += velocities[zIdx];

                    if (posArray[xIdx] < -limitX || posArray[xIdx] > limitX) {
                        velocities[xIdx] *= -1;
                        posArray[xIdx] = Math.max(-limitX, Math.min(limitX, posArray[xIdx]));
                    }
                    if (posArray[yIdx] < -limitY || posArray[yIdx] > limitY) {
                        velocities[yIdx] *= -1;
                        posArray[yIdx] = Math.max(-limitY, Math.min(limitY, posArray[yIdx]));
                    }
                    if (posArray[zIdx] < -limitZ || posArray[zIdx] > limitZ) {
                        velocities[zIdx] *= -1;
                        posArray[zIdx] = Math.max(-limitZ, Math.min(limitZ, posArray[zIdx]));
                    }

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

                const linkPositions = lineGeometry.getAttribute('position').array;
                const linkColors = lineGeometry.getAttribute('color').array;
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
                            const alpha = 1.0 - dist / maxDist;

                            linkPositions[lineIdx++] = ix;
                            linkPositions[lineIdx++] = iy;
                            linkPositions[lineIdx++] = iz;

                            linkPositions[lineIdx++] = jx;
                            linkPositions[lineIdx++] = jy;
                            linkPositions[lineIdx++] = jz;

                            const r1 = nodeColors[i * 3];
                            const g1 = nodeColors[i * 3 + 1];
                            const b1 = nodeColors[i * 3 + 2];

                            const r2 = nodeColors[j * 3];
                            const g2 = nodeColors[j * 3 + 1];
                            const b2 = nodeColors[j * 3 + 2];

                            linkColors[colorIdx++] = r1 * alpha;
                            linkColors[colorIdx++] = g1 * alpha;
                            linkColors[colorIdx++] = b1 * alpha;

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

            window.addEventListener('resize', () => {
                const w = canvasContainer.clientWidth;
                const h = canvasContainer.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            });
        };

        initThree();
    }

    // ==========================================
    // 5. GSAP SCROLLTRIGGERS & LENIS SCROLL
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.registerPlugin(ScrollTrigger);

    function initializeScrollAnimations() {
        // Hero entry reveals
        gsap.from('.hero-h1-line', {
            y: 80,
            opacity: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power4.out',
        });

        gsap.from('.hero-fade-in', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.6,
            ease: 'power3.out',
        });

        // About header text clip reveal
        gsap.from('#about .scroll-reveal-text h2', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Stats counters reveal
        gsap.utils.toArray('.stat-number').forEach((elem) => {
            const targetVal = parseInt(elem.getAttribute('data-target') || '0', 10);
            const suffix = elem.getAttribute('data-suffix') || '';
            const isSatisfaction = elem.getAttribute('data-satisfaction') === 'true';
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
                    } else {
                        elem.innerText = `${Math.floor(counterObj.val)}${suffix}`;
                    }
                }
            });
        });

        // Services cards stagger entry
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out'
        });

        // Client stories scale/y reveals
        gsap.utils.toArray('.client-story-screenshot').forEach((elem) => {
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

        // Pin Process left panel on desktop
        if (window.innerWidth >= 1024) {
            ScrollTrigger.create({
                trigger: '#process',
                start: 'top top',
                end: 'bottom bottom',
                pin: '.process-left-panel',
                pinSpacing: false,
            });

            // Sticky scroll process progress line height
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

            // Step navigator switcher highlights
            [0, 1, 2, 3].forEach((idx) => {
                ScrollTrigger.create({
                    trigger: `.process-step-content-${idx}`,
                    start: 'top 40%',
                    end: 'bottom 40%',
                    onToggle: (self) => {
                        const linkEl = document.querySelector(`.step-link-${idx}`);
                        if (linkEl) {
                            if (self.isActive) {
                                linkEl.style.color = '#8EE000';
                                linkEl.style.fontWeight = '700';
                            } else {
                                linkEl.style.color = 'rgba(255,255,255,0.3)';
                                linkEl.style.fontWeight = '500';
                            }
                        }
                    }
                });
            });

            // Pin Tech Stack right panel on desktop
            ScrollTrigger.create({
                trigger: '#tech',
                start: 'top top',
                end: 'bottom bottom',
                pin: '.tech-right-panel',
                pinSpacing: false,
            });

            // Tech Stack highlight highlights
            [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
                ScrollTrigger.create({
                    trigger: `.tech-step-content-${idx}`,
                    start: 'top 40%',
                    end: 'bottom 40%',
                    onToggle: (self) => {
                        const linkEl = document.querySelector(`.tech-link-${idx}`);
                        const contentEl = document.querySelector(`.tech-step-content-${idx}`);
                        
                        if (linkEl) {
                            if (self.isActive) {
                                linkEl.style.color = '#8EE000';
                                linkEl.style.fontWeight = '700';
                            } else {
                                linkEl.style.color = 'rgba(255,255,255,0.3)';
                                linkEl.style.fontWeight = '500';
                            }
                        }

                        if (contentEl) {
                            if (self.isActive) {
                                contentEl.style.opacity = '1';
                            } else {
                                contentEl.style.opacity = '0.2';
                            }
                        }
                    }
                });
            });
        }
    }

    // ==========================================
    // 6. CONTACT FORM VALIDATIONS & CONFETTI
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const successState = document.getElementById('form-success-state');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const budgetButtons = document.querySelectorAll('.budget-btn');
    const hiddenBudgetInput = document.getElementById('form-budget');

    // Budget selector tabs click handler
    budgetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            budgetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (hiddenBudgetInput) {
                hiddenBudgetInput.value = btn.getAttribute('data-budget');
            }
        });
    });

    // Reset Success view handler
    if (resetFormBtn && contactForm && successState) {
        resetFormBtn.addEventListener('click', () => {
            successState.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }

    // Form validation and simulation on submit
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const projectInput = document.getElementById('form-project');

            const errorName = document.getElementById('error-name');
            const errorEmail = document.getElementById('error-email');
            const errorProject = document.getElementById('error-project');

            let isValid = true;

            // Name check
            if (!nameInput.value.trim()) {
                errorName.classList.remove('hidden');
                isValid = false;
            } else {
                errorName.classList.add('hidden');
            }

            // Email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                errorEmail.innerText = 'Email is required';
                errorEmail.classList.remove('hidden');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.innerText = 'Invalid email address';
                errorEmail.classList.remove('hidden');
                isValid = false;
            } else {
                errorEmail.classList.add('hidden');
            }

            // Project/Message check
            if (!projectInput.value.trim()) {
                errorProject.classList.remove('hidden');
                isValid = false;
            } else {
                errorProject.classList.add('hidden');
            }

            if (!isValid) return;

            // Loader State Changes
            const submitBtn = document.getElementById('form-submit-btn');
            const submitText = submitBtn.querySelector('span');
            const originalText = submitText.innerText;
            submitText.innerText = 'Sending Project Specs...';
            submitBtn.disabled = true;

            // Mock submission delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success Transition
            submitText.innerText = originalText;
            submitBtn.disabled = false;
            
            // Clear inputs
            nameInput.value = '';
            emailInput.value = '';
            projectInput.value = '';

            contactForm.classList.add('hidden');
            successState.classList.remove('hidden');

            // Success: Canvas confetti trigger
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    colors: ['#8EE000', '#ffffff', '#141414'],
                    origin: { y: 0.6 }
                });
            }
        });
    }
});
