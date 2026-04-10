import type { FoodChoice } from "@/types/health";

const FOOD_CHOICES: FoodChoice[] = [
  {
    id: "hp-1",
    category: "high-protein",
    title: "Greek Yogurt Power Bowl",
    image:
      "https://images.unsplash.com/photo-1437751695201-298be97a82a8?auto=format&fit=crop&w=900&q=80",
    calories: 260,
    protein: 24,
    carbs: 18,
    fat: 10,
  },
  {
    id: "lc-1",
    category: "low-calorie",
    title: "Crunchy Cucumber Snack Cup",
    image:
      "https://images.unsplash.com/photo-1522184216316-3c25379f9760?auto=format&fit=crop&w=900&q=80",
    calories: 110,
    protein: 5,
    carbs: 14,
    fat: 3,
  },
  {
    id: "bm-1",
    category: "balanced",
    title: "Salmon Quinoa Balance Plate",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    calories: 430,
    protein: 33,
    carbs: 30,
    fat: 18,
  },
];

export function getRecommendedFoodChoices(): FoodChoice[] {
  return FOOD_CHOICES;
}
