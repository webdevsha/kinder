import pkg from 'pg';
const { Pool } = pkg;
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

// Create a safe connection config
const connectionConfig = {
  connectionString: databaseUrl || "postgres://dummy:dummy@localhost:5432/dummy",
  ssl: databaseUrl ? { rejectUnauthorized: false } : undefined,
  // Optimization for Vercel Serverless:
  max: 1, // Keep pool small in serverless to prevent connection exhaustion
  connectionTimeoutMillis: 2000, // Fail fast (2s) instead of hanging to avoid Vercel timeouts
  idleTimeoutMillis: 30000,
};

export const pool = new Pool(connectionConfig);

// Handle pool errors to prevent process crash
pool.on('error', (err) => {
  console.error('[db] Unexpected error on idle client', err);
});

export const db = drizzle(pool, { schema });