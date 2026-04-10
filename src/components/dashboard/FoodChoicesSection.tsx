"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import type { FoodChoice } from "@/types/health";

interface FoodChoicesSectionProps {
  items: FoodChoice[];
}

export function FoodChoicesSection({ items }: FoodChoicesSectionProps) {
  return (
    <section className="glass-surface rounded-[2rem] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">Recommended Food Choices</h2>
        <span className="text-xs text-slate-500">AI curated</span>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className="rounded-2xl bg-white/65 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize">{item.category.replace("-", " ")}</p>

                <p className="text-xs text-slate-600 mt-2">
                  {item.calories} kcal • P {item.protein}g • C {item.carbs}g • F {item.fat}g
                </p>
              </div>

              <button
                type="button"
                className="h-9 w-9 rounded-full bg-[#34C759] text-white inline-flex items-center justify-center self-end shadow-[0_12px_22px_-14px_rgba(22,163,74,0.95)]"
                aria-label={`Add ${item.title}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
