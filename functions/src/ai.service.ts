import OpenAI from "openai";

console.log("OPENAI KEY EXISTS:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
console.log("🔥 OpenAI starting...");
export const analyzeWithAI = async (resumeText: string) => {
  try {
    console.log("🤖 Starting AI analysis...");
    const trimmedText = resumeText.slice(0, 4000); // prevent high cost

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional HR recruiter. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Analyze this resume and respond strictly in JSON format:

{
  "aiScore": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}

Resume:
${trimmedText}
          `,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });
    console.log("✅ OpenAI response received");
    const content = response.choices[0].message.content;
    console.log("📄 AI CONTENT:", content);
    if (!content) throw new Error("No AI response");

    try {
      return JSON.parse(content);
    } catch {
      console.error("Invalid JSON from AI:", content);
      return null;
    }
  } catch (error) {
    console.error("AI service error:", error);
    return {
      aiScore: 70,

      strengths: ["Resume structure is readable"],

      weaknesses: ["AI analysis unavailable"],

      suggestions: ["Enable OpenAI billing for live AI analysis"],
    };
  }
};
