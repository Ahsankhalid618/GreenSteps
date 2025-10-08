import { databases, DB_CONFIG } from "@/tools/appwrite";
import { ID, Query } from "appwrite";

export interface Action {
  id: string;
  category: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  userId: string;
  timestamp: string;
  impact: {
    carbonSaved: number;
    waterSaved: number;
    wasteReduced: number;
  };
}

export interface CreateActionData {
  category: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  timestamp?: string; // Optional timestamp field
  impact: {
    carbonSaved: number;
    waterSaved: number;
    wasteReduced: number;
  };
}

// Save a new action to Appwrite
export async function saveAction(
  actionData: CreateActionData,
  userId: string,
): Promise<Action> {
  try {
    const document = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.actions,
      ID.unique(),
      {
        category: actionData.category,
        description: actionData.description,
        difficulty: actionData.difficulty,
        points: actionData.points,
        userId: userId,
        // Only include timestamp if the attribute exists in the schema
        ...(actionData.timestamp && { timestamp: actionData.timestamp }),
        carbonSaved: actionData.impact.carbonSaved,
        waterSaved: actionData.impact.waterSaved,
        wasteReduced: actionData.impact.wasteReduced,
      },
    );

    return {
      id: document.$id,
      category: document.category,
      description: document.description,
      difficulty: document.difficulty,
      points: document.points,
      userId: document.userId,
      timestamp: document.timestamp || document.$createdAt, // Fallback to $createdAt
      impact: {
        carbonSaved: document.carbonSaved,
        waterSaved: document.waterSaved,
        wasteReduced: document.wasteReduced,
      },
    };
  } catch (error) {
    console.error("Error saving action:", error);

    // Check if it's a schema error
    if (
      error instanceof Error &&
      error.message.includes("Attribute not found in schema")
    ) {
      throw new Error(
        "Database schema is not set up correctly. Please check the Database Setup Guide to create the required attributes in your Appwrite collections.",
      );
    }

    throw new Error("Failed to save action. Please try again.");
  }
}

// Get user's recent actions
export async function getUserActions(
  userId: string,
  limit: number = 20,
): Promise<Action[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.actions,
      [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"), // Use $createdAt instead of timestamp
        Query.limit(limit),
      ],
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      category: doc.category,
      description: doc.description,
      difficulty: doc.difficulty,
      points: doc.points,
      userId: doc.userId,
      timestamp: doc.timestamp || doc.$createdAt, // Fallback to $createdAt if timestamp doesn't exist
      impact: {
        carbonSaved: doc.carbonSaved,
        waterSaved: doc.waterSaved,
        wasteReduced: doc.wasteReduced,
      },
    }));
  } catch (error) {
    console.error("Error fetching actions:", error);

    // Check if it's a schema error
    if (
      error instanceof Error &&
      error.message.includes("Attribute not found in schema")
    ) {
      throw new Error(
        "Database schema is not set up correctly. Please check the Database Setup Guide to create the required attributes in your Appwrite collections.",
      );
    }

    throw new Error("Failed to load actions. Please try again.");
  }
}

// Get user's action statistics
export async function getUserActionStats(userId: string): Promise<{
  totalActions: number;
  totalPoints: number;
  totalCarbonSaved: number;
  totalWaterSaved: number;
  totalWasteReduced: number;
  actionsByCategory: Record<string, number>;
  actionsByDifficulty: Record<string, number>;
}> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.actions,
      [Query.equal("userId", userId)],
    );

    const actions = response.documents;
    const totalActions = actions.length;
    const totalPoints = actions.reduce((sum, action) => sum + action.points, 0);
    const totalCarbonSaved = actions.reduce(
      (sum, action) => sum + action.carbonSaved,
      0,
    );
    const totalWaterSaved = actions.reduce(
      (sum, action) => sum + action.waterSaved,
      0,
    );
    const totalWasteReduced = actions.reduce(
      (sum, action) => sum + action.wasteReduced,
      0,
    );

    const actionsByCategory: Record<string, number> = {};
    const actionsByDifficulty: Record<string, number> = {};

    actions.forEach((action) => {
      actionsByCategory[action.category] =
        (actionsByCategory[action.category] || 0) + 1;
      actionsByDifficulty[action.difficulty] =
        (actionsByDifficulty[action.difficulty] || 0) + 1;
    });

    return {
      totalActions,
      totalPoints,
      totalCarbonSaved,
      totalWaterSaved,
      totalWasteReduced,
      actionsByCategory,
      actionsByDifficulty,
    };
  } catch (error) {
    console.error("Error fetching action stats:", error);
    throw new Error("Failed to load action statistics. Please try again.");
  }
}

// Delete an action
export async function deleteAction(actionId: string): Promise<void> {
  try {
    await databases.deleteDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.actions,
      actionId,
    );
  } catch (error) {
    console.error("Error deleting action:", error);
    throw new Error("Failed to delete action. Please try again.");
  }
}
