import { databases, DB_CONFIG } from "@/tools/appwrite";
import { ID, Query } from "appwrite";
import { UserStats } from "./utils";

// User profile and statistics management

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  totalPoints: number;
  currentStreak: number;
  level: number;
  badges: string[];
  totalActions: number;
  carbonSaved: number;
  waterSaved: number;
  wasteReduced: number;
  preferences: {
    notifications: boolean;
    weeklyGoal: number;
    theme: "light" | "dark" | "auto";
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserProfileData {
  userId: string;
  name: string;
  email: string;
  preferences?: {
    notifications: boolean;
    weeklyGoal: number;
    theme: "light" | "dark" | "auto";
  };
}

// Create or update user profile
export async function createOrUpdateUserProfile(
  userData: CreateUserProfileData,
): Promise<UserProfile> {
  try {
    // Check if user profile already exists
    const existingProfiles = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      [Query.equal("userId", userData.userId)],
    );

    if (existingProfiles.documents.length > 0) {
      // Update existing profile
      const existingProfile = existingProfiles.documents[0];
      const updatedProfile = await databases.updateDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.users,
        existingProfile.$id,
        {
          name: userData.name,
          email: userData.email,
          preferences: userData.preferences || {
            notifications: true,
            weeklyGoal: 5,
            theme: "auto",
          },
          updatedAt: new Date().toISOString(),
        },
      );

      return {
        id: updatedProfile.$id,
        userId: updatedProfile.userId,
        name: updatedProfile.name,
        email: updatedProfile.email,
        totalPoints: updatedProfile.totalPoints,
        currentStreak: updatedProfile.currentStreak,
        level: updatedProfile.level,
        badges: updatedProfile.badges,
        totalActions: updatedProfile.totalActions,
        carbonSaved: updatedProfile.carbonSaved,
        waterSaved: updatedProfile.waterSaved,
        wasteReduced: updatedProfile.wasteReduced,
        preferences: updatedProfile.preferences,
        createdAt: updatedProfile.$createdAt,
        updatedAt: updatedProfile.updatedAt,
      };
    } else {
      // Create new profile
      const newProfile = await databases.createDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.users,
        ID.unique(),
        {
          userId: userData.userId,
          name: userData.name,
          email: userData.email,
          totalPoints: 0,
          currentStreak: 0,
          level: 1,
          badges: [],
          totalActions: 0,
          carbonSaved: 0,
          waterSaved: 0,
          wasteReduced: 0,
          preferences: userData.preferences || {
            notifications: true,
            weeklyGoal: 5,
            theme: "auto",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      );

      return {
        id: newProfile.$id,
        userId: newProfile.userId,
        name: newProfile.name,
        email: newProfile.email,
        totalPoints: newProfile.totalPoints,
        currentStreak: newProfile.currentStreak,
        level: newProfile.level,
        badges: newProfile.badges,
        totalActions: newProfile.totalActions,
        carbonSaved: newProfile.carbonSaved,
        waterSaved: newProfile.waterSaved,
        wasteReduced: newProfile.wasteReduced,
        preferences: newProfile.preferences,
        createdAt: newProfile.$createdAt,
        updatedAt: newProfile.updatedAt,
      };
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    throw new Error("Failed to create/update user profile. Please try again.");
  }
}

// Get user profile
export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      [Query.equal("userId", userId)],
    );

    if (response.documents.length === 0) {
      return null;
    }

    const profile = response.documents[0];
    return {
      id: profile.$id,
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      totalPoints: profile.totalPoints,
      currentStreak: profile.currentStreak,
      level: profile.level,
      badges: profile.badges,
      totalActions: profile.totalActions,
      carbonSaved: profile.carbonSaved,
      waterSaved: profile.waterSaved,
      wasteReduced: profile.wasteReduced,
      preferences: profile.preferences,
      createdAt: profile.$createdAt,
      updatedAt: profile.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to load user profile. Please try again.");
  }
}

