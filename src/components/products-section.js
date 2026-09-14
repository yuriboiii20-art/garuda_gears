import { products } from '../data/products.js';

export function productsSection() {
  return `<section id="products" class="products-section" aria-labelledby="products-section-title">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">MANUFACTURING CAPABILITIES & CATALOG</span>
        <h2 id="products-section-title">OUR PRODUCTS & SPECIALIZATIONS</h2>
        <span class="heading-rule"></span>
        <p class="section-lead-text">
          Precision gear manufacturing, tooth profile grinding, spline cutting, and gearbox refurbishment fabricated to stringent client specifications and international quality standards.
        </p>
      </div>

      <div class="products-index-bar">
        <span class="index-label">Quick Jump to Product:</span>
        <div class="index-chips">
          ${products.map(p => `<a href="#${p.id}" class="product-chip">${p.name} <span class="chip-arrow">›</span></a>`).join('')}
        </div>
      </div>

      <div class="products-grid">
        ${products.map((product, idx) => `
          <article id="${product.id}" class="product-card">
            <div class="product-card-header">
              <span class="product-number">${idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`}</span>
              <div class="product-header-text">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-tagline">${product.tagline}</span>
              </div>
            </div>

            <div class="product-card-media">
              <img src="${product.image}" alt="${product.imageAlt || product.name}" class="product-card-img" loading="lazy" />
            </div>

            <div class="product-card-body">
              <div class="product-text-block">
                <h4 class="block-heading">Description & Overview</h4>
                <p class="product-desc">${product.description}</p>
                ${product.details ? `<p class="product-details">${product.details}</p>` : ''}
              </div>

              ${product.specifications && product.specifications.length ? `
              <div class="product-specs-block">
                <h4 class="block-heading">Key Specifications & Features</h4>
                <ul class="specs-list">
                  ${product.specifications.map(spec => `<li><span class="spec-bullet">▪</span><span>${spec}</span></li>`).join('')}
                </ul>
              </div>` : ''}

              <div class="product-meta-grid">
                ${product.materials ? `
                <div class="meta-item">
                  <span class="meta-label">Materials:</span>
                  <span class="meta-value">${product.materials}</span>
                </div>` : ''}
                ${product.applications ? `
                <div class="meta-item">
                  <span class="meta-label">Industrial Applications:</span>
                  <span class="meta-value">${product.applications}</span>
                </div>` : ''}
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>`;
}
