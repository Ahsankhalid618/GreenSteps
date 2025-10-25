"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  Plus,
  Clock,
  Leaf,
  Zap,
  Recycle,
  Car,
  Home,
  ShoppingBag,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { z } from "zod";
import {
  saveAction,
  getUserActions,
  type Action,
  type CreateActionData,
} from "@/lib/actions";

// Validation schema
const actionSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
});

type ActionFormData = z.infer<typeof actionSchema>;

// Action categories with base points
const actionCategories = [
  {
    id: "transportation",
    name: "Transportation",
    icon: Car,
    basePoints: 20,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    description: "Walking, cycling, public transport",
  },
  {
    id: "energy",
    name: "Energy",
    icon: Zap,
    basePoints: 15,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    description: "Saving electricity, using renewable energy",
  },
  {
    id: "waste",
    name: "Waste",
    icon: Recycle,
    basePoints: 25,
    color: "text-green-500",
    bgColor: "bg-green-100",
    description: "Recycling, composting, reducing waste",
  },
  {
    id: "water",
    name: "Water",
    icon: Leaf,
    basePoints: 18,
    color: "text-cyan-500",
    bgColor: "bg-cyan-100",
    description: "Water conservation, efficient usage",
  },
  {
    id: "consumption",
    name: "Consumption",
    icon: ShoppingBag,
    basePoints: 12,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    description: "Sustainable shopping, minimalism",
  },
  {
    id: "home",
    name: "Home",
    icon: Home,
    basePoints: 10,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    description: "Home improvements, sustainable living",
  },
];

const difficultyMultipliers = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

// Action interface is now imported from lib/actions

