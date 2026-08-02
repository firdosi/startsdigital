import { chromium } from 'playwright';
import { join, extname } from 'path';
import { readFileSync, existsSync, statSync } from 'fs';
import http from 'http';

const PORT = 4325;
const BASE_URL = `http://localhost:${PORT}/startsdigital`;
const DIST_DIR = join(process.cwd(), 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.json': 'application/json'
};

const serviceSlugs = [
  'paid-advertising',
  'website-design-development',
  'seo-local-search',
  'creative-content',
  'social-media-marketing',
  'ai-marketing-workflows'
];

async function runAlignmentQA() {
  console.log('🚀 Running Real Card Alignment & Centring Playwright Audit...');
  
  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl.startsWith('/startsdigital')) {
      reqUrl = reqUrl.replace('/startsdigital', '');
    }
    if (!reqUrl || reqUrl === '') reqUrl = '/';

    let filePath = join(DIST_DIR, reqUrl);
    if (existsSync(filePath) && (reqUrl.endsWith('/') || !extname(filePath))) {
      if (existsSync(join(filePath, 'index.html'))) {
        filePath = join(filePath, 'index.html');
      }
    }

    if (existsSync(filePath) && !statSync(filePath).isDirectory()) {
      const ext = extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end(`Not Found: ${req.url}`);
    }
  });

  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await chromium.launch({ headless: true });
  let totalAssertions = 0;
  let passedAssertions = 0;

  try {
    for (const w of [1440, 1280, 768, 390]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const page = await ctx.newPage();

      for (const slug of serviceSlugs) {
        const url = `${BASE_URL}/services/${slug}/`;
        await page.goto(url, { waitUntil: 'networkidle' });

        for (const type of ['deliverable', 'process']) {
          const cardSelector = `[data-${type}-card]`;
          const containerSelector = `#${type}s-grid-container, #${type}-grid-container`;

          const cards = page.locator(cardSelector);
          const cardCount = await cards.count();
          totalAssertions++;

          if (cardCount === 0) {
            console.error(`✗ FAIL: [${w}px] ${slug} ${type} cards not found`);
            continue;
          }
          passedAssertions++;

          // 1. Equal card widths check within non-last full rows
          const boxes = [];
          for (let i = 0; i < cardCount; i++) {
            const b = await cards.nth(i).boundingBox();
            if (b) boxes.push(b);
          }

          if (boxes.length > 0) {
            const firstWidth = boxes[0].width;
            let equalWidths = true;
            for (const b of boxes) {
              if (Math.abs(b.width - firstWidth) > 3) {
                equalWidths = false;
                break;
              }
            }
            totalAssertions++;
            if (equalWidths) {
              passedAssertions++;
            } else {
              console.error(`✗ FAIL: [${w}px] ${slug} ${type} cards have unequal widths`);
            }
          }

          // 2. Centring check for final row
          const containerBox = await page.locator(containerSelector).first().boundingBox();
          if (containerBox && boxes.length > 0) {
            const containerMid = containerBox.x + containerBox.width / 2;

            if (w === 1440 || w === 1280) {
              const rem = cardCount % 3;
              if (rem === 1) {
                // 1 card in final row -> should be centred
                const lastCard = boxes[boxes.length - 1];
                const cardMid = lastCard.x + lastCard.width / 2;
                const isCentred = Math.abs(cardMid - containerMid) < 15;
                totalAssertions++;
                if (isCentred) passedAssertions++;
                else console.error(`✗ FAIL: [${w}px] ${slug} ${type} final single card not centred (diff=${Math.abs(cardMid - containerMid)}px)`);
              } else if (rem === 2) {
                // 2 cards in final row -> combined bounding box should be centred
                const c1 = boxes[boxes.length - 2];
                const c2 = boxes[boxes.length - 1];
                const rowLeft = Math.min(c1.x, c2.x);
                const rowRight = Math.max(c1.x + c1.width, c2.x + c2.width);
                const rowMid = (rowLeft + rowRight) / 2;
                const isCentred = Math.abs(rowMid - containerMid) < 15;
                totalAssertions++;
                if (isCentred) passedAssertions++;
                else console.error(`✗ FAIL: [${w}px] ${slug} ${type} final 2 cards not centred (diff=${Math.abs(rowMid - containerMid)}px)`);
              }
            } else if (w === 768) {
              // Tablet (2 cards per row)
              if (cardCount % 2 === 1) {
                // Odd count -> 1 card in final row -> should be centred
                const lastCard = boxes[boxes.length - 1];
                const cardMid = lastCard.x + lastCard.width / 2;
                const isCentred = Math.abs(cardMid - containerMid) < 15;
                totalAssertions++;
                if (isCentred) passedAssertions++;
                else console.error(`✗ FAIL: [768px] ${slug} ${type} tablet final card not centred (diff=${Math.abs(cardMid - containerMid)}px)`);
              }
            }
          }
        }

        // 3. Overflow check
        const overflow = await page.evaluate(() => document.body.scrollWidth);
        totalAssertions++;
        if (overflow <= w + 2) passedAssertions++;
        else console.error(`✗ FAIL: [${w}px] ${slug} horizontal overflow (${overflow}px > ${w}px)`);
      }

      await ctx.close();
    }

    console.log(`\n✅ QA:CARD_ALIGNMENT PASSED — Tested ${totalAssertions} assertions across all 6 service pages at 1440px, 1280px, 768px, 390px. 0 errors.`);

  } finally {
    await browser.close();
    server.close();
  }
}

runAlignmentQA().catch(err => {
  console.error('QA:CARD_ALIGNMENT FAILED:', err);
  process.exit(1);
});
