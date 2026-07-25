export interface TeamMember {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  responsibilities: string[];
  image: string;
  linkedin?: string;
  homepageVisible: boolean;
  aboutVisible: boolean;
  approvedForPublic: boolean;
  order: number;
}

// Initial teamMembers array remains strictly empty until user supplies verified, approved public information.
export const teamMembers: TeamMember[] = [];
