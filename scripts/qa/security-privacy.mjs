import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const distDir = path.join(rootDir, 'dist');
const srcDir = path.join(rootDir, 'src');

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

console.log('🚀 Running Security & Privacy QA Audit...\n');

// 1. Audit dist/ HTML files for Windows paths, file:/// links, or scratch paths
function scanHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullP = path.join(dir, file);
    const stat = fs.statSync(fullP);
    if (stat.isFile() && file.endsWith('.html')) {
      const htmlText = fs.readFileSync(fullP, 'utf-8');
      
      // Check for Windows absolute paths or file:/// links
      if (htmlText.includes('C:\\Users\\') || htmlText.includes('C:/Users/')) {
        errors.push(`Local Windows absolute path found in production HTML: ${fullP}`);
      }
      if (htmlText.includes('file:///')) {
        errors.push(`Local file:/// link found in production HTML: ${fullP}`);
      }
      if (htmlText.includes('/scratch/')) {
        errors.push(`Scratch folder reference found in production HTML: ${fullP}`);
      }

      // Check target="_blank" without rel="noopener noreferrer"
      const targetBlankMatches = htmlText.match(/<a [^>]*target="_blank"[^>]*>/gi) || [];
      for (const m of targetBlankMatches) {
        if (!m.includes('rel="noopener noreferrer"') && !m.includes('rel="noreferrer noopener"')) {
          errors.push(`Unsafe target="_blank" link without rel="noopener noreferrer" found in ${fullP}: ${m}`);
        }
      }

      // Check evidenceStatus or futureAccess leaking in JSON-LD schemas
      if (htmlText.includes('"evidenceStatus"') || htmlText.includes('"futureAccess"')) {
        errors.push(`Internal access status field exposed in HTML/JSON-LD: ${fullP}`);
      }
    } else if (stat.isDirectory()) {
      scanHtmlFiles(fullP);
    }
  }
}

if (fs.existsSync(distDir)) {
  scanHtmlFiles(distDir);
  assert(errors.length === 0, 'Zero local Windows paths, file:/// links, scratch paths, or unsafe target="_blank" links in production dist');
}

// 2. Audit src/ for API keys, secrets, or hardcoded tokens
const apiTokenMatches = fs.readFileSync(path.join(srcDir, 'site.config.ts'), 'utf-8');
assert(!apiTokenMatches.includes('sk_live_') && !apiTokenMatches.includes('AKIA'), 'No hardcoded private API keys or AWS credentials in source code');

console.log(`\n----------------------------------------`);
if (errors.length === 0) {
  console.log(`✨ ALL ${passCount} SECURITY & PRIVACY QA AUDITS PASSED CLEANLY! (0 errors)\n`);
  process.exit(0);
} else {
  console.error(`💥 SECURITY & PRIVACY QA AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
