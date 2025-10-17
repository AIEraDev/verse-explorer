"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Volume2, Loader2, Pause } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVerses } from "@/hooks/use-verses";
import { API_URL } from "@/lib/constant";

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

interface VerseListProps {
  chapterId: string;
  translationId: string;
  reciterId: string;
}

export function VerseList({ chapterId, translationId, reciterId }: VerseListProps) {
  const { data, isLoading, error } = useVerses({ chapterId, translationId, perPage: 50 });
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const verses = data?.verses || [];

  const playAudio = async (verseNumber: number) => {
    try {
      // Stop current audio if playing
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      if (playingVerse === verseNumber) {
        setPlayingVerse(null);
        setAudio(null);
        return;
      }

      const response = await fetch(`${API_URL}/api/audio/${reciterId}/${chapterId}/${verseNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }

      const data = await response.json();
      const audioUrl = data.audio_files?.[0]?.url;

      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        newAudio.onended = () => {
          // Automatically play next verse
          const currentIndex = verses.findIndex((v) => v.verse_number === verseNumber);
          const nextVerse = verses[currentIndex + 1];

          if (nextVerse) {
            // Play next verse after a short delay
            setTimeout(() => {
              playAudio(nextVerse.verse_number);
            }, 500);
          } else {
            // No more verses, stop playback
            setPlayingVerse(null);
            setAudio(null);
          }
        };
        newAudio.play();
        setAudio(newAudio);
        setPlayingVerse(verseNumber);
      }
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error instanceof Error ? error.message : "An error occurred"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {verses.map((verse) => (
        <Card key={verse.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Verse {verse.verse_number}</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => playAudio(verse.verse_number)} disabled={!reciterId}>
                {playingVerse === verse.verse_number ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Arabic Text */}
              <p className="text-2xl text-right leading-loose font-arabic" dir="rtl">
                {verse.text_uthmani}
              </p>
              <Separator />
              {/* Translation */}
              {verse.translations && verse.translations.length > 0 && <p className="text-base leading-relaxed text-muted-foreground text-pretty">{verse.translations[0].text}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
