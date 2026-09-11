import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { pages, profile, company } from '../src/data/site.js';

for (const width of [320, 375, 390, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive Home and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'COMPANY PROFILE', exact: true })).toBeVisible();
    await expect(page.locator('.slide img')).toHaveCount(30);
    await expect(page.locator('.slide.is-active img')).toHaveClass('is-loaded');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width <= 1100) {
      await expect(page.locator('#main-menu')).toBeHidden();
      await page.getByRole('button', { name: /^Menu/ }).click();
      await expect(page.locator('#main-menu')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      for (const link of await page.locator('#main-menu a').all()) {
        const bounds = await link.boundingBox();
        expect(bounds.height).toBeGreaterThanOrEqual(44);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      }
      await page.keyboard.press('Escape');
      await expect(page.locator('#main-menu')).toBeHidden();
      await expect(page.locator('.menu-toggle')).toBeFocused();
      await page.locator('.menu-toggle').click();
      await page.locator('#main-menu').getByRole('link', { name: 'Products', exact: true }).click();
      await expect(page).toHaveURL(/\/products\/$/);
      await expect(page.getByText('Content will be added later.')).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test('all ten ordered routes work directly and only Home is populated', async ({ page }) => {
  for (const route of pages) {
    const response = await page.goto(route.path);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(`${route.title} | GARUDA GEARS`);
    await expect(page.locator('#main-menu a')).toHaveText(pages.map(item => item.title));
    await expect(page.locator('#main-menu [aria-current="page"]')).toHaveText(route.title);
    expect(await readFile(`dist${route.path}index.html`, 'utf8')).toContain(`<title>${route.title} | GARUDA GEARS</title>`);
    if (route.path !== '/') {
      await expect(page.locator('main')).toHaveText(`Home/${route.title}${route.title}Content will be added later.`);
      await expect(page.locator('.carousel')).toHaveCount(0);
    }
  }
});

test('supplied company text is preserved without fabricated information', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.profile-introduction')).toHaveText(profile.introduction);
  await expect(page.locator('.product-callout p')).toHaveText(profile.product);
  for (const text of profile.paragraphs) await expect(page.getByText(text, { exact: true })).toHaveCount(1);
  await expect(page.locator('footer address')).toHaveText(company.address.join(''));
  await expect(page.locator('body')).not.toContainText(/Hindustan|HAL|ISO|Testimonials|Certified/);
  await expect(page.locator('.logo-slot img')).toHaveClass('is-loaded');
  await expect(page.locator('.header-numbers')).toContainText('28397578');
  await expect(page.locator('.header-numbers')).toContainText('41171467');
  await expect(page.locator('.brand-description')).toContainText('Upto 1.6mts. Gear Grinding Upto 1250mm Dia.');
  await expect(page.locator('.slide')).toHaveCount(30);
  const sources = await page.locator('.slide img').evaluateAll(images => images.map(image => image.src));
  expect(new Set(sources).size).toBe(30);
});

test('mobile indicators can reach the last photo without overflowing the page', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Show slide 30', exact: true }).click();
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-30');
  await expect(page.locator('.slide.is-active img')).toHaveClass('is-loaded');
  const indicatorVisible = await page.locator('.slide-dot.is-active').evaluate(dot => {
    const bounds = dot.getBoundingClientRect();
    const strip = dot.parentElement.getBoundingClientRect();
    return bounds.left >= strip.left - 1 && bounds.right <= strip.right + 1;
  });
  expect(indicatorVisible).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
});

test('carousel advances every second through all thirty photos, including while hovered', async ({ page }) => {
  const time = new Date('2026-09-11T12:00:00Z');
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto('/');
  const height = (await page.locator('.carousel').boundingBox()).height;
  await page.locator('.carousel').hover();
  await page.clock.runFor(999);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
  await page.clock.runFor(1);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-2');
  for (let next = 3; next <= 31; next++) {
    await page.clock.runFor(1000);
    await expect(page.locator('.slide.is-active')).toHaveAttribute('id', `slide-${next === 31 ? 1 : next}`);
    await expect(page.locator('.slide.is-active img')).toHaveClass('is-loaded');
  }
  expect((await page.locator('.carousel').boundingBox()).height).toBe(height);
  await expect(page.locator('.slide[aria-hidden="true"][inert]')).toHaveCount(29);
});

test('manual controls pause autoplay and Play resumes it', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('button', { name: 'Show slide 30' }).click();
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
  await page.locator('header').hover();
  await page.clock.fastForward(11000);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
  await page.getByRole('button', { name: 'Show slide 3', exact: true }).click();
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-3');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-2');
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  await page.locator('header').hover();
  await page.clock.fastForward(1000);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-3');
});

test('reduced motion disables autoplay and keyboard can operate navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await page.clock.fastForward(12000);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
  await expect(page.getByRole('button', { name: 'Play slideshow' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Previous slide' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-30');
});

test('Pause works on the first pointer interaction and Play restarts rotation', async ({ page }) => {
  const time = new Date('2026-09-11T12:00:00Z');
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause slideshow' }).click();
  await page.locator('header').hover();
  await page.clock.fastForward(12000);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-1');
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  await page.locator('header').hover();
  await page.clock.fastForward(1000);
  await expect(page.locator('.slide.is-active')).toHaveAttribute('id', 'slide-2');
});

test('Home loads without browser console errors or failed asset requests', async ({ page }) => {
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => errors.push(request.url()));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('capture desktop and mobile for visual review', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('.slide.is-active img').waitFor({ state: 'visible' });
  await expect(page.locator('.slide.is-active img')).toHaveClass('is-loaded');
  await page.screenshot({ path: '.reference/garuda-desktop.png', fullPage: true });
  await page.screenshot({ path: '.reference/garuda-desktop-fold.png', fullPage: false });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: '.reference/garuda-mobile.png', fullPage: true });
  await page.screenshot({ path: '.reference/garuda-mobile-fold.png', fullPage: false });
  await page.evaluate(() => window.scrollBy(0, 650));
  await page.screenshot({ path: '.reference/garuda-mobile-scrolled.png', fullPage: false });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.locator('#main-menu').waitFor({ state: 'visible' });
  await page.screenshot({ path: '.reference/garuda-drawer.png' });
});

