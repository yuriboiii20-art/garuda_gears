import { pages, company } from '../data/site.js';
import { icon } from './icons.js';

export function navigation(currentPath) {
  return `<nav class="main-navigation" aria-label="Main navigation">
    <div class="drawer-backdrop" aria-hidden="true"></div>
    <div class="drawer-container">
      <div class="drawer-header">
        <div class="drawer-brand">
          <img src="/images/logo/garuda-gear.svg" alt="" width="34" height="24" />
          <span>GARUDA GEARS</span>
        </div>
        <button class="drawer-close" aria-label="Close menu">${icon('close')}</button>
      </div>
      <ul id="main-menu" class="navigation-list">
        ${pages.map(page => `<li><a href="${page.path}" ${page.path === currentPath ? 'aria-current="page"' : ''}>${page.title === 'Home' ? icon('home') : ''}<span>${page.title}</span></a></li>`).join('')}
      </ul>
      <div class="drawer-footer">
        <div class="drawer-contact-item"><a href="tel:${company.officePhone}"><span>Ph : (Off) :</span> ${company.officePhone}</a></div>
        <div class="drawer-contact-item"><a href="mailto:${company.email}">${icon('mail')}<span>${company.email}</span></a></div>
      </div>
    </div>
  </nav>`;
}

export function initializeNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-navigation');
  const menu = document.querySelector('#main-menu');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');
  const mobile = matchMedia('(max-width: 1100px)');

  if (!toggle || !nav || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('is-active', open);
    nav.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('drawer-open', open);
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(false);
      toggle.focus();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobile.matches) {
        setOpen(false);
      }
    });
  });

  mobile.addEventListener('change', (e) => {
    if (!e.matches) {
      setOpen(false);
    }
  });
}
