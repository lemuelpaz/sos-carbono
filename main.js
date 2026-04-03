// ===================== SCENE DEFINITIONS (RESTORED ORDER) =====================
const SCENES = [
  {
    id: 'forest',
    label: { pt: '🌿 Floresta Amazônica', en: '🌿 Amazon Rainforest', es: '🌿 Selva Amazónica' },
    heroTitle: {
      pt: "Conectamos o Futuro com a <span class='text-green'>Natureza</span>",
      en: "Connecting the Future with <span class='text-green'>Nature</span>",
      es: "Conectamos el Futuro con la <span class='text-green'>Naturaleza</span>"
    },
    heroSub: {
      pt: "Compre e venda créditos de carbono sustentáveis. Transforme o mundo e gere valor através da preservação ambiental e da inovação.",
      en: "Buy and sell sustainable carbon credits. Transform the world and generate value through environmental preservation and innovation.",
      es: "Compre y venda créditos de carbono sostenibles. Transforme el mundo y genere valor a través de la preservação ambiental."
    },
    accent: '#2ecc71',
    accentHover: '#27ae60',
    bgColor: '#122018',
    bgDark: '#0a1810',
    overlayStart: 'rgba(10, 25, 15, 0.12)',
    overlayMid: 'rgba(18, 32, 24, 0.68)',
    textSecondary: '#a5d4b3', /* Mais luminoso (Floresta) */
    glassBg: 'rgba(14,38,22,0.55)',
    swcBg: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop')",
  },
  {
    id: 'arctic',
    label: { pt: '❄️ Geleira sobre o Oceano', en: '❄️ Ocean Glacier', es: '❄️ Glaciar Oceánico' },
    heroTitle: {
      pt: "Protegemos os Biomas que <span class='text-green'>Regulam o Clima</span>",
      en: "Protecting Biomes that <span class='text-green'>Regulate Our Climate</span>",
      es: "Protegemos los Biomas que <span class='text-green'>Regulan el Clima</span>"
    },
    heroSub: {
      pt: "Os glaciares sobre o oceano são termômetros do planeta. A SOS Carbono monitora e preserva ecossistemas polares, reduzindo emissões globais de carbono.",
      en: "Ocean glaciers are the planet's thermometers. SOS Carbono monitors and preserves polar ecosystems while reducing global carbon emissions.",
      es: "Los glaciares sobre el océano son los termómetros del planeta. SOS Carbono preserva ecosistemas polares y reduce emisiones globales."
    },
    accent: '#4fc3f7',
    accentHover: '#29b6f6',
    bgColor: '#071828',
    bgDark: '#040f1a',
    overlayStart: 'rgba(5, 15, 30, 0.05)', /* Much lighter to show image */
    overlayMid: 'rgba(7, 21, 40, 0.50)',
    textSecondary: '#a3d1e9', /* Mais luminoso (Ártico) */
    glassBg: 'rgba(7,24,40,0.55)',
    swcBg: "url('https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?q=80&w=2000&auto=format&fit=crop')",
  },
  {
    id: 'indigenous',
    label: { pt: '🏹 Povos Indígenas & REDD+', en: '🏹 Indigenous Peoples & REDD+', es: '🏹 Pueblos Indígenas & REDD+' },
    heroTitle: {
      pt: "REDD+: Honramos os <span class='text-green'>Guardiões da Terra</span>",
      en: "REDD+: Honoring the <span class='text-green'>Guardians of the Earth</span>",
      es: "REDD+: Honramos a los <span class='text-green'>Guardianes de la Tierra</span>"
    },
    heroSub: {
      pt: "O mecanismo REDD+ garante que povos indígenas sejam recompensados ​​por proteger florestas. A SOS Carbono viabiliza esses projetos, unindo saberes ancestrais à economia do carbono.",
      en: "The UN REDD+ mechanism ensures indigenous peoples are rewarded for protecting forests. SOS Carbono enables these projects, uniting ancestral knowledge with the carbon economy.",
      es: "El mecanismo REDD+ garantiza que los pueblos indígenas sean recompensados ​​por proteger los bosques. SOS Carbono hace posibles estos proyectos."
    },
    accent: '#ff8f00',
    accentHover: '#ef6c00',
    bgColor: '#1c0e04',
    bgDark: '#100800',
    overlayStart: 'rgba(40, 15, 5, 0.15)',
    overlayMid: 'rgba(28, 14, 4, 0.68)',
    textSecondary: '#e4bc9d', /* Mais luminoso (Indígena) */
    glassBg: 'rgba(28,14,4,0.55)',
    swcBg: "url('https://images.unsplash.com/photo-1764620757878-742dc20d4e43?q=80&w=2000&auto=format&fit=crop')",
  }
];

