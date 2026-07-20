export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processData: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    description: 'Learn the business, audience, offer, challenges and goals.'
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Create the strategy, priorities, channels and roadmap.'
  },
  {
    step: '03',
    title: 'Build',
    description: 'Develop campaigns, websites, content, tracking and marketing assets.'
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Publish with proper testing, measurement and quality checks.'
  },
  {
    step: '05',
    title: 'Measure',
    description: 'Review leads, sales, visibility, behaviour and campaign performance.'
  },
  {
    step: '06',
    title: 'Improve',
    description: 'Use real performance data to refine the strategy continuously.'
  }
];
