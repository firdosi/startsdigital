import fs from 'fs';
import path from 'path';
import http from 'http';
import { chromium } from 'playwright';

const PORT = 4325;
const DIST_DIR = path.join(process.cwd(), 'dist');
const OUT_DIR = path.join(process.cwd(), 'scratch/tools-and-brand-logo-review');

function createStaticServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath.startsWith('/startsdigital')) {
      reqPath = reqPath.replace('/startsdigital', '');
    }
    if (!reqPath || reqPath.endsWith('/')) reqPath += 'index.html';
    
    let filePath = path.join(DIST_DIR, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
}

async function main() {
  console.log('Generating final brand wall contrast evidence screenshots under scratch/tools-and-brand-logo-review/ via Playwright...');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = createStaticServer();
  await new Promise(res => server.listen(PORT, res));

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. brand-wall-final-check-1440.png
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const brandSection = page.locator('#brand-logos');
      const outPath = path.join(OUT_DIR, 'brand-wall-final-check-1440.png');
      await brandSection.screenshot({ path: outPath });
      console.log(`✓ Captured ${outPath}`);
      await ctx.close();
    }

    // 2. brand-wall-final-check-390.png
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);
      const brandSection = page.locator('#brand-logos');
      const outPath = path.join(OUT_DIR, 'brand-wall-final-check-390.png');
      await brandSection.screenshot({ path: outPath });
      console.log(`✓ Captured ${outPath}`);
      await ctx.close();
    }

    // 3. brand-logo-final-contrast-closeup.png
    // Must feature: Black Gold Fertilizer, Wajib Livestock, Convort AI, Rapidzone, Riyadh Finish Pro
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:${PORT}/startsdigital/`, { waitUntil: 'networkidle' });
      await page.locator('#brand-logos').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#brand-logos img'));
        imgs.forEach(img => { img.loading = 'eager'; img.src = img.src; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      await page.waitForTimeout(500);

      await page.evaluate(() => {
        const targetIds = ['black-gold-fertilizer', 'wajib-livestock', 'convort-ai', 'rapidzone', 'riyadh-finish-pro'];
        const cards = targetIds.map(id => document.querySelector(`[data-client-brand-id="${id}"]`)).filter(Boolean);

        const wrapper = document.createElement('div');
        wrapper.id = 'closeup-wrapper';
        wrapper.style.cssText = 'position: fixed; top: 50px; left: 50px; z-index: 999999; background: #061d33; padding: 32px; border-radius: 24px; border: 2px solid rgba(255,255,255,0.2); display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);';

        cards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.style.width = '220px';
          clone.style.height = '120px';
          wrapper.appendChild(clone);
        });

        document.body.appendChild(wrapper);
      });

      await page.waitForTimeout(300);
      const closeupEl = page.locator('#closeup-wrapper');
      const outPath = path.join(OUT_DIR, 'brand-logo-final-contrast-closeup.png');
      await closeupEl.screenshot({ path: outPath });
      console.log(`✓ Captured ${outPath}`);

      await ctx.close();
    }

    console.log(`\nAll 3 required final contrast evidence screenshots generated under ${OUT_DIR}.`);

  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(console.error);
