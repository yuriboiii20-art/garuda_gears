# GARUDA GEARS

A responsive, high-performance corporate website built with vanilla JavaScript and CSS, with Vite for development and multi-page static builds. No production framework dependencies, external fonts, stock photographs, or generated images.

## Features

- **Automated Hero Carousel**: 30 high-resolution workshop, machinery, gear, and team photographs. Auto-advances every 1 second with smooth 300ms transitions, scroll-tracking indicator strip, pause/play controls, arrow key navigation, and automatic reduced-motion handling.
- **Mobile Slide Drawer Navigation**: Responsive slide-out navigation menu for mobile viewports (<900px) with hamburger toggle button, backdrop overlay, focus trap, Escape key handling, and full ARIA accessibility attributes.
- **Company Profile & Founder Spotlight**: Formatted profile section featuring the founder photograph with an optimized portrait aspect ratio, responsive centering, and authentic manufacturing details.
- **SVG Brand Assets**: Scalable vector recreations of the blue gear-and-rack and red GG oval emblems, with authentic company typography and dual phone/telefax contact information.
- **Static Multi-Page Generation**: Builds dedicated static `index.html` files for all ten routes to ensure direct URL navigation works seamlessly without SPA server rewrite requirements.

## Quick Start

### Run locally

```sh
npm install
npm run dev
```

### Build and preview

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory to any static hosting provider at the domain root. The build emits an `index.html` for each of the ten routes, so direct URLs work cleanly without a single-page-app rewrite. The host can use `dist/404.html` for unknown URLs.

## Project Structure & Components

- `src/data/site.js`: Site metadata, phone/fax contacts, and route definitions.
- `src/data/images.js`: Slider image catalog, founder photograph mapping, and fallback placeholders.
- `src/components/`:
  - `header.js`: Top contact bar, scalable brand emblems, company tagline, and mobile menu toggle button.
  - `navigation.js`: Desktop navigation bar and mobile slide drawer menu with backdrop and accessibility controls.
  - `carousel.js`: Hero image slider with autoplay, manual controls, keyboard navigation, and indicator strip.
  - `footer.js`: Footer contact details, address, navigation links, and copyright notice.
  - `images.js`: Reusable image slot helper with loading state and fallback placeholders.
  - `icons.js`: Scalable SVG icon components (phone, email, fax, location, arrows, play, pause, menu, close).
- `src/pages/home.js`: Main Home page layout with hero carousel and company profile section.
- `src/pages/placeholder.js`: Standard template for secondary and 404 pages.
- `src/styles.css`: Complete CSS design system, typography tokens, responsive breakpoints, drawer animations, and layout grids.

## Asset Management

### Slider & Gallery Photographs
The thirty slider photographs were selected from the shared Google Drive archive to highlight workshop operations: team, exterior, workshop, machinery, operator, inspection, gear assembly, helical gears, worm gear, and office.
- Local copies (up to 1600px wide) are imported from `src/assets/images/drive/` into `src/data/images.js`.
- Original filenames and source Drive links are recorded in `src/assets/images/drive/sources.json`.
- The website operates entirely offline with zero runtime requests to external services.

### Founder & Factory Images
- The founder photograph is located at `public/images/founder.jpg` and mapped in `src/data/images.js`.
- Rendered with an optimized portrait aspect ratio (`0.85`), centered focal alignment (`object-position: center 15%`), and responsive layout behavior.

### Adding New Photographs
1. Place image files in `public/images/` (`logo/`, `slider/`, `factory/`, `products/`, or `gallery/`).
2. Update `src/data/images.js` to reference the image path and provide descriptive `alt` text.
3. Rebuild the application. The placeholder automatically hides once the image loads.

## Interaction & Accessibility

- **Slideshow Autoplay & Controls**: Carousel advances every 1 second and loops through all 30 photos. Pause button, keyboard focus, or manual slide selection pauses playback until Play is clicked. Reduced-motion settings automatically disable autoplay.
- **Keyboard Navigation**: Left and right arrow keys navigate carousel slides. Hidden slides are omitted from tab navigation.
- **Mobile Navigation Drawer**: Toggleable menu with `aria-expanded` and `aria-controls` attributes, backdrop click dismissal, Escape key listener, and visible focus indicators.
- **History & Routing**: Navigation uses standard anchor tags supporting browser history, right-click context menus, and multi-tab browsing.

## Testing & Verification

```sh
npm test
```

Automated end-to-end and regression tests are powered by Playwright:
- **Responsive Viewport Coverage**: Tests layout integrity across 320px, 375px, 390px, 768px, 1024px, 1280px, 1440px, and 1920px widths.
- **Mobile Drawer Menu**: Validates slide drawer opening, closing, backdrop dismiss, and navigation link interactions.
- **Carousel Mechanics**: Asserts 1-second interval rotation, manual slide navigation, pause/play toggles, and prefers-reduced-motion behavior.
- **Visual Regression Snapshots**: Captures full-page, above-the-fold, scrolled, and mobile drawer screenshots in `.reference/`.
- **Route & Content Integrity**: Validates all 10 routes and confirms zero browser console errors or failed network requests.
