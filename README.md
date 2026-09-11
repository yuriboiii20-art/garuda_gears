# GARUDA GEARS

A responsive, original corporate website built with vanilla JavaScript and CSS, with Vite for development and builds. No production dependencies, external fonts, stock photographs, or generated images.

## Run

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

Deploy the `dist` directory to static hosting at the domain root. The build emits an `index.html` for each of the ten routes, so direct URLs work without a single-page-app rewrite. The host can use `dist/404.html` for unknown URLs.

## Add photographs

1. Put assets in `public/images/logo/`, `slider/`, `factory/`, `products/`, or `gallery/`.
2. Open `src/data/images.js`.
3. Replace `src: null` with a path such as `src: '/images/slider/production-floor.webp'` and set meaningful `alt` text describing the actual photograph.
4. Rebuild. The placeholder is hidden when the image loads; failed images retain their labeled placeholder.

The thirty slider photographs were selected from the user's shared Google Drive folder to show different subjects: team, exterior, workshop, machinery, operator, inspection, gear assembly, helical gears, worm gear, and office. Local copies, served by Drive at up to 1600 pixels wide, are imported from `src/assets/images/drive/` in `src/data/images.js`. Original filenames and Drive links are recorded in that directory's `sources.json`. The website makes no runtime requests to Google Drive.

Slider photos and the logo use `object-fit: contain` to preserve the full image. The Lorenz photograph remains the carousel's dark blue background, referenced in `src/styles.css`. Slot dimensions stay fixed while images load or slides change. All thirty slider images begin loading immediately so the one-second rotation does not wait for lazy loading. The indicator strip scrolls to keep the active dot visible on desktop and mobile. Adding another slider object automatically adds its controls and count. Products and gallery directories are reserved; those pages remain unpopulated.

## Content and components

- `src/data/site.js`: supplied text and ordered route definitions.
- `src/components/`: header, navigation, carousel, footer, and shared image rendering.
- `src/pages/home.js`: populated Home page only.
- `src/pages/placeholder.js`: shared empty page and not-found structures.
- `src/styles.css`: colors, layout, and responsive breakpoints.

The supplied header screenshot is represented by scalable SVG recreations of its blue gear-and-rack and red GG oval emblems, with a red serif company name. The manufacturing description, office phone (28397578), and Tele Fax (41171467) are transcribed from that screenshot. No area or country code has been inferred. Email, address, and website remain from the previously supplied text. The screenshot's 1250mm header description and the previously supplied 2500mm profile wording are both preserved as supplied. The factory photograph slot remains available for a future image.

## Interaction and accessibility

The carousel advances every 1 second and loops through all thirty photographs, including while the pointer is over the carousel. Each transition lasts 300ms. The Pause control, keyboard focus, or manual slide selection pauses rotation until Play is chosen. Reduced-motion settings disable autoplay initially. Previous/next, dots, and left/right arrow keys are supported. Hidden slides are removed from accessibility navigation. The mobile menu supports Escape and has visible focus indicators. Navigation uses ordinary links and supports browser history and opening in new tabs.

## Verification

```sh
npm test
```

Tests use locally installed Chrome through Playwright. If Chrome is unavailable, install a Playwright browser and adjust `channel` in `playwright.config.js`. Tests cover all routes, viewports from 320 to 1920 pixels, mobile navigation, keyboard controls, autoplay, pause behavior, reduced motion, content, and console errors.
