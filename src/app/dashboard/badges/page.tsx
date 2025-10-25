"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  Leaf,
  Users,
  Plus,
  Crown,
  Gem,
  Lock,
  CheckCircle,
  Flame,
  Globe,
} from "lucide-react";

// Sample badges data
const sampleBadges = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first eco-friendly action",
    icon: "🌱",
    rarity: "common",
    earned: true,
    earnedDate: "2024-10-20",
    progress: 100,
    category: "getting-started",
  },
  {
    id: 2,
    name: "Eco Warrior",
    description: "Complete 10 eco-friendly actions",
    icon: "⚔️",
    rarity: "rare",
    earned: true,
    earnedDate: "2024-10-22",
    progress: 100,
    category: "achievements",
  },
  {
    id: 3,
    name: "Green Week",
    description: "Log actions for 7 consecutive days",
    icon: "📅",
    rarity: "epic",
    earned: false,
    progress: 71,
    category: "streaks",
  },
  {
    id: 4,
    name: "Carbon Crusher",
    description: "Save 100kg of CO₂",
    icon: "🌍",
    rarity: "legendary",
    earned: false,
    progress: 17,
    category: "impact",
  },
  {
    id: 5,
    name: "Transport Hero",
    description: "Complete 5 transportation actions",
    icon: "🚲",
    rarity: "rare",
    earned: true,
    earnedDate: "2024-10-23",
    progress: 100,
    category: "transportation",
  },
  {
    id: 6,
    name: "Water Guardian",
    description: "Save 1000L of water",
    icon: "💧",
    rarity: "epic",
    earned: false,
    progress: 34,
    category: "water",
  },
  {
    id: 7,
    name: "Community Leader",
    description: "Inspire 5 friends to join",
    icon: "👥",
    rarity: "legendary",
    earned: false,
    progress: 0,
    category: "social",
  },
  {
    id: 8,
    name: "Energy Saver",
    description: "Complete 3 energy actions",
    icon: "⚡",
    rarity: "common",
    earned: true,
    earnedDate: "2024-10-24",
    progress: 100,
    category: "energy",
  },
];

const rarityColors = {
  common: {
    bg: "bg-gray-500/20",
    border: "border-gray-500/30",
    text: "text-gray-400",
    glow: "shadow-gray-500/20",
  },
  rare: {
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  epic: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
  },
  legendary: {
    bg: "bg-amber-500/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
  },
};

