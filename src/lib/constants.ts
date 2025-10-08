import { ActionCategory } from "@/types/action";

export const APP_CONFIG = {
  name: "GreenSteps",
  description: "Track, gamify, and visualize your eco-friendly actions",
  version: "1.0.0",
  author: "GreenSteps Team",
} as const;

export const POINTS_CONFIG = {
  basePoints: 10,
  multiplier: {
    easy: 1,
    medium: 1.5,
    hard: 2,
  },
  bonus: {
    streak: 0.1, // 10% bonus per day of streak
    firstTime: 2, // 2x points for first time action
    weekend: 1.2, // 20% bonus on weekends
  },
} as const;

export const LEVEL_CONFIG = {
  pointsPerLevel: 1000,
  maxLevel: 100,
  levelNames: [
    "Seedling",
    "Sprout",
    "Sapling",
    "Tree",
    "Forest",
    "Ecosystem",
    "Planet",
  ],
} as const;

export const ACTION_CATEGORIES: Record<ActionCategory, {
  name: string;
  icon: string;
  color: string;
  description: string;
}> = {
  transportation: {
    name: "Transportation",
    icon: "🚗",
    color: "blue",
    description: "Eco-friendly travel choices",
  },
  energy: {
    name: "Energy",
    icon: "⚡",
    color: "yellow",
    description: "Energy conservation and renewable sources",
  },
  waste: {
    name: "Waste",
    icon: "♻️",
    color: "green",
    description: "Waste reduction and recycling",
  },
  water: {
    name: "Water",
    icon: "💧",
    color: "cyan",
    description: "Water conservation",
  },
  food: {
    name: "Food",
    icon: "🌱",
    color: "emerald",
    description: "Sustainable food choices",
  },
  shopping: {
    name: "Shopping",
    icon: "🛍️",
    color: "purple",
    description: "Conscious consumption",
  },
  lifestyle: {
    name: "Lifestyle",
    icon: "🏠",
    color: "orange",
    description: "Sustainable living practices",
  },
  community: {
    name: "Community",
    icon: "🤝",
    color: "pink",
    description: "Community environmental actions",
  },
} as const;

export const BADGE_CATEGORIES = {
  action: "Action Badges",
  streak: "Streak Badges",
  challenge: "Challenge Badges",
  milestone: "Milestone Badges",
  special: "Special Badges",
} as const;

export const CHALLENGE_TYPES = {
  daily: "Daily Challenge",
  weekly: "Weekly Challenge",
  monthly: "Monthly Challenge",
  custom: "Custom Challenge",
} as const;

export const CARBON_FACTORS = {
  // kg CO2 per unit
  carKm: 0.192,
  busKm: 0.089,
  trainKm: 0.041,
  planeKm: 0.285,
  electricityKwh: 0.5,
  waterLiter: 0.0003,
  wasteKg: 0.5,
} as const;

export const STORAGE_KEYS = {
  user: "greensteps_user",
  preferences: "greensteps_preferences",
  theme: "greensteps_theme",
  onboarding: "greensteps_onboarding",
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  actions: {
    list: "/actions",
    create: "/actions",
    update: "/actions/:id",
    delete: "/actions/:id",
  },
  challenges: {
    list: "/challenges",
    join: "/challenges/:id/join",
    leave: "/challenges/:id/leave",
  },
  leaderboard: {
    global: "/leaderboard/global",
    friends: "/leaderboard/friends",
    local: "/leaderboard/local",
  },
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
