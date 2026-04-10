const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Mock Food AI Scanner Function
 * Trigger this when an image is uploaded to Firebase Storage
 * Here we provide an HTTP callable endpoint for dummy testing
 */
exports.analyzeFoodImage = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { imageUrl, userId } = req.body;
    logger.info(`Analyzing image for user ${userId}: ${imageUrl}`);

    // Mock AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockAIResponse = {
      foodName: "Grilled Chicken Salad",
      confidence: 0.98,
      nutritionalInfo: {
        calories: 420,
        protein: 35,
        carbs: 12,
        fat: 18,
      },
    };

    // Log the detected meal to Firestore if userId is provided
    if (userId) {
      const db = admin.firestore();
      await db.collection("Meals").add({
        userId,
        name: mockAIResponse.foodName,
        calories: mockAIResponse.nutritionalInfo.calories,
        protein: mockAIResponse.nutritionalInfo.protein,
        carbs: mockAIResponse.nutritionalInfo.carbs,
        fat: mockAIResponse.nutritionalInfo.fat,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.status(200).json({ success: true, data: mockAIResponse });
  } catch (error) {
    logger.error("Error analyzing image", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Generate Weekly AI Health Report
 * A scheduled function or HTTP trigger to simulate weekly health insights
 */
exports.generateWeeklyReport = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).send("Bad Request: userId required");

    const db = admin.firestore();
    const mockReport = {
      userId,
      reportWeek: new Date().toISOString(),
      insights: [
        "Consistent protein intake! You hit your goal 5 days this week.",
        "Late-night snacking detected. Try to limit eating after 9 PM.",
      ],
      score: 85,
    };

    await db.collection("Reports").add(mockReport);

    res.status(200).json({ success: true, data: mockReport });
  } catch (error) {
    logger.error("Error generating report", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
