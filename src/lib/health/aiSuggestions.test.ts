import { describe, expect, it } from "vitest";
import { generateAISuggestions } from "@/lib/health/aiSuggestions";
import type { NutritionSnapshot } from "@/types/health";

const base: NutritionSnapshot = {
  caloriesConsumed: 1800,
  caloriesTarget: 2500,
  proteinConsumed: 120,
  proteinTarget: 150,
  carbsConsumed: 200,
  carbsTarget: 250,
  fatConsumed: 50,
  fatTarget: 70,
  waterIntakeMl: 2000,
  waterTargetMl: 3000,
  mealsLogged: 4,
  junkMeals: 1,
  lastMealHour24: 20,
};

describe("generateAISuggestions", () => {
  it("returns low protein suggestion when protein is below threshold", () => {
    const suggestions = generateAISuggestions({
      ...base,
      proteinConsumed: 60,
    });

    expect(suggestions.some((item) => item.id === "protein-gap")).toBe(true);
  });

  it("returns late-night warning when meal time is late", () => {
    const suggestions = generateAISuggestions({
      ...base,
      lastMealHour24: 23,
    });

    expect(suggestions.some((item) => item.id === "late-night")).toBe(true);
  });

  it("returns fallback success when all signals are healthy", () => {
    const suggestions = generateAISuggestions({
      ...base,
      proteinConsumed: 140,
      waterIntakeMl: 2800,
      lastMealHour24: 19,
    });

    expect(suggestions[0]?.id).toBe("on-track");
  });
});
