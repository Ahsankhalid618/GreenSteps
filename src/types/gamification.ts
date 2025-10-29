export interface Badge {
  $id: string;
  name: string;
  description: string;
  icon: string;
  category: "action" | "streak" | "challenge" | "milestone" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  requirements: BadgeRequirement[];
  unlockedBy: string[];
}

export interface BadgeRequirement {
  type: "action_count" | "streak" | "points" | "category" | "challenge";
  value: number | string;
  description: string;
}

export interface Achievement {
  $id: string;
  title: string;
  description: string;
  icon: string;
  category: "milestone" | "special" | "community";
  points: number;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface Level {
  level: number;
  name: string;
  pointsRequired: number;
  color: string;
  benefits: string[];
  badge?: string;
}

export interface PointsTransaction {
  $id: string;
  userId: string;
  amount: number;
  type: "earned" | "spent" | "bonus" | "penalty";
  source: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  actions: number;
  streak: number;
  change?: number; // rank change from previous period
}

export interface GamificationStats {
  totalPoints: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  rank: number;
  pointsThisWeek: number;
  pointsThisMonth: number;
}
