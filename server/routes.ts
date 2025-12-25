import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateReadingLevels, 
  generateQuiz, 
  generateWritePrompts, 
  extractTitleAndTopic 
} from "./ai-service";
import { insertArticleSchema } from "@shared/schema";
import { z } from "zod";

// Request validation schema
const processRequestSchema = z.object({
  text: z.string().trim().min(100, "Text must be at least 100 characters").optional(),
  url: z.string().url().optional(),
}).refine((data) => {
  // Must have either text or URL
  if (!data.text && !data.url) {
    return false;
  }
  // URL ingestion not implemented yet
  if (data.url && !data.text) {
    return false;
  }
  return !!data.text; // For now, only text is supported
}, {
  message: "Please provide text content (minimum 100 characters). URL ingestion coming soon."
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize storage (seeds DB if empty)
  await storage.init();

  // Process article/content
  app.post("/api/articles/process", async (req, res) => {
    try {
      // Validate request
      const validation = processRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request",
          details: validation.error.errors[0].message
        });
      }

      const { text, url } = validation.data;
      
      // Ensure text is present (refine check handles this logic but TS needs explicit check)
      if (!text) {
        return res.status(400).json({ error: "Text content is required" });
      }

      const content = text;
      
      // Extract title and topic
      const { title, topic } = await extractTitleAndTopic(content);
      
      // Count words
      const wordCount = content.split(/\s+/).length;
      
      // Create article
      const article = await storage.createArticle({
        title,
        originalText: content,
        topic,
        sourceUrl: url || null,
        wordCount
      });

      // Generate reading levels (5 levels)
      const levels = await generateReadingLevels(content, title);
      
      // Store all reading levels
      for (const levelData of levels) {
        await storage.createReadingLevel({
          articleId: article.id,
          level: levelData.level,
          content: levelData.content,
          byline: levelData.byline
        });
      }

      // Generate quiz based on level 3 content (middle difficulty)
      const level3 = levels.find(l => l.level === 3);
      if (level3) {
        const questions = await generateQuiz(level3.content, title);
        await storage.createQuiz({
          articleId: article.id,
          questions
        });
      }

      // Generate write prompts
      const level3Content = levels.find(l => l.level === 3);
      if (level3Content) {
        const prompts = await generateWritePrompts(level3Content.content, title);
        await storage.createWritePrompts({
          articleId: article.id,
          prompts
        });
      }

      res.json({ 
        success: true, 
        articleId: article.id,
        article 
      });
    } catch (error: any) {
      console.error("Error processing article:", error);
      
      // Return 502 for AI service failures
      if (error.message?.includes("AI") || 
          error.message?.includes("generate") ||
          error.message?.includes("invalid response") ||
          error.message?.includes("invalid")) {
        return res.status(502).json({ 
          error: "AI service error",
          message: "The AI service encountered an error. Please try again."
        });
      }
      
      res.status(500).json({ 
        error: "Failed to process content",
        message: error.message || "An unexpected error occurred"
      });
    }
  });

  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single article
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get reading levels for an article
  app.get("/api/articles/:id/levels", async (req, res) => {
    try {
      const levels = await storage.getReadingLevelsByArticle(req.params.id);
      res.json(levels);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific reading level
  app.get("/api/articles/:id/levels/:level", async (req, res) => {
    try {
      const level = await storage.getReadingLevel(
        req.params.id, 
        parseInt(req.params.level)
      );
      if (!level) {
        return res.status(404).json({ error: "Reading level not found" });
      }
      res.json(level);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get quiz for an article
  app.get("/api/articles/:id/quiz", async (req, res) => {
    try {
      const quiz = await storage.getQuizByArticle(req.params.id);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get write prompts for an article
  app.get("/api/articles/:id/prompts", async (req, res) => {
    try {
      const prompts = await storage.getWritePromptsByArticle(req.params.id);
      if (!prompts) {
        return res.status(404).json({ error: "Write prompts not found" });
      }
      res.json(prompts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}