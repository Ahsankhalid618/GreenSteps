"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    // Always check auth on mount to determine if user is logged in
    checkAuth();
  }, [checkAuth]);

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  };

  // Show loading spinner during initial authentication check
  if (loading && !user) {
    return (
      <div className="dark:from-dark-bg dark:to-dark-surface flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
