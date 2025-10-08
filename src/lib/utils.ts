// Utility functions for GreenSteps

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Action } from "./actions";

/**
 * Utility function to combine class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Gamification utility functions for GreenSteps

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  level: number;
  badges: string[];
  totalActions: number;
  carbonSaved: number;
  waterSaved: number;
  wasteReduced: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: string;
  conditions: {
    type:
      | "points"
      | "streak"
      | "actions"
      | "category"
      | "carbon"
      | "water"
      | "waste";
    value: number;
    operator: "gte" | "eq" | "lt";
  }[];
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Level {
  name: string;
  level: number;
  minPoints: number;
  maxPoints: number;
  color: string;
  icon: string;
  description: string;
}

// Level definitions
export const LEVELS: Level[] = [
  {
    name: "Seedling",
    level: 1,
    minPoints: 0,
    maxPoints: 100,
    color: "text-green-500",
    icon: "🌱",
    description: "Just starting your eco-journey",
  },
  {
    name: "Sprout",
    level: 2,
    minPoints: 100,
    maxPoints: 300,
    color: "text-green-600",
    icon: "🌿",
    description: "Growing your green habits",
  },
  {
    name: "Sapling",
    level: 3,
    minPoints: 300,
    maxPoints: 600,
    color: "text-green-700",
    icon: "🌳",
    description: "Developing sustainable practices",
  },
  {
    name: "Tree",
    level: 4,
    minPoints: 600,
    maxPoints: 1000,
    color: "text-green-800",
    icon: "🌲",
    description: "A strong environmental advocate",
  },
  {
    name: "Forest Guardian",
    level: 5,
    minPoints: 1000,
    maxPoints: 1500,
    color: "text-emerald-600",
    icon: "🌲",
    description: "Protecting our planet",
  },
  {
    name: "Eco Champion",
    level: 6,
    minPoints: 1500,
    maxPoints: 2500,
    color: "text-emerald-700",
    icon: "🏆",
    description: "Leading environmental change",
  },
  {
    name: "Earth Hero",
    level: 7,
    minPoints: 2500,
    maxPoints: 4000,
    color: "text-blue-600",
    icon: "🦸",
    description: "Making a global impact",
  },
  {
    name: "Planet Savior",
    level: 8,
    minPoints: 4000,
    maxPoints: 6000,
    color: "text-purple-600",
    icon: "🌟",
    description: "Saving the world, one action at a time",
  },
  {
    name: "Eco Legend",
    level: 9,
    minPoints: 6000,
    maxPoints: 10000,
    color: "text-yellow-600",
    icon: "👑",
    description: "Legendary environmental warrior",
  },
  {
    name: "Green Deity",
    level: 10,
    minPoints: 10000,
    maxPoints: Infinity,
    color: "text-rainbow",
    icon: "✨",
    description: "The ultimate environmental protector",
  },
];

// Difficulty multipliers
export const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

// Streak bonuses
export const STREAK_BONUSES = {
  3: 1.1, // 10% bonus at 3 days
  7: 1.2, // 20% bonus at 7 days
  14: 1.3, // 30% bonus at 14 days
  30: 1.5, // 50% bonus at 30 days
  100: 2.0, // 100% bonus at 100 days
};

/**
 * Calculate points for an action
 */
export function calculatePoints(
  basePoints: number,
  difficulty: "easy" | "medium" | "hard",
  streak: number = 0,
): number {
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  let streakMultiplier = 1;

  // Find the highest streak bonus that applies
  for (const [streakDays, bonus] of Object.entries(STREAK_BONUSES)) {
    if (streak >= parseInt(streakDays)) {
      streakMultiplier = bonus;
    }
  }

  return Math.round(basePoints * difficultyMultiplier * streakMultiplier);
}

/**
 * Get user's current level based on total points
 */
export function getLevel(points: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0]; // Fallback to first level
}

/**
 * Get progress to next level
 */
export function getLevelProgress(points: number): {
  current: Level;
  next: Level | null;
  progress: number;
  pointsToNext: number;
} {
  const current = getLevel(points);
  const currentIndex = LEVELS.findIndex(
    (level) => level.level === current.level,
  );
  const next =
    currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  const progress = next
    ? ((points - current.minPoints) / (next.minPoints - current.minPoints)) *
      100
    : 100;

  const pointsToNext = next ? next.minPoints - points : 0;

  return {
    current,
    next,
    progress: Math.min(100, Math.max(0, progress)),
    pointsToNext,
  };
}

/**
 * Check if user has unlocked any new badges
 */
