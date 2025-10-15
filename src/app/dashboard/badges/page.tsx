"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
} from "lucide-react";

export default function BadgesPage() {
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
              Badges & Achievements
            </h1>
            <p className="text-earth-600 dark:text-dark-text-secondary mt-2">
              Track your progress and unlock achievements as you make a positive
              impact.
            </p>
          </div>
          <Button icon={<Plus className="h-4 w-4" />}>
            Create Custom Badge
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-4"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary text-2xl font-bold">
              0
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Total Badges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary text-2xl font-bold">
              0
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Rare Badges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary text-2xl font-bold">
              0
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Epic Badges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4 inline-flex rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
              <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-earth-900 dark:text-dark-text-primary text-2xl font-bold">
              0
            </h3>
            <p className="text-earth-600 dark:text-dark-text-secondary">
              Legendary Badges
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 text-center"
      >
        <div className="mb-6 inline-flex rounded-full bg-green-100 p-6 dark:bg-green-900/30">
          <Award className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-earth-900 dark:text-dark-text-primary mb-4 text-2xl font-bold">
          Badges Coming Soon!
        </h2>
        <p className="text-earth-600 dark:text-dark-text-secondary mx-auto mb-6 max-w-2xl text-lg">
          We&apos;re working on an amazing badge system to reward your
          eco-friendly actions. Stay tuned for achievements, rare collectibles,
          and special recognition!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="success" icon={<Leaf className="h-3 w-3" />}>
            Eco Warrior
          </Badge>
          <Badge variant="info" icon={<Target className="h-3 w-3" />}>
            Goal Crusher
          </Badge>
          <Badge variant="warning" icon={<Users className="h-3 w-3" />}>
            Community Leader
          </Badge>
          <Badge variant="error" icon={<Zap className="h-3 w-3" />}>
            Energy Saver
          </Badge>
        </div>
      </motion.div>
    </div>
  );
}
