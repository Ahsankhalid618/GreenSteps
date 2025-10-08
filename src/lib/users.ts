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
