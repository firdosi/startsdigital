import { site } from '../site.config';

export const siteConfig = {
  name: site.name,
  tagline: 'Digital Strategy, Paid Advertising & Growth',
  description: site.description,
  
  // Deployment Configuration
  url: 'https://firdosi.github.io',
  basePath: site.basePath,
  
  // SEO Metadata Defaults
  defaultLanguage: 'en',
  author: site.author,
  
  // Centralized Contact Details
  contact: {
    email: site.contact.email,
    phone: site.contact.phone,
    whatsappNumber: '+923394135544',
    whatsappUrl: site.contact.whatsapp,
  },
  
  // Interactive Links
  links: {
    whatsapp: site.contact.whatsapp,
    contact: `${site.basePath}/contact/`,
  }
} as const;

export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.basePath}${cleanPath}`;
}

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${siteConfig.basePath}${cleanPath}`;
}