export default function ActionsPage() {
  const { user } = useAuthContext();
  // Initialize with sample data to populate the monthly progress
  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      category: "transportation",
      description: "Walked to work instead of driving - 2km distance",
      difficulty: "easy",
      points: 20,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      impact: {
        carbonSaved: 2,
        waterSaved: 40,
        wasteReduced: 1,
      },
      userId: user?.$id || "",
    },
    {
      id: "2",
      category: "energy",
      description: "Switched to LED bulbs throughout the house",
      difficulty: "medium",
      points: 23,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      impact: {
        carbonSaved: 2,
        waterSaved: 45,
        wasteReduced: 1,
      },
      userId: user?.$id || "",
    },
    {
      id: "3",
      category: "waste",
      description: "Started composting kitchen scraps and organic waste",
      difficulty: "hard",
      points: 50,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      impact: {
        carbonSaved: 5,
        waterSaved: 100,
        wasteReduced: 3,
      },
      userId: user?.$id || "",
    },
    
  ]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ActionFormData>({
    resolver: zodResolver(actionSchema),
  });

  const watchedCategory = watch("category");
  const watchedDifficulty = watch("difficulty");

  // Calculate points based on category and difficulty
  const calculatePoints = (category: string, difficulty: string) => {
    const categoryData = actionCategories.find((cat) => cat.id === category);
    if (!categoryData) return 0;

    const multiplier =
      difficultyMultipliers[difficulty as keyof typeof difficultyMultipliers] ||
      1;
    return Math.round(categoryData.basePoints * multiplier);
  };

  // Calculate impact metrics
  const calculateImpact = (category: string, difficulty: string) => {
    const basePoints = calculatePoints(category, difficulty);
    const multiplier =
      difficultyMultipliers[difficulty as keyof typeof difficultyMultipliers] ||
      1;

    return {
      carbonSaved: Math.round(basePoints * 0.1 * multiplier), // kg CO2
      waterSaved: Math.round(basePoints * 2 * multiplier), // liters
      wasteReduced: Math.round(basePoints * 0.05 * multiplier), // kg
    };
  };

  // Load recent actions from Appwrite
  useEffect(() => {
    const loadActions = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userActions = await getUserActions(user.$id, 20);
        // Merge real actions with sample data, prioritizing real actions
        setActions((prevActions) => {
          const realActionIds = userActions.map((action) => action.id);
          const sampleActionsFiltered = prevActions.filter(
            (action) => !realActionIds.includes(action.id),
          );
          return [...userActions, ...sampleActionsFiltered];
        });
      } catch (error) {
        console.error("Error loading actions:", error);
        // Check if it's a database not found error
        if (
          error instanceof Error &&
          error.message.includes("Database not found")
        ) {
          console.warn("Database not found. Please run the setup first.");
        }

        // Check if it's a schema error
        if (
          error instanceof Error &&
          error.message.includes("Attribute not found in schema")
        ) {
          console.warn(
            "Database schema is not set up correctly. Please check the Schema Validation Guide.",
          );
        }
        // Keep sample data on error - don't reset to empty array
        console.log("Using sample data due to database error");
      } finally {
        setLoading(false);
      }
    };

    loadActions();
  }, [user]);

  const onSubmit = async (data: ActionFormData) => {
    if (!user) return;

    setSubmitting(true);
    try {
      const points = calculatePoints(data.category, data.difficulty);
      const impact = calculateImpact(data.category, data.difficulty);

      const actionData: CreateActionData = {
        category: data.category,
        description: data.description,
        difficulty: data.difficulty,
        points,
        impact,
      };

      const newAction = await saveAction(actionData, user.$id);

      setActions((prev) => [newAction, ...prev]);
      reset();
      setSelectedCategory("");
    } catch (error) {
      console.error("Error saving action:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryData = (categoryId: string) => {
    return actionCategories.find((cat) => cat.id === categoryId);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const actionTime = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - actionTime.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-white">Log Eco Actions</h1>
        <p className="text-white/60">
          Track your environmental impact and earn points for sustainable
          actions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Action Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-12"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {actionCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20 hover:bg-white/[0.04]"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setValue("category", category.id);
                  }}
                >
                  <div className="mb-2 inline-flex rounded-lg bg-white/5 p-2">
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                  </div>
                  <h4 className="mb-1 text-xs font-semibold text-white">
                    {category.name}
                  </h4>
                  <p className="text-xs text-green-400">
                    {category.basePoints} pts
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Today's Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
            <h3 className="mb-3 text-base font-bold text-white">
              Today&apos;s Impact
            </h3>
            <div className="space-y-4">
              {/* Main Impact Metrics */}
              <div className="space-y-3">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-white/70">CO₂ Saved</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-white">
                      {actions.reduce(
                        (total, action) => total + action.impact.carbonSaved,
                        0,
                      )}{" "}
                      kg
                    </p>
                    <span className="text-xs text-green-400">+12% vs yesterday</span>
                  </div>
                </div>
                <div className="rounded-lg bg-blue-500/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-white/70">Water Saved</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-white">
                      {actions.reduce(
                        (total, action) => total + action.impact.waterSaved,
                        0,
                      )}{" "}
                      L
                    </p>
                    <span className="text-xs text-blue-400">+8% vs yesterday</span>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-500/10 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-amber-400" />
                    <span className="text-xs text-white/70">Waste Reduced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-white">
                      {actions.reduce(
                        (total, action) => total + action.impact.wasteReduced,
                        0,
                      )}{" "}
                      kg
                    </p>
                    <span className="text-xs text-amber-400">+25% vs yesterday</span>
                  </div>
                </div>
              </div>

              {/* Daily Goal Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Daily Goal Progress</span>
                  <span className="text-xs text-white/80">3/5 goals</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>



              {/* Environmental Equivalents */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-white/80">Impact Equivalents</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                    <span className="text-xs text-white/70">🌳 Trees planted</span>
                    <span className="text-xs text-green-400">0.8 trees</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                    <span className="text-xs text-white/70">🚗 Car miles avoided</span>
                    <span className="text-xs text-blue-400">42 miles</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                    <span className="text-xs text-white/70">💡 Bulbs powered</span>
                    <span className="text-xs text-amber-400">168 hours</span>
                  </div>
                </div>
              </div>

              {/* Daily Challenge */}
              <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-3 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🎯</div>
                  <div>
                    <div className="text-xs font-medium text-white">Daily Challenge</div>
                    <div className="text-xs text-white/60">Use public transport once</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-xs text-emerald-400">2/3 done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-6"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            <h3 className="mb-4 text-base font-bold text-white">
              Log New Action
            </h3>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Category Selection */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/80">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {actionCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setValue("category", category.id);
                        }}
                        className={`rounded-lg border p-2 transition-all ${
                          selectedCategory === category.id
                            ? "border-green-500 bg-green-500/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <category.icon
                          className={`mx-auto mb-1 h-4 w-4 ${category.color}`}
                        />
                        <div className="text-xs font-medium text-white">
                          {category.name}
                        </div>
                        <div className="text-xs text-white/60">
                          {category.basePoints} pts
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Textarea
                    label="Description"
                    placeholder="Describe your eco-friendly action..."
                    {...register("description")}
                    error={errors.description?.message}
                    rows={2}
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/80">
                    Difficulty
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(difficultyMultipliers).map(
                      ([level, multiplier]) => (
                        <motion.button
                          key={level}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setValue(
                              "difficulty",
                              level as "easy" | "medium" | "hard",
                            )
                          }
                          className={`rounded-lg border p-2 capitalize transition-all ${
                            watchedDifficulty === level
                              ? "border-green-500 bg-green-500/10"
                              : "border-white/10 bg-white/[0.03] hover:border-white/20"
                          }`}
                        >
                          <div className="text-xs font-medium text-white">
                            {level}
                          </div>
                          <div className="text-xs text-white/60">
                            {multiplier}x
                          </div>
                        </motion.button>
                      ),
                    )}
                  </div>
                  {errors.difficulty && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>

                {/* Points Preview */}
                {watchedCategory && watchedDifficulty && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-green-500/20 bg-green-500/10 p-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white/80">
                        Points Earned:
                      </span>
                      <span className="text-base font-bold text-green-400">
                        {calculatePoints(watchedCategory, watchedDifficulty)}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  loading={submitting}
                  disabled={!selectedCategory || !watchedDifficulty}
                  icon={<Plus className="h-4 w-4" />}
                >
                  {submitting ? "Logging..." : "Log Action"}
                </Button>
              </form>
            </CardContent>
          </div>
        </motion.div>

        {/* Monthly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl">
            <h3 className="mb-3 text-base font-bold text-white">
              Monthly Progress
            </h3>
            <div className="space-y-4">
              {/* Actions Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Actions Logged</span>
                  <span className="text-lg font-bold text-white">
                    {actions.length}/50
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                    style={{
                      width: `${Math.min((actions.length / 50) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Points Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Monthly Goal</span>
                  <span className="text-sm font-bold text-white">
                    {actions.reduce(
                      (total, action) => total + action.points,
                      0,
                    )}
                    /500
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                    style={{
                      width: `${Math.min((actions.reduce((total, action) => total + action.points, 0) / 500) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-white/80">
                  Top Categories
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">
                      🚗 Transportation
                    </span>
                    <span className="text-xs text-green-400">
                      {
                        actions.filter((a) => a.category === "transportation")
                          .length
                      }{" "}
                      actions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">♻️ Waste</span>
                    <span className="text-xs text-green-400">
                      {actions.filter((a) => a.category === "waste").length}{" "}
                      actions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">⚡ Energy</span>
                    <span className="text-xs text-green-400">
                      {actions.filter((a) => a.category === "energy").length}{" "}
                      actions
                    </span>
                  </div>
                </div>
              </div>

              {/* Weekly Comparison */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-white/80">
                  This Week vs Last
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white/[0.03] p-2 text-center">
                    <div className="text-sm font-bold text-green-400">+23%</div>
                    <div className="text-xs text-white/60">More Actions</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2 text-center">
                    <div className="text-sm font-bold text-blue-400">+15%</div>
                    <div className="text-xs text-white/60">More Points</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-2">
                <div className="text-center">
                  <div className="text-base font-bold text-green-400">
                    {actions.length}
                  </div>
                  <div className="text-xs text-white/60">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-blue-400">
                    {actions.reduce(
                      (total, action) => total + action.points,
                      0,
                    )}
                  </div>
                  <div className="text-xs text-white/60">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-amber-400">7</div>
                  <div className="text-xs text-white/60">Day Streak</div>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🏆</div>
                  <div>
                    <div className="text-xs font-medium text-white">
                      Eco Warrior
                    </div>
                    <div className="text-xs text-white/60">
                      Level 2 • Next: 250 pts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-12"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Actions</h3>
              <span className="text-xs text-white/60">
                {actions.length} total
              </span>
            </div>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="md" text="Loading actions..." />
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {actions.map((action, index) => {
                      const categoryData = getCategoryData(action.category);
                      return (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]"
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              {categoryData && (
                                <div
                                  className={`rounded-lg p-2 ${categoryData.bgColor}`}
                                >
                                  <categoryData.icon
                                    className={`h-5 w-5 ${categoryData.color}`}
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-medium text-white">
                                  {action.description}
                                </h3>
                                <div className="mt-1 flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {categoryData?.name}
                                  </Badge>
                                  <Badge
                                    className={`text-xs ${getDifficultyColor(action.difficulty)}`}
                                  >
                                    {action.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-400">
                                +{action.points}
                              </div>
                              <div className="flex items-center text-xs text-white/60">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTimeAgo(action.timestamp)}
                              </div>
                            </div>
                          </div>

                          {/* Impact Metrics */}
                          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-3">
                            <div className="text-center">
                              <div className="text-sm font-medium text-white">
                                {action.impact.carbonSaved} kg
                              </div>
                              <div className="text-xs text-white/60">
                                CO₂ Saved
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium text-white">
                                {action.impact.waterSaved} L
                              </div>
                              <div className="text-xs text-white/60">
                                Water Saved
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium text-white">
                                {action.impact.wasteReduced} kg
                              </div>
                              <div className="text-xs text-white/60">
                                Waste Reduced
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {actions.length === 0 && (
                    <div className="py-8 text-center">
                      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-white/40" />
                      <p className="mb-4 text-white/60">
                        No actions logged yet. Start by logging your first
                        eco-friendly action!
                      </p>
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                        <p className="text-sm text-blue-300">
                          <strong>Database Setup Required:</strong> If
                          you&apos;re seeing this message and can&apos;t log
                          actions, please check the{" "}
                          <a
                            href="/SCHEMA_VALIDATION_GUIDE.md"
                            className="underline"
                            target="_blank"
                          >
                            Schema Validation Guide
                          </a>{" "}
                          to fix database schema issues.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
