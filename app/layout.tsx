import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Paul Arthur Meteng — AI Engineer",
  description:
    "Portfolio of Paul Arthur Meteng — Software Engineer specialising in AI Engineering, RAG systems, LLMs and Conversational AI.",
  openGraph: {
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Software Engineer specialising in AI Engineering, RAG systems and Conversational AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors">
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
