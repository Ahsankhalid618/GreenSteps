export interface UserProfile {
  $id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalActions: number;
  badges: string[];
  achievements: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    challenges: boolean;
    leaderboard: boolean;
  };
  privacy: {
    showOnLeaderboard: boolean;
    showProfile: boolean;
    showActions: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalActions: number;
  actionsThisWeek: number;
  actionsThisMonth: number;
  carbonSaved: number; // in kg CO2
  waterSaved: number; // in liters
  wasteReduced: number; // in kg
}
