import { NextResponse } from "next/server";
import { generateAISuggestions } from "@/lib/health/aiSuggestions";
import { calculateHealthScore } from "@/lib/health/healthScore";
import { nutritionSnapshotSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId || userId.length < 3) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const snapshot = nutritionSnapshotSchema.parse(payload);

    const suggestions = generateAISuggestions(snapshot);
    const healthScore = calculateHealthScore(snapshot);

    return NextResponse.json(
      {
        suggestions,
        healthScore,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
