import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { LogoutButton } from "@/components/ui/LogoutButton";
import {
  Home,
  Activity,
  Target,
  Award,
  Trophy,
  User,
  X,
  Leaf,
  Settings,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
    description: "Your dashboard overview",
  },
  {
    name: "Actions",
    href: "/dashboard/actions",
    icon: Activity,
    description: "Log and track actions",
  },
  {
    name: "Challenges",
    href: "/dashboard/challenges",
    icon: Target,
    description: "Join and complete challenges",
  },
  {
    name: "Badges",
    href: "/dashboard/badges",
    icon: Award,
    description: "View your achievements",
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
    description: "See how you rank",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Manage your profile",
  },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col"
      >
        <div className="dark:bg-dark-surface/80 dark:border-dark-border flex grow flex-col gap-y-5 overflow-y-auto border-r border-green-200 bg-white/80 px-6 pb-4 backdrop-blur-sm">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-green-500">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-earth-900 dark:text-dark-text-primary text-xl font-bold">
                GreenSteps
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={item.href}
                            className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-colors ${
                              isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "text-earth-700 dark:text-dark-text-secondary hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300"
                            }`}
                          >
                            <item.icon
                              className={`h-5 w-5 shrink-0 ${
                                isActive
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-earth-400 dark:text-dark-text-muted group-hover:text-green-600 dark:group-hover:text-green-400"
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* User section */}
              <li className="mt-auto">
                <div className="dark:border-dark-border border-t border-green-200 pt-4">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-earth-900 dark:text-dark-text-primary truncate text-sm font-medium">
                        {user?.name}
                      </p>
                      <p className="text-earth-600 dark:text-dark-text-secondary truncate text-xs">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <LogoutButton
                    variant="ghost"
                    fullWidth
                    showConfirmation={false}
                    className="justify-start text-left text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                    icon={<Settings className="h-4 w-4" />}
                  >
                    Sign Out
                  </LogoutButton>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 z-50 flex w-64 flex-col lg:hidden"
          >
            <div className="dark:bg-dark-surface dark:border-dark-border flex grow flex-col gap-y-5 overflow-y-auto border-r border-green-200 bg-white px-6 pb-4">
              {/* Header with close button */}
              <div className="flex h-16 shrink-0 items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-green-500">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-earth-900 dark:text-dark-text-primary text-xl font-bold">
                    GreenSteps
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-earth-600 dark:text-dark-text-secondary rounded-lg p-2 transition-colors hover:bg-green-100 dark:hover:bg-green-900/20"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.name}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-colors ${
                                  isActive
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : "text-earth-700 dark:text-dark-text-secondary hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300"
                                }`}
                              >
                                <item.icon
                                  className={`h-5 w-5 shrink-0 ${
                                    isActive
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-earth-400 dark:text-dark-text-muted group-hover:text-green-600 dark:group-hover:text-green-400"
                                  }`}
                                />
                                <span className="truncate">{item.name}</span>
                              </Link>
                            </motion.div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>

                  {/* User section */}
                  <li className="mt-auto">
                    <div className="dark:border-dark-border border-t border-green-200 pt-4">
                      <div className="mb-4 flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-earth-900 dark:text-dark-text-primary truncate text-sm font-medium">
                            {user?.name}
                          </p>
                          <p className="text-earth-600 dark:text-dark-text-secondary truncate text-xs">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <LogoutButton
                        variant="ghost"
                        fullWidth
                        showConfirmation={false}
                        className="justify-start text-left text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                        icon={<Settings className="h-4 w-4" />}
                      >
                        Sign Out
                      </LogoutButton>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
