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

    // 4. Folhas Flutuantes (Canvas Particle System)
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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5 + 0.3; // caindo suavemente
                this.radius = Math.random() * 4 + 3;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.02;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.spin;
                
                // Movimento orgânico
                this.x += Math.sin(this.y * 0.02) * 0.3;

                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
                if (this.y < -20) this.y = height + 20;
                if (this.y > height + 20) this.y = -20;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                // Desenhar forma de folha
                ctx.moveTo(0, -this.radius);
                ctx.quadraticCurveTo(this.radius, 0, 0, this.radius);
                ctx.quadraticCurveTo(-this.radius, 0, 0, -this.radius);
                ctx.fillStyle = "rgba(46, 204, 113, 0.4)"; 
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < 40; i++) {
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
            });
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
                // Brisa ao passar o mouse
                if (mouse.x != null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 150) {
                        p.x -= dx * 0.015;
                        p.y -= dy * 0.015;
                        p.angle += 0.03;
                    }
                }
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
})

/* Configuração de Multi-Idioma (i18n) Automático */
const translations = {
  pt: {
    navSobre: "Sobre",
    navServ: "Serviços",
    navCont: "Contatos",
    navArea: "Área do Cooperado",
    heroTitle: "Conectamos o Futuro com a <span class='text-green'>Natureza</span>",
    heroSub: "Compre e venda créditos de carbono sustentáveis. Transforme o mundo e gere valor através da preservação ambiental e da inovação.",
    btnProj: "Conheça Nossos Projetos",
    btnSobre: "Saiba Mais",
    sobreTitle: "Transformação Sustentável",
    sobreP1: "A <strong style='font-weight:700;'>SOSCARBONO</strong> conecta você a soluções eficazes de compensação de carbono, desenvolvendo iniciativas em Unidades de Impacto Sustentável.",
    sobreP2: "Transformamos resíduos em valor, impulsionamos energia renovável, promovemos o desenvolvimento local e protegemos ecossistemas, garantindo sempre a economia circular.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "A primeira criptomoeda verde criada exclusivamente com vínculo direto aos <strong style='font-weight:700;'>créditos de carbono</strong>.",
    swcP2: "Invista num ativo que acompanha a valorização do mercado de sustentabilidade global, protegendo seu capital enquanto viabiliza a conservação da nossa natureza.",
    swcBtn: "Adquira SWC Agora",
    servTitle: "Nossos Serviços",
    serv1Title: "Comprar Créditos",
    serv1Desc: "Adquira créditos de carbono de projetos sustentáveis com certificação internacional.",
    serv2Title: "Vender Créditos",
    serv2Desc: "Apoio completo para analisar viabilidade de projetos e comercializar seus créditos.",
    serv3Title: "Arrendar Propriedade",
    serv3Desc: "Transforme sua terra em renda. Nós fazemos a análise e comercialização de projetos de captura.",
    serv4Title: "Assistência ESG",
    serv4Desc: "Inventários de GEE e consultoria estratégica para reduzir emissões em empresas.",
    footAbout: "Estamos prontos para ajudar a tornar suas ações mais sustentáveis. Fale conosco e compense suas emissões.",
    footLink1: "Home",
    footLink2: "Empresa",
    footLink3: "Serviços",
    footLoc: "Localização",
    footBtn: "Fale Conosco",
    footRights: "&copy; 2026 SOSCARBONO. Todos os direitos reservados. Conectamos o futuro com a natureza.",
    carbonLabel: "Mercado Global CO2"
  },
  en: {
    navSobre: "About",
    navServ: "Services",
    navCont: "Contacts",
    navArea: "Member Area",
    heroTitle: "Connecting the Future with <span class='text-green'>Nature</span>",
    heroSub: "Buy and sell sustainable carbon credits. Transform the world and generate value through environmental preservation and innovation.",
    btnProj: "Discover Our Projects",
    btnSobre: "Learn More",
    sobreTitle: "Sustainable Transformation",
    sobreP1: "<strong style='font-weight:700;'>SOSCARBONO</strong> connects you to effective carbon offset solutions, developing initiatives in Sustainable Impact Units.",
    sobreP2: "We transform waste into value, boost renewable energy, promote local development, and protect ecosystems, always ensuring a circular economy.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "The first green cryptocurrency created exclusively with a direct link to <strong style='font-weight:700;'>carbon credits</strong>.",
    swcP2: "Invest in an asset that tracks the valorization of the global sustainability market, protecting your capital while enabling the conservation of nature.",
    swcBtn: "Get SWC Now",
    servTitle: "Our Services",
    serv1Title: "Buy Credits",
    serv1Desc: "Acquire carbon credits from sustainable projects with international certification.",
    serv2Title: "Sell Credits",
    serv2Desc: "Complete support to analyze project feasibility and commercialize your credits.",
    serv3Title: "Lease Property",
    serv3Desc: "Turn your land into income. We do the analysis and commercialization of capture projects.",
    serv4Title: "ESG Assistance",
    serv4Desc: "GHG inventories and strategic consulting to reduce corporate emissions.",
    footAbout: "We are ready to help make your actions more sustainable. Contact us and offset your emissions.",
    footLink1: "Home",
    footLink2: "Company",
    footLink3: "Services",
    footLoc: "Location",
    footBtn: "Contact Us",
    footRights: "&copy; 2026 SOSCARBONO. All rights reserved. Connecting the future with nature.",
    carbonLabel: "Global CO2 Market"
  },
  es: {
    navSobre: "Sobre Nosotros",
    navServ: "Servicios",
    navCont: "Contactos",
    navArea: "Área del Socio",
    heroTitle: "Conectamos el Futuro con la <span class='text-green'>Naturaleza</span>",
    heroSub: "Compre y venda créditos de carbono sostenibles. Transforme el mundo y genere valor a través de la preservación ambiental y la innovación.",
    btnProj: "Conozca Nuestros Proyectos",
    btnSobre: "Saber Más",
    sobreTitle: "Transformación Sostenible",
    sobreP1: "La <strong style='font-weight:700;'>SOSCARBONO</strong> lo conecta a soluciones eficaces de compensación de carbono, desarrollando iniciativas en Unidades de Impacto Sostenible.",
    sobreP2: "Transformamos residuos en valor, impulsamos energía renovable, promovemos el desarrollo local y protegemos ecosistemas, garantizando siempre la economía circular.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "La primera criptomoneda verde creada exclusivamente con un vínculo directo a los <strong style='font-weight:700;'>créditos de carbono</strong>.",
    swcP2: "Invierta en un activo que sigue la valoración del mercado de sostenibilidad global, protegiendo su capital mientras posibilita la conservación de nuestra naturaleza.",
    swcBtn: "Adquiera SWC Ahora",
    servTitle: "Nuestros Servicios",
    serv1Title: "Comprar Créditos",
    serv1Desc: "Adquiera créditos de carbono de proyectos sostenibles con certificación internacional.",
    serv2Title: "Vender Créditos",
    serv2Desc: "Apoyo completo para analizar viabilidad de proyectos y comercializar sus créditos.",
    serv3Title: "Arrendar Propiedad",
    serv3Desc: "Transforme su tierra en ingresos. Hacemos el análisis y comercialización de proyectos de captura.",
    serv4Title: "Asistencia ESG",
    serv4Desc: "Inventarios de GEI y consultoría estratégica para reducir emisiones en empresas.",
    footAbout: "Estamos listos para ayudar a hacer sus acciones más sostenibles. Contáctenos y compense sus emisiones.",
    footLink1: "Inicio",
    footLink2: "Empresa",
    footLink3: "Servicios",
    footLoc: "Ubicación",
    footBtn: "Contáctenos",
    footRights: "&copy; 2026 SOSCARBONO. Todos los derechos reservados. Conectamos el futuro con la naturaleza.",
    carbonLabel: "Mercado Global CO2"
  }
};

