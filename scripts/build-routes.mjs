import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pages } from '../src/data/site.js';

// Real HTML entry points support direct URLs on ordinary static hosting.
const template = await readFile('dist/index.html', 'utf8');
for (const page of pages.filter(page => page.path !== '/')) {
  const directory = `dist${page.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, template.replace('<title>Home | GARUDA GEARS</title>', `<title>${page.title} | GARUDA GEARS</title>`));
}
await writeFile('dist/404.html', template.replace('<title>Home | GARUDA GEARS</title>', '<title>Page not found | GARUDA GEARS</title>'));
console.log(`Generated ${pages.length} page entry points and 404.html.`);
