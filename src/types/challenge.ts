export type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'custom';
export type ChallengeStatus = 'upcoming' | 'active' | 'completed' | 'expired';

export interface Challenge {
  $id: string;
  title: string;
  description: string;
  type: ChallengeType;
  status: ChallengeStatus;
  startDate: string;
  endDate: string;
  target: number;
  unit: string;
  category: string;
  points: number;
  badge?: string;
  participants: string[];
  createdBy: string;
  isPublic: boolean;
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
}

export interface ChallengeRequirement {
  actionType: string;
  quantity: number;
  description: string;
}

export interface ChallengeReward {
  type: 'points' | 'badge' | 'achievement';
  value: string | number;
  description: string;
}

export interface UserChallenge {
  $id: string;
  challengeId: string;
  userId: string;
  progress: number;
  target: number;
  status: ChallengeStatus;
  joinedAt: string;
  completedAt?: string;
  rewards: ChallengeReward[];
}

export interface ChallengeLeaderboard {
  challengeId: string;
  participants: {
    userId: string;
    name: string;
    avatar?: string;
    progress: number;
    rank: number;
  }[];
}
