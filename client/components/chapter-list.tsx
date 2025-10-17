"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChapters } from "@/hooks/use-chapters";

interface Chapter {
  id: number;
  chapter_number: number;
  name_simple: string;
  name_arabic: string;
  translated_name: {
    name: string;
    language_name: string;
  };
  verses_count: number;
  revelation_place: string;
}

export function ChapterList() {
  const { data, isLoading, error } = useChapters();
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize chapters to prevent infinite loop from new array reference
  const chapters = useMemo(() => data?.chapters || [], [data?.chapters]);

  // Calculate filtered chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) {
      return chapters;
    }

    const query = searchQuery.toLowerCase();
    return chapters.filter((chapter) => chapter.name_simple.toLowerCase().includes(query) || chapter.translated_name.name.toLowerCase().includes(query) || chapter.id.toString().includes(query));
  }, [searchQuery, chapters]);

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
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search for a chapter..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {/* Chapter Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredChapters.map((chapter) => (
          <Link key={chapter.id} href={`/chapter/${chapter.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-balance">{chapter.name_simple}</CardTitle>
                    <CardDescription className="text-pretty">{chapter.translated_name.name}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {chapter.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{chapter.verses_count} verses</span>
                  <Badge variant="outline" className="capitalize">
                    {chapter.revelation_place}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No chapters found matching your search.</p>
        </div>
      )}
    </div>
  );
}
