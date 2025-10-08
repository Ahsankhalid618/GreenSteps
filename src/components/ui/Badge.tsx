import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  animate?: boolean;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      icon,
      animate = true,
      pulse = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center font-medium rounded-full transition-all duration-300";

    const variants = {
      default:
        "badge bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800",
      success: "badge-success",
      warning: "badge-warning",
      error:
        "badge bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
      info: "badge-info",
      outline:
        "badge bg-transparent text-green-600 dark:text-green-400 border border-green-300 dark:border-green-700",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    const pulseClass = pulse ? "animate-pulse-green" : "";

    const badgeClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      pulseClass,
      className,
    );

    const content = (
      <>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </>
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={badgeClasses}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          {...props}
        >
          {content}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={badgeClasses} {...props}>
        {content}
      </div>
    );
  },
);

Badge.displayName = "Badge";

interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  badges: Array<{
    label: string;
    variant?: BadgeProps["variant"];
    icon?: React.ReactNode;
  }>;
  maxVisible?: number;
  showMore?: boolean;
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, badges, maxVisible = 3, showMore = true, ...props }, ref) => {
    const visibleBadges = badges.slice(0, maxVisible);
    const hiddenCount = badges.length - maxVisible;

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {visibleBadges.map((badge, index) => (
          <Badge key={index} variant={badge.variant} icon={badge.icon}>
            {badge.label}
          </Badge>
        ))}
        {showMore && hiddenCount > 0 && (
          <Badge variant="outline">+{hiddenCount} more</Badge>
        )}
      </div>
    );
  },
);

BadgeGroup.displayName = "BadgeGroup";

export { Badge, BadgeGroup };