const SLIDE_DURATION = 14000;
let currentScene = 0;
let currentLang = 'pt';
let slideTimer = null;

// ===================== THEME APPLICATION =====================
function applyTheme(scene) {
  const root = document.documentElement;

  // Instant update of variables
  root.style.setProperty('--accent-green', scene.accent);
  root.style.setProperty('--accent-green-hover', scene.accentHover);
  root.style.setProperty('--bg-color', scene.bgColor);
  root.style.setProperty('--bg-dark', scene.bgDark);
  root.style.setProperty('--overlay-start', scene.overlayStart);
  root.style.setProperty('--overlay-mid', scene.overlayMid);
  root.style.setProperty('--text-secondary', scene.textSecondary);
  root.style.setProperty('--glass-bg', scene.glassBg);

  // SWC image cross-fade
  const swcSection = document.querySelector('.swc-crypto.parallax-section');
  if (swcSection) {
    swcSection.style.backgroundImage = scene.swcBg;
    swcSection.style.transition = 'background-image 2.5s ease-in-out';
  }

  // Footer separator
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom) {
    footerBottom.style.borderImage =
      `linear-gradient(90deg, transparent, ${scene.accent}66, transparent) 1`;
  }

  document.body.className = `theme-${scene.id}`;
}

function setActiveSlide(index) {
  document.querySelectorAll('.hero-slide').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

function setActiveDot(index) {
  document.querySelectorAll('.scene-dot').forEach((dot, i) => {
    const isActive = i === index;
    if (isActive && !dot.classList.contains('active')) {
      dot.classList.remove('active');
      void dot.offsetWidth;
    }
    dot.classList.toggle('active', isActive);
  });
}

function applyHeroText(index) {
  const scene = SCENES[index];
  const titleEl = document.getElementById('heroTitle');
  const subtitleEl = document.getElementById('heroSubtitle');

  if (titleEl) titleEl.innerHTML = scene.heroTitle[currentLang] || scene.heroTitle.pt;
  if (subtitleEl) subtitleEl.textContent = scene.heroSub[currentLang] || scene.heroSub.pt;
}

function goToScene(index) {
  if (index === currentScene) return;
  clearTimeout(slideTimer);
  const heroContent = document.getElementById('hero-content');
  applyTheme(SCENES[index]);
  heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(12px)';
  setTimeout(() => {
    currentScene = index;
    setActiveSlide(index);
    setActiveDot(index);
    applyHeroText(index);
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
    scheduleNext();
  }, 600);
}

function scheduleNext() {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(() => {
    goToScene((currentScene + 1) % SCENES.length);
  }, SLIDE_DURATION);
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(SCENES[0]);
  applyHeroText(0);
  setActiveSlide(0);
  setActiveDot(0);
  scheduleNext();

  const dotsContainer = document.getElementById('sceneDots');
  if (dotsContainer) {
    dotsContainer.addEventListener('click', e => {
      const dot = e.target.closest('.scene-dot');
      if (dot) goToScene(parseInt(dot.dataset.scene));
    });
  }

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => { navbar.classList.toggle("scrolled", window.scrollY > 50); });

  const slidesContainer = document.getElementById('heroSlidesContainer');
  const heroContent = document.getElementById('hero-content');
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      if (slidesContainer) slidesContainer.style.transform = `translateY(${scrollY * 0.4}px)`;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroContent.style.opacity = String(1 - (scrollY / window.innerHeight) * 1.5);
      }
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in-section').forEach(s => observer.observe(s));

  const canvas = document.getElementById("carbonCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    window.addEventListener("resize", resize); resize();
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w; this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5 + 0.3;
        this.r = Math.random() * 4 + 3; this.a = Math.random() * Math.PI * 2;
        this.s = (Math.random() - 0.5) * 0.02;
      }
      update() {
        this.x += this.vx + Math.sin(this.y * 0.02) * 0.3; this.y += this.vy; this.a += this.s;
        if (this.x < -20) this.x = w + 20; if (this.x > w + 20) this.x = -20; if (this.y > h + 20) this.y = -20;
      }
      draw() {
        const col = SCENES[currentScene].accent;
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.a); ctx.beginPath();
        ctx.moveTo(0, -this.r); ctx.quadraticCurveTo(this.r, 0, 0, this.r); ctx.quadraticCurveTo(-this.r, 0, 0, -this.r);
        ctx.fillStyle = col + '55'; ctx.fill(); ctx.restore();
      }
    }
    for (let i = 0; i < 40; i++) particles.push(new Particle());
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    (function loop() {
      ctx.clearRect(0, 0, w, h); particles.forEach(p => { p.update(); p.draw(); if (mouse.x != null) { const dx = mouse.x - p.x, dy = mouse.y - p.y; if (Math.hypot(dx, dy) < 150) { p.x -= dx * 0.015; p.y -= dy * 0.015; p.a += 0.03; } } });
      requestAnimationFrame(loop);
    })();
  }
});