// Update user stats after action
export async function updateUserStats(
  userId: string,
  stats: Partial<UserStats>,
): Promise<UserProfile> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    const updatedProfile = await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      profile.id,
      {
        totalPoints: stats.totalPoints ?? profile.totalPoints,
        currentStreak: stats.currentStreak ?? profile.currentStreak,
        level: stats.level ?? profile.level,
        badges: stats.badges ?? profile.badges,
        totalActions: stats.totalActions ?? profile.totalActions,
        carbonSaved: stats.carbonSaved ?? profile.carbonSaved,
        waterSaved: stats.waterSaved ?? profile.waterSaved,
        wasteReduced: stats.wasteReduced ?? profile.wasteReduced,
        updatedAt: new Date().toISOString(),
      },
    );

    return {
      id: updatedProfile.$id,
      userId: updatedProfile.userId,
      name: updatedProfile.name,
      email: updatedProfile.email,
      totalPoints: updatedProfile.totalPoints,
      currentStreak: updatedProfile.currentStreak,
      level: updatedProfile.level,
      badges: updatedProfile.badges,
      totalActions: updatedProfile.totalActions,
      carbonSaved: updatedProfile.carbonSaved,
      waterSaved: updatedProfile.waterSaved,
      wasteReduced: updatedProfile.wasteReduced,
      preferences: updatedProfile.preferences,
      createdAt: updatedProfile.$createdAt,
      updatedAt: updatedProfile.updatedAt,
    };
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw new Error("Failed to update user stats. Please try again.");
  }
}

// Update user profile information
export async function updateUserProfile(
  userId: string,
  profileData: {
    name?: string;
    email?: string;
    preferences?: {
      notifications?: boolean;
      weeklyGoal?: number;
      theme?: "light" | "dark" | "auto";
    };
  },
): Promise<UserProfile> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    const updatedProfile = await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      profile.id,
      {
        name: profileData.name ?? profile.name,
        email: profileData.email ?? profile.email,
        preferences: profileData.preferences
          ? { ...profile.preferences, ...profileData.preferences }
          : profile.preferences,
        updatedAt: new Date().toISOString(),
      },
    );

    return {
      id: updatedProfile.$id,
      userId: updatedProfile.userId,
      name: updatedProfile.name,
      email: updatedProfile.email,
      totalPoints: updatedProfile.totalPoints,
      currentStreak: updatedProfile.currentStreak,
      level: updatedProfile.level,
      badges: updatedProfile.badges,
      totalActions: updatedProfile.totalActions,
      carbonSaved: updatedProfile.carbonSaved,
      waterSaved: updatedProfile.waterSaved,
      wasteReduced: updatedProfile.wasteReduced,
      preferences: updatedProfile.preferences,
      createdAt: updatedProfile.$createdAt,
      updatedAt: updatedProfile.updatedAt,
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile. Please try again.");
  }
}

// Add badge to user
export async function addBadgeToUser(
  userId: string,
  badgeId: string,
): Promise<void> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    if (!profile.badges.includes(badgeId)) {
      await databases.updateDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.users,
        profile.id,
        {
          badges: [...profile.badges, badgeId],
          updatedAt: new Date().toISOString(),
        },
      );
    }
  } catch (error) {
    console.error("Error adding badge to user:", error);
    throw new Error("Failed to add badge. Please try again.");
  }
}

// Update user profile when they complete an eco action
export async function updateUserProfileFromAction(
  userId: string,
  actionData: {
    points: number;
    carbonSaved?: number;
    waterSaved?: number;
    wasteReduced?: number;
    category?: string;
  },
): Promise<UserProfile> {
  try { 
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    // Calculate new stats
    const newTotalPoints = profile.totalPoints + actionData.points;
    const newTotalActions = profile.totalActions + 1;
    const newCarbonSaved = profile.carbonSaved + (actionData.carbonSaved || 0);
    const newWaterSaved = profile.waterSaved + (actionData.waterSaved || 0);
    const newWasteReduced =
      profile.wasteReduced + (actionData.wasteReduced || 0);

    // Calculate new level based on points (every 1000 points = 1 level)
    const newLevel = Math.floor(newTotalPoints / 1000) + 1;

    // Update streak logic (you might want to implement proper streak tracking)
    const today = new Date().toDateString();
    const lastAction = profile.updatedAt
      ? new Date(profile.updatedAt).toDateString()
      : null;
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    let newStreak = profile.currentStreak;
    if (lastAction === yesterday) {
      newStreak += 1; // Continue streak
    } else if (lastAction !== today) {
      newStreak = 1; // Start new streak
    }
    // If lastAction === today, keep current streak (same day action)

    const updatedProfile = await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      profile.id,
      {
        totalPoints: newTotalPoints,
        totalActions: newTotalActions,
        carbonSaved: newCarbonSaved,
        waterSaved: newWaterSaved,
        wasteReduced: newWasteReduced,
        level: newLevel,
        currentStreak: newStreak,
        updatedAt: new Date().toISOString(),
      },
    );

    // Check for new badges based on the action
    await checkAndAwardBadges(userId, {
      totalPoints: newTotalPoints,
      totalActions: newTotalActions,
      currentStreak: newStreak,
      level: newLevel,
      category: actionData.category,
    });

    return {
      id: updatedProfile.$id,
      userId: updatedProfile.userId,
      name: updatedProfile.name,
      email: updatedProfile.email,
      totalPoints: updatedProfile.totalPoints,
      currentStreak: updatedProfile.currentStreak,
      level: updatedProfile.level,
      badges: updatedProfile.badges,
      totalActions: updatedProfile.totalActions,
      carbonSaved: updatedProfile.carbonSaved,
      waterSaved: updatedProfile.waterSaved,
      wasteReduced: updatedProfile.wasteReduced,
      preferences: updatedProfile.preferences,
      createdAt: updatedProfile.$createdAt,
      updatedAt: updatedProfile.updatedAt,
    };
  } catch (error) {
    console.error("Error updating user profile from action:", error);
    throw new Error("Failed to update user profile. Please try again.");
  }
}

