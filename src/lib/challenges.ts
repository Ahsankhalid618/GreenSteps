import { databases, DB_CONFIG } from "@/tools/appwrite";
import { ID, Query } from "appwrite";

// Appwrite document interface for challenges
interface AppwriteChallengeDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  description: string;
  type: "community" | "personal";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  requirements: string;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdBy: string;
  status: "active" | "completed" | "upcoming" | "expired";
  icon: string;
  color: string;
  bgColor: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "community" | "personal";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  requirements: string;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdBy: string;
  status: "active" | "completed" | "upcoming" | "expired";
  icon: string;
  color: string;
  bgColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeProgress {
  id: string;
  challengeId: string;
  userId: string;
  progress: number;
  completedRequirements: string[];
  joinedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChallengeData {
  title: string;
  description: string;
  type: "community" | "personal";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  requirements: string;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  icon: string;
  color: string;
  bgColor: string;
}

export interface UpdateChallengeProgressData {
  progress: number;
  completedRequirements: string[];
  completedAt?: string;
}

// Create a new challenge
export async function createChallenge(
  data: CreateChallengeData,
  createdBy: string,
): Promise<Challenge> {
  try {
    const challenge = await databases.createDocument(
      DB_CONFIG.databaseId,
      "challenges",
      ID.unique(),
      {
        title: data.title,
        description: data.description,
        type: data.type,
        category: data.category,
        difficulty: data.difficulty,
        points: data.points,
        requirements: data.requirements,
        startDate: data.startDate,
        endDate: data.endDate,
        maxParticipants: data.maxParticipants || null,
        currentParticipants: 0,
        createdBy: createdBy,
        status: "upcoming",
        icon: data.icon,
        color: data.color,
        bgColor: data.bgColor,
      },
    );

    return challenge as unknown as Challenge;
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw new Error("Failed to create challenge");
  }
}

// Get all challenges with optional filters
export async function getChallenges(filters?: {
  type?: "community" | "personal";
  category?: string;
  status?: "active" | "completed" | "upcoming" | "expired";
  search?: string;
}): Promise<Challenge[]> {
  try {
    const queries = [];

    if (filters?.type) {
      queries.push(Query.equal("type", filters.type));
    }

    if (filters?.category) {
      queries.push(Query.equal("category", filters.category));
    }

    if (filters?.status) {
      queries.push(Query.equal("status", filters.status));
    }

    if (filters?.search) {
      queries.push(Query.search("title", filters.search));
    }

    // Order by creation date (newest first)
    queries.push(Query.orderDesc("$createdAt"));

    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenges",
      queries,
    );

    // Map Appwrite documents to Challenge interface
    const challenges = response.documents.map((doc) => {
      const challengeDoc = doc as unknown as AppwriteChallengeDocument;
      return {
        id: challengeDoc.$id,
        title: challengeDoc.title,
        description: challengeDoc.description,
        type: challengeDoc.type,
        category: challengeDoc.category,
        difficulty: challengeDoc.difficulty,
        points: challengeDoc.points,
        requirements: challengeDoc.requirements,
        startDate: challengeDoc.startDate,
        endDate: challengeDoc.endDate,
        maxParticipants: challengeDoc.maxParticipants,
        currentParticipants: challengeDoc.currentParticipants,
        createdBy: challengeDoc.createdBy,
        status: challengeDoc.status,
        icon: challengeDoc.icon,
        color: challengeDoc.color,
        bgColor: challengeDoc.bgColor,
        createdAt: challengeDoc.$createdAt,
        updatedAt: challengeDoc.$updatedAt,
      };
    });

    return challenges as Challenge[];
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw new Error("Failed to fetch challenges");
  }
}

// Get a specific challenge by ID
export async function getChallenge(challengeId: string): Promise<Challenge> {
  try {
    const doc = await databases.getDocument(
      DB_CONFIG.databaseId,
      "challenges",
      challengeId,
    );

    const challengeDoc = doc as unknown as AppwriteChallengeDocument;
    return {
      id: challengeDoc.$id,
      title: challengeDoc.title,
      description: challengeDoc.description,
      type: challengeDoc.type,
      category: challengeDoc.category,
      difficulty: challengeDoc.difficulty,
      points: challengeDoc.points,
      requirements: challengeDoc.requirements,
      startDate: challengeDoc.startDate,
      endDate: challengeDoc.endDate,
      maxParticipants: challengeDoc.maxParticipants,
      currentParticipants: challengeDoc.currentParticipants,
      createdBy: challengeDoc.createdBy,
      status: challengeDoc.status,
      icon: challengeDoc.icon,
      color: challengeDoc.color,
      bgColor: challengeDoc.bgColor,
      createdAt: challengeDoc.$createdAt,
      updatedAt: challengeDoc.$updatedAt,
    };
  } catch (error) {
    console.error("Error fetching challenge:", error);
    throw new Error("Failed to fetch challenge");
  }
}

