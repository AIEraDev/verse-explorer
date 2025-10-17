import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const _inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Verse Explorer - Explore the Holy Quran",
  description: "Browse and explore Quranic verses with translations and audio",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_inter.variable}`}>
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
