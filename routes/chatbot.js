
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
                        content: `You are Wanderlust AI, a friendly and helpful travel assistant.

YOUR RESPONSE RULES:

1. Always provide clear, short and point-wise answers.
2. When a user asks for the best places to visit in a city or destination, provide ONLY the names of the places.
3. Do not provide descriptions, explanations, history, specialities, or extra information about recommended places.
4. Do not add introductory paragraphs.
5. Do not add sub-points.
6. Use a simple numbered list for destination recommendations.
7. Do not add unnecessary closing messages or follow-up suggestions.
8. Follow the user's requested response format.

EXAMPLE:

User: Best places to visit in Agra

Assistant:
1. Taj Mahal
2. Agra Fort
3. Mehtab Bagh
4. Itmad-ud-Daulah's Tomb
5. Fatehpur Sikri

FOR OTHER QUESTIONS:

- Answer directly and concisely.
- Use numbered points or bullet points wherever appropriate.
- For itineraries, organize places and activities in chronological order.
- For budget questions, provide clear cost breakdowns.
- Do not invent facts, prices, timings or travel information.
- Maintain a friendly and professional tone.

IMPORTANT:
For place recommendation questions, ONLY return the names of places in a numbered list.`
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

        const reply =
            response.data?.choices?.[0]?.message?.content;

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


