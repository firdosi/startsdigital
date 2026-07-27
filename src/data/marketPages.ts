import { site } from '../site.config';

export interface MarketPageFaq {
  question: string;
  answer: string;
}

export interface MarketPageDefinition {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  schemaType: 'industries-index' | 'industry' | 'location';
  breadcrumbLabel: string;
  featuredProjectId: string;
  featuredProofText: string;
  relevantServiceIds: string[];
  keyTopics: { title: string; description: string }[];
  workingMethod: { step: string; title: string; description: string }[];
  faqs: MarketPageFaq[];
}

export const marketPages: MarketPageDefinition[] = [
  {
    id: 'ecommerce-product-brands',
    slug: 'ecommerce-product-brands',
    title: 'Digital Marketing & Growth for E-Commerce & Product Brands',
    subtitle: 'Combining direct-response advertising, storefront optimization, creative testing, and tracking to scale online sales.',
    eyebrow: 'INDUSTRY EXPERIENCE',
    description: 'We help growing e-commerce and direct-to-consumer product brands build structured acquisition systems, test promotional creative, and optimize digital customer journeys.',
    metaTitle: 'E-Commerce & Product Brand Marketing | Starts Digital',
    metaDescription: 'Direct-response advertising, storefront development, creative testing, and tracking systems for growing e-commerce product brands.',
    canonicalPath: '/industries/ecommerce-product-brands/',
    schemaType: 'industry',
    breadcrumbLabel: 'E-commerce & Product Brands',
    featuredProjectId: 'black-gold-fertilizer',
    featuredProofText: 'Supported PKR 30M+ in delivered-order revenue, 29,000+ product sales and 22,000+ delivered sales over 24 months.',
    relevantServiceIds: ['paid-advertising', 'website-design-development', 'creative-content', 'seo-local-search', 'social-media-marketing'],
    keyTopics: [
      { title: 'Product Positioning & Offer Clarity', description: 'Structuring compelling value propositions, offer bundles, and clear messaging for digital consumers.' },
      { title: 'Ad Creative Testing & Asset Production', description: 'Developing and testing video ads, product visuals, and direct-response ad copy across channels.' },
      { title: 'Storefront & Mobile Checkout Alignment', description: 'Designing fast, mobile-friendly landing pages and checkout flows optimized for customer conversion.' },
      { title: 'Delivered-Order Data & Tracking Systems', description: 'Establishing conversion measurement and tracking reviews focused on delivered orders rather than ad metrics alone.' },
      { title: 'Organic Search & Product Visibility', description: 'Optimizing technical SEO and search content so products build lasting organic search visibility over time.' }
    ],
    workingMethod: [
      { step: '01', title: 'Product Audit & Channel Alignment', description: 'Reviewing existing product margins, conversion assets, ad history, and target customer profiles.' },
      { step: '02', title: 'Campaign Architecture & Creative Setup', description: 'Designing campaign structures, video scripts, ad graphics, and high-converting landing pages.' },
      { step: '03', title: 'Tracking & Measurement Verification', description: 'Setting up platform tags and order verification protocols before launching paid campaigns.' },
      { step: '04', title: 'Iterative Scaling & Optimization', description: 'Continuously refining ad creative, audience targeting, product offers, and checkout user experience.' }
    ],
    faqs: [
      {
        question: 'What e-commerce platforms do you support?',
        answer: 'We design, build, and optimize stores on Shopify, WooCommerce, and custom web frameworks depending on catalog size and operational requirements.'
      },
      {
        question: 'How do you measure campaign performance for e-commerce brands?',
        answer: 'We align tracking parameters during project setup. For e-commerce clients, we review platform conversions alongside verified customer sales and delivered-order reporting.'
      },
      {
        question: 'Do you create video and visual ad assets for product campaigns?',
        answer: 'Yes. Our creative content team produces direct-response ad graphics, product photography formats, and video ad edits tailored for social platforms.'
      }
    ]
  },
  {
    id: 'seasonal-campaigns',
    slug: 'seasonal-campaigns',
    title: 'Digital Marketing & Execution for Seasonal Campaigns',
    subtitle: 'Structuring high-urgency digital campaigns, pre-booking windows, and rapid lead follow-up systems for time-sensitive events.',
    eyebrow: 'CAMPAIGN EXPERIENCE',
    description: 'Seasonal campaigns require precise scheduling, focused offer clarity, and rapid sales coordination to capture demand within tight operational timeframes.',
    metaTitle: 'Seasonal Digital Campaigns & Event Marketing | Starts Digital',
    metaDescription: 'High-impact digital marketing strategies, pre-booking windows, and creative execution for time-sensitive seasonal campaigns.',
    canonicalPath: '/industries/seasonal-campaigns/',
    schemaType: 'industry',
    breadcrumbLabel: 'Seasonal Campaigns',
    featuredProjectId: 'wajib-livestock',
    featuredProofText: 'Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.',
    relevantServiceIds: ['paid-advertising', 'creative-content', 'social-media-marketing'],
    keyTopics: [
      { title: 'Fixed Window Campaign Strategy', description: 'Mapping strict launch dates, booking deadlines, and inventory release schedules to maximize campaign velocity.' },
      { title: 'High-Urgency Creative Production', description: 'Producing targeted video ads, countdown creative, and promotional messages that communicate clear event urgency.' },
      { title: 'Customer Inquiry & Booking Pathways', description: 'Setting up mobile-friendly inquiry funnels connecting interested buyers directly to sales and WhatsApp teams.' },
      { title: 'Offer Clarity & Booking Transparency', description: 'Ensuring pricing, animal specs, delivery terms, and booking conditions are presented clearly to build trust.' }
    ],
    workingMethod: [
      { step: '01', title: 'Pre-Campaign Strategy & Schedule', description: 'Defining campaign duration, inventory quotas, promotional messaging, and communication channels.' },
      { step: '02', title: 'Creative Production & Funnel Setup', description: 'Shooting or editing campaign media, writing ad copy, and preparing mobile booking pages.' },
      { step: '03', title: 'Multi-Channel Campaign Launch', description: 'Activating paid Meta campaigns, organic social content, and direct customer inquiry channels simultaneously.' },
      { step: '04', title: 'Daily Sales & Lead Optimization', description: 'Monitoring incoming lead volume, ad spend efficiency, and sales team follow-up speed throughout the campaign.' }
    ],
    faqs: [
      {
        question: 'How far in advance should a seasonal campaign be planned?',
        answer: 'We recommend starting creative production and technical setup 3 to 4 weeks before the official booking window opens to allow thorough testing.'
      },
      {
        question: 'Can you route seasonal inquiries directly to our WhatsApp sales team?',
        answer: 'Yes. We build custom click-to-WhatsApp and structured web forms that pre-fill customer requirements for fast sales response.'
      }
    ]
  },
  {
    id: 'local-service-businesses',
    slug: 'local-service-businesses',
    title: 'Website & Local Search Foundations for Service Contractors',
    subtitle: 'Building location-focused service pages, clear contact journeys, and local search visibility for renovation and service providers.',
    eyebrow: 'CONTRACTOR & LOCAL SERVICE EXPERIENCE',
    description: 'Local contractors and service businesses require dedicated service pages, clear service-area boundaries, and mobile-friendly quote pathways to capture regional demand.',
    metaTitle: 'Local Service Contractor Web & SEO Foundations | Starts Digital',
    metaDescription: 'Custom website development, local SEO foundations, and service-area content for renovation and contractor businesses.',
    canonicalPath: '/industries/local-service-businesses/',
    schemaType: 'industry',
    breadcrumbLabel: 'Local Service Businesses',
    featuredProjectId: 'rk-reno-solutions',
    featuredProofText: 'Website design, location-focused content, service-page development and local SEO foundation for renovation and air-conditioning services in Kuala Lumpur and Selangor.',
    relevantServiceIds: ['website-design-development', 'seo-local-search', 'paid-advertising'],
    keyTopics: [
      { title: 'Service-Area Page Architecture', description: 'Structuring dedicated pages for key service areas and core contractor specialties to capture search intent.' },
      { title: 'Mobile Quote & Inquiry Pathways', description: 'Designing fast, accessible contact forms, tap-to-call buttons, and WhatsApp quote request features.' },
      { title: 'Local Search Technical Foundations', description: 'Optimizing schema markup, site speed, heading hierarchy, and meta data for targeted local search engine indexation.' },
      { title: 'Project Portfolios & Service Clarity', description: 'Presenting completed work galleries, scope breakdowns, and service lists clearly to establish contractor credibility.' }
    ],
    workingMethod: [
      { step: '01', title: 'Service & Area Mapping', description: 'Cataloging primary contractor services, target geographic areas, and common customer inquiries.' },
      { step: '02', title: 'Information Architecture & Design', description: 'Designing structured page layouts that guide visitors from service overview to quote submission.' },
      { step: '03', title: 'Content Development & Technical SEO', description: 'Writing clear service descriptions and implementing technical local SEO tags for search visibility.' },
      { step: '04', title: 'Launch & Performance Monitoring', description: 'Deploying the site on fast static infrastructure and verifying form delivery and mobile usability.' }
    ],
    faqs: [
      {
        question: 'Do you guarantee local search rankings or call volumes for contractors?',
        answer: 'No. We provide solid technical SEO, structured markup, and location-focused content foundations, but we do not make unverified ranking or lead volume guarantees.'
      },
      {
        question: 'Can you build separate pages for different contractor service areas?',
        answer: 'Yes. We structure distinct pages for individual service categories and target geographic locations to match customer search queries.'
      }
    ]
  },
  {
    id: 'technology-products',
    slug: 'technology-products',
    title: 'Product Development & Growth Partnerships for Tech Solutions',
    subtitle: 'Developing web applications, product interfaces, workflow integrations, and growth assets for software products.',
    eyebrow: 'SOFTWARE & TECH PARTNERSHIP EXPERIENCE',
    description: 'We partner with technology platforms to build functional web applications, design user interfaces, streamline marketing workflows, and execute digital growth campaigns.',
    metaTitle: 'Tech Product Development & Growth Partnerships | Starts Digital',
    metaDescription: 'Web application development, UI design, workflow automation, and product growth support for technology platforms.',
    canonicalPath: '/industries/technology-products/',
    schemaType: 'industry',
    breadcrumbLabel: 'Technology Products',
    featuredProjectId: 'convort-ai',
    featuredProofText: 'Starts Digital developed the ConvortAI web application and continues supporting product development, project management, social media, creative production and growth.',
    relevantServiceIds: ['website-design-development', 'ai-marketing-workflows', 'creative-content', 'social-media-marketing'],
    keyTopics: [
      { title: 'Full-Stack Web Application Development', description: 'Engineering modern, responsive web applications using clean frontend frameworks and robust backend API integrations.' },
      { title: 'Product UI/UX & Interactive Prototypes', description: 'Designing intuitive user interfaces, dashboard layouts, and interactive application flows for software users.' },
      { title: 'Automated Lead & Marketing Workflows', description: 'Building practical AI workflows, lead management features, and automated notification integrations.' },
      { title: 'Brand Communication & Growth Assets', description: 'Producing product demo videos, social media content, landing pages, and documentation to support user onboarding.' }
    ],
    workingMethod: [
      { step: '01', title: 'Product Specification & Roadmap', description: 'Defining technical requirements, user roles, core workflows, and integration boundaries.' },
      { step: '02', title: 'Application Architecture & UI Design', description: 'Building modular component systems and database schemas for reliable software performance.' },
      { step: '03', title: 'Development & Integration Sprints', description: 'Writing clean code, implementing security protocols, and integrating third-party APIs or AI services.' },
      { step: '04', title: 'Product Launch & Ongoing Growth Support', description: 'Deploying application updates and executing ongoing social, creative, and technical growth tasks.' }
    ],
    faqs: [
      {
        question: 'What is your role as a Technology & Growth Partner?',
        answer: 'We act as an integrated technical and creative production team, building product software applications and supporting product management, design, and growth execution.'
      },
      {
        question: 'Can you build custom AI marketing workflows into web applications?',
        answer: 'Yes. We specialize in integrating AI APIs, automated lead qualification routing, and custom internal workflow tools into modern web applications.'
      }
    ]
  },
  {
    id: 'lahore',
    slug: 'lahore',
    title: 'Digital Marketing & Web Development Agency in Lahore',
    subtitle: 'Factual agency context, published services, and project coordination for local and international client partnerships.',
    eyebrow: 'LAHORE AGENCY CONTEXT',
    description: 'Based in Lahore, Pakistan, Starts Digital provides paid advertising, custom web development, technical SEO, creative content production, and practical AI workflows for clients in Pakistan and abroad.',
    metaTitle: 'Digital Marketing Agency in Lahore | Starts Digital',
    metaDescription: 'Starts Digital is a Lahore-based digital marketing agency founded in 2025, offering paid ads, website development, SEO, creative content, and AI workflows.',
    canonicalPath: '/locations/lahore/',
    schemaType: 'location',
    breadcrumbLabel: 'Lahore',
    featuredProjectId: 'black-gold-fertilizer',
    featuredProofText: 'Founded in 2025 in Lahore, Starts Digital delivers digital marketing and technical web production for Pakistani businesses and international partners.',
    relevantServiceIds: ['paid-advertising', 'website-design-development', 'seo-local-search', 'creative-content', 'social-media-marketing', 'ai-marketing-workflows'],
    keyTopics: [
      { title: 'Lahore-Based Core Team', description: 'Our strategy, design, development, and campaign operations are executed directly by our team in Lahore.' },
      { title: 'Local & International Project Coordination', description: 'We support local Pakistani businesses as well as international clients across Asia, the Middle East, and beyond.' },
      { title: 'Six Published Service Capabilities', description: 'Full access to our six core service lines: Paid Ads, Websites, Technical SEO, Creative Content, Social Media, and AI Workflows.' },
      { title: 'Transparent Communication Channels', description: 'Clients communicate directly with project leads via dedicated WhatsApp channels, email, and scheduled video reviews.' }
    ],
    workingMethod: [
      { step: '01', title: 'Initial Project Brief & Consultation', description: 'Reviewing project requirements, business goals, and current digital assets via WhatsApp or video call.' },
      { step: '02', title: 'Scope Definition & Transparent Proposal', description: 'Providing a clear written scope breakdown, deliverables schedule, and fixed commercial terms.' },
      { step: '03', title: 'Collaborative Execution & Review', description: 'Developing web assets, creative media, or campaign structures with regular milestone reviews.' },
      { step: '04', title: 'Launch & Ongoing Operational Support', description: 'Deploying completed technical projects and managing active marketing campaigns according to the agreed plan.' }
    ],
    faqs: [
      {
        question: 'Where is Starts Digital located?',
        answer: 'Starts Digital is based in Lahore, Pakistan. We operate as a dedicated digital agency coordinating projects locally and internationally.'
      },
      {
        question: 'Do you offer in-person client meetings in Lahore?',
        answer: 'Project consultations and reviews are conducted remotely via structured video calls, email, and direct WhatsApp channels for speed and clear record-keeping.'
      },
      {
        question: 'How can we contact Starts Digital for a new project inquiry?',
        answer: 'You can fill out our Project Brief Form on the Contact page, email us directly at firdosidigital@gmail.com, or send a WhatsApp message to +92 339 4135544.'
      }
    ]
  }
];

export function getMarketPageById(id: string): MarketPageDefinition | undefined {
  return marketPages.find((m) => m.id === id || m.slug === id);
}

export function getMarketPageBySlug(slug: string): MarketPageDefinition | undefined {
  return marketPages.find((m) => m.slug === slug || m.id === slug);
}

export function getIndustryPages(): MarketPageDefinition[] {
  return marketPages.filter((m) => m.schemaType === 'industry');
}

export function getLahoreLocationPage(): MarketPageDefinition {
  return marketPages.find((m) => m.id === 'lahore')!;
}
