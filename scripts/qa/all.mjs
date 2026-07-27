import { execSync } from 'child_process';

const commands = [
  'node scripts/qa/motion-regression.mjs',
  'node scripts/qa/evidence-validation.mjs',
  'node scripts/qa/internal-links.mjs',
  'node scripts/qa/seo-audit.mjs',
  'node scripts/qa/schema-audit.mjs',
  'node scripts/qa/analytics-audit.mjs',
  'node scripts/qa/domain-readiness.mjs',
  'node scripts/qa/live-deployment.mjs',
];

console.log('🚀 Running aggregate QA suite (qa:all)...\n');

for (const cmd of commands) {
  try {
    console.log(`Executing: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`\n❌ Aggregate QA failed on command: "${cmd}"`);
    process.exit(1);
  }
}

console.log('\n🎉 ALL QA SUITES PASSED CLEANLY (qa:all)!');
