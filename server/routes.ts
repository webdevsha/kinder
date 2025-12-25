import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateReadingLevels, 
  generateQuiz, 
  generateWritePrompts, 
  extractTitleAndTopic 
} from "./ai-service";
import { z } from "zod";

// Request validation schema
const processRequestSchema = z.object({
  text: z.string().trim().min(100, "Text must be at least 100 characters").optional(),
  url: z.string().url().optional(),
}).refine((data) => {
  if (!data.text && !data.url) return false;
  if (data.url && !data.text) return false;
  return !!data.text; 
}, {
  message: "Please provide text content (minimum 100 characters). URL ingestion coming soon."
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Debug endpoint to check environment (without exposing secrets)
  app.get("/api/debug", (_req, res) => {
    res.json({
      status: "online",
      env: {
        hasDatabaseUrl: !!(process.env.DATABASE_URL || process.env.SUPABASE_DB_URL),
        hasGeminiKey: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
        nodeEnv: process.env.NODE_ENV,
        storageType: storage.constructor.name
      }
    });
  });

  // Health check endpoint
  app.get("/api/health", async (_req, res) => {
    try {
      const hasData = await storage.hasArticles();
      res.json({ 
        status: "ok", 
        storage: storage.constructor.name, 
        hasData 
      });
    } catch (error: any) {
      console.error("Health check failed:", error);
      res.status(503).json({ 
        status: "error", 
        message: "Database connection failed",
        details: error.message 
      });
    }
  });

  // Process article/content
  app.post("/api/articles/process", async (req: Request, res: Response) => {
    try {
      const validation = processRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request",
          details: validation.error.errors[0].message
        });
      }

      const { text, url } = validation.data;
      if (!text) return res.status(400).json({ error: "Text content is required" });

      const content = text;
      const { title, topic } = await extractTitleAndTopic(content);
      const wordCount = content.split(/\s+/).length;
      
      const article = await storage.createArticle({
        title,
        originalText: content,
        topic,
        sourceUrl: url || null,
        wordCount
      });

      const levels = await generateReadingLevels(content, title);
      for (const levelData of levels) {
        await storage.createReadingLevel({
          articleId: article.id,
          level: levelData.level,
          content: levelData.content,
          byline: levelData.byline
        });
      }

      const level3 = levels.find(l => l.level === 3);
      if (level3) {
        const questions = await generateQuiz(level3.content, title);
        await storage.createQuiz({
          articleId: article.id,
          questions
        });
      }

      const level3Content = levels.find(l => l.level === 3);
      if (level3Content) {
        const prompts = await generateWritePrompts(level3Content.content, title);
        await storage.createWritePrompts({
          articleId: article.id,
          prompts
        });
      }

      res.json({ success: true, articleId: article.id, article });
    } catch (error: any) {
      console.error("Error processing article:", error);
      res.status(500).json({ 
        error: "Failed to process content",
        message: error.message || "An unexpected error occurred"
      });
    }
  });

  // Get all articles
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error: any) {
      console.error("Failed to fetch articles:", error);
      res.status(500).json({ 
        error: "Database error", 
        message: error.message 
      });
    }
  });

  // Get single article
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/articles/:id/levels", async (req, res) => {
    try {
      const levels = await storage.getReadingLevelsByArticle(req.params.id);
      res.json(levels);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/articles/:id/levels/:level", async (req, res) => {
    try {
      const level = await storage.getReadingLevel(req.params.id, parseInt(req.params.level));
      if (!level) return res.status(404).json({ error: "Reading level not found" });
      res.json(level);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/articles/:id/quiz", async (req, res) => {
    try {
      const quiz = await storage.getQuizByArticle(req.params.id);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.json(quiz);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/articles/:id/prompts", async (req, res) => {
    try {
      const prompts = await storage.getWritePromptsByArticle(req.params.id);
      if (!prompts) return res.status(404).json({ error: "Write prompts not found" });
      res.json(prompts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}