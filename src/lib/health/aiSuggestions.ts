import type { AISuggestion, NutritionSnapshot } from "@/types/health";

export function generateAISuggestions(data: NutritionSnapshot): AISuggestion[] {
  const suggestions: AISuggestion[] = [];

  const proteinProgress = data.proteinConsumed / data.proteinTarget;
  const hydrationProgress = data.waterIntakeMl / data.waterTargetMl;

  if (proteinProgress < 0.7) {
    suggestions.push({
      id: "protein-gap",
      title: "Low protein detected",
      description:
        "You are behind your protein target. Add eggs, Greek yogurt, tofu, or grilled chicken in your next meal.",
      severity: "warning",
      actionLabel: "Add protein meal",
    });
  }

  if (data.lastMealHour24 >= 22 || data.lastMealHour24 <= 1) {
    suggestions.push({
      id: "late-night",
      title: "Late-night eating pattern",
      description:
        "Meals after 10 PM can impact recovery quality. Keep a lighter snack and hydrate before sleep.",
      severity: "warning",
      actionLabel: "View nighttime plan",
    });
  }

  if (hydrationProgress < 0.65) {
    const remaining = Math.max(data.waterTargetMl - data.waterIntakeMl, 0);
    suggestions.push({
      id: "hydration",
      title: "Hydration alert",
      description: `You still need ${Math.round(remaining / 250)} glasses of water today for your hydration goal.`,
      severity: "info",
      actionLabel: "Hydrate now",
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: "on-track",
      title: "Great balance today",
      description:
        "Your nutrition rhythm looks strong. Keep your final meal lean and fiber-rich to finish the day clean.",
      severity: "success",
      actionLabel: "Keep momentum",
    });
  }

  return suggestions;
}
