import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('http://localhost:5173/');
await page.waitForLoadState('networkidle');

// Open mobile drawer
await page.locator('.menu-toggle').click();
await page.waitForSelector('#main-menu.is-open', { state: 'visible' });
await page.screenshot({ path: '.reference/mobile-drawer-collapsed.png' });

// Click Products dropdown
await page.locator('.nav-dropdown-trigger').click();
await page.waitForSelector('.nav-dropdown', { state: 'visible' });
await page.screenshot({ path: '.reference/mobile-drawer-expanded.png' });

// Click a product link in the dropdown (Ground Gears)
await page.locator('.nav-product-link[href="/#ground-gears"]').click();
await page.waitForTimeout(600);
await page.waitForSelector('#ground-gears .product-card-img');
await page.screenshot({ path: '.reference/mobile-product-scrolled.png' });

// Desktop page
const deskPage = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await deskPage.goto('http://localhost:5173/');
await deskPage.locator('#products').scrollIntoViewIfNeeded();
await deskPage.waitForLoadState('networkidle');
await deskPage.waitForTimeout(1000);
await deskPage.screenshot({ path: '.reference/desktop-products-section.png' });

await browser.close();
console.log('Screenshots generated successfully!');
