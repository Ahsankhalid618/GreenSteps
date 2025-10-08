import { Models } from 'appwrite';

export interface AppwriteDocument extends Models.Document {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface AppwriteList<T> {
  total: number;
  documents: T[];
}

export interface AppwriteError {
  code: number;
  message: string;
  type: string;
}

export interface DatabaseConfig {
  databaseId: string;
  collections: {
    users: string;
    actions: string;
    challenges: string;
    badges: string;
    achievements: string;
    leaderboard: string;
  };
}

export interface StorageConfig {
  bucketId: string;
  maxFileSize: number;
  allowedFileTypes: string[];
}
