import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../');
const outputDir = path.join(rootDir, 'public/visuals');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const HTML_TEMPLATES = {
  'marketing-system-visual': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        .bg-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 24px 24px; }
        .glow { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(80px); opacity: 0.25; }
        .glow-1 { top: -100px; left: -100px; background: #ff762b; }
        .glow-2 { bottom: -100px; right: -100px; background: #ddff35; }
        
        .header { position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 16px; }
        .logo-tag { font-family: monospace; font-size: 13px; font-weight: bold; color: #ddff35; letter-spacing: 1px; background: rgba(221,255,53,0.12); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(221,255,53,0.25); }
        .title { font-size: 20px; font-weight: 700; color: #fff; }

        .browser-frame { position: relative; z-index: 10; background: rgba(10, 35, 60, 0.85); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 20px; backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .bar { display: flex; align-items: center; gap: 8px; border-b: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 16px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .url-box { margin-left: 12px; background: rgba(255,255,255,0.08); padding: 4px 16px; border-radius: 12px; font-size: 11px; font-family: monospace; color: #94a3b8; }
        
        .grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 14px; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
        .card-badge { font-family: monospace; font-size: 10px; color: #ff762b; font-weight: bold; }
        .card-title { font-size: 14px; font-weight: 700; color: #fff; }
        .card-desc { font-size: 11px; color: #cbd5e1; line-height: 1.4; }
        .card-pill { align-self: flex-start; margin-top: auto; font-size: 10px; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.08); color: #38bdf8; font-family: monospace; }
        
        .footer { position: relative; z-index: 10; display: flex; items-center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .metric { font-size: 13px; font-weight: 600; color: #ddff35; font-family: monospace; }
        .sub { font-size: 11px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="bg-grid"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>

      <div class="header">
        <div class="title">STARTS DIGITAL MARKETING SYSTEM</div>
        <div class="logo-tag">PRE-LAUNCH ARCHITECTURE</div>
      </div>

      <div class="browser-frame">
        <div class="bar">
          <div class="dot" style="background:#ef4444;"></div>
          <div class="dot" style="background:#f59e0b;"></div>
          <div class="dot" style="background:#10b981;"></div>
          <div class="url-box">Starts Digital / Marketing System</div>
        </div>
        <div class="grid">
          <div class="card">
            <div class="card-badge">01. PAID ADVERTISING</div>
            <div class="card-title">Meta & TikTok Campaigns</div>
            <div class="card-desc">Direct-response ad creative testing, conversion optimization, and audience scale.</div>
            <div class="card-pill">ACTIVE CAMPAIGNS</div>
          </div>
          <div class="card">
            <div class="card-badge">02. WEB & SEARCH</div>
            <div class="card-title">Astro Platform & SEO</div>
            <div class="card-desc">Zero-JS fast hydration web platforms with local search ranking foundation.</div>
            <div class="card-pill">100 LIGHTHOUSE</div>
          </div>
          <div class="card">
            <div class="card-badge">03. AI WORKFLOWS</div>
            <div class="card-title">Private VPS Generation</div>
            <div class="card-desc">Custom AI avatar creation, voice synthesis, and high-volume asset production.</div>
            <div class="card-pill">27 AI CHARACTERS</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="metric">PKR 5.9M+ SALES SUPPORTED</div>
        <div class="sub">Coordinated execution across 6 agency capabilities</div>
        <div class="metric" style="color: #38bdf8;">140+ CLIENTS DELIVERED</div>
      </div>
    </body>
    </html>
  `,

  'work-capabilities-collage': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        .bg-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 20px 20px; }
        
        .header-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; }
        .collage-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 16px; flex: 1; margin: 16px 0; }
        
        .quadrant { background: rgba(15, 45, 75, 0.7); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; backdrop-filter: blur(10px); }
        .q-header { display: flex; justify-content: space-between; align-items: center; }
        .q-tag { font-family: monospace; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
        .q-tag-1 { background: rgba(255,118,43,0.2); color: #ff762b; }
        .q-tag-2 { background: rgba(56,189,248,0.2); color: #38bdf8; }
        .q-tag-3 { background: rgba(221,255,53,0.2); color: #ddff35; }
        .q-tag-4 { background: rgba(168,85,247,0.2); color: #c084fc; }

        .q-title { font-size: 16px; font-weight: 700; color: #fff; margin-top: 10px; }
        .q-stats { display: flex; gap: 12px; margin-top: 12px; }
        .stat-box { background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 8px; }
        .stat-val { font-size: 14px; font-weight: 700; font-family: monospace; color: #ddff35; }
        .stat-lbl { font-size: 10px; color: #94a3b8; }
        
        .badge-bar { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px 20px; display: flex; justify-content: space-around; text-align: center; }
        .b-item { font-size: 11px; font-family: monospace; font-weight: 600; color: #cbd5e1; }
      </style>
    </head>
    <body>
      <div class="bg-grid"></div>
      <div class="header-title">COMBINED WORK CAPABILITIES & PROVEN EXECUTION</div>

      <div class="collage-grid">
        <div class="quadrant">
          <div class="q-header">
            <span class="q-tag q-tag-1">E-COMMERCE GROWTH</span>
            <span style="font-family:monospace; font-size:11px; color:#cbd5e1;">24-Month Data</span>
          </div>
          <div class="q-title">Direct Sales Strategy & Meta Ad Testing</div>
          <div class="q-stats">
            <div class="stat-box"><div class="stat-val">PKR 5.9M+</div><div class="stat-lbl">Delivered Sales</div></div>
            <div class="stat-box"><div class="stat-val">5,000+</div><div class="stat-lbl">Units Sold</div></div>
          </div>
        </div>

        <div class="quadrant">
          <div class="q-header">
            <span class="q-tag q-tag-2">LEAD GENERATION</span>
            <span style="font-family:monospace; font-size:11px; color:#cbd5e1;">Gulf & Asia</span>
          </div>
          <div class="q-title">Paid Social Campaigns & WhatsApp Routing</div>
          <div class="q-stats">
            <div class="stat-box"><div class="stat-val">140+</div><div class="stat-lbl">Clients Converted</div></div>
            <div class="stat-box"><div class="stat-val">AED 1.4M+</div><div class="stat-lbl">Revenue Generated</div></div>
          </div>
        </div>

        <div class="quadrant">
          <div class="q-header">
            <span class="q-tag q-tag-3">WEB ENGINEERING</span>
            <span style="font-family:monospace; font-size:11px; color:#cbd5e1;">Astro Framework</span>
          </div>
          <div class="q-title">High-Speed Performance & SEO Foundation</div>
          <div class="q-stats">
            <div class="stat-box"><div class="stat-val">Astro</div><div class="stat-lbl">Web Framework</div></div>
            <div class="stat-box"><div class="stat-val">100%</div><div class="stat-lbl">Mobile Responsive</div></div>
          </div>
        </div>

        <div class="quadrant">
          <div class="q-header">
            <span class="q-tag q-tag-4">AI GENERATION</span>
            <span style="font-family:monospace; font-size:11px; color:#cbd5e1;">Private VPS</span>
          </div>
          <div class="q-title">Custom AI Avatar & Creative Pipeline</div>
          <div class="q-stats">
            <div class="stat-box"><div class="stat-val">27+</div><div class="stat-lbl">AI Models Built</div></div>
            <div class="stat-box"><div class="stat-val">Scale</div><div class="stat-lbl">Ad Content</div></div>
          </div>
        </div>
      </div>

      <div class="badge-bar">
        <div class="b-item">⚡ DIRECT-RESPONSE CREATIVE</div>
        <div class="b-item">🎯 COMBINED COMMERCIAL OUTCOMES</div>
        <div class="b-item">🚀 HIGH-SPEED WEB PLATFORMS</div>
      </div>
    </body>
    </html>
  `,

  'services-overview-composition': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        
        .header { display: flex; justify-content: space-between; align-items: center; border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; }
        .h-title { font-size: 20px; font-weight: 700; }
        .h-tag { font-family: monospace; font-size: 11px; color: #38bdf8; background: rgba(56,189,248,0.15); padding: 4px 12px; border-radius: 12px; }

        .service-layout { display: grid; grid-template-cols: 2fr 1fr; gap: 20px; margin: 20px 0; }
        
        .desktop-mock { background: rgba(15, 42, 70, 0.9); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; p-4; padding: 18px; box-shadow: 0 12px 30px rgba(0,0,0,0.4); }
        .services-list { display: grid; grid-template-cols: 1fr 1fr; gap: 10px; margin-top: 12px; }
        .s-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 10px; }
        .s-name { font-size: 13px; font-weight: 700; color: #ddff35; }
        .s-desc { font-size: 10px; color: #94a3b8; margin-top: 4px; }

        .mobile-mock { background: rgba(10, 25, 45, 0.95); border: 2px solid rgba(255,255,255,0.2); border-radius: 24px; padding: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.6); }
        .m-header { text-align: center; font-size: 11px; font-family: monospace; color: #ff762b; font-weight: bold; border-b: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
        .m-btn { background: #ff762b; color: #fff; font-size: 11px; font-weight: bold; text-align: center; padding: 10px; border-radius: 10px; margin-top: auto; }

        .footer-strip { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 10px 16px; border-radius: 10px; font-family: monospace; font-size: 11px; text-align: center; color: #cbd5e1; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="h-title">SERVICE DIRECTORY & MULTI-DEVICE EXECUTION</div>
        <div class="h-tag">6 CORE CAPABILITIES</div>
      </div>

      <div class="service-layout">
        <div class="desktop-mock">
          <div style="font-size: 12px; font-weight: bold; color: #94a3b8; font-family: monospace;">DESKTOP SERVICE HUB</div>
          <div class="services-list">
            <div class="s-card"><div class="s-name">Paid Advertising</div><div class="s-desc">Meta & TikTok strategy, scriptwriting & scaling.</div></div>
            <div class="s-card"><div class="s-name">Web Development</div><div class="s-desc">Astro high-speed platforms & SEO layouts.</div></div>
            <div class="s-card"><div class="s-name">SEO & Local Search</div><div class="s-desc">Google Maps, local content & search foundation.</div></div>
            <div class="s-card"><div class="s-name">Creative Content</div><div class="s-desc">Ad creatives, video cuts & brand graphics.</div></div>
            <div class="s-card"><div class="s-name">Social Marketing</div><div class="s-desc">Content planning, WhatsApp & lead routing.</div></div>
            <div class="s-card"><div class="s-name">AI Workflows</div><div class="s-desc">Private VPS character engine & voice synthesis.</div></div>
          </div>
        </div>

        <div class="mobile-mock">
          <div class="m-header">MOBILE VIEWPORT</div>
          <div style="font-size: 12px; font-weight: 700; color: #fff;">Optimised Touch Experience</div>
          <div style="font-size: 10px; color: #94a3b8; line-height: 1.4;">Tested across 360px and 390px mobile viewports with 44px+ touch targets.</div>
          <div class="m-btn">DISCUSS YOUR PROJECT</div>
        </div>
      </div>

      <div class="footer-strip">
        COORDINATED EXECUTION • NO UNRELATED PLUGINS • OPTIMISED ASSET PAYLOAD
      </div>
    </body>
    </html>
  `,

  'industries-object-composition': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        
        .title-bar { border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .title-text { font-size: 20px; font-weight: 700; }
        .tag { font-family: monospace; font-size: 11px; color: #ddff35; background: rgba(221,255,53,0.12); padding: 4px 10px; border-radius: 8px; }

        .ind-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 16px; margin: 20px 0; }
        .ind-card { background: rgba(15, 40, 68, 0.8); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; backdrop-filter: blur(8px); display: flex; flex-direction: column; gap: 8px; }
        .ind-num { font-family: monospace; font-size: 12px; font-weight: bold; color: #ff762b; }
        .ind-name { font-size: 16px; font-weight: 700; color: #fff; }
        .ind-body { font-size: 11px; color: #cbd5e1; line-height: 1.4; }
        .ind-tags { display: flex; gap: 6px; margin-top: 6px; }
        .chip { font-size: 9px; font-family: monospace; background: rgba(255,255,255,0.08); color: #38bdf8; padding: 3px 6px; border-radius: 4px; }

        .bot-strip { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 20px; border-radius: 12px; display: flex; justify-content: space-between; font-family: monospace; font-size: 11px; color: #cbd5e1; }
      </style>
    </head>
    <body>
      <div class="title-bar">
        <div class="title-text">SECTOR ARCHITECTURE & INDUSTRY EXPERIENCE</div>
        <div class="tag">TARGETED DOMAINS</div>
      </div>

      <div class="ind-grid">
        <div class="ind-card">
          <div class="ind-num">SECTOR 01</div>
          <div class="ind-name">E-Commerce & Product Brands</div>
          <div class="ind-body">Direct-to-consumer store growth, Meta advertising, storefront development and sales support.</div>
          <div class="ind-tags"><span class="chip">D2C Sales</span><span class="chip">Meta Ads</span><span class="chip">Storefront</span></div>
        </div>

        <div class="ind-card">
          <div class="ind-num">SECTOR 02</div>
          <div class="ind-name">Local Service Businesses</div>
          <div class="ind-body">Location-focused website design, Google Maps setup, service pages and regional SEO foundation.</div>
          <div class="ind-tags"><span class="chip">Google Maps</span><span class="chip">Local SEO</span><span class="chip">Service Pages</span></div>
        </div>

        <div class="ind-card">
          <div class="ind-num">SECTOR 03</div>
          <div class="ind-name">Seasonal Campaigns</div>
          <div class="ind-body">Event-based digital marketing, rapid lead generation, WhatsApp sales routing and campaign support.</div>
          <div class="ind-tags"><span class="chip">Qurbani Sales</span><span class="chip">Lead Routing</span><span class="chip">Campaign Creative</span></div>
        </div>

        <div class="ind-card">
          <div class="ind-num">SECTOR 04</div>
          <div class="ind-name">Technology Products</div>
          <div class="ind-body">Ongoing technology partnership, web app development, product marketing and growth operations.</div>
          <div class="ind-tags"><span class="chip">Web App</span><span class="chip">AI Tools</span><span class="chip">Growth Ops</span></div>
        </div>
      </div>

      <div class="bot-strip">
        <span>FLEXIBLE ENGAGEMENT MODELS</span>
        <span>SINGLE OR COMBINED SERVICES</span>
        <span>LAHORE BASED AGENCY</span>
      </div>
    </body>
    </html>
  `,

  'about-collaboration-composition': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        
        .header { border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .h-title { font-size: 20px; font-weight: 700; }
        .h-badge { font-family: monospace; font-size: 11px; color: #ff762b; background: rgba(255,118,43,0.15); padding: 4px 10px; border-radius: 8px; }

        .team-flow { display: grid; grid-template-cols: repeat(3, 1fr); gap: 16px; margin: 20px 0; }
        .member-card { background: rgba(12, 38, 65, 0.85); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; backdrop-filter: blur(8px); display: flex; flex-direction: column; gap: 10px; }
        .m-role { font-family: monospace; font-size: 10px; color: #38bdf8; font-weight: bold; }
        .m-name { font-size: 18px; font-weight: 700; color: #fff; }
        .m-desc { font-size: 11px; color: #cbd5e1; line-height: 1.4; }
        .m-task { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 8px; font-size: 10px; color: #ddff35; font-family: monospace; margin-top: auto; }

        .collab-strip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 14px 20px; border-radius: 12px; text-align: center; font-size: 12px; font-weight: 600; color: #cbd5e1; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="h-title">LAHORE AGENCY TEAM COLLABORATION</div>
        <div class="h-badge">OPERATOR DRIVEN</div>
      </div>

      <div class="team-flow">
        <div class="member-card">
          <div class="m-role">FOUNDER & LEAD STRATEGIST</div>
          <div class="m-name">Ahad Firdosi</div>
          <div class="m-desc">Direct client engagement, digital strategy, campaign planning, and project coordination.</div>
          <div class="m-task">PROJECT DIRECTION & CAMPAIGNS</div>
        </div>

        <div class="member-card">
          <div class="m-role">CREATIVE PRODUCTION</div>
          <div class="m-name">Meesam</div>
          <div class="m-desc">Short-form ad editing, graphic overlays, video production support, and brand visuals.</div>
          <div class="m-task">VIDEO & BRAND CREATIVE</div>
        </div>

        <div class="member-card">
          <div class="m-role">UI/UX & DEVELOPMENT</div>
          <div class="m-name">Zaid</div>
          <div class="m-desc">UI/UX design, Astro website development, component architecture, and web support.</div>
          <div class="m-task">ASTRO WEB PLATFORMS</div>
        </div>
      </div>

      <div class="collab-strip">
        SINGLE SCOPE • DOCUMENTED COMMUNICATION • DIRECT OPERATOR ACCESS
      </div>
    </body>
    </html>
  `,

  'contact-communication-composition': `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { width: 800px; height: 600px; background: #061d33; color: #fff; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; }
        
        .header { border-b: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .h-title { font-size: 20px; font-weight: 700; }
        .h-badge { font-family: monospace; font-size: 11px; color: #39c98a; background: rgba(57,201,138,0.15); padding: 4px 10px; border-radius: 8px; }

        .form-mock { background: rgba(12, 38, 65, 0.9); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 24px; backdrop-filter: blur(12px); display: flex; flex-direction: column; gap: 14px; margin: 16px 0; }
        .form-row { display: grid; grid-template-cols: 1fr 1fr; gap: 14px; }
        .input-box { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 8px; font-size: 12px; color: #94a3b8; font-family: monospace; }
        .chips-row { display: flex; gap: 8px; }
        .chip { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 20px; font-size: 11px; color: #ddff35; font-family: monospace; }

        .submit-btn { background: #ddff35; color: #061d33; font-weight: bold; font-size: 14px; text-align: center; padding: 12px; border-radius: 10px; margin-top: 4px; }

        .routing-strip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 20px; border-radius: 12px; display: flex; justify-content: space-between; font-family: monospace; font-size: 11px; color: #cbd5e1; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="h-title">PROJECT INQUIRY & DIRECT ROUTING</div>
        <div class="h-badge">GENERIC PROJECT INQUIRY</div>
      </div>

      <div class="form-mock">
        <div style="font-size: 13px; font-weight: bold; color: #fff;">Discuss Your Project Scope</div>
        <div class="form-row">
          <div class="input-box">Your Name / Business</div>
          <div class="input-box">WhatsApp or Email</div>
        </div>
        <div class="chips-row">
          <div class="chip">Paid Advertising</div>
          <div class="chip">Website & SEO</div>
          <div class="chip">Creative Content</div>
          <div class="chip">AI Workflows</div>
        </div>
        <div class="input-box" style="height: 60px;">Project goals, target markets, or required timeline...</div>
        <div class="submit-btn">DISCUSS YOUR PROJECT</div>
      </div>

      <div class="routing-strip">
        <span>WHATSAPP DISPATCH</span>
        <span>EMAIL BRIEF ROUTING</span>
        <span>NO CLIENT-SPECIFIC ALLOWLISTS</span>
      </div>
    </body>
    </html>
  `
};

import sharp from 'sharp';

async function generateVisuals() {
  console.log('🖼️ Launching Chromium to generate 6 optimized visual compositions...');
  const browser = await chromium.launch({ headless: true });

  for (const [name, html] of Object.entries(HTML_TEMPLATES)) {
    const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    await page.setContent(html);
    
    const pngBuffer = await page.screenshot({ type: 'png' });
    const webpPath = path.join(outputDir, `${name}.webp`);
    const avifPath = path.join(outputDir, `${name}.avif`);

    await sharp(pngBuffer).webp({ quality: 85, effort: 6 }).toFile(webpPath);
    await sharp(pngBuffer).avif({ quality: 80, effort: 6 }).toFile(avifPath);

    const statsWebp = fs.statSync(webpPath);
    const statsAvif = fs.statSync(avifPath);
    console.log(`  ✅ Generated public/visuals/${name}.webp (${(statsWebp.size / 1024).toFixed(1)} KB) and ${name}.avif (${(statsAvif.size / 1024).toFixed(1)} KB)`);
    await page.close();
  }

  await browser.close();
  console.log('✨ All 6 visual compositions generated in public/visuals/');
}

generateVisuals().catch(console.error);
