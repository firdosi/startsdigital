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

const expectedCounts = {
  'paid-advertising': { deliverables: 7, process: 5 },
  'website-design-development': { deliverables: 8, process: 6 },
  'seo-local-search': { deliverables: 8, process: 5 },
  'creative-content': { deliverables: 8, process: 6 },
  'social-media-marketing': { deliverables: 8, process: 6 },
  'ai-marketing-workflows': { deliverables: 8, process: 6 }
};

async function runAlignmentQA() {
  console.log('🚀 Running Comprehensive Card & Timeline Alignment Playwright Audit...');
  
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
  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(condition, message) {
    if (condition) {
      passedAssertions++;
    } else {
      failedAssertions++;
      console.error(`✗ FAIL: ${message}`);
    }
  }

  try {
    // A. TEST ALL 6 SERVICE DETAIL PAGES ACROSS 4 BREAKPOINTS
    for (const w of [1440, 1280, 768, 390]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 1000 } });
      const page = await ctx.newPage();

      for (const [slug, counts] of Object.entries(expectedCounts)) {
        const url = `${BASE_URL}/services/${slug}/`;
        await page.goto(url, { waitUntil: 'networkidle' });

        for (const type of ['deliverable', 'process']) {
          const countKey = type === 'deliverable' ? 'deliverables' : 'process';
          const expectedCount = counts[countKey];
          const cardSelector = `[data-${type}-card]`;
          const containerSelector = `#${type}s-grid-container, #${type}-grid-container`;

          const containerLoc = page.locator(containerSelector).first();
          const containerBox = await containerLoc.boundingBox();
          assert(containerBox !== null, `[${w}px] ${slug} ${type} grid container missing bounding box`);

          const cards = page.locator(cardSelector);
          const actualCount = await cards.count();
          assert(actualCount === expectedCount, `[${w}px] ${slug} ${type} count mismatch: expected ${expectedCount}, got ${actualCount}`);

          const boxes = [];
          for (let i = 0; i < actualCount; i++) {
            const b = await cards.nth(i).boundingBox();
            assert(b !== null, `[${w}px] ${slug} ${type} card ${i} missing bounding box`);
            if (b) boxes.push(b);

            // Check no text clipping inside card
            const overflowCheck = await cards.nth(i).evaluate(el => el.scrollHeight <= el.clientHeight + 2);
            assert(overflowCheck, `[${w}px] ${slug} ${type} card ${i} has text overflow (scrollHeight > clientHeight)`);
          }

          if (boxes.length === actualCount && containerBox) {
            // 1. Check no card intersections
            let intersected = false;
            for (let i = 0; i < boxes.length; i++) {
              for (let j = i + 1; j < boxes.length; j++) {
                const b1 = boxes[i];
                const b2 = boxes[j];
                const overlapX = Math.max(0, Math.min(b1.x + b1.width, b2.x + b2.width) - Math.max(b1.x, b2.x));
                const overlapY = Math.max(0, Math.min(b1.y + b1.height, b2.y + b2.height) - Math.max(b1.y, b2.y));
                if (overlapX > 2 && overlapY > 2) {
                  intersected = true;
                }
              }
            }
            assert(!intersected, `[${w}px] ${slug} ${type} cards overlap each other`);

            // 2. Row grouping & Equal Card Widths + Equal Top Positions per row
            const firstWidth = boxes[0].width;
            let equalWidths = true;
            for (const b of boxes) {
              if (Math.abs(b.width - firstWidth) > 3) {
                equalWidths = false;
                break;
              }
            }
            assert(equalWidths, `[${w}px] ${slug} ${type} cards have unequal widths`);

            // Group cards into rows by top coordinate (within 6px)
            const rows = [];
            for (const b of boxes) {
              let added = false;
              for (const r of rows) {
                if (Math.abs(r[0].y - b.y) < 6) {
                  r.push(b);
                  added = true;
                  break;
                }
              }
              if (!added) rows.push([b]);
            }

            // Verify equal top positions within each row
            let equalRowTops = true;
            for (const r of rows) {
              const topY = r[0].y;
              for (const card of r) {
                if (Math.abs(card.y - topY) > 4) {
                  equalRowTops = false;
                  break;
                }
              }
            }
            assert(equalRowTops, `[${w}px] ${slug} ${type} cards in same row have unequal top positions`);

            // 3. Final Row Centring Assertions
            const containerMid = containerBox.x + containerBox.width / 2;

            if (w === 1440 || w === 1280) {
              const rem = actualCount % 3;
              if (rem === 1) {
                const lastCard = boxes[boxes.length - 1];
                const cardMid = lastCard.x + lastCard.width / 2;
                assert(Math.abs(cardMid - containerMid) < 15, `[${w}px] ${slug} ${type} final 1 card not centred (diff=${Math.abs(cardMid - containerMid)}px)`);
              } else if (rem === 2) {
                const c1 = boxes[boxes.length - 2];
                const c2 = boxes[boxes.length - 1];
                const rowLeft = Math.min(c1.x, c2.x);
                const rowRight = Math.max(c1.x + c1.width, c2.x + c2.width);
                const rowMid = (rowLeft + rowRight) / 2;
                assert(Math.abs(rowMid - containerMid) < 15, `[${w}px] ${slug} ${type} final 2 cards not centred (diff=${Math.abs(rowMid - containerMid)}px)`);
              }
            } else if (w === 768) {
              if (actualCount % 2 === 1) {
                const lastCard = boxes[boxes.length - 1];
                const cardMid = lastCard.x + lastCard.width / 2;
                assert(Math.abs(cardMid - containerMid) < 15, `[768px] ${slug} ${type} tablet final single card not centred (diff=${Math.abs(cardMid - containerMid)}px)`);
              }
            } else if (w === 390) {
              // Mobile vertical column checks
              const firstX = boxes[0].x;
              let sameX = true;
              let sequentialY = true;
              for (let i = 0; i < boxes.length; i++) {
                if (Math.abs(boxes[i].x - firstX) > 3) sameX = false;
                if (i > 0) {
                  if (boxes[i].y < boxes[i - 1].y + boxes[i - 1].height - 2) sequentialY = false;
                }
              }
              assert(sameX, `[390px] ${slug} ${type} cards not aligned in single vertical X column`);
              assert(sequentialY, `[390px] ${slug} ${type} cards do not stack sequentially top-to-bottom`);

              // Verify no right-arrow icons inside process cards on mobile
              if (type === 'process') {
                const arrowCount = await page.locator('[data-process-card] svg.lucide-arrow-right').count();
                assert(arrowCount === 0, `[390px] ${slug} process cards contain right-arrow icons on mobile`);
              }
            }
          }

        }

        // Horizontal overflow check
        const scrollW = await page.evaluate(() => document.body.scrollWidth);
        assert(scrollW <= w + 2, `[${w}px] ${slug} page horizontal overflow (${scrollW}px > ${w}px)`);
      }

      await ctx.close();
    }

    // B. TEST TIMELINE CONNECTOR & STAGE NODES ON /services/
    // Desktop (1440px)
    const ctxDesk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageDesk = await ctxDesk.newPage();
    await pageDesk.goto(`${BASE_URL}/services/`, { waitUntil: 'networkidle' });

    const timelineDesk = pageDesk.locator('#service-process-timeline');
    assert(await timelineDesk.count() > 0, '[1440px] /services/ timeline wrapper missing');

    const lineDesk = pageDesk.locator('#timeline-connector-desktop');
    assert(await lineDesk.count() > 0, '[1440px] /services/ desktop connector line missing');
    const lineBoxDesk = await lineDesk.boundingBox();
    assert(lineBoxDesk !== null, '[1440px] /services/ desktop connector line missing bounding box');

    const nodesDesk = pageDesk.locator('[data-stage-node]');
    const nodeCountDesk = await nodesDesk.count();
    assert(nodeCountDesk === 4, `[1440px] /services/ timeline stage nodes count expected 4, got ${nodeCountDesk}`);

    const nodeBoxesDesk = [];
    for (let i = 0; i < nodeCountDesk; i++) {
      const b = await nodesDesk.nth(i).boundingBox();
      assert(b !== null, `[1440px] /services/ stage node ${i} missing bounding box`);
      if (b) nodeBoxesDesk.push(b);
    }

    if (nodeBoxesDesk.length === 4 && lineBoxDesk) {
      const firstYCenter = nodeBoxesDesk[0].y + nodeBoxesDesk[0].height / 2;
      let equalYCenters = true;
      for (const nb of nodeBoxesDesk) {
        const yc = nb.y + nb.height / 2;
        if (Math.abs(yc - firstYCenter) > 4) equalYCenters = false;
      }
      assert(equalYCenters, '[1440px] /services/ stage node Y centres do not match horizontally');

      const lineYCenter = lineBoxDesk.y + lineBoxDesk.height / 2;
      assert(Math.abs(lineYCenter - firstYCenter) < 4, `[1440px] /services/ desktop connector Y center (${lineYCenter}px) does not match node Y center (${firstYCenter}px)`);

      const node01CenterX = nodeBoxesDesk[0].x + nodeBoxesDesk[0].width / 2;
      const node04CenterX = nodeBoxesDesk[3].x + nodeBoxesDesk[3].width / 2;
      const lineStartX = lineBoxDesk.x;
      const lineEndX = lineBoxDesk.x + lineBoxDesk.width;

      assert(Math.abs(lineStartX - node01CenterX) < 5, `[1440px] connector start X (${lineStartX}px) does not match node 01 centre X (${node01CenterX}px)`);
      assert(Math.abs(lineEndX - node04CenterX) < 5, `[1440px] connector end X (${lineEndX}px) does not match node 04 centre X (${node04CenterX}px)`);
      console.log(`✓ [1440px] Timeline Connector Measurements: Line Y=${lineYCenter.toFixed(1)}px, Node Y=${firstYCenter.toFixed(1)}px, Start X=${lineStartX.toFixed(1)}px (Node01 X=${node01CenterX.toFixed(1)}px), End X=${lineEndX.toFixed(1)}px (Node04 X=${node04CenterX.toFixed(1)}px)`);
    }

    await ctxDesk.close();

    // Mobile (390px)
    const ctxMob = await browser.newContext({ viewport: { width: 390, height: 840 } });
    const pageMob = await ctxMob.newPage();
    await pageMob.goto(`${BASE_URL}/services/`, { waitUntil: 'networkidle' });

    const lineMob = pageMob.locator('#timeline-connector-mobile');
    assert(await lineMob.count() > 0, '[390px] /services/ mobile connector line missing');
    const lineBoxMob = await lineMob.boundingBox();
    assert(lineBoxMob !== null, '[390px] /services/ mobile connector line missing bounding box');

    const nodesMob = pageMob.locator('[data-stage-node]');
    const nodeCountMob = await nodesMob.count();
    assert(nodeCountMob === 4, `[390px] /services/ stage nodes count expected 4, got ${nodeCountMob}`);

    const nodeBoxesMob = [];
    for (let i = 0; i < nodeCountMob; i++) {
      const b = await nodesMob.nth(i).boundingBox();
      assert(b !== null, `[390px] /services/ stage node ${i} missing bounding box`);
      if (b) nodeBoxesMob.push(b);
    }

    if (nodeBoxesMob.length === 4 && lineBoxMob) {
      const firstXCenter = nodeBoxesMob[0].x + nodeBoxesMob[0].width / 2;
      let equalXCenters = true;
      let sequentialTop = true;

      for (let i = 0; i < nodeBoxesMob.length; i++) {
        const xc = nodeBoxesMob[i].x + nodeBoxesMob[i].width / 2;
        if (Math.abs(xc - firstXCenter) > 4) equalXCenters = false;
        if (i > 0 && nodeBoxesMob[i].y <= nodeBoxesMob[i - 1].y) sequentialTop = false;
      }

      assert(equalXCenters, '[390px] /services/ stage nodes do not share vertical X center');
      assert(sequentialTop, '[390px] /services/ stage nodes do not stack vertically top-to-bottom');

      const lineXCenter = lineBoxMob.x + lineBoxMob.width / 2;
      assert(Math.abs(lineXCenter - firstXCenter) < 4, `[390px] mobile connector X center (${lineXCenter}px) does not match node X center (${firstXCenter}px)`);
      console.log(`✓ [390px] Timeline Connector Measurements: Line X=${lineXCenter.toFixed(1)}px, Node X=${firstXCenter.toFixed(1)}px`);
    }

    await ctxMob.close();

    console.log(`\n----------------------------------------`);
    console.log(`✨ CARD & TIMELINE ALIGNMENT AUDIT COMPLETE: ${passedAssertions} assertions passed, ${failedAssertions} failed.`);

    if (failedAssertions > 0 || passedAssertions === 0) {
      throw new Error(`Card alignment QA failed: ${passedAssertions} passed, ${failedAssertions} failed.`);
    }

  } finally {
    await browser.close();
    server.close();
  }
}

runAlignmentQA().catch(err => {
  console.error('\n❌ QA:CARD_ALIGNMENT FAILED:', err.message);
  process.exit(1);
});
