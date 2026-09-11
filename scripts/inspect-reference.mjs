import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('.reference', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('https://hal-india.co.in/home', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(12000);
await page.screenshot({ path: '.reference/hal-desktop.png', fullPage: true });
console.log(await page.locator('header, nav, footer, h1, h2').evaluateAll(elements => elements.slice(0, 24).map(el => ({
  tag: el.tagName, text: el.innerText.slice(0, 140), width: el.getBoundingClientRect().width,
  color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor,
  font: getComputedStyle(el).fontFamily, size: getComputedStyle(el).fontSize,
}))));
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: '.reference/hal-mobile.png', fullPage: true });
await browser.close();
