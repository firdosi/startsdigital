export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'strategy',
    title: 'Digital Marketing Strategy',
    description: 'Clear digital planning that connects audience, positioning, channels, content and measurable business goals.'
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads and Lead Generation',
    description: 'Campaign strategy, creative testing, audience targeting and optimisation for leads, sales and customer acquisition.'
  },
  {
    id: 'seo',
    title: 'Search Engine Optimisation',
    description: 'Technical, on-page, local and content-focused SEO that helps businesses improve visibility and organic discovery.'
  },
  {
    id: 'web-dev',
    title: 'Website Design and Development',
    description: 'Fast, responsive and conversion-focused websites built for credibility, usability and long-term growth.'
  },
  {
    id: 'creative',
    title: 'Social Media and Creative Content',
    description: 'Campaign concepts, ad creatives, social content and practical messaging designed around each platform and audience.'
  },
  {
    id: 'ai-marketing',
    title: 'AI-Powered Marketing Solutions',
    description: 'Practical use of AI for content production, marketing workflows, avatars, automation and faster campaign execution.'
  }
];
