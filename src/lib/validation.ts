import { z } from "zod";

export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

export const nutritionSnapshotSchema = z.object({
  caloriesConsumed: z.number().min(0).max(10000),
  caloriesTarget: z.number().min(100).max(10000),
  proteinConsumed: z.number().min(0).max(500),
  proteinTarget: z.number().min(10).max(500),
  carbsConsumed: z.number().min(0).max(1000),
  carbsTarget: z.number().min(10).max(1000),
  fatConsumed: z.number().min(0).max(400),
  fatTarget: z.number().min(10).max(400),
  waterIntakeMl: z.number().min(0).max(10000),
  waterTargetMl: z.number().min(500).max(10000),
  mealsLogged: z.number().int().min(0).max(12),
  junkMeals: z.number().int().min(0).max(8),
  lastMealHour24: z.number().int().min(0).max(23),
});

export const mealInputSchema = z.object({
  userId: z.string().min(3).max(128),
  name: z.string().min(2).max(80).transform(sanitizeText),
  calories: z.number().min(0).max(2000),
  protein: z.number().min(0).max(200),
  carbs: z.number().min(0).max(300),
  fat: z.number().min(0).max(200),
  timestamp: z.string().datetime().optional(),
});

export type MealInput = z.infer<typeof mealInputSchema>;
