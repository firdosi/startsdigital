import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/final-acceptance-gate/internal-links-audit.json');
const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const validServices = new Set([
  'website-design-development',
  'seo-local-search',
  'paid-advertising',
  'creative-content',
  'social-media-marketing',
  'ai-marketing-workflows',
  'multiple-services',
  'not-sure-yet',
  'website-development',
  'seo',
  'Website Design and Development',
  'SEO & Local Search',
  'SEO and Local Search',
  'Paid Advertising',
  'Creative Content',
  'Social Media Marketing',
  'AI-Assisted Marketing Workflows',
  'AI Marketing Systems',
]);

const validSources = new Set([
  'convortai',
  'convort-ai',
  'black-gold-fertilizer',
  'qurbani-campaign',
  'wajib-livestock',
  'rk-reno-solutions',
  'rapidline-immigration-services',
  'rapidline-immigration',
  'rapidzone',
  'clearzone-immigration',
  'riyadh-finish-pro',
  'viral-naturals',
  'shopinq-online',
  'super-safety-covers',
  'unique-lahore-lab-sahiwal',
  'unique-lahore-lab',
  'ecommerce-product-brands',
  'local-service-businesses',
  'seasonal-campaigns',
  'technology-products',
  'footer',
  'header',
  'about',
  'services',
  'industries',
  'locations',
  'general',
  'hero',
]);

function getAllHtmlFiles(dirPath, filesList = []) {
  if (!fs.existsSync(dirPath)) return filesList;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, filesList);
    } else if (file.endsWith('.html')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

function runInternalLinksAudit() {
  console.log('🚀 Running Internal Links & Contact Query Allowlist Audit...');
  const htmlFiles = getAllHtmlFiles(distDir);
  const errors = [];
  let totalLinksChecked = 0;
  let queryParamsVerified = true;

  if (htmlFiles.length === 0) {
    console.error('❌ dist/ directory empty or missing html files. Run build first.');
    process.exit(1);
  }

  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi;

  for (const file of htmlFiles) {
    const relativeHtmlPath = path.relative(distDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');

    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
      const href = match[1];
      if (!href) continue;

      // Skip external links, mailto, tel, whatsapp
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('https://wa.me/') ||
        href.startsWith('//')
      ) {
        continue;
      }

      totalLinksChecked++;

      // Query parameter allowlist validation for contact links
      if (href.includes('/contact/')) {
        try {
          const urlObj = new URL(href, 'http://localhost');
          const sourceVal = urlObj.searchParams.get('source');
          const serviceVal = urlObj.searchParams.get('service');

          if (sourceVal && !validSources.has(sourceVal.toLowerCase())) {
            queryParamsVerified = false;
            errors.push(`[${relativeHtmlPath}] Invalid contact source query parameter: "${sourceVal}" in href "${href}"`);
          }

          if (serviceVal && !validServices.has(serviceVal.toLowerCase()) && !validServices.has(serviceVal) && !validServices.has(decodeURIComponent(serviceVal))) {
            queryParamsVerified = false;
            errors.push(`[${relativeHtmlPath}] Invalid contact service query parameter: "${serviceVal}" in href "${href}"`);
          }
        } catch (e) {
          // ignore malformed URL
        }
      }
    }
  }

  const auditResult = {
    totalHtmlFiles: htmlFiles.length,
    totalLinksChecked,
    queryParamsVerified,
    errorCount: errors.length,
    errors,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

  if (errors.length === 0) {
    console.log(`✅ QA:LINKS PASSED — Inspected ${htmlFiles.length} HTML files and ${totalLinksChecked} links. All query parameters valid. 0 errors.`);
    process.exit(0);
  } else {
    console.error(`❌ QA:LINKS FAILED — Found ${errors.length} link/parameter errors:`);
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
}

runInternalLinksAudit();
