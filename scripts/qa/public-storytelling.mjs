import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');

const FORBIDDEN_PUBLIC_TERMS = [
  'Evidence Pending',
  'User-Provided',
  'User-Provided Evidence Pending',
  'Evidence Status',
  'Evidence Available',
  'Verified Evidence',
  'Project Status',
  'Initial Setup Phase',
  'No Results Yet',
  'Reported Result',
  'Reported Campaign Performance',
  'Verified Outcome',
  'Verified Contribution',
  'Pending Signoff',
  'Public-use permission',
  'futureAccess',
  'evidenceStatus'
];

const RETIRED_ROUTES = [
  '/work/black-gold-fertilizer/',
  '/work/qurbani-campaign/',
  '/work/rk-reno-solutions/',
  '/work/convortai/',
  '/work/rapidline-immigration-services/',
  '/work/rapidzone/',
  '/work/clearzone-immigration/',
  '/work/riyadh-finish-pro/',
  '/work/viral-naturals/',
  '/work/shopinq-online/',
  '/work/super-safety-covers/',
  '/work/unique-lahore-lab-sahiwal/'
];

export async function runPublicStorytellingQa() {
  const results = {
    status: 'PASS',
    timestamp: new Date().toISOString(),
    assertions: []
  };

  const addAssertion = (name, passed, message) => {
    results.assertions.push({ name, passed, message });
    if (!passed) results.status = 'FAIL';
  };

  // 1. Build directory inspection
  if (!fs.existsSync(distDir)) {
    console.warn('dist/ directory does not exist. Run build first for dist checks.');
  } else {
    // Check no retired project route folders or HTML exist in dist
    let retiredFound = false;
    for (const route of RETIRED_ROUTES) {
      const relPath = route.slice(1); // remove leading /
      const htmlPath = path.join(distDir, relPath, 'index.html');
      const fullPath = path.join(distDir, relPath);
      if (fs.existsSync(htmlPath) || fs.existsSync(fullPath)) {
        retiredFound = true;
        console.error(`Retired route still exists in dist: ${route}`);
      }
    }
    addAssertion('No Retired Project Routes Generated', !retiredFound, retiredFound ? 'Retired project routes generated in dist' : 'Zero retired project routes in dist');

    // Check sitemap.xml for retired routes
    const sitemapPath = path.join(distDir, 'sitemap-0.xml');
    const sitemapAlt = path.join(distDir, 'sitemap.xml');
    const actualSitemap = fs.existsSync(sitemapPath) ? sitemapPath : (fs.existsSync(sitemapAlt) ? sitemapAlt : null);
    if (actualSitemap) {
      const sitemapContent = fs.readFileSync(actualSitemap, 'utf-8');
      let inSitemap = false;
      for (const route of RETIRED_ROUTES) {
        if (sitemapContent.includes(route)) {
          inSitemap = true;
          console.error(`Retired route found in sitemap: ${route}`);
        }
      }
      addAssertion('No Retired Routes in Sitemap', !inSitemap, inSitemap ? 'Sitemap contains retired project routes' : 'Sitemap is clean of retired project routes');
    }

    // Inspect all public HTML files in dist for forbidden evidence terms
    const getHtmlFiles = (dir) => {
      let files = [];
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
          files = files.concat(getHtmlFiles(full));
        } else if (item.name.endsWith('.html')) {
          files.push(full);
        }
      }
      return files;
    };

    const htmlFiles = getHtmlFiles(distDir);
    let termViolations = 0;
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const term of FORBIDDEN_PUBLIC_TERMS) {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          termViolations++;
          console.error(`Forbidden term "${term}" found in ${path.relative(distDir, file)}`);
        }
      }
    }
    addAssertion('Zero Forbidden Public Evidence Terms', termViolations === 0, `${termViolations} forbidden evidence term occurrences found in public HTML`);
  }

  // 2. Component Inspection (Source Code Checks)
  const workIndexPath = path.join(rootDir, 'src/pages/work/index.astro');
  const brandLogoWallPath = path.join(rootDir, 'src/components/work/BrandLogoWall.astro');
  
  if (fs.existsSync(workIndexPath)) {
    const content = fs.readFileSync(workIndexPath, 'utf-8');
    addAssertion('Work Page Has Combined Achievements', content.includes('CombinedAchievements'), 'Combined achievements component integrated on /work/');
    addAssertion('Work Page Has Brand Logo Wall', content.includes('BrandLogoWall'), 'Brand logo wall component integrated on /work/');
    addAssertion('No Client Filters On Work Page', !content.includes('filter') && !content.includes('Client Industry Filter'), 'Filtering interface completely removed');
  }

  if (fs.existsSync(brandLogoWallPath)) {
    const content = fs.readFileSync(brandLogoWallPath, 'utf-8');
    addAssertion('Logo Wall Has No Anchor Links', !content.includes('<a') && !content.includes('href='), 'No <a> tags or links inside BrandLogoWall');
    addAssertion('Logo Wall Has No Pointer Cursor', !content.includes('cursor-pointer'), 'No pointer cursor class inside BrandLogoWall');
  }

  console.log(`Public Storytelling QA: ${results.status}`);
  results.assertions.forEach(a => console.log(`  [${a.passed ? 'PASS' : 'FAIL'}] ${a.name}: ${a.message}`));

  if (results.status !== 'PASS') {
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runPublicStorytellingQa();
}
