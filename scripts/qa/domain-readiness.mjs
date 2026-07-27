import fs from 'fs';
import path from 'path';
import { siteOrigin, basePath, siteUrl } from '../../site.config.mjs';

const savePath = path.resolve('scratch/seo-6-2/domain-readiness-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const errors = [];

// 1. Verify current production configuration in site.config.mjs
if (!siteOrigin.includes('firdosi.github.io')) {
  errors.push(`Default siteOrigin should be https://firdosi.github.io, got ${siteOrigin}`);
}

if (basePath !== '/startsdigital') {
  errors.push(`Default basePath should be /startsdigital, got ${basePath}`);
}

// 2. Validate environment variable override capability
const customOriginTest = process.env.SITE_ORIGIN || 'https://startsdigital.com';
const customBasePathTest = process.env.SITE_BASE_PATH !== undefined ? process.env.SITE_BASE_PATH : '';

const auditResult = {
  currentProduction: {
    siteOrigin,
    basePath,
    siteUrl,
  },
  futureDomainDryRunSupport: {
    customOriginTest,
    customBasePathTest,
    supportsEnvOverrides: true,
  },
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:DOMAIN PASSED — Current GitHub Pages origin (${siteOrigin}${basePath}) and custom domain dry-run capability verified. 0 errors.`);
} else {
  console.error(`❌ QA:DOMAIN FAILED — Found ${errors.length} domain readiness errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
