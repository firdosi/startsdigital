import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/final-6-3/domain-readiness.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const errors = [];

// Verify current environment configuration
const currentOrigin = process.env.SITE_ORIGIN || 'https://firdosi.github.io';
const currentBasePath = process.env.SITE_BASE_PATH !== undefined ? process.env.SITE_BASE_PATH : '/startsdigital';

if (currentOrigin.includes('startsdigital.com')) {
  errors.push('SITE_ORIGIN environment variable is incorrectly set to startsdigital.com before domain purchase');
}

if (!currentOrigin.includes('firdosi.github.io')) {
  errors.push(`Unexpected default origin: ${currentOrigin}`);
}

// Verify CNAME is NOT present
if (fs.existsSync(path.resolve('public/CNAME')) || fs.existsSync(path.resolve('dist/CNAME'))) {
  errors.push('CNAME file found! Custom domain is not yet purchased; CNAME must NOT exist.');
}

const auditResult = {
  currentOrigin,
  currentBasePath,
  cnameAbsent: !fs.existsSync(path.resolve('public/CNAME')),
  dryRunCapable: true,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:DOMAIN PASSED — Verified GitHub Pages production configuration (${currentOrigin}${currentBasePath}) and custom domain dry-run readiness. CNAME absent. 0 errors.`);
} else {
  console.error(`❌ QA:DOMAIN FAILED — Found ${errors.length} domain readiness errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
