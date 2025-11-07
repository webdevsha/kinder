import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  originalText: text("original_text").notNull(),
  topic: text("topic"),
  sourceUrl: text("source_url"),
  wordCount: integer("word_count").notNull(),
  crossCurricularConnections: jsonb("cross_curricular_connections").$type<CrossCurricularConnection[]>(),
  availableLanguages: jsonb("available_languages").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingLevels = pgTable("reading_levels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  level: integer("level").notNull(),
  content: text("content").notNull(),
  byline: text("byline"),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  questions: jsonb("questions").notNull().$type<QuizQuestion[]>(),
});

export const writePrompts = pgTable("write_prompts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull().references(() => articles.id, { onDelete: "cascade" }),
  prompts: jsonb("prompts").notNull().$type<string[]>(),
});

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CrossCurricularConnection {
  subject: string;
  topic: string;
  syllabusReference: string;
  description: string;
  curriculum: "KSSM" | "KSSR";
}

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true });
export const insertReadingLevelSchema = createInsertSchema(readingLevels).omit({ id: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ id: true });
export const insertWritePromptSchema = createInsertSchema(writePrompts).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type ReadingLevel = typeof readingLevels.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type WritePrompt = typeof writePrompts.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertReadingLevel = z.infer<typeof insertReadingLevelSchema>;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type InsertWritePrompt = z.infer<typeof insertWritePromptSchema>;
