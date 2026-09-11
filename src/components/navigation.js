import { pages } from '../data/site.js';
import { icon } from './icons.js';

export function navigation(currentPath) {
  return `<nav class="main-navigation" aria-label="Main navigation">
    <div class="container navigation-inner">
      <button class="menu-toggle" aria-expanded="false" aria-controls="main-menu">${icon('menu')}<span>Menu</span><span class="mobile-current">${pages.find(page => page.path === currentPath)?.title ?? ''}</span></button>
      <ul id="main-menu" class="navigation-list">${pages.map(page => `<li><a href="${page.path}" ${page.path === currentPath ? 'aria-current="page"' : ''}>${page.title === 'Home' ? icon('home') : ''}${page.title}</a></li>`).join('')}</ul>
    </div>
  </nav>`;
}

export function initializeNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  const mobile = matchMedia('(max-width: 1100px)');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('svg').outerHTML = icon(open ? 'close' : 'menu');
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.main-navigation')) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
}
