import { company } from '../data/site.js';
import { icon } from './icons.js';

export function locationMap() {
  return `<section class="location-section" aria-labelledby="location-title">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">STRATEGIC LOCATION & FACILITIES</span>
        <h2 id="location-title">OUR FACTORY & WORKSHOP LOCATIONS</h2>
        <span class="heading-rule"></span>
      </div>

      <div class="location-grid">
        <div class="location-details">
          <div class="location-card primary-unit">
            <div class="unit-badge">Main Works</div>
            <h3 class="unit-title">Garuda Gears</h3>
            <p class="unit-address">
              ${icon('pin')}
              <span>No. A-8, 1st Cross, 1st Stage, Peenya Industrial Area, Bangalore - 560058</span>
            </p>
            <div class="unit-contact">
              <a href="mailto:garuda_gears@rediffmail.com" class="unit-link">
                ${icon('mail')}
                <span>garuda_gears@rediffmail.com</span>
              </a>
              <a href="https://${company.website}" target="_blank" rel="noopener noreferrer" class="unit-link">
                ${icon('globe')}
                <span>${company.website}</span>
              </a>
            </div>
          </div>

          <div class="location-card associated-unit">
            <div class="unit-badge">Associated Unit</div>
            <h3 class="unit-title">Garuda Gears & Transmissions</h3>
            <p class="unit-address">
              ${icon('pin')}
              <span>#31, 3rd Cross, Ganapathi Nagar, Rajgopal Nagar Main Road, Peenya 3rd Phase, Bangalore - 560058</span>
            </p>
            <div class="unit-contact">
              <a href="tel:${company.officePhone}" class="unit-link">
                <span>Ph (Off): <strong>${company.officePhone}</strong></span>
              </a>
              <span class="unit-link">
                <span>Tele Fax: <strong>${company.teleFax}</strong></span>
              </span>
              <a href="mailto:${company.email}" class="unit-link">
                ${icon('mail')}
                <span>${company.email}</span>
              </a>
            </div>
          </div>

          <div class="facility-summary">
            <div class="summary-pill">
              <strong>19,000 sq. ft.</strong>
              <span>Shop Floor Area</span>
            </div>
            <div class="summary-pill">
              <strong>250 HP</strong>
              <span>Connected Power Load</span>
            </div>
            <div class="summary-pill">
              <strong>Peenya Hub</strong>
              <span>Heart of Industrial Area</span>
            </div>
          </div>

          <a class="directions-btn" href="https://maps.google.com/?q=Peenya+Industrial+Area+Bangalore+560058" target="_blank" rel="noopener noreferrer">
            ${icon('pin')}
            <span>Open in Google Maps / Get Directions</span>
            ${icon('arrow')}
          </a>
        </div>

        <div class="map-embed-wrapper">
          <div class="map-frame-header">
            <div class="map-header-dots"><span></span><span></span><span></span></div>
            <span class="map-header-title">Peenya Industrial Area, Bengaluru, Karnataka 560058</span>
          </div>
          <iframe
            class="map-iframe"
            title="Garuda Gears Peenya Industrial Area Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15548.887893278853!2d77.5147!3d13.0298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d1981a3d937%3A0x63351d5c21db33f4!2sPeenya%20Industrial%20Area%2C%20Bengaluru%2C%20Karnataka%20560058!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>`;
}
