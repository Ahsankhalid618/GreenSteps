import { databases, DB_CONFIG } from "@/tools/appwrite";
import { ID, Query } from "appwrite";


// Badge definitions and management

export interface BadgeDefinition {
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
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  points: number;
  description?: string;
}

export interface CreateBadgeDefinitionData {
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
}

// Initialize default badges
export async function initializeDefaultBadges(): Promise<void> {
  const defaultBadges: CreateBadgeDefinitionData[] = [
    {
      name: "First Steps",
      description: "Completed your first eco-action",
      icon: "👣",
      rarity: "common",
      category: "milestone",
      conditions: [{ type: "actions", value: 1, operator: "gte" }],
      points: 10,
    },
    {
      name: "Streak Starter",
      description: "Maintained a 3-day streak",
      icon: "🔥",
      rarity: "common",
      category: "streak",
      conditions: [{ type: "streak", value: 3, operator: "gte" }],
      points: 25,
    },
    {
      name: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: "⚔️",
      rarity: "rare",
      category: "streak",
      conditions: [{ type: "streak", value: 7, operator: "gte" }],
      points: 50,
    },
    {
      name: "Carbon Crusher",
      description: "Saved 10kg of CO₂",
      icon: "🌍",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "carbon", value: 10, operator: "gte" }],
      points: 75,
    },
    {
      name: "Water Warrior",
      description: "Saved 100 liters of water",
      icon: "💧",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "water", value: 100, operator: "gte" }],
      points: 75,
    },
    {
      name: "Waste Warrior",
      description: "Reduced 5kg of waste",
      icon: "♻️",
      rarity: "rare",
      category: "impact",
      conditions: [{ type: "waste", value: 5, operator: "gte" }],
      points: 75,
    },
    {
      name: "Point Collector",
      description: "Earned 500 points",
      icon: "⭐",
      rarity: "epic",
      category: "milestone",
      conditions: [{ type: "points", value: 500, operator: "gte" }],
      points: 100,
    },
    {
      name: "Eco Champion",
      description: "Earned 1000 points",
      icon: "🏆",
      rarity: "epic",
      category: "milestone",
      conditions: [{ type: "points", value: 1000, operator: "gte" }],
      points: 200,
    },
    {
      name: "Streak Master",
      description: "Maintained a 30-day streak",
      icon: "🔥🔥",
      rarity: "epic",
      category: "streak",
      conditions: [{ type: "streak", value: 30, operator: "gte" }],
      points: 300,
    },
    {
      name: "Transportation Expert",
      description: "Completed 10 transportation actions",
      icon: "🚲",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      name: "Energy Saver",
      description: "Completed 10 energy actions",
      icon: "⚡",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      name: "Waste Reducer",
      description: "Completed 10 waste actions",
      icon: "🗑️",
      rarity: "rare",
      category: "category",
      conditions: [{ type: "category", value: 10, operator: "gte" }],
      points: 50,
    },
    {
      name: "Legendary Streak",
      description: "Maintained a 100-day streak",
      icon: "👑",
      rarity: "legendary",
      category: "streak",
      conditions: [{ type: "streak", value: 100, operator: "gte" }],
      points: 1000,
    },
    {
      name: "Planet Saver",
      description: "Saved 100kg of CO₂",
      icon: "🌍",
      rarity: "legendary",
      category: "impact",
      conditions: [{ type: "carbon", value: 100, operator: "gte" }],
      points: 500,
    },
  ];

  try {
    for (const badgeData of defaultBadges) {
      await createBadgeDefinition(badgeData);
    }
  } catch (error) {
    console.error("Error initializing default badges:", error);
    throw new Error("Failed to initialize default badges. Please try again.");
  }
}

// Create badge definition
export async function createBadgeDefinition(
  badgeData: CreateBadgeDefinitionData,
): Promise<BadgeDefinition> {
  try {
    const badge = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.badges,
      ID.unique(),
      {
        name: badgeData.name,
        description: badgeData.description,
        icon: badgeData.icon,
        rarity: badgeData.rarity,
        category: badgeData.category,
        conditions: badgeData.conditions,
        points: badgeData.points,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    );

    return {
      id: badge.$id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      rarity: badge.rarity,
      category: badge.category,
      conditions: badge.conditions,
      points: badge.points,
      isActive: badge.isActive,
      createdAt: badge.$createdAt,
      updatedAt: badge.updatedAt,
    };
  } catch (error) {
    console.error("Error creating badge definition:", error);
    throw new Error("Failed to create badge definition. Please try again.");
  }
}

