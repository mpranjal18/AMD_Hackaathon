"use client";

import { motion } from "framer-motion";

interface GreetingHeroProps {
  name: string;
}

export function GreetingHero({ name }: GreetingHeroProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-emerald-900/55 tracking-[0.08em] uppercase">Good Morning</p>
        <h1 className="text-[2rem] leading-tight font-semibold text-slate-900">{name}</h1>
      </div>

      <motion.button
        type="button"
        aria-label="User profile"
        className="relative h-14 w-14 rounded-full"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#34C759]/45 blur-md"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative h-full w-full rounded-full p-[2px] bg-gradient-to-br from-[#34C759] via-[#77db94] to-[#1fa149] shadow-[0_16px_30px_-14px_rgba(22,163,74,0.9)] block">
          <span className="h-full w-full rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-base font-semibold text-[#1f8a3d]">
            {name.slice(0, 1).toUpperCase()}
          </span>
        </span>
      </motion.button>
    </header>
  );
}
