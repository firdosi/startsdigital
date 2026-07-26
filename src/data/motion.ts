export type MotionDuration = 'fast' | 'standard' | 'slow';
export type MotionDistance = 'subtle' | 'standard';
export type MotionEasing = 'entrance' | 'exit' | 'interactive';
export type MotionEntranceType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';

export interface MotionConfig {
  durations: Record<MotionDuration, number>;
  distances: Record<MotionDistance, number>;
  easings: Record<MotionEasing, string>;
  allowedEntrances: MotionEntranceType[];
}

export const motionTokens: MotionConfig = {
  durations: {
    fast: 180,       // 180ms fast feedback
    standard: 320,   // 320ms natural reveal
    slow: 480        // 480ms deliberate entrance (max 550ms limit)
  },
  distances: {
    subtle: 12,      // 12px mobile max
    standard: 20     // 20px desktop max
  },
  easings: {
    entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
    interactive: 'cubic-bezier(0.2, 0, 0, 1)'
  },
  allowedEntrances: ['fade-up', 'fade-left', 'fade-right', 'scale-in']
};

export function isAllowedEntrance(type: string): type is MotionEntranceType {
  return (motionTokens.allowedEntrances as string[]).includes(type);
}

export function getMotionStyles(entrance: MotionEntranceType, duration: MotionDuration = 'standard'): string {
  const durMs = motionTokens.durations[duration];
  const easing = motionTokens.easings.entrance;

  return `transition: opacity ${durMs}ms ${easing}, transform ${durMs}ms ${easing};`;
}
