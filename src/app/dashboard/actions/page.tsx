"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
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
  const [actions, setActions] = useState<Action[]>([]);
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
        setActions(userActions);
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
        // Fallback to empty array on error
        setActions([]);
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
      >
        <h1 className="text-earth-900 dark:text-dark-text-primary mb-2 text-3xl font-bold">
          Log Eco Actions
        </h1>
        <p className="text-earth-600 dark:text-dark-text-secondary">
          Track your environmental impact and earn points for sustainable
          actions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Action Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader title="Log New Action" />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary mb-2 block text-sm font-medium">
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
                        className={`rounded-lg border-2 p-3 transition-all ${
                          selectedCategory === category.id
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "dark:border-dark-border border-green-200 hover:border-green-300"
                        }`}
                      >
                        <category.icon
                          className={`mx-auto mb-1 h-5 w-5 ${category.color}`}
                        />
                        <div className="text-earth-900 dark:text-dark-text-primary text-xs font-medium">
                          {category.name}
                        </div>
                        <div className="text-earth-600 dark:text-dark-text-secondary text-xs">
                          {category.basePoints} pts
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
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
                    rows={3}
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary mb-2 block text-sm font-medium">
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
                          className={`rounded-lg border-2 p-2 capitalize transition-all ${
                            watchedDifficulty === level
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "dark:border-dark-border border-green-200 hover:border-green-300"
                          }`}
                        >
                          <div className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
                            {level}
                          </div>
                          <div className="text-earth-600 dark:text-dark-text-secondary text-xs">
                            {multiplier}x
                          </div>
                        </motion.button>
                      ),
                    )}
                  </div>
                  {errors.difficulty && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>

                {/* Points Preview */}
                {watchedCategory && watchedDifficulty && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Points Earned:
                      </span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
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
                  {submitting ? "Logging Action..." : "Log Action"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader title="Recent Actions" />
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
                          className="dark:border-dark-border rounded-lg border border-green-200 p-4 transition-shadow hover:shadow-md"
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
                                <h3 className="text-earth-900 dark:text-dark-text-primary font-medium">
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
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                +{action.points}
                              </div>
                              <div className="text-earth-600 dark:text-dark-text-secondary flex items-center text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTimeAgo(action.timestamp)}
                              </div>
                            </div>
                          </div>

                          {/* Impact Metrics */}
                          <div className="dark:border-dark-border grid grid-cols-3 gap-4 border-t border-green-200 pt-3">
                            <div className="text-center">
                              <div className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
                                {action.impact.carbonSaved} kg
                              </div>
                              <div className="text-earth-600 dark:text-dark-text-secondary text-xs">
                                CO₂ Saved
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
                                {action.impact.waterSaved} L
                              </div>
                              <div className="text-earth-600 dark:text-dark-text-secondary text-xs">
                                Water Saved
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
                                {action.impact.wasteReduced} kg
                              </div>
                              <div className="text-earth-600 dark:text-dark-text-secondary text-xs">
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
                      <AlertCircle className="text-earth-400 dark:text-dark-text-muted mx-auto mb-4 h-12 w-12" />
                      <p className="text-earth-600 dark:text-dark-text-secondary mb-4">
                        No actions logged yet. Start by logging your first
                        eco-friendly action!
                      </p>
                      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
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
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
