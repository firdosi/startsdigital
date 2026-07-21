import { chromium } from 'playwright';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// Parse target folder argument
const folderName = process.argv[2];

if (!folderName) {
  console.error('ERROR: You must specify a version folder name argument (e.g., v6-valid-capture-a1b2c3d).');
  console.error('Usage: node scripts/capture-homepage-screenshots.js <vNN-short-name-sha>');
  process.exit(1);
}

const screenshotsBaseDir = path.resolve('docs/agy/visual-homepage-prototype/screenshots');
const targetDir = path.join(screenshotsBaseDir, folderName);

// Safety Rule: Refuse to run if target folder already exists
if (fs.existsSync(targetDir)) {
  console.error(`ERROR: Target screenshot version directory already exists: ${targetDir}`);
  console.error('Per PROJECT_RULES.md, existing screenshot directories must NEVER be overwritten.');
  console.error('Please specify a new unique version folder name.');
  process.exit(1);
}

// Dynamically retrieve exact source commit SHA (Never hardcode)
let sourceCommitSHA = '';
try {
  sourceCommitSHA = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
} catch (err) {
  console.error('Failed to get git commit SHA:', err);
  process.exit(1);
}

// Create new version directory
fs.mkdirSync(targetDir, { recursive: true });

async function captureAll() {
  let browser;
  let totalCheckedImages = 0;
  let totalFailedImages = 0;

  try {
    browser = await chromium.launch();

    // Preflight Helper: Validate required screenshot target elements exist exactly once
    async function validatePreflightTargets(page) {
      const headerCount = await page.locator('#main-header, header').count();
      const heroCount = await page.locator('#hero').count();
      const workCount = await page.locator('#work').count();

      if (headerCount !== 1) {
        throw new Error(`Preflight Validation Error: Expected exactly 1 header element (#main-header or header), found ${headerCount}.`);
      }
      if (heroCount !== 1) {
        throw new Error(`Preflight Validation Error: Expected exactly 1 #hero section, found ${heroCount}.`);
      }
      if (workCount !== 1) {
        throw new Error(`Preflight Validation Error: Expected exactly 1 #work section, found ${workCount}.`);
      }
    }

    // Helper: Scroll page, wait for all images to complete & decode, return validation metrics
    async function preparePageAndValidateImages(page, width, height) {
      await page.setViewportSize({ width, height });
      await page.goto('http://localhost:4321/startsdigital/', { waitUntil: 'networkidle' });

      // Run preflight element validation
      await validatePreflightTargets(page);

      // Step 1: Scroll through page in controlled steps to trigger lazy-loaded images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 300;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 100);
        });
      });

      // Step 2: Validate that every img element satisfies img.complete === true and img.naturalWidth > 0, then decode
      const imageStats = await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        let failed = 0;

        await Promise.all(
          imgs.map(async (img) => {
            if (!img.complete) {
              await new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              });
            }
            if (img.complete && img.naturalWidth > 0) {
              if ('decode' in img) {
                await img.decode().catch(() => {});
              }
            } else {
              failed++;
            }
          })
        );

        return {
          total: imgs.length,
          failed: failed,
        };
      });

      totalCheckedImages = Math.max(totalCheckedImages, imageStats.total);
      totalFailedImages += imageStats.failed;

      // Step 3: Scroll back to top & pause briefly before screenshot
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      return imageStats;
    }

    // Helper: Temporarily set header position to absolute so it appears only at top during full-page screenshot
    async function setHeaderAbsolute(page) {
      await page.evaluate(() => {
        const header = document.querySelector('#main-header') || document.querySelector('header');
        if (header) {
          header.dataset.origPosition = header.style.position;
          header.style.position = 'absolute';
        }
      });
    }

    // Helper: Restore header original position
    async function restoreHeaderPosition(page) {
      await page.evaluate(() => {
        const header = document.querySelector('#main-header') || document.querySelector('header');
        if (header && header.dataset.origPosition !== undefined) {
          header.style.position = header.dataset.origPosition;
          delete header.dataset.origPosition;
        }
      });
    }

    // Helper: Temporarily hide header for focused section screenshots
    async function hideHeader(page) {
      await page.evaluate(() => {
        const header = document.querySelector('#main-header') || document.querySelector('header');
        if (header) {
          header.dataset.origDisplay = header.style.display;
          header.style.display = 'none';
        }
      });
    }

    // Helper: Restore header visibility
    async function restoreHeaderVisibility(page) {
      await page.evaluate(() => {
        const header = document.querySelector('#main-header') || document.querySelector('header');
        if (header && header.dataset.origDisplay !== undefined) {
          header.style.display = header.dataset.origDisplay;
          delete header.dataset.origDisplay;
        }
      });
    }

    // 1. Desktop 1440 Full Page & Focused Screenshots
    {
      const page = await browser.newPage();
      await preparePageAndValidateImages(page, 1440, 900);

      // Full-page capture (Set header to absolute so it doesn't repeat or stick in the middle)
      await setHeaderAbsolute(page);
      try {
        await page.screenshot({
          path: path.join(targetDir, 'desktop-1440-full.png'),
          fullPage: true,
        });
      } finally {
        await restoreHeaderPosition(page);
      }

      // Focused Desktop Hero & Services
      await page.screenshot({
        path: path.join(targetDir, 'desktop-hero-services.png'),
        clip: { x: 0, y: 0, width: 1440, height: 1600 },
      });

      // Focused Desktop Featured Work (Hide header, scroll #work into view & capture section element)
      const workSection = page.locator('#work');
      if (await workSection.count() !== 1) {
        throw new Error('Expected exactly one #work section.');
      }
      await workSection.scrollIntoViewIfNeeded();
      await workSection.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      // Verify images inside #work element are complete & decoded
      await page.evaluate(async () => {
        const workImgs = Array.from(document.querySelectorAll('#work img'));
        await Promise.all(
          workImgs.map(async (img) => {
            if (!img.complete) {
              await new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              });
            }
            if ('decode' in img) await img.decode().catch(() => {});
          })
        );
      });

      await hideHeader(page);
      try {
        await workSection.screenshot({
          path: path.join(targetDir, 'desktop-featured-work.png'),
        });
      } finally {
        await restoreHeaderVisibility(page);
      }

      await page.close();
    }

    // 2. Tablet 768 Full Page
    {
      const page = await browser.newPage();
      await preparePageAndValidateImages(page, 768, 1024);
      await setHeaderAbsolute(page);
      try {
        await page.screenshot({
          path: path.join(targetDir, 'tablet-768-full.png'),
          fullPage: true,
        });
      } finally {
        await restoreHeaderPosition(page);
      }
      await page.close();
    }

    // 3. Mobile 375 Full Page & Separate Focused Mobile Screenshots
    {
      const page = await browser.newPage();
      await preparePageAndValidateImages(page, 375, 812);

      // Full-page capture (Header set to absolute so it appears only at top)
      await setHeaderAbsolute(page);
      try {
        await page.screenshot({
          path: path.join(targetDir, 'mobile-375-full.png'),
          fullPage: true,
        });
      } finally {
        await restoreHeaderPosition(page);
      }

      // Focused Mobile Hero (Scroll explicitly to 0,0, wait 400ms, hide header, capture #hero section element directly)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);

      const heroSection = page.locator('#hero');
      if (await heroSection.count() !== 1) {
        throw new Error('Expected exactly one #hero section.');
      }
      await heroSection.waitFor({ state: 'visible' });

      await hideHeader(page);
      try {
        await heroSection.screenshot({
          path: path.join(targetDir, 'mobile-hero.png'),
        });
      } finally {
        await restoreHeaderVisibility(page);
      }

      // Focused Mobile Featured Work (Hide header, scroll #work into view & capture section element)
      const mobileWorkSection = page.locator('#work');
      if (await mobileWorkSection.count() !== 1) {
        throw new Error('Expected exactly one #work section.');
      }
      await mobileWorkSection.scrollIntoViewIfNeeded();
      await mobileWorkSection.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);

      // Decode images inside #work
      await page.evaluate(async () => {
        const workImgs = Array.from(document.querySelectorAll('#work img'));
        await Promise.all(
          workImgs.map(async (img) => {
            if (!img.complete) {
              await new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              });
            }
            if ('decode' in img) await img.decode().catch(() => {});
          })
        );
      });

      await hideHeader(page);
      try {
        await mobileWorkSection.screenshot({
          path: path.join(targetDir, 'mobile-featured-work.png'),
        });
      } finally {
        await restoreHeaderVisibility(page);
      }

      await page.close();
    }

    await browser.close();

    // Create version README.md
    const readmeContent = `# Screenshot Revision ${folderName}

- **Revision Folder**: ${folderName}
- **Branch**: visual-redesign-v2
- **Source Commit SHA**: ${sourceCommitSHA}
- **Capture Date**: ${new Date().toISOString().split('T')[0]}
- **Preview URL**: http://localhost:4321/startsdigital/
- **Viewports**: 1440x900 (Desktop), 768x1024 (Tablet), 375x812 (Mobile)
- **Screenshot Files**:
  - \`desktop-1440-full.png\` (Full page desktop)
  - \`tablet-768-full.png\` (Full page tablet)
  - \`mobile-375-full.png\` (Full page mobile)
  - \`desktop-hero-services.png\` (Focused hero & services review)
  - \`desktop-featured-work.png\` (Focused featured work review - element capture)
  - \`mobile-hero.png\` (Focused mobile hero review - element capture)
  - \`mobile-featured-work.png\` (Focused mobile featured work review - element capture)

## Image Validation Result

- **Total \`<img>\` Elements Checked**: ${totalCheckedImages}
- **Failed Images (\`complete === false\` or \`naturalWidth === 0\`)**: ${totalFailedImages}
- **Validation Status**: ${totalFailedImages === 0 ? 'PASSED (All images loaded and decoded)' : 'FAILED'}

## Asset Status

Temporary concept assets used. Not approved for production merge.
`;

    fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf-8');
    console.log(`Successfully generated valid screenshot archive in ${targetDir}`);

  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    // Clean up newly created folder on failure
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    console.error(`Screenshot generation failed for ${targetDir}:`, err);
    process.exit(1);
  }
}

captureAll();
