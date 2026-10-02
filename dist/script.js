'use strict';

// Navigation is visible by default when JavaScript is unavailable.
document.documentElement.classList.add('js');

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');

function setMenuOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    toggle.focus();
  }
});

const desktop = window.matchMedia('(min-width: 850px)');
desktop.addEventListener('change', () => setMenuOpen(false));
document.querySelector('#year').textContent = new Date().getFullYear();

function initMenuReveal() {
  const cards = [...document.querySelectorAll('.menu-grid .menu-card')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (
    cards.length === 0 ||
    reducedMotion.matches ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }

  const order = new Map(cards.map((card, index) => [card, index]));
  const observer = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => order.get(a.target) - order.get(b.target))
      .forEach((entry, index) => {
        const card = entry.target;

        // Cascata por lote visível, limitada para evitar esperas longas.
        card.style.setProperty(
          '--reveal-delay',
          `${Math.min(index * 80, 240)}ms`
        );
        card.classList.add('visible');
        observer.unobserve(card);
      });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -24px 0px'
  });

  cards.forEach((card) => {
    card.classList.add('reveal');
    observer.observe(card);
  });

  // Respeita mudanças na preferência durante a navegação.
  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    cards.forEach((card) => {
      card.classList.remove('reveal');
      card.classList.add('visible');
      card.style.removeProperty('--reveal-delay');
    });
  }, { once: true });
}

initMenuReveal();
