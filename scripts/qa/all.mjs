import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const dir81 = path.join(rootDir, 'scratch/roadmap-8-1-offline-prelaunch');

const commands = [
  'node scripts/qa/content-architecture.mjs',
  'node scripts/qa/work-directory.mjs',
  'node scripts/qa/accessibility.mjs',
  'node scripts/qa/performance-budget.mjs',
  'node scripts/qa/security-privacy.mjs',
  'node scripts/capture-roadmap-9-1.mjs',
  'node scripts/qa/visual-capture-readiness.mjs',
  'node scripts/qa/motion-regression.mjs',
  'node scripts/qa/internal-links.mjs',
  'node scripts/qa/seo-audit.mjs',
  'node scripts/qa/schema-audit.mjs',
  'node scripts/qa/analytics-audit.mjs',
  'node scripts/qa/domain-readiness.mjs',
  'node scripts/qa/evidence-validation.mjs',
  'node scripts/qa/public-storytelling.mjs',
  'node scripts/qa/page-uniqueness.mjs',
  'node scripts/qa/final-visual-rebuild.mjs',
  'node scripts/qa/card-alignment.mjs',
  'node scripts/qa/tool-brand-logos.mjs',
];

if (!fs.existsSync(dir81)) {
  commands.push('node scripts/qa/live-deployment.mjs');
}

console.log('🚀 Running aggregate QA suite (qa:all)...\n');

try {
  console.log('Building static site before audit run...');
  execSync('node node_modules/astro/dist/cli/index.js build', { stdio: 'inherit' });
  for (const cmd of commands) {
    console.log(`\nExecuting: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  }

  console.log('\n🎉 ALL QA SUITES PASSED CLEANLY (qa:all)!');
} catch (err) {
  console.error(`\n❌ Aggregate QA failed on command execution`);
  process.exit(1);
}
