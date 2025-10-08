import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      icon,
      iconPosition = "left",
      variant = "default",
      size = "md",
      animate = true,
      ...props
    },
    ref,
  ) => {
    const baseClasses = "input-field";

    const variants = {
      default: "input-field",
      filled:
        "w-full px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300",
      outlined:
        "w-full px-4 py-3 bg-transparent border-2 border-green-300 dark:border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const inputClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
      icon && iconPosition === "left" && "pl-10",
      icon && iconPosition === "right" && "pr-10",
      className,
    );

    const content = (
      <div className="w-full">
        {label && (
          <label className="text-earth-700 dark:text-dark-text-secondary mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-earth-400 dark:text-dark-text-muted">
                {icon}
              </span>
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {icon && iconPosition === "right" && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-earth-400 dark:text-dark-text-muted">
                {icon}
              </span>
            </div>
          )}
        </div>
        {error && (
          <motion.p
            className="mt-1 text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p className="text-earth-500 dark:text-dark-text-muted mt-1 text-sm">
            {helperText}
          </p>
        )}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      );
    }

    return content;
  },
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      animate = true,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "w-full px-4 py-3 bg-white/80 dark:bg-dark-surface backdrop-blur-sm border border-green-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 resize-none";

    const variants = {
      default: baseClasses,
      filled:
        "w-full px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 resize-none",
      outlined:
        "w-full px-4 py-3 bg-transparent border-2 border-green-300 dark:border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 resize-none",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const textareaClasses = cn(
      variants[variant],
      sizes[size],
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
      className,
    );

    const content = (
      <div className="w-full">
        {label && (
          <label className="text-earth-700 dark:text-dark-text-secondary mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && (
          <motion.p
            className="mt-1 text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p className="text-earth-500 dark:text-dark-text-muted mt-1 text-sm">
            {helperText}
          </p>
        )}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      );
    }

    return content;
  },
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
