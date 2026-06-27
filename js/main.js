/* ========================================
   FLESH 360 — Landing JS
   ======================================== */

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// (El visor 3D del hero se inicializa en js/viewer3d.js)

// ===== Stats counter (conteo animado) =====
function animateCount(el, target, dur = 1800) {
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

  function frame(now) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / dur);
    const value = Math.round(target * ease(t));
    el.textContent = prefix + value + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const heroStats = document.getElementById('heroStats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('strong[data-count]').forEach((el) => {
          const target = parseInt(el.dataset.count, 10);
          if (!Number.isNaN(target)) animateCount(el, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(heroStats);
}

// ===== Smooth scroll para anchors =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Navbar shrink on scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) {
    navbar.style.background = 'rgba(7, 7, 10, 0.85)';
  } else {
    navbar.style.background = 'rgba(7, 7, 10, 0.6)';
  }
  lastScroll = current;
}, { passive: true });

// ===== Parallax sutil en orbs del hero =====
const orbs = document.querySelectorAll('.hero-orb');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
}, { passive: true });

// ===== Contact form (envía por WhatsApp prearmado) =====
function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const values = Array.from(form.querySelectorAll('select, input, textarea')).map((el) => el.value || '');
  const [tipo, nombre, empresa, email, telefono, mensaje] = values;

  const text = encodeURIComponent(
    `Hola Flesh Studio, quiero pedir una propuesta de masterplan 360°.\n\n` +
    `• Tipo de proyecto: ${tipo}\n` +
    `• Nombre: ${nombre}\n` +
    (empresa ? `• Empresa: ${empresa}\n` : '') +
    `• Email: ${email}\n` +
    (telefono ? `• WhatsApp: ${telefono}\n` : '') +
    (mensaje ? `\nProyecto:\n${mensaje}` : '')
  );

  // Abre WhatsApp con el mensaje pre-armado
  window.open(`https://wa.me/5492944152161?text=${text}`, '_blank');
  return false;
}
window.submitContact = submitContact;

// ===== WhatsApp floating tooltip — aparece cada 5 min, queda 5 s =====
const waTip = document.getElementById('waFloatTooltip');
if (waTip) {
  const SHOW_FOR = 5000;          // 5 segundos visible
  const EVERY    = 5 * 60 * 1000; // cada 5 minutos
  const FIRST    = 8000;          // primera aparición a los 8 s (después del bounce-in del botón)

  function showTooltipPulse() {
    waTip.classList.add('show-tip');
    setTimeout(() => waTip.classList.remove('show-tip'), SHOW_FOR);
  }

  // Primera aparición
  setTimeout(() => {
    showTooltipPulse();
    // Después, cada 5 minutos
    setInterval(showTooltipPulse, EVERY);
  }, FIRST);
}
