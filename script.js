/**
         * 1. PROJECT DATA & CONFIGURATION
         */
        const projectsData = {
            1: {
                title: "Personal Portfolio Website",
                launch: "September 2025",
                github: "https://github.com/rahulkamti11/",
                how: "Built as a visually immersive space-themed digital environment to showcase creative coding and front-end expertise.",
                workflow: "Figma Prototyping → Asset Generation → Tailwind CSS Implementation.",
                tech: ["HTML5", "JavaScript", "Tailwind CSS", "Canvas API"]
            },
            2: {
                title: "Recipe Sharing Website",
                launch: "September 2025",
                github: "https://github.com/rahulkamti11/",
                how: "A platform for culinary enthusiasts to share and discover global cuisines.",
                workflow: "Database Schema Design → RESTful API Development → React Frontend.",
                tech: ["MongoDB", "Express.js", "React", "Node.js"]
            },
            3: {
                title: "College Event Management System",
                launch: "May 2026",
                github: "https://github.com/rahulkamti11/",
                how: "A robust management system to streamline campus event planning.",
                workflow: "Data Modeling → Backend Logic → Dashboard Development.",
                tech: ["React", "PostgreSQL", "Express", "Node.js"]
            }
        };

        const roles = ["Web Development", "Backend Development", "Cloud Computing", "AIML Development"];

        /**
         * 2. STARFIELD ENGINE (CANVAS API)
         */
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        let width, height, stars = [];
        const starCount = 450;
        let mouseX = -100, mouseY = -100;

        // Thrust state for animated flame effect
        let thrustTimer = null;
        let lastThrust = 0;

        function triggerRocketThrust(strength = 'normal') {
            const rocket = document.getElementById('rocket-cursor');
            if (!rocket) return;

            rocket.classList.remove('rocket-thrust', 'rocket-thrust-strong');
            void rocket.offsetWidth; // force reflow to restart animation
            rocket.classList.add(strength === 'strong' ? 'rocket-thrust-strong' : 'rocket-thrust');

            clearTimeout(thrustTimer);
            thrustTimer = setTimeout(() => {
                rocket.classList.remove('rocket-thrust', 'rocket-thrust-strong');
            }, strength === 'strong' ? 350 : 250);
        }

        function startRocketThrustContinuous() {
            const rocket = document.getElementById('rocket-cursor');
            if (!rocket) return;

            rocket.classList.add('rocket-thrust-continuous');
            triggerRocketThrust('strong');
        }

        function stopRocketThrustContinuous() {
            const rocket = document.getElementById('rocket-cursor');
            if (!rocket) return;

            rocket.classList.remove('rocket-thrust-continuous', 'rocket-thrust', 'rocket-thrust-strong');
        }

        class Star {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                this.speedX = (Math.random() - 0.5) * 0.08;
                this.speedY = (Math.random() - 0.5) * 0.08;
                this.opacity = Math.random();
                this.opacityChange = Math.random() * 0.015;
                this.layer = Math.ceil(Math.random() * 3); 
            }
            update() {
                const moveFactor = this.layer * 0.015;
                this.x += (this.speedX) + (mouseX - width/2) * moveFactor * 0.01;
                this.y += (this.speedY) + (mouseY - height/2) * moveFactor * 0.01;
                this.opacity += this.opacityChange;
                if (this.opacity > 1 || this.opacity < 0.1) this.opacityChange *= -1;
                if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            stars = [];
            for (let i = 0; i < starCount; i++) { stars.push(new Star()); }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => { star.update(); star.draw(); });
            requestAnimationFrame(animate);
        }

        /**
         * 3. TYPEWRITER EFFECT
         */
        const typewriterEl = document.getElementById('typewriter');
        let roleIdx = 0, charIdx = 0, isDeleting = false;

        function type() {
            const currentRole = roles[roleIdx];
            typewriterEl.textContent = isDeleting ? currentRole.substring(0, charIdx--) : currentRole.substring(0, charIdx++);
            let typeSpeed = isDeleting ? 50 : 150;
            if (!isDeleting && charIdx > currentRole.length) { typeSpeed = 2000; isDeleting = true; }
            else if (isDeleting && charIdx < 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; typeSpeed = 500; charIdx = 0; }
            setTimeout(type, typeSpeed);
        }

        /**
         * 4. MODAL & UI HANDLERS
         */
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('close-modal');

        function openModal(id) {
            const data = projectsData[id];
            if (!data) return;
            modalBody.innerHTML = `
                <div>
                    <h2 class="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase mb-2">${data.title}</h2>
                    <p class="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-6">Launched: ${data.launch}</p>
                    <div class="h-[1px] w-20 bg-cyan-500/50 mb-8"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-6">
                        <div>
                            <h4 class="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-3">Objective</h4>
                            <p class="text-gray-300 text-justify">${data.how}</p>
                        </div>
                        <div>
                            <h4 class="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-3">Workflow</h4>
                            <p class="text-gray-300 italic text-justify">${data.workflow}</p>
                        </div>
                    </div>
                    <div class="space-y-6">
                        <h4 class="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-3">Technologies</h4>
                        <div class="flex flex-wrap gap-2">
                            ${data.tech.map(t => `<span class="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono rounded-full">${t}</span>`).join('')}
                        </div>
                        <div class="pt-4">
                            <a href="${data.github}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-widest">
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        /**
         * 5. FORM TRANSMISSION LOGIC
         */
        async function handleTransmission(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const btnLabel = btn.querySelector('.btn-label');
            const progressContainer = btn.querySelector('#progress-container');
            const progressBar = btn.querySelector('#progress-bar');
            
            btn.disabled = true;
            btnLabel.textContent = "TRANSMITTING DATA...";
            progressContainer.style.opacity = '1';
            
            setTimeout(() => { 
                progressBar.style.transition = "width 3s ease-in-out"; 
                progressBar.style.width = "100%"; 
            }, 50);

            await new Promise(r => setTimeout(r, 3200));
            
            btnLabel.textContent = "TRANSMISSION SUCCESSFUL";
            btnLabel.classList.add('text-green-400');
            progressBar.style.backgroundColor = "rgba(34, 197, 94, 0.6)"; 
        }

        function resetTransmissionForm() {
            document.getElementById('contact-form').reset();
            const btn = document.getElementById('submit-btn');
            const btnLabel = btn.querySelector('.btn-label');
            const progressContainer = btn.querySelector('#progress-container');
            const progressBar = btn.querySelector('#progress-bar');
            
            btn.disabled = false;
            btnLabel.textContent = "SEND TRANSMISSION";
            btnLabel.classList.remove('text-green-400');
            progressContainer.style.opacity = '0';
            progressBar.style.width = "0%";
        }

        /**
         * 6. SCROLL SPY & NAVIGATION
         */
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            let current = "";
            sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
            navLinks.forEach(l => {
                l.classList.toggle('active-section', l.getAttribute('href') === '#' + current);
            });
        }

        /**
         * 7. LIFECYCLE & EVENT LISTENERS
         */
        window.onload = function() {
            // Background Engine
            resize(); 
            animate(); 
            window.addEventListener('resize', resize);

            // Typewriter
            type();

            // Navigation Lifecycle
            window.addEventListener('scroll', updateActiveNavLink);
            updateActiveNavLink();

            // Mouse Interaction (Custom Cursor + Flame Thrust)
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                const glow = document.getElementById('cursor-glow');
                const rocket = document.getElementById('rocket-cursor');
                if (glow) { glow.style.left = mouseX + 'px'; glow.style.top = mouseY + 'px'; }
                if (rocket) { rocket.style.left = mouseX + 'px'; rocket.style.top = mouseY + 'px'; }

                const now = performance.now();
                if (now - lastThrust > 90) {
                    triggerRocketThrust('normal');
                    lastThrust = now;
                }
            });

            // Click Interaction (stronger thrust burst + continuous thrust while pressed)
            window.addEventListener('mousedown', () => startRocketThrustContinuous());
            window.addEventListener('mouseup', () => stopRocketThrustContinuous());
            window.addEventListener('mouseleave', () => stopRocketThrustContinuous());
            window.addEventListener('blur', () => stopRocketThrustContinuous());

            // Touch support
            window.addEventListener('touchstart', () => startRocketThrustContinuous(), { passive: true });
            window.addEventListener('touchend', () => stopRocketThrustContinuous());

            // Reveal Animations (Intersection Observer)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('section').forEach(s => {
                s.style.opacity = '0';
                s.style.transform = 'translateY(40px)';
                s.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';
                observer.observe(s);
            });

            // Mobile Menu Controller
            const menuBtn = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const mainContent = document.getElementById('main-content');
            
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = mobileMenu.classList.toggle('active');
                menuBtn.parentElement.classList.toggle('active');
                mainContent.classList.toggle('content-blur', isOpen);
            });

            // Close Modal Listeners
            closeModalBtn.onclick = closeModal;
            window.onclick = (e) => { if (e.target === modal) closeModal(); };

            // Project Card Listeners
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.project-title-link')) {
                        openModal(card.dataset.projectId);
                    }
                });
            });
        };
