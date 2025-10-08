import { databases, DB_CONFIG } from "@/tools/appwrite";
import { Query } from "appwrite";
import { 
  UserProfile, 
  EcoAction, 
  Challenge, 
  Badge, 
  AppwriteDocument,
  AppwriteList 
} from "@/types";

// Generic database operations
export class DatabaseService {
  private static async createDocument<T>(
    collectionId: string,
    data: Omit<T, keyof AppwriteDocument>,
    documentId?: string
  ): Promise<T> {
    try {
      const result = await databases.createDocument(
        DB_CONFIG.databaseId,
        collectionId,
        documentId || "unique()",
        data as any
      );
      return result as T;
    } catch (error) {
      console.error(`Error creating document in ${collectionId}:`, error);
      throw error;
    }
  }

  private static async getDocument<T>(
    collectionId: string,
    documentId: string
  ): Promise<T> {
    try {
      const result = await databases.getDocument(
        DB_CONFIG.databaseId,
        collectionId,
        documentId
      );
      return result as T;
    } catch (error) {
      console.error(`Error getting document from ${collectionId}:`, error);
      throw error;
    }
  }

  private static async listDocuments<T>(
    collectionId: string,
    queries: string[] = []
  ): Promise<AppwriteList<T>> {
    try {
      const result = await databases.listDocuments(
        DB_CONFIG.databaseId,
        collectionId,
        queries
      );
      return result as AppwriteList<T>;
    } catch (error) {
      console.error(`Error listing documents from ${collectionId}:`, error);
      throw error;
    }
  }

  private static async updateDocument<T>(
    collectionId: string,
    documentId: string,
    data: Partial<T>
  ): Promise<T> {
    try {
      const result = await databases.updateDocument(
        DB_CONFIG.databaseId,
        collectionId,
        documentId,
        data as any
      );
      return result as T;
    } catch (error) {
      console.error(`Error updating document in ${collectionId}:`, error);
      throw error;
    }
  }

  private static async deleteDocument(
    collectionId: string,
    documentId: string
  ): Promise<void> {
    try {
      await databases.deleteDocument(
        DB_CONFIG.databaseId,
        collectionId,
        documentId
      );
    } catch (error) {
      console.error(`Error deleting document from ${collectionId}:`, error);
      throw error;
    }
  }

  // User operations
  static async createUser(userData: Omit<UserProfile, keyof AppwriteDocument>): Promise<UserProfile> {
    return this.createDocument<UserProfile>(DB_CONFIG.collections.users, userData);
  }

  static async getUser(userId: string): Promise<UserProfile> {
    return this.getDocument<UserProfile>(DB_CONFIG.collections.users, userId);
  }

  static async getUserByUserId(userId: string): Promise<UserProfile | null> {
    try {
      const result = await this.listDocuments<UserProfile>(
        DB_CONFIG.collections.users,
        [Query.equal("userId", userId)]
      );
      return result.documents[0] || null;
    } catch (error) {
      console.error("Error getting user by userId:", error);
      return null;
    }
  }

  static async updateUser(userId: string, userData: Partial<UserProfile>): Promise<UserProfile> {
    return this.updateDocument<UserProfile>(DB_CONFIG.collections.users, userId, userData);
  }

  static async deleteUser(userId: string): Promise<void> {
    return this.deleteDocument(DB_CONFIG.collections.users, userId);
  }

  // Action operations
  static async createAction(actionData: Omit<EcoAction, keyof AppwriteDocument>): Promise<EcoAction> {
    return this.createDocument<EcoAction>(DB_CONFIG.collections.actions, actionData);
  }

  static async getAction(actionId: string): Promise<EcoAction> {
    return this.getDocument<EcoAction>(DB_CONFIG.collections.actions, actionId);
  }

  static async getUserActions(userId: string, limit: number = 50): Promise<EcoAction[]> {
    const result = await this.listDocuments<EcoAction>(
      DB_CONFIG.collections.actions,
      [
        Query.equal("userId", userId),
        Query.orderDesc("timestamp"),
        Query.limit(limit)
      ]
    );
    return result.documents;
  }

  static async getActionsByCategory(category: string, limit: number = 50): Promise<EcoAction[]> {
    const result = await this.listDocuments<EcoAction>(
      DB_CONFIG.collections.actions,
      [
        Query.equal("category", category),
        Query.orderDesc("timestamp"),
        Query.limit(limit)
      ]
    );
    return result.documents;
  }

  static async updateAction(actionId: string, actionData: Partial<EcoAction>): Promise<EcoAction> {
    return this.updateDocument<EcoAction>(DB_CONFIG.collections.actions, actionId, actionData);
  }

  static async deleteAction(actionId: string): Promise<void> {
    return this.deleteDocument(DB_CONFIG.collections.actions, actionId);
  }

  // Challenge operations
  static async createChallenge(challengeData: Omit<Challenge, keyof AppwriteDocument>): Promise<Challenge> {
    return this.createDocument<Challenge>(DB_CONFIG.collections.challenges, challengeData);
  }

  static async getChallenge(challengeId: string): Promise<Challenge> {
    return this.getDocument<Challenge>(DB_CONFIG.collections.challenges, challengeId);
  }

  static async getActiveChallenges(): Promise<Challenge[]> {
    const result = await this.listDocuments<Challenge>(
      DB_CONFIG.collections.challenges,
      [
        Query.equal("status", "active"),
        Query.orderDesc("startDate")
      ]
    );
    return result.documents;
  }

  static async getPublicChallenges(): Promise<Challenge[]> {
    const result = await this.listDocuments<Challenge>(
      DB_CONFIG.collections.challenges,
      [
        Query.equal("isPublic", true),
        Query.orderDesc("startDate")
      ]
    );
    return result.documents;
  }

  static async updateChallenge(challengeId: string, challengeData: Partial<Challenge>): Promise<Challenge> {
    return this.updateDocument<Challenge>(DB_CONFIG.collections.challenges, challengeId, challengeData);
  }

  static async deleteChallenge(challengeId: string): Promise<void> {
    return this.deleteDocument(DB_CONFIG.collections.challenges, challengeId);
  }

  // Badge operations
  static async createBadge(badgeData: Omit<Badge, keyof AppwriteDocument>): Promise<Badge> {
    return this.createDocument<Badge>(DB_CONFIG.collections.badges, badgeData);
  }

  static async getBadge(badgeId: string): Promise<Badge> {
    return this.getDocument<Badge>(DB_CONFIG.collections.badges, badgeId);
  }

  static async getAllBadges(): Promise<Badge[]> {
    const result = await this.listDocuments<Badge>(DB_CONFIG.collections.badges);
    return result.documents;
  }

  static async getBadgesByCategory(category: string): Promise<Badge[]> {
    const result = await this.listDocuments<Badge>(
      DB_CONFIG.collections.badges,
      [Query.equal("category", category)]
    );
    return result.documents;
  }

  static async updateBadge(badgeId: string, badgeData: Partial<Badge>): Promise<Badge> {
    return this.updateDocument<Badge>(DB_CONFIG.collections.badges, badgeId, badgeData);
  }

  static async deleteBadge(badgeId: string): Promise<void> {
    return this.deleteDocument(DB_CONFIG.collections.badges, badgeId);
  }
}
