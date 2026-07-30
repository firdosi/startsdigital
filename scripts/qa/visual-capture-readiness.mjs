import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const screenshotDir = path.join(rootDir, 'scratch/roadmap-7-2-work-directory-corrected');

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

console.log('🚀 Running Visual Capture Readiness QA Audit...\n');

// 1. Verify Screenshot Folder & Files Exist with > 0 bytes
const requiredScreenshots = [
  { name: 'work-twelve-clients-1440.png', minSize: 10000 },
  { name: 'work-filters-client-experience-390.png', minSize: 10000 },
  { name: 'clearzone-client-experience-1440.png', minSize: 10000 },
  { name: 'riyadh-client-experience-390.png', minSize: 10000 }
];

assert(fs.existsSync(screenshotDir), `Screenshot output folder exists at ${screenshotDir}`);

for (const shot of requiredScreenshots) {
  const fileP = path.join(screenshotDir, shot.name);
  const exists = fs.existsSync(fileP);
  assert(exists, `Screenshot file ${shot.name} exists`);
  if (exists) {
    const stats = fs.statSync(fileP);
    assert(stats.size >= shot.minSize, `Screenshot ${shot.name} size (${stats.size} bytes) exceeds minimum (${shot.minSize} bytes)`);
  }
}

// 2. Verify Screenshot Audit JSON Exists and status is pass
const auditJsonPath = path.join(screenshotDir, 'screenshot-capture-audit.json');
assert(fs.existsSync(auditJsonPath), `screenshot-capture-audit.json exists in scratch folder`);

if (fs.existsSync(auditJsonPath)) {
  try {
    const auditData = JSON.parse(fs.readFileSync(auditJsonPath, 'utf-8'));
    assert(auditData.status === 'pass', `Overall screenshot capture audit status is "pass"`);
    assert(auditData.totalFailedRequests === 0, `Zero failed asset requests across all screenshots`);
    assert(auditData.totalConsoleErrors === 0, `Zero console errors across all screenshots`);
    assert(auditData.totalMissingImages === 0, `Zero missing/broken logo images across all screenshots`);
    assert(auditData.screenshots && auditData.screenshots.length === 4, `Audit contains detailed records for all 4 screenshots`);
    
    for (const sc of auditData.screenshots || []) {
      assert(sc.loadedStylesheetCount > 0, `[${sc.screenshotFilename}] Stylesheets loaded (${sc.loadedStylesheetCount} > 0)`);
      const font = (sc.detectedBodyFontFamily || '').toLowerCase();
      const isDefaultSerif = !font.includes('sans-serif') && (font.includes('times') || font.includes('serif'));
      assert(!isDefaultSerif, `[${sc.screenshotFilename}] Custom sans-serif font loaded (${sc.detectedBodyFontFamily})`);
      assert(sc.status === 'pass', `[${sc.screenshotFilename}] Individual status is "pass"`);
    }
  } catch (e) {
    assert(false, `Failed to parse screenshot-capture-audit.json: ${e.message}`);
  }
}

// 3. Inspect dist/ CSS & font assets exist
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const astroDir = path.join(distDir, 'startsdigital/_astro');
  const distAstroDir = fs.existsSync(astroDir) ? astroDir : path.join(distDir, '_astro');
  if (fs.existsSync(distAstroDir)) {
    const files = fs.readdirSync(distAstroDir);
    const cssFiles = files.filter(f => f.endsWith('.css'));
    assert(cssFiles.length > 0, `Build dist contains compiled CSS asset (${cssFiles.join(', ')})`);
  }
}

console.log(`\n----------------------------------------`);
if (errors.length === 0) {
  console.log(`✨ ALL ${passCount} VISUAL CAPTURE QA AUDITS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 VISUAL CAPTURE QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
