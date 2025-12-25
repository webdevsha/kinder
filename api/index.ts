import { registerRoutes } from "../server/routes";
import { seedDatabase } from "../server/seed";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes and seed database once
const setupPromise = (async () => {
  await seedDatabase();
  return registerRoutes(app);
})();

export default async function handler(req: any, res: any) {
  // Ensure routes and seeding are complete before handling the request
  await setupPromise;
  app(req, res);
}