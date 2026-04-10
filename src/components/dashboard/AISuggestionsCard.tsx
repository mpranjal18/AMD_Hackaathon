"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, BrainCircuit, Info, Sparkles } from "lucide-react";
import type { AISuggestion } from "@/types/health";

function severityStyles(severity: AISuggestion["severity"]) {
  if (severity === "warning") {
    return {
      icon: AlertTriangle,
      badge: "text-orange-700 bg-orange-100/80",
      glow: "bg-orange-300/35",
    };
  }

  if (severity === "info") {
    return {
      icon: Info,
      badge: "text-blue-700 bg-blue-100/80",
      glow: "bg-blue-300/35",
    };
  }

  return {
    icon: Sparkles,
    badge: "text-emerald-700 bg-emerald-100/80",
    glow: "bg-emerald-300/35",
  };
}

interface AISuggestionsCardProps {
  suggestions: AISuggestion[];
}

export function AISuggestionsCard({ suggestions }: AISuggestionsCardProps) {
  const topSuggestion = suggestions[0];
  const tone = severityStyles(topSuggestion.severity);
  const ToneIcon = tone.icon;

  return (
    <section className="relative overflow-hidden rounded-[2rem] p-5 bg-white/35 backdrop-blur-2xl border border-white/55 shadow-[0_25px_45px_-28px_rgba(22,163,74,0.8),inset_0_1px_0_rgba(255,255,255,0.9)]">
      <motion.div
        className={`absolute -right-8 -top-8 h-36 w-36 rounded-full ${tone.glow} blur-2xl`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-white inline-flex items-center justify-center shadow-[0_14px_30px_-18px_rgba(22,163,74,0.95)]">
          <BrainCircuit className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <p className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-emerald-900/60 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Smart AI Suggestions
          </p>

          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{topSuggestion.title}</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{topSuggestion.description}</p>

          <div className="flex items-center justify-between mt-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${tone.badge}`}>
              <ToneIcon className="h-3.5 w-3.5" />
              {topSuggestion.severity}
            </span>
            <button
              type="button"
              className="text-xs font-medium text-slate-700 inline-flex items-center gap-1 hover:text-slate-900"
              aria-label={topSuggestion.actionLabel}
            >
              {topSuggestion.actionLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
