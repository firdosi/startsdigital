import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

console.log('🚀 Running Performance Budget & Asset Integrity QA Audit...\n');

// 1. Verify dist folder exists
assert(fs.existsSync(distDir), `Production dist folder exists at ${distDir}`);

// 2. Scan dist/ for forbidden development or cache artifacts
function scanForbiddenFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullP = path.join(dir, file);
    const stat = fs.statSync(fullP);
    if (file === '.gemini' || file === '.audit-cache' || file.endsWith('.log') || file.endsWith('.map')) {
      errors.push(`Forbidden development artifact found in production dist: ${fullP}`);
    }
    if (stat.isDirectory()) {
      scanForbiddenFiles(fullP);
    }
  }
}
if (fs.existsSync(distDir)) {
  scanForbiddenFiles(distDir);
  assert(errors.length === 0, 'Zero development artifacts (.gemini, .audit-cache, .map, .log) in production dist');
}

// 3. Scan images in dist/ for 500KB budget limit
function checkImageBudgets(dir) {
  const files = fs.readdirSync(dir);
  let oversized = [];
  for (const file of files) {
    const fullP = path.join(dir, file);
    const stat = fs.statSync(fullP);
    if (stat.isFile() && /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(file)) {
      if (stat.size > 500 * 1024) {
        oversized.push({ file: path.relative(distDir, fullP), size: stat.size });
      }
    } else if (stat.isDirectory()) {
      checkImageBudgets(fullP);
    }
  }
  return oversized;
}
const oversizedImages = checkImageBudgets(distDir);
assert(oversizedImages.length === 0, `No production image asset exceeds 500 KB budget limit (found ${oversizedImages.length})`);

// 4. Verify self-hosted fonts use font-display
const cssDir = path.join(distDir, 'startsdigital/_astro');
const distAstroDir = fs.existsSync(cssDir) ? cssDir : path.join(distDir, '_astro');

if (fs.existsSync(distAstroDir)) {
  const cssFiles = fs.readdirSync(distAstroDir).filter(f => f.endsWith('.css'));
  assert(cssFiles.length > 0, `Compiled CSS asset bundle exists in dist (${cssFiles.join(', ')})`);

  let fontDisplayFound = false;
  for (const cssF of cssFiles) {
    const cssText = fs.readFileSync(path.join(distAstroDir, cssF), 'utf-8');
    if (cssText.includes('font-display:') || cssText.includes('font-display :')) {
      fontDisplayFound = true;
    }
  }
  assert(fontDisplayFound, 'Compiled CSS includes font-display declaration for self-hosted fonts');
}

console.log(`\n----------------------------------------`);
if (errors.length === 0) {
  console.log(`✨ ALL ${passCount} PERFORMANCE BUDGET QA AUDITS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 PERFORMANCE BUDGET QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
