export interface CompanyProfile {
  name: string;
  foundedYear: number;
  location: string;
  locationStatement: string;
  founderId: string;
  story: string[];
  services: string[];
  workingApproach: string[];
  officeAddressPublic: boolean;
  linkedin?: string;
}

export const companyProfile: CompanyProfile = {
  name: 'Starts Digital',
  foundedYear: 2023,
  location: 'Lahore, Pakistan',
  locationStatement: 'Lahore-based digital agency serving local and international clients.',
  founderId: 'ahad-firdosi',
  story: [
    'Starts Digital was established in Lahore in 2023 to bring digital marketing, creative production and technical execution into one coordinated workflow.',
    'The agency began with hands-on campaign management and marketing support for product and service businesses.',
    'It now provides paid advertising, websites and e-commerce, SEO, creative content, social media marketing and practical AI workflows.',
    'Projects are organised around clear requirements, documented responsibilities and real business needs rather than generic packages.'
  ],
  services: [
    'Paid Advertising',
    'Website Design & Development',
    'SEO & Local Search',
    'Creative Content',
    'Social Media Marketing',
    'AI Marketing Workflows'
  ],
  workingApproach: [
    'Clear Project Scope',
    'Documented Responsibilities',
    'Coordinated Execution',
    'Review Against Business Requirements'
  ],
  officeAddressPublic: false
};
