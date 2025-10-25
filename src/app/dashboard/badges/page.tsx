"use client";

import React, { useState, useEffect } from "react";
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
import { useAuthContext } from "@/components/providers/AuthProvider";
import {
  getAllBadgeDefinitions,
  getUserBadges,
  type BadgeDefinition,
  type UserBadge,
} from "@/lib/badges";

interface BadgeWithStatus extends BadgeDefinition {
  earned: boolean;
  earnedDate?: string;
  progress?: number;
}

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
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [badges, setBadges] = useState<BadgeDefinition[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load badges data on component mount
  useEffect(() => {
    const loadBadgesData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);
      try {
        // Load all badge definitions
        const allBadges = await getAllBadgeDefinitions();
        setBadges(allBadges);

        // Load user's earned badges
        const earnedBadges = await getUserBadges(user.$id);
        setUserBadges(earnedBadges);
      } catch (error) {
        console.error("Error loading badges:", error);
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
          setError("Failed to load badges. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadBadgesData();
  }, [user]);

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

  // Combine badge definitions with user earned status
  const badgesWithStatus: BadgeWithStatus[] = badges.map((badge) => {
    const earnedBadge = userBadges.find((ub) => ub.badgeId === badge.id);
    return {
      ...badge,
      earned: !!earnedBadge,
      earnedDate: earnedBadge?.earnedAt,
      progress: earnedBadge ? 100 : 0, // Could be enhanced with actual progress tracking
    };
  });

  const filteredBadges = badgesWithStatus.filter((badge) => {
    const categoryMatch =
      selectedCategory === "all" || badge.category === selectedCategory;
    const rarityMatch =
      selectedRarity === "all" || badge.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const earnedBadges = badgesWithStatus.filter((badge) => badge.earned);
  const totalBadges = badgesWithStatus.length;

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-green-500"></div>
            <p className="mt-4 text-white/60">Loading badges...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 backdrop-blur-2xl">
          <p className="text-center text-red-400">{error}</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
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
                  Track your progress and unlock achievements as you make a
                  positive impact
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
                      {
                        earnedBadges.filter((b) => b.rarity === "legendary")
                          .length
                      }
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
                              <h4 className="font-bold text-white">
                                {badge.name}
                              </h4>
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

                              {!badge.earned && (badge.progress || 0) < 100 && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/60">
                                      Progress
                                    </span>
                                    <span className="text-xs text-white/80">
                                      {badge.progress || 0}%
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
                                      style={{
                                        width: `${badge.progress || 0}%`,
                                      }}
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
        </>
      )}
    </div>
  );
}
