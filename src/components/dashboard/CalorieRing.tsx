"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface CalorieRingProps {
  consumed: number;
  target: number;
}

function Counter({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(() => Math.round(mv.get()));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    const unsub = rounded.on("change", (latest) => setDisplay(latest));

    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, rounded, value]);

  return <>{display.toLocaleString()}</>;
}

export function CalorieRing({ consumed, target }: CalorieRingProps) {
  const progress = Math.min(consumed / target, 1);
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <section className="glass-surface rounded-[2rem] p-5 md:p-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-[#34C759]/25 blur-2xl" />
      <p className="text-xs tracking-[0.2em] uppercase text-slate-500 mb-4">Today Calories</p>

      <div className="relative h-[220px] w-[220px] mx-auto">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full -rotate-90 drop-shadow-[0_14px_35px_rgba(22,163,74,0.25)]"
          aria-label="Calorie progress"
          role="img"
        >
          <defs>
            <linearGradient id="calRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34C759" />
              <stop offset="58%" stopColor="#FFD60A" />
              <stop offset="100%" stopColor="#FF8F3F" />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r={radius + 13}
            fill="none"
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="2"
            strokeDasharray="4 10"
          />

          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(15,23,42,0.09)" strokeWidth="14" />

          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#calRingGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.7, delay: 0.2, ease: [0.2, 0.75, 0.2, 1] }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Consumed</p>
          <p className="text-[2.15rem] leading-none font-semibold text-slate-900">
            <Counter value={consumed} />
          </p>
          <p className="text-xs text-slate-500 mt-1">of {target.toLocaleString()} kcal</p>
        </div>
      </div>
    </section>
  );
}
