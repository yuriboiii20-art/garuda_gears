import './styles.css';
import { pages } from './data/site.js';
import { header } from './components/header.js';
import { footer } from './components/footer.js';
import { homePage } from './pages/home.js';
import { placeholderPage, notFoundPage } from './pages/placeholder.js';
import { initializeNavigation } from './components/navigation.js';
import { initializeCarousel } from './components/carousel.js';
import { initializeImages } from './components/image.js';

const pathname = window.location.pathname.replace(/\/index\.html$/, '/');
const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
const page = pages.find(item => item.path === currentPath);
document.title = `${page?.title ?? 'Page not found'} | GARUDA GEARS`;
document.querySelector('#app').innerHTML = `${header(currentPath)}<main id="main-content" tabindex="-1">${page ? (page.path === '/' ? homePage() : placeholderPage(page)) : notFoundPage()}</main>${footer(currentPath)}`;
initializeNavigation();
initializeCarousel();
initializeImages();
