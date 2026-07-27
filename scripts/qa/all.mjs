import { execSync } from 'child_process';

const commands = [
  'node scripts/qa/motion-regression.mjs',
  'node scripts/qa/internal-links.mjs',
  'node scripts/qa/seo-audit.mjs',
  'node scripts/qa/schema-audit.mjs',
  'node scripts/qa/analytics-audit.mjs',
  'node scripts/qa/domain-readiness.mjs',
  'node scripts/qa/live-deployment.mjs',
  'node scripts/qa/evidence-validation.mjs',
];

console.log('🚀 Running aggregate QA suite (qa:all)...\n');

try {
  for (const cmd of commands) {
    console.log(`\nExecuting: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  }

  console.log('\n🎉 ALL QA SUITES PASSED CLEANLY (qa:all)!');
} catch (err) {
  console.error(`\n❌ Aggregate QA failed on command execution`);
  process.exit(1);
}
