"use client";

import { motion } from "framer-motion";
import { Droplets, Target, Wheat } from "lucide-react";

interface MacroProgressProps {
  protein: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fat: { consumed: number; target: number };
}

const macroRows = [
  {
    key: "protein",
    label: "Protein",
    color: "from-sky-400 via-cyan-400 to-blue-500",
    barGlow: "shadow-glow-blue",
    icon: Target,
  },
  {
    key: "carbs",
    label: "Carbs",
    color: "from-orange-300 via-amber-400 to-orange-500",
    barGlow: "shadow-glow-orange",
    icon: Wheat,
  },
  {
    key: "fat",
    label: "Fat",
    color: "from-lime-300 via-green-400 to-emerald-500",
    barGlow: "shadow-glow-emerald",
    icon: Droplets,
  },
] as const;

export function MacroProgress({ protein, carbs, fat }: MacroProgressProps) {
  const values = { protein, carbs, fat };

  return (
    <section className="space-y-4">
      <div className="px-1 flex items-center gap-3">
        <div className="h-1 w-8 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
        <h2 className="text-xs tracking-[0.24em] uppercase font-semibold text-slate-500">
          Macro Balance
        </h2>
      </div>

      <div className="space-y-3">
        {macroRows.map((row, index) => {
          const current = values[row.key];
          const pct = Math.min((current.consumed / current.target) * 100, 100);
          const Icon = row.icon;
          const isOverTarget = current.consumed > current.target;

          return (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 4 }}
              className="group"
            >
              <div className="glass-surface rounded-2xl p-4 relative overflow-hidden border border-white/50 transition-all duration-300 group-hover:border-white/70">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/50 to-white/30 flex items-center justify-center shadow-md">
                        <Icon className="h-5 w-5 text-slate-700" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                        <p className="text-xs text-slate-500">
                          {current.consumed}g / {current.target}g
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        pct >= 100
                          ? "bg-green-500/20 text-green-700 border border-green-500/30"
                          : "bg-amber-500/20 text-amber-700 border border-amber-500/30"
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {Math.round(pct)}%
                    </motion.div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2.5 rounded-full bg-white/60 overflow-hidden shadow-[inset_0_2px_8px_rgba(148,163,184,0.2)] relative">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${row.color} ${row.barGlow}`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%`, opacity: 1 }}
                        transition={{ delay: 0.35 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </div>

                    <div className="text-xs text-slate-500 flex justify-between">
                      <span>
                        {isOverTarget
                          ? `+${current.consumed - current.target}g over`
                          : `${current.target - current.consumed}g to go`}
                      </span>
                      <span className={isOverTarget ? "text-amber-600 font-semibold" : "text-slate-500"}>
                        {isOverTarget ? "⚠️ Over target" : "On track"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
