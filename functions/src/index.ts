import "dotenv/config";
import * as functions from "firebase-functions/v1";
import Busboy from "busboy";
import { extractTextFromPDF } from "./pdf.service";
import { analyzeResume } from "./analysis.service";
import { analyzeWithAI } from "./ai.service";

console.log("🔥 Functions starting...");

export const api = functions
  .runWith({
    timeoutSeconds: 60,
    memory: "1GB",
  })
  .https.onRequest((req, res): void => {
    console.log("➡️ CONTENT-TYPE:", req.headers["content-type"]);

    // Manual CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({
        error: "Method not allowed",
      });
      return;
    }

    const busboy = Busboy({
      headers: req.headers,
    });

    const fileChunks: Buffer[] = [];

    busboy.on("file", (fieldname, file) => {
      file.on("data", (data: Buffer) => {
        fileChunks.push(data);
      });
    });

    busboy.on("finish", async () => {
  try {
    const pdfBuffer = Buffer.concat(fileChunks);

    const extractedText =
      await extractTextFromPDF(pdfBuffer);

    const ruleAnalysis =
      analyzeResume(extractedText);

    const aiAnalysis =
      await analyzeWithAI(extractedText);

    res.json({
      rawText: extractedText,
      ruleAnalysis,
      aiAnalysis,
    });

  } catch (error) {
    console.error("Processing error:", error);

    res.status(500).json({
      error: "Failed to analyze resume",
    });
  }
});

    busboy.on("error", (err: Error) => {
      console.error("🔥 BUSBOY ERROR:", err);

      res.status(500).json({
        error: err.message,
      });
    });

    busboy.end(req.rawBody);
  });
