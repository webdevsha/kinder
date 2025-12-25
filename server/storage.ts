import type { 
  Article, 
  InsertArticle, 
  ReadingLevel, 
  InsertReadingLevel, 
  Quiz, 
  InsertQuiz, 
  WritePrompt, 
  InsertWritePrompt 
} from "@shared/schema";
import { articles, readingLevels, quizzes, writePrompts } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Article operations
  createArticle(article: InsertArticle): Promise<Article>;
  getArticle(id: string): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
  
  // Reading level operations
  createReadingLevel(level: InsertReadingLevel): Promise<ReadingLevel>;
  getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]>;
  getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined>;
  
  // Quiz operations
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizByArticle(articleId: string): Promise<Quiz | undefined>;
  
  // Write prompt operations
  createWritePrompts(prompts: InsertWritePrompt): Promise<WritePrompt>;
  getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private readingLevels: Map<string, ReadingLevel>;
  private quizzes: Map<string, Quiz>;
  private writePrompts: Map<string, WritePrompt>;

  constructor() {
    this.articles = new Map();
    this.readingLevels = new Map();
    this.quizzes = new Map();
    this.writePrompts = new Map();
  }

  // Article operations
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = { 
      id,
      title: insertArticle.title,
      originalText: insertArticle.originalText,
      topic: insertArticle.topic ?? null,
      sourceUrl: insertArticle.sourceUrl ?? null,
      wordCount: insertArticle.wordCount,
      crossCurricularConnections: (insertArticle.crossCurricularConnections as any) ?? null,
      availableLanguages: (insertArticle.availableLanguages as any) ?? null,
      createdAt: new Date()
    };
    this.articles.set(id, article);
    return article;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Reading level operations
  async createReadingLevel(insertLevel: InsertReadingLevel): Promise<ReadingLevel> {
    const id = randomUUID();
    const level: ReadingLevel = {
      id,
      articleId: insertLevel.articleId,
      level: insertLevel.level,
      content: insertLevel.content,
      byline: insertLevel.byline ?? null
    };
    this.readingLevels.set(id, level);
    return level;
  }

  async getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]> {
    return Array.from(this.readingLevels.values())
      .filter(level => level.articleId === articleId)
      .sort((a, b) => a.level - b.level);
  }

  async getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined> {
    return Array.from(this.readingLevels.values())
      .find(rl => rl.articleId === articleId && rl.level === level);
  }

  // Quiz operations
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = {
      id,
      articleId: insertQuiz.articleId,
      questions: insertQuiz.questions as any
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getQuizByArticle(articleId: string): Promise<Quiz | undefined> {
    return Array.from(this.quizzes.values())
      .find(quiz => quiz.articleId === articleId);
  }

  // Write prompt operations
  async createWritePrompts(insertPrompts: InsertWritePrompt): Promise<WritePrompt> {
    const id = randomUUID();
    const prompts: WritePrompt = {
      id,
      articleId: insertPrompts.articleId,
      prompts: insertPrompts.prompts as any
    };
    this.writePrompts.set(id, prompts);
    return prompts;
  }

  async getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined> {
    return Array.from(this.writePrompts.values())
      .find(wp => wp.articleId === articleId);
  }
}

export class DatabaseStorage implements IStorage {
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values({
        ...insertArticle,
        crossCurricularConnections: insertArticle.crossCurricularConnections as any,
        availableLanguages: insertArticle.availableLanguages as any
      })
      .returning();
    return article;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getAllArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(articles.createdAt);
  }

  async createReadingLevel(insertLevel: InsertReadingLevel): Promise<ReadingLevel> {
    const [level] = await db.insert(readingLevels).values(insertLevel).returning();
    return level;
  }

  async getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]> {
    return await db
      .select()
      .from(readingLevels)
      .where(eq(readingLevels.articleId, articleId))
      .orderBy(readingLevels.level);
  }

  async getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined> {
    const levels = await this.getReadingLevelsByArticle(articleId);
    return levels.find(l => l.level === level);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db
      .insert(quizzes)
      .values({
        ...insertQuiz,
        questions: insertQuiz.questions as any
      })
      .returning();
    return quiz;
  }

  async getQuizByArticle(articleId: string): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.articleId, articleId));
    return quiz;
  }

  async createWritePrompts(insertPrompts: InsertWritePrompt): Promise<WritePrompt> {
    const [prompts] = await db
      .insert(writePrompts)
      .values({
        ...insertPrompts,
        prompts: insertPrompts.prompts as any
      })
      .returning();
    return prompts;
  }

  async getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined> {
    const [prompts] = await db.select().from(writePrompts).where(eq(writePrompts.articleId, articleId));
    return prompts;
  }
}

const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
export const storage = databaseUrl ? new DatabaseStorage() : new MemStorage();