"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  calculatePoints,
  getLevel,
  getLevelProgress,
  checkBadgeUnlocks,
  getBadgeRarityColor,
  formatNumber,
  getGreeting,
  getStreakBonus,
  type UserStats,
  type Badge,
  type Level,
} from "@/lib/utils";
import {
  Trophy,
  Flame,
  Star,
  Target,
  Zap,
  Award,
  TrendingUp,
  Calendar,
  Leaf,
  Droplets,
  Recycle,
  Crown,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle,
} from "lucide-react";

export default function OverviewPage() {
  const { user } = useAuthContext();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentBadges, setRecentBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  // Mock data - replace with real data from Appwrite
  useEffect(() => {
    const loadUserStats = async () => {
      setLoading(true);

      // Mock user stats - replace with real Appwrite queries
      const mockStats: UserStats = {
        totalPoints: 1247,
        currentStreak: 12,
        level: 4,
        badges: [
          "first-steps",
          "streak-starter",
          "week-warrior",
          "carbon-crusher",
        ],
        totalActions: 47,
        carbonSaved: 23.5,
        waterSaved: 180,
        wasteReduced: 12.3,
      };

      // Mock recent badges
      const mockBadges: Badge[] = [
        {
          id: "carbon-crusher",
          name: "Carbon Crusher",
          description: "Saved 10kg of CO₂",
          icon: "🌍",
          rarity: "rare",
          category: "impact",
          conditions: [{ type: "carbon", value: 10, operator: "gte" }],
          points: 75,
          unlocked: true,
          unlockedAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "week-warrior",
          name: "Week Warrior",
          description: "Maintained a 7-day streak",
          icon: "⚔️",
          rarity: "rare",
          category: "streak",
          conditions: [{ type: "streak", value: 7, operator: "gte" }],
          points: 50,
          unlocked: true,
          unlockedAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ];

      setUserStats(mockStats);
      setRecentBadges(mockBadges);
      setLoading(false);
    };

    loadUserStats();
  }, [user]);

  const levelProgress = userStats
    ? getLevelProgress(userStats.totalPoints)
    : null;
  const streakBonus = userStats ? getStreakBonus(userStats.currentStreak) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="Loading your progress..." />
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="py-12 text-center">
        <p className="text-earth-600 dark:text-dark-text-secondary">
          Unable to load your progress. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-earth-900 dark:text-dark-text-primary mb-2 text-4xl font-bold">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-earth-600 dark:text-dark-text-secondary text-lg">
          Keep up the amazing work on your eco-journey
        </p>
      </motion.div>

      {/* Level Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{levelProgress?.current.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {levelProgress?.current.name}
                  </h2>
                  <p className="text-green-100">
                    Level {levelProgress?.current.level}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {formatNumber(userStats.totalPoints)}
                </div>
                <div className="text-green-100">Total Points</div>
              </div>
            </div>

            {levelProgress?.next && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {levelProgress.next.name}</span>
                  <span>{Math.round(levelProgress.progress)}%</span>
                </div>
                <ProgressBar
                  value={levelProgress.progress}
                  variant="gradient"
                  showLabel={false}
                  className="h-3"
                />
                <div className="text-center text-sm text-green-100">
                  {levelProgress.pointsToNext} points to next level
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Streak Card */}
        <Card hover>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary mb-1 text-2xl font-bold">
              {userStats.currentStreak}
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary mb-2">
              Day Streak
            </p>
            {streakBonus > 0 && (
              <Badge variant="success" className="text-xs">
                +{streakBonus}% Bonus
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card hover>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary mb-1 text-2xl font-bold">
              {userStats.totalActions}
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Actions Completed
            </p>
          </CardContent>
        </Card>

        {/* Carbon Saved Card */}
        <Card hover>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary mb-1 text-2xl font-bold">
              {userStats.carbonSaved}kg
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              CO₂ Saved
            </p>
          </CardContent>
        </Card>

        {/* Water Saved Card */}
        <Card hover>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
              <Droplets className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary mb-1 text-2xl font-bold">
              {userStats.waterSaved}L
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Water Saved
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader title="Recent Badges" />
          <CardContent>
            {recentBadges.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {recentBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="dark:border-dark-border flex items-center space-x-4 rounded-lg border border-green-200 p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="text-3xl">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center space-x-2">
                        <h4 className="text-earth-900 dark:text-dark-text-primary font-semibold">
                          {badge.name}
                        </h4>
                        <Badge
                          className={`text-xs ${getBadgeRarityColor(badge.rarity)}`}
                        >
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-earth-600 dark:text-dark-text-secondary mb-2 text-sm">
                        {badge.description}
                      </p>
                      <div className="text-earth-500 dark:text-dark-text-muted flex items-center space-x-4 text-xs">
                        <span>+{badge.points} pts</span>
                        <span>
                          {badge.unlockedAt &&
                            new Date(badge.unlockedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Award className="text-earth-400 dark:text-dark-text-muted mx-auto mb-4 h-12 w-12" />
                <p className="text-earth-600 dark:text-dark-text-secondary">
                  No badges earned yet. Complete actions to unlock your first
                  badge!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader title="Quick Actions" />
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button
                fullWidth
                icon={<Plus className="h-4 w-4" />}
                className="h-12"
              >
                Log New Action
              </Button>
              <Button
                variant="secondary"
                fullWidth
                icon={<Target className="h-4 w-4" />}
                className="h-12"
              >
                Join Challenge
              </Button>
              <Button
                variant="outline"
                fullWidth
                icon={<Trophy className="h-4 w-4" />}
                className="h-12"
              >
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Badge Notifications */}
      <AnimatePresence>
        {newBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed right-4 bottom-4 z-50"
          >
            <Card className="max-w-sm border-green-200 shadow-xl dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎉</div>
                  <div className="flex-1">
                    <h4 className="text-earth-900 dark:text-dark-text-primary font-semibold">
                      Badge Unlocked!
                    </h4>
                    <p className="text-earth-600 dark:text-dark-text-secondary text-sm">
                      {newBadges[0].name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setNewBadges([])}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
