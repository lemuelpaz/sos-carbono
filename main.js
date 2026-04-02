document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Glassmorphism Effect on Scroll
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Parallax Effect Custom Logic
    const parallaxBg = document.querySelector(".parallax-bg");
    const heroContent = document.getElementById("hero-content");

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        if(parallaxBg && scrollY < window.innerHeight) {
            parallaxBg.style.transform = `translateY(${scrollY * 0.4}px)`;
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
        }
    });

    // 3. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // 4. Cadeias de Carbono (Canvas Particle System)
    const canvas = document.getElementById("carbonCanvas");
    if(canvas) {
        const ctx = canvas.getContext("2d");
        let width, height;
        let particles = [];

        function initCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener("resize", initCanvas);
        initCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(46, 204, 113, 0.4)"; 
                ctx.fill();
            }
        }



        for (let i = 0; i < 70; i++) {
            particles.push(new Particle());
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            let current = window.scrollY;
            let dif = current - lastScroll;
            lastScroll = current;
            particles.forEach(p => {
                 p.y -= dif * 0.3; // parallax do canvas
                 if (p.y < -100) p.y = height + 50;
                 if (p.y > height + 100) p.y = -50;
            });
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
                // Repulsão pelo mouse
                if (mouse.x != null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 120) {
                        p.x -= dx * 0.02;
                        p.y -= dy * 0.02;
                    }
                }
            });

            // Conectar cadeias 
            for(let i = 0; i < particles.length; i++) {
                for(let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(46, 204, 113, ${0.4 - dist/325})`; // Linhas mais sutis
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }
        animate();
    }
});
