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
                messages: [
                    {
                        role: "system",
                        content: "You are Wanderlust AI, a helpful travel assistant. Answer questions about travel, destinations, hotels, tourism and general knowledge in a friendly and clear way."
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
