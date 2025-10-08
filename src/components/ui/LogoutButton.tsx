import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { LogOut, AlertCircle } from "lucide-react";

interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  showConfirmation?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "outline",
  size = "md",
  showConfirmation = true,
  fullWidth = false,
  icon,
  className = "",
  children,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    if (showConfirmation && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`flex items-center space-x-2 ${className}`}
      >
        <Button
          variant="destructive"
          size={size}
          onClick={handleLogout}
          loading={isLoggingOut}
          icon={icon || <LogOut className="h-4 w-4" />}
          fullWidth={fullWidth}
        >
          {isLoggingOut ? "Signing out..." : "Confirm Logout"}
        </Button>
        <Button
          variant="ghost"
          size={size}
          onClick={handleCancel}
          disabled={isLoggingOut}
          fullWidth={fullWidth}
        >
          Cancel
        </Button>
      </motion.div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      loading={isLoggingOut}
      icon={icon || <LogOut className="h-4 w-4" />}
      fullWidth={fullWidth}
      className={className}
    >
      {children || "Logout"}
    </Button>
  );
};

// Confirmation Dialog Component
interface LogoutConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoggingOut: boolean;
}

export const LogoutConfirmationDialog: React.FC<
  LogoutConfirmationDialogProps
> = ({ isOpen, onConfirm, onCancel, isLoggingOut }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="dark:bg-dark-surface w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center space-x-3">
          <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-earth-900 dark:text-dark-text-primary text-lg font-semibold">
            Confirm Logout
          </h3>
        </div>

        <p className="text-earth-600 dark:text-dark-text-secondary mb-6">
          Are you sure you want to sign out? You&apos;ll need to sign in again
          to access your dashboard.
        </p>

        <div className="flex space-x-3">
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isLoggingOut}
            icon={<LogOut className="h-4 w-4" />}
            className="flex-1"
          >
            {isLoggingOut ? "Signing out..." : "Yes, Logout"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoggingOut}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
