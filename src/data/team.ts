export interface TeamMember {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  responsibilities: string[];
  image?: string;
  imageApproved?: boolean;
  isFounder?: boolean;
  linkedin?: string;
  homepageVisible: boolean;
  aboutVisible: boolean;
  approvedForPublic: boolean;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'ahad-firdosi',
    name: 'Ahad Firdosi',
    role: 'Owner & CEO',
    shortBio: 'Ahad leads project planning, digital marketing execution and team coordination across Starts Digital client work.',
    responsibilities: [
      'Project Management',
      'Digital Marketing',
      'Team Coordination'
    ],
    linkedin: 'https://www.linkedin.com/in/ahadfirdosi/',
    homepageVisible: true,
    aboutVisible: true,
    approvedForPublic: true,
    isFounder: true,
    order: 1,
    imageApproved: false
  },
  {
    id: 'meesam',
    name: 'Meesam',
    role: 'Video Editor & Graphic Designer',
    shortBio: 'Meesam produces video edits and graphic assets for advertising, social media and brand communication.',
    responsibilities: [
      'Video Editing',
      'Graphic Design'
    ],
    linkedin: 'https://www.linkedin.com/in/syed-meesam-abbas-a5241033a',
    homepageVisible: true,
    aboutVisible: true,
    approvedForPublic: true,
    isFounder: false,
    order: 2,
    imageApproved: false
  }
];
