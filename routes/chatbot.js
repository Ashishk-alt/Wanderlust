
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message?.trim();

        if (!userMessage) {
            return res.status(400).json({
                reply: "Please enter a message."
            });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error("OPENROUTER_API_KEY is missing.");
            return res.status(500).json({
                reply: "AI configuration is missing. Please try again later."
            });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-5.4-mini",
                max_tokens: 1000,
                messages: [
                    {
                        role: "system",
                        content: `You are Wanderlust AI, a professional and friendly travel assistant.

RESPONSE FORMATTING RULES:

1. Always provide clear, structured and easy-to-read answers.
2. Use headings and numbered lists or bullet points.
3. For destination recommendations, list each place separately.
4. Include the following for each recommended destination:
   - Place name
   - Why it is worth visiting
   - Main attraction or speciality
5. Keep paragraphs short. Avoid large blocks of text.
6. Use Markdown bold formatting for important names and information.
7. Organize itineraries by day or time.
8. Use tables for comparisons when useful.
9. Answer simple questions directly before providing additional details.
10. Keep answers informative but concise.
11. End with a relevant follow-up suggestion when useful.

TRAVEL GUIDELINES:

- Help with destinations, hotels, sightseeing, tourism, travel planning and budgets.
- Give practical and relevant recommendations.
- Do not invent facts, prices, timings or travel information.
- Clearly mention when information needs verification.
- Maintain a friendly and professional tone.

Your goal is to provide helpful travel advice in clean, readable Markdown.`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        const reply = response.data?.choices?.[0]?.message?.content;

        if (!reply) {
            throw new Error("Empty response received from AI provider.");
        }

        return res.json({ reply });

    } catch (err) {
        console.error(
            "Wanderlust AI Error:",
            err.response?.data || err.message
        );

        return res.status(502).json({
            reply: "Sorry, I couldn't generate a response right now. Please try again."
        });
    }
});

module.exports = router;

