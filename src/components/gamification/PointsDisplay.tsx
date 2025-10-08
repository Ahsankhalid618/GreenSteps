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
    <Card className={sizes[size].card} variant="elevated">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="rounded-full bg-gradient-to-r from-green-400 to-green-500 p-2"
            animate={animate ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Coins className={`${sizes[size].icon} text-white`} />
          </motion.div>
          <div>
            <h3 className={`${sizes[size].points} text-gradient font-bold`}>
              {formatNumber(points)}
            </h3>
            <p className={`${sizes[size].level} text-earth-600`}>
              Level {currentLevel}
            </p>
          </div>
        </div>

        {showBadges && badges.length > 0 && (
          <div className="flex items-center space-x-2">
            <Trophy className={`${sizes[size].icon} text-yellow-500`} />
            <span className="text-earth-600 text-sm">{badges.length}</span>
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
          <div className="text-earth-600 flex justify-between text-sm">
            <span>Level {currentLevel}</span>
            <span>{formatNumber(pointsToNextLevel)} to next level</span>
          </div>
        </div>
      )}

      {showBadges && badges.length > 0 && (
        <div className="mt-4 border-t border-green-200 pt-4">
          <div className="mb-2 flex items-center space-x-2">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="text-earth-700 text-sm font-medium">
              Recent Badges
            </span>
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
    </Card>
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
