import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

const dir91 = path.join(rootDir, 'scratch/roadmap-9-1-premium-visual-storytelling');
const dir83 = path.join(rootDir, 'scratch/roadmap-8-3-final-visual-rebuild');
const is91 = fs.existsSync(dir91);
const screenshotDir = is91 ? dir91 : dir83;

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

console.log(`🚀 Running Visual Capture & Audit Readiness QA Audit (${is91 ? 'Roadmap 9.1' : 'Roadmap 8.3'})...\n`);

let currentSha = '';
try {
  currentSha = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
} catch (e) {
  currentSha = 'unknown';
}

const requiredScreenshots = is91 ? [
  { name: 'homepage-premium-rebuild-1440.png', minSize: 10000 },
  { name: 'homepage-premium-rebuild-390.png', minSize: 10000 },
  { name: 'services-ecosystem-and-menu-1440.png', minSize: 10000 },
  { name: 'work-editorial-storytelling-1440.png', minSize: 10000 },
  { name: 'industries-unique-visual-1440.png', minSize: 10000 },
  { name: 'about-contact-mobile-review-390.png', minSize: 10000 }
] : [
  { name: 'homepage-final-rebuild-1440.png', minSize: 10000 },
  { name: 'homepage-final-rebuild-390.png', minSize: 10000 },
  { name: 'services-menu-and-hero-1440.png', minSize: 10000 },
  { name: 'work-final-storytelling-1440.png', minSize: 10000 },
  { name: 'industries-unique-visual-1440.png', minSize: 10000 },
  { name: 'about-contact-visual-review-390.png', minSize: 10000 }
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

const auditFiles = is91 ? ['roadmap-9-1-audit.json'] : [
  'visual-rebuild-audit.json',
  'services-navigation-audit.json',
  'official-logo-audit.json',
  'page-uniqueness-audit.json',
  'achievements-integrity-audit.json',
  'visual-assets-performance-audit.json',
  'screenshot-capture-audit.json'
];

for (const auditName of auditFiles) {
  const auditPath = path.join(screenshotDir, auditName);
  const exists = fs.existsSync(auditPath);
  assert(exists, `Audit file ${auditName} exists in scratch folder`);

  if (exists) {
    try {
      const data = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));
      assert(data.status && data.status.toLowerCase() === 'pass', `[${auditName}] Status is "pass"`);
      assert(Array.isArray(data.errors) && data.errors.length === 0, `[${auditName}] Errors array is empty`);
      assert(data.sourceCommitSha && data.sourceCommitSha.length > 0, `[${auditName}] sourceCommitSha (${data.sourceCommitSha}) is present`);
      if (currentSha && currentSha !== 'unknown') {
        assert(data.sourceCommitSha === currentSha, `[${auditName}] sourceCommitSha matches current HEAD SHA (${currentSha})`);
      }

      if (data.assertions && Array.isArray(data.assertions)) {
        for (const item of data.assertions) {
          assert(item.passed === true, `[${auditName}] Assertion "${item.name}" is true`);
        }
      }
    } catch (e) {
      assert(false, `[${auditName}] Failed to parse JSON: ${e.message}`);
    }
  }
}

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
  console.log(`✨ ALL ${passCount} VISUAL CAPTURE & AUDIT QA CHECKS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 VISUAL CAPTURE QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
