export const siteConfig = {
  name: 'Start Digital',
  tagline: 'AI-Powered Digital Strategy & Growth',
  description: 'Digital marketing built to start, grow and scale businesses online. Strategy, paid advertising, SEO, website development, content, and practical AI solutions.',
  // Deployment Configuration (Centralized for easy domain migrations)
  url: 'https://firdosi.github.io',
  basePath: '/startsdigital',
  
  // SEO Metadata Defaults
  defaultLanguage: 'en',
  author: 'Start Digital Agency',
  
  // Interactive / Contact Links
  links: {
    whatsapp: 'https://wa.me/1234567890', // Centralized for contact forms & floating buttons
    contact: '/startsdigital/contact',     // Centralized routing
  }
} as const;

// Helper to construct fully qualified URLs or base paths
export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.basePath}${cleanPath}`;
}

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${siteConfig.basePath}${cleanPath}`;
}
