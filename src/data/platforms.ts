export interface Platform {
  id: string;
  name: string;
  category: 'advertising' | 'analytics' | 'cms' | 'design' | 'communication';
  logo?: string;
  url?: string;
  active: boolean;
  order: number;
}

export const platforms: Platform[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'advertising',
    url: 'https://about.meta.com/brand/resources/meta-ads/',
    active: true,
    order: 1,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'advertising',
    url: 'https://about.meta.com/brand/resources/facebook-app/logo/',
    active: true,
    order: 2,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'advertising',
    url: 'https://about.meta.com/brand/resources/instagram/instagram-brand/',
    active: true,
    order: 3,
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'advertising',
    url: 'https://www.google.com/permissions/',
    active: true,
    order: 4,
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    category: 'analytics',
    active: true,
    order: 5,
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: 'analytics',
    active: true,
    order: 6,
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'cms',
    url: 'https://wordpress.org/about/logos/',
    active: true,
    order: 7,
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'cms',
    url: 'https://woocommerce.com/style-guide/',
    active: true,
    order: 8,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'cms',
    url: 'https://www.shopify.com/brand-assets',
    active: true,
    order: 9,
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business',
    category: 'communication',
    url: 'https://whatsappbrand.com/',
    active: true,
    order: 10,
  },
  {
    id: 'elementor',
    name: 'Elementor',
    category: 'design',
    active: true,
    order: 11,
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'design',
    active: true,
    order: 12,
  },
];