// Join a challenge
export async function joinChallenge(
  challengeId: string,
  userId: string,
): Promise<ChallengeProgress> {
  try {
    // Check if user is already part of the challenge
    const existingProgress = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenge_progress",
      [Query.equal("challengeId", challengeId), Query.equal("userId", userId)],
    );

    if (existingProgress.documents.length > 0) {
      throw new Error("User is already part of this challenge");
    }

    // Create challenge progress record
    const progress = await databases.createDocument(
      DB_CONFIG.databaseId,
      "challenge_progress",
      ID.unique(),
      {
        challengeId: challengeId,
        userId: userId,
        progress: 0,
        completedRequirements: [],
        joinedAt: new Date().toISOString(),
      },
    );

    // Update challenge participant count
    const challenge = await getChallenge(challengeId);
    await databases.updateDocument(
      DB_CONFIG.databaseId,
      "challenges",
      challengeId,
      {
        currentParticipants: challenge.currentParticipants + 1,
      },
    );

    return progress as unknown as ChallengeProgress;
  } catch (error) {
    console.error("Error joining challenge:", error);
    throw new Error("Failed to join challenge");
  }
}

// Leave a challenge
export async function leaveChallenge(
  challengeId: string,
  userId: string,
): Promise<void> {
  try {
    // Find and delete the progress record
    const progressRecords = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenge_progress",
      [Query.equal("challengeId", challengeId), Query.equal("userId", userId)],
    );

    if (progressRecords.documents.length > 0) {
      await databases.deleteDocument(
        DB_CONFIG.databaseId,
        "challenge_progress",
        progressRecords.documents[0].$id,
      );
    }

    // Update challenge participant count
    const challenge = await getChallenge(challengeId);
    await databases.updateDocument(
      DB_CONFIG.databaseId,
      "challenges",
      challengeId,
      {
        currentParticipants: Math.max(0, challenge.currentParticipants - 1),
      },
    );
  } catch (error) {
    console.error("Error leaving challenge:", error);
    throw new Error("Failed to leave challenge");
  }
}

// Get user's challenge progress
export async function getUserChallengeProgress(
  userId: string,
): Promise<ChallengeProgress[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenge_progress",
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
    );

    return response.documents as unknown as ChallengeProgress[];
  } catch (error) {
    console.error("Error fetching user challenge progress:", error);
    throw new Error("Failed to fetch user challenge progress");
  }
}

// Update challenge progress
export async function updateChallengeProgress(
  progressId: string,
  data: UpdateChallengeProgressData,
): Promise<ChallengeProgress> {
  try {
    const progress = await databases.updateDocument(
      DB_CONFIG.databaseId,
      "challenge_progress",
      progressId,
      {
        progress: data.progress,
        completedRequirements: data.completedRequirements,
        completedAt: data.completedAt || null,
      },
    );

    return progress as unknown as ChallengeProgress;
  } catch (error) {
    console.error("Error updating challenge progress:", error);
    throw new Error("Failed to update challenge progress");
  }
}

// Get challenges joined by user
export async function getUserJoinedChallenges(
  userId: string,
): Promise<Challenge[]> {
  try {
    // Get user's challenge progress
    const progressRecords = await getUserChallengeProgress(userId);

    if (progressRecords.length === 0) {
      return [];
    }

    // Get challenge details for each progress record
    const challengeIds = progressRecords.map((record) => record.challengeId);
    const challenges = await Promise.all(
      challengeIds.map((id) => getChallenge(id)),
    );

    return challenges;
  } catch (error) {
    console.error("Error fetching user joined challenges:", error);
    throw new Error("Failed to fetch user joined challenges");
  }
}

// Check if user has joined a challenge
export async function hasUserJoinedChallenge(
  challengeId: string,
  userId: string,
): Promise<boolean> {
  try {
    const progressRecords = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenge_progress",
      [Query.equal("challengeId", challengeId), Query.equal("userId", userId)],
    );

    return progressRecords.documents.length > 0;
  } catch (error) {
    console.error("Error checking challenge join status:", error);
    return false;
  }
}

// Update challenge status based on dates
export async function updateChallengeStatus(
  challengeId: string,
): Promise<Challenge> {
  try {
    const challenge = await getChallenge(challengeId);
    const now = new Date();
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);

    let newStatus = challenge.status;

    if (now < startDate) {
      newStatus = "upcoming";
    } else if (now >= startDate && now <= endDate) {
      newStatus = "active";
    } else if (now > endDate) {
      newStatus = "expired";
    }

    if (newStatus !== challenge.status) {
      const updatedChallenge = await databases.updateDocument(
        DB_CONFIG.databaseId,
        "challenges",
        challengeId,
        {
          status: newStatus,
        },
      );

      return updatedChallenge as unknown as Challenge;
    }

    return challenge;
  } catch (error) {
    console.error("Error updating challenge status:", error);
    throw new Error("Failed to update challenge status");
  }
}

// Get challenge statistics
export async function getChallengeStats(challengeId: string): Promise<{
  totalParticipants: number;
  averageProgress: number;
  completionRate: number;
}> {
  try {
    const progressRecords = await databases.listDocuments(
      DB_CONFIG.databaseId,
      "challenge_progress",
      [Query.equal("challengeId", challengeId)],
    );

    const totalParticipants = progressRecords.documents.length;
    const averageProgress =
      totalParticipants > 0
        ? progressRecords.documents.reduce(
            (sum, record) => sum + record.progress,
            0,
          ) / totalParticipants
        : 0;
    const completionRate =
      totalParticipants > 0
        ? (progressRecords.documents.filter((record) => record.progress === 100)
            .length /
            totalParticipants) *
          100
        : 0;

    return {
      totalParticipants,
      averageProgress,
      completionRate,
    };
  } catch (error) {
    console.error("Error fetching challenge stats:", error);
    throw new Error("Failed to fetch challenge statistics");
  }
}
