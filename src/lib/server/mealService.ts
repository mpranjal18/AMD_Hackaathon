import { mealInputSchema, type MealInput } from "@/lib/validation";

export function normalizeMealInput(input: unknown): MealInput {
  const parsed = mealInputSchema.parse(input);

  return {
    ...parsed,
    timestamp: parsed.timestamp ?? new Date().toISOString(),
  };
}

export function buildMealDocument(input: MealInput) {
  return {
    userId: input.userId,
    name: input.name,
    calories: input.calories,
    protein: input.protein,
    carbs: input.carbs,
    fat: input.fat,
    timestamp: input.timestamp ?? new Date().toISOString(),
  };
}
