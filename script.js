/* ─────────────────────────────────────────────────────────────
   NAVBAR — shrink + glassmorphism on scroll
   ───────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ─────────────────────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ─────────────────────────────────────────────────────────────
   SMOOTH SCROLL for nav links
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─────────────────────────────────────────────────────────────
   ACTIVE NAV LINK on scroll
   ───────────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateLink = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
};

window.addEventListener('scroll', activateLink);

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — Intersection Observer
   ───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade').forEach(el => {
  revealObserver.observe(el);
});

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE TABS
   ───────────────────────────────────────────────────────────── */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) {
      panel.classList.add('active');
      // Fade in
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      });
    }
  });
});

/* ─────────────────────────────────────────────────────────────
   HERO — trigger reveals immediately on load
   ───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal-up, #hero .reveal-fade').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

/* ─────────────────────────────────────────────────────────────
   CURSOR GLOW (subtle mouse follower)
   ───────────────────────────────────────────────────────────── */
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100,255,218,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.8s ease, top 0.8s ease;
`;
document.body.appendChild(glow);

window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM — Web3Forms submission
   ───────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const successEl = document.getElementById('formSuccess');
    const errorEl   = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');

    // Hide any previous alerts
    successEl.classList.remove('visible');
    errorEl.classList.remove('visible');

    // Client-side validation
    const fields = contactForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    fields.forEach(field => {
      const group = field.closest('.form-group');
      group.classList.remove('invalid');

      const isEmpty = !field.value.trim();
      const isInvalidEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

      if (isEmpty || isInvalidEmail) {
        group.classList.add('invalid');
        valid = false;
      }
    });

    if (!valid) return;

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Build payload
    const data = {
      access_key:  contactForm.querySelector('[name="access_key"]').value,
      subject:     contactForm.querySelector('[name="subject"]').value,
      name:        contactForm.querySelector('[name="name"]').value.trim(),
      email:       contactForm.querySelector('[name="email"]').value.trim(),
      subject_line: contactForm.querySelector('[name="subject_line"]').value.trim(),
      message:     contactForm.querySelector('[name="message"]').value.trim(),
      botcheck:    contactForm.querySelector('[name="botcheck"]').checked,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        successEl.classList.add('visible');
        contactForm.reset();
        // Clear validation states
        contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch {
      errorEl.classList.add('visible');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // Remove invalid state on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group')?.classList.remove('invalid');
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   TYPING ANIMATION for hero tagline
   ───────────────────────────────────────────────────────────── */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const phrases = [
    'I turn data into decisions.',
    'I build BI dashboards.',
    'I design SQL databases.',
    'I deliver actionable insights.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      tagline.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      tagline.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 2200);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    if (!isPaused) setTimeout(type, speed);
  }

  // Start typing after hero reveals
  setTimeout(type, 900);
}
