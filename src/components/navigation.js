import { pages, company } from '../data/site.js';
import { products } from '../data/products.js';
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
        ${pages.map(page => {
          if (page.title === 'Products') {
            return `<li class="nav-item-has-dropdown">
              <a href="${page.path}" class="nav-dropdown-trigger" ${page.path === currentPath ? 'aria-current="page"' : ''} aria-haspopup="true" aria-expanded="false"><span>${page.title}</span></a>
              <ul class="nav-dropdown" aria-label="Products List">
                ${products.map(prod => `
                  <li class="nav-dropdown-item">
                    <a href="/#${prod.id}" class="nav-product-link">
                      <span class="nav-product-name">${prod.name}</span>
                      <span class="nav-product-arrow" aria-hidden="true">›</span>
                    </a>
                  </li>
                `).join('')}
              </ul>
            </li>`;
          }
          return `<li><a href="${page.path}" ${page.path === currentPath ? 'aria-current="page"' : ''}>${page.title === 'Home' ? icon('home') : ''}<span>${page.title}</span></a></li>`;
        }).join('')}
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
    if (!open) {
      // Close any open mobile dropdowns when drawer closes
      document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
        item.classList.remove('is-expanded');
        item.classList.remove('is-active');
        item.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
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
    if (event.key === 'Escape') {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
      // Close dropdowns
      document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
        item.classList.remove('is-active');
        item.classList.remove('is-expanded');
        item.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Handle dropdown interactions (desktop hover & mobile click)
  const dropdownItem = document.querySelector('.nav-item-has-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  
  if (dropdownItem && dropdownTrigger) {
    // Desktop hover events
    dropdownTrigger.addEventListener('mouseenter', () => {
      if (!mobile.matches) {
        dropdownItem.classList.add('is-active');
        dropdownTrigger.setAttribute('aria-expanded', 'true');
      }
    });

    dropdownItem.addEventListener('mouseleave', () => {
      if (!mobile.matches) {
        dropdownItem.classList.remove('is-active');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile click event on Products: toggle dropdown
    dropdownTrigger.addEventListener('click', (e) => {
      if (mobile.matches) {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = dropdownItem.classList.contains('is-expanded');
        dropdownItem.classList.toggle('is-expanded', !isExpanded);
        dropdownTrigger.setAttribute('aria-expanded', String(!isExpanded));
      }
    });
  }

  // Handle link clicks inside menu
  menu.querySelectorAll('a').forEach(link => {
    // Skip the trigger on mobile as it's handled separately
    if (link.classList.contains('nav-dropdown-trigger')) {
      return;
    }

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('/#') || href.startsWith('#'))) {
        const targetId = href.replace('/#', '').replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', `/#${targetId}`);
          }
        }
      }

      if (mobile.matches) {
        setOpen(false);
      }
    });
  });

  mobile.addEventListener('change', (e) => {
    if (!e.matches) {
      setOpen(false);
      document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
        item.classList.remove('is-expanded');
        item.classList.remove('is-active');
        item.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
