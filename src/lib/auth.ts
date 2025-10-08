import { account } from "@/tools/appwrite";
import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";

// Register a new user
export async function registerUser(
  credentials: RegisterCredentials,
): Promise<User> {
  try {
    const user = await account.create(
      "unique()",
      credentials.email,
      credentials.password,
      credentials.name,
    );

    return user as User;
  } catch (error: unknown) {
    console.error("Registration error:", error);

    // Handle specific Appwrite errors
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === 409) {
        throw new Error("An account with this email already exists.");
      } else if (error.code === 400) {
        throw new Error("Invalid email or password format.");
      }
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("scopes")
    ) {
      throw new Error(
        "Authentication service is not properly configured. Please check your Appwrite settings.",
      );
    }

    throw new Error("Failed to register. Please try again.");
  }
}

// Login user
export async function loginUser(credentials: LoginCredentials): Promise<User> {
  try {
    await account.createEmailPasswordSession(
      credentials.email,
      credentials.password,
    );

    const user = await account.get();
    return user as User;
  } catch (error: unknown) {
    console.error("Login error:", error);

    // Handle specific Appwrite errors
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === 401) {
        throw new Error("Invalid email or password.");
      } else if (error.code === 429) {
        throw new Error("Too many login attempts. Please try again later.");
      }
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("scopes")
    ) {
      throw new Error(
        "Authentication service is not properly configured. Please check your Appwrite settings.",
      );
    }

    throw new Error("Failed to login. Please check your credentials.");
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  try {
    await account.deleteSession("current");
  } catch (error: unknown) {
    console.error("Logout error:", error);

    // Don't throw error for logout failures as user might already be logged out
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      !error.message.includes("scopes")
    ) {
      console.warn("Logout failed, but continuing...");
    }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await account.get();
    return user as User;
  } catch (error: unknown) {
    // This is expected when user is not logged in
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === 401 || error.code === 0) {
        return null;
      }
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("scopes")
    ) {
      return null;
    }

    // Only log unexpected errors
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code !== 401
    ) {
      console.error("Get current user error:", error);
    }
    return null;
  }
}
