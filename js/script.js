/* ═══════════════════════════════════════════════════════════════
   UBAID ULLAH — PORTFOLIO SCRIPTS (FULL REBUILD)
   ═══════════════════════════════════════════════════════════════ */

// ── PRELOADER ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 1800);
});

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (cursor && ring && matchMedia('(hover:hover)').matches) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  // Smooth ring follow
  function animRing() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    ring.style.left = cx + 'px';
    ring.style.top = cy + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .glass, .chip, .filter, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });
}

// ── PARTICLE CONSTELLATION SYSTEM ──
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -1000, mouseY = -1000;
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  // Create particles
  const count = Math.min(70, Math.floor(w * h / 18000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.15
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Mouse interaction — glow connections
    particles.forEach(p => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(246, 199, 68, ${0.12 * (1 - dist / 180)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Gentle push
        const force = (180 - dist) / 180 * 0.3;
        p.vx -= (dx / dist) * force * 0.05;
        p.vy -= (dy / dist) * force * 0.05;
      }

      // Limit velocity
      const maxSpeed = 0.6;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

// ── MOBILE MENU ──
const burgerBtn = document.getElementById('burger-btn');
const mmenu = document.getElementById('mmenu');

function toggleMenu() {
  burgerBtn.classList.toggle('active');
  mmenu.classList.toggle('open');
  document.body.style.overflow = mmenu.classList.contains('open') ? 'hidden' : '';
}

burgerBtn?.addEventListener('click', toggleMenu);
mmenu?.querySelectorAll('.mmenu-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mmenu.classList.contains('open')) toggleMenu();
  });
});

// ── TYPING ROLES (EXPANDED) ──
const roles = [
  'Full Stack Developer',
  'Mobile App Developer',
  'Android Developer',
  'AI Engineer',
  'Automation Expert'
];
let ri = 0, ci = 0, del = false;
const typEl = document.getElementById('typing-text');
function type() {
  if (!typEl) return;
  const cur = roles[ri];
  if (!del) {
    typEl.textContent = cur.slice(0, ci++);
    if (ci > cur.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    typEl.textContent = cur.slice(0, ci--);
    if (ci < 0) { del = false; ri = (ri + 1) % roles.length; ci = 0; setTimeout(type, 400); return; }
  }
  setTimeout(type, del ? 30 : 65);
}
type();

// ── SCROLL PROGRESS BAR ──
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── NAV SCROLL EFFECT + ACTIVE LINK ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  const scrollY = window.scrollY;

  // Background intensity
  if (navbar) {
    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  // Active section highlight
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── BACK TO TOP ──
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 600) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
}
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── SCROLL REVEAL (Standard + Staggered) ──
const revealEls = document.querySelectorAll(
  '.eyebrow, .h2, .section-desc, .about-grid, .about-text, .services-grid, .skills-grid, ' +
  '.tl, .proj-grid, .cert-grid, .badge-grid, .contact-split, .marquee, ' +
  '.stat-grid, .filters, .contact-form-wrap, .contact-cards, .footer-grid'
);
revealEls.forEach(el => {
  if (!el.classList.contains('reveal') && !el.classList.contains('stagger-children')) {
    el.classList.add('reveal');
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .stagger-children, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ── STAT COUNTERS ──
function animateCounter(el, target) {
  let start = 0;
  const dur = 1600;
  const step = target / (dur / 16);
  const suffix = el.dataset.suffix || '';
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + suffix;
    if (start < target) requestAnimationFrame(tick);
  };
  tick();
}
const counters = document.querySelectorAll('.stat b[data-target]');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target));
      cObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => cObs.observe(c));

// ── PROJECT FILTERS (Smooth Transition) ──
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;

    document.querySelectorAll('.proj-card').forEach(c => {
      const match = f === 'all' || c.dataset.cat === f;
      if (match) {
        c.style.display = '';
        // Re-trigger fade-in
        requestAnimationFrame(() => {
          c.classList.remove('filtered-out');
        });
      } else {
        c.classList.add('filtered-out');
        setTimeout(() => {
          if (c.classList.contains('filtered-out')) {
            c.style.display = 'none';
          }
        }, 400);
      }
    });
  });
});