// Check and award badges based on user achievements
export async function checkAndAwardBadges(
  userId: string,
  stats: {
    totalPoints: number;
    totalActions: number;
    currentStreak: number;
    level: number;
    category?: string;
  },
): Promise<string[]> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }

    const newBadges: string[] = [];
    const currentBadges = profile.badges || [];

    // Define badge criteria
    const badgeCriteria = [
      {
        id: "First Action",
        condition: stats.totalActions >= 1,
        name: "First Steps",
      },
      {
        id: "Action Hero",
        condition: stats.totalActions >= 10,
        name: "Action Hero",
      },
      {
        id: "Eco Warrior",
        condition: stats.totalActions >= 50,
        name: "Eco Warrior",
      },
      {
        id: "Green Champion",
        condition: stats.totalActions >= 100,
        name: "Green Champion",
      },
      {
        id: "Streak Starter",
        condition: stats.currentStreak >= 3,
        name: "Streak Starter",
      },
      {
        id: "Streak Master",
        condition: stats.currentStreak >= 7,
        name: "Streak Master",
      },
      {
        id: "Dedication",
        condition: stats.currentStreak >= 30,
        name: "Dedication",
      },
      { id: "Level Up", condition: stats.level >= 2, name: "Level Up" },
      { id: "Rising Star", condition: stats.level >= 5, name: "Rising Star" },
      {
        id: "Point Collector",
        condition: stats.totalPoints >= 1000,
        name: "Point Collector",
      },
      {
        id: "Point Master",
        condition: stats.totalPoints >= 5000,
        name: "Point Master",
      },
    ];

    // Check each badge criteria
    for (const badge of badgeCriteria) {
      if (badge.condition && !currentBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    }

    // Category-specific badges
    if (
      stats.category &&
      !currentBadges.includes(`${stats.category} Specialist`)
    ) {
      newBadges.push(`${stats.category} Specialist`);
    }

    // Update profile with new badges
    if (newBadges.length > 0) {
      await databases.updateDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.users,
        profile.id,
        {
          badges: [...currentBadges, ...newBadges],
          updatedAt: new Date().toISOString(),
        },
      );
    }

    return newBadges;
  } catch (error) {
    console.error("Error checking and awarding badges:", error);
    return [];
  }
}

// Get user leaderboard position
export async function getUserLeaderboardPosition(userId: string): Promise<{
  rank: number;
  totalUsers: number;
}> {
  try {
    const allUsers = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      [Query.orderDesc("totalPoints")],
    );

    const userIndex = allUsers.documents.findIndex(
      (doc) => doc.userId === userId,
    );

    return {
      rank: userIndex + 1,
      totalUsers: allUsers.documents.length,
    };
  } catch (error) {
    console.error("Error getting leaderboard position:", error);
    throw new Error("Failed to get leaderboard position. Please try again.");
  }
}

// Get leaderboard data with users ordered by total points
export async function getLeaderboardData(
  limit: number = 100,
): Promise<UserProfile[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      [Query.orderDesc("totalPoints"), Query.limit(limit)],
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      email: doc.email,
      totalPoints: doc.totalPoints || 0,
      currentStreak: doc.currentStreak || 0,
      level: doc.level || 1,
      badges: doc.badges || [],
      totalActions: doc.totalActions || 0,
      carbonSaved: doc.carbonSaved || 0,
      waterSaved: doc.waterSaved || 0,
      wasteReduced: doc.wasteReduced || 0,
      preferences: doc.preferences || {
        notifications: true,
        weeklyGoal: 7,
        theme: "auto",
      },
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
    }));
  } catch (error) {
    console.error("Error getting leaderboard data:", error);
    throw new Error("Failed to get leaderboard data. Please try again.");
  }
}

// Get weekly leaderboard (users ordered by recent activity - this would need more complex logic)
export async function getWeeklyLeaderboard(
  limit: number = 100,
): Promise<UserProfile[]> {
  // For now, return same as general leaderboard
  // In a real implementation, this would track weekly points separately
  return getLeaderboardData(limit);
}
