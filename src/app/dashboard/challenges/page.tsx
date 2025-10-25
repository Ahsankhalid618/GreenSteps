"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Mock data
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
        color: "text-green-500",
        bgColor: "bg-green-500/10",
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
        icon: Recycle,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
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
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
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
        startDate: "2024-01-12",
        endDate: "2024-02-12",
        maxParticipants: 75,
        currentParticipants: 45,
        isJoined: true,
        progress: 80,
        status: "active",
        icon: Droplet,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
      },
    ],
    [],
  );

  useEffect(() => {
    const loadChallenges = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setChallenges(mockChallenges);
    };

    loadChallenges();
  }, [mockChallenges]);

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

  const stats = [
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
  ];

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              isJoined: !c.isJoined,
              currentParticipants: c.isJoined
                ? c.currentParticipants - 1
                : c.currentParticipants + 1,
            }
          : c,
      ),
    );
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
        <h1 className="mb-2 text-3xl font-bold text-white">Eco Challenges</h1>
        <p className="text-white/60">
          Join challenges, compete with others, and make a bigger environmental
          impact
        </p>
      </motion.div>

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
            <div className="text-2xl font-bold text-white">{stat.value}</div>
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
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-3 ${challenge.bgColor}`}>
                    <challenge.icon className={`h-6 w-6 ${challenge.color}`} />
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
                  <ProgressBar value={challenge.progress} variant="gradient" />
                </div>
              )}

              {/* Requirements */}
              <div className="mb-4 space-y-2">
                <h4 className="text-sm font-semibold text-white/80">
                  Requirements:
                </h4>
                <ul className="space-y-1">
                  {challenge.requirements.slice(0, 2).map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-white/60"
                    >
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                      {req}
                    </li>
                  ))}
                  {challenge.requirements.length > 2 && (
                    <li className="text-xs text-white/40">
                      +{challenge.requirements.length - 2} more...
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
    </div>
  );
}
