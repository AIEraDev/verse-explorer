import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constant";

/**
 * Type Definitions for Verse Data
 *
 * Represents the complete structure of Quranic verses including
 * Arabic text, translations, word-by-word data, and metadata
 */

interface Word {
  id: number;
  position: number;
  audio_url: string;
  char_type_name: string;
  line_number: number;
  page_number: number;
  code_v1: string;
  translation: {
    text: string;
    language_name: string;
  };
  transliteration: {
    text: string;
    language_name: string;
  };
}

interface Verse {
  id: number;
  verse_number: number;
  page_number: number;
  verse_key: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  sajdah_type: null;
  sajdah_number: null;
  text_uthmani: string;
  words: Word;
  translations?: Array<{
    resource_id: number;
    text: string;
  }>;
  tafsirs?: Array<{
    id: number;
    language_name: string;
    name: string;
    text: string;
  }>;
}

interface VersesResponse {
  verses: Verse[];
}

/**
 * Parameters for verses query
 * Provides flexibility for pagination and translation selection
 */
interface UseVersesParams {
  chapterId: string; // Chapter ID (1-114)
  translationId: string; // Translation resource ID
  perPage?: number; // Number of verses per request
}

/**
 * Fetches verses for a specific chapter with selected translation
 */
async function fetchVerses({ chapterId, translationId, perPage = 50 }: UseVersesParams): Promise<VersesResponse> {
  const response = await fetch(`${API_URL}/api/chapters/${chapterId}/verses?translations=${translationId}&per_page=${perPage}`);
  if (!response.ok) {
    throw new Error("Failed to fetch verses");
  }
  return response.json();
}

/**
 * Custom React Query hook for fetching chapter verses with translations
 */
export function useVerses({ chapterId, translationId, perPage }: UseVersesParams) {
  return useQuery({
    // Composite query key enables precise cache invalidation
    queryKey: ["verses", chapterId, translationId, perPage],
    queryFn: () => fetchVerses({ chapterId, translationId, perPage }),
    // Conditional execution prevents unnecessary API calls
    enabled: !!chapterId && !!translationId,
    staleTime: 1000 * 60 * 3, // 3 minutes - moderate cache duration
  });
}
