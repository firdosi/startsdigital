export interface ProjectVideo {
  id: string;
  youtubeId: string;
  projectId: 'my-coach-live' | 'convort-ai' | 'shopinq-online';
  title: string;
  description?: string;
  originalUrl: string;
}

export interface VideoProject {
  id: 'my-coach-live' | 'convort-ai' | 'shopinq-online';
  name: string;
  slug: string;
  route: string;
  status?: string;
  summary: string;
  website?: string;
  facebook?: string;
  videoCount: number;
  videoIds: string[];
}

export const videoProjects: Record<string, VideoProject> = {
  'my-coach-live': {
    id: 'my-coach-live',
    name: 'My Coach Live',
    slug: 'my-coach-live',
    route: '/work/my-coach-live/',
    status: 'ONGOING PROJECT',
    summary: 'Ongoing project support for a remote fitness coaching platform providing live trainer guidance, nutritionist support, session booking, workout history, progress tracking, and personalised diet plans for UK and US clients.',
    website: 'https://my-coach.live/',
    videoCount: 10,
    videoIds: [
      'V0Ax0MGuuNw',
      'AuRwX_tcLUk',
      'kNxaAF6NZMA',
      'KNoWgPy9UBU',
      'zficrS1CkU4',
      'gKTtFGIi8S8',
      'XFBvBAuc15A',
      'xGi53p3UmOM',
      'fE4YK6xdNco',
      'Yc7hwqNne_s'
    ]
  },
  'convort-ai': {
    id: 'convort-ai',
    name: 'ConvortAI',
    slug: 'convort-ai',
    route: '/work/convort-ai/',
    summary: 'Ongoing technology and growth partner for ConvortAI. Development of the ConvortAI web application, social media marketing, creative production, and digital growth operations.',
    website: 'https://convortai.com/',
    videoCount: 4,
    videoIds: [
      'NvXKjRNad6Q',
      'iGsC02Sr7T8',
      'QxpK5WZlvG4',
      'SVGmrlraDU4'
    ]
  },
  'shopinq-online': {
    id: 'shopinq-online',
    name: 'Shopinq Online',
    slug: 'shopinq-online',
    route: '/work/shopinq-online/',
    summary: 'Promoted startup product lines through paid social campaigns, creative content, customer communication, and order support.',
    facebook: 'https://www.facebook.com/shopinq.online/',
    videoCount: 16,
    videoIds: [
      'PnYdfatKb4I',
      'XeTorMUqw80',
      'QhIcLPeSJR0',
      'hX8ZygG_GUU',
      'iB_89uTqJAY',
      'TgcApiQdyK4',
      '7OAY8npAkZI',
      'JWuO6-18Hcc',
      '5s-p69DOayM',
      '2w9ueth0pAM',
      'rBYvM-QKGvQ',
      '6WX5tPVMQAM',
      'yu7822jlDtw',
      'xO9Xe2LO6co',
      'I4yBMpeYMt4',
      'Rs6tuXUOcf8'
    ]
  }
};

