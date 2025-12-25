import { registerRoutes } from "../server/routes";
import { seedDatabase } from "../server/seed";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup promise to handle initialization
// We don't block the export, but we await it in the handler
let setupPromise: Promise<any> | null = null;

async function setup() {
  if (setupPromise) return setupPromise;
  
  console.log("Initializing API handler...");
  try {
    // Attempt to seed, but don't fail the whole app if it fails (e.g. DB connection issues)
    try {
      await seedDatabase();
    } catch (e) {
      console.error("Seeding failed, but continuing:", e);
    }
    
    // Register routes
    await registerRoutes(app);
    console.log("Routes registered successfully");
  } catch (e) {
    console.error("Critical setup error:", e);
    throw e;
  }
}

setupPromise = setup();

export default async function handler(req: any, res: any) {
  try {
    await setupPromise;
    app(req, res);
  } catch (e: any) {
    console.error("Handler error:", e);
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: e.message || "Failed to initialize application" 
    });
  }
}