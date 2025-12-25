import dotenv from "dotenv";
import path from "path";

// Load .env.local first (dotenv doesn't override existing keys by default, so first one wins)
// We look for .env.local in the current working directory (project root)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Then load .env as a fallback
dotenv.config({ path: path.resolve(process.cwd(), ".env") });