export default function BadgesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");

  const categories = [
    { id: "all", name: "All Badges", icon: Trophy },
    { id: "getting-started", name: "Getting Started", icon: Star },
    { id: "achievements", name: "Achievements", icon: Award },
    { id: "streaks", name: "Streaks", icon: Flame },
    { id: "impact", name: "Impact", icon: Globe },
    { id: "transportation", name: "Transport", icon: Target },
    { id: "energy", name: "Energy", icon: Zap },
    { id: "water", name: "Water", icon: Leaf },
    { id: "social", name: "Social", icon: Users },
  ];

  const filteredBadges = sampleBadges.filter((badge) => {
    const categoryMatch =
      selectedCategory === "all" || badge.category === selectedCategory;
    const rarityMatch =
      selectedRarity === "all" || badge.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const earnedBadges = sampleBadges.filter((badge) => badge.earned);
  const totalBadges = sampleBadges.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              Badges & Achievements
            </h1>
            <p className="text-white/60">
              Track your progress and unlock achievements as you make a positive
              impact
            </p>
          </div>
          <Button
            icon={<Plus className="h-4 w-4" />}
            className="border-green-500/30 bg-green-500/20 text-white/90 hover:bg-green-500/30"
          >
            Share Progress
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-12"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-2 inline-flex rounded-lg bg-green-500/20 p-3">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {earnedBadges.length}
                </h3>
                <p className="text-xs text-white/60">Total Badges</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-2 inline-flex rounded-lg bg-blue-500/20 p-3">
                  <Star className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {earnedBadges.filter((b) => b.rarity === "rare").length}
                </h3>
                <p className="text-xs text-white/60">Rare Badges</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-2 inline-flex rounded-lg bg-purple-500/20 p-3">
                  <Crown className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {earnedBadges.filter((b) => b.rarity === "epic").length}
                </h3>
                <p className="text-xs text-white/60">Epic Badges</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-2 inline-flex rounded-lg bg-amber-500/20 p-3">
                  <Gem className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {earnedBadges.filter((b) => b.rarity === "legendary").length}
                </h3>
                <p className="text-xs text-white/60">Legendary</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Collection Progress & Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4"
        >
          <div className="space-y-4">
            {/* Collection Progress */}

            {/* Filter Categories */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
              <h3 className="mb-3 text-base font-bold text-white">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-lg border p-2 transition-all ${
                      selectedCategory === category.id
                        ? "border-green-500 bg-green-500/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <category.icon className="mx-auto mb-1 h-4 w-4 text-green-400" />
                    <div className="text-xs font-medium text-white">
                      {category.name}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
              <h3 className="mb-3 text-base font-bold text-white">
                Collection Progress
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">
                      Overall Progress
                    </span>
                    <span className="text-sm font-bold text-white">
                      {earnedBadges.length}/{totalBadges}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                      style={{
                        width: `${(earnedBadges.length / totalBadges) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-white/80">
                    Recent Achievements
                  </h4>
                  <div className="space-y-1">
                    {earnedBadges.slice(-3).map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-2"
                      >
                        <span className="text-lg">{badge.icon}</span>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-white">
                            {badge.name}
                          </div>
                          <div className="text-xs text-white/60">
                            {badge.earnedDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🎯</div>
                    <div>
                      <div className="text-xs font-medium text-white">
                        Next Milestone
                      </div>
                      <div className="text-xs text-white/60">
                        Earn 2 more badges
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-8"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Badge Collection
              </h3>
              <div className="flex gap-2">
                {["all", "common", "rare", "epic", "legendary"].map(
                  (rarity) => (
                    <button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity)}
                      className={`rounded-lg px-3 py-1 text-xs transition-all ${
                        selectedRarity === rarity
                          ? "bg-white/20 text-white"
                          : "bg-white/[0.03] text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              <AnimatePresence>
                {filteredBadges.map((badge, index) => {
                  const colors =
                    rarityColors[badge.rarity as keyof typeof rarityColors];
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`rounded-xl border ${colors.border} ${colors.bg} p-4 backdrop-blur-sm transition-all hover:scale-105 ${colors.glow} hover:shadow-lg ${
                        !badge.earned ? "opacity-60" : ""
                      }`}
                    >
                      <div className="relative">
                        {!badge.earned && (
                          <div className="absolute -top-2 -right-2 rounded-full bg-white/10 p-1">
                            <Lock className="h-3 w-3 text-white/60" />
                          </div>
                        )}
                        {badge.earned && (
                          <div className="absolute -top-2 -right-2 rounded-full bg-green-500/20 p-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          </div>
                        )}

                        <div className="mb-3 text-center">
                          <div className="mb-2 text-4xl">{badge.icon}</div>
                          <h4 className="font-bold text-white">{badge.name}</h4>
                          <p className="mt-1 text-xs text-white/60">
                            {badge.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-medium ${colors.text}`}
                            >
                              {badge.rarity.toUpperCase()}
                            </span>
                            {badge.earned && (
                              <span className="text-xs text-white/60">
                                {badge.earnedDate}
                              </span>
                            )}
                          </div>

                          {!badge.earned && badge.progress < 100 && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/60">
                                  Progress
                                </span>
                                <span className="text-xs text-white/80">
                                  {badge.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${
                                    badge.rarity === "common"
                                      ? "from-gray-600 to-gray-400"
                                      : badge.rarity === "rare"
                                        ? "from-blue-600 to-blue-400"
                                        : badge.rarity === "epic"
                                          ? "from-purple-600 to-purple-400"
                                          : "from-amber-600 to-amber-400"
                                  }`}
                                  style={{ width: `${badge.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
