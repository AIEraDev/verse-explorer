import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constant";

interface Reciter {
  id: number;
  name: string;
  style: {
    name: string;
    language_name: string;
  };
  qirat: {
    name: string;
    language_name: string;
  };
  translated_name: {
    name: string;
    language_name: string;
  };
}

interface RecitersResponse {
  reciters: Reciter[];
}

async function fetchReciters(): Promise<RecitersResponse> {
  const response = await fetch(`${API_URL}/api/reciters`);
  if (!response.ok) {
    throw new Error("Failed to fetch reciters");
  }
  return response.json();
}

export function useReciters() {
  return useQuery({
    queryKey: ["reciters"],
    queryFn: fetchReciters,
    staleTime: 1000 * 60 * 10, // 10 minutes - reciters rarely change
  });
}
