import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const screenshotDir = path.join(rootDir, 'scratch/roadmap-7-2-final-acceptance');

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

let currentSha = '';
try {
  currentSha = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
} catch (e) {
  currentSha = 'unknown';
}

// 1. Verify Screenshot Folder & Files Exist with > 10KB size
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

// 2. Verify all 5 Audit JSON Files Exist, Status is 'pass', Errors array is empty, and SHA matches
const auditFiles = [
  'work-directory-audit.json',
  'client-access-audit.json',
  'client-media-source-audit.json',
  'client-profile-routes-audit.json',
  'screenshot-capture-audit.json'
];

for (const auditName of auditFiles) {
  const auditPath = path.join(screenshotDir, auditName);
  const exists = fs.existsSync(auditPath);
  assert(exists, `Audit file ${auditName} exists in scratch folder`);

  if (exists) {
    try {
      const data = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));
      assert(data.status === 'pass', `[${auditName}] Status is "pass"`);
      assert(Array.isArray(data.errors) && data.errors.length === 0, `[${auditName}] Errors array is empty`);
      assert(data.sourceCommitSha === currentSha, `[${auditName}] sourceCommitSha (${data.sourceCommitSha}) matches HEAD commit SHA (${currentSha})`);

      if (data.passFailAssertions) {
        for (const [key, val] of Object.entries(data.passFailAssertions)) {
          assert(val === true, `[${auditName}] Assertion "${key}" is true`);
        }
      }
    } catch (e) {
      assert(false, `[${auditName}] Failed to parse JSON: ${e.message}`);
    }
  }
}

// 3. Inspect dist/ compiled assets exist
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