export const projectVideos: ProjectVideo[] = [
  // My Coach Live (10 Shorts)
  { id: 'mc-1', youtubeId: 'V0Ax0MGuuNw', projectId: 'my-coach-live', title: 'My Coach Live Video 1', originalUrl: 'https://youtube.com/shorts/V0Ax0MGuuNw?feature=share' },
  { id: 'mc-2', youtubeId: 'AuRwX_tcLUk', projectId: 'my-coach-live', title: 'My Coach Live Video 2', originalUrl: 'https://youtube.com/shorts/AuRwX_tcLUk?feature=share' },
  { id: 'mc-3', youtubeId: 'kNxaAF6NZMA', projectId: 'my-coach-live', title: 'My Coach Live Video 3', originalUrl: 'https://youtube.com/shorts/kNxaAF6NZMA?feature=share' },
  { id: 'mc-4', youtubeId: 'KNoWgPy9UBU', projectId: 'my-coach-live', title: 'My Coach Live Video 4', originalUrl: 'https://youtube.com/shorts/KNoWgPy9UBU?feature=share' },
  { id: 'mc-5', youtubeId: 'zficrS1CkU4', projectId: 'my-coach-live', title: 'My Coach Live Video 5', originalUrl: 'https://youtube.com/shorts/zficrS1CkU4?feature=share' },
  { id: 'mc-6', youtubeId: 'gKTtFGIi8S8', projectId: 'my-coach-live', title: 'My Coach Live Video 6', originalUrl: 'https://youtube.com/shorts/gKTtFGIi8S8?feature=share' },
  { id: 'mc-7', youtubeId: 'XFBvBAuc15A', projectId: 'my-coach-live', title: 'My Coach Live Video 7', originalUrl: 'https://youtube.com/shorts/XFBvBAuc15A?feature=share' },
  { id: 'mc-8', youtubeId: 'xGi53p3UmOM', projectId: 'my-coach-live', title: 'My Coach Live Video 8', originalUrl: 'https://youtube.com/shorts/xGi53p3UmOM?feature=share' },
  { id: 'mc-9', youtubeId: 'fE4YK6xdNco', projectId: 'my-coach-live', title: 'My Coach Live Video 9', originalUrl: 'https://youtube.com/shorts/fE4YK6xdNco?feature=share' },
  { id: 'mc-10', youtubeId: 'Yc7hwqNne_s', projectId: 'my-coach-live', title: 'My Coach Live Video 10', originalUrl: 'https://youtube.com/shorts/Yc7hwqNne_s?feature=share' },

  // ConvortAI (4 Shorts)
  { id: 'ca-1', youtubeId: 'NvXKjRNad6Q', projectId: 'convort-ai', title: 'ConvortAI Short 1', originalUrl: 'https://youtube.com/shorts/NvXKjRNad6Q?feature=share' },
  { id: 'ca-2', youtubeId: 'iGsC02Sr7T8', projectId: 'convort-ai', title: 'ConvortAI Short 2', originalUrl: 'https://youtube.com/shorts/iGsC02Sr7T8?feature=share' },
  { id: 'ca-3', youtubeId: 'QxpK5WZlvG4', projectId: 'convort-ai', title: 'ConvortAI Short 3', originalUrl: 'https://youtube.com/shorts/QxpK5WZlvG4?feature=share' },
  { id: 'ca-4', youtubeId: 'SVGmrlraDU4', projectId: 'convort-ai', title: 'ConvortAI Short 4', originalUrl: 'https://youtube.com/shorts/SVGmrlraDU4?feature=share' },

  // Shopinq Online (16 Shorts)
  { id: 'so-1', youtubeId: 'PnYdfatKb4I', projectId: 'shopinq-online', title: 'Shopinq Online Short 1', originalUrl: 'https://youtube.com/shorts/PnYdfatKb4I?feature=share' },
  { id: 'so-2', youtubeId: 'XeTorMUqw80', projectId: 'shopinq-online', title: 'Shopinq Online Short 2', originalUrl: 'https://youtube.com/shorts/XeTorMUqw80?feature=share' },
  { id: 'so-3', youtubeId: 'QhIcLPeSJR0', projectId: 'shopinq-online', title: 'Shopinq Online Short 3', originalUrl: 'https://youtube.com/shorts/QhIcLPeSJR0?feature=share' },
  { id: 'so-4', youtubeId: 'hX8ZygG_GUU', projectId: 'shopinq-online', title: 'Shopinq Online Short 4', originalUrl: 'https://youtube.com/shorts/hX8ZygG_GUU?feature=share' },
  { id: 'so-5', youtubeId: 'iB_89uTqJAY', projectId: 'shopinq-online', title: 'Shopinq Online Short 5', originalUrl: 'https://youtube.com/shorts/iB_89uTqJAY?feature=share' },
  { id: 'so-6', youtubeId: 'TgcApiQdyK4', projectId: 'shopinq-online', title: 'Shopinq Online Short 6', originalUrl: 'https://youtube.com/shorts/TgcApiQdyK4?feature=share' },
  { id: 'so-7', youtubeId: '7OAY8npAkZI', projectId: 'shopinq-online', title: 'Shopinq Online Short 7', originalUrl: 'https://youtube.com/shorts/7OAY8npAkZI?feature=share' },
  { id: 'so-8', youtubeId: 'JWuO6-18Hcc', projectId: 'shopinq-online', title: 'Shopinq Online Short 8', originalUrl: 'https://youtube.com/shorts/JWuO6-18Hcc?feature=share' },
  { id: 'so-9', youtubeId: '5s-p69DOayM', projectId: 'shopinq-online', title: 'Shopinq Online Short 9', originalUrl: 'https://youtube.com/shorts/5s-p69DOayM?feature=share' },
  { id: 'so-10', youtubeId: '2w9ueth0pAM', projectId: 'shopinq-online', title: 'Shopinq Online Short 10', originalUrl: 'https://youtube.com/shorts/2w9ueth0pAM?feature=share' },
  { id: 'so-11', youtubeId: 'rBYvM-QKGvQ', projectId: 'shopinq-online', title: 'Shopinq Online Short 11', originalUrl: 'https://youtube.com/shorts/rBYvM-QKGvQ?feature=share' },
  { id: 'so-12', youtubeId: '6WX5tPVMQAM', projectId: 'shopinq-online', title: 'Shopinq Online Short 12', originalUrl: 'https://youtube.com/shorts/6WX5tPVMQAM?feature=share' },
  { id: 'so-13', youtubeId: 'yu7822jlDtw', projectId: 'shopinq-online', title: 'Shopinq Online Short 13', originalUrl: 'https://youtube.com/shorts/yu7822jlDtw?feature=share' },
  { id: 'so-14', youtubeId: 'xO9Xe2LO6co', projectId: 'shopinq-online', title: 'Shopinq Online Short 14', originalUrl: 'https://youtube.com/shorts/xO9Xe2LO6co?feature=share' },
  { id: 'so-15', youtubeId: 'I4yBMpeYMt4', projectId: 'shopinq-online', title: 'Shopinq Online Short 15', originalUrl: 'https://youtube.com/shorts/I4yBMpeYMt4?feature=share' },
  { id: 'so-16', youtubeId: 'Rs6tuXUOcf8', projectId: 'shopinq-online', title: 'Shopinq Online Short 16', originalUrl: 'https://youtube.com/shorts/Rs6tuXUOcf8?feature=share' }
];
