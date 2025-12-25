import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Debug log to see what's available
const hasDbUrl = !!process.env.DATABASE_URL;
const hasSupabaseUrl = !!process.env.SUPABASE_DB_URL;

console.log(`[db] Environment check - DATABASE_URL present: ${hasDbUrl}, SUPABASE_DB_URL present: ${hasSupabaseUrl}`);

// Support both standard DATABASE_URL and SUPABASE_DB_URL
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.warn("[db] WARNING: DATABASE_URL (or SUPABASE_DB_URL) not set. Falling back to memory storage.");
} else {
  console.log("[db] Connecting to database...");
}

export const pool = new Pool({ connectionString: databaseUrl || "" });
export const db = drizzle(pool, { schema });