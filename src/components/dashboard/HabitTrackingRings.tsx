"use client";

import { motion } from "framer-motion";

interface HabitTrackingRingsProps {
  waterPct: number;
  mealsPct: number;
  junkPct: number;
}

function TinyRing({ value, color }: { value: number; color: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);

  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={radius} stroke="rgba(148,163,184,0.24)" strokeWidth="8" fill="none" />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function HabitTrackingRings({ waterPct, mealsPct, junkPct }: HabitTrackingRingsProps) {
  return (
    <section className="glass-surface rounded-[2rem] p-5 md:mt-8">
      <p className="text-xs tracking-[0.2em] uppercase text-slate-500 mb-4">Habit Tracking</p>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-white/65 p-3">
          <TinyRing value={Math.min(waterPct, 1)} color="#38bdf8" />
          <p className="text-xs text-slate-500 mt-1">Water</p>
        </div>

        <div className="rounded-2xl bg-white/65 p-3">
          <TinyRing value={Math.min(mealsPct, 1)} color="#34C759" />
          <p className="text-xs text-slate-500 mt-1">Meals</p>
        </div>

        <div className="rounded-2xl bg-white/65 p-3">
          <TinyRing value={Math.min(junkPct, 1)} color="#f97316" />
          <p className="text-xs text-slate-500 mt-1">Junk</p>
        </div>
      </div>
    </section>
  );
}