// ===================== i18n =====================
const translations = {
  pt: {
    navArea: "Área do Cooperado", btnProj: "Conheça Nossos Projetos", btnSobre: "Saiba Mais",
    sobreTitle: "Transformação Sustentável",
    sobreP1: "A <strong style='font-weight:700;'>SOSCARBONO</strong> conecta você a soluções eficazes de compensação de carbono, desenvolvendo iniciativas em Unidades de Impacto Sustentável.",
    sobreP2: "Transformamos resíduos em valor, impulsionamos energia renovável, promovemos o desenvolvimento local e protegemos ecossistemas, garantindo sempre a economia circular.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "A primeira criptomoeda verde criada exclusivamente com vínculo direto aos <strong style='font-weight:700;'>créditos de carbono</strong>.",
    swcP2: "Invista num ativo que acompanha a valorização do mercado de sustentabilidade global, protegendo seu capital enquanto viabiliza a conservação da nossa natureza.",
    swcBtn: "Adquira SWC Agora",
    servTitle: "Nossos Serviços",
    serv1Title: "Comprar Créditos", serv1Desc: "Adquira créditos de carbono de projetos sustentáveis com certificação internacional.",
    serv2Title: "Vender Créditos", serv2Desc: "Apoio completo para analisar viabilidade de projetos e comercializar seus créditos.",
    serv3Title: "Arrendar Propriedade", serv3Desc: "Transforme sua terra em renda. Nós fazemos a análise e comercialização de projetos de captura.",
    serv4Title: "Assistência ESG", serv4Desc: "Inventários de GEE e consultoria estratégica para reduzir emissões em empresas.",
    footAbout: "Estamos prontos para ajudar a tornar suas ações mais sustentáveis. Fale conosco e compense suas emissões.",
    footLink1: "Home", footLink2: "Empresa", footLink3: "Serviços",
    footLoc: "Localização", footBtn: "Fale Conosco",
    footRights: "&copy; 2026 SOSCARBONO. Todos os direitos reservados. Conectamos o futuro com a natureza.",
    carbonLabel: "Mercado Global CO2"
  },
  en: {
    navArea: "Member Area", btnProj: "Discover Our Projects", btnSobre: "Learn More",
    sobreTitle: "Sustainable Transformation",
    sobreP1: "<strong style='font-weight:700;'>SOSCARBONO</strong> connects you to effective carbon offset solutions, developing initiatives in Sustainable Impact Units.",
    sobreP2: "We transform waste into value, boost renewable energy, promote local development, and protect ecosystems, always ensuring a circular economy.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "The first green cryptocurrency created exclusively with a direct link to <strong style='font-weight:700;'>carbon credits</strong>.",
    swcP2: "Invest in an asset that tracks the valorization of the global sustainability market, protecting your capital while enabling the conservation of nature.",
    swcBtn: "Get SWC Now",
    servTitle: "Our Services",
    serv1Title: "Buy Credits", serv1Desc: "Acquire carbon credits from sustainable projects with international certification.",
    serv2Title: "Sell Credits", serv2Desc: "Complete support to analyze project feasibility and commercialize your credits.",
    serv3Title: "Lease Property", serv3Desc: "Turn your land into income. We do the analysis and commercialization of capture projects.",
    serv4Title: "ESG Assistance", serv4Desc: "GHG inventories and strategic consulting to reduce corporate emissions.",
    footAbout: "We are ready to help make your actions more sustainable. Contact us and offset your emissions.",
    footLink1: "Home", footLink2: "Company", footLink3: "Services",
    footLoc: "Location", footBtn: "Contact Us",
    footRights: "&copy; 2026 SOSCARBONO. All rights reserved. Connecting the future with nature.",
    carbonLabel: "Global CO2 Market"
  },
  es: {
    navArea: "Área del Socio", btnProj: "Conozca Nuestros Proyectos", btnSobre: "Saber Más",
    sobreTitle: "Transformación Sostenible",
    sobreP1: "La <strong style='font-weight:700;'>SOSCARBONO</strong> lo conecta a soluciones eficaces de compensación de carbono, desarrollando iniciativas em Unidades de Impacto Sostenible.",
    sobreP2: "Transformamos residuos em valor, impulsamos energía renovável, promovemos el desarrollo local y protegemos ecosistemas, garantizando siempre la economía circular.",
    swcToken: "<span class='text-green'>SWC</span> Token",
    swcP1: "La primera criptomoneda verde creada exclusivamente con un vínculo directo a los <strong style='font-weight:700;'>créditos de carbono</strong>.",
    swcP2: "Invierta en un activo que sigue la valoración del mercado de sostenibilidad global, protegiendo su capital mientras posibilita la conservación de nuestra naturaleza.",
    swcBtn: "Adquiera SWC Agora",
    servTitle: "Nuestros Serviços",
    serv1Title: "Comprar Créditos", serv1Desc: "Adquiera créditos de carbono de projetos sustentáveis com certificação internacional.",
    serv2Title: "Vender Créditos", serv2Desc: "Apoyo completo para analizar viabilidade de proyectos y comercializar sus créditos.",
    serv3Title: "Arrendar Propriedade", serv3Desc: "Transforme sua terra em renda. Fazemos a análise e comercialização de projetos de captura.",
    serv4Title: "Assistencia ESG", serv4Desc: "Inventários de GEI e consultoria estratégica para reducir emisiones en empresas.",
    footAbout: "Estamos listos para ayudar a fazer suas ações mais sustentáveis. Contáctenos y compense suas emissões.",
    footLink1: "Inicio", footLink2: "Empresa", footLink3: "Servicios",
    footLoc: "Ubicación", footBtn: "Contáctenos",
    footRights: "&copy; 2026 SOSCARBONO. Todos os direitos reservados. Conectamos o futuro com a natureza.",
    carbonLabel: "Mercado Global CO2"
  }
};

const langTabs = document.querySelectorAll('.lang-tab');
const langIndicator = document.querySelector('.lang-indicator');
if (langTabs.length > 0) langIndicator.style.width = langTabs[0].offsetWidth + 'px';
langTabs.forEach(tab => {
  tab.addEventListener('click', e => {
    langTabs.forEach(t => t.classList.remove('active'));
    const clicked = e.target.closest('.lang-tab');
    clicked.classList.add('active');
    langIndicator.style.width = clicked.offsetWidth + 'px';
    langIndicator.style.transform = `translateX(${clicked.offsetLeft - 4}px)`;
    currentLang = clicked.getAttribute('data-lang');
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.style.transition = "opacity 0.4s ease, filter 0.4s ease"; el.style.opacity = 0; el.style.filter = "blur(5px)";
        setTimeout(() => { el.innerHTML = t[key]; el.style.opacity = 1; el.style.filter = "blur(0px)"; }, 400);
      }
    });
    applyHeroText(currentScene);
  });
});
const originalTitle = document.title;
document.addEventListener("visibilitychange", () => { document.title = document.hidden ? "💚 Volte para a Natureza!" : originalTitle; });
