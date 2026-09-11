import { escapeHtml } from '../components/image.js';

export function placeholderPage(page) {
  return `<section class="empty-page container"><p class="breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${escapeHtml(page.title)}</p><div class="section-heading"><h1>${escapeHtml(page.title)}</h1><span class="heading-rule"></span></div><p>Content will be added later.</p></section>`;
}

export function notFoundPage() {
  return '<section class="empty-page container"><h1>Page not found</h1><p>The requested page could not be found.</p><a class="text-link" href="/">Return to Home</a></section>';
}
