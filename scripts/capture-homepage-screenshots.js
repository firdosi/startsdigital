import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

// Parse target folder argument
const folderName = process.argv[2];

if (!folderName) {
  console.error('ERROR: You must specify a version folder name argument (e.g., v5-targeted-polish-a1b2c3d).');
  console.error('Usage: node scripts/capture-homepage-screenshots.js <vNN-short-name-sha>');
  process.exit(1);
}

const screenshotsBaseDir = path.resolve('docs/agy/visual-homepage-prototype/screenshots');
const targetDir = path.join(screenshotsBaseDir, folderName);

// Safety Rule: Refuse to run if directory already exists
if (fs.existsSync(targetDir)) {
  console.error(`ERROR: Target screenshot version directory already exists: ${targetDir}`);
  console.error('Per PROJECT_RULES.md, existing screenshot directories must NEVER be overwritten.');
  console.error('Please specify a new unique version folder name.');
  process.exit(1);
}

// Create new version folder
fs.mkdirSync(targetDir, { recursive: true });

async function capture() {
  const browser = await chromium.launch();
  
  // Helper to ensure full page load, scroll & image decode
  async function preparePage(page, width, height) {
    await page.setViewportSize({ width, height });
    await page.goto('http://localhost:4321/startsdigital/', { waitUntil: 'networkidle' });
    
    // Scroll down to trigger any lazy effects / decode all images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
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

    // Wait for all img elements to decode
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return img.decode().catch(() => {});
          return new Promise((res) => {
            img.onload = () => img.decode().then(res).catch(res);
            img.onerror = res;
          });
        })
      );
    });

    await page.waitForTimeout(500);
  }

  // 1. Desktop 1440 Full Page & Focused Reviews
  {
    const page = await browser.newPage();
    await preparePage(page, 1440, 900);
    const desktopPath = path.join(targetDir, 'desktop-1440-full.png');
    if (fs.existsSync(desktopPath)) throw new Error(`File ${desktopPath} already exists!`);
    await page.screenshot({ path: desktopPath, fullPage: true });

    // Focused Desktop Hero + Services
    await page.screenshot({
      path: path.join(targetDir, 'desktop-hero-services.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1600 },
    });

    // Focused Desktop Featured Work (Locate element id="work", scrollIntoView, wait, capture)
    const featuredWorkElement = await page.$('#work');
    if (featuredWorkElement) {
      await featuredWorkElement.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await featuredWorkElement.screenshot({
        path: path.join(targetDir, 'desktop-featured-work.png'),
      });
    }

    await page.close();
  }

  // 2. Tablet 768 Full Page
  {
    const page = await browser.newPage();
    await preparePage(page, 768, 1024);
    const tabletPath = path.join(targetDir, 'tablet-768-full.png');
    if (fs.existsSync(tabletPath)) throw new Error(`File ${tabletPath} already exists!`);
    await page.screenshot({ path: tabletPath, fullPage: true });
    await page.close();
  }

  // 3. Mobile 375 Full Page & Focused Review
  {
    const page = await browser.newPage();
    await preparePage(page, 375, 812);
    const mobilePath = path.join(targetDir, 'mobile-375-full.png');
    if (fs.existsSync(mobilePath)) throw new Error(`File ${mobilePath} already exists!`);
    await page.screenshot({ path: mobilePath, fullPage: true });

    // Focused Mobile Hero + Work
    await page.screenshot({
      path: path.join(targetDir, 'mobile-hero-work.png'),
      clip: { x: 0, y: 0, width: 375, height: 1800 },
    });

    await page.close();
  }

  await browser.close();

  // Create version README.md template
  const readmeContent = `# Screenshot Revision ${folderName}

- **Revision Folder**: ${folderName}
- **Branch**: visual-redesign-v2
- **Capture Date**: ${new Date().toISOString().split('T')[0]}
- **Viewports**: 1440x900 (Desktop), 768x1024 (Tablet), 375x812 (Mobile)
- **Screenshot Files**:
  - \`desktop-1440-full.png\`
  - \`tablet-768-full.png\`
  - \`mobile-375-full.png\`
  - \`desktop-hero-services.png\`
  - \`desktop-featured-work.png\`
  - \`mobile-hero-work.png\`

## Main Design Changes

- Captured v5 targeted polish revision for ${folderName}.

## Asset Status

Temporary concept assets used. Not approved for production merge.
`;

  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf-8');
  console.log(`Successfully captured screenshots into ${targetDir}`);
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
