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
      className="border-earth-300 dark:border-dark-border dark:bg-dark-surface/80 sticky top-0 z-30 border-b bg-white/10 shadow-sm backdrop-blur-xl"
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
              className="hover:bg-earth-100 dark:hover:bg-dark-surface-elevated text-earth-700 dark:text-dark-text-secondary rounded-lg p-2 transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </motion.button>

            {/* User greeting */}
            <div className="hidden sm:block">
              <h1 className="text-white/80 text-lg font-bold">
                Welcome back, {user?.name}!
              </h1>
              <p className="body-sm">Ready to make a positive impact today?</p>
            </div>
          </div>

          {/* Center - Stats */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Points */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-green flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-md"
            >
              <Trophy className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                {mockStats.points.toLocaleString()} pts
              </span>
            </motion.div>

            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 shadow-md"
            >
              <Flame className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                {mockStats.streak} day streak
              </span>
            </motion.div>

            {/* Level */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-2.5 shadow-md"
            >
              <Zap className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Level {mockStats.level}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="mt-3 flex items-center justify-between gap-2 md:hidden">
          <div className="gradient-green flex flex-1 items-center gap-1.5 rounded-lg px-3 py-2">
            <Trophy className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              {mockStats.points.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2">
            <Flame className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              {mockStats.streak}
            </span>
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-2">
            <Zap className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Lv.{mockStats.level}
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
