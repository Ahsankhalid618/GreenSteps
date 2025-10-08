"use client";

import React from "react";
import { motion } from "framer-motion";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LogoutButton } from "@/components/ui/LogoutButton";
import {
  Leaf,
  TrendingUp,
  Target,
  Users,
  Calendar,
  Plus,
  Award,
  Zap,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - replace with real data from your database
  const mockData = {
    totalPoints: 2450,
    level: 3,
    currentStreak: 7,
    totalActions: 42,
    carbonSaved: 12.5,
    waterSaved: 150,
    wasteReduced: 8.2,
    recentBadges: ["First Steps", "Week Warrior", "Carbon Crusher"],
    weeklyProgress: 75,
    monthlyGoal: 100,
  };

  const stats = [
    {
      title: "Carbon Saved",
      value: `${mockData.carbonSaved} kg`,
      icon: Leaf,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Water Saved",
      value: `${mockData.waterSaved} L`,
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Waste Reduced",
      value: `${mockData.wasteReduced} kg`,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Current Streak",
      value: `${mockData.currentStreak} days`,
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Points Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <PointsDisplay
          points={mockData.totalPoints}
          level={mockData.level}
          badges={mockData.recentBadges}
          showBadges={true}
          size="lg"
        />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card hover className="text-center">
              <CardContent className="p-6">
                <div
                  className={`inline-flex rounded-full p-3 ${stat.bgColor} mb-4`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <h3 className="text-earth-900 mb-1 text-2xl font-bold">
                  {stat.value}
                </h3>
                <p className="text-earth-600">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <div className="space-y-4">
                <Button fullWidth icon={<Plus className="h-4 w-4" />}>
                  Log New Action
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  icon={<Target className="h-4 w-4" />}
                >
                  Join Challenge
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Users className="h-4 w-4" />}
                >
                  View Leaderboard
                </Button>
                <div className="dark:border-dark-border border-t border-green-200 pt-2">
                  <LogoutButton
                    variant="ghost"
                    fullWidth
                    showConfirmation={true}
                    icon={<LogOut className="h-4 w-4" />}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                  >
                    Sign Out
                  </LogoutButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader
              title="Weekly Progress"
              subtitle={`${mockData.weeklyProgress}% of monthly goal`}
            />
            <CardContent>
              <div className="space-y-4">
                <ProgressBar
                  value={mockData.weeklyProgress}
                  variant="gradient"
                  showLabel={true}
                  label="This Week"
                />
                <div className="text-earth-600 flex justify-between text-sm">
                  <span>{mockData.weeklyProgress} actions this week</span>
                  <span>
                    {mockData.monthlyGoal - mockData.weeklyProgress} to goal
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-green-200 pt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="text-earth-600 text-sm">
                      Next milestone in 3 days
                    </span>
                  </div>
                  <Badge variant="success" icon={<Award className="h-3 w-3" />}>
                    On Track
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <Card>
          <CardHeader title="Recent Achievements" />
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {mockData.recentBadges.map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <Badge variant="success" icon={<Award className="h-3 w-3" />}>
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
