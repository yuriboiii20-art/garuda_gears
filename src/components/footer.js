import { company, pages } from '../data/site.js';
import { icon } from './icons.js';

export function footer(currentPath) {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <section class="footer-address" aria-labelledby="footer-company"><h2 id="footer-company">${company.registeredName}</h2><address>${icon('pin')}<span>${company.address.join('<br>')}</span></address></section>
      <section class="footer-contact" aria-labelledby="footer-contact-title"><h2 id="footer-contact-title">Contact</h2><a href="mailto:${company.email}">${icon('mail')}<span><span class="footer-label">E-mail</span>${company.email}</span></a><a href="https://${company.website}">${icon('globe')}<span><span class="footer-label">Website</span>${company.website}</span></a></section>
      <nav class="footer-navigation" aria-label="Footer navigation"><h2>Quick Links</h2><ul>${pages.map(page => `<li><a href="${page.path}" ${page.path === currentPath ? 'aria-current="page"' : ''}>${page.title}</a></li>`).join('')}</ul></nav>
    </div>
    <div class="footer-bottom"><div class="container"><span>${company.name}</span><a href="#top">Back to top ${icon('up')}</a></div></div>
  </footer>`;
}
