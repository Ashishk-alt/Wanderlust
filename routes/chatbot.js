const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful travel assistant."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply =
            response.data.choices[0].message.content;

        res.json({ reply });

    } catch (err) {
        console.log(err.response?.data || err.message);
        res.json({ reply: "AI not available right now" });
    }
});

module.exports = router;