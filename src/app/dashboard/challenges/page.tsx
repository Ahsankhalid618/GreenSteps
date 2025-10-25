"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  Target,
  Users,
  Calendar,
  Search,
  CheckCircle,
  Star,
  Leaf,
  Zap,
  Flame,
  Droplet,
  Recycle,
  AlertCircle,
} from "lucide-react";
import {
  getChallenges,
  joinChallenge,
  leaveChallenge,
  getUserChallengeProgress,
} from "@/lib/challenges";

// Icon mapping for dynamic rendering
const iconMap = {
  Leaf,
  Zap,
  Droplet,
  Recycle,
  Target,
  Star,
  Flame,
  Users,
};

interface ChallengeWithProgress {
  id: string;
  title: string;
  description: string;
  type: "community" | "personal";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  requirements: string;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdBy: string;
  status: "active" | "completed" | "upcoming" | "expired";
  icon: string;
  color: string;
  bgColor: string;
  createdAt: string;
  updatedAt: string;
  isJoined: boolean;
  progress: number;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function ChallengesPage() {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [challenges, setChallenges] = useState<ChallengeWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load challenges and user progress
  useEffect(() => {
    const loadChallenges = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);
      try {
        // Load all challenges
        const allChallenges = await getChallenges();

        // Load user's challenge progress
        const userProgressRecords = await getUserChallengeProgress(user.$id);
        const joinedIds = new Set(
          userProgressRecords.map((record) => record.challengeId),
        );

        // Combine challenges with user progress
        const challengesWithProgress = allChallenges.map((challenge) => {
          // Find progress record for this challenge
          const progressRecord = userProgressRecords.find(
            (record) => record.challengeId === challenge.id,
          );
          const progress = progressRecord?.progress || 0;

          // Map icon string to component
          const IconComponent =
            iconMap[challenge.icon as keyof typeof iconMap] || Target;

          return {
            ...challenge,
            isJoined: joinedIds.has(challenge.id),
            progress,
            IconComponent,
          };
        });

        setChallenges(challengesWithProgress);
      } catch (error) {
        console.error("Error loading challenges:", error);
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
          setError("Failed to load challenges. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [user]);

  // Handle joining/leaving challenges
  const handleJoinChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge) return;

      if (challenge.isJoined) {
        await leaveChallenge(challengeId, user.$id);
      } else {
        await joinChallenge(challengeId, user.$id);
      }

      // Update local state
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === challengeId
            ? {
                ...c,
                isJoined: !c.isJoined,
                currentParticipants: c.isJoined
                  ? c.currentParticipants - 1
                  : c.currentParticipants + 1,
                progress: c.isJoined ? 0 : c.progress,
              }
            : c,
        ),
      );
    } catch (error) {
      console.error("Error joining/leaving challenge:", error);
      setError("Failed to update challenge. Please try again.");
    }
  };

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || challenge.status === selectedFilter;

      const matchesCategory =
        selectedCategory === "all" || challenge.category === selectedCategory;

      return matchesSearch && matchesFilter && matchesCategory;
    });
  }, [challenges, searchTerm, selectedFilter, selectedCategory]);

  const stats = useMemo(
    () => [
      {
        label: "Active Challenges",
        value: challenges.filter((c) => c.isJoined && c.status === "active")
          .length,
        icon: Flame,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      },
      {
        label: "Total Points",
        value: challenges
          .filter((c) => c.isJoined)
          .reduce((sum, c) => sum + c.points, 0),
        icon: Star,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
      },
      {
        label: "Completed",
        value: challenges.filter((c) => c.status === "completed").length,
        icon: CheckCircle,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
      },
      {
        label: "Community",
        value: challenges.filter((c) => c.type === "community").length,
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      },
    ],
    [challenges],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-white">Eco Challenges</h1>
        <p className="text-white/60">
          Join challenges, compete with others, and make a bigger environmental
          impact
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
            <p className="text-red-300">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center shadow-lg shadow-black/20 backdrop-blur-2xl"
        >
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-white/60">Loading challenges...</p>
        </motion.div>
      )}

      {/* Main Content - Only show when not loading */}
      {!loading && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div
                  className={`mb-3 inline-flex rounded-full p-3 ${stat.bgColor}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-white backdrop-blur-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-white backdrop-blur-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Transportation">Transportation</option>
                <option value="Energy">Energy</option>
                <option value="Water">Water</option>
                <option value="Waste">Waste</option>
              </select>
            </div>
          </motion.div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence>
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id || `challenge-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg p-3 ${challenge.bgColor}`}>
                        <challenge.IconComponent
                          className={`h-6 w-6 ${challenge.color}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {challenge.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            className={`text-xs ${challenge.type === "community" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}
                          >
                            {challenge.type}
                          </Badge>
                          <Badge className="bg-white/10 text-xs text-white/80">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold text-green-400">
                        <Star className="h-4 w-4" />
                        {challenge.points}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-white/60">
                    {challenge.description}
                  </p>

                  {/* Progress */}
                  {challenge.isJoined && (
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white/80">Progress</span>
                        <span className="font-semibold text-green-400">
                          {challenge.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        value={challenge.progress}
                        variant="gradient"
                      />
                    </div>
                  )}

                  {/* Requirements */}
                  <div className="mb-4 space-y-2">
                    <h4 className="text-sm font-semibold text-white/80">
                      Requirements:
                    </h4>
                    <ul className="space-y-1">
                      {challenge.requirements
                        .split(", ")
                        .slice(0, 2)
                        .map((req, i) => (
                          <li
                            key={`${challenge.id}-req-${i}`}
                            className="flex items-start gap-2 text-xs text-white/60"
                          >
                            <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                            {req}
                          </li>
                        ))}
                      {challenge.requirements.split(", ").length > 2 && (
                        <li className="text-xs text-white/40">
                          +{challenge.requirements.split(", ").length - 2}{" "}
                          more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {challenge.currentParticipants}/
                        {challenge.maxParticipants || "∞"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={challenge.isJoined ? "outline" : "primary"}
                      onClick={() => handleJoinChallenge(challenge.id)}
                    >
                      {challenge.isJoined ? "Leave" : "Join"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredChallenges.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center shadow-lg shadow-black/20 backdrop-blur-2xl">
              <Target className="mx-auto mb-4 h-12 w-12 text-white/40" />
              <h3 className="mb-2 text-lg font-semibold text-white">
                No challenges found
              </h3>
              <p className="text-white/60">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
