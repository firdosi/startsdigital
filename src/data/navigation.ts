import { siteConfig } from './site';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const headerNavLinks: NavItem[] = [
  { label: 'Home', href: `${siteConfig.basePath}/` },
  { label: 'Services', href: `${siteConfig.basePath}/#services` },
  { label: 'Work', href: `${siteConfig.basePath}/#work` },
  { label: 'About', href: `${siteConfig.basePath}/#about` },
  { label: 'Insights', href: `${siteConfig.basePath}/#insights` },
  { label: 'Contact', href: `${siteConfig.basePath}/#contact` },
];

export const footerNavLinks: NavItem[] = [
  { label: 'Services', href: `${siteConfig.basePath}/#services` },
  { label: 'Work', href: `${siteConfig.basePath}/#work` },
  { label: 'About', href: `${siteConfig.basePath}/#about` },
  { label: 'Insights', href: `${siteConfig.basePath}/#insights` },
  { label: 'Style Guide', href: `${siteConfig.basePath}/style-guide` },
];
