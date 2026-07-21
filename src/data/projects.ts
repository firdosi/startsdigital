export interface ProjectItem {
  id: string;
  title: string;
  industry: string;
  services: string[];
  result: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'black-gold-fertilizer',
    title: 'Black Gold Fertilizer',
    industry: 'Agriculture and e-commerce',
    services: ['Meta advertising', 'digital strategy', 'e-commerce growth', 'creative campaigns'],
    result: 'Contributed to PKR 30M+ revenue and 29,000+ product sales across multiple product categories.'
  },
  {
    id: 'qurbani-campaign',
    title: 'Wajib Livestock Qurbani Campaign',
    industry: 'Livestock and seasonal e-commerce',
    services: ['Campaign strategy', 'lead generation', 'content and paid social'],
    result: 'Helped sell 150+ animals and generate PKR 4.2M+ in seasonal sales.'
  },
  {
    id: 'rk-reno-solutions',
    title: 'RK Reno Solutions',
    industry: 'Renovation and local services',
    services: ['SEO strategy', 'service-page development', 'website content', 'local search optimisation'],
    result: 'Built a structured SEO foundation targeting renovation and air-conditioning services in Kuala Lumpur and Selangor.'
  },
  {
    id: 'immigration-recruitment',
    title: 'Immigration and Education Projects',
    industry: 'Immigration and education',
    services: ['Lead generation', 'websites', 'campaign content', 'AI videos', 'digital marketing systems'],
    result: 'Managed digital execution across immigration, education and international recruitment projects.'
  }
];
