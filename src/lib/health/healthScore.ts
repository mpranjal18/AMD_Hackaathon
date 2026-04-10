import type { NutritionSnapshot } from "@/types/health";

function ratioScore(consumed: number, target: number): number {
  if (target <= 0) return 0;
  const ratio = consumed / target;
  if (ratio <= 1) return ratio * 100;
  return Math.max(60, 100 - (ratio - 1) * 40);
}

export function calculateHealthScore(snapshot: NutritionSnapshot): number {
  const calories = ratioScore(snapshot.caloriesConsumed, snapshot.caloriesTarget);
  const protein = ratioScore(snapshot.proteinConsumed, snapshot.proteinTarget);
  const hydration = ratioScore(snapshot.waterIntakeMl, snapshot.waterTargetMl);
  const junkPenalty = Math.min(snapshot.junkMeals * 9, 28);

  const weighted = calories * 0.35 + protein * 0.3 + hydration * 0.25 + 10;
  const score = Math.round(weighted - junkPenalty);

  return Math.max(0, Math.min(score, 100));
}
