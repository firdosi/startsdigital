import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const outputDir = path.resolve('typography-tech-v2');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function serveStatic(req, res) {
  let urlPath = req.url.replace(/^\/startsdigital/, '');
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/index.html';
  }

  let filePath = path.join(distDir, urlPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found: ' + req.url);
  }
}

async function run() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(3344, resolve));
  console.log('Server listening on http://localhost:3344');

  const browser = await chromium.launch();
  
  // Desktop 1440px
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3344/', { waitUntil: 'networkidle' });
  const desktopPath = path.join(outputDir, 'desktop.png');
  await desktopPage.screenshot({ path: desktopPath, fullPage: true });
  console.log('Saved:', desktopPath);

  // Mobile 375px
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('http://localhost:3344/', { waitUntil: 'networkidle' });
  const mobilePath = path.join(outputDir, 'mobile.png');
  await mobilePage.screenshot({ path: mobilePath, fullPage: true });
  console.log('Saved:', mobilePath);

  await browser.close();
  server.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
