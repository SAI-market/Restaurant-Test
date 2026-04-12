/* ══════════════════════════════════════════
   EL FOGÓN DE CAMPO — app.js
══════════════════════════════════════════ */

'use strict';

/* ─── WHATSAPP NUMBER ─── */
const WA_NUMBER = '5491100000000';

/* ══════════════════════════════════════════
   1. OPEN/CLOSED STATUS
══════════════════════════════════════════ */
(function initStatus() {
  const badge    = document.getElementById('statusBadge');
  if (!badge) return;

  const dot  = badge.querySelector('.badge-dot');
  const text = badge.querySelector('.badge-text');
  const day  = new Date().getDay(); // 0 = domingo, 6 = sábado

  const isOpen = day === 0 || day === 6;

  dot.classList.add(isOpen ? 'open' : 'closed');
  text.textContent = isOpen ? '🟢 Abierto hoy' : '🔴 Cerrado hoy — Abrimos sáb y dom';
})();

/* ══════════════════════════════════════════
   2. STICKY NAVBAR
══════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══════════════════════════════════════════
   3. MOBILE NAV TOGGLE
══════════════════════════════════════════ */
(function initNavToggle() {
  const btn   = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ══════════════════════════════════════════
   4. EMBER PARTICLES
══════════════════════════════════════════ */
(function initEmbers() {
  const container = document.getElementById('embers');
  if (!container) return;

  const COUNT = window.innerWidth < 768 ? 14 : 28;

  for (let i = 0; i < COUNT; i++) {
    const e = document.createElement('div');
    e.className = 'ember-particle';

    const x    = Math.random() * 100;
    const dur  = 4 + Math.random() * 6;
    const del  = Math.random() * 8;
    const drift = (Math.random() - .5) * 120;
    const size = 2 + Math.random() * 4;

    e.style.cssText = `
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
      --drift: ${drift}px;
    `;
    container.appendChild(e);
  }
})();

/* ══════════════════════════════════════════
   5. MENU DATA & RENDERING
══════════════════════════════════════════ */
const MENU_DATA = {
  parrilla: [
    {
      name: 'Asado de Tira',
      desc: 'Corte clásico a la leña, tierno por dentro y crocante por fuera. Con chimichurri de la casa.',
      price: '$4.200',
      img: '/images/plato1.jpg',
    },
    {
      name: 'Vacío al Rescoldo',
      desc: 'Cocción lenta sobre las brasas, marinado con ajo, perejil y laurel. El favorito del fogón.',
      price: '$5.800',
      img: '/images/plato2.jpg',
    },
    {
      name: 'Entraña a la Llama',
      desc: 'Corte tierno y jugoso, sellado rápido a llama viva. Acompañado de papas rústicas.',
      price: '$4.900',
      img: '/images/plato3.jpg',
    },
    {
      name: 'Parrillada Completa',
      desc: 'Selección de cortes para 2 personas: tira, vacío, chorizos, morcilla y achuras.',
      price: '$9.500',
      img: '/images/plato4.jpg',
    },
  ],
  pastas: [
    {
      name: 'Ñoquis de la Nona',
      desc: 'Ñoquis caseros de papa con salsa bolognesa de carne de campo. Masa artesanal.',
      price: '$3.200',
      img: '/images/pasta1.jpg',
    },
    {
      name: 'Tallarines con Estofado',
      desc: 'Pasta fresca al huevo con estofado de vacuno cocinado 5 horas a fuego lento.',
      price: '$3.800',
      img: '/images/pasta2.jpg',
    },
    {
      name: 'Sorrentinos de Ricota',
      desc: 'Rellenos de ricota y espinaca, con salsa de crema y hongos de temporada.',
      price: '$3.500',
      img: '/images/pasta3.jpg',
    },
  ],
  bebidas: [
    {
      name: 'Malbec de la Bodega',
      desc: 'Vino tinto seleccionado, botella compartida. Maridaje perfecto con la parrilla.',
      price: '$3.000',
      img: '/images/bebida1.jpg',
    },
    {
      name: 'Limonada de Campo',
      desc: 'Limonada artesanal con hierbas frescas del jardín. Refrescante y natural.',
      price: '$850',
      img: '/images/bebida2.jpg',
    },
    {
      name: 'Clericó de Temporada',
      desc: 'Vino blanco con frutas frescas de temporada. Perfecta para el calor del campo.',
      price: '$1.800',
      img: '/images/bebida3.jpg',
    },
  ],
  postres: [
    {
      name: 'Flan Casero con Dulce',
      desc: 'Flan de la abuela con dulce de leche y crema chantilly. Receta sin cambios desde 1999.',
      price: '$1.200',
      img: '/images/postre1.jpg',
    },
    {
      name: 'Arroz con Leche',
      desc: 'Cremoso, con canela y cáscara de naranja. Servido templado o frío.',
      price: '$980',
      img: '/images/postre2.jpg',
    },
    {
      name: 'Torta de Ricota',
      desc: 'Tarta artesanal de ricota con base de masa sablé. Infaltable en el menú del domingo.',
      price: '$1.400',
      img: '/images/postre3.jpg',
    },
  ],
};

function renderMenu(category) {
  const grid  = document.getElementById('menuGrid');
  const items = MENU_DATA[category] || [];
  if (!grid) return;

  grid.innerHTML = '';
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.style.animationDelay = `${i * .07}s`;
    card.innerHTML = `
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        <span class="menu-card-price">${item.price}</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

(function initMenu() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.category);
    });
  });
  renderMenu('parrilla'); // default
})();

/* ══════════════════════════════════════════
   6. WHATSAPP RESERVATION
══════════════════════════════════════════ */
function enviarReserva() {
  const nombre   = document.getElementById('nombre')?.value.trim();
  const personas = document.getElementById('personas')?.value;
  const fechaRaw = document.getElementById('fecha')?.value;
  const hora     = document.getElementById('hora')?.value;

  // Validation
  const errors = [];
  if (!nombre)   errors.push('tu nombre');
  if (!personas) errors.push('la cantidad de personas');
  if (!fechaRaw) errors.push('la fecha');
  if (!hora)     errors.push('el horario');

  if (errors.length > 0) {
    showToast(`⚠️ Por favor completá: ${errors.join(', ')}.`);
    return;
  }

  // Format date nicely
  const [y, m, d] = fechaRaw.split('-');
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const fechaStr = `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`;

  const msg = `Hola, quiero reservar una mesa para ${personas} persona${personas !== '1' ? 's' : ''} el día ${fechaStr} a las ${hora} hs. Mi nombre es ${nombre}.`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ══════════════════════════════════════════
   7. TOAST NOTIFICATION
══════════════════════════════════════════ */
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 5.5rem;
    right: 1.8rem;
    z-index: 10000;
    background: #3D2B12;
    color: #FFFDF7;
    font-family: 'Josefin Sans', sans-serif;
    font-size: .85rem;
    font-weight: 500;
    padding: .85rem 1.4rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,.3);
    border-left: 3px solid #C4501A;
    max-width: 320px;
    animation: slideInToast .3s ease;
    pointer-events: none;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInToast {
      from { transform: translateX(120%); opacity: 0; }
      to   { transform: translateX(0);   opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity .3s, transform .3s';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ══════════════════════════════════════════
   8. SMOOTH SCROLL ACTIVE NAV
══════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--gold-light)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════════════
   9. SCROLL REVEAL (lightweight)
══════════════════════════════════════════ */
(function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity .7s ease, transform .7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.about-grid, .menu-card, .gallery-item, .resena-card, .ubicacion-grid, .contacto-card, .reservas-card'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: .1 });

  targets.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════
   10. SET MIN DATE FOR RESERVATION INPUT
══════════════════════════════════════════ */
(function setMinDate() {
  const dateInput = document.getElementById('fecha');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
})();