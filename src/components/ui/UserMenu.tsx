import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { User, Settings, LogOut, ChevronDown, Mail, Award } from "lucide-react";

interface UserMenuProps {
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* User Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-earth-900 dark:text-dark-text-primary text-sm font-medium">
              {user.name}
            </p>
            <p className="text-earth-600 dark:text-dark-text-secondary text-xs">
              {user.email}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`text-earth-500 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-dark-surface dark:border-dark-border absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-green-200 bg-white shadow-lg"
          >
            {/* User Info */}
            <div className="dark:border-dark-border border-b border-green-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-earth-900 dark:text-dark-text-primary font-medium">
                    {user.name}
                  </p>
                  <p className="text-earth-600 dark:text-dark-text-secondary text-sm">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Button
                variant="ghost"
                fullWidth
                className="justify-start text-left"
                icon={<User className="h-4 w-4" />}
              >
                Profile
              </Button>

              <Button
                variant="ghost"
                fullWidth
                className="justify-start text-left"
                icon={<Settings className="h-4 w-4" />}
              >
                Settings
              </Button>

              <Button
                variant="ghost"
                fullWidth
                className="justify-start text-left"
                icon={<Award className="h-4 w-4" />}
              >
                Achievements
              </Button>
            </div>

            {/* Logout Section */}
            <div className="dark:border-dark-border border-t border-green-200 p-2">
              <LogoutButton
                variant="ghost"
                fullWidth
                className="justify-start text-left text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                icon={<LogOut className="h-4 w-4" />}
                showConfirmation={false}
              >
                Sign Out
              </LogoutButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
