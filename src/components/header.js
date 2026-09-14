import { company } from '../data/site.js';
import { images } from '../data/images.js';
import { imageSlot } from './image.js';
import { icon } from './icons.js';
import { navigation } from './navigation.js';

export function header(currentPath) {
  return `<header id="top" class="site-header hal-style-header">
    <!-- 1. Top Utility Row: Skip link is FIRST in DOM order for accessible tab navigation -->
    <div class="hal-top-utility">
      <div class="container hal-utility-inner">
        <div class="utility-left">
          <a href="#main-content" class="skip-link">Skip to main content</a>
        </div>
        <div class="utility-right">
          <div class="header-contact">
            <div class="header-numbers">
              <a href="tel:${company.officePhone}" class="contact-inline-link">
                <span class="contact-label">Ph : (Off) :</span>
                <strong>${company.officePhone}</strong>
              </a>
              <span class="utility-dot" aria-hidden="true">•</span>
              <span class="contact-inline-link">
                <span class="contact-label">Tele Fax :</span>
                <strong>${company.teleFax}</strong>
              </span>
            </div>
            <span class="utility-sep" aria-hidden="true">|</span>
            <a class="header-email contact-inline-link" href="mailto:${company.email}">
              ${icon('mail')}
              <span>${company.email}</span>
            </a>
            <span class="utility-sep" aria-hidden="true">|</span>
            <a class="contact-inline-link" href="https://${company.website}" target="_blank" rel="noopener noreferrer">
              ${icon('globe')}
              <span>${company.website}</span>
            </a>
            <span class="utility-sep" aria-hidden="true">|</span>
            <div class="header-emblem-badge">
              <img class="brand-oval" src="/images/logo/garuda-oval.svg" alt="GG oval emblem" width="46" height="30" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Main Header Row: Logo & Brand on Left, Curved Blue Bar on Bottom-Right -->
    <div class="hal-main-body">
      <div class="container hal-body-container">
        <div class="hal-brand-bay">
          <a class="brand" href="/" aria-label="GARUDA GEARS — Home">
            <div class="brand-logo-frame">
              ${imageSlot(images.logo, 'logo-slot', true)}
            </div>
            <div class="brand-copy">
              <span class="brand-name">${company.name}</span>
              <div class="brand-description">
                ${company.manufacturing.map(line => `<span>${line}</span>`).join('')}
              </div>
            </div>
          </a>
        </div>

        <button class="menu-toggle" aria-expanded="false" aria-controls="main-menu" aria-label="Menu">
          ${icon('menu')}
          <span class="sr-only">Menu</span>
        </button>
      </div>

      <!-- 3. Curved Wave & Navigation Bar -->
      <div class="hal-nav-bar-wrapper">
        <div class="container hal-nav-container">
          <div class="nav-curve-stem" aria-hidden="true">
            <svg viewBox="0 0 100 46" preserveAspectRatio="none" class="nav-curve-svg">
              <path d="M0,46 C45,46 45,0 100,0 L100,46 Z" fill="#003875"></path>
            </svg>
          </div>
          <div class="nav-bar-strip">
            ${navigation(currentPath)}
          </div>
        </div>
      </div>
    </div>
  </header>`;
}
