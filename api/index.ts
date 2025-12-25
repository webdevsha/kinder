import { registerRoutes } from "../server/routes";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes once
const setupPromise = registerRoutes(app);

export default async function handler(req: any, res: any) {
  // Ensure routes are set up before handling the request
  await setupPromise;
  app(req, res);
}