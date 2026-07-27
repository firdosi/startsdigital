import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/final-acceptance-gate/domain-build-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const errors = [];
let buildAVerified = false;
let buildBVerified = false;

const buildADir = path.resolve('dist-build-a');
const buildBDir = path.resolve('dist-build-b');

try {
  console.log('🚀 Running Domain Build Readiness Audit (Build A: GitHub Pages, Build B: Custom Domain)...');

  // Build A: GitHub Pages mode
  execSync('npx astro build --outDir dist-build-a', {
    env: { ...process.env, SITE_ORIGIN: 'https://firdosi.github.io', SITE_BASE_PATH: '/startsdigital' },
    stdio: 'ignore',
  });

  if (fs.existsSync(buildADir)) {
    const htmlA = fs.readFileSync(path.join(buildADir, 'index.html'), 'utf-8');
    if (htmlA.includes('href="/startsdigital/favicon.svg"') && htmlA.includes('https://firdosi.github.io/startsdigital/')) {
      buildAVerified = true;
    } else {
      errors.push('Build A canonical or asset base path incorrect');
    }
  } else {
    errors.push('Build A dist folder not created');
  }

  // Build B: Custom Domain dry run
  execSync('npx astro build --outDir dist-build-b', {
    env: { ...process.env, SITE_ORIGIN: 'https://startsdigital.com', SITE_BASE_PATH: '' },
    stdio: 'ignore',
  });

  if (fs.existsSync(buildBDir)) {
    const htmlB = fs.readFileSync(path.join(buildBDir, 'index.html'), 'utf-8');
    if (htmlB.includes('href="/favicon.svg"') && htmlB.includes('https://startsdigital.com/') && !htmlB.includes('/startsdigital/')) {
      buildBVerified = true;
    } else {
      errors.push('Build B contains unexpected /startsdigital base path or invalid canonicals');
    }
  } else {
    errors.push('Build B dist folder not created');
  }
} catch (e) {
  errors.push(`Domain build execution error: ${e.message}`);
} finally {
  // Always clean up temporary build artifacts
  if (fs.existsSync(buildADir)) fs.rmSync(buildADir, { recursive: true, force: true });
  if (fs.existsSync(buildBDir)) fs.rmSync(buildBDir, { recursive: true, force: true });
}

const cnameExists = fs.existsSync(path.resolve('public/CNAME'));
if (cnameExists) {
  errors.push('Unapproved CNAME file detected in public/ directory');
}

const auditResult = {
  buildAVerified,
  buildBVerified,
  cnameExists,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0 && buildAVerified && buildBVerified) {
  console.log('✅ QA:DOMAIN PASSED — Verified dual build capability for GitHub Pages and Custom Domain dry run. CNAME absent. 0 errors.');
} else {
  console.error(`❌ QA:DOMAIN FAILED — Found ${errors.length} domain readiness errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
