import fs from 'fs';
import path from 'path';

const savePath = path.resolve('scratch/final-acceptance-gate/live-deployment-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const liveCheckpoints = [
  {
    url: 'https://firdosi.github.io/startsdigital/industries/',
    expectedText: 'E-commerce & Product Brands',
    expectedFaqText: 'Industry Engagement Questions',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/industries/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/locations/lahore/',
    expectedText: 'Lahore',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/locations/lahore/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/contact/?source=convortai',
    expectedText: 'ConvortAI',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/contact/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/work/black-gold-fertilizer/',
    expectedText: 'Black Gold Fertilizer',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/work/black-gold-fertilizer/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/work/convortai/',
    expectedText: 'ConvortAI',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/work/convortai/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/robots.txt',
    expectedText: 'Sitemap:',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/sitemap-index.xml',
    expectedText: 'sitemap',
  },
];

async function checkLiveDeployment() {
  console.log('🚀 Checking Live GitHub Pages Content & Deployment Verification...');
  const errors = [];
  const checkedResults = [];

  for (const item of liveCheckpoints) {
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        errors.push(`Live URL ${item.url} returned HTTP status ${res.status}`);
        checkedResults.push({ url: item.url, status: res.status, ok: false });
        continue;
      }

      const bodyText = await res.text();

      // Check unique text requirement
      if (item.expectedText && !bodyText.includes(item.expectedText)) {
        errors.push(`[${item.url}] Missing required live content: "${item.expectedText}"`);
      }
      if (item.expectedFaqText && !bodyText.includes(item.expectedFaqText)) {
        errors.push(`[${item.url}] Missing required live FAQ content: "${item.expectedFaqText}"`);
      }

      // Check canonical tag requirement for HTML pages
      if (item.expectedCanonical) {
        const canonicalMatch = bodyText.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/);
        if (!canonicalMatch || canonicalMatch[1] !== item.expectedCanonical) {
          errors.push(`[${item.url}] Live canonical mismatch: expected "${item.expectedCanonical}", got "${canonicalMatch ? canonicalMatch[1] : 'missing'}"`);
        }
      }

      checkedResults.push({ url: item.url, status: res.status, ok: true });
    } catch (err) {
      errors.push(`Failed to fetch live URL ${item.url}: ${err.message}`);
      checkedResults.push({ url: item.url, status: 0, ok: false, error: err.message });
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
    console.log(`✅ LIVE DEPLOYMENT VERIFIED — All ${liveCheckpoints.length} live endpoints verified for HTTP 200, unique content, and valid canonicals.`);
  } else {
    console.error(`❌ LIVE DEPLOYMENT PENDING — ${errors.length} deployment verification errors:`);
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
}

checkLiveDeployment().catch((err) => {
  console.error('❌ Live deployment verification error:', err);
  process.exit(1);
});
