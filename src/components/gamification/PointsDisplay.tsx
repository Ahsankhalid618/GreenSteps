"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatNumber, getLevel, getLevelProgress } from "@/lib/utils";
import { Coins, Trophy, Zap } from "lucide-react";

interface PointsDisplayProps {
  points: number;
  level?: number;
  showProgress?: boolean;
  showBadges?: boolean;
  badges?: string[];
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({
  points,
  level,
  showProgress = true,
  showBadges = false,
  badges = [],
  size = "md",
  animate = true,
}) => {
  const levelData = getLevel(points);
  const currentLevel = level || levelData.level;
  const levelProgressData = getLevelProgress(points);
  const progressPercentage = levelProgressData.progress;
  const pointsToNextLevel = levelProgressData.pointsToNext;

  const sizes = {
    sm: {
      card: "p-4",
      points: "text-2xl",
      level: "text-sm",
      icon: "h-4 w-4",
    },
    md: {
      card: "p-6",
      points: "text-3xl",
      level: "text-base",
      icon: "h-5 w-5",
    },
    lg: {
      card: "p-8",
      points: "text-4xl",
      level: "text-lg",
      icon: "h-6 w-6",
    },
  };

  const content = (
    <div
      className={`${sizes[size].card} group rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-green-500/10`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="gradient-green rounded-full p-3 shadow-lg"
            animate={animate ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Coins className={`${sizes[size].icon} text-white`} />
          </motion.div>
          <div>
            <h3 className={`${sizes[size].points} text-gradient font-bold`}>
              {formatNumber(points)}
            </h3>
            <p className={`${sizes[size].level} body-md`}>
              Level {currentLevel}
            </p>
          </div>
        </div>

        {showBadges && badges.length > 0 && (
          <div className="flex items-center space-x-2">
            <Trophy className={`${sizes[size].icon} text-amber-500`} />
            <span className="body-sm font-semibold">{badges.length}</span>
          </div>
        )}
      </div>

      {showProgress && (
        <div className="space-y-3">
          <ProgressBar
            value={progressPercentage}
            variant="gradient"
            showLabel={false}
            animate={animate}
          />
          <div className="body-sm flex justify-between">
            <span>Level {currentLevel}</span>
            <span>{formatNumber(pointsToNextLevel)} to next level</span>
          </div>
        </div>
      )}

      {showBadges && badges.length > 0 && (
        <div className="border-earth-300 dark:border-dark-border mt-4 border-t pt-4">
          <div className="mb-2 flex items-center space-x-2">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="body-sm font-medium">Recent Badges</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 3).map((badge, index) => (
              <Badge key={index} variant="success" size="sm" animate={animate}>
                {badge}
              </Badge>
            ))}
            {badges.length > 3 && (
              <Badge variant="outline" size="sm">
                +{badges.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
