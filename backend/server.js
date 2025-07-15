const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Summarizer = require("node-summarizer"); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const summarizer = new Summarizer.SummarizerManager(text, 5);
    const result = await summarizer.getSummaryByRank();

    res.json({ summary: result.summary });
  } catch (err) {
    console.error("Text summarization error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/summarize-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: "Could not extract enough text from PDF." });
    }

    const summarizer = new Summarizer.SummarizerManager(text, 5);
    const result = await summarizer.getSummaryByRank();

    res.json({ summary: result.summary });
  } catch (err) {
    console.error("PDF summarization error:", err);
    res.status(500).json({ error: "Failed to summarize PDF", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
