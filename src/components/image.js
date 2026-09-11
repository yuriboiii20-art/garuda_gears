import { icon } from './icons.js';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function imageSlot(asset, variant = '', eager = false) {
  return `<div class="image-slot ${variant}">
    <div class="image-placeholder" role="img" aria-label="${escapeHtml(asset.label)} — photograph pending">
      <span class="camera-frame">${icon('camera')}</span>
      <span class="placeholder-label">${escapeHtml(asset.label)}</span>
      ${variant === 'logo-slot' ? '' : '<span class="placeholder-note">Photograph to be added</span>'}
    </div>
    ${asset.src ? `<img src="${escapeHtml(asset.src)}" alt="${escapeHtml(asset.alt)}" loading="${eager || asset.preload ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''} />` : ''}
  </div>`;
}

export function initializeImages(root = document) {
  root.querySelectorAll('.image-slot img').forEach(img => {
    const showImage = () => {
      if (!img.naturalWidth) return;
      img.classList.add('is-loaded');
      img.previousElementSibling.hidden = true;
    };
    img.addEventListener('load', showImage);
    img.addEventListener('error', () => {
      img.hidden = true;
      img.previousElementSibling.hidden = false;
    });
    if (img.complete) showImage();
  });
}
