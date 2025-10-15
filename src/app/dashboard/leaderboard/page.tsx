"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trophy, Medal, Crown, Users, Filter, Search } from "lucide-react";

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const periods = [
    { id: "all", name: "All Time" },
    { id: "monthly", name: "This Month" },
    { id: "weekly", name: "This Week" },
    { id: "daily", name: "Today" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-earth-900 dark:text-dark-text-primary text-3xl font-bold">
              Leaderboard
            </h1>
            <p className="text-earth-600 dark:text-dark-text-secondary mt-2">
              See how you rank against other eco-warriors and track your
              progress.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" icon={<Users className="h-4 w-4" />}>
              Invite Friends
            </Button>
            <Button icon={<Trophy className="h-4 w-4" />}>View Rewards</Button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="text-earth-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Period Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-earth-500 h-4 w-4" />
            <div className="flex space-x-1">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "text-earth-600 dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                  <span className="text-lg font-bold text-white">#</span>
                </div>
                <div>
                  <h3 className="text-earth-900 dark:text-dark-text-primary text-lg font-semibold">
                    Your Current Rank
                  </h3>
                  <p className="text-earth-600 dark:text-dark-text-secondary">
                    Keep up the great work!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  --
                </div>
                <div className="text-earth-500 text-sm">Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="py-12 text-center"
      >
        <div className="mb-6 inline-flex rounded-full bg-yellow-100 p-6 dark:bg-yellow-900/30">
          <Trophy className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-earth-900 dark:text-dark-text-primary mb-4 text-2xl font-bold">
          Leaderboard Coming Soon!
        </h2>
        <p className="text-earth-600 dark:text-dark-text-secondary mx-auto mb-6 max-w-2xl text-lg">
          We&apos;re building an exciting leaderboard system to showcase the top
          eco-warriors. Compete with friends, climb the ranks, and earn
          recognition for your environmental impact!
        </p>

        {/* Mock Leaderboard Preview */}
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader title="Preview: Top Eco-Warriors" />
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    rank: 1,
                    name: "Eco Champion",
                    points: "2,450",
                    icon: Crown,
                  },
                  {
                    rank: 2,
                    name: "Green Warrior",
                    points: "2,100",
                    icon: Medal,
                  },
                  {
                    rank: 3,
                    name: "Earth Saver",
                    points: "1,850",
                    icon: Trophy,
                  },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                        <user.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-earth-900 dark:text-dark-text-primary font-medium">
                          {user.name}
                        </div>
                        <div className="text-earth-600 dark:text-dark-text-secondary text-sm">
                          Rank #{user.rank}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {user.points}
                      </div>
                      <div className="text-earth-500 text-xs">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
