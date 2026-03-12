// ===== Language Toggle =====
let currentLang = 'ko';

function switchLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update active state on toggle buttons
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Update all translatable elements
  document.querySelectorAll('[data-ko][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // skip — handled separately
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-ko][data-placeholder-en]').forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });

  // Update page title
  document.title = lang === 'ko'
    ? 'Xolution | 살루토제닉 라이프스타일을 통한 건강하고 행복한 삶'
    : 'Xolution | Healthier & Happier Lives through Salutogenic Lifestyles';
}

document.getElementById('langToggle').addEventListener('click', () => {
  const newLang = currentLang === 'ko' ? 'en' : 'ko';
  switchLanguage(newLang);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(update);
  });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.hasAttribute('data-aos')) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
      }
      if (entry.target.classList.contains('hero-stats')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);

// ===== Hero Particles =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    particle.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.05});
      animation: float${i} ${Math.random() * 20 + 10}s ease-in-out ${Math.random() * 10}s infinite;
      pointer-events: none;
    `;
    container.appendChild(particle);

    const style = document.createElement('style');
    const x1 = Math.random() * 40 - 20;
    const y1 = Math.random() * 40 - 20;
    const x2 = Math.random() * 60 - 30;
    const y2 = Math.random() * 60 - 30;
    style.textContent = `
      @keyframes float${i} {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(${x1}px, ${y1}px); }
        66% { transform: translate(${x2}px, ${y2}px); }
      }
    `;
    document.head.appendChild(style);
  }
}
createParticles();

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = currentLang === 'ko' ? '전송 중...' : 'Sending...';
    btn.disabled = true;
  });
}

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Initial load animations =====
window.addEventListener('load', () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const delay = el.getAttribute('data-aos-delay') || 0;
      setTimeout(() => el.classList.add('aos-animate'), parseInt(delay));
    }
  });
  if (heroStats) {
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight) animateCounters();
  }
});
