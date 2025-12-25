import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Debug log to see what's available
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.warn("[db] WARNING: DATABASE_URL (or SUPABASE_DB_URL) not set. Storage will likely fall back to memory.");
} else {
  // Log masked URL for debugging
  const maskedUrl = databaseUrl.replace(/:[^:@]*@/, ':****@');
  console.log(`[db] Connecting to database at ${maskedUrl}`);
}

// Use standard pg Pool for Supabase compatibility
// We create the pool even if URL is empty, but queries will fail if used.
// This allows the app to start up and check env vars later.
export const pool = new Pool({ 
  connectionString: databaseUrl || "",
  ssl: databaseUrl ? { rejectUnauthorized: false } : undefined,
  max: 10, // Limit pool size for serverless
  idleTimeoutMillis: 30000
});

export const db = drizzle(pool, { schema });