export interface Platform {
  name: string;
  category: 'Advertising' | 'Analytics' | 'Web & E-Commerce' | 'Communication & Design';
  logo: string;
}

export const platforms: Platform[] = [
  { name: 'Meta Ads', category: 'Advertising', logo: '/platforms/meta-ads.svg' },
  { name: 'Facebook', category: 'Advertising', logo: '/platforms/facebook.svg' },
  { name: 'Instagram', category: 'Advertising', logo: '/platforms/instagram.svg' },
  { name: 'Google Ads', category: 'Advertising', logo: '/platforms/google-ads.svg' },
  { name: 'Google Analytics 4', category: 'Analytics', logo: '/platforms/ga4.svg' },
  { name: 'Google Tag Manager', category: 'Analytics', logo: '/platforms/gtm.svg' },
  { name: 'WordPress', category: 'Web & E-Commerce', logo: '/platforms/wordpress.svg' },
  { name: 'WooCommerce', category: 'Web & E-Commerce', logo: '/platforms/woocommerce.svg' },
  { name: 'Shopify', category: 'Web & E-Commerce', logo: '/platforms/shopify.svg' },
  { name: 'WhatsApp Business', category: 'Communication & Design', logo: '/platforms/whatsapp.svg' },
  { name: 'Elementor', category: 'Web & E-Commerce', logo: '/platforms/elementor.svg' },
  { name: 'Canva', category: 'Communication & Design', logo: '/platforms/canva.svg' },
];
