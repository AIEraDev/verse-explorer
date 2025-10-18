"use client";

import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { useTranslations } from "@/hooks/use-translations";

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

interface TranslationSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TranslationSelector({ value, onValueChange }: TranslationSelectorProps) {
  const { data, isLoading } = useTranslations();

  const translations = data?.translations || [];

  useEffect(() => {
    if (translations.length > 0 && !value) {
      const defaultId = translations[0].id.toString();
      onValueChange(defaultId);
    }
  }, [translations]);

  if (isLoading || translations.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading translations...
      </div>
    );
  }

  console.log(translations);

  return (
    <div className="w-full">
      <Label className="font-bold text-xl mb-3">Translations</Label>
      <Select value={value || ""} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select translation" />
        </SelectTrigger>
        <SelectContent>
          {translations.map((translation) => (
            <SelectItem key={translation.id} value={translation.id.toString()}>
              {translation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
