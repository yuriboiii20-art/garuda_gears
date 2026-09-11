import { company } from '../data/site.js';
import { images } from '../data/images.js';
import { imageSlot } from './image.js';
import { icon } from './icons.js';
import { navigation } from './navigation.js';

export function header(currentPath) {
  return `<header id="top">
    <div class="utility-bar"><div class="container utility-inner"><a href="#main-content">Skip to main content</a><a href="https://${company.website}">${icon('globe')}${company.website}</a></div></div>
    <div class="container brand-row">
      <a class="brand" href="/" aria-label="GARUDA GEARS — Home">
        ${imageSlot(images.logo, 'logo-slot', true)}
        <span class="brand-copy"><span class="brand-name">${company.name}</span><span class="brand-description">${company.manufacturing.map(line => `<span>${line}</span>`).join('')}</span></span>
      </a>
      <div class="header-contact">
        <div class="header-numbers"><a href="tel:${company.officePhone}"><span>Ph : (Off) :</span> ${company.officePhone}</a><span><span>Tele Fax :</span> ${company.teleFax}</span></div>
        <img class="brand-oval" src="/images/logo/garuda-oval.svg" alt="GG oval emblem" width="93" height="61" />
        <a class="header-email" href="mailto:${company.email}">${icon('mail')}<span>${company.email}</span></a>
      </div>
    </div>
    ${navigation(currentPath)}
  </header>`;
}
