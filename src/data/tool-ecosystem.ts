export interface ToolEntry {
  id: string;
  name: string;
  category: 'Advertising & Social Platforms' | 'Analytics, Search & Tracking' | 'Websites, Development & Commerce' | 'Design, Content & Video' | 'Communication & Business Operations' | 'AI & Automation';
  localAsset: string;
  sourceUrl: string;
  assetType: 'svg' | 'png' | 'webp';
  alt: string;
  displayScale: number;
  brandColor?: string;
  optionalNote?: string;
}

export const toolEcosystem: ToolEntry[] = [
  {
    "id": "meta-ads",
    "name": "Meta Ads",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/meta-ads.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
    "assetType": "svg",
    "alt": "Meta Ads official logo",
    "displayScale": 1,
    "brandColor": "#0081FB"
  },
  {
    "id": "facebook",
    "name": "Facebook",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/facebook.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
    "assetType": "svg",
    "alt": "Facebook official logo",
    "displayScale": 1,
    "brandColor": "#1877F2"
  },
  {
    "id": "instagram",
    "name": "Instagram",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/instagram.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
    "assetType": "svg",
    "alt": "Instagram official logo",
    "displayScale": 1,
    "brandColor": "#E4405F"
  },
  {
    "id": "google-ads",
    "name": "Google Ads",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/google-ads.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleads.svg",
    "assetType": "svg",
    "alt": "Google Ads official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "tiktok",
    "name": "TikTok",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/tiktok.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tiktok.svg",
    "assetType": "svg",
    "alt": "TikTok official logo",
    "displayScale": 1,
    "brandColor": "#000000"
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/youtube.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
    "assetType": "svg",
    "alt": "YouTube official logo",
    "displayScale": 1,
    "brandColor": "#FF0000"
  },
  {
    "id": "linkedin",
    "name": "LinkedIn",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/linkedin.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    "assetType": "svg",
    "alt": "LinkedIn official logo",
    "displayScale": 1,
    "brandColor": "#0A66C2"
  },
  {
    "id": "google-business-profile",
    "name": "Google Business Profile",
    "category": "Advertising & Social Platforms",
    "localAsset": "/platforms/google-business-profile.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    "assetType": "svg",
    "alt": "Google Business Profile official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "google-analytics-4",
    "name": "Google Analytics 4",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-analytics-4.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleanalytics.svg",
    "assetType": "svg",
    "alt": "Google Analytics 4 official logo",
    "displayScale": 1,
    "brandColor": "#E37400"
  },
  {
    "id": "google-tag-manager",
    "name": "Google Tag Manager",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-tag-manager.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googletagmanager.svg",
    "assetType": "svg",
    "alt": "Google Tag Manager official logo",
    "displayScale": 1,
    "brandColor": "#246FDB"
  },
  {
    "id": "google-search-console",
    "name": "Google Search Console",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-search-console.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlesearchconsole.svg",
    "assetType": "svg",
    "alt": "Google Search Console official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "looker-studio",
    "name": "Looker Studio",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/looker-studio.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/looker.svg",
    "assetType": "svg",
    "alt": "Looker Studio official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "meta-pixel",
    "name": "Meta Pixel",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/meta-pixel.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
    "assetType": "svg",
    "alt": "Meta Pixel official logo",
    "displayScale": 1,
    "brandColor": "#0081FB"
  },
  {
    "id": "google-ads-conversion-tracking",
    "name": "Google Ads Conversion Tracking",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-ads-conversion-tracking.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleads.svg",
    "assetType": "svg",
    "alt": "Google Ads Conversion Tracking official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "microsoft-clarity",
    "name": "Microsoft Clarity",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/microsoft-clarity.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
    "assetType": "svg",
    "alt": "Microsoft Clarity official logo",
    "displayScale": 1,
    "brandColor": "#5E5E5E"
  },
  {
    "id": "google-trends",
    "name": "Google Trends",
    "category": "Analytics, Search & Tracking",
    "localAsset": "/platforms/google-trends.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    "assetType": "svg",
    "alt": "Google Trends official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "wordpress",
    "name": "WordPress",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/wordpress.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wordpress.svg",
    "assetType": "svg",
    "alt": "WordPress official logo",
    "displayScale": 1,
    "brandColor": "#21759B"
  },
  {
    "id": "woocommerce",
    "name": "WooCommerce",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/woocommerce.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/woocommerce.svg",
    "assetType": "svg",
    "alt": "WooCommerce official logo",
    "displayScale": 1,
    "brandColor": "#96588A"
  },
  {
    "id": "shopify",
    "name": "Shopify",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/shopify.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
    "assetType": "svg",
    "alt": "Shopify official logo",
    "displayScale": 1,
    "brandColor": "#7AB55C"
  },
  {
    "id": "elementor",
    "name": "Elementor",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/elementor.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elementor.svg",
    "assetType": "svg",
    "alt": "Elementor official logo",
    "displayScale": 1,
    "brandColor": "#92003B"
  },
  {
    "id": "astro",
    "name": "Astro",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/astro.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/astro.svg",
    "assetType": "svg",
    "alt": "Astro official logo",
    "displayScale": 1,
    "brandColor": "#BC52EE"
  },
  {
    "id": "nextjs",
    "name": "Next.js",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/nextjs.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",
    "assetType": "svg",
    "alt": "Next.js official logo",
    "displayScale": 1,
    "brandColor": "#000000"
  },
  {
    "id": "react",
    "name": "React",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/react.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
    "assetType": "svg",
    "alt": "React official logo",
    "displayScale": 1,
    "brandColor": "#61DAFB"
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/typescript.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg",
    "assetType": "svg",
    "alt": "TypeScript official logo",
    "displayScale": 1,
    "brandColor": "#3178C6"
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/javascript.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg",
    "assetType": "svg",
    "alt": "JavaScript official logo",
    "displayScale": 1,
    "brandColor": "#F7DF1E"
  },
  {
    "id": "html5",
    "name": "HTML5",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/html5.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg",
    "assetType": "svg",
    "alt": "HTML5 official logo",
    "displayScale": 1,
    "brandColor": "#E34F26"
  },
  {
    "id": "css3",
    "name": "CSS3",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/css3.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg",
    "assetType": "svg",
    "alt": "CSS3 official logo",
    "displayScale": 1,
    "brandColor": "#1572B6"
  },
  {
    "id": "tailwindcss",
    "name": "Tailwind CSS",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/tailwindcss.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg",
    "assetType": "svg",
    "alt": "Tailwind CSS official logo",
    "displayScale": 1,
    "brandColor": "#06B6D4"
  },
  {
    "id": "github",
    "name": "GitHub",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/github.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg",
    "assetType": "svg",
    "alt": "GitHub official logo",
    "displayScale": 1,
    "brandColor": "#181717"
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/vercel.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg",
    "assetType": "svg",
    "alt": "Vercel official logo",
    "displayScale": 1,
    "brandColor": "#000000"
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "category": "Websites, Development & Commerce",
    "localAsset": "/platforms/cloudflare.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg",
    "assetType": "svg",
    "alt": "Cloudflare official logo",
    "displayScale": 1,
    "brandColor": "#F38020"
  },
  {
    "id": "canva",
    "name": "Canva",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/canva.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/canva.svg",
    "assetType": "svg",
    "alt": "Canva official logo",
    "displayScale": 1,
    "brandColor": "#00C4CC"
  },
  {
    "id": "figma",
    "name": "Figma",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/figma.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg",
    "assetType": "svg",
    "alt": "Figma official logo",
    "displayScale": 1,
    "brandColor": "#F24E1E"
  },
  {
    "id": "adobe-photoshop",
    "name": "Adobe Photoshop",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-photoshop.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobephotoshop.svg",
    "assetType": "svg",
    "alt": "Adobe Photoshop official logo",
    "displayScale": 1,
    "brandColor": "#31A8FF"
  },
  {
    "id": "adobe-illustrator",
    "name": "Adobe Illustrator",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-illustrator.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeillustrator.svg",
    "assetType": "svg",
    "alt": "Adobe Illustrator official logo",
    "displayScale": 1,
    "brandColor": "#FF9A00"
  },
  {
    "id": "adobe-premiere-pro",
    "name": "Adobe Premiere Pro",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-premiere-pro.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobepremierepro.svg",
    "assetType": "svg",
    "alt": "Adobe Premiere Pro official logo",
    "displayScale": 1,
    "brandColor": "#9999FF"
  },
  {
    "id": "adobe-after-effects",
    "name": "Adobe After Effects",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/adobe-after-effects.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeaftereffects.svg",
    "assetType": "svg",
    "alt": "Adobe After Effects official logo",
    "displayScale": 1,
    "brandColor": "#9999FF"
  },
  {
    "id": "capcut",
    "name": "CapCut",
    "category": "Design, Content & Video",
    "localAsset": "/platforms/capcut.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bytedance.svg",
    "assetType": "svg",
    "alt": "CapCut official logo",
    "displayScale": 1,
    "brandColor": "#000000"
  },
  {
    "id": "whatsapp-business",
    "name": "WhatsApp Business",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/whatsapp-business.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg",
    "assetType": "svg",
    "alt": "WhatsApp Business official logo",
    "displayScale": 1,
    "brandColor": "#25D366"
  },
  {
    "id": "gmail",
    "name": "Gmail",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/gmail.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg",
    "assetType": "svg",
    "alt": "Gmail official logo",
    "displayScale": 1,
    "brandColor": "#EA4335"
  },
  {
    "id": "google-workspace",
    "name": "Google Workspace",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/google-workspace.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    "assetType": "svg",
    "alt": "Google Workspace official logo",
    "displayScale": 1,
    "brandColor": "#4285F4"
  },
  {
    "id": "google-meet",
    "name": "Google Meet",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/google-meet.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlemeet.svg",
    "assetType": "svg",
    "alt": "Google Meet official logo",
    "displayScale": 1,
    "brandColor": "#00897B"
  },
  {
    "id": "zoom",
    "name": "Zoom",
    "category": "Communication & Business Operations",
    "localAsset": "/platforms/zoom.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoom.svg",
    "assetType": "svg",
    "alt": "Zoom official logo",
    "displayScale": 1,
    "brandColor": "#2D8CFF"
  },
  {
    "id": "openai",
    "name": "OpenAI",
    "category": "AI & Automation",
    "localAsset": "/platforms/openai.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "assetType": "svg",
    "alt": "OpenAI official logo",
    "displayScale": 1,
    "brandColor": "#412991"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "category": "AI & Automation",
    "localAsset": "/platforms/chatgpt.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "assetType": "svg",
    "alt": "ChatGPT official logo",
    "displayScale": 1,
    "brandColor": "#10A37F"
  },
  {
    "id": "codex",
    "name": "Codex",
    "category": "AI & Automation",
    "localAsset": "/platforms/codex.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "assetType": "svg",
    "alt": "Codex official logo",
    "displayScale": 1,
    "brandColor": "#000000"
  },
  {
    "id": "google-gemini",
    "name": "Google Gemini",
    "category": "AI & Automation",
    "localAsset": "/platforms/google-gemini.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg",
    "assetType": "svg",
    "alt": "Google Gemini official logo",
    "displayScale": 1,
    "brandColor": "#8E75FF"
  },
  {
    "id": "claude",
    "name": "Claude",
    "category": "AI & Automation",
    "localAsset": "/platforms/claude.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
    "assetType": "svg",
    "alt": "Claude official logo",
    "displayScale": 1,
    "brandColor": "#D97757"
  },
  {
    "id": "n8n",
    "name": "n8n",
    "category": "AI & Automation",
    "localAsset": "/platforms/n8n.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg",
    "assetType": "svg",
    "alt": "n8n official logo",
    "displayScale": 1,
    "brandColor": "#FF6D5A"
  },
  {
    "id": "make",
    "name": "Make",
    "category": "AI & Automation",
    "localAsset": "/platforms/make.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg",
    "assetType": "svg",
    "alt": "Make official logo",
    "displayScale": 1,
    "brandColor": "#6B00FF"
  },
  {
    "id": "zapier",
    "name": "Zapier",
    "category": "AI & Automation",
    "localAsset": "/platforms/zapier.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg",
    "assetType": "svg",
    "alt": "Zapier official logo",
    "displayScale": 1,
    "brandColor": "#FF4A00"
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "category": "AI & Automation",
    "localAsset": "/platforms/heygen.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "assetType": "svg",
    "alt": "HeyGen official logo",
    "displayScale": 1,
    "brandColor": "#6C5CE7"
  },
  {
    "id": "kling-ai",
    "name": "Kling AI",
    "category": "AI & Automation",
    "localAsset": "/platforms/kling-ai.svg",
    "sourceUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    "assetType": "svg",
    "alt": "Kling AI official logo",
    "displayScale": 1,
    "brandColor": "#00B894"
  }
];
