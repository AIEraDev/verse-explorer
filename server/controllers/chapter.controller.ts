import { Request, Response } from "express";
import { cache, quranClient } from "../server.js";

// Get all chapters
export const getChapters = async (_: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = "chapters:all";
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const data = await quranClient.getChapters();
    cache.set(cacheKey, data);

    return res.status(200).json(data);
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

// Get a chapters
export const getChapter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { chapterId } = req.params;

    const cacheKey = `chapters:${chapterId}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const data = await quranClient.getChapter(chapterId);
    cache.set(cacheKey, data);

    return res.status(200).json(data);
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

// Get verses by chapter
export const getVerses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { chapterId } = req.params;
    const { page = 1, per_page = 10, translations, words, audio, tafsirs } = req.query;

    const cacheKey = `verses:${chapterId}:${page}:${per_page}:${translations || ""}:${words || ""}:${audio || ""}:${tafsirs || ""}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const data = await quranClient.getVerses(chapterId, {
      page: Number.parseInt(page as string),
      per_page: Number.parseInt(per_page as string),
      translations: translations as string,
      words: words === "true",
      audio: audio === "true",
      tafsirs: tafsirs as string,
    });

    cache.set(cacheKey, data);

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  return res.status(500).json({
    error: "Unknown error occurred",
  });
};
