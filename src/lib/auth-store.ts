import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "./auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      loading: true, // Start with loading true to prevent immediate auth check
      error: null,
      isAuthenticated: false,

      // Actions
      setLoading: (loading: boolean) => set({ loading }),

      clearError: () => set({ error: null }),

      login: async (credentials: LoginCredentials) => {
        try {
          set({ loading: true, error: null });
          const user = await loginUser(credentials);
          set({
            user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({
            error: errorMessage,
            loading: false,
          });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ loading: true, error: null });
          const user = await registerUser(credentials);
          set({
            user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({
            error: errorMessage,
            loading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          await logoutUser();
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Logout failed";
          set({
            error: errorMessage,
            loading: false,
          });
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true });
          const user = await getCurrentUser();
          set({
            user,
            isAuthenticated: !!user,
            loading: false,
          });
        } catch {
          // This is expected when no user is logged in
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
