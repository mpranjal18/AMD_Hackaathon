export type DietType = "balanced" | "high-protein" | "low-carb" | "vegetarian";

export interface UserProfile {
  uid: string;
  name: string;
  age: number;
  weight: number;
  goal: "lose" | "maintain" | "gain";
  diet_type: DietType;
}

export interface MealEntry {
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

export interface HabitEntry {
  userId: string;
  water: number;
  junk: number;
  meals: number;
  date: string;
}

export interface NutritionSnapshot {
  caloriesConsumed: number;
  caloriesTarget: number;
  proteinConsumed: number;
  proteinTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fatConsumed: number;
  fatTarget: number;
  waterIntakeMl: number;
  waterTargetMl: number;
  mealsLogged: number;
  junkMeals: number;
  lastMealHour24: number;
}

export type SuggestionSeverity = "info" | "warning" | "success";

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  severity: SuggestionSeverity;
  actionLabel: string;
}

export interface FoodChoice {
  id: string;
  category: "high-protein" | "low-calorie" | "balanced";
  title: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
