const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const Chat = require("../model/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/message", async (req, res) => {
  try {
    const { convoId, role, content } = req.body;
    if (!convoId || !role || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await model.generateContent(content);
    const aiReply = result?.response?.text?.() || "Sorry, I couldn't generate a reply.";

    await Promise.all([
      Chat.create({ convoId, role, message: content }),
      Chat.create({ convoId, role: "Assistant", message: aiReply })
    ]);

    res.status(200).json({ success: true, botmsg: aiReply });
  } catch (error) {
    console.error("Error in /message route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;