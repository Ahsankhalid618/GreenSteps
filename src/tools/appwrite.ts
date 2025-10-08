import { Client, Databases, Account, Storage, Functions } from "appwrite";
import { DatabaseConfig, StorageConfig } from "@/types/appwrite";

// Get environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

// Validate environment variables
if (!endpoint) {
  throw new Error(
    "NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined in environment variables",
  );
}

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined in environment variables",
  );
}

if (!databaseId) {
  throw new Error(
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID is not defined in environment variables",
  );
}

// Create Appwrite client
export const AppwriteClient = new Client()
  .setEndpoint(endpoint!)
  .setProject(projectId!);

// Initialize services
export const databases = new Databases(AppwriteClient);
export const account = new Account(AppwriteClient);
export const storage = new Storage(AppwriteClient);
export const functions = new Functions(AppwriteClient);

// Database configuration
export const DB_CONFIG: DatabaseConfig = {
  databaseId: databaseId!,
  collections: {
    users: "users",
    actions: "actions",
    challenges: "challenges",
    badges: "badges",
    achievements: "achievements",
    leaderboard: "leaderboard",
  },
};

// Storage configuration
export const STORAGE_CONFIG: StorageConfig = {
  bucketId: "greensteps-assets",
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
};
