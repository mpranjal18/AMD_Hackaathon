import { describe, expect, it } from "vitest";
import { buildMealDocument, normalizeMealInput } from "@/lib/server/mealService";

describe("meal service", () => {
  it("normalizes payload and strips unsafe chars", () => {
    const normalized = normalizeMealInput({
      userId: "user-1",
      name: "<Chicken Bowl>",
      calories: 420,
      protein: 35,
      carbs: 20,
      fat: 12,
    });

    expect(normalized.name).toBe("Chicken Bowl");
    expect(normalized.timestamp).toBeDefined();
  });

  it("builds firestore-ready meal document", () => {
    const doc = buildMealDocument({
      userId: "user-1",
      name: "Salad",
      calories: 200,
      protein: 10,
      carbs: 15,
      fat: 8,
      timestamp: "2026-04-10T00:00:00.000Z",
    });

    expect(doc).toEqual({
      userId: "user-1",
      name: "Salad",
      calories: 200,
      protein: 10,
      carbs: 15,
      fat: 8,
      timestamp: "2026-04-10T00:00:00.000Z",
    });
  });
});
