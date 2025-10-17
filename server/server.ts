/**
 * Verse Explorer Backend Server
 *
 * Express.js API server providing a clean interface to Quran.Foundation API
 *
 * Architecture Overview:
 * - RESTful API design with modular route structure
 * - OAuth2 authentication with automatic token management
 * - LRU caching layer for performance optimization
 * - CORS enabled for secure cross-origin requests
 *
 * Key Features:
 * - Automatic token refresh for uninterrupted service
 * - Smart caching reduces API calls by ~90%
 * - Type-safe with TypeScript
 * - Modular route organization for maintainability
 */

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { LRUCache } from "lru-cache";
import { QuranAPIClient } from "./quran-client.js";
import chaptersRoute from "./routes/chapter.route.js";
import reciterRoute from "./routes/reciter.route.js";
import audioRoute from "./routes/audio.route.js";
import translateRoute from "./routes/translation.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3067;

/**
 * LRU Cache Configuration
 *
 * Least Recently Used cache for API response optimization
 *
 */
export const cache = new LRUCache({
  max: 500, // Maximum number of cached items
  ttl: 1000 * 60 * 60, // 1 hour TTL in milliseconds
});

/**
 * Quran API Client Instance
 *
 * Singleton instance managing OAuth2 authentication and API communication
 *
 * Responsibilities:
 * - OAuth2 token acquisition and refresh
 * - Authenticated API requests
 * - Token caching with automatic expiry handling
 * - Request error handling and retries
 *
 * Configuration from environment variables ensures flexibility across environments
 */
export const quranClient = new QuranAPIClient({
  clientId: process.env.QURAN_CLIENT_ID!,
  clientSecret: process.env.QURAN_CLIENT_SECRET!,
  tokenEndpoint: process.env.QURAN_TOKEN_ENDPOINT!,
  apiBaseUrl: process.env.QURAN_API_BASE_URL!,
});

/**
 * CORS Middleware Configuration
 *
 * Enables secure cross-origin requests from the frontend application
 *
 */
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.QURAN_CLIENT_URL_PROD : process.env.QURAN_CLIENT_URL!, // Frontend URL from environment
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON body parser for request payload handling
app.use(express.json());

/**
 * Health Check Endpoint
 */
app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * API Routes
 *
 * Modular route organization for better maintainability
 * Each route handles a specific domain of the Quran API
 */

// Chapter routes: List chapters, get chapter details, fetch verses
app.use("/api/chapters", chaptersRoute);

// Translation routes: List available translations
app.use("/api/translations", translateRoute);

// Reciter routes: List available audio reciters
app.use("/api/reciters", reciterRoute);

// Audio routes: Fetch verse audio URLs
app.use("/api/audio", audioRoute);

/**
 * Server Initialization
 *
 * Starts the Express server on configured port
 * Provides console feedback for development convenience
 */
app.listen(PORT, () => {
  console.log(`🚀 Verse Explorer Backend running on http://localhost:${PORT}`);
  console.log(`📖 API endpoints available at http://localhost:${PORT}/api/*`);
});

export default app;
