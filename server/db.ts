import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Support both standard DATABASE_URL and SUPABASE_DB_URL
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL (or SUPABASE_DB_URL) not set. Falling back to memory storage.");
}

export const pool = new Pool({ connectionString: databaseUrl || "" });
export const db = drizzle(pool, { schema });