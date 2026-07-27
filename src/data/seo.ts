import { site } from '../site.config';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string; // e.g. '/', '/about/', '/services/paid-advertising/'
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  robots?: string;
  schemaType?:
    | 'homepage'
    | 'about'
    | 'contact'
    | 'services-index'
    | 'service'
    | 'work-index'
    | 'case-study'
    | 'industries-index'
    | 'industry'
    | 'location'
    | 'page';
  breadcrumbLabel?: string;
  serviceId?: string;
  projectId?: string;
  marketSlug?: string;
}

export const defaultSeo: PageSeoConfig = {
  title: 'Starts Digital | Digital Marketing & Growth Agency Lahore',
  description: 'Lahore-based digital agency providing paid advertising, web development, SEO, creative content, social media marketing and AI workflows.',
  canonicalPath: '/',
  ogType: 'website',
  ogImage: '/og/default-og.png',
  ogImageAlt: 'Starts Digital — Digital Marketing & Growth Agency Lahore',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  robots: 'index, follow',
  schemaType: 'homepage',
  breadcrumbLabel: 'Home',
};

export const pageSeoRegistry: Record<string, PageSeoConfig> = {
  '/': {
    title: 'Starts Digital | Digital Marketing & Growth Agency Lahore',
    description: 'Lahore-based digital agency providing paid advertising, web development, SEO, creative content, social media and AI workflows.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Starts Digital — Digital Marketing & Growth Agency Lahore',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'homepage',
    breadcrumbLabel: 'Home',
  },
  '/about/': {
    title: 'About Starts Digital | Lahore Digital Marketing Agency',
    description: 'Learn about Starts Digital, a Lahore digital agency founded in 2025 by Ahad Firdosi, delivering marketing, creative and web solutions.',
    canonicalPath: '/about/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'About Starts Digital — Team & Production Capabilities',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'about',
    breadcrumbLabel: 'About',
  },
  '/contact/': {
    title: 'Contact Starts Digital | Project Inquiries & Briefs',
    description: 'Get in touch with Starts Digital in Lahore to discuss your digital advertising, website development, or growth marketing project.',
    canonicalPath: '/contact/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Contact Starts Digital — Project Inquiries & Briefs',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'contact',
    breadcrumbLabel: 'Contact',
  },
  '/services/': {
    title: 'Digital Marketing & Web Services | Starts Digital',
    description: 'Explore our six core service areas: paid ads, website design, SEO, creative content, social media, and AI marketing workflows.',
    canonicalPath: '/services/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Starts Digital — Core Service Capabilities',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'services-index',
    breadcrumbLabel: 'Services',
  },
  '/services/paid-advertising/': {
    title: 'Paid Advertising & Performance Marketing | Starts Digital',
    description: 'Paid campaign planning, account structure, creative coordination, landing-page alignment, tracking review and ongoing campaign management.',
    canonicalPath: '/services/paid-advertising/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Paid Advertising & Campaign Management — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'Paid Advertising',
    serviceId: 'paid-advertising',
  },
  '/services/website-design-development/': {
    title: 'Website Design & Web Development | Starts Digital',
    description: 'Fast, responsive, and conversion-focused custom websites, landing pages, and e-commerce platforms tailored for growth.',
    canonicalPath: '/services/website-design-development/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Website Design & Development — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'Website Design & Development',
    serviceId: 'website-design-development',
  },
  '/services/seo-local-search/': {
    title: 'SEO & Local Search Optimization | Starts Digital Lahore',
    description: 'Technical SEO, content optimization, and local search visibility services to help your business rank and gain organic customers.',
    canonicalPath: '/services/seo-local-search/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'SEO & Local Search Optimization — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'SEO & Local Search',
    serviceId: 'seo-local-search',
  },
  '/services/creative-content/': {
    title: 'Creative Content & Ad Design | Starts Digital',
    description: 'Direct-response ad visuals, video editing, graphics, and promotional content created to capture attention and convert.',
    canonicalPath: '/services/creative-content/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Creative Content & Direct Response Design — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'Creative Content',
    serviceId: 'creative-content',
  },
  '/services/social-media-marketing/': {
    title: 'Social Media Marketing & Management | Starts Digital',
    description: 'Strategic social media publishing, community management, and visual content production across key social platforms.',
    canonicalPath: '/services/social-media-marketing/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Social Media Marketing & Content Management — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'Social Media Marketing',
    serviceId: 'social-media-marketing',
  },
  '/services/ai-marketing-workflows/': {
    title: 'AI Marketing Workflows & Automation | Starts Digital',
    description: 'Practical AI tools, lead routing systems, and automated marketing workflows to speed up customer acquisition and operations.',
    canonicalPath: '/services/ai-marketing-workflows/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'AI Marketing Workflows & Automation — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'service',
    breadcrumbLabel: 'AI Marketing Workflows',
    serviceId: 'ai-marketing-workflows',
  },
  '/work/': {
    title: 'Client Work & Project Portfolio | Starts Digital',
    description: 'Browse client projects and case studies across e-commerce, agriculture, local services, and digital software partnerships.',
    canonicalPath: '/work/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Client Work & Portfolio — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'work-index',
    breadcrumbLabel: 'Work',
  },
  '/work/black-gold-fertilizer/': {
    title: 'Black Gold Fertilizer Growth Case Study | Starts Digital',
    description: 'How Starts Digital supported PKR 30M+ in delivered revenue and 29,000+ product sales through targeted digital marketing.',
    canonicalPath: '/work/black-gold-fertilizer/',
    ogType: 'article',
    ogImage: '/images/black-gold-official.png',
    ogImageAlt: 'Black Gold Fertilizer E-Commerce Growth Case Study',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'case-study',
    breadcrumbLabel: 'Black Gold Fertilizer',
    projectId: 'black-gold-fertilizer',
  },
  '/work/qurbani-campaign/': {
    title: 'Wajib Livestock Qurbani Campaign Story | Starts Digital',
    description: 'Seasonal digital campaign execution for Wajib Livestock, delivering video ads, customer inquiries, and booking conversions.',
    canonicalPath: '/work/qurbani-campaign/',
    ogType: 'article',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Wajib Livestock Qurbani Campaign Case Study',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'case-study',
    breadcrumbLabel: 'Wajib Livestock Qurbani Campaign',
    projectId: 'qurbani-campaign',
  },
  '/work/rk-reno-solutions/': {
    title: 'RK Reno Solutions Website Case Study | Starts Digital',
    description: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    canonicalPath: '/work/rk-reno-solutions/',
    ogType: 'article',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'RK Reno Solutions Web & Local SEO Case Study',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'case-study',
    breadcrumbLabel: 'RK Reno Solutions',
    projectId: 'rk-reno-solutions',
  },
  '/work/convortai/': {
    title: 'ConvortAI Software Partnership Story | Starts Digital',
    description: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
    canonicalPath: '/work/convortai/',
    ogType: 'article',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'ConvortAI Software Partnership Story',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'case-study',
    breadcrumbLabel: 'ConvortAI',
    projectId: 'convort-ai',
  },
  '/industries/': {
    title: 'Industries & Business Sectors Served | Starts Digital',
    description: 'Explore the industries and campaign contexts Starts Digital supports, including e-commerce, seasonal events, local contractors, and tech products.',
    canonicalPath: '/industries/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Industries & Business Sectors Served — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'industries-index',
    breadcrumbLabel: 'Industries',
  },
  '/industries/ecommerce-product-brands/': {
    title: 'E-Commerce & Product Brand Marketing | Starts Digital',
    description: 'Direct-response advertising, storefront development, creative testing, and tracking systems for growing e-commerce product brands.',
    canonicalPath: '/industries/ecommerce-product-brands/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'E-Commerce & Product Brand Marketing — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'industry',
    breadcrumbLabel: 'E-commerce & Product Brands',
    marketSlug: 'ecommerce-product-brands',
  },
  '/industries/seasonal-campaigns/': {
    title: 'Seasonal Digital Campaigns & Event Marketing | Starts Digital',
    description: 'High-impact digital marketing strategies, pre-booking windows, and creative execution for time-sensitive seasonal campaigns.',
    canonicalPath: '/industries/seasonal-campaigns/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Seasonal Digital Campaigns & Event Marketing — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'industry',
    breadcrumbLabel: 'Seasonal Campaigns',
    marketSlug: 'seasonal-campaigns',
  },
  '/industries/local-service-businesses/': {
    title: 'Local Service Contractor Web & SEO Foundations | Starts Digital',
    description: 'Custom website development, local SEO foundations, and service-area content for renovation and contractor businesses.',
    canonicalPath: '/industries/local-service-businesses/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Local Service Contractor Web & SEO Foundations — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'industry',
    breadcrumbLabel: 'Local Service Businesses',
    marketSlug: 'local-service-businesses',
  },
  '/industries/technology-products/': {
    title: 'Tech Product Development & Growth Partnerships | Starts Digital',
    description: 'Web application development, UI design, workflow automation, and product growth support for technology platforms.',
    canonicalPath: '/industries/technology-products/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Tech Product Development & Growth Partnerships — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'industry',
    breadcrumbLabel: 'Technology Products',
    marketSlug: 'technology-products',
  },
  '/locations/lahore/': {
    title: 'Digital Marketing Agency in Lahore | Starts Digital',
    description: 'Starts Digital is a Lahore-based digital marketing agency founded in 2025, offering paid ads, website development, SEO, creative content, and AI workflows.',
    canonicalPath: '/locations/lahore/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Digital Marketing Agency in Lahore — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'location',
    breadcrumbLabel: 'Lahore',
    marketSlug: 'lahore',
  },
  '/privacy/': {
    title: 'Privacy Policy | Starts Digital',
    description: 'Privacy policy and data handling information for Starts Digital website visitors and client inquiries.',
    canonicalPath: '/privacy/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Privacy Policy — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'page',
    breadcrumbLabel: 'Privacy Policy',
  },
  '/terms/': {
    title: 'Terms of Service | Starts Digital',
    description: 'Terms of service, project scope guidelines, and legal conditions for working with Starts Digital.',
    canonicalPath: '/terms/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Terms of Service — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'page',
    breadcrumbLabel: 'Terms of Service',
  },
  '/legal/': {
    title: 'Legal & Company Information | Starts Digital',
    description: 'Legal notices, privacy policies, terms of service, and company ownership details for Starts Digital.',
    canonicalPath: '/legal/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Legal & Company Information — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'index, follow',
    schemaType: 'page',
    breadcrumbLabel: 'Legal Information',
  },
  '/style-guide/': {
    title: 'Style Guide & Component Library | Starts Digital',
    description: 'Internal design system tokens and component demonstration page for Starts Digital.',
    canonicalPath: '/style-guide/',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Style Guide & Component Library — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'noindex, nofollow',
    schemaType: 'page',
    breadcrumbLabel: 'Style Guide',
  },
  '/404': {
    title: 'Page Not Found | Starts Digital',
    description: 'The page you requested could not be found. Return to Starts Digital homepage or service directory.',
    canonicalPath: '/404.html',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Page Not Found — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'noindex, nofollow',
    schemaType: 'page',
    breadcrumbLabel: 'Page Not Found',
  },
  '/404.html': {
    title: 'Page Not Found | Starts Digital',
    description: 'The page you requested could not be found. Return to Starts Digital homepage or service directory.',
    canonicalPath: '/404.html',
    ogType: 'website',
    ogImage: '/og/default-og.png',
    ogImageAlt: 'Page Not Found — Starts Digital',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    robots: 'noindex, nofollow',
    schemaType: 'page',
    breadcrumbLabel: 'Page Not Found',
  },
};

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.replace(site.basePath, '').replace(/^\/+|\/+$/g, '');
  if (!cleanPath) {
    return `${site.siteUrl}/`;
  }
  if (cleanPath === '404' || cleanPath === '404.html') {
    return `${site.siteUrl}/404.html`;
  }
  return `${site.siteUrl}/${cleanPath}/`;
}

export function getSeoForPath(path: string): PageSeoConfig {
  const cleanPath = path.replace(site.basePath, '').replace(/\/+$/, '') || '/';
  if (cleanPath === '/404.html' || cleanPath === '/404') {
    return pageSeoRegistry['/404.html'];
  }
  const normalizedKey = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;

  if (pageSeoRegistry[normalizedKey]) {
    return pageSeoRegistry[normalizedKey];
  }

  // Fallback for dynamic routes
  return {
    ...defaultSeo,
    canonicalPath: normalizedKey,
  };
}
