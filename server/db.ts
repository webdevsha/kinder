import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

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

// Use standard pg Pool for Supabase compatibility
export const pool = new Pool({ 
  connectionString: databaseUrl || "",
  ssl: databaseUrl ? { rejectUnauthorized: false } : undefined // Fix for self-signed certs or specific Supabase configs
});

export const db = drizzle(pool, { schema });