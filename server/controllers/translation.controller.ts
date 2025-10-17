import { Request, Response } from "express";
import { cache, quranClient } from "../server.js";

export interface Translation {
  id: number;
  name: string;
  author_name: string;
  slug: string;
  language_name: string;
  translated_name: {
    name: string;
    language_name: string;
  };
}

// Get Translation
export const getTranslations = async (_: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = "translations";
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const translations: Translation[] = await quranClient.getTranslations();
    cache.set(cacheKey, translations);
    return res.status(200).json(translations);
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

export const getTranslation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const chapterId = req.params.chapterId;

    const cacheKey = `translations:${chapterId}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const resourcesData = await quranClient.getResources();

    // Extract id of first translations 😎
    const translationId = resourcesData.translations[0].id;

    const data = await quranClient.getChapterTranslations(translationId, chapterId);
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
