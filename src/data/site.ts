export const siteConfig = {
  name: 'Starts Digital',
  tagline: 'AI-Powered Digital Strategy & Growth',
  description: 'Starts Digital provides digital strategy, Meta advertising, SEO, website development, creative content and practical AI marketing solutions for growing businesses.',
  
  // Deployment Configuration (Centralized for easy domain migrations)
  url: 'https://firdosi.github.io',
  basePath: '/startsdigital',
  
  // SEO Metadata Defaults
  defaultLanguage: 'en',
  author: 'Starts Digital Agency',
  
  // Centralized Contact Details
  contact: {
    email: 'firdosidigital@gmail.com',
    phone: '+92 339 4135544',
    whatsappNumber: '+923394135544',
    whatsappUrl: 'https://wa.me/923394135544'
  },
  
  // Interactive / Contact Links
  links: {
    whatsapp: 'https://wa.me/923394135544',
    contact: '#contact',
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
