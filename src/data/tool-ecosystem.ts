export interface ToolEntry {
  id: string;
  name: string;
  category: 'Advertising & Social Platforms' | 'Analytics, Search & Tracking' | 'Websites, Development & Commerce' | 'Design, Content & Video' | 'Communication & Business Operations' | 'AI & Automation';
  localAsset: string | null;
  sourceUrl: string;
  sourceType: 'official-vendor' | 'official-repository' | 'third-party-simple-icons' | 'capability-no-standalone-logo';
  renderType: 'logo' | 'capability-text';
  assetType?: 'svg' | 'png' | 'webp';
  alt: string;
  displayScale?: number;
  maxWidth?: string;
  maxHeight?: string;
  brandColor?: string;
  capabilities?: string[];
  optionalNote?: string;
}

export const toolEcosystem: ToolEntry[] = [
  {
    "id": "meta-ads",
    "name": "Meta Ads",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/meta-ads.svg",
    "sourceUrl": "https://brand.meta.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Meta Ads official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#0081FB",
    "capabilities": [
      "Meta Pixel",
      "Audience Network",
      "Instant Forms",
      "Custom Conversions"
    ]
  },
  {
    "id": "facebook",
    "name": "Facebook",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/facebook.svg",
    "sourceUrl": "https://about.meta.com/brand/resources/facebook/facebook-brand/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Facebook official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#1877F2"
  },
  {
    "id": "instagram",
    "name": "Instagram",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/instagram.svg",
    "sourceUrl": "https://about.meta.com/brand/resources/instagram/instagram-brand/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Instagram official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#E4405F"
  },
  {
    "id": "google-ads",
    "name": "Google Ads",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/google-ads.svg",
    "sourceUrl": "https://ads.google.com/home/",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Google Ads official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#4285F4",
    "capabilities": [
      "Conversion Tracking",
      "Smart Bidding",
      "Search & Display",
      "Performance Max"
    ]
  },
  {
    "id": "tiktok",
    "name": "TikTok",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/tiktok.svg",
    "sourceUrl": "https://www.tiktok.com/brand/resources",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "TikTok official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#000000"
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/youtube.svg",
    "sourceUrl": "https://www.youtube.com/howyoutubeworks/resources/brand-resources/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "YouTube official logo",
    "assetType": "svg",
    "displayScale": 1.05,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#FF0000"
  },
  {
    "id": "linkedin",
    "name": "LinkedIn",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/linkedin.svg",
    "sourceUrl": "https://brand.linkedin.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "LinkedIn official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#0A66C2"
  },
  {
    "id": "google-business-profile",
    "name": "Google Business Profile",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/google-business-profile.svg",
    "sourceUrl": "https://business.google.com/en-all/business-profile/",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Google Business Profile official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#4285F4",
    "capabilities": [
      "Map Pack SEO",
      "Review Mgmt",
      "Local Citations"
    ]
  },
  {
    "id": "google-analytics-4",
    "name": "Google Analytics 4",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-analytics-4.svg",
    "sourceUrl": "https://marketingplatform.google.com/about/analytics/",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Google Analytics 4 official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#E37400",
    "capabilities": [
      "Event Tracking",
      "Custom Dashboards",
      "Funnel Analytics"
    ]
  },
  {
    "id": "google-tag-manager",
    "name": "Google Tag Manager",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-tag-manager.svg",
    "sourceUrl": "https://marketingplatform.google.com/about/tag-manager/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Google Tag Manager official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#246FDB",
    "capabilities": [
      "Data Layer",
      "Custom Triggers",
      "Server-side GTM"
    ]
  },
  {
    "id": "google-search-console",
    "name": "Google Search Console",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-search-console.svg",
    "sourceUrl": "https://search.google.com/search-console/about",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Google Search Console official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#4587F4",
    "capabilities": [
      "Indexing Audit",
      "Sitemap Sync",
      "Search Queries"
    ]
  },
  {
    "id": "looker-studio",
    "name": "Looker Studio",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/looker-studio.svg",
    "sourceUrl": "https://lookerstudio.google.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Looker Studio official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#4285F4",
    "capabilities": [
      "Client Portals",
      "Automated Reports",
      "Multi-Source"
    ]
  },
  {
    "id": "microsoft-clarity",
    "name": "Microsoft Clarity",
    "category": "Analytics, Search & Tracking",
    "localAsset": null,
    "sourceUrl": "https://clarity.microsoft.com",
    "sourceType": "capability-no-standalone-logo",
    "renderType": "capability-text",
    "alt": "Microsoft Clarity capability",
    "brandColor": "#0078D4",
    "capabilities": [
      "Session Replay",
      "Heatmaps",
      "Click Maps"
    ]
  },
  {
    "id": "google-trends",
    "name": "Google Trends",
    "category": "Analytics, Search & Tracking",
    "localAsset": null,
    "sourceUrl": "https://trends.google.com",
    "sourceType": "capability-no-standalone-logo",
    "renderType": "capability-text",
    "alt": "Google Trends capability",
    "brandColor": "#4285F4",
    "capabilities": [
      "Demand Analysis",
      "Keyword Volatility",
      "Regional Insights"
    ]
  },
  {
    "id": "wordpress",
    "name": "WordPress",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/wordpress.svg",
    "sourceUrl": "https://wordpress.org/about/requirements/",
    "sourceType": "official-repository",
    "renderType": "logo",
    "alt": "WordPress official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#21759B",
    "capabilities": [
      "Headless WP",
      "Custom Themes",
      "WooCommerce Sync"
    ]
  },
  {
    "id": "woocommerce",
    "name": "WooCommerce",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/woocommerce.svg",
    "sourceUrl": "https://woocommerce.com/style-guide/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "WooCommerce official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#96588A",
    "capabilities": [
      "Payment Gateways",
      "Inventory Sync",
      "Custom Checkout"
    ]
  },
  {
    "id": "shopify",
    "name": "Shopify",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/shopify.svg",
    "sourceUrl": "https://brand.shopify.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Shopify official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#7AB55C",
    "capabilities": [
      "Store Setup",
      "App Integration",
      "Liquid Templates"
    ]
  },
  {
    "id": "elementor",
    "name": "Elementor",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/elementor.svg",
    "sourceUrl": "https://elementor.com/brand-assets/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Elementor official logo",
    "assetType": "svg",
    "displayScale": 1.05,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#92003B"
  },
  {
    "id": "astro",
    "name": "Astro",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/astro.svg",
    "sourceUrl": "https://astro.build/press/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Astro official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#BC52EE",
    "capabilities": [
      "Static Generation",
      "Zero-JS Default",
      "Islands Architecture"
    ]
  },
  {
    "id": "nextjs",
    "name": "Next.js",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/nextjs.svg",
    "sourceUrl": "https://nextjs.org/showcase",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Next.js official logo",
    "assetType": "svg",
    "displayScale": 1.15,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#000000",
    "capabilities": [
      "SSR / SSG",
      "App Router",
      "API Routes"
    ]
  },
  {
    "id": "react",
    "name": "React",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/react.svg",
    "sourceUrl": "https://react.dev",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "React official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#61DAFB"
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/typescript.svg",
    "sourceUrl": "https://www.typescriptlang.org/branding/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "TypeScript official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#3178C6"
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/javascript.svg",
    "sourceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "JavaScript official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#F7DF1E"
  },
  {
    "id": "html5",
    "name": "HTML5",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/html5.svg",
    "sourceUrl": "https://www.w3.org/html/logo/",
    "sourceType": "official-repository",
    "renderType": "logo",
    "alt": "HTML5 official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#E34F26"
  },
  {
    "id": "css3",
    "name": "CSS3",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/css3.svg",
    "sourceUrl": "https://www.w3.org/Style/CSS/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "CSS3 official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#1572B6"
  },
  {
    "id": "tailwindcss",
    "name": "Tailwind CSS",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/tailwindcss.svg",
    "sourceUrl": "https://tailwindcss.com/brand",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Tailwind CSS official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#06B6D4"
  },
  {
    "id": "github",
    "name": "GitHub",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/github.svg",
    "sourceUrl": "https://github.com/logos",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "GitHub official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#181717",
    "capabilities": [
      "CI/CD Pipelines",
      "Version Control",
      "Automated Actions"
    ]
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/vercel.svg",
    "sourceUrl": "https://vercel.com/design/brands",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Vercel official logo",
    "assetType": "svg",
    "displayScale": 1.05,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#000000"
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/cloudflare.svg",
    "sourceUrl": "https://www.cloudflare.com/logo/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Cloudflare official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#F38020"
  },
  {
    "id": "canva",
    "name": "Canva",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/canva.svg",
    "sourceUrl": "https://www.canva.com/newsroom/brands/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Canva official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#00C4CC",
    "capabilities": [
      "Brand Kits",
      "Social Templates",
      "Fast Prototyping"
    ]
  },
  {
    "id": "figma",
    "name": "Figma",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/figma.svg",
    "sourceUrl": "https://www.figma.com/using-the-figma-brand/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Figma official logo",
    "assetType": "svg",
    "displayScale": 1.05,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#F24E1E",
    "capabilities": [
      "UI/UX Design",
      "Wireframing",
      "Design Systems"
    ]
  },
  {
    "id": "adobe-photoshop",
    "name": "Adobe Photoshop",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-photoshop.svg",
    "sourceUrl": "https://www.adobe.com/legal/permissions/icons-logos.html",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Adobe Photoshop official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#31A8FF",
    "capabilities": [
      "Ad Creatives",
      "Image Retouching",
      "Compositing"
    ]
  },
  {
    "id": "adobe-illustrator",
    "name": "Adobe Illustrator",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-illustrator.svg",
    "sourceUrl": "https://www.adobe.com/legal/permissions/icons-logos.html",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Adobe Illustrator official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#FF9A00",
    "capabilities": [
      "Vector Logos",
      "Brand Assets",
      "Illustrations"
    ]
  },
  {
    "id": "adobe-premiere-pro",
    "name": "Adobe Premiere Pro",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-premiere-pro.svg",
    "sourceUrl": "https://www.adobe.com/legal/permissions/icons-logos.html",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Adobe Premiere Pro official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#9999FF",
    "capabilities": [
      "Video Editing",
      "Reels / Shorts",
      "Color Grading"
    ]
  },
  {
    "id": "adobe-after-effects",
    "name": "Adobe After Effects",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-after-effects.svg",
    "sourceUrl": "https://www.adobe.com/legal/permissions/icons-logos.html",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Adobe After Effects official logo",
    "assetType": "svg",
    "displayScale": 1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#9999FF",
    "capabilities": [
      "Motion Graphics",
      "VFX Animation",
      "Logo Stingers"
    ]
  },
  {
    "id": "capcut",
    "name": "CapCut",
    "category": "Design, Content & Video",
    "localAsset": null,
    "sourceUrl": "https://www.capcut.com/",
    "sourceType": "capability-no-standalone-logo",
    "renderType": "capability-text",
    "alt": "CapCut capability",
    "brandColor": "#000000",
    "capabilities": [
      "Reels Editing",
      "Auto Captions",
      "Trending Effects"
    ]
  },
  {
    "id": "whatsapp-business",
    "name": "WhatsApp Business",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/whatsapp-business.svg",
    "sourceUrl": "https://whatsappbrand.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "WhatsApp Business official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#25D366",
    "capabilities": [
      "Automated Replies",
      "Catalog Showcase",
      "Broadcast Lists"
    ]
  },
  {
    "id": "gmail",
    "name": "Gmail",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/gmail.svg",
    "sourceUrl": "https://workspace.google.com/products/gmail/",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Gmail official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#EA4335",
    "capabilities": [
      "Outreach Automation",
      "Client Comm",
      "Domain Auth"
    ]
  },
  {
    "id": "google-workspace",
    "name": "Google Workspace",
    "category": "Communication & Business Operations",
    "localAsset": null,
    "sourceUrl": "https://workspace.google.com/",
    "sourceType": "capability-no-standalone-logo",
    "renderType": "capability-text",
    "alt": "Google Workspace capability",
    "brandColor": "#4285F4",
    "capabilities": [
      "Docs & Sheets",
      "Drive Sharing",
      "Enterprise Admin"
    ]
  },
  {
    "id": "google-meet",
    "name": "Google Meet",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/google-meet.svg",
    "sourceUrl": "https://workspace.google.com/products/meet/",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "Google Meet official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#00897B",
    "capabilities": [
      "Client Discovery",
      "Screen Share",
      "Recorded Briefs"
    ]
  },
  {
    "id": "zoom",
    "name": "Zoom",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/zoom.svg",
    "sourceUrl": "https://zoom.us/brandguidelines",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Zoom official logo",
    "assetType": "svg",
    "displayScale": 1.05,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#2D8CFF"
  },
  {
    "id": "openai",
    "name": "OpenAI",
    "category": "AI & Automation",
    "localAsset": "/platforms/openai.svg",
    "sourceUrl": "https://openai.com/brand",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "OpenAI official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#412991",
    "capabilities": [
      "ChatGPT",
      "Codex",
      "API Workflows",
      "Custom GPTs"
    ]
  },
  {
    "id": "google-gemini",
    "name": "Google Gemini",
    "category": "AI & Automation",
    "localAsset": "/platforms/google-gemini.svg",
    "sourceUrl": "https://gemini.google.com",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Google Gemini official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#8E75FF",
    "capabilities": [
      "Multimodal AI",
      "Content Generation",
      "Search Grounding"
    ]
  },
  {
    "id": "claude",
    "name": "Claude",
    "category": "AI & Automation",
    "localAsset": "/platforms/claude.svg",
    "sourceUrl": "https://claude.ai",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Claude official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#D97757",
    "capabilities": [
      "Long-context Copy",
      "Code Analysis",
      "Strategy Briefs"
    ]
  },
  {
    "id": "n8n",
    "name": "n8n",
    "category": "AI & Automation",
    "localAsset": "/platforms/n8n.svg",
    "sourceUrl": "https://n8n.io/press/",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "n8n official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#FF6D5A",
    "capabilities": [
      "Self-hosted Nodes",
      "Custom Webhooks",
      "AI Agent Loops"
    ]
  },
  {
    "id": "make",
    "name": "Make",
    "category": "AI & Automation",
    "localAsset": "/platforms/make.svg",
    "sourceUrl": "https://www.make.com/en/brand-assets",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Make official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#6B00FF",
    "capabilities": [
      "Visual Workflows",
      "Multi-app Sync",
      "Error Handling"
    ]
  },
  {
    "id": "zapier",
    "name": "Zapier",
    "category": "AI & Automation",
    "localAsset": "/platforms/zapier.svg",
    "sourceUrl": "https://zapier.com/brand",
    "sourceType": "third-party-simple-icons",
    "renderType": "logo",
    "alt": "Zapier official logo",
    "assetType": "svg",
    "displayScale": 1.1,
    "maxWidth": "44px",
    "maxHeight": "44px",
    "brandColor": "#FF4A00",
    "capabilities": [
      "5000+ App Zaps",
      "Instant Triggers",
      "CRM Integrations"
    ]
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "category": "AI & Automation",
    "localAsset": "/platforms/heygen.svg",
    "sourceUrl": "https://www.heygen.com/brand-kit",
    "sourceType": "official-vendor",
    "renderType": "logo",
    "alt": "HeyGen official logo",
    "assetType": "svg",
    "displayScale": 1.2,
    "maxWidth": "48px",
    "maxHeight": "48px",
    "brandColor": "#2563EB",
    "capabilities": [
      "AI Avatars",
      "Multilingual Voice",
      "Video Scale"
    ]
  },
  {
    "id": "kling-ai",
    "name": "Kling AI",
    "category": "AI & Automation",
    "localAsset": null,
    "sourceUrl": "https://klingai.com/",
    "sourceType": "capability-no-standalone-logo",
    "renderType": "capability-text",
    "alt": "Kling AI capability",
    "brandColor": "#FF4500",
    "capabilities": [
      "Cinematic AI Video",
      "Motion Control",
      "Text-to-Video"
    ]
  }
];
