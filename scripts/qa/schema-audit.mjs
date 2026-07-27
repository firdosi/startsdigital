import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const savePath = path.resolve('scratch/final-closure-correction/schema-audit.json');

const dir = path.dirname(savePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ folder missing. Please run `npm run build` first.');
  process.exit(1);
}

function getAllHtmlFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(distDir);
const errors = [];
let totalSchemasValidated = 0;

const FORBIDDEN_TYPES = new Set([
  'Review',
  'AggregateRating',
  'Offer',
  'Product',
  'PostalAddress',
  'LocalBusiness',
  'ProfessionalService',
]);

const APPROVED_WORK_PUBLIC_NAMES = new Set([
  'Black Gold Fertilizer',
  'Wajib Livestock Qurbani Campaign',
  'RK Reno Solutions',
  'ConvortAI',
]);

function inspectSchemaObject(obj, relPath) {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach((item) => inspectSchemaObject(item, relPath));
    return;
  }

  if (obj['@type']) {
    const typeStr = obj['@type'];
    if (FORBIDDEN_TYPES.has(typeStr)) {
      errors.push(`[${relPath}] Forbidden schema @type found: "${typeStr}"`);
    }

    if (typeStr === 'ItemList' && obj.name === 'Selected Client Experience & Case Studies' && Array.isArray(obj.itemListElement)) {
      for (const item of obj.itemListElement) {
        const itemName = item.name || (item.item && item.item.name);
        if (itemName && !APPROVED_WORK_PUBLIC_NAMES.has(itemName)) {
          errors.push(`[${relPath}] Work ItemList contains unapproved public name: "${itemName}"`);
        }
      }
    }
  }

  for (const key of Object.keys(obj)) {
    inspectSchemaObject(obj[key], relPath);
  }
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const scriptMatches = content.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of scriptMatches) {
    totalSchemasValidated++;
    const jsonText = match[1].trim();
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed['@context'] && !jsonText.includes('@context')) {
        errors.push(`[${relPath}] JSON-LD schema missing @context`);
      }
      if (jsonText.includes('startsdigital.com')) {
        errors.push(`[${relPath}] Forbidden startsdigital.com reference in JSON-LD schema`);
      }
      inspectSchemaObject(parsed, relPath);
    } catch (err) {
      errors.push(`[${relPath}] Invalid JSON-LD syntax: ${err.message}`);
    }
  }
}

const auditResult = {
  totalFiles: htmlFiles.length,
  totalSchemasValidated,
  errorCount: errors.length,
  errors,
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(savePath, JSON.stringify(auditResult, null, 2));

if (errors.length === 0) {
  console.log(`✅ QA:SCHEMA PASSED — ${totalSchemasValidated} JSON-LD schemas validated across ${htmlFiles.length} HTML files. Exact public names & zero forbidden schemas verified. 0 errors.`);
} else {
  console.error(`❌ QA:SCHEMA FAILED — Found ${errors.length} schema errors:`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
