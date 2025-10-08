import React from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Menu, Flame, Trophy, Zap } from "lucide-react";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onMenuClick,
}) => {
  const { user } = useAuthContext();

  // Mock data - replace with real data from your database
  const mockStats = {
    points: 2450,
    streak: 7,
    level: 3,
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="dark:bg-dark-surface/80 dark:border-dark-border sticky top-0 z-30 border-b border-green-200 bg-white/80 backdrop-blur-sm"
    >
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left side - Menu button and user info */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="text-earth-600 dark:text-dark-text-secondary rounded-lg p-2 transition-colors hover:bg-green-100 lg:hidden dark:hover:bg-green-900/20"
            >
              <Menu className="h-5 w-5" />
            </motion.button>

            {/* User greeting */}
            <div className="hidden sm:block">
              <h1 className="text-earth-900 dark:text-dark-text-primary text-lg font-semibold">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-earth-600 dark:text-dark-text-secondary text-sm">
                Ready to make a positive impact today?
              </p>
            </div>
          </div>

          {/* Center - Stats */}
          <div className="hidden items-center space-x-6 md:flex">
            {/* Points */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 rounded-lg bg-green-100 px-3 py-2 dark:bg-green-900/30"
            >
              <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {mockStats.points.toLocaleString()} pts
              </span>
            </motion.div>

            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 rounded-lg bg-orange-100 px-3 py-2 dark:bg-orange-900/30"
            >
              <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {mockStats.streak} day streak
              </span>
            </motion.div>

            {/* Level */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 rounded-lg bg-purple-100 px-3 py-2 dark:bg-purple-900/30"
            >
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Level {mockStats.level}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="mt-3 flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                {mockStats.points.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Flame className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                {mockStats.streak}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                L{mockStats.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
