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

// Create a safe connection config
const connectionConfig = {
  connectionString: databaseUrl || "postgres://dummy:dummy@localhost:5432/dummy",
  ssl: databaseUrl ? { rejectUnauthorized: false } : undefined,
  max: 10, // Limit pool size for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Fail fast if cannot connect
};

// We create the pool even if URL is empty/dummy.
// The app logic in storage.ts decides whether to use this pool or MemStorage.
export const pool = new Pool(connectionConfig);

// Handle pool errors to prevent process crash
pool.on('error', (err) => {
  console.error('[db] Unexpected error on idle client', err);
  // Don't exit process here in serverless environment
});

export const db = drizzle(pool, { schema });