"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { VerseList } from "@/components/verse-list";
import { TranslationSelector } from "@/components/translation-selector";
import { ReciterSelector } from "@/components/reciter-selector";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams } from "next/navigation";
import { useChapter } from "@/hooks/use-chapters";

export default function ChapterPage() {
  const [translationId, setTranslationId] = useState("131");
  const [reciterId, setReciterId] = useState("6"); // Mahmoud Khaleel Al-Husary (only working reciter)
  const { id: chapterId } = useParams();

  const { data, isLoading, error } = useChapter(chapterId as string);
  const chapterInfo = data?.chapter;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !chapterInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error instanceof Error ? error.message : "Chapter not found"}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-balance">{chapterInfo.name_simple}</h1>
                  <p className="text-sm text-muted-foreground">{chapterInfo.translated_name.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{chapterInfo.verses_count} verses</Badge>
              <Badge variant="outline">{chapterInfo.revelation_place}</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ReciterSelector value={reciterId} onValueChange={setReciterId} />
            <TranslationSelector value={translationId} onValueChange={setTranslationId} />
          </div>
        </div>
      </div>

      {/* Verses */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <VerseList chapterId={chapterId as string} translationId={translationId} reciterId={reciterId} />
        </div>
      </main>
    </div>
  );
}
