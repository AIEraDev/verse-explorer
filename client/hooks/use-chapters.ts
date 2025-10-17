import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constant";

/**
 * Type Definitions
 *
 * Comprehensive type definitions for Quran chapter data structure
 * ensuring type safety across the application
 */

interface Chapter {
  id: number;
  chapter_number: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

interface ChaptersResponse {
  chapters: Chapter[];
}

/**
 * Fetches all 114 chapters from the Quran API
 */
async function fetchChapters(): Promise<ChaptersResponse> {
  const response = await fetch(`${API_URL}/api/chapters`);
  if (!response.ok) {
    throw new Error("Failed to fetch chapters");
  }
  return response.json();
}

/**
 * Custom React Query hook for fetching all Quran chapters
 */
export function useChapters() {
  return useQuery({
    queryKey: ["chapters"], // Simple key as this query has no parameters
    queryFn: fetchChapters,
    staleTime: 1000 * 60 * 5, // 5 minutes - optimal for static content
  });
}

/**
 * Fetches detailed information for a specific chapter
 */
async function fetchChapter(chapterId: string): Promise<{ chapter: Chapter }> {
  const response = await fetch(`${API_URL}/api/chapters/${chapterId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch chapter");
  }
  return response.json();
}

/**
 * Custom React Query hook for fetching a single chapter's details
 */
export function useChapter(chapterId: string) {
  return useQuery({
    queryKey: ["chapter", chapterId], // Parameterized key for granular caching
    queryFn: () => fetchChapter(chapterId),
    enabled: !!chapterId, // Prevents query execution if ID is undefined/null
    staleTime: 1000 * 60 * 5, // 5 minutes - chapters don't change
  });
}
