import { siteConfig, getAssetPath } from './site';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const headerNavLinks: NavItem[] = [
  { label: 'Home', href: `${siteConfig.basePath}/` },
  { label: 'Services', href: `${siteConfig.basePath}/#services` },
  { label: 'Work', href: getAssetPath('/work/') },
  { label: 'About', href: `${siteConfig.basePath}/#about` },
  { label: 'Contact', href: `${siteConfig.basePath}/#contact` },
];

export const footerNavLinks: NavItem[] = [
  { label: 'Services', href: `${siteConfig.basePath}/#services` },
  { label: 'Work', href: getAssetPath('/work/') },
  { label: 'About', href: `${siteConfig.basePath}/#about` },
];