// Get all badge definitions
export async function getAllBadgeDefinitions(): Promise<BadgeDefinition[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.badges,
      [Query.equal("isActive", true)],
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      description: doc.description,
      icon: doc.icon,
      rarity: doc.rarity,
      category: doc.category,
      conditions: doc.conditions,
      points: doc.points,
      isActive: doc.isActive,
      createdAt: doc.$createdAt,
      updatedAt: doc.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching badge definitions:", error);
    throw new Error("Failed to load badge definitions. Please try again.");
  }
}

// Get user's earned badges
export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.achievements,
      [Query.equal("userId", userId), Query.orderDesc("earnedAt")],
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      badgeId: doc.badgeId,
      earnedAt: doc.earnedAt,
      points: doc.points,
      description: doc.description,
    }));
  } catch (error) {
    console.error("Error fetching user badges:", error);
    throw new Error("Failed to load user badges. Please try again.");
  }
}

// Award badge to user
export async function awardBadgeToUser(
  userId: string,
  badgeId: string,
  points: number,
  description?: string,
): Promise<UserBadge> {
  try {
    const userBadge = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.achievements,
      ID.unique(),
      {
        userId: userId,
        badgeId: badgeId,
        earnedAt: new Date().toISOString(),
        points: points,
        description: description,
      },
    );

    return {
      id: userBadge.$id,
      userId: userBadge.userId,
      badgeId: userBadge.badgeId,
      earnedAt: userBadge.earnedAt,
      points: userBadge.points,
      description: userBadge.description,
    };
  } catch (error) {
    console.error("Error awarding badge to user:", error);
    throw new Error("Failed to award badge. Please try again.");
  }
}

// Check if user has specific badge
export async function userHasBadge(
  userId: string,
  badgeId: string,
): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.achievements,
      [Query.equal("userId", userId), Query.equal("badgeId", badgeId)],
    );

    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking user badge:", error);
    return false;
  }
}

// Get badge statistics
export async function getBadgeStatistics(): Promise<{
  totalBadges: number;
  badgesByRarity: Record<string, number>;
  badgesByCategory: Record<string, number>;
  mostEarnedBadges: Array<{
    badgeId: string;
    name: string;
    earnedCount: number;
  }>;
}> {
  try {
    const [badgesResponse, achievementsResponse] = await Promise.all([
      databases.listDocuments(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.badges,
        [Query.equal("isActive", true)],
      ),
      databases.listDocuments(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.achievements,
      ),
    ]);

    const badges = badgesResponse.documents;
    const achievements = achievementsResponse.documents;

    const badgesByRarity: Record<string, number> = {};
    const badgesByCategory: Record<string, number> = {};
    const badgeEarnedCount: Record<string, number> = {};

    badges.forEach((badge) => {
      badgesByRarity[badge.rarity] = (badgesByRarity[badge.rarity] || 0) + 1;
      badgesByCategory[badge.category] =
        (badgesByCategory[badge.category] || 0) + 1;
    });

    achievements.forEach((achievement) => {
      badgeEarnedCount[achievement.badgeId] =
        (badgeEarnedCount[achievement.badgeId] || 0) + 1;
    });

    const mostEarnedBadges = Object.entries(badgeEarnedCount)
      .map(([badgeId, count]) => {
        const badge = badges.find((b) => b.$id === badgeId);
        return {
          badgeId,
          name: badge?.name || "Unknown",
          earnedCount: count,
        };
      })
      .sort((a, b) => b.earnedCount - a.earnedCount)
      .slice(0, 10);

    return {
      totalBadges: badges.length,
      badgesByRarity,
      badgesByCategory,
      mostEarnedBadges,
    };
  } catch (error) {
    console.error("Error fetching badge statistics:", error);
    throw new Error("Failed to load badge statistics. Please try again.");
  }
}
