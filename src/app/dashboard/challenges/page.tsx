"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useAuthContext } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import {
  Target,
  Users,
  Trophy,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Star,
  Leaf,
  Zap,
  TrendingUp,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "community" | "personal";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  requirements: string[];
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  currentParticipants: number;
  isJoined: boolean;
  progress: number;
  status: "active" | "completed" | "upcoming" | "expired";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

export default function ChallengesPage() {
  // const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real data from Appwrite
  const mockChallenges: Challenge[] = useMemo(
    () => [
      {
        id: "1",
        title: "30-Day Carbon Footprint Challenge",
        description:
          "Reduce your carbon footprint by 20% over 30 days through sustainable transportation and energy conservation.",
        type: "community",
        category: "Transportation",
        difficulty: "hard",
        points: 500,
        requirements: [
          "Use public transport or bike for 20 days",
          "Reduce energy consumption by 15%",
          "Plant 5 trees or equivalent",
          "Complete 10 eco-friendly actions",
        ],
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        maxParticipants: 100,
        currentParticipants: 67,
        isJoined: true,
        progress: 65,
        status: "active",
        icon: Leaf,
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
      {
        id: "2",
        title: "Zero Waste Week",
        description:
          "Go completely zero waste for one week. No single-use plastics, minimal packaging, and creative reuse.",
        type: "community",
        category: "Waste",
        difficulty: "medium",
        points: 300,
        requirements: [
          "No single-use plastics for 7 days",
          "Compost all organic waste",
          "Use reusable containers only",
          "Find creative reuse for 3 items",
        ],
        startDate: "2024-01-15",
        endDate: "2024-01-22",
        maxParticipants: 50,
        currentParticipants: 23,
        isJoined: false,
        progress: 0,
        status: "upcoming",
        icon: Target,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        id: "3",
        title: "Energy Efficiency Master",
        description:
          "Optimize your home's energy usage and reduce electricity consumption by 30%.",
        type: "personal",
        category: "Energy",
        difficulty: "medium",
        points: 250,
        requirements: [
          "Install LED bulbs in all rooms",
          "Use smart power strips",
          "Optimize thermostat settings",
          "Unplug unused electronics",
        ],
        startDate: "2024-01-10",
        endDate: "2024-02-10",
        maxParticipants: 1,
        currentParticipants: 1,
        isJoined: true,
        progress: 40,
        status: "active",
        icon: Zap,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      },
      {
        id: "4",
        title: "Water Conservation Hero",
        description:
          "Reduce water usage by 25% through conservation techniques and smart usage habits.",
        type: "community",
        category: "Water",
        difficulty: "easy",
        points: 200,
        requirements: [
          "Install low-flow showerheads",
          "Fix all leaks within 48 hours",
          "Use greywater for plants",
          "Take 5-minute showers max",
        ],
        startDate: "2024-01-05",
        endDate: "2024-01-19",
        maxParticipants: 75,
        currentParticipants: 45,
        isJoined: false,
        progress: 0,
        status: "active",
        icon: TrendingUp,
        color: "text-cyan-600",
        bgColor: "bg-cyan-100",
      },
    ],
    [],
  );

  const categories = [
    { id: "all", name: "All Categories", icon: Target },
    { id: "Transportation", name: "Transportation", icon: Users },
    { id: "Energy", name: "Energy", icon: Zap },
    { id: "Waste", name: "Waste", icon: Target },
    { id: "Water", name: "Water", icon: TrendingUp },
  ];

  const filters = [
    { id: "all", name: "All Challenges" },
    { id: "active", name: "Active" },
    { id: "upcoming", name: "Upcoming" },
    { id: "completed", name: "Completed" },
    { id: "joined", name: "My Challenges" },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setChallenges(mockChallenges);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mockChallenges]);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "joined"
        ? challenge.isJoined
        : challenge.status === selectedFilter);

    const matchesCategory =
      selectedCategory === "all" || challenge.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const handleJoinChallenge = async (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isJoined: true,
              currentParticipants: challenge.currentParticipants + 1,
            }
          : challenge,
      ),
    );
  };

  const handleLeaveChallenge = async (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isJoined: false,
              currentParticipants: challenge.currentParticipants - 1,
            }
          : challenge,
      ),
    );
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "upcoming":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-purple-600 bg-purple-100";
      case "expired":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-500"></div>
      </div>
    );
  }

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
              Challenges
            </h1>
            <p className="text-earth-600 dark:text-dark-text-secondary mt-2">
              Join community challenges and create personal goals to make a
              positive impact.
            </p>
          </div>
          <Button icon={<Plus className="h-4 w-4" />}>
            Create Personal Challenge
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="text-earth-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-earth-500 h-4 w-4" />
            <div className="flex space-x-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "text-earth-600 dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
              Category:
            </span>
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-1 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "text-earth-600 dark:text-dark-text-secondary hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  <category.icon className="h-3 w-3" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence>
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-lg p-2 ${challenge.bgColor}`}>
                        <challenge.icon
                          className={`h-5 w-5 ${challenge.color}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-earth-900 dark:text-dark-text-primary text-lg font-semibold">
                          {challenge.title}
                        </h3>
                        <div className="mt-1 flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(challenge.difficulty)}
                          >
                            {challenge.difficulty}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getStatusColor(challenge.status)}
                          >
                            {challenge.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {challenge.points}
                      </div>
                      <div className="text-earth-500 text-xs">points</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-earth-600 dark:text-dark-text-secondary text-sm">
                    {challenge.description}
                  </p>

                  {/* Progress */}
                  {challenge.isJoined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-earth-600 dark:text-dark-text-secondary">
                          Progress
                        </span>
                        <span className="text-earth-900 dark:text-dark-text-primary font-medium">
                          {challenge.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        value={challenge.progress}
                        variant="gradient"
                        showLabel={false}
                      />
                    </div>
                  )}

                  {/* Requirements */}
                  <div className="space-y-2">
                    <h4 className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
                      Requirements:
                    </h4>
                    <ul className="space-y-1">
                      {challenge.requirements
                        .slice(0, 3)
                        .map((requirement, idx) => (
                          <li
                            key={idx}
                            className="text-earth-600 dark:text-dark-text-secondary flex items-start space-x-2 text-sm"
                          >
                            <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      {challenge.requirements.length > 3 && (
                        <li className="text-earth-500 text-xs">
                          +{challenge.requirements.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Challenge Info */}
                  <div className="text-earth-500 dark:text-dark-text-muted flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(challenge.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      {challenge.type === "community" && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {challenge.currentParticipants}/
                            {challenge.maxParticipants}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {Math.ceil(
                          (new Date(challenge.endDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days left
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="dark:border-dark-border border-t border-green-200 pt-4">
                    {challenge.isJoined ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => handleLeaveChallenge(challenge.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                        >
                          Leave Challenge
                        </Button>
                        <Button fullWidth icon={<Trophy className="h-4 w-4" />}>
                          View Progress
                        </Button>
                      </div>
                    ) : (
                      <Button
                        fullWidth
                        onClick={() => handleJoinChallenge(challenge.id)}
                        disabled={
                          challenge.status !== "active" &&
                          challenge.status !== "upcoming"
                        }
                        icon={<Star className="h-4 w-4" />}
                      >
                        {challenge.status === "upcoming"
                          ? "Join When Available"
                          : "Join Challenge"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <Target className="text-earth-400 mx-auto mb-4 h-12 w-12" />
          <h3 className="text-earth-900 dark:text-dark-text-primary mb-2 text-lg font-medium">
            No challenges found
          </h3>
          <p className="text-earth-600 dark:text-dark-text-secondary">
            Try adjusting your search or filter criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
