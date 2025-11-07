import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY or GOOGLE_API_KEY not set - AI features will not work");
}

// DON'T DELETE THIS COMMENT
// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
export const ai = new GoogleGenAI({ apiKey: apiKey || "dummy-key-for-development" });

// Using Gemini 2.5 Flash for better performance and latest features
export const AI_MODEL = "gemini-2.5-flash";
