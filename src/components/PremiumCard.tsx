"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface PremiumCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: "emerald" | "cyan" | "orange" | "none";
}

export function PremiumCard({
  children,
  className = "",
  hover = true,
  glowColor = "emerald",
  ...motionProps
}: PremiumCardProps) {
  const glowClasses = {
    emerald: "from-emerald-400/30 via-emerald-300/10",
    cyan: "from-cyan-400/30 via-cyan-300/10",
    orange: "from-orange-400/30 via-orange-300/10",
    none: "from-transparent to-transparent",
  };

  return (
    <div className="group relative">
      {/* Outer glow layer - visible on hover */}
      {glowColor !== "none" && (
        <div
          className={`absolute -inset-4 bg-gradient-to-br ${glowClasses[glowColor]} to-transparent rounded-[2.5rem] blur-2xl opacity-0 ${
            hover ? "group-hover:opacity-100" : ""
          } transition-all duration-500`}
        />
      )}

      {/* Premium glass card */}
      <motion.div
        className={`glass-surface rounded-[2.5rem] relative overflow-hidden backdrop-blur-2xl border-2 border-white/60 ${className}`}
        whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : undefined}
        initial={{ y: 0 }}
        {...motionProps}
      >
        {/* Inner light reflection gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GlassPanel({ children, className = "", size = "md" }: GlassPanelProps) {
  const sizeClasses = {
    sm: "p-4 rounded-lg md:p-4",
    md: "p-6 rounded-2xl md:p-6",
    lg: "p-8 rounded-3xl md:p-10",
  };

  return (
    <div className={`glass-surface-premium ${sizeClasses[size]} relative overflow-hidden ${className}`}>
      {/* Inner reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-2xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
