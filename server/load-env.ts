import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

console.log(`[load-env] Current working directory: ${process.cwd()}`);

// Try loading .env.local
if (fs.existsSync(envLocalPath)) {
  console.log(`[load-env] Found .env.local at ${envLocalPath}`);
  const result = dotenv.config({ path: envLocalPath });
  if (result.error) {
    console.error("[load-env] Error parsing .env.local:", result.error);
  } else {
    console.log("[load-env] Successfully loaded .env.local");
  }
} else {
  console.log("[load-env] .env.local file NOT found at", envLocalPath);
}

// Try loading .env
if (fs.existsSync(envPath)) {
  console.log(`[load-env] Found .env at ${envPath}`);
  dotenv.config({ path: envPath });
}