import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

const dir82 = path.join(rootDir, 'scratch/roadmap-8-2-visual-storytelling');
const dir81 = path.join(rootDir, 'scratch/roadmap-8-1-offline-prelaunch');
const dir73 = path.join(rootDir, 'scratch/roadmap-7-3-final-site-acceptance');
const screenshotDir = fs.existsSync(dir82) ? dir82 : (fs.existsSync(dir81) ? dir81 : dir73);

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

console.log(`🚀 Running Visual Capture & Audit Readiness QA Audit (${screenshotDir.includes('8-2') ? 'Roadmap 8.2' : (screenshotDir.includes('8-1') ? 'Roadmap 8.1' : 'Roadmap 7.3')})...\n`);

let currentSha = '';
try {
  currentSha = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
} catch (e) {
  currentSha = 'unknown';
}

const requiredScreenshots = screenshotDir.includes('8-2') ? [
  { name: 'homepage-visual-storytelling-1440.png', minSize: 10000 },
  { name: 'work-combined-achievements-1440.png', minSize: 10000 },
  { name: 'services-visual-directory-390.png', minSize: 10000 },
  { name: 'work-logo-wall-390.png', minSize: 10000 }
] : (screenshotDir.includes('8-1') ? [
  { name: 'homepage-offline-prelaunch-1440.png', minSize: 10000 },
  { name: 'work-media-readiness-1440.png', minSize: 10000 },
  { name: 'client-experience-offline-review-390.png', minSize: 10000 },
  { name: 'contact-offline-prelaunch-390.png', minSize: 10000 }
] : [
  { name: 'homepage-launch-ready-1440.png', minSize: 10000 },
  { name: 'services-launch-ready-390.png', minSize: 10000 },
  { name: 'contact-project-context-1440.png', minSize: 10000 },
  { name: 'contact-project-brief-390.png', minSize: 10000 }
]);

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

const auditFiles = screenshotDir.includes('8-2') ? [
  'public-storytelling-audit.json',
  'combined-achievements-audit.json',
  'logo-wall-audit.json',
  'visual-assets-audit.json',
  'animation-performance-audit.json',
  'domain-wording-audit.json',
  'retired-routes-audit.json',
  'screenshot-capture-audit.json'
] : (screenshotDir.includes('8-1') ? [
  'media-readiness-audit.json',
  'evidence-intake-audit.json',
  'project-claims-audit.json',
  'logo-quality-audit.json',
  'social-assets-audit.json',
  'content-final-review-audit.json',
  'offline-release-package-audit.json',
  'future-domain-checklist-audit.json',
  'screenshot-capture-audit.json'
] : [
  'route-inventory-audit.json',
  'content-consistency-audit.json',
  'navigation-footer-audit.json',
  'conversion-flow-audit.json',
  'accessibility-audit.json',
  'performance-budget-audit.json',
  'security-privacy-audit.json',
  'seo-final-audit.json',
  'live-deployment-audit.json',
  'screenshot-capture-audit.json',
  'release-freeze-audit.json'
]);

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

      if (data.passFailAssertions) {
        if (Array.isArray(data.passFailAssertions)) {
          for (const item of data.passFailAssertions) {
            assert(item.passed === true, `[${auditName}] Assertion "${item.name}" is true`);
          }
        } else {
          for (const [key, val] of Object.entries(data.passFailAssertions)) {
            assert(val === true, `[${auditName}] Assertion "${key}" is true`);
          }
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
