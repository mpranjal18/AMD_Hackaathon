"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Flame, Plus, Trophy } from "lucide-react";
import { CalorieRing } from "@/components/dashboard/CalorieRing";
import { GreetingHero } from "@/components/dashboard/GreetingHero";
import { MacroProgress } from "@/components/dashboard/MacroProgress";
import { AISuggestionsCard } from "@/components/dashboard/AISuggestionsCard";
import { getRecommendedFoodChoices } from "@/lib/health/foodChoices";
import { generateAISuggestions } from "@/lib/health/aiSuggestions";
import { calculateHealthScore } from "@/lib/health/healthScore";
import type { AISuggestion, NutritionSnapshot } from "@/types/health";

const FoodChoicesSection = dynamic(
  () => import("@/components/dashboard/FoodChoicesSection").then((m) => m.FoodChoicesSection),
  { ssr: false },
);

const HabitTrackingRings = dynamic(
  () => import("@/components/dashboard/HabitTrackingRings").then((m) => m.HabitTrackingRings),
  { ssr: false },
);

const snapshot: NutritionSnapshot = {
  caloriesConsumed: 1850,
  caloriesTarget: 2500,
  proteinConsumed: 120,
  proteinTarget: 150,
  carbsConsumed: 200,
  carbsTarget: 250,
  fatConsumed: 50,
  fatTarget: 70,
  waterIntakeMl: 1800,
  waterTargetMl: 3000,
  mealsLogged: 4,
  junkMeals: 1,
  lastMealHour24: 23,
};

function DashboardSkeleton() {
  return (
    <div className="px-5 pt-10 pb-28 sm:px-7">
      <div className="glass-surface rounded-3xl p-5 shimmer mb-5 h-28" />
      <div className="grid grid-cols-1 gap-5 mb-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-surface rounded-[2rem] p-6 shimmer min-h-[280px]" />
        <div className="glass-surface rounded-[2rem] p-6 shimmer min-h-[220px]" />
      </div>
      <div className="glass-surface rounded-[2rem] p-6 shimmer min-h-[180px] mb-5" />
      <div className="glass-surface rounded-[2rem] p-6 shimmer min-h-[180px]" />
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(() =>
    generateAISuggestions(snapshot),
  );
  const [healthScore, setHealthScore] = useState<number>(() => calculateHealthScore(snapshot));

  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const foodChoices = useMemo(() => getRecommendedFoodChoices(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);

    const runSuggestions = async () => {
      try {
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demo-user-01",
          },
          body: JSON.stringify(snapshot),
        });

        if (!response.ok) return;

        const data = (await response.json()) as {
          suggestions: AISuggestion[];
          healthScore: number;
        };

        setSuggestions(data.suggestions);
        setHealthScore(data.healthScore);
      } catch {
        setSuggestions(generateAISuggestions(snapshot));
        setHealthScore(calculateHealthScore(snapshot));
      }
    };

    runSuggestions();

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(52,199,89,0.33),_rgba(163,230,178,0.06)_68%,_transparent_100%)] blur-2xl"
        style={{ y: orbY, scale: orbScale }}
      />
      <motion.div
        className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.23),_rgba(191,219,254,0.05)_68%,_transparent_100%)] blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <DashboardSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="px-5 pt-10 pb-28 sm:px-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <GreetingHero name="Alex" />

            <section className="glass-surface rounded-[1.6rem] p-4 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Health Score</p>
                <p className="text-2xl font-semibold text-slate-900">{healthScore}/100</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-emerald-100/75 text-emerald-700">
                <Trophy className="h-3.5 w-3.5" />
                Weekly momentum
              </div>
            </section>

            <div className="grid grid-cols-1 gap-5 mb-5 md:grid-cols-[1.15fr_0.85fr]">
              <CalorieRing consumed={snapshot.caloriesConsumed} target={snapshot.caloriesTarget} />
              <HabitTrackingRings
                waterPct={snapshot.waterIntakeMl / snapshot.waterTargetMl}
                mealsPct={snapshot.mealsLogged / 5}
                junkPct={snapshot.junkMeals / 3}
              />
            </div>

            <div className="space-y-5">
              <MacroProgress
                protein={{ consumed: snapshot.proteinConsumed, target: snapshot.proteinTarget }}
                carbs={{ consumed: snapshot.carbsConsumed, target: snapshot.carbsTarget }}
                fat={{ consumed: snapshot.fatConsumed, target: snapshot.fatTarget }}
              />

              <AISuggestionsCard suggestions={suggestions} />

              <FoodChoicesSection items={foodChoices} />

              <section className="glass-surface rounded-[2rem] p-5 mb-8">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900">Weekly Report</p>
                  <span className="text-xs text-slate-500">Updated 2m ago</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Protein consistency is trending up while late-night snacking remains your biggest score blocker.
                </p>
                <div className="h-2 mt-4 rounded-full bg-orange-100 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#34C759] via-[#84cc16] to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.1, delay: 0.6 }}
                  />
                </div>
              </section>
            </div>

            <motion.div
              className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.3rem)] right-5 z-40 md:right-[calc(50%-190px)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/scan" aria-label="Scan Food">
                <motion.div
                  className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#34C759] to-[#249f48] text-white shadow-[0_20px_45px_-18px_rgba(22,163,74,0.85)]"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/25"
                    animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.92, 1.1, 0.92] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative h-full w-full inline-flex items-center justify-center">
                    <Plus className="h-7 w-7" />
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-5 z-40 hidden md:flex"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="glass-surface rounded-full px-3 py-2 text-xs text-slate-700 inline-flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                450 kcal active burn
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
