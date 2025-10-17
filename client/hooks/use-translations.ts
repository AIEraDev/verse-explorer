import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constant";

interface Translation {
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

interface TranslationsResponse {
  translations: Translation[];
}

async function fetchTranslations(): Promise<TranslationsResponse> {
  const response = await fetch(`${API_URL}/api/translations`);
  if (!response.ok) {
    throw new Error("Failed to fetch translations");
  }
  return response.json();
}

export function useTranslations() {
  return useQuery({
    queryKey: ["translations"],
    queryFn: fetchTranslations,
    staleTime: 1000 * 60 * 10, // 10 minutes - translations rarely change
  });
}
