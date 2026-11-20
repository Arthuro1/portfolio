"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { JourneyProvider } from "@/context/JourneyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <JourneyProvider>{children}</JourneyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