export function checkBadgeUnlocks(
  user: UserStats,
  recentActions: Action[],
): Badge[] {
  const unlockedBadges: Badge[] = [];

  // Define badge conditions
  const badgeDefinitions: Omit<Badge, "unlocked" | "unlockedAt">[] = [
    {
      id: "first-steps",
      name: "First Steps",
      description: "Completed your first eco-action",
      icon: "👣",
      rarity: "common",
      category: "milestone",
      conditions: [{ type: "actions", value: 1, operator: "gte" }],
      points: 10,
    },
    {
      id: "streak-starter",
      name: "Streak Starter",
      description: "Maintained a 3-day streak",
      icon: "🔥",
      rarity: "common",
      category: "streak",
      conditions: [{ type: "streak", value: 3, operator: "gte" }],
      points: 25,
    },
    {
      id: "week-warrior",
      name: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: "⚔️",
      rarity: "rare",
      category: "streak",
      conditions: [{ type: "streak", value: 7, operator: "gte" }],
      points: 50,
    },
    {
      id: "carbon-crusher",
      name: "Carbon Crusher",
      description: "Saved 10kg of CO₂",
      icon: "🌍",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "carbon", value: 10, operator: "gte" }],
      points: 75,
    },
    {
      id: "water-warrior",
      name: "Water Warrior",
      description: "Saved 100 liters of water",
      icon: "💧",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "water", value: 100, operator: "gte" }],
      points: 75,
    },
    {
      id: "waste-warrior",
      name: "Waste Warrior",
      description: "Reduced 5kg of waste",
      icon: "♻️",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "waste", value: 5, operator: "gte" }],
      points: 75,
    },
    {
      id: "point-collector",
      name: "Point Collector",
      description: "Earned 500 points",
      icon: "⭐",
      rarity: "epic",
      category: "milestone",
      conditions: [{ type: "points", value: 500, operator: "gte" }],
      points: 100,
    },
    {
      id: "eco-champion",
      name: "Eco Champion",
      description: "Earned 1000 points",
      icon: "🏆",
      rarity: "epic",
      category: "milestone",
      conditions: [{ type: "points", value: 1000, operator: "gte" }],
      points: 200,
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintained a 30-day streak",
      icon: "🔥🔥",
      rarity: "epic",
      category: "streak",
      conditions: [{ type: "streak", value: 30, operator: "gte" }],
      points: 300,
    },
    {
      id: "transportation-expert",
      name: "Transportation Expert",
      description: "Completed 10 transportation actions",
      icon: "🚲",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      id: "energy-saver",
      name: "Energy Saver",
      description: "Completed 10 energy actions",
      icon: "⚡",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      id: "waste-reducer",
      name: "Waste Reducer",
      description: "Completed 10 waste actions",
      icon: "🗑️",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      id: "legendary-streak",
      name: "Legendary Streak",
      description: "Maintained a 100-day streak",
      icon: "👑",
      rarity: "legendary",
      category: "streak",
      conditions: [{ type: "streak", value: 100, operator: "gte" }],
      points: 1000,
    },
    {
      id: "planet-saver",
      name: "Planet Saver",
      description: "Saved 100kg of CO₂",
      icon: "🌍",
      rarity: "legendary",
      category: "impact",
      conditions: [{ type: "carbon", value: 100, operator: "gte" }],
      points: 500,
    },
  ];

  // Check each badge condition
  for (const badgeDef of badgeDefinitions) {
    // Skip if user already has this badge
    if (user.badges.includes(badgeDef.id)) continue;

    let shouldUnlock = true;

    for (const condition of badgeDef.conditions) {
      let userValue: number;

      switch (condition.type) {
        case "points":
          userValue = user.totalPoints;
          break;
        case "streak":
          userValue = user.currentStreak;
          break;
        case "actions":
          userValue = user.totalActions;
          break;
        case "carbon":
          userValue = user.carbonSaved;
          break;
        case "water":
          userValue = user.waterSaved;
          break;
        case "waste":
          userValue = user.wasteReduced;
          break;
        case "category":
          // Count actions by category from recent actions
          userValue = recentActions.filter(
            (action) => action.category === condition.value.toString(),
          ).length;
          break;
        default:
          userValue = 0;
      }

      // Check condition
      switch (condition.operator) {
        case "gte":
          if (userValue < condition.value) shouldUnlock = false;
          break;
        case "eq":
          if (userValue !== condition.value) shouldUnlock = false;
          break;
        case "lt":
          if (userValue >= condition.value) shouldUnlock = false;
          break;
      }

      if (!shouldUnlock) break;
    }

    if (shouldUnlock) {
      unlockedBadges.push({
        ...badgeDef,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      });
    }
  }

  return unlockedBadges;
}

/**
 * Get badge rarity color
 */
export function getBadgeRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "text-gray-600 bg-gray-100";
    case "rare":
      return "text-blue-600 bg-blue-100";
    case "epic":
      return "text-purple-600 bg-purple-100";
    case "legendary":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Calculate streak bonus percentage
 */
export function getStreakBonus(streak: number): number {
  let bonus = 0;
  for (const [streakDays, bonusValue] of Object.entries(STREAK_BONUSES)) {
    if (streak >= parseInt(streakDays)) {
      bonus = (bonusValue - 1) * 100; // Convert to percentage
    }
  }
  return bonus;
}
