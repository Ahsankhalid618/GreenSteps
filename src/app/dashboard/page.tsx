"use client";

import React from "react";
import { motion } from "framer-motion";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
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
  TreePine,
  Droplet,
  Recycle,
  TrendingDown,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - replace with real data from your database
  const mockData = {
    totalPoints: 2450,
    level: 2,
    currentStreak: 7,
    totalActions: 42,
    carbonSaved: 12.5,
    waterSaved: 150,
    wasteReduced: 8.2,
    recentBadges: [
      { name: "First Steps", date: "2 days ago", points: 100 },
      { name: "Week Warrior", date: "1 week ago", points: 250 },
      { name: "Carbon Crusher", date: "2 weeks ago", points: 500 },
    ],
    weeklyProgress: 75,
    monthlyGoal: 100,
  };

  const todayImpact = [
    {
      label: "Trees Saved",
      value: "3.2",
      icon: TreePine,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "+12%",
    },
    {
      label: "Water Conserved",
      value: "45L",
      icon: Droplet,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
      trend: "+8%",
    },
    {
      label: "Waste Avoided",
      value: "2.1kg",
      icon: Recycle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      trend: "+15%",
    },
    {
      label: "CO₂ Reduced",
      value: "4.5kg",
      icon: TrendingDown,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      trend: "+20%",
    },
  ];

  const dailyGoals = [
    {
      task: "Log 3 eco actions",
      completed: 2,
      total: 3,
      icon: CheckCircle2,
    },
    {
      task: "Reduce plastic use",
      completed: 1,
      total: 1,
      icon: CheckCircle2,
    },
    {
      task: "Share progress",
      completed: 0,
      total: 1,
      icon: Clock,
    },
  ];

  const stats = [
    {
      title: "Carbon Saved",
      value: `${mockData.carbonSaved} kg`,
      icon: Leaf,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/40",
      trend: "+18%",
      subtitle: "This month",
    },
    {
      title: "Water Saved",
      value: `${mockData.waterSaved} L`,
      icon: Droplet,
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-900/40",
      trend: "+12%",
      subtitle: "This month",
    },
    {
      title: "Waste Reduced",
      value: `${mockData.wasteReduced} kg`,
      icon: Recycle,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/40",
      trend: "+25%",
      subtitle: "This month",
    },
    {
      title: "Current Streak",
      value: `${mockData.currentStreak} days`,
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/40",
      trend: "🔥",
      subtitle: "Keep it up!",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bento Grid Layout */}
      <div className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
        {/* Points Display - Spans full width on mobile, 2 cols on tablet, 4 cols on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 lg:col-span-4"
        >
          <PointsDisplay
            points={mockData.totalPoints}
            level={mockData.level}
            badges={mockData.recentBadges.map((b) => b.name)}
            showBadges={true}
            size="lg"
          />
        </motion.div>

        {/* Today's Impact & Goals - Right column on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            {/* Today's Impact Section */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white/80">
                  <Zap className="h-5 w-5 text-green-500" />
                  Today's Impact
                </h3>
                <span className="text-xs text-green-400">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {todayImpact.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className={`rounded-xl p-3 ${item.bgColor} backdrop-blur-sm transition-all hover:scale-105`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-xs font-semibold text-green-400">
                        {item.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white/80">
                      {item.value}
                    </p>
                    <p className="text-xs text-white/60">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Daily Goals Section */}
            <div className="border-earth-300 dark:border-dark-border border-t pt-4">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Daily Goals
              </h4>
              <div className="space-y-2">
                {dailyGoals.map((goal, index) => (
                  <motion.div
                    key={goal.task}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3 transition-all hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      {goal.completed === goal.total ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm text-white/90">{goal.task}</span>
                    </div>
                    <span className="text-xs font-medium text-white/60">
                      {goal.completed}/{goal.total}
                    </span>
                  </motion.div>
                ))}
              </div>
              <button className="btn-primary mt-4 flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm text-white/80">
                <Plus className="h-4 w-4" />
                Add New Goal
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - 4 columns that wrap */}
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="md:col-span-1 lg:col-span-1"
          >
            <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-green-500/10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-400">
                  {stat.trend}
                </span>
              </div>
              <div
                className={`inline-flex rounded-full p-4 ${stat.bgColor} mb-3`}
              >
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <h3 className="mb-1 text-3xl font-bold text-white/80">
                {stat.value}
              </h3>
              <p className="body-sm mb-1">{stat.title}</p>
              <p className="text-xs text-white/50">{stat.subtitle}</p>
            </div>
          </motion.div>
        ))}

        {/* Weekly Progress - Spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            <div className="mb-6">
              <h3 className="heading-xs text-white/80">Weekly Progress</h3>
              <p className="body-sm mt-1">
                {mockData.weeklyProgress}% of monthly goal
              </p>
            </div>
            <div className="space-y-4">
              <div className="progress-bar h-3">
                <div
                  className="progress-fill"
                  style={{ width: `${mockData.weeklyProgress}%` }}
                />
              </div>
              <div className="body-sm flex justify-between">
                <span>{mockData.weeklyProgress} actions this week</span>
                <span>
                  {mockData.monthlyGoal - mockData.weeklyProgress} to goal
                </span>
              </div>
              <div className="border-earth-300 dark:border-dark-border flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="body-sm">Next milestone in 3 days</span>
                </div>
                <span className="badge-success">
                  <Award className="h-3 w-3" />
                  On Track
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements - Spans 3 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white/80">
                Recent Achievements
              </h3>
              <span className="text-xs text-white/50">3 unlocked</span>
            </div>
            <div className="space-y-3">
              {mockData.recentBadges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                      <Award className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {badge.name}
                      </h4>
                      <p className="text-xs text-white/50">{badge.date}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold text-green-400">
                    +{badge.points}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
