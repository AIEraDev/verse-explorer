"use client";

import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { useReciters } from "@/hooks/use-reciters";

interface ReciterSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ReciterSelector({ value, onValueChange }: ReciterSelectorProps) {
  const { data, isLoading } = useReciters();

  const reciters = data?.reciters || [];

  useEffect(() => {
    if (reciters.length > 0 && !value) {
      onValueChange(reciters[0].id.toString());
    }
  }, [reciters]);

  if (isLoading || reciters.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading reciters...
      </div>
    );
  }

  return (
    <div className="w-full">
      <Label className="font-bold text-xl mb-3">Reciters</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select reciter" />
        </SelectTrigger>
        <SelectContent>
          {reciters.map((reciter) => (
            <SelectItem key={reciter.id} value={reciter.id.toString()}>
              {reciter.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
