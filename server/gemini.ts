import { GoogleGenAI } from "@google/genai";

if (!process.env.GOOGLE_API_KEY) {
  console.warn("GOOGLE_API_KEY not set - AI features will not work");
}

// DON'T DELETE THIS COMMENT
// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
export const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "dummy-key-for-development" });

// Using Gemini 2.5 Flash for cost efficiency and speed
export const AI_MODEL = "gemini-2.5-flash";