// Tab Switching Logic for Language
const langTabs = document.querySelectorAll('.lang-tab');
const langIndicator = document.querySelector('.lang-indicator');

// Set initial indicator width
if(langTabs.length > 0) {
    langIndicator.style.width = langTabs[0].offsetWidth + 'px';
}

langTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        // Remove active class from all
        langTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        const clickedTab = e.target;
        clickedTab.classList.add('active');
        
        // Move indicator
        langIndicator.style.width = clickedTab.offsetWidth + 'px';
        langIndicator.style.transform = `translateX(${clickedTab.offsetLeft - 4}px)`;

        // Change Language Content
        const lang = clickedTab.getAttribute('data-lang');
        const t = translations[lang];
        
        if(t) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    // Efeito degradê suave (blur)
                    el.style.transition = "opacity 0.4s ease, filter 0.4s ease";
                    el.style.opacity = 0;
                    el.style.filter = "blur(5px)";
                    setTimeout(() => {
                        el.innerHTML = t[key];
                        el.style.opacity = 1;
                        el.style.filter = "blur(0px)";
                    }, 400); // tempo de transição um pouco maior para absorver o degradê
                }
            });
        }
    });
});

// "Transações entre abas" - Browser Tab visibility harmony
const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "💚 Volte para a Natureza! - " + originalTitle;
    } else {
        document.title = originalTitle;
    }
});;
