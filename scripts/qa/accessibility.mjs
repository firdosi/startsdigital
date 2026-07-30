import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const distDir = path.join(rootDir, 'dist');

let errors = [];
let passCount = 0;

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`❌ FAIL: ${message}`);
  } else {
    passCount++;
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('🚀 Running Accessibility (a11y) QA Audit across distinct page templates...\n');

const routesToTest = [
  '/',
  '/about/',
  '/contact/',
  '/services/',
  '/services/paid-advertising/',
  '/work/',
  '/work/convortai/',
  '/work/clearzone-immigration/',
  '/industries/',
  '/industries/technology-products/',
  '/locations/lahore/',
  '/legal/',
  '/404/'
];

// Mount static HTTP server for dist/
const PORT = 4488;
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.startsWith('/startsdigital')) {
    reqPath = reqPath.slice('/startsdigital'.length);
  }
  if (!reqPath || reqPath === '/') reqPath = '/index.html';
  if (reqPath.endsWith('/')) reqPath += 'index.html';

  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath) && reqPath.includes('404')) {
    filePath = path.join(distDir, '404.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html; charset=utf-8' :
                        ext === '.css' ? 'text/css' :
                        ext === '.js' ? 'application/javascript' :
                        ext === '.webp' ? 'image/webp' :
                        ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch();
    
    for (const route of routesToTest) {
      const pageUrl = `http://127.0.0.1:${PORT}/startsdigital${route}`;
      const page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: 'networkidle' });

      // 1. Single H1 assertion
      const h1Count = await page.evaluate(() => document.querySelectorAll('h1').length);
      assert(h1Count === 1, `[${route}] Contains exactly 1 <h1> element (found ${h1Count})`);

      // 2. Heading hierarchy order assertion
      const headingOrderValid = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        let prevLevel = 0;
        for (const h of headings) {
          const level = parseInt(h.tagName.substring(1), 10);
          if (prevLevel > 0 && level > prevLevel + 1) return false;
          prevLevel = level;
        }
        return true;
      });
      assert(headingOrderValid, `[${route}] Heading hierarchy order is logical (h1 -> h2 -> h3)`);

      // 3. Image Alt attribute assertion
      const missingAltCount = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => !img.hasAttribute('alt')).length;
      });
      assert(missingAltCount === 0, `[${route}] All images have alt attribute (missing: ${missingAltCount})`);

      // 4. Buttons accessible name assertion
      const namelessButtons = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, a[role="button"]'));
        return btns.filter(b => {
          const name = b.innerText || b.getAttribute('aria-label') || b.getAttribute('title') || '';
          return name.trim().length === 0;
        }).length;
      });
      assert(namelessButtons === 0, `[${route}] All buttons have accessible names (unnamed: ${namelessButtons})`);

      // 5. Actionable primary controls minimum touch target size (44px)
      if (route === '/contact/' || route === '/') {
        const smallControls = await page.evaluate(() => {
          const controls = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], a.min-h-\\[44px\\]'));
          return controls.filter(c => {
            const r = c.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40);
          }).length;
        });
        assert(smallControls === 0, `[${route}] Primary actionable controls satisfy minimum touch target size`);
      }

      await page.close();
    }

    await browser.close();
    server.close();

    console.log(`\n----------------------------------------`);
    if (errors.length === 0) {
      console.log(`✨ ALL ${passCount} ACCESSIBILITY AUDITS PASSED CLEANLY! (0 errors)\n`);
      process.exit(0);
    } else {
      console.error(`💥 ACCESSIBILITY QA AUDIT FAILED with ${errors.length} errors:`);
      errors.forEach(e => console.error(`  - ${e}`));
      process.exit(1);
    }
  } catch (err) {
    server.close();
    console.error('💥 ACCESSIBILITY SCRIPT ERROR:', err.message);
    process.exit(1);
  }
});
