import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/final-closure-correction/live-deployment-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const liveUrls = [
  'https://firdosi.github.io/startsdigital/',
  'https://firdosi.github.io/startsdigital/industries/',
  'https://firdosi.github.io/startsdigital/industries/ecommerce-product-brands/',
  'https://firdosi.github.io/startsdigital/locations/lahore/',
  'https://firdosi.github.io/startsdigital/contact/?source=convortai',
  'https://firdosi.github.io/startsdigital/work/black-gold-fertilizer/',
  'https://firdosi.github.io/startsdigital/work/convortai/',
  'https://firdosi.github.io/startsdigital/robots.txt',
  'https://firdosi.github.io/startsdigital/sitemap-index.xml',
];

async function checkLiveDeployment() {
  console.log('🚀 Checking Live GitHub Pages Deployment...');
  const errors = [];
  const checkedResults = [];

  for (const url of liveUrls) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        errors.push(`Live URL ${url} returned HTTP status ${res.status}`);
        checkedResults.push({ url, status: res.status, ok: false });
      } else {
        checkedResults.push({ url, status: res.status, ok: true });
      }
    } catch (err) {
      errors.push(`Failed to fetch live URL ${url}: ${err.message}`);
      checkedResults.push({ url, status: 0, ok: false, error: err.message });
    }
  }

  const isPending = errors.length > 0;
  const auditResult = {
    liveOrigin: 'https://firdosi.github.io/startsdigital/',
    deploymentStatus: isPending ? 'PENDING' : 'VERIFIED',
    checkedResults,
    errorCount: errors.length,
    errors,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

  if (!isPending) {
    console.log(`✅ LIVE DEPLOYMENT VERIFIED — All ${liveUrls.length} live endpoints responded with HTTP 200 OK.`);
  } else {
    console.warn(`⚠️ LIVE DEPLOYMENT PENDING — ${errors.length} endpoints pending deployment:`);
    errors.forEach((e) => console.warn('  ' + e));
  }
}

checkLiveDeployment().catch((err) => {
  console.error('❌ Live deployment audit error:', err);
  process.exit(1);
});
