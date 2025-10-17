import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constant";

interface AudioFile {
  url: string;
  format: string;
}

interface AudioResponse {
  audio_files: AudioFile[];
}

interface UseAudioParams {
  reciterId: string;
  chapterId: string;
  verseNumber: number;
  enabled?: boolean;
}

async function fetchAudio({ reciterId, chapterId, verseNumber }: Omit<UseAudioParams, "enabled">): Promise<AudioResponse> {
  const response = await fetch(`${API_URL}/api/audio/${reciterId}/${chapterId}/${verseNumber}`);
  if (!response.ok) {
    throw new Error("Failed to fetch audio");
  }
  return response.json();
}

export function useAudio({ reciterId, chapterId, verseNumber, enabled = true }: UseAudioParams) {
  return useQuery({
    queryKey: ["audio", reciterId, chapterId, verseNumber],
    queryFn: () => fetchAudio({ reciterId, chapterId, verseNumber }),
    enabled: enabled && !!reciterId && !!chapterId && !!verseNumber,
    staleTime: 1000 * 60 * 30, // 30 minutes - audio URLs are long-lived
  });
}
