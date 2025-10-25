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
  LogOut,
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
        <div className="border-earth-300 dark:border-dark-border dark:bg-dark-surface/80 flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white/80 px-6 pb-4 backdrop-blur-xl">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-green-500 shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GreenSteps</span>
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
                            className={
                              isActive
                                ? "flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 px-3 py-2.5 text-sm font-semibold text-white backdrop-blur-xl"
                                : "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                            }
                          >
                            <item.icon className="h-5 w-5 shrink-0" />
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
                <div className="border-t border-white/10 pt-4 flex flex-col items-center justify-center gap-2">
                  <div className="mb-4 flex items-center space-x-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl w-full max-w-fit">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                      <p className="truncate text-xs text-white/60">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <LogoutButton
                    variant="destructive"
                    fullWidth
                    showConfirmation={false}
                    className=" w-full justify-center bg-red-500/70 text-white backdrop-blur-xl max-w-fit"
                    icon={<LogOut className="h-4 w-4" />}
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
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/10 bg-white/10 px-6 pb-4 backdrop-blur-2xl">
              {/* Header with close button */}
              <div className="flex h-16 shrink-0 items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-green-500 shadow-lg">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    GreenSteps
                  </span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10"
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
                                className={
                                  isActive
                                    ? "flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 px-3 py-2.5 text-sm font-semibold text-white backdrop-blur-xl"
                                    : "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                                }
                              >
                                <item.icon className="h-5 w-5 shrink-0" />
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
                    <div className="flex flex-col items-center justify-center gap-2 border-t border-white/10 pt-4">
                      <div className="mb-4 flex w-full max-w-fit items-center space-x-3 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {user?.name}
                          </p>
                          <p className="truncate text-xs text-white/60">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <LogoutButton
                        variant="destructive"
                        fullWidth
                        showConfirmation={false}
                        className="w-full max-w-fit justify-center rounded-xl border border-red-400/30 bg-red-500/70 text-white backdrop-blur-xl"
                        icon={<LogOut className="h-4 w-4" />}
                      >
                        Logout
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
