"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  icon?: ReactNode;
  label: string;
  value?: string | number;
  color?: "emerald" | "cyan" | "orange" | "blue" | "purple";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const colorClasses = {
  emerald: {
    bg: "bg-gradient-to-r from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    glow: "shadow-glow-emerald",
  },
  cyan: {
    bg: "bg-gradient-to-r from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
    glow: "shadow-glow-blue",
  },
  orange: {
    bg: "bg-gradient-to-r from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
    text: "text-orange-700",
    dot: "bg-orange-500",
    glow: "shadow-glow-orange",
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    text: "text-blue-700",
    dot: "bg-blue-500",
    glow: "shadow-blue-500/40",
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
    text: "text-purple-700",
    dot: "bg-purple-500",
    glow: "shadow-lg",
  },
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-3",
};

export function Badge({ icon, label, value, color = "emerald", size = "md", animated = true }: BadgeProps) {
  const colorClass = colorClasses[color];

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className={`flex items-center gap-2 rounded-full border ${colorClass.bg} ${colorClass.border} ${colorClass.glow} backdrop-blur-sm transition-all duration-300 ${sizeClasses[size]}`}
    >
      {icon && <span className={colorClass.text}>{icon}</span>}
      <span className={`font-semibold ${colorClass.text}`}>{label}</span>
      {value && <span className={`font-bold ${colorClass.text}`}>{value}</span>}
    </motion.div>
  );
}

interface AchievementBadgeProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: "emerald" | "cyan" | "orange" | "blue" | "purple";
  unlocked?: boolean;
}

export function AchievementBadge({
  icon,
  title,
  description,
  color = "emerald",
  unlocked = true,
}: AchievementBadgeProps) {
  const colorClass = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={unlocked ? { scale: 1.05, y: -4 } : undefined}
      className={`relative rounded-2xl p-4 border ${colorClass.bg} ${colorClass.border} ${
        unlocked ? "backdrop-blur-sm" : "opacity-40"
      } overflow-hidden transition-all duration-300`}
    >
      {/* Shine effect on unlock */}
      {unlocked && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent`}
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex gap-3">
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-full flex-shrink-0 ${colorClass.bg} border ${colorClass.border}`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
