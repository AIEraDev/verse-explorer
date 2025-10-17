import { Request, Response } from "express";
import { cache, quranClient } from "../server.js";

interface Reciter {
  id: number;
  name: string;
  arabic_name: string;
  relative_path: string;
  format: string;
  files_size: number;
}

// Get all reciters
export const getReciters = async (_: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = "reciters:all";
    const cached = cache.get(cacheKey);

    if (cached) {
      res.status(200).json(cached);
      return;
    }

    const reciters: Reciter[] = await quranClient.getReciters();
    cache.set(cacheKey, reciters);
    res.status(200).json(reciters);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      error: "Unknown error occurred",
    });
  }
};
