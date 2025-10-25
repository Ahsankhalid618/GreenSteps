"use client";

import React, { useState } from "react";
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

// Sample leaderboard data
const sampleLeaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Alex Johnson",
    avatar: "🌟",
    points: 2450,
    weeklyPoints: 420,
    location: "San Francisco, CA",
    level: "Eco Legend",
    streak: 28,
    badges: 15,
    co2Saved: 89,
    actionsCount: 156,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Chen",
    avatar: "🌱",
    points: 2100,
    weeklyPoints: 380,
    location: "Portland, OR",
    level: "Green Warrior",
    streak: 21,
    badges: 12,
    co2Saved: 67,
    actionsCount: 134,
    joinDate: "2024-02-03",
  },
  {
    id: 3,
    rank: 3,
    name: "Mike Rodriguez",
    avatar: "🌍",
    points: 1850,
    weeklyPoints: 340,
    location: "Austin, TX",
    level: "Earth Guardian",
    streak: 15,
    badges: 10,
    co2Saved: 54,
    actionsCount: 98,
    joinDate: "2024-01-28",
  },
  {
    id: 4,
    rank: 4,
    name: "Emma Wilson",
    avatar: "♻️",
    points: 1620,
    weeklyPoints: 290,
    location: "Seattle, WA",
    level: "Eco Warrior",
    streak: 12,
    badges: 8,
    co2Saved: 43,
    actionsCount: 87,
    joinDate: "2024-03-10",
  },
  {
    id: 5,
    rank: 5,
    name: "David Kim",
    avatar: "🌿",
    points: 1480,
    weeklyPoints: 260,
    location: "Denver, CO",
    level: "Green Hero",
    streak: 9,
    badges: 7,
    co2Saved: 38,
    actionsCount: 76,
    joinDate: "2024-02-20",
  },
  {
    id: 6,
    rank: 6,
    name: "Lisa Thompson",
    avatar: "🌺",
    points: 1340,
    weeklyPoints: 240,
    location: "Miami, FL",
    level: "Eco Champion",
    streak: 7,
    badges: 6,
    co2Saved: 32,
    actionsCount: 65,
    joinDate: "2024-03-05",
  },
  {
    id: 7,
    rank: 7,
    name: "James Park",
    avatar: "🌳",
    points: 1200,
    weeklyPoints: 210,
    location: "Chicago, IL",
    level: "Nature Lover",
    streak: 5,
    badges: 5,
    co2Saved: 28,
    actionsCount: 54,
    joinDate: "2024-04-01",
  },
  {
    id: 8,
    rank: 8,
    name: "Maria Garcia",
    avatar: "🦋",
    points: 1080,
    weeklyPoints: 190,
    location: "Phoenix, AZ",
    level: "Eco Starter",
    streak: 4,
    badges: 4,
    co2Saved: 24,
    actionsCount: 43,
    joinDate: "2024-04-15",
  },
];

const currentUser = {
  id: 9,
  rank: 23,
  name: "You",
  avatar: "🚀",
  points: 650,
  weeklyPoints: 85,
  location: "Your City",
  level: "Rising Star",
  streak: 3,
  badges: 3,
  co2Saved: 12,
  actionsCount: 28,
  joinDate: "2024-09-01",
};

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");

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
    { id: "co2", name: "CO₂ Saved", icon: Leaf },
    { id: "streak", name: "Streak", icon: Flame },
  ];

  const filteredLeaderboard = sampleLeaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
                  {currentUser.location} • {currentUser.level}
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
            <div className="text-xs text-white/60">CO₂</div>
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
            <div className="col-span-1">CO₂</div>
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
                    <div className="text-xs text-white/60">total points</div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-center">
                    <div className="text-sm font-bold text-green-400">
                      {user.actionsCount}
                    </div>
                  </div>

                  {/* CO₂ Saved */}
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
    </div>
  );
}
