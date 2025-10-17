import { Request, Response } from "express";
import { cache, quranClient } from "../server.js";

export const getAudio = async (req: Request, res: Response) => {
  try {
    const { reciterId, chapterId, verseNumber } = req.params;
    const cacheKey = `audio:${reciterId}:${chapterId}:${verseNumber}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const data = await quranClient.getAudio(reciterId, chapterId, verseNumber);
    cache.set(cacheKey, data);
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Unknown error occurred",
    });
  }
};
