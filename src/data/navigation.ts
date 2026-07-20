import { siteConfig } from './site';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isUnbuilt?: boolean;
}

export const headerNavLinks: NavItem[] = [
  { label: 'Home', href: `${siteConfig.basePath}/` },
  { label: 'Services', href: '#', isUnbuilt: true },
  { label: 'Work', href: '#', isUnbuilt: true },
  { label: 'About', href: '#', isUnbuilt: true },
  { label: 'Insights', href: '#', isUnbuilt: true },
  { label: 'Contact', href: '#', isUnbuilt: true },
];

export const footerNavLinks: NavItem[] = [
  { label: 'Services', href: '#', isUnbuilt: true },
  { label: 'Work', href: '#', isUnbuilt: true },
  { label: 'About', href: '#', isUnbuilt: true },
  { label: 'Insights', href: '#', isUnbuilt: true },
];
