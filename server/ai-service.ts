import { getModel } from "./gemini";
import type { QuizQuestion } from "@shared/schema";

interface LeveledContent {
  level: number;
  content: string;
  byline: string;
}

// Helper to clean and parse Gemini JSON responses (removes markdown wrappers)
function parseGeminiJSON(responseText: string): any {
  let cleanedText = responseText.trim();
  
  // Remove markdown code blocks if present
  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.replace(/^```json\s*\n/, "").replace(/\n```\s*$/, "");
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/^```\s*\n/, "").replace(/\n```\s*$/, "");
  }
  
  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Failed to parse Gemini response:", cleanedText);
    throw new Error("AI returned invalid response format");
  }
}

export async function generateReadingLevels(
  originalText: string,
  title: string
): Promise<LeveledContent[]> {
  const model = getModel("application/json");
  
  const prompt = `You are an educational content specialist for Malaysian students (Year 5 and above, ages 11+).

Transform the following article into 5 different reading levels suitable for Malaysian students following KSSM/KSSR curriculum. This is for creating adaptive dynamic textbooks.

Level 1: Simple vocabulary, short sentences (suitable for struggling Year 5 readers)
Level 2: Basic vocabulary, clear structure (average Year 5)
Level 3: Standard vocabulary, moderate complexity (strong Year 5 / average Year 6)
Level 4: Advanced vocabulary, complex sentences (Year 6+)
Level 5: Original complexity with enriched vocabulary

Title: ${title}

Original Text:
${originalText}

Return a JSON object with this exact structure:
{
  "levels": [
    {
      "level": 1,
      "content": "Simplified version with 3-4 paragraphs...",
      "byline": "Adapted for younger readers"
    },
    {
      "level": 2,
      "content": "...",
      "byline": "..."
    },
    {
      "level": 3,
      "content": "...",
      "byline": "..."
    },
    {
      "level": 4,
      "content": "...",
      "byline": "..."
    },
    {
      "level": 5,
      "content": "...",
      "byline": "..."
    }
  ]
}

Important:
- Maintain the core facts and story
- Use Malaysian English spelling and context
- Keep cultural references appropriate for Malaysia
- Each level should be 3-5 paragraphs
- Ensure content is engaging and educational`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  
  const responseText = await result.response.text();
  
  if (!responseText) {
    throw new Error("AI failed to generate reading levels");
  }
  
  const parsed = parseGeminiJSON(responseText);
  
  if (!parsed.levels || !Array.isArray(parsed.levels)) {
    throw new Error("AI returned invalid reading levels format");
  }
  
  return parsed.levels;
}

export async function generateQuiz(
  articleContent: string,
  title: string
): Promise<QuizQuestion[]> {
  const model = getModel("application/json");
  
  const prompt = `Create 5 comprehension questions for this textbook content suitable for Malaysian Year 5+ students.

Title: ${title}

Content:
${articleContent}

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "question": "Clear, specific question about the content?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 1
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 2
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 0
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 3
    }
  ]
}

Guidelines:
- Questions should test understanding, not just recall
- Use clear, age-appropriate language
- Include one question about main idea, one about details, one inferential
- Ensure only one clearly correct answer per question
- correctAnswer is the index (0-3) of the correct option`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  
  const responseText = await result.response.text();
  
  if (!responseText) {
    throw new Error("AI failed to generate quiz");
  }
  
  const parsed = parseGeminiJSON(responseText);
  
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error("AI returned invalid quiz format");
  }
  
  return parsed.questions;
}

export async function generateWritePrompts(
  articleContent: string,
  title: string
): Promise<string[]> {
  const model = getModel("application/json");
  
  const prompt = `Create 3 writing prompts based on this textbook content for Malaysian Year 5+ students.

Title: ${title}

Content:
${articleContent}

Return a JSON object with this exact structure:
{
  "prompts": [
    "First writing prompt that encourages critical thinking...",
    "Second prompt that asks for personal connection...",
    "Third prompt that explores causes/effects or implications..."
  ]
}

Guidelines:
- Each prompt should encourage 2-3 paragraph responses
- Prompts should relate directly to the content
- Use clear, engaging language
- Encourage evidence-based reasoning from the text
- Make prompts culturally relevant to Malaysian students`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  
  const responseText = await result.response.text();
  
  if (!responseText) {
    throw new Error("AI failed to generate write prompts");
  }
  
  const parsed = parseGeminiJSON(responseText);
  
  if (!parsed.prompts || !Array.isArray(parsed.prompts)) {
    throw new Error("AI returned invalid prompts format");
  }
  
  return parsed.prompts;
}

export async function extractTitleAndTopic(text: string): Promise<{ title: string; topic: string }> {
  const model = getModel("application/json");
  
  const prompt = `Analyze this text and extract a clear title and categorize it into one topic.

Text:
${text.substring(0, 1000)}...

Return a JSON object with this exact structure:
{
  "title": "Clear, engaging title for the content",
  "topic": "Single category: Pendidikan, Teknologi, Alam Sekitar, Sukan, Kebudayaan, Sains, Kesihatan, or Umum"
}`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  
  const responseText = await result.response.text();
  
  if (!responseText) {
    throw new Error("AI failed to extract title and topic");
  }
  
  const parsed = parseGeminiJSON(responseText);
  
  if (!parsed.title || !parsed.topic) {
    throw new Error("AI returned invalid title/topic format");
  }
  
  return parsed;
}
