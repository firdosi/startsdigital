export interface ReleaseInfo {
  roadmapStage: string;
  releaseStatus: string;
  currentDeployment: string;
  customDomainStatus: string;
  approvedClientCount: number;
  detailedStoryCount: number;
  clientExperienceCount: number;
}

export const releaseInfo: ReleaseInfo = {
  roadmapStage: '7.3',
  releaseStatus: 'pre-launch-approved',
  currentDeployment: 'github-pages',
  customDomainStatus: 'pending-roadmap-8-1',
  approvedClientCount: 12,
  detailedStoryCount: 4,
  clientExperienceCount: 8
};
