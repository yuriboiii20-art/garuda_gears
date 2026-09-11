import { profile } from '../data/site.js';
import { images } from '../data/images.js';
import { carousel } from '../components/carousel.js';
import { imageSlot } from '../components/image.js';
import { icon } from '../components/icons.js';

export function homePage() {
  return `${carousel()}
    <section class="company-profile container" aria-labelledby="profile-title">
      <div class="section-heading"><span class="eyebrow">GARUDA GEARS</span><h1 id="profile-title">COMPANY PROFILE</h1><span class="heading-rule"></span></div>
      <div class="profile-grid">
        <div class="profile-copy">
          <p class="profile-introduction">${profile.introduction}</p>
          <div class="product-callout"><span>Our Product:</span><p>${profile.product}</p></div>
          ${profile.paragraphs.map(text => `<p>${text}</p>`).join('')}
          <a class="text-link" href="/machineries/">View Machineries ${icon('arrow')}</a>
        </div>
        <figure class="factory-figure">${imageSlot(images.founder || images.factory, 'factory-slot', true)}<figcaption><span>GARUDA GEARS</span><span>Founder</span></figcaption></figure>
      </div>
    </section>`;
}
