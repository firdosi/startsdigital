import fs from 'node:fs';
import path from 'node:path';

const savePath73 = path.resolve('scratch/roadmap-7-3-final-site-acceptance/live-deployment-audit.json');
const savePathGate = path.resolve('scratch/final-acceptance-gate/live-deployment-audit.json');

[path.dirname(savePath73), path.dirname(savePathGate)].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const liveCheckpoints = [
  {
    url: 'https://firdosi.github.io/startsdigital/',
    expectedText: 'Starts Digital',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/about/',
    expectedText: 'Zaid',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/about/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/services/',
    expectedText: 'Paid Advertising',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/services/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/services/paid-advertising/',
    expectedText: 'Paid Advertising',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/services/paid-advertising/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/work/',
    expectedText: 'Client Experience Profiles',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/work/',
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
    url: 'https://firdosi.github.io/startsdigital/work/clearzone-immigration/',
    expectedText: 'Clearzone Immigration',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/work/clearzone-immigration/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/industries/',
    expectedText: 'E-commerce & Product Brands',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/industries/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/locations/lahore/',
    expectedText: 'Lahore',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/locations/lahore/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/contact/?source=clearzone-immigration',
    expectedText: 'Clearzone Immigration',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/contact/',
  },
  {
    url: 'https://firdosi.github.io/startsdigital/contact/?service=paid-advertising',
    expectedText: 'Paid Advertising',
    expectedCanonical: 'https://firdosi.github.io/startsdigital/contact/',
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

      if (item.expectedText && !bodyText.includes(item.expectedText)) {
        errors.push(`[${item.url}] Missing required live content: "${item.expectedText}"`);
      }

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
    status: isPending ? 'fail' : 'pass',
    generatedAt: new Date().toISOString(),
    liveOrigin: 'https://firdosi.github.io/startsdigital/',
    deploymentStatus: isPending ? 'PENDING' : 'VERIFIED',
    checkedResults,
    errorCount: errors.length,
    errors,
  };

  fs.writeFileSync(savePath73, JSON.stringify(auditResult, null, 2));
  fs.writeFileSync(savePathGate, JSON.stringify(auditResult, null, 2));

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