// ── 3D CARD TILT EFFECT ──
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = 'transform 0.05s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ── CERT LIGHTBOX ──
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
document.querySelectorAll('.cert-img').forEach(imgWrap => {
  imgWrap.addEventListener('click', () => {
    const img = imgWrap.querySelector('img');
    if (img) { lbImg.src = img.src; lb.classList.add('open'); }
  });
});
document.getElementById('lb-close')?.addEventListener('click', () => lb.classList.remove('open'));
lb?.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

// Close lightbox on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lb?.classList.contains('open')) lb.classList.remove('open');
});

// ── CONTACT FORM (mailto handler) ──
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) return;

  const body = `Hi Ubaid,\n\nMy name is ${name} (${email}).\n\n${message}\n\nLooking forward to hearing from you!`;
  const mailtoLink = `mailto:uu435642@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink, '_blank');

  // Show success
  formStatus.textContent = '✓ Email client opened! Thank you for reaching out.';
  formStatus.className = 'form-status success';
  contactForm.reset();

  setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
  }, 5000);
});

// ── AI CHATBOT (Groq via serverless function) ──
const SYS = `You are an AI assistant for Ubaid Ullah's portfolio. Be helpful, friendly and concise (2-4 sentences).

About Ubaid:
- CS student at UET Peshawar (2025-2029), 3rd semester, GPA 3.76
- Completed a 3-month internship as app & web developer at Avayo (KP IT Park, Chamkani)
- Full Stack Developer & Mobile App Developer
- Skills: Android (Java/Kotlin), Python, Flask, JavaScript, React, Node.js, TypeScript
- Mobile: Android native apps, Firebase, Room DB, Retrofit, Geofencing, XML Layouts
- AI: Groq API, LLaMA 3.3, n8n automation, Prompt Engineering
- Database: MySQL, MongoDB, SQLite, Firebase DB
- DevOps: Git, Docker, Vercel, Railway, Netlify, GitHub Actions
- Completed IBM's Generative AI for Mobile App Developers specialization (4 courses)
- Built 15+ projects including SeismoSafe Pakistan (seismic risk app), NovaPlayer (media app), StudyForge (AI quiz generator)
- Email: uu435642@gmail.com
- Freelancing on Upwork, Fiverr (ubaidullah582)
- Based in Peshawar, Pakistan
- Available for remote work, freelance, and full-time opportunities`;

const chatHistory = [{ role: 'system', content: SYS }];
let chatTyping = false;

function toggleChat() {
  document.getElementById('chat-toggle').classList.toggle('open');
  document.getElementById('chat-window').classList.toggle('open');
}

async function chatSend() {
  const inp = document.getElementById('chat-inp');
  const txt = inp.value.trim();
  if (!txt || chatTyping) return;
  inp.value = '';
  addMsg('user', txt);
  chatHistory.push({ role: 'user', content: txt });
  showTyping();
  chatTyping = true;
  document.getElementById('chat-send').disabled = true;

  try {
    const r = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });
    const d = await r.json();
    removeTyping();
    const reply = d.choices?.[0]?.message?.content || 'Sorry, something went wrong!';
    chatHistory.push({ role: 'assistant', content: reply });
    addMsg('bot', reply);
  } catch (e) {
    removeTyping();
    addMsg('bot', 'Connection error — this chatbot needs the /.netlify/functions/chat endpoint deployed to work.');
  }

  chatTyping = false;
  document.getElementById('chat-send').disabled = false;
}

function qSend(t) {
  document.getElementById('chat-inp').value = t;
  chatSend();
}

function addMsg(role, text) {
  const msgs = document.getElementById('chat-msgs');
  const d = document.createElement('div');
  d.className = 'cmsg ' + role;
  d.innerHTML = `<div class="cmsg-av">${role === 'bot' ? '🤖' : 'U'}</div><div class="cmsg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-msgs');
  const d = document.createElement('div');
  d.className = 'cmsg bot';
  d.id = 'chat-typing';
  d.innerHTML = '<div class="cmsg-av">🤖</div><div class="cmsg-bubble"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  document.getElementById('chat-typing')?.remove();
}
