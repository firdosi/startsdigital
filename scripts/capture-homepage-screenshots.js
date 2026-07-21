import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// Parse target folder argument
const folderName = process.argv[2];

if (!folderName) {
  console.error('ERROR: You must specify a version folder name argument (e.g., v5-targeted-polish-6b06122).');
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

function run(cmd) {
  console.log(`Executing: ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
}

try {
  const relTargetDir = `docs/agy/visual-homepage-prototype/screenshots/${folderName}`;

  // 1. Desktop 1440 Full Page
  run(`npx playwright screenshot --full-page --viewport-size=1440,900 http://localhost:4321/startsdigital/ ${relTargetDir}/desktop-1440-full.png`);

  // 2. Tablet 768 Full Page
  run(`npx playwright screenshot --full-page --viewport-size=768,1024 http://localhost:4321/startsdigital/ ${relTargetDir}/tablet-768-full.png`);

  // 3. Mobile 375 Full Page
  run(`npx playwright screenshot --full-page --viewport-size=375,812 http://localhost:4321/startsdigital/ ${relTargetDir}/mobile-375-full.png`);

  // 4. Focused Desktop Hero + Services
  run(`npx playwright screenshot --viewport-size=1440,1200 http://localhost:4321/startsdigital/ ${relTargetDir}/desktop-hero-services.png`);

  // 5. Focused Desktop Featured Work (Navigates directly to #work section)
  run(`npx playwright screenshot --viewport-size=1440,900 http://localhost:4321/startsdigital/#work ${relTargetDir}/desktop-featured-work.png`);

  // 6. Focused Mobile Hero + Work
  run(`npx playwright screenshot --viewport-size=375,812 http://localhost:4321/startsdigital/ ${relTargetDir}/mobile-hero-work.png`);

  // Create version README.md template
  const readmeContent = `# Screenshot Revision ${folderName}

- **Revision Folder**: ${folderName}
- **Branch**: visual-redesign-v2
- **Source Commit**: 6b0612258ca83ff9d23192bd8cebbff020eb42aa
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

- Reduced excessive vertical desktop whitespace beneath hero metrics.
- Enhanced platform tool readability (14-16px font, clear group headings).
- Configured eager loading only on Hero images and lazy loading on below-the-fold images.
- Deleted 16 unused prototype WebP files from \`public/prototype/\` (retained 5 referenced assets).
- Corrected desktop-featured-work.png capture to properly focus on the Featured Work section.

## Asset Status

Temporary concept assets used. Not approved for production merge.
`;

  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf-8');
  console.log(`Successfully captured screenshots into ${relTargetDir}`);
} catch (err) {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
}
