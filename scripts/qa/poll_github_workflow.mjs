const RUN_ID = '31099789978';

async function poll() {
  console.log(`Polling GitHub Actions Workflow Run ${RUN_ID}...`);
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`https://api.github.com/repos/firdosi/startsdigital/actions/runs/${RUN_ID}`);
      const data = await r.json();
      console.log(`[Attempt ${i + 1}] Status: ${data.status}, Conclusion: ${data.conclusion}`);
      if (data.status === 'completed') {
        console.log(`WORKFLOW_COMPLETE: ${data.conclusion}`);
        if (data.conclusion !== 'success') {
          process.exit(1);
        }
        process.exit(0);
      }
    } catch (e) {
      console.error('Fetch error:', e.message);
    }
    await new Promise(res => setTimeout(res, 5000));
  }
  console.error('Polling timed out');
  process.exit(1);
}

poll();
