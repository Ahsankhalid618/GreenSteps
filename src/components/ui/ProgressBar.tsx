import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
  pulse?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size = "md",
      variant = "default",
      showLabel = false,
      label,
      animate = true,
      pulse = false,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const baseClasses = "progress-bar";

    const sizes = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    const variants = {
      default: "progress-fill",
      success:
        "h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 ease-out",
      warning:
        "h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 ease-out",
      error:
        "h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500 ease-out",
      gradient:
        "h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 transition-all duration-500 ease-out",
    };

    const pulseClass = pulse ? "animate-pulse-green" : "";

    const progressBarClasses = cn(
      baseClasses,
      sizes[size],
      pulseClass,
      className,
    );

    const progressFillClasses = cn(
      variants[variant],
      animate && "transition-all duration-500 ease-out",
    );

    const content = (
      <div className="w-full">
        {showLabel && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-earth-700 text-sm font-medium">
              {label || "Progress"}
            </span>
            <span className="text-earth-600 text-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div ref={ref} className={progressBarClasses} {...props}>
          <motion.div
            className={progressFillClasses}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        {!showLabel && (
          <div className="mt-1 flex justify-end">
            <span className="text-earth-500 text-xs">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );

    return content;
  },
);

ProgressBar.displayName = "ProgressBar";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "error";
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      className,
      value,
      max = 100,
      size = 120,
      strokeWidth = 8,
      variant = "default",
      showLabel = false,
      label,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const variants = {
      default: "stroke-green-500",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
    };

    const content = (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center",
          className,
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="-rotate-90 transform">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-green-100"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            className={variants[variant]}
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={
              animate ? { duration: 0.8, ease: "easeOut" } : { duration: 0 }
            }
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-earth-900 text-lg font-semibold">
              {Math.round(percentage)}%
            </span>
            {label && <span className="text-earth-600 text-xs">{label}</span>}
          </div>
        )}
      </div>
    );

    return content;
  },
);

CircularProgress.displayName = "CircularProgress";

export { ProgressBar, CircularProgress };
