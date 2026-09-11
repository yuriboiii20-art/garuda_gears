import { images } from '../data/images.js';
import { imageSlot } from './image.js';
import { icon } from './icons.js';

export function carousel() {
  return `<section class="carousel" aria-roledescription="carousel" aria-label="Company photographs">
    <div class="slides">${images.slider.map((asset, index) => `<div id="slide-${index + 1}" class="slide ${index === 0 ? 'is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${index + 1} of ${images.slider.length}" aria-hidden="${index !== 0}" ${index === 0 ? '' : 'inert'}>${imageSlot({ ...asset, preload: true }, 'hero-slot', index === 0)}</div>`).join('')}</div>
    <button class="slide-arrow previous" aria-label="Previous slide">${icon('left')}</button>
    <button class="slide-arrow next" aria-label="Next slide">${icon('right')}</button>
    <div class="carousel-controls"><span class="slide-count" aria-hidden="true"><strong>01</strong><span>/</span>${String(images.slider.length).padStart(2, '0')}</span>
      <div class="slide-dots" role="group" aria-label="Choose a slide">${images.slider.map((_, index) => `<button class="slide-dot ${index === 0 ? 'is-active' : ''}" aria-label="Show slide ${index + 1}" aria-controls="slide-${index + 1}" ${index === 0 ? 'aria-current="true"' : ''} data-slide="${index}"><span></span></button>`).join('')}</div>
      <button class="rotation-toggle" aria-label="Pause slideshow">${icon('pause')}</button>
    </div>
    <p class="sr-only slide-status" aria-live="off" aria-atomic="true">Slide 1 of ${images.slider.length}</p>
  </section>`;
}

export function initializeCarousel() {
  const root = document.querySelector('.carousel');
  if (!root) return;
  const slides = [...root.querySelectorAll('.slide')];
  const dots = [...root.querySelectorAll('.slide-dot')];
  const toggle = root.querySelector('.rotation-toggle');
  const status = root.querySelector('.slide-status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let paused = reducedMotion.matches;
  let pointerPaused = paused;
  let timer;
  const show = next => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
      slide.inert = i !== index;
      dots[i].classList.toggle('is-active', i === index);
      if (i === index) dots[i].setAttribute('aria-current', 'true');
      else dots[i].removeAttribute('aria-current');
    });
    root.querySelector('.slide-count strong').textContent = String(index + 1).padStart(2, '0');
    // Keep the current indicator visible without moving the page or keyboard focus.
    const strip = root.querySelector('.slide-dots');
    strip.scrollTo({
      left: dots[index].offsetLeft - dots[0].offsetLeft - (strip.clientWidth - dots[index].offsetWidth) / 2,
      behavior: 'instant',
    });
    status.textContent = `Slide ${index + 1} of ${slides.length}`;
  };
  const schedule = () => {
    clearInterval(timer);
    const running = !paused && !document.hidden;
    status.setAttribute('aria-live', running ? 'off' : 'polite');
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    toggle.innerHTML = icon(paused ? 'play' : 'pause');
    if (running) timer = setInterval(() => show(index + 1), 1000);
  };
  const select = next => { paused = true; schedule(); show(next); };
  root.querySelector('.previous').addEventListener('click', () => select(index - 1));
  root.querySelector('.next').addEventListener('click', () => select(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => select(i)));
  // Preserve the pointer's intended action before focusin pauses the slideshow.
  toggle.addEventListener('pointerdown', () => { pointerPaused = paused; });
  toggle.addEventListener('click', event => {
    paused = !(event.detail > 0 ? pointerPaused : paused);
    schedule();
  });
  // Keyboard focus stops automatic motion until Play is explicitly requested.
  root.addEventListener('focusin', event => {
    if (!root.contains(event.relatedTarget)) { paused = true; schedule(); }
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      select(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => { if (event.matches) paused = true; schedule(); });
  window.addEventListener('pagehide', () => clearInterval(timer));
  window.addEventListener('pageshow', schedule);
  schedule();
}
