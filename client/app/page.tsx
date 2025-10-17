import { BookOpen, Info } from "lucide-react";
import { ChapterList } from "@/components/chapter-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-balance">Verse Explorer</h1>
                <p className="text-sm text-muted-foreground">Explore the Holy Quran</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Test API Notice */}
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">Pre-Production (Test) API</AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            This application uses the Quran.Foundation Test API with limited data availability. Only <strong>Mahmoud Khaleel Al-Husary</strong> audio recitations are currently working. Some features may be unavailable in the test environment.
          </AlertDescription>
        </Alert>

        <ChapterList />

        {/* Info Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Data provided by Quran.Foundation API</p>
        </div>
      </main>
    </div>
  );
}
