import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/server/firebaseAdmin";
import { buildMealDocument, normalizeMealInput } from "@/lib/server/mealService";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId || userId.length < 3) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  try {
    const input = normalizeMealInput(await request.json());

    if (input.userId !== userId) {
      return NextResponse.json({ error: "User mismatch" }, { status: 403 });
    }

    const mealDoc = buildMealDocument(input);
    const db = getAdminDb();

    if (db) {
      const ref = await db.collection("Meals").add(mealDoc);
      return NextResponse.json({ id: ref.id, meal: mealDoc }, { status: 201 });
    }

    return NextResponse.json(
      {
        id: `mock-${Date.now()}`,
        meal: mealDoc,
        warning: "Firestore admin is not configured. Data was not persisted.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid meal payload" }, { status: 400 });
  }
}
