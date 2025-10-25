"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import {
  Trophy,
  Medal,
  Crown,
  Search,
  Star,
  Leaf,
  Target,
  Award,
  MapPin,
  Flame,
} from "lucide-react";
import { useAuthContext } from "@/components/providers/AuthProvider";
import {
  getLeaderboardData,
  getWeeklyLeaderboard,
  type UserProfile,
} from "@/lib/users";

interface LeaderboardUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  totalPoints: number;
  currentStreak: number;
  level: number;
  badges: string[];
  totalActions: number;
  carbonSaved: number;
  waterSaved: number;
  wasteReduced: number;
  createdAt: string;
  updatedAt: string;
  rank: number;
  weeklyPoints?: number;
  location?: string;
  levelName: string; // Display level name like "Eco Legend"
  avatar?: string;
  points: number; // alias for totalPoints
  actionsCount: number; // alias for totalActions
  co2Saved: number; // alias for carbonSaved
  streak: number; // alias for currentStreak
}

export default function LeaderboardPage() {
  const { user } = useAuthContext();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");
  const [leaderboardData, setLeaderboardData] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load leaderboard data
  useEffect(() => {
    const loadLeaderboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data: UserProfile[];
        if (selectedPeriod === "weekly") {
          data = await getWeeklyLeaderboard(50);
        } else {
          data = await getLeaderboardData(50);
        }
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
        // Handle database setup errors gracefully
        if (
          error instanceof Error &&
          error.message.includes("Database not found")
        ) {
          setError(
            "Database not set up yet. Please visit /setup to initialize the database with sample data.",
          );
        } else if (
          error instanceof Error &&
          error.message.includes("Collection not found")
        ) {
          setError(
            "Database collections not created yet. Please visit /setup to initialize the database.",
          );
        } else {
          setError("Failed to load leaderboard. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, [selectedPeriod]);

  const periods = [
    { id: "all", name: "All Time" },
    { id: "monthly", name: "This Month" },
    { id: "weekly", name: "This Week" },
    { id: "daily", name: "Today" },
  ];

  const categories = [
    { id: "overall", name: "Overall", icon: Trophy },
    { id: "actions", name: "Actions", icon: Target },
    { id: "points", name: "Points", icon: Star },
    { id: "co2", name: "COâ‚‚ Saved", icon: Leaf },
    { id: "streak", name: "Streak", icon: Flame },
  ];

  // Add rank to leaderboard data and convert to LeaderboardUser format
  const leaderboardWithRanks: LeaderboardUser[] = leaderboardData.map(
    (user, index) => ({
      ...user,
      rank: index + 1,
      weeklyPoints: Math.floor(user.totalPoints * 0.1), // Approximate weekly points
      location: "Location", // Would come from user profile if available
      levelName:
        user.level >= 10
          ? "Eco Legend"
          : user.level >= 5
            ? "Green Warrior"
            : "Eco Rookie",
      avatar: "🌟", // Default avatar - could be from user profile
      points: user.totalPoints, // alias for totalPoints
      actionsCount: user.totalActions, // alias for totalActions
      co2Saved: user.carbonSaved, // alias for carbonSaved
      streak: user.currentStreak, // alias for currentStreak
    }),
  );

  const filteredLeaderboard = leaderboardWithRanks.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Mock current user data (in real app, this would come from user context)
  const currentUser = {
    rank:
      leaderboardWithRanks.findIndex((u) => u.userId === (user?.$id || "")) +
        1 || 23,
    points: user
      ? leaderboardWithRanks.find((u) => u.userId === (user.$id || ""))
          ?.points || 650
      : 650,
    weeklyPoints: 85,
    avatar: "🚀",
    location: "Your City",
    level: "Rising Star",
    streak: 3,
    badges: 3,
    co2Saved: 12,
    actionsCount: 28,
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-amber-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-white">#{rank}</span>;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
          border: "border-amber-500/30",
          glow: "shadow-amber-500/20",
        };
      case 2:
        return {
          bg: "bg-gradient-to-r from-gray-500/20 to-slate-500/20",
          border: "border-gray-500/30",
          glow: "shadow-gray-500/20",
        };
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-600/20 to-orange-500/20",
          border: "border-amber-600/30",
          glow: "shadow-amber-600/20",
        };
      default:
        return {
          bg: "bg-white/[0.02]",
          border: "border-white/10",
          glow: "shadow-black/20",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Loading State */}
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-green-500"></div>
            <p className="mt-4 text-white/60">Loading leaderboard...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 backdrop-blur-2xl">
          <p className="mb-4 text-center text-red-400">{error}</p>
          {error.includes("setup") && (
            <div className="text-center">
              <a
                href="/setup"
                className="inline-flex items-center rounded-lg bg-green-500/20 px-4 py-2 text-green-400 transition-colors hover:bg-green-500/30"
              >
                Go to Setup Page
              </a>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Your Current Rank - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 shadow-lg shadow-green-500/20 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-2xl shadow-lg">
                  {currentUser.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Rank</h3>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {currentUser.location} â€¢ {currentUser.level}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">
                  #{currentUser.rank}
                </div>
                <div className="text-xs text-white/60">of 10,000+</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-white">
                  {currentUser.points}
                </div>
                <div className="text-xs text-white/60">Points</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-amber-400">
                  {currentUser.streak}
                </div>
                <div className="text-xs text-white/60">Streak</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-purple-400">
                  {currentUser.badges}
                </div>
                <div className="text-xs text-white/60">Badges</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-blue-400">
                  {currentUser.co2Saved}kg
                </div>
                <div className="text-xs text-white/60">COâ‚‚</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-green-400">
                  {currentUser.actionsCount}
                </div>
                <div className="text-xs text-white/60">Actions</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2 text-center backdrop-blur-sm">
                <div className="text-sm font-bold text-emerald-400">
                  +{currentUser.weeklyPoints}
                </div>
                <div className="text-xs text-white/60">Week</div>
              </div>
            </div>
          </motion.div>

          {/* Single Line Filters with Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3 shadow-lg shadow-black/20 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4">
              {/* Left: Category Filters */}
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-1 rounded-lg border px-2 py-1 transition-all ${
                      selectedCategory === category.id
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <category.icon className="h-3 w-3" />
                    <span className="text-xs font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Center: Search Bar */}
              <div className="relative mx-4 w-64">
                <Search className="absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-white/10 bg-white/[0.03] py-1 pl-9 text-sm text-white placeholder:text-white/40"
                />
              </div>

              {/* Right: Time Period Filters */}
              <div className="flex gap-1">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`rounded-lg px-3 py-1 text-xs whitespace-nowrap transition-all ${
                      selectedPeriod === period.id
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/[0.03] text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg shadow-black/20 backdrop-blur-2xl"
          >
            {/* Table Header */}
            <div className="border-b border-white/10 bg-white/[0.03] px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium tracking-wider text-white/60 uppercase">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2">Points</div>
                <div className="col-span-1">Actions</div>
                <div className="col-span-1">COâ‚‚</div>
                <div className="col-span-1">Streak</div>
                <div className="col-span-1">Badges</div>
                <div className="col-span-1">Weekly</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredLeaderboard.map((user, index) => {
                  const colors = getRankColors(user.rank);
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className={`grid grid-cols-12 items-center gap-4 px-6 py-4 transition-all hover:bg-white/[0.03] ${colors.bg} ${
                        user.rank <= 3 ? "border-l-4 " + colors.border : ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                          {getRankIcon(user.rank)}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="col-span-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <h4 className="font-semibold text-white">
                              {user.name}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-white/60">
                              <MapPin className="h-3 w-3" />
                              {user.location}
                            </div>
                            <div className="text-xs text-white/40">
                              {user.level}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="col-span-2">
                        <div className="text-lg font-bold text-white">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-white/60">
                          total points
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-bold text-green-400">
                          {user.actionsCount}
                        </div>
                      </div>

                      {/* COâ‚‚ Saved */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-bold text-blue-400">
                          {user.co2Saved}kg
                        </div>
                      </div>

                      {/* Streak */}
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Flame className="h-3 w-3 text-amber-400" />
                          <span className="text-sm font-bold text-amber-400">
                            {user.streak}
                          </span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-bold text-purple-400">
                          {user.badges}
                        </div>
                      </div>

                      {/* Weekly Points */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-bold text-emerald-400">
                          +{user.weeklyPoints}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Table Footer */}
            <div className="border-t border-white/10 bg-white/[0.03] px-6 py-3">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>
                  Showing {filteredLeaderboard.length} of 10,000+ eco-warriors
                </span>
                <span>Updated every hour</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
