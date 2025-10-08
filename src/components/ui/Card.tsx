import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  animate?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      animate = true,
      padding = "md",
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variants = {
      default: "card",
      elevated: "card shadow-xl shadow-green-200/50 dark:shadow-black/50",
      outlined:
        "bg-white dark:bg-dark-surface border-2 border-green-200 dark:border-dark-border",
      glass: "glass-effect",
    };

    const hoverClasses = hover ? "card-hover" : "";

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const cardClasses = cn(
      baseClasses,
      variants[variant],
      hoverClasses,
      paddingClasses[padding],
      className,
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-earth-900 dark:text-dark-text-primary text-lg font-semibold">
              {title}
            </h3>
            {action}
          </div>
        )}
        {subtitle && (
          <p className="text-earth-600 dark:text-dark-text-secondary text-sm">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-earth-700 dark:text-dark-text-secondary",
          className,
        )}
        {...props}
      />
    );
  },
);

CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